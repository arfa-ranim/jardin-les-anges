import React, { useEffect } from 'react';
import Header from '../Header.jsx';
import '../App.css';

function About() {
  useEffect(() => {
    document.querySelector('.fade-in-section')?.classList.add('loaded');
  }, []);
  return (
    <div className="app">
      
      <main className="fade-in-section">
        <section className="about-intro">
          <h1 className="about-title">À propos de nous</h1>
          <p className="about-text">
          ✨ Un enseignement trilingue (arabe, français, anglais) basé sur des méthodes ludiques et un programme moderne de calcul mental.
          🌱 Dans un environnement sûr et bienveillant, nous développons les intelligences multiples et respectons la pédagogie différenciée pour chaque enfant.
          ❤️ Nous éduquons avec le cœur, enseignons avec la raison et libérons les talents de vos enfants, sous la supervision d’une directrice hautement qualifiée et d’une équipe pédagogique expérimentée.
          </p>
        </section>
        <section className="about-history" style={{ backgroundColor: '#AECBFA' }}>
          <h2 className="section-title">Notre histoire</h2>
          <div className="history-content">
            <p className="history-text">
              L’aventure a commencé avec Madame Dorsaf Kharbeche, passionnée par la petite enfance et convaincue que chaque enfant mérite un environnement où apprendre devient un plaisir. Forte de 19 ans d’expérience, elle a fondé cette école pour offrir un enseignement trilingue (arabe, français, anglais) dans un cadre sûr, stimulant et bienveillant.
             </p>
          </div>
        </section>
        <section className="about-philosophy">
          <h2 className="section-title">Notre philosophie</h2>
          <p className="philosophy-text">
            🌱 Notre philosophie éducative

            Nous considérons chaque enfant comme un être unique, compétent et curieux. Notre objectif est de favoriser un développement harmonieux sur les plans cognitif, affectif, social, moteur et moral, en respectant son rythme et ses besoins.

            🎲 L’apprentissage se fait par le jeu, l’exploration et l’expérience. L’adulte accompagne l’enfant comme un guide bienveillant, encourageant son autonomie, son expression et sa créativité.

            🤝 La coopération, l’entraide et le respect mutuel sont au cœur de nos valeurs. L’environnement est pensé pour être à la fois stimulant et sécurisant, afin de nourrir la curiosité et la confiance en soi.

            Cette approche active et humaniste vise à former des enfants épanouis, responsables et ouverts aux autres.
          </p>
        </section>
        <section className="about-team" style={{ backgroundColor: '#AECBFA' }}>
          <h2 className="section-title"> La Directrice</h2>
          <div className="team-cards">
            <div className="team-card">
              <img
                src="/img/Directrice.jpg" 
                alt="Mme Dorsaf"
                className="team-image"
              />
              <h3 className="team-name">Mme Dorsaf – Directrice</h3>
              <p className="team-description">
                🌟 Madame Dorsaf Kharbeche – Directrice de la maternelle

                Avec plus de 19 ans d’expérience dans la petite enfance, Madame Dorsaf Kharbeche allie expertise pédagogique et passion pour l’épanouissement des enfants. Titulaire de nombreux certificats internationaux, elle est spécialisée en développement personnel, PNL, correction des troubles de la prononciation, intelligences multiples et calcul mental.

                🎓 Ses atouts :

                Encadrement et formation des équipes éducatives

                Mise en place de projets pédagogiques adaptés et innovants

                Approche individualisée respectant le rythme de chaque enfant

                Création d’un environnement stimulant, sécurisé et inclusif

                Dirigeante bienveillante et visionnaire, elle œuvre chaque jour pour offrir aux enfants un cadre d’apprentissage riche, équilibré et épanouissant.
              </p>
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

export default About;