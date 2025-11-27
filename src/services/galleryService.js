import { supabase, isSupabaseReady } from '../lib/supabaseClient.js';

const GALLERY_TABLE = import.meta.env.VITE_SUPABASE_GALLERY_TABLE || 'gallery_items';
const CATEGORY_TABLE = import.meta.env.VITE_SUPABASE_CATEGORY_TABLE || 'gallery_categories';
const STORAGE_BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'gallery-media';

const ensureSupabase = () => {
  if (!isSupabaseReady) {
    throw new Error('Supabase n’est pas configuré.');
  }
};

const slugify = (value = '') =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

export async function fetchGalleryItems() {
  if (!isSupabaseReady) {
    return { data: [], error: null };
  }

  const { data, error } = await supabase
    .from(GALLERY_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur galerie:', error.message);
    return { data: [], error };
  }

  return { data: data ?? [], error: null };
}

export async function fetchGalleryCategories() {
  if (!isSupabaseReady) {
    return { data: [], error: null };
  }

  const { data, error } = await supabase
    .from(CATEGORY_TABLE)
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Erreur catégories:', error.message);
    return { data: [], error };
  }

  return { data: data ?? [], error: null };
}

export async function createCategory({ name, description }) {
  ensureSupabase();

  const trimmed = name?.trim();
  if (!trimmed) {
    throw new Error('Le nom de la catégorie est requis.');
  }

  const payload = {
    name: trimmed,
    description: description?.trim() || null,
  };

  const { data, error } = await supabase
    .from(CATEGORY_TABLE)
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteCategory(name) {
  ensureSupabase();

  if (!name) return;

  await supabase.from(GALLERY_TABLE).delete().eq('category', name);
  const { error } = await supabase.from(CATEGORY_TABLE).delete().eq('name', name);

  if (error) {
    throw new Error(error.message);
  }
}

export async function uploadMedia({ file, category, caption }) {
  ensureSupabase();

  if (!file) throw new Error('Veuillez choisir un fichier.');
  if (!category) throw new Error('Une catégorie est requise.');

  const extension = file.name?.split('.').pop() || 'jpg';
  const uniqueSuffix =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);
  const storagePath = `${slugify(category) || 'divers'}/${Date.now()}-${uniqueSuffix}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, file, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath);

  const mediaType = file.type?.startsWith('video') ? 'video' : 'image';

  const payload = {
    category,
    caption: caption?.trim() || null,
    media_url: publicUrl,
    media_type: mediaType,
    storage_path: storagePath,
  };

  const { data, error } = await supabase.from(GALLERY_TABLE).insert(payload).select().single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteMedia(itemId, storagePath) {
  ensureSupabase();

  if (storagePath) {
    await supabase.storage.from(STORAGE_BUCKET).remove([storagePath]);
  }

  const { error } = await supabase.from(GALLERY_TABLE).delete().eq('id', itemId);

  if (error) {
    throw new Error(error.message);
  }
}

