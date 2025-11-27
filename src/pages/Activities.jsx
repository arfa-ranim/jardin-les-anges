import React from 'react';
import { useSiteTexts } from '../hooks/useSiteTexts.js';

const program = [
  {
    title: 'Ateliers créatifs',
    description: 'Peinture, modelage, collage et découverte sensorielle pour affiner la motricité et l’expression.',
    media: { type: 'image', src: '/img/fille-creatife.jpg', alt: 'Atelier créatif' },
    chip: '🎨 Arts visuels',
  },
  {
    title: 'Explorations musicales',
    description: 'Chants, percussions douces et écoute active pour éveiller le rythme et la coordination.',
    media: { type: 'image', src: '/img/activite-musical.jpg', alt: 'Musique' },
    chip: '🎵 Musique',
  },
  {
    title: 'Jeux éducatifs',
    description: 'Puzzles, jeux de logique, conte et mathématiques ludiques pour développer la concentration.',
    media: { type: 'image', src: '/img/jeu-educatif.jpg', alt: 'Jeux éducatifs' },
    chip: '🧩 Cognitif',
  },
  {
    title: 'Sorties découvertes',
    description: 'Parcs, musées, fermes pédagogiques et actions solidaires ancrent les apprentissages dans le réel.',
    media: { type: 'image', src: '/img/jeu.jpg', alt: 'Sorties' },
    chip: '🌿 Culture & nature',
  },
  {
    title: 'Éveil psychomoteur',
    description: 'Parcours moteurs, yoga enfant et jeux coopératifs pour développer l’équilibre et la confiance.',
    media: { type: 'video', src: '/vid/psychomoteur.mp4', alt: 'Psychomotricité' },
    chip: '⚽ Mouvement',
  },
  {
    title: 'Cuisine & sciences',
    description: 'Recettes, expériences sensorielles et mini-labos STEAM pour nourrir curiosité et autonomie.',
    media: { type: 'image', src: '/img/educatif.jpg', alt: 'Cuisine' },
    chip: '👩‍🍳 Expériences',
  },
];

function Activities() {
  const { texts } = useSiteTexts(['activities.sectionTitle', 'activities.sectionSubtitle']);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <section className="rounded-[32px] bg-white/90 p-10 shadow-2xl shadow-slate-100">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          {texts['activities.sectionTitle']}
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Une semaine rythmée et joyeuse</h1>
        <p className="mt-6 text-lg text-slate-600">{texts['activities.sectionSubtitle']}</p>
      </section>

      <section className="grid gap-8 rounded-[32px] bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-8 md:grid-cols-2">
        {program.map((item) => (
          <article key={item.title} className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-lg shadow-slate-100">
            <span className="inline-flex items-center rounded-full bg-slate-900/5 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {item.chip}
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-3 text-slate-600">{item.description}</p>
            <div className="mt-6 overflow-hidden rounded-2xl">
              {item.media.type === 'video' ? (
                <video
                  src={item.media.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-64 w-full object-cover"
                />
              ) : (
                <img src={item.media.src} alt={item.media.alt} className="h-64 w-full object-cover" loading="lazy" />
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Activities;

