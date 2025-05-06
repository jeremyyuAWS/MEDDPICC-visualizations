/*
  # Add visualization preferences to users table
  
  This migration adds a column for storing saved visualizations and other
  visualization-related preferences in the users table.
*/

-- Make sure the column exists (we've already added it in a previous migration)
DO $$
BEGIN
  IF NOT EXISTS(
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'visualization_preferences'
  ) THEN
    ALTER TABLE public.users 
    ADD COLUMN visualization_preferences JSONB DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- Example of what's stored in visualization_preferences
-- {
--   "savedVisualizations": [
--     {
--       "id": "uuid-string",
--       "title": "Visualization Title",
--       "visualization": {
--         "insight": "The insight text...",
--         "chartType": "Bar",
--         "chartData": {
--           "x": ["A", "B", "C"],
--           "y": [1, 2, 3],
--           "title": "Chart Title",
--           "subtitle": "Subtitle",
--           "xAxisLabel": "X Label",
--           "yAxisLabel": "Y Label" 
--         }
--       },
--       "context": {
--         "industry": "Healthcare",
--         "cloudProvider": "AWS",
--         "company": "Example Corp",
--         "technologies": ["Salesforce", "AWS"],
--         "painPoints": ["Security"],
--         "topic": "AI Adoption"
--       },
--       "createdAt": "ISO date string"
--     }
--   ],
--   "defaultChartType": "Bar",
--   "defaultColors": ["#000000", "#2D2D2D", "#4D4D4D"],
--   "preferences": {
--     "showInsightsWithCharts": true,
--     "includeSourcesInExports": false
--   }
-- }

-- Update RLS policies to allow users to update their visualization preferences
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