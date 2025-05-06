/*
  # MEDDPICC Qualification Schema

  1. New Tables
    - `users` - Store user information
    - `meetings` - Store meeting information and notes
    - `analyses` - Store MEDDPICC analysis results
    - `meddpicc_components` - Store individual MEDDPICC components from analyses
    - `enrichment_tags` - Store tags extracted from meeting notes
    - `follow_up_questions` - Store generated follow-up questions
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  organization_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  title TEXT,
  notes TEXT NOT NULL,
  meeting_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own meetings"
  ON meetings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Analyses table
CREATE TABLE IF NOT EXISTS analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meeting_id UUID REFERENCES meetings(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  overall_score INTEGER,
  max_score INTEGER,
  score_percentage INTEGER,
  email_draft TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own analyses"
  ON analyses
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- MEDDPICC Components table
CREATE TABLE IF NOT EXISTS meddpicc_components (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  analysis_id UUID REFERENCES analyses(id) NOT NULL,
  component_type TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  score INTEGER NOT NULL,
  text TEXT,
  confidence DECIMAL,
  citation TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE meddpicc_components ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own components"
  ON meddpicc_components
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM analyses 
      WHERE analyses.id = meddpicc_components.analysis_id
      AND analyses.user_id = auth.uid()
    )
  );

-- Enrichment Tags table
CREATE TABLE IF NOT EXISTS enrichment_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  analysis_id UUID REFERENCES analyses(id) NOT NULL,
  type TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE enrichment_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own tags"
  ON enrichment_tags
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM analyses 
      WHERE analyses.id = enrichment_tags.analysis_id
      AND analyses.user_id = auth.uid()
    )
  );

-- Follow-up questions table
CREATE TABLE IF NOT EXISTS follow_up_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  analysis_id UUID REFERENCES analyses(id) NOT NULL,
  component TEXT NOT NULL,
  question TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE follow_up_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own questions"
  ON follow_up_questions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM analyses 
      WHERE analyses.id = follow_up_questions.analysis_id
      AND analyses.user_id = auth.uid()
    )
  );

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS meetings_user_id_idx ON meetings (user_id);
CREATE INDEX IF NOT EXISTS analyses_meeting_id_idx ON analyses (meeting_id);
CREATE INDEX IF NOT EXISTS analyses_user_id_idx ON analyses (user_id);
CREATE INDEX IF NOT EXISTS meddpicc_components_analysis_id_idx ON meddpicc_components (analysis_id);
CREATE INDEX IF NOT EXISTS enrichment_tags_analysis_id_idx ON enrichment_tags (analysis_id);
CREATE INDEX IF NOT EXISTS follow_up_questions_analysis_id_idx ON follow_up_questions (analysis_id);