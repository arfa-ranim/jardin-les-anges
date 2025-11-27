import React from 'react';
import { useSiteTexts } from '../hooks/useSiteTexts.js';

const timeline = [
  {
    year: '2006',
    title: 'Naissance du Jardin des Anges',
    description: 'Ouverture de la première classe avec une pédagogie trilingue et une équipe de 3 éducatrices.',
  },
  {
    year: '2014',
    title: 'Ateliers spécialisés',
    description: 'Création des pôles arts, musique, psychomotricité et démarrage des sorties pédagogiques.',
  },
  {
    year: '2022',
    title: 'Nouvelle dynamique',
    description: 'Modernisation des espaces, déploiement du suivi familles en ligne et nouveaux projets STEAM.',
  },
];

function About() {
  const { texts } = useSiteTexts([
    'about.introTitle',
    'about.introText',
    'about.historyTitle',
    'about.historyText',
    'about.philosophyTitle',
    'about.philosophyText',
    'about.directorTitle',
    'about.directorText',
  ]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12">
      <section className="rounded-[32px] bg-white/90 p-10 shadow-2xl shadow-slate-100">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          {texts['about.introTitle']}
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Une maison d’enfance engagée</h1>
        <p className="mt-6 text-lg text-slate-600">{texts['about.introText']}</p>
      </section>

      <section className="rounded-[32px] bg-gradient-to-br from-sky-900 via-sky-800 to-sky-900 p-10 text-white">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200">
            {texts['about.historyTitle']}
          </p>
          <p className="text-lg text-sky-100">{texts['about.historyText']}</p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {timeline.map((step) => (
            <div key={step.year} className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-200">{step.year}</p>
              <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-sky-100">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-[32px] bg-white/90 p-8 shadow-xl shadow-slate-100">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            {texts['about.philosophyTitle']}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">Une pédagogie active</h2>
          <p className="mt-4 text-slate-600">{texts['about.philosophyText']}</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li>• Intelligence émotionnelle et expression orale</li>
            <li>• Projets collaboratifs et ateliers dirigés</li>
            <li>• Communication continue avec les familles</li>
          </ul>
        </div>
        <div className="rounded-[32px] bg-gradient-to-br from-rose-50 via-white to-sky-50 p-8 shadow-xl shadow-slate-100">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">
            {texts['about.directorTitle']}
          </p>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row">
            <img
              src="/img/Directrice.jpg"
              alt="Madame Dorsaf Kharbeche"
              className="h-48 w-48 rounded-3xl object-cover shadow-lg"
            />
            <p className="text-slate-700">{texts['about.directorText']}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

