import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import Header from '../Header.jsx';
import '../App.css';

function Home() {
  useEffect(() => {
    document.querySelector('.fade-in-section')?.classList.add('loaded');
  }, []);

  return (
    <div className="app">
      <main className="fade-in-section">
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Bienvenue au Jardin d'Enfants Les Anges</h1>
            <p className="hero-subtitle">Un espace chaleureux et créatif pour l'éveil de vos enfants.</p>
            <Link to="/activities" className="hero-button">Découvrir nos activités</Link>
          </div>
          <video src="/vid/fille-painture.mp4" className="hero-image" autoPlay loop muted playsInline loading="lazy" />
        </section>

        <section className="cards">
          <div className="card" style={{ backgroundColor: '#A8E6CF' }}>
            <div className="card-icon">Peinture</div>
            <h3 className="card-title">Apprentissage ludique</h3>
            <p className="card-text">Des activités éducatives qui éveillent la curiosité des enfants.</p>
          </div>
          <div className="card" style={{ backgroundColor: '#AECBFA' }}>
            <div className="card-icon">Bouclier</div>
            <h3 className="card-title">Sécurité et confiance</h3>
            <p className="card-text">Un environnement sûr pour le bien-être de vos enfants.</p>
          </div>
          <div className="card" style={{ backgroundColor: '#FFD3B6' }}>
            <div className="card-icon">Étoile</div>
            <h3 className="card-title">Créativité et jeux</h3>
            <p className="card-text">Des jeux qui stimulent l'imagination et la créativité.</p>
          </div>
        </section>
      </main>

      <footer className="contact-footer">
        <div className="footer-content">
          <div className="footer-info">
            <p>Adresse : 2 rue mohamed fadhel ben achour sidi daoud la Marsa</p>
            <p>Téléphone : +216 97 843 193 </p>
            <p>Email : dorsaf.karbech@gmail.com</p>
            <p className="facebook-info">
              Voulez-vous plus d’informations ? 
              Consultez notre page Facebook :{" "}
              <a href="https://www.facebook.com/JardinLesAnges/?locale=fr_FR" target="_blank" rel="noopener noreferrer">
                Jardin et garderie scolaire les anges
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
