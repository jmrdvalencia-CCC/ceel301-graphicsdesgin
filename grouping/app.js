/* grouping/app.js — Shared utilities */

const API_BASE = 'https://grouping-api.jmrdvalencia.workers.dev';

/* ── API helper ── */
async function api(path, method, body) {
  const token = localStorage.getItem('gf_token');
  const opts = {
    method: method || 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) opts.headers['Authorization'] = 'Bearer ' + token;
  if (body)  opts.body = JSON.stringify(body);

  const res = await fetch(API_BASE + path, opts);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

/* ── auth helpers ── */
function requireAuth() {
  if (!localStorage.getItem('gf_token')) location.replace('index.html');
}

function getStudent() {
  try { return JSON.parse(localStorage.getItem('gf_student')); } catch (_) { return null; }
}

function logout() {
  localStorage.removeItem('gf_token');
  localStorage.removeItem('gf_student');
  location.replace('index.html');
}

/* ── string helpers ── */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

/* ── theme toggle ── */
(function() {
  const html = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'light') html.classList.add('light');

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeBtn');
    if (!btn) return;
    btn.textContent = html.classList.contains('light') ? '☀️' : '🌙';
    btn.addEventListener('click', () => {
      const isLight = html.classList.toggle('light');
      btn.textContent = isLight ? '☀️' : '🌙';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  });
})();
