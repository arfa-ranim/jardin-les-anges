import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseClient = null;

if (supabaseUrl && supabaseAnonKey) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
} else {
  console.warn(
    'Supabase environment variables are missing. Public pages will fall back to built-in content until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are provided.'
  );
}

export const supabase = supabaseClient;
export const isSupabaseReady = Boolean(supabaseClient);

