import React, { useState } from 'react';
import { useSiteTexts } from '../hooks/useSiteTexts.js';

function Contact() {
  const { texts } = useSiteTexts([
    'contact.title',
    'contact.subtitle',
    'contact.address',
    'contact.phone',
    'contact.email',
    'contact.whatsapp',
    'contact.facebook',
    'contact.schedule',
  ]);

  const [form, setForm] = useState({ name: '', firstname: '', message: '' });
  const [feedback, setFeedback] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.firstname || !form.message) {
      setFeedback({ type: 'error', text: 'Complétez tous les champs avant envoi.' });
      return;
    }
    const phone = texts['contact.whatsapp'].replace(/\s+/g, '');
    const text = `Nouveau message du site :\nNom : ${form.name}\nPrénom : ${form.firstname}\nMessage : ${form.message}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    setFeedback({ type: 'success', text: 'WhatsApp s’est ouvert dans un nouvel onglet.' });
    setForm({ name: '', firstname: '', message: '' });
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-6 py-12">
      <section className="rounded-[32px] bg-white/90 p-10 shadow-2xl shadow-slate-100">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          {texts['contact.title']}
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Planifier une rencontre</h1>
        <p className="mt-6 text-lg text-slate-600">{texts['contact.subtitle']}</p>
      </section>

      <section className="grid gap-10 rounded-[32px] bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6 rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-lg shadow-slate-100">
          <h2 className="text-2xl font-semibold text-slate-900">Coordonnées directes</h2>
          <div className="space-y-3 text-slate-600">
            <p>
              <strong>Adresse :</strong> {texts['contact.address']}
            </p>
            <p>
              <strong>Téléphone :</strong>{' '}
              <a className="text-slate-900 underline-offset-2 hover:underline" href={`tel:${texts['contact.phone']}`}>
                {texts['contact.phone']}
              </a>
            </p>
            <p>
              <strong>Email :</strong>{' '}
              <a
                className="text-slate-900 underline-offset-2 hover:underline"
                href={`mailto:${texts['contact.email']}`}
              >
                {texts['contact.email']}
              </a>
            </p>
            <p>
              <strong>Horaires :</strong> {texts['contact.schedule']}
            </p>
            <p>
              <strong>Facebook :</strong>{' '}
              <a
                className="text-slate-900 underline-offset-2 hover:underline"
                href={texts['contact.facebook']}
                target="_blank"
                rel="noreferrer"
              >
                Jardin & garderie scolaire Les Anges
              </a>
            </p>
          </div>
          <iframe
            title="Localisation Jardin des Anges"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d798.012318165757!2d10.30226123403279!3d36.86523941280585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2b56dc3972e99%3A0xdd3628b2c071eb28!2zSmFyZGluIGQgZW5mYW50cyBsZXMgYW5nZXMg2LHZiNi22Kkg2KfZhNmF2YTYp9im2YPYqQ!5e0!3m2!1sfr!2stn!4v1756808014639!5m2!1sfr!2stn"
            allowFullScreen
            loading="lazy"
            className="h-48 w-full rounded-2xl border border-slate-100 shadow-inner"
          />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-lg shadow-slate-100">
          <h2 className="text-2xl font-semibold text-slate-900">Envoyer un message WhatsApp</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-600" htmlFor="name">
                Nom
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                placeholder="Nom"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600" htmlFor="firstname">
                Prénom
              </label>
              <input
                id="firstname"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                placeholder="Prénom"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
              placeholder="Parlez-nous de votre enfant, de vos questions..."
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-500"
          >
            Ouvrir WhatsApp
          </button>
          {feedback && (
            <p className={feedback.type === 'error' ? 'text-rose-600' : 'text-emerald-600'}>{feedback.text}</p>
          )}
        </form>
      </section>
    </div>
  );
}

export default Contact;

