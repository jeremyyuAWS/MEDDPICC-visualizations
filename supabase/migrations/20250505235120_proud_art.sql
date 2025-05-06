/*
  # Add visualization preferences to users

  1. Changes
    - Add `visualization_preferences` column to users table
    - This JSON column will store chart preferences, default settings, and saved templates
  
  2. Security
    - Update RLS policies for the new column
*/

-- Add visualization_preferences column to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS visualization_preferences JSONB DEFAULT '{}'::jsonb;

-- Update RLS policies to allow users to read and update their own visualization preferences
DROP POLICY IF EXISTS "Users can read own data" ON public.users;
CREATE POLICY "Users can read own data"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own data" ON public.users;
CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);