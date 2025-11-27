import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Accueil', to: '/' },
  { label: 'À propos', to: '/about' },
  { label: 'Activités', to: '/activities' },
  { label: 'Galerie', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
  { label: 'Admin', to: '/admin' },
];

const navClass = ({ isActive }) =>
  [
    'rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200',
    isActive
      ? 'bg-sky-100 text-sky-900 shadow-sm'
      : 'text-slate-600 hover:text-sky-900 hover:bg-slate-100',
  ].join(' ');

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-semibold text-sky-900">
          Jardin des Anges
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden rounded-full border border-slate-200 p-2 text-slate-600"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Ouvrir le menu"
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-6 pb-6 md:hidden">
          <nav className="flex flex-col gap-2 pt-4">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;

