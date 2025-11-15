// src/pages/Gallery.jsx
import React, { useEffect, useState } from 'react';
import '../App.css';

function Gallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/gallery');
        if (!res.ok) throw new Error('Impossible de charger la galerie');
        const data = await res.json();
        setGalleryData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        document.querySelector('.fade-in-section')?.classList.add('loaded');
      }
    };
    fetchGallery();
  }, []);

  const categories = galleryData.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const renderItem = (item) => {
    const isVideo = item.url?.toLowerCase().endsWith('.mp4');
    if (isVideo) {
      return (
        <video
          key={item._id}
          src={item.url}
          className="gallery-image"
          autoPlay
          loop
          muted
          playsInline
          loading="lazy"
        />
      );
    }
    return (
      <div key={item._id} className="gallery-item">
        <img src={item.url} alt={item.alt || ''} className="gallery-image" loading="lazy" />
        {item.caption && <p className="gallery-caption">{item.caption}</p>}
      </div>
    );
  };

  return (
    <div className="app">
      <main className="fade-in-section">
        <section className="gallery-section">
          <h1 className="gallery-title">Notre galerie en images</h1>

          {loading && <p className="loading">Chargement…</p>}
          {error && <p className="error">{error}</p>}

          {!loading &&
            Object.entries(categories).map(([cat, items]) => (
              <div key={cat} className="gallery-category">
                <h2 className="gallery-subtitle">{cat}</h2>
                <div className="gallery-grid">{items.map(renderItem)}</div>
              </div>
            ))}
        </section>
      </main>

      <footer className="contact-footer">
        <div className="footer-content">
          <div className="footer-info">
            <p>Adresse : 2 rue mohamed fadhel ben achour sidi daoud la Marsa</p>
            <p>Téléphone : +216 97 843 193</p>
            <p>Email : dorsaf.karbech@gmail.com</p>
            <p className="facebook-info">
              Voulez-vous plus d’informations ? Consultez notre page Facebook :{' '}
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

export default Gallery;