import React, { useState, useEffect } from 'react';
import '../App.css';

function Admin() {
  // Login
  const [adminName, setAdminName] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Upload
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [caption, setCaption] = useState('');
  const [status, setStatus] = useState('');

  // Gallery
  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState([]);

  // Load data
  useEffect(() => {
    const section = document.querySelector('.fade-in-section');
    if (section) section.classList.add('loaded');
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/gallery');
      const data = await res.json();
      const uniqueCats = [...new Set(data.map(i => i.category))].sort();
      setCategories(uniqueCats);
      setGallery(data);
      if (uniqueCats.length > 0 && !category) setCategory(uniqueCats[0]);
    } catch (err) {
      setStatus('Erreur chargement');
    }
  };

  // Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (adminName.trim() && adminPass.trim()) {
      setIsLoggedIn(true);
      fetchGallery();
      setStatus('Connecté !');
    } else {
      setStatus('Nom et mot de passe requis.');
    }
  };

  // Upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !category) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', category);
    formData.append('caption', caption);

    try {
      const res = await fetch('http://localhost:5000/api/admin/upload', {
        method: 'POST',
        headers: { 'x-admin-pass': adminPass },
        body: formData
      });

      if (res.ok) {
        setStatus('Image ajoutée !');
        setFile(null); setCaption(''); e.target.reset();
        fetchGallery();
      } else {
        setStatus('Mot de passe incorrect.');
      }
    } catch (err) {
      setStatus('Erreur réseau.');
    }
  };

  // Delete Image
  const deleteImage = async (id) => {
    if (!window.confirm('Supprimer cette image ?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/delete/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-pass': adminPass }
      });
      if (res.ok) {
        setStatus('Image supprimée !');
        fetchGallery();
      }
    } catch (err) {
      setStatus('Erreur.');
    }
  };

  // Delete Category
  const deleteCategory = async (catName) => {
    if (!window.confirm(`Supprimer TOUTE la catégorie "${catName}" ?`)) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/category/${encodeURIComponent(catName)}`, {
        method: 'DELETE',
        headers: { 'x-admin-pass': adminPass }
      });
      if (res.ok) {
        setStatus('Catégorie supprimée !');
        fetchGallery();
      }
    } catch (err) {
      setStatus('Erreur.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="app">
        <main className="fade-in-section" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h1 className="contact-title">Connexion Admin</h1>
          <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Votre nom"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="form-input"
                required
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Mot de passe"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="form-input"
                required
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="form-button">Se connecter</button>
            {status && <p className={status.includes('Connecté') ? 'success' : 'error'}>{status}</p>}
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <main className="fade-in-section" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h1 className="contact-title">Admin – {adminName}</h1>
        <p><em>Connecté</em> | <button onClick={() => setIsLoggedIn(false)} style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}>Déconnexion</button></p>

        {/* Upload Form */}
        <form onSubmit={handleUpload} style={{ maxWidth: '500px', margin: '30px auto' }}>
          <div className="form-group">
            <input type="file" accept="image/*,video/*" onChange={(e) => setFile(e.target.files[0])} required />
          </div>
          <div className="form-group" style={{ marginTop: '10px' }}>
            <input
              type="text"
              placeholder="Ou créer une nouvelle catégorie"
              onChange={(e) => setCategory(e.target.value)}
              className="form-input"
              style={{ fontStyle: 'italic', color: '#888' }}
            />
          </div>
          <div className="form-group">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-input" >
              <option value="">Choisir catégorie</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="form-group">
            <input type="text" placeholder="Légende" value={caption} onChange={(e) => setCaption(e.target.value)} className="form-input" />
          </div>
          <button type="submit" className="form-button">Ajouter</button>
        </form>

        {status && <p className={status.includes('ajoutée') || status.includes('supprimée') ? 'success' : 'error'}>{status}</p>}

        {/* Categories */}
        <div style={{ margin: '40px 0' }}>
          <h3>Catégories ({categories.length})</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {categories.map(cat => (
              <div key={cat} style={{ padding: '8px 16px', background: '#f0f0f0', borderRadius: '8px', fontSize: '14px' }}>
                {cat}
                <button
                  onClick={() => deleteCategory(cat)}
                  style={{ marginLeft: '8px', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <h3>Galerie ({gallery.length} éléments)</h3>
        <div className="gallery-grid" style={{ gap: '20px', justifyContent: 'center' }}>
          {gallery.map(item => (
            <div key={item._id} style={{ textAlign: 'center', maxWidth: '180px' }}>
              {item.url.endsWith('.mp4') ? (
                <video controls style={{ width: '100%', borderRadius: '12px', height: '120px', objectFit: 'cover' }}>
                  <source src={item.url} type="video/mp4" />
                </video>
              ) : (
                <img src={item.url} alt={item.caption} style={{ width: '100%', borderRadius: '12px', height: '120px', objectFit: 'cover' }} />
              )}
              <p style={{ margin: '6px 0 2px', fontSize: '13px' }}><strong>{item.category}</strong></p>
              {item.caption && <p style={{ fontSize: '11px', color: '#666' }}>{item.caption}</p>}
              <button
                onClick={() => deleteImage(item._id)}
                style={{ background: '#ff6b6b', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', marginTop: '6px', cursor: 'pointer' }}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Admin;