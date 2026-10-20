/* grouping-worker/index.js — Grouping API */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

function err(msg, status = 400) {
  return json({ error: msg }, status);
}

/* ── token helpers ── */
async function randomToken() {
  const buf = new Uint8Array(24);
  crypto.getRandomValues(buf);
  return [...buf].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function getStudentByToken(DB, token) {
  if (!token) return null;
  const row = await DB.prepare(
    'SELECT s.* FROM sessions se JOIN students s ON s.id = se.student_id WHERE se.token = ?'
  ).bind(token).first();
  return row || null;
}

function authToken(req) {
  const h = req.headers.get('Authorization') || '';
  return h.startsWith('Bearer ') ? h.slice(7) : null;
}

/* ── router ── */
export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    const url = new URL(req.url);
    const path = url.pathname;

    /* POST /api/login */
    if (path === '/api/login' && req.method === 'POST') {
      const { email, student_no } = await req.json();
      if (!email || !student_no) return err('email and student_no required');

      const student = await env.DB.prepare(
        'SELECT * FROM students WHERE LOWER(email)=LOWER(?) AND student_no=?'
      ).bind(email.trim(), student_no.trim()).first();

      if (!student) return err('Invalid credentials', 401);

      const token = await randomToken();
      await env.DB.prepare(
        'INSERT INTO sessions (token, student_id) VALUES (?,?)'
      ).bind(token, student.id).run();

      return json({ token, student: { id: student.id, name: student.name, email: student.email } });
    }

    /* GET /api/students  — list all (for picker), requires auth */
    if (path === '/api/students' && req.method === 'GET') {
      const me = await getStudentByToken(env.DB, authToken(req));
      if (!me) return err('Unauthorized', 401);

      const { results } = await env.DB.prepare(
        'SELECT s.id, s.name, s.email, CASE WHEN gm.student_id IS NOT NULL THEN 1 ELSE 0 END as in_group ' +
        'FROM students s LEFT JOIN group_members gm ON gm.student_id = s.id ORDER BY s.name'
      ).all();
      return json(results);
    }

    /* POST /api/groups  — create group */
    if (path === '/api/groups' && req.method === 'POST') {
      const me = await getStudentByToken(env.DB, authToken(req));
      if (!me) return err('Unauthorized', 401);

      /* check if already in a group */
      const existing = await env.DB.prepare(
        'SELECT gm.group_id FROM group_members gm WHERE gm.student_id=?'
      ).bind(me.id).first();
      if (existing) return err('You are already in a group');

      const { name, is_solo, member_ids } = await req.json();
      if (!name) return err('Group name required');

      const solo = is_solo ? 1 : 0;
      const members = Array.isArray(member_ids) ? member_ids : [];

      if (!solo && members.length > 2) return err('Max 2 additional members (3 total)');
      if (!solo && members.includes(me.id)) return err('Do not include yourself in member_ids');

      /* create group */
      const gResult = await env.DB.prepare(
        'INSERT INTO groups (name, leader_id, is_solo) VALUES (?,?,?) RETURNING id'
      ).bind(name, me.id, solo).first();
      const groupId = gResult.id;

      /* add leader as accepted */
      await env.DB.prepare(
        'INSERT INTO group_members (group_id, student_id, status) VALUES (?,?,?)'
      ).bind(groupId, me.id, 'accepted').run();

      /* add invitees as pending */
      for (const sid of members) {
        /* verify student exists and is not already in a group */
        const s = await env.DB.prepare('SELECT id FROM students WHERE id=?').bind(sid).first();
        if (!s) continue;
        const inGroup = await env.DB.prepare(
          'SELECT id FROM group_members WHERE student_id=?'
        ).bind(sid).first();
        if (inGroup) continue;

        await env.DB.prepare(
          'INSERT INTO group_members (group_id, student_id, status) VALUES (?,?,?)'
        ).bind(groupId, sid, 'pending').run();
      }

      return json({ group_id: groupId });
    }

    /* GET /api/groups/mine */
    if (path === '/api/groups/mine' && req.method === 'GET') {
      const me = await getStudentByToken(env.DB, authToken(req));
      if (!me) return err('Unauthorized', 401);

      const membership = await env.DB.prepare(
        'SELECT gm.*, g.name as group_name, g.is_solo, g.leader_id FROM group_members gm JOIN groups g ON g.id=gm.group_id WHERE gm.student_id=?'
      ).bind(me.id).first();

      if (!membership) return json({ group: null });

      const { results: members } = await env.DB.prepare(
        'SELECT gm.status, gm.student_id, s.name, s.email FROM group_members gm JOIN students s ON s.id=gm.student_id WHERE gm.group_id=?'
      ).bind(membership.group_id).all();

      const assignment = await env.DB.prepare(
        'SELECT ga.client_id, c.name as client_name, c.industry, c.tagline FROM group_assignments ga JOIN clients c ON c.id=ga.client_id WHERE ga.group_id=?'
      ).bind(membership.group_id).first();

      return json({
        group: {
          id: membership.group_id,
          name: membership.group_name,
          is_solo: membership.is_solo,
          leader_id: membership.leader_id,
          my_status: membership.status,
          members,
          client: assignment || null,
        },
      });
    }

    /* POST /api/groups/acknowledge */
    if (path === '/api/groups/acknowledge' && req.method === 'POST') {
      const me = await getStudentByToken(env.DB, authToken(req));
      if (!me) return err('Unauthorized', 401);

      const { action } = await req.json(); /* action: 'accept' | 'decline' */
      if (!['accept', 'decline'].includes(action)) return err('action must be accept or decline');

      const membership = await env.DB.prepare(
        'SELECT * FROM group_members WHERE student_id=? AND status=?'
      ).bind(me.id, 'pending').first();

      if (!membership) return err('No pending group invitation found');

      const newStatus = action === 'accept' ? 'accepted' : 'declined';
      await env.DB.prepare(
        'UPDATE group_members SET status=? WHERE id=?'
      ).bind(newStatus, membership.id).run();

      if (action === 'decline') {
        /* remove the row so student can join another group */
        await env.DB.prepare('DELETE FROM group_members WHERE id=?').bind(membership.id).run();
      }

      return json({ status: newStatus });
    }

    /* POST /api/groups/assign-client  — leader randomly picks a client */
    if (path === '/api/groups/assign-client' && req.method === 'POST') {
      const me = await getStudentByToken(env.DB, authToken(req));
      if (!me) return err('Unauthorized', 401);

      /* must be a group leader */
      const group = await env.DB.prepare(
        'SELECT g.id, g.is_solo FROM groups g WHERE g.leader_id=?'
      ).bind(me.id).first();
      if (!group) return err('You are not a group leader');

      /* check already assigned */
      const already = await env.DB.prepare(
        'SELECT id FROM group_assignments WHERE group_id=?'
      ).bind(group.id).first();
      if (already) return err('Your group already has an assigned client');

      /* check group is confirmed (no pending members) */
      const { results: members } = await env.DB.prepare(
        'SELECT status FROM group_members WHERE group_id=?'
      ).bind(group.id).all();
      const pending = members.filter(m => m.status === 'pending');
      if (pending.length > 0) return err('All members must accept before picking a client');

      /* get available clients */
      const { results: available } = await env.DB.prepare(
        'SELECT id FROM clients WHERE id NOT IN (SELECT client_id FROM group_assignments)'
      ).all();
      if (!available.length) return err('No clients available');

      /* pick one at random */
      const picked = available[Math.floor(Math.random() * available.length)];
      await env.DB.prepare(
        'INSERT INTO group_assignments (group_id, client_id) VALUES (?,?)'
      ).bind(group.id, picked.id).run();

      const client = await env.DB.prepare(
        'SELECT id, name as client_name, industry, tagline FROM clients WHERE id=?'
      ).bind(picked.id).first();

      return json({ client });
    }

    /* GET /api/admin/groups  — teacher view */
    if (path === '/api/admin/groups' && req.method === 'GET') {
      const token = authToken(req);
      if (token !== env.ADMIN_TOKEN) return err('Forbidden', 403);

      const { results: groups } = await env.DB.prepare(
        'SELECT g.*, s.name as leader_name FROM groups g JOIN students s ON s.id=g.leader_id ORDER BY g.created_at DESC'
      ).all();

      const out = [];
      for (const g of groups) {
        const { results: members } = await env.DB.prepare(
          'SELECT gm.status, s.name, s.email FROM group_members gm JOIN students s ON s.id=gm.student_id WHERE gm.group_id=?'
        ).bind(g.id).all();
        const client = await env.DB.prepare(
          'SELECT ga.client_id, c.name as client_name, c.industry FROM group_assignments ga JOIN clients c ON c.id=ga.client_id WHERE ga.group_id=?'
        ).bind(g.id).first();
        out.push({ ...g, members, client: client || null });
      }
      return json(out);
    }

    /* POST /api/admin/seed  — bulk insert students from JSON */
    if (path === '/api/admin/seed' && req.method === 'POST') {
      const token = authToken(req);
      if (token !== env.ADMIN_TOKEN) return err('Forbidden', 403);

      const { students } = await req.json();
      if (!Array.isArray(students)) return err('students array required');

      let inserted = 0;
      for (const s of students) {
        if (!s.email || !s.student_no || !s.name) continue;
        try {
          await env.DB.prepare(
            'INSERT OR IGNORE INTO students (email, student_no, name) VALUES (?,?,?)'
          ).bind(s.email.trim(), s.student_no.trim(), s.name.trim()).run();
          inserted++;
        } catch (_) { /* skip duplicates */ }
      }
      return json({ inserted });
    }

    return err('Not found', 404);
  },
};
