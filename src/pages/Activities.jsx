import React, { useEffect } from 'react';
import Header from '../Header.jsx';
import '../App.css';

function Activities() {
  useEffect(() => {
  document.querySelector('.fade-in-section')?.classList.add('loaded');
  }, []);
  return (
    <div className="app">
      
      <main className="fade-in-section">
        <section className="activities-section">
          <h1 className="activities-title">Nos activités pédagogiques et ludiques</h1>
            <div className="activities-cards">

              {/* Ateliers créatifs */}
              <div className="activity-card" style={{ backgroundColor: '#A8E6CF' }}>
                <details>
                  <summary>🎨 Ateliers créatifs</summary>
                  <p>Peinture, dessin et pâte à modeler pour stimuler imagination et motricité fine.</p>
                  <p>Ces activités développent l’expression personnelle et la découverte des couleurs et formes.</p>
                  <img src="/img/fille-creatife.jpg" alt="Atelier créatif" className="gallery-image" />
                </details>
              </div>

              {/* Activités musicales */}
              <div className="activity-card" style={{ backgroundColor: '#AECBFA' }}>
                <details>
                  <summary>🎵 Activités musicales</summary>
                  <p>Chants et instruments pour éveiller le sens du rythme et la joie de la musique.</p>
                  <p>Ces ateliers favorisent la créativité, la coordination et l’écoute collective.</p>
                  <img src="/img/activite-musical.jpg" alt="Activité musicale" className="gallery-image" />
                </details>
              </div>

              {/* Jeux éducatifs */}
              <div className="activity-card" style={{ backgroundColor: '#FFD3B6' }}>
                <details>
                  <summary>🧩 Jeux éducatifs</summary>
                  <p>Puzzles, jeux de mémoire et activités de logique pour encourager la réflexion.</p>
                  <p>Ces jeux stimulent la concentration, l’esprit d’équipe et la résolution de problèmes.</p>
                  <img src="/img/jeu-educatif.jpg" alt="Jeux éducatifs" className="gallery-image" />
                </details>
              </div>

              {/* Sorties pédagogiques */}
              <div className="activity-card" style={{ backgroundColor: '#FFAAA5' }}>
                <details>
                  <summary>🌳 Sorties pédagogiques</summary>
                  <p>Visites dans des parcs et musées pour découvrir le monde de façon ludique.</p>
                  <p>Ces sorties développent l’observation, la curiosité et l’esprit d’initiative des enfants.</p>
                  <img src="/img/jeu.jpg" alt="Sorties pédagogiques" className="gallery-image" />
                </details>
              </div>

              {/* Éveil psychomoteur */}
              <div className="activity-card" style={{ backgroundColor: '#A8E6CF' }}>
                <details>
                  <summary>⚽ Éveil psychomoteur</summary>
                  <p>Jeux sportifs pour développer motricité, équilibre et coordination.</p>
                  <p>Parcours, mini-jeux collectifs et exercices favorisent l’autonomie et le travail en groupe.</p>
                  <video src="/vid/psychomoteur.mp4" className="gallery-image" autoPlay loop muted playsInline />
              </details>
              </div>

              {/* Jeux de cuisine */}
              <div className="activity-card" style={{ backgroundColor: '#b0dbf4ff' }}>
                <details>
                  <summary>👩‍🍳 Jeux de cuisine</summary>
                  <p>Ateliers culinaires pour manipuler les ingrédients et suivre des recettes simples.</p>
                  <p>Ces activités développent motricité fine, créativité et autonomie tout en sensibilisant à l’alimentation saine.</p>
                  <img src="/img/educatif.jpg" alt="Jeux de cuisine" className="gallery-image" />
                </details>
              </div>

            </div>

        </section>
      </main>

        <footer className="contact-footer">
          <div className="footer-content">
            <div className="footer-info">
              <p>Adresse : 2 rue mohamed fadhel ben achour sidi daoud la Marsa</p>
              <p>Téléphone : +216 97 843 193 </p>
              <p>Email : dorsaf.karbech@gmail.com</p>

              {/* Ici aussi ça marche */}
              <p className="facebook-info">
                Voulez-vous plus d’informations ? 
                Consultez notre page Facebook :{" "}
                <a 
                  href="https://www.facebook.com/JardinLesAnges/?locale=fr_FR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Jardin et garderie scolaire les anges
                </a>
              </p>
            </div>
          </div>
        </footer>
    </div>
  );
}

export default Activities;
