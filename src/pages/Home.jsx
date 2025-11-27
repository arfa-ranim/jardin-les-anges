import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteTexts } from '../hooks/useSiteTexts.js';

const highlights = [
  {
    title: 'Pédagogie trilingue',
    description: 'Arabe, français et anglais dès la petite section.',
    accent: 'bg-sunrise',
  },
  {
    title: 'Equipe certifiée',
    description: 'Direction expérimentée et éducatrices spécialisées.',
    accent: 'bg-emerald-100',
  },
  {
    title: 'Espaces sensoriels',
    description: 'Ateliers d’arts, musique, psychomotricité et sciences.',
    accent: 'bg-sky-100',
  },
];

const stats = [
  { value: '19+', label: 'années d’expérience' },
  { value: '3', label: 'langues enseignées' },
  { value: '100%', label: 'parents satisfaits' },
];

const testimonialCards = [
  {
    title: 'Confiance & sécurité',
    description:
      'Accès sécurisé, espaces lumineux, communication directe avec l’équipe pédagogique et partage photo/vidéo hebdomadaire.',
  },
  {
    title: 'Programme sur-mesure',
    description:
      'Développement socio-émotionnel, ateliers Montessori, projets scientifiques, sorties culturelles et projets parents-enfants.',
  },
];

function Home() {
  const { texts } = useSiteTexts([
    'home.heroTitle',
    'home.heroSubtitle',
    'home.heroCta',
    'home.promiseTitle',
    'home.promiseSubtitle',
  ]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12">
      <section className="grid gap-10 rounded-[32px] bg-white/90 p-8 shadow-2xl shadow-sky-100 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">École maternelle</p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
            {texts['home.heroTitle']}
          </h1>
          <p className="text-lg text-slate-600">{texts['home.heroSubtitle']}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/activities"
              className="inline-flex items-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-500"
            >
              {texts['home.heroCta']}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300"
            >
              Planifier une visite
            </Link>
          </div>

          <div className="grid gap-6 rounded-2xl bg-slate-50 p-6 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label}>
                <p className="text-3xl font-semibold text-slate-900">{item.value}</p>
                <p className="text-sm text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[24px]">
          <video
            src="/vid/fille-painture.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 via-slate-900/0 to-transparent p-6 text-white">
            <p className="text-sm font-medium">Moments d’atelier peinture · Classe des moyens</p>
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-[32px] bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Nos engagements</p>
          <h2 className="text-3xl font-semibold text-slate-900">{texts['home.promiseTitle']}</h2>
          <p className="mt-2 text-lg text-slate-600">{texts['home.promiseSubtitle']}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl shadow-slate-100 backdrop-blur"
            >
              <div className={`mb-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${card.accent}`}>
                {card.title}
              </div>
              <p className="text-slate-600">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {testimonialCards.map((card) => (
          <div
            key={card.title}
            className="rounded-[28px] border border-slate-100 bg-white/90 p-8 shadow-2xl shadow-slate-100"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Parents rassurés</p>
            <h3 className="mt-4 text-2xl font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-3 text-slate-600">{card.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[32px] bg-slate-900 p-8 text-white">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Galerie</p>
            <h3 className="mt-2 text-3xl font-semibold">Entrez dans la vie du Jardin des Anges</h3>
            <p className="mt-2 text-slate-200">Photos et vidéos des ateliers, sorties, célébrations et projets.</p>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-slate-900 shadow-lg shadow-slate-700/30"
          >
            Voir la galerie
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
