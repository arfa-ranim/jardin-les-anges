// src/pages/Contact.jsx
import React, { useEffect, useState } from 'react';
import '../App.css';

function Contact() {
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    document.querySelector('.fade-in-section')?.classList.add('loaded');
  }, []);

  const handleSend = (e) => {
    e.preventDefault();

    if (!name.trim() || !prenom.trim() || !message.trim()) {
      setStatus({ type: 'error', msg: 'Veuillez remplir tous les champs.' });
      return;
    }

    const phone = "21697843193";
    const text = `Nouveau message du site :\n\nNom : ${name}\nPrénom : ${prenom}\nMessage :\n${message}`;
    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    window.open(whatsappURL, "_blank");
    setStatus({ type: 'success', msg: 'WhatsApp ouvert ! Envoyez le message.' });

    setName('');
    setPrenom('');
    setMessage('');
  };

  return (
    <div className="app">
      <main className="fade-in-section">
        <section className="contact-section">
          <h1 className="contact-title">Contactez-nous</h1>

          <div className="contact-content">
            {/* ---- Infos ---- */}
            <div className="contact-info">
              <h3 className="info-title">Nos coordonnées</h3>
              <p><strong>Adresse :</strong> 2 rue mohamed fadhel ben achour sidi daoud la Marsa</p>
              <p><strong>Téléphone :</strong> <a href="tel:+21697843193">+216 97 843 193</a></p>
              <p><strong>WhatsApp :</strong> <a href="https://wa.me/21697843193" target="_blank" rel="noopener noreferrer">Envoyer un message</a></p>

              <p className="facebook-info">
                Plus d’infos ? Consultez notre page Facebook :
                <a href="https://www.facebook.com/JardinLesAnges/?locale=fr_FR" target="_blank" rel="noopener noreferrer">
                  Jardin et garderie scolaire les anges
                </a>
              </p>
            </div>

            {/* ---- Form ---- */}
            <form className="contact-form" onSubmit={handleSend}>
              <h3 className="info-title">Envoyez-nous un message via WhatsApp</h3>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Votre prénom"
                  className="form-input"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  placeholder="Votre message"
                  className="form-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="form-button">
                Envoyer via WhatsApp
              </button>

              {status && (
                <p className={status.type === 'error' ? 'error' : 'success'}>
                  {status.msg}
                </p>
              )}
            </form>
          </div>

          {/* ---- Map ---- */}
          <div className="contact-map">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d798.012318165757!2d10.30226123403279!3d36.86523941280585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2b56dc3972e99%3A0xdd3628b2c071eb28!2zSmFyZGluIGQgZW5mYW50cyBsZXMgYW5nZXMg2LHZiNi22Kkg2KfZhNmF2YTYp9im2YPYqQ!5e0!3m2!1sfr!2stn!4v1756808014639!5m2!1sfr!2stn"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '15px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <footer className="contact-footer">
        <div className="footer-content">
          <div className="footer-info">
            <p>Adresse : 2 rue mohamed fadhel ben achour sidi daoud la Marsa</p>
            <p>Téléphone : +216 97 843 193</p>
            <p>WhatsApp : <a href="https://wa.me/21697843193" target="_blank" rel="noopener noreferrer">Envoyer un message</a></p>
            <p className="facebook-info">
              Consultez notre page Facebook :
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

export default Contact;