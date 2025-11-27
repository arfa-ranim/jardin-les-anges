import React, { useEffect, useMemo, useState } from 'react';
import { fetchGalleryItems } from '../services/galleryService.js';
import { useSiteTexts } from '../hooks/useSiteTexts.js';

function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const { texts } = useSiteTexts(['gallery.title', 'gallery.subtitle']);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setErrorMessage(null);
      const { data, error } = await fetchGalleryItems();
      if (error) {
        setErrorMessage('Impossible de charger la galerie. Vérifiez que Supabase est configuré.');
      }
      setItems(data);
      setLoading(false);
    };
    load();
  }, []);

  const grouped = useMemo(() => {
    return items.reduce((acc, item) => {
      const key = item.category || 'Moments';
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
  }, [items]);

  const hasContent = items.length > 0;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <section className="rounded-[32px] bg-white/90 p-10 shadow-2xl shadow-slate-100">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          {texts['gallery.title']}
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Moments partagés avec les enfants</h1>
        <p className="mt-6 text-lg text-slate-600">{texts['gallery.subtitle']}</p>
      </section>

      <section className="mt-12 rounded-[32px] bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-8">
        {loading && <p className="text-center text-slate-500">Chargement de la galerie…</p>}
        {errorMessage && <p className="text-center text-rose-600">{errorMessage}</p>}

        {!loading && hasContent && (
          <div className="space-y-10">
            {Object.entries(grouped).map(([category, media]) => (
              <div key={category} className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">{category}</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {media.map((item) => (
                    <article key={item.id} className="overflow-hidden rounded-3xl border border-white/60 bg-white shadow-xl shadow-slate-100">
                      <div className="aspect-[4/3] overflow-hidden">
                        {item.media_type === 'video' ? (
                          <video
                            src={item.media_url}
                            controls
                            className="h-full w-full object-cover"
                            preload="metadata"
                          />
                        ) : (
                          <img
                            src={item.media_url}
                            alt={item.caption || `Photo ${category}`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-semibold text-slate-900">{item.caption || 'Moment capturé'}</p>
                        <p className="text-xs text-slate-500">{item.category}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !hasContent && (
          <div className="rounded-3xl bg-white/80 p-10 text-center text-slate-500">
            <p>Aucune image n’a encore été publiée. Ajoutez vos premiers souvenirs depuis le tableau de bord admin.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Gallery;
