import { supabase, isSupabaseReady } from '../lib/supabaseClient.js';
import { defaultTexts } from '../data/contentDefaults.js';

const TEXT_TABLE = import.meta.env.VITE_SUPABASE_TEXT_TABLE || 'site_texts';

const cloneDefaults = () => ({ ...defaultTexts });

export async function fetchSiteTexts() {
  const merged = cloneDefaults();

  if (!isSupabaseReady) {
    return { data: merged, fromRemote: false, error: null };
  }

  const { data, error } = await supabase
    .from(TEXT_TABLE)
    .select('key,value')
    .order('key', { ascending: true });

  if (error) {
    console.error('Impossible de charger les contenus:', error.message);
    return { data: merged, error };
  }

  data?.forEach((row) => {
    if (row.key && typeof row.value === 'string') {
      merged[row.key] = row.value;
    }
  });

  return { data: merged, fromRemote: true, error: null };
}

export async function saveSiteTexts(updates) {
  if (!isSupabaseReady) {
    throw new Error('Supabase n’est pas configuré. Ajoutez les variables VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.');
  }

  const payload = Object.entries(updates || {})
    .filter(([key, value]) => key && typeof value === 'string')
    .map(([key, value]) => ({ key, value }));

  if (!payload.length) return;

  const { error } = await supabase.from(TEXT_TABLE).upsert(payload, {
    onConflict: 'key',
  });

  if (error) {
    throw new Error(error.message);
  }
}

