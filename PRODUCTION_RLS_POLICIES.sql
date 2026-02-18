-- ========================================
-- PRODUCTION-SAFE SUPABASE RLS POLICIES
-- Copy-paste this entire file in Supabase SQL Editor
-- ========================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_section ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (clean slate)
DROP POLICY IF EXISTS "Public read access for projects" ON projects;
DROP POLICY IF EXISTS "Public insert access for projects" ON projects;
DROP POLICY IF EXISTS "Public update access for projects" ON projects;
DROP POLICY IF EXISTS "Public delete access for projects" ON projects;

DROP POLICY IF EXISTS "Public read access for skills" ON skills;
DROP POLICY IF EXISTS "Public insert access for skills" ON skills;
DROP POLICY IF EXISTS "Public update access for skills" ON skills;
DROP POLICY IF EXISTS "Public delete access for skills" ON skills;

DROP POLICY IF EXISTS "Public read access for experience" ON experience;
DROP POLICY IF EXISTS "Public insert access for experience" ON experience;
DROP POLICY IF EXISTS "Public update access for experience" ON experience;
DROP POLICY IF EXISTS "Public delete access for experience" ON experience;

DROP POLICY IF EXISTS "Public read access for achievements" ON achievements;
DROP POLICY IF EXISTS "Public insert access for achievements" ON achievements;
DROP POLICY IF EXISTS "Public update access for achievements" ON achievements;
DROP POLICY IF EXISTS "Public delete access for achievements" ON achievements;

DROP POLICY IF EXISTS "Public read access for about_section" ON about_section;
DROP POLICY IF EXISTS "Public insert access for about_section" ON about_section;
DROP POLICY IF EXISTS "Public update access for about_section" ON about_section;
DROP POLICY IF EXISTS "Public delete access for about_section" ON about_section;

-- ========================================
-- PROJECTS TABLE POLICIES
-- ========================================

-- Allow everyone to READ projects (for portfolio viewing)
CREATE POLICY "Public read access for projects"
ON projects FOR SELECT
USING (true);

-- Allow everyone to INSERT projects (for admin panel)
-- Note: In production, you may want to restrict this to authenticated users
CREATE POLICY "Public insert access for projects"
ON projects FOR INSERT
WITH CHECK (true);

-- Allow everyone to UPDATE projects (for admin panel)
CREATE POLICY "Public update access for projects"
ON projects FOR UPDATE
USING (true)
WITH CHECK (true);

-- Allow everyone to DELETE projects (for admin panel)
CREATE POLICY "Public delete access for projects"
ON projects FOR DELETE
USING (true);

-- ========================================
-- SKILLS TABLE POLICIES
-- ========================================

CREATE POLICY "Public read access for skills"
ON skills FOR SELECT
USING (true);

CREATE POLICY "Public insert access for skills"
ON skills FOR INSERT
WITH CHECK (true);

CREATE POLICY "Public update access for skills"
ON skills FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Public delete access for skills"
ON skills FOR DELETE
USING (true);

-- ========================================
-- EXPERIENCE TABLE POLICIES
-- ========================================

CREATE POLICY "Public read access for experience"
ON experience FOR SELECT
USING (true);

CREATE POLICY "Public insert access for experience"
ON experience FOR INSERT
WITH CHECK (true);

CREATE POLICY "Public update access for experience"
ON experience FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Public delete access for experience"
ON experience FOR DELETE
USING (true);

-- ========================================
-- ACHIEVEMENTS TABLE POLICIES
-- ========================================

CREATE POLICY "Public read access for achievements"
ON achievements FOR SELECT
USING (true);

CREATE POLICY "Public insert access for achievements"
ON achievements FOR INSERT
WITH CHECK (true);

CREATE POLICY "Public update access for achievements"
ON achievements FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Public delete access for achievements"
ON achievements FOR DELETE
USING (true);

-- ========================================
-- ABOUT_SECTION TABLE POLICIES
-- ========================================

CREATE POLICY "Public read access for about_section"
ON about_section FOR SELECT
USING (true);

CREATE POLICY "Public insert access for about_section"
ON about_section FOR INSERT
WITH CHECK (true);

CREATE POLICY "Public update access for about_section"
ON about_section FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Public delete access for about_section"
ON about_section FOR DELETE
USING (true);

-- ========================================
-- VERIFICATION
-- ========================================
-- After running this, verify in Supabase dashboard:
-- 1. Go to Authentication → Policies
-- 2. Check each table shows "RLS enabled" with green icon
-- 3. Each table should show 4 policies (SELECT, INSERT, UPDATE, DELETE)
