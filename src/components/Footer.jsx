import React from 'react';
import { useSiteTexts } from '../hooks/useSiteTexts.js';

const contactKeys = [
  'contact.address',
  'contact.phone',
  'contact.email',
  'contact.whatsapp',
  'contact.facebook',
  'contact.schedule',
];

function Footer() {
  const { texts } = useSiteTexts(contactKeys);

  return (
    <footer className="mt-16 bg-gradient-to-br from-sky-900 via-sky-800 to-sky-900 text-sky-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex-1 space-y-3">
          <p className="text-sm uppercase tracking-widest text-sky-200">Jardin des Anges</p>
          <p className="text-lg font-semibold text-white">
            Un espace rassurant pour s’éveiller, explorer et s’épanouir.
          </p>
          <p className="text-sm text-sky-200">© {new Date().getFullYear()} Tous droits réservés.</p>
        </div>

        <div className="flex-1 space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-sky-200">Coordonnées</h4>
          <p>{texts['contact.address']}</p>
          <p>
            Tél :{' '}
            <a
              href={`tel:${texts['contact.phone']}`}
              className="font-semibold text-white transition hover:text-sky-200"
            >
              {texts['contact.phone']}
            </a>
          </p>
          <p>
            Email :{' '}
            <a
              href={`mailto:${texts['contact.email']}`}
              className="font-semibold text-white transition hover:text-sky-200"
            >
              {texts['contact.email']}
            </a>
          </p>
          <p>WhatsApp : {texts['contact.whatsapp']}</p>
          <p>Horaires : {texts['contact.schedule']}</p>
        </div>

        <div className="flex-1 space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-sky-200">Réseaux</h4>
          <a
            href={texts['contact.facebook']}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
          >
            Page Facebook
            <span aria-hidden="true">↗</span>
          </a>
          <p className="text-xs text-sky-200">
            Besoin d’aide ? Utilisez le formulaire de contact ou appelez-nous directement.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

