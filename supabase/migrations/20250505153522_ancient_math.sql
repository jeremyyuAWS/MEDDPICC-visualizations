/*
  # Add user auth trigger

  1. New Triggers
    - Creates a trigger to automatically create a profile in the `users` table
      when a new user signs up through Supabase Auth
  
  2. Functions
    - Creates a function that inserts a new row in the `users` table
      with basic information from auth.users
  
  This ensures that whenever a user signs up, they automatically get a profile
  in the public.users table, which can then be extended with additional information.
*/

-- Create a function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.created_at,
    NEW.created_at
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call this function whenever a user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();