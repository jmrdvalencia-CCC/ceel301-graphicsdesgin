-- schema.sql  Run once via: wrangler d1 execute grouping-db --file=schema.sql

CREATE TABLE IF NOT EXISTS students (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  email       TEXT    NOT NULL UNIQUE,
  student_no  TEXT    NOT NULL,
  name        TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS groups (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  leader_id   INTEGER NOT NULL REFERENCES students(id),
  is_solo     INTEGER NOT NULL DEFAULT 0,   -- 1 = solo
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS group_members (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id    INTEGER NOT NULL REFERENCES groups(id),
  student_id  INTEGER NOT NULL REFERENCES students(id),
  status      TEXT    NOT NULL DEFAULT 'pending',  -- pending | accepted | declined
  UNIQUE(student_id)   -- one student, one group
);

CREATE TABLE IF NOT EXISTS sessions (
  token       TEXT    PRIMARY KEY,
  student_id  INTEGER NOT NULL REFERENCES students(id),
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS clients (
  id          INTEGER PRIMARY KEY,
  name        TEXT    NOT NULL,
  industry    TEXT    NOT NULL,
  tagline     TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS group_assignments (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id    INTEGER NOT NULL UNIQUE REFERENCES groups(id),
  client_id   INTEGER NOT NULL REFERENCES clients(id),
  assigned_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- Seed 40 clients
INSERT OR IGNORE INTO clients (id, name, industry, tagline) VALUES
(1,  'Verdant Roots Co.',            'Food & Beverage',              'Organic grocery store and community farm shop'),
(2,  'Ironclad Fitness',             'Health & Wellness',            'Premium gym and personal training studio'),
(3,  'Luminae Studio',               'Creative Services',            'Boutique branding and visual identity agency'),
(4,  'Pawsitive Care Veterinary',    'Animal Health',                'Full-service veterinary clinic and pet wellness center'),
(5,  'Helix Biotech Solutions',      'Biotechnology',                'Life sciences research and diagnostic solutions'),
(6,  'The Gilded Page Bookshop',     'Retail',                       'Independent bookstore and literary café'),
(7,  'Skybridge Logistics',          'Transportation & Logistics',   'Regional freight and last-mile delivery company'),
(8,  'Solstice Spa & Wellness',      'Wellness & Hospitality',       'Luxury day spa and holistic wellness retreat'),
(9,  'Codeforge Academy',            'Education & Technology',       'Coding bootcamp and tech skills training center'),
(10, 'Harvest Moon Brewing Co.',     'Food & Beverage',              'Craft brewery and taproom'),
(11, 'Nexus Capital Partners',       'Finance & Investment',         'Private equity and venture capital firm'),
(12, 'Little Sprouts Daycare',       'Education & Childcare',        'Early childhood education center (ages 1–6)'),
(13, 'Arcadia Game Studios',         'Entertainment & Technology',   'Independent video game development studio'),
(14, 'Terracycle Architecture',      'Architecture & Design',        'Sustainable architecture and urban design firm'),
(15, 'Flare Athletics',              'Sports & Apparel',             'Performance sportswear brand'),
(16, 'Maplewood Senior Living',      'Healthcare & Senior Services', 'Assisted living and memory care community'),
(17, 'Drift Coffee Roasters',        'Food & Beverage',              'Specialty coffee roastery and café chain'),
(18, 'Pinnacle Legal Group',         'Legal Services',               'Full-service corporate and commercial law firm'),
(19, 'Bloom & Thread Floral Studio', 'Events & Lifestyle',           'Boutique floral design studio for weddings and events'),
(20, 'Quantum Robotics Lab',         'Technology & Engineering',     'Robotics research and automation solutions company'),
(21, 'Saltline Surf Co.',            'Sports & Lifestyle',           'Surf gear, apparel, and surf school'),
(22, 'Ember & Oak Restaurant',       'Food & Beverage',              'Upscale wood-fire grill restaurant'),
(23, 'ClearPath Mental Health',      'Healthcare',                   'Outpatient mental health clinic and therapy center'),
(24, 'Ironwood Furniture Co.',       'Manufacturing & Retail',       'Handcrafted solid wood furniture maker'),
(25, 'Vela Travel Agency',           'Travel & Tourism',             'Boutique luxury travel agency'),
(26, 'Pixel & Prose Digital Agency', 'Marketing & Technology',       'Full-service digital marketing and content agency'),
(27, 'Stonehaven Whisky Distillery', 'Food & Beverage',              'Single malt whisky distillery and tasting room'),
(28, 'Nimbus Cloud Solutions',       'Technology',                   'Cloud infrastructure and managed IT services provider'),
(29, 'Rosewood Bridal Boutique',     'Fashion & Retail',             'Luxury bridal gown boutique'),
(30, 'Gridline Urban Planning',      'Government & Urban Dev.',      'Urban planning and city design consultancy'),
(31, 'Foxden Brewing & Kitchen',     'Food & Beverage',              'Gastropub and craft brewery'),
(32, 'Meridian Language Institute',  'Education',                    'Language school and cultural exchange center'),
(33, 'Steelframe Construction Group','Construction & Engineering',   'Commercial and industrial construction company'),
(34, 'Aura Cosmetics',               'Beauty & Personal Care',       'Clean beauty and skincare brand'),
(35, 'Highpoint Adventure Co.',      'Tourism & Recreation',         'Outdoor adventure and expedition company'),
(36, 'Wavelength Music Academy',     'Education & Arts',             'Music school for all ages and skill levels'),
(37, 'Bastion Cybersecurity',        'Technology & Security',        'Enterprise cybersecurity firm'),
(38, 'Canopy Co-Working Space',      'Real Estate & Workspace',      'Premium co-working and flexible office space'),
(39, 'Polaris Renewable Energy',     'Energy & Environment',         'Solar and wind energy solutions provider'),
(40, 'Threadline Fashion House',     'Fashion & Apparel',            'Contemporary fashion label for working women');
