

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

const galleryItems = [
  // === LES ENFANTS EN ACTIVITÉ ===
  { category: "Les enfants en activité", url: "/vid/enfant_jouant1.mp4", alt: "Enfant jouant", caption: "" },
  { category: "Les enfants en activité", url: "/img/enfants_jouant.jpg", alt: "Enfants jouant", caption: "" },
  { category: "Les enfants en activité", url: "/vid/fille-painture.mp4", alt: "Fille qui peint", caption: "" },
  { category: "Les enfants en activité", url: "/vid/enfant_jouant2.mp4", alt: "Enfant jouant", caption: "" },

  // === NOS LOCAUX ===
  { category: "Nos locaux", url: "/img/colloire.jpg", alt: "Couloir", caption: "Couloir" },
  { category: "Nos locaux", url: "/img/classe.jpg", alt: "Classe", caption: "Nos classes" },
  { category: "Nos locaux", url: "/img/3ans.jpg", alt: "Classe 3 ans", caption: "Classe 3 ans" },
  { category: "Nos locaux", url: "/img/3ans1.jpg", alt: "Classe 3 ans", caption: "Classe 3 ans" },
  { category: "Nos locaux", url: "/img/4ans.jpg", alt: "Classe 4 ans", caption: "Classe 4 ans" },
  { category: "Nos locaux", url: "/img/4ans2.jpg", alt: "Classe 4 ans", caption: "Classe 4 ans" },
  { category: "Nos locaux", url: "/img/classe_5ans.jpg", alt: "Classe 5 ans", caption: "Classe 5 ans" },
  { category: "Nos locaux", url: "/img/5ans1.jpg", alt: "Classe 5 ans", caption: "Classe 5 ans" },

  // === NOS JARDINS ===
  { category: "Nos jardins", url: "/img/jardin-interiore.jpg", alt: "Jardin intérieur", caption: "" },
  { category: "Nos jardins", url: "/img/jardin4.jpg", alt: "Jardin", caption: "" },
  { category: "Nos jardins", url: "/img/jardin5.jpg", alt: "Jardin", caption: "" },
  { category: "Nos jardins", url: "/img/jardin.jpg", alt: "Jardin", caption: "" },
  { category: "Nos jardins", url: "/img/jardin2.jpg", alt: "Jardin", caption: "" },
  { category: "Nos jardins", url: "/img/jardin3.jpg", alt: "Jardin", caption: "" },

  // === ÉVÉNEMENTS SPÉCIAUX ===
  { category: "Événements spéciaux", url: "/img/evenements1.jpg", alt: "Événement", caption: "" },
  { category: "Événements spéciaux", url: "/img/evenements.jpg", alt: "Événement", caption: "" },
  { category: "Événements spéciaux", url: "/img/anniversaire-faite.jpg", alt: "Anniversaire", caption: "" },
  { category: "Événements spéciaux", url: "/img/faite-du-mere.jpg", alt: "Fête des mères", caption: "" },
  { category: "Événements spéciaux", url: "/img/evenements2.jpg", alt: "Événement", caption: "" },
  { category: "Événements spéciaux", url: "/img/evenements3.jpg", alt: "Événement", caption: "" },
];

const GalleryItem = mongoose.model('GalleryItem', new mongoose.Schema({
  category: String,
  url: String,
  alt: String,
  caption: String
}));

(async () => {
  try {
    await GalleryItem.deleteMany({}); // Clear old data
    await GalleryItem.insertMany(galleryItems);
    console.log('Gallery seeded with', galleryItems.length, 'items');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();