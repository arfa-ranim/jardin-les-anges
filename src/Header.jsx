// src/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      <Link to="/" className="logo" onClick={closeMenu}>
        Jardin d'Enfants Les Anges
      </Link>

      <nav className="nav">
        <Link to="/" className="nav-link" onClick={closeMenu}>Accueil</Link>
        <Link to="/about" className="nav-link" onClick={closeMenu}>À propos</Link>
        <Link to="/activities" className="nav-link" onClick={closeMenu}>Activités</Link>
        <Link to="/gallery" className="nav-link" onClick={closeMenu}>Galerie</Link>
        <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
        <Link to="/admin" className="nav-link" onClick={closeMenu}>Admin</Link>
      </nav>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span></span><span></span><span></span>
      </div>

      <nav className="nav-mobile" style={{ display: isOpen ? 'flex' : 'none' }}>
        <Link to="/" className="nav-link" onClick={closeMenu}>Accueil</Link>
        <Link to="/about" className="nav-link" onClick={closeMenu}>À propos</Link>
        <Link to="/activities" className="nav-link" onClick={closeMenu}>Activités</Link>
        <Link to="/gallery" className="nav-link" onClick={closeMenu}>Galerie</Link>
        <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
        <Link to="/admin" className="nav-link" onClick={closeMenu}>Admin</Link>
      </nav>
    </header>
  );
}

export default Header;