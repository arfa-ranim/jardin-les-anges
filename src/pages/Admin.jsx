import React, { useEffect, useMemo, useState } from 'react';
import { editableTextFields, defaultTexts } from '../data/contentDefaults.js';
import { fetchSiteTexts, saveSiteTexts } from '../services/contentService.js';
import {
  fetchGalleryCategories,
  fetchGalleryItems,
  uploadMedia,
  createCategory,
  deleteCategory,
  deleteMedia,
} from '../services/galleryService.js';
import { signInWithEmail, signOut, getCurrentUser, onAuthStateChange } from '../services/authService.js';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'dorsaf.kharbeche@gmail.com';

const initialUploadState = { category: '', caption: '' };

function Admin() {
  const [auth, setAuth] = useState({ email: '', password: '' });
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [texts, setTexts] = useState(defaultTexts);
  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [uploadForm, setUploadForm] = useState(initialUploadState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '' });
  const [busy, setBusy] = useState({ content: false, gallery: false });
  const [banner, setBanner] = useState(null);

  const sortedGallery = useMemo(
    () => [...gallery].sort((a, b) => new Date(b.created_at) - new Date(a.created_at || 0)),
    [gallery]
  );

  useEffect(() => {
    // Check for existing session on mount
    getCurrentUser().then((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoggedIn(true);
        refreshAll();
      }
    });

    // Listen for auth state changes
    const unsubscribe = onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        setIsLoggedIn(true);
        refreshAll();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setBanner(null);
    setBusy((prev) => ({ ...prev, content: true }));

    try {
      const trimmedEmail = auth.email.trim().toLowerCase();
      if (!trimmedEmail || !auth.password) {
        setBanner('Veuillez remplir tous les champs.');
        return;
      }

      const data = await signInWithEmail(trimmedEmail, auth.password);
      if (data?.user) {
        setUser(data.user);
        setIsLoggedIn(true);
        setAuth({ email: '', password: '' });
        await refreshAll();
      }
    } catch (error) {
      setBanner(error.message || 'Erreur de connexion. Vérifiez vos identifiants.');
    } finally {
      setBusy((prev) => ({ ...prev, content: false }));
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      setAuth({ email: '', password: '' });
      setTexts(defaultTexts);
      setCategories([]);
      setGallery([]);
    } catch (error) {
      setBanner(error.message || 'Erreur lors de la déconnexion.');
    }
  };

  const refreshAll = async () => {
    setBusy({ content: true, gallery: true });
    try {
      const [{ data: siteTexts }, { data: cats }, { data: medias }] = await Promise.all([
        fetchSiteTexts(),
        fetchGalleryCategories(),
        fetchGalleryItems(),
      ]);
      setTexts(siteTexts);
      setCategories(cats);
      setGallery(medias);
    } catch (error) {
      setBanner(error.message);
    } finally {
      setBusy({ content: false, gallery: false });
    }
  };

  const handleTextChange = (key, value) => {
    setTexts((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveTexts = async (event) => {
    event.preventDefault();
    setBusy((prev) => ({ ...prev, content: true }));
    try {
      const payload = editableTextFields.reduce((acc, field) => {
        acc[field.key] = texts[field.key];
        return acc;
      }, {});
      await saveSiteTexts(payload);
      setBanner('Textes enregistrés.');
    } catch (error) {
      setBanner(error.message);
    } finally {
      setBusy((prev) => ({ ...prev, content: false }));
    }
  };

  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    try {
      const created = await createCategory(categoryForm);
      setCategories((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
      setCategoryForm({ name: '', description: '' });
      setBanner('Catégorie ajoutée.');
    } catch (error) {
      setBanner(error.message);
    }
  };

  const handleCategoryDelete = async (name) => {
    if (!window.confirm(`Supprimer la catégorie "${name}" et ses médias ?`)) return;
    try {
      await deleteCategory(name);
      setCategories((prev) => prev.filter((cat) => cat.name !== name));
      setGallery((prev) => prev.filter((item) => item.category !== name));
      setBanner('Catégorie supprimée.');
    } catch (error) {
      setBanner(error.message);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setBanner('Choisissez une image ou une vidéo.');
      return;
    }
    if (!uploadForm.category) {
      setBanner('Sélectionnez une catégorie.');
      return;
    }
    setBusy((prev) => ({ ...prev, gallery: true }));
    try {
      const created = await uploadMedia({
        file: selectedFile,
        category: uploadForm.category,
        caption: uploadForm.caption,
      });
      setGallery((prev) => [created, ...prev]);
      setUploadForm(initialUploadState);
      setSelectedFile(null);
      setBanner('Média importé.');
    } catch (error) {
      setBanner(error.message);
    } finally {
      setBusy((prev) => ({ ...prev, gallery: false }));
    }
  };

  const handleDeleteMedia = async (item) => {
    if (!window.confirm('Supprimer ce média ?')) return;
    setBusy((prev) => ({ ...prev, gallery: true }));
    try {
      await deleteMedia(item.id, item.storage_path);
      setGallery((prev) => prev.filter((entry) => entry.id !== item.id));
      setBanner('Média supprimé.');
    } catch (error) {
      setBanner(error.message);
    } finally {
      setBusy((prev) => ({ ...prev, gallery: false }));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-6 py-16">
        <form
          onSubmit={handleLogin}
          className="rounded-[32px] border border-slate-100 bg-white/90 p-8 shadow-2xl shadow-slate-100"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Tableau de bord</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">Connexion administrateur</h1>
          <p className="mt-2 text-sm text-slate-500">Email : {ADMIN_EMAIL}</p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={auth.email}
                onChange={(e) => setAuth((prev) => ({ ...prev, email: e.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                autoComplete="email"
                placeholder={ADMIN_EMAIL}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600" htmlFor="password">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={auth.password}
                onChange={(e) => setAuth((prev) => ({ ...prev, password: e.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                autoComplete="current-password"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={busy.content}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-500 disabled:opacity-60"
          >
            {busy.content ? 'Connexion…' : 'Se connecter'}
          </button>
          {banner && <p className="mt-4 text-center text-rose-600">{banner}</p>}
          </form>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <section className="rounded-[32px] bg-white/90 p-8 shadow-2xl shadow-slate-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Tableau de bord
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Bonjour {user?.email?.split('@')[0] || 'admin'} 👋
            </h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300"
          >
            Déconnexion
          </button>
        </div>
        {banner && <p className="mt-4 text-sm text-slate-600">{banner}</p>}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Textes éditables</p>
            <p className="text-3xl font-semibold text-slate-900">{editableTextFields.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Catégories</p>
            <p className="text-3xl font-semibold text-slate-900">{categories.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Médias</p>
            <p className="text-3xl font-semibold text-slate-900">{gallery.length}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-10 rounded-[32px] bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-8 lg:grid-cols-2">
        <form onSubmit={handleSaveTexts} className="space-y-4 rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-lg shadow-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Textes du site</h2>
            <button
              type="submit"
              disabled={busy.content}
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {busy.content ? 'Sauvegarde…' : 'Enregistrer'}
            </button>
          </div>
          <div className="space-y-3 max-h-[32rem] overflow-y-auto pr-2">
            {editableTextFields.map((field) => (
              <label key={field.key} className="block text-sm text-slate-600">
                {field.label}
                <textarea
                  value={texts[field.key] || ''}
                  onChange={(e) => handleTextChange(field.key, e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                  rows={3}
                />
              </label>
            ))}
          </div>
        </form>

        <div className="space-y-6">
          <form
            onSubmit={handleCategorySubmit}
            className="rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-lg shadow-slate-100"
          >
            <h2 className="text-xl font-semibold text-slate-900">Catégories galerie</h2>
            <div className="mt-4 space-y-3">
              <input
                value={categoryForm.name}
                onChange={(e) => setCategoryForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Nom"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
              />
              <textarea
                value={categoryForm.description}
                onChange={(e) => setCategoryForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Description (optionnel)"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                rows={3}
              />
              <button
                className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
                type="submit"
              >
                Ajouter la catégorie
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat.id}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700"
                >
                  {cat.name}
                  <button
                    type="button"
                    onClick={() => handleCategoryDelete(cat.name)}
                    className="text-rose-600"
                    title="Supprimer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </form>

          <form
            onSubmit={handleUpload}
            className="space-y-4 rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-lg shadow-slate-100"
          >
            <h2 className="text-xl font-semibold text-slate-900">Ajouter un média</h2>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full rounded-2xl border border-dashed border-slate-300 px-4 py-4 text-sm text-slate-600"
            />
            <select
              value={uploadForm.category}
              onChange={(e) => setUploadForm((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900"
            >
              <option value="">Choisir une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              value={uploadForm.caption}
              onChange={(e) => setUploadForm((prev) => ({ ...prev, caption: e.target.value }))}
              placeholder="Légende"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
            />
            <button
              type="submit"
              disabled={busy.gallery}
              className="w-full rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-500 disabled:opacity-60"
            >
              {busy.gallery ? 'Envoi…' : 'Publier'}
            </button>
          </form>
        </div>
      </section>

      <section className="rounded-[32px] bg-white/90 p-8 shadow-2xl shadow-slate-100">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Médias publiés</h2>
          <button
            type="button"
            onClick={refreshAll}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Rafraîchir
          </button>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedGallery.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-3xl border border-slate-100 bg-slate-50">
              <div className="aspect-[4/3] overflow-hidden bg-slate-200">
                {item.media_type === 'video' ? (
                  <video src={item.media_url} controls className="h-full w-full object-cover" preload="metadata" />
                ) : (
                  <img src={item.media_url} alt={item.caption || item.category} className="h-full w-full object-cover" loading="lazy" />
                )}
              </div>
              <div className="space-y-2 p-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">{item.category}</p>
                {item.caption && <p>{item.caption}</p>}
                <button
                  type="button"
                  onClick={() => handleDeleteMedia(item)}
                  className="text-rose-600 underline-offset-2 hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </article>
          ))}
        </div>
        {!sortedGallery.length && <p className="mt-6 text-center text-slate-500">Aucun média pour le moment.</p>}
      </section>
    </div>
  );
}

export default Admin;

