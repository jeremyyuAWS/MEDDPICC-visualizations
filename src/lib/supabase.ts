import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Check your .env file or deployment settings.');
}

export const supabase = createClient<Database>(
  supabaseUrl || 'https://yoyoougvfgrvxguateyd.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlveW9vdWd2ZmdydnhndWF0ZXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NTE5NTcsImV4cCI6MjA2MjAyNzk1N30.0-hVkjsPi-3kMS7Xz6nPY7EuAKkTccRgprRnc9PtO14'
);