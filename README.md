## Jardin des Anges – Site vitrine + Dashboard Supabase

Vitrine responsive construite avec **React 19 + Vite + Tailwind CSS v4** et un backend **100 % Supabase** pour gérer les contenus, les catégories et la galerie média.  
L’interface publique charge dynamiquement les textes enregistrés dans Supabase et l’espace Admin permet de modifier ces contenus, créer des catégories et téléverser des images/vidéos en stockage Supabase.

### Pile technique
- Vite + React 19 + React Router v7
- Tailwind CSS 4.1 (via `@tailwindcss/postcss`)
- Supabase (tables + Storage public)
- ESLint 9

---

## Démarrage rapide

```bash
npm install
cp env.example.txt .env.local   # puis compléter les valeurs
npm run dev
```

Accès local : http://localhost:5173

### Variables d’environnement (fichier `.env.local`)

| Variable | Description |
| --- | --- |
| `VITE_SUPABASE_URL` | URL du projet Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clé `anon` (publique) |
| `VITE_SUPABASE_STORAGE_BUCKET` | Nom du bucket (par défaut `gallery-media`) |
| `VITE_SUPABASE_GALLERY_TABLE` | Table des médias (par défaut `gallery_items`) |
| `VITE_SUPABASE_CATEGORY_TABLE` | Table des catégories (par défaut `gallery_categories`) |
| `VITE_SUPABASE_TEXT_TABLE` | Table des textes (par défaut `site_texts`) |
| `VITE_ADMIN_EMAIL` | Email admin affiché dans l’interface (ex. `dorsaf.kharbeche@gmail.com`) |

> ✅ L’authentification utilise **Supabase Auth** avec JWT. Les opérations d’écriture sont protégées par des règles RLS qui vérifient `auth.jwt()`.

---

## Modèle Supabase

Créez ces tables (toutes `RLS` activées) :

```sql
create table site_texts (
  key text primary key,
  value text
);

create table gallery_categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  description text,
  inserted_at timestamp with time zone default now()
);

create table gallery_items (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  caption text,
  media_url text not null,
  media_type text check (media_type in ('image','video')),
  storage_path text,
  created_at timestamp with time zone default now()
);
```

### Règles RLS (Row Level Security)

**Lecture publique** (toutes les tables) :
```sql
-- site_texts
CREATE POLICY "Public read access" ON site_texts FOR SELECT USING (true);

-- gallery_categories
CREATE POLICY "Public read access" ON gallery_categories FOR SELECT USING (true);

-- gallery_items
CREATE POLICY "Public read access" ON gallery_items FOR SELECT USING (true);
```

**Écriture réservée aux utilisateurs authentifiés** :
```sql
-- site_texts (insert/update)
CREATE POLICY "Authenticated users can update" ON site_texts FOR INSERT 
  WITH CHECK (auth.jwt() IS NOT NULL);
CREATE POLICY "Authenticated users can update" ON site_texts FOR UPDATE 
  USING (auth.jwt() IS NOT NULL);

-- gallery_categories (insert/update/delete)
CREATE POLICY "Authenticated users can manage" ON gallery_categories FOR ALL 
  USING (auth.jwt() IS NOT NULL);

-- gallery_items (insert/update/delete)
CREATE POLICY "Authenticated users can manage" ON gallery_items FOR ALL 
  USING (auth.jwt() IS NOT NULL);
```

> 💡 Les politiques vérifient `auth.jwt() IS NOT NULL` pour s’assurer qu’un utilisateur est authentifié via Supabase Auth. Le JWT est automatiquement inclus dans les requêtes après connexion.

### Stockage
1. Créez un bucket public `gallery-media`.
2. **Politique de stockage** : autorisez `SELECT` pour `anon` (lecture publique), mais `INSERT` et `DELETE` uniquement pour les utilisateurs authentifiés :
   ```sql
   -- Lecture publique
   CREATE POLICY "Public read access" ON storage.objects FOR SELECT 
     USING (bucket_id = 'gallery-media');
   
   -- Écriture/suppression pour utilisateurs authentifiés
   CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT 
     WITH CHECK (bucket_id = 'gallery-media' AND auth.jwt() IS NOT NULL);
   CREATE POLICY "Authenticated users can delete" ON storage.objects FOR DELETE 
     USING (bucket_id = 'gallery-media' AND auth.jwt() IS NOT NULL);
   ```
3. Le code enregistre toujours `storage_path` afin de supprimer le fichier au besoin.

---

## Configuration Supabase Auth

1. Dans le tableau de bord Supabase, allez dans **Authentication** → **Users**.
2. Créez un utilisateur avec l’email admin (ex. `dorsaf.kharbeche@gmail.com`) et définissez un mot de passe.
3. L’utilisateur peut également s’inscrire via l’interface si vous activez l’inscription, mais pour un usage admin, créez-le manuellement.

> ⚠️ **Important** : L’email et le mot de passe utilisés pour se connecter doivent correspondre à un utilisateur créé dans Supabase Auth. Le JWT généré après connexion sera automatiquement inclus dans toutes les requêtes Supabase.

## Utilisation de l’admin

1. Rendez-vous sur `/admin`.
2. Connectez-vous avec l’**email** et le **mot de passe** de l’utilisateur Supabase Auth.
3. Trois zones :
   - **Textes du site** : chaque champ correspond à une clé Supabase listée dans `editableTextFields`.
   - **Catégories** : création/suppression et affichage instantané.
   - **Galerie** : téléversement d’image ou vidéo (toutes les extensions acceptées par Supabase Storage) + suppression.

Le tableau de bord appelle directement Supabase via `@supabase/supabase-js`. La session est persistée dans le navigateur, et le JWT est automatiquement inclus dans toutes les requêtes. Gardez le navigateur ouvert le temps des uploads (la progression s’affiche dans les boutons).

---

## Mise à jour des contenus publics

| Page | Clés concernées |
| --- | --- |
| Accueil | `home.*` |
| À propos | `about.*` |
| Activités | `activities.*` |
| Galerie | `gallery.*` |
| Contact / Footer | `contact.*` |

Tous les éléments ont des valeurs par défaut (`defaultTexts`). Dès que vous sauvegardez via l’admin, Supabase prend le relais.

---

## Contact et formulaire

- Le formulaire `/contact` ouvre automatiquement WhatsApp sur le numéro configuré (`contact.whatsapp`).
- Les coordonnées, horaires et liens sont alimentés par Supabase pour rester synchronisés avec le footer.

---

## Build & déploiement (Vercel / Netlify)

```bash
npm run build
npm run preview   # pour tester localement le build
```

1. Poussez le dépôt sur GitHub/GitLab.
2. Sur Vercel/Netlify :
   - Framework = Vite.
   - Commande = `npm run build`.
   - Dossier de sortie = `dist`.
   - Ajoutez **toutes** les variables d’environnement listées plus haut.
3. Vérifiez que le bucket Supabase est public et que les tables contiennent au moins quelques données.

---

## Résolution de problèmes
- **La galerie ne se charge pas** : vérifiez `VITE_SUPABASE_*` + RLS + bucket public.
- **Upload impossible** : 
  - Vérifiez que vous êtes connecté (le JWT doit être présent).
  - Vérifiez les politiques RLS sur les tables et le bucket Storage.
  - Assurez-vous que `auth.jwt() IS NOT NULL` dans vos politiques d’écriture.
- **Connexion admin échoue** : 
  - Vérifiez que l’utilisateur existe dans Supabase Auth avec l’email et le mot de passe corrects.
  - Vérifiez que l’email correspond exactement (case-sensitive pour certains cas).
- **Console errors** : lancez `npm run lint`.

---

## Scripts NPM
| Commande | Description |
| --- | --- |
| `npm run dev` | Développement avec HMR |
| `npm run build` | Build de production |
| `npm run preview` | Prévisualise le dossier `dist` |
| `npm run lint` | Vérifie le code avec ESLint |

Bonne continuation avec Jardin des Anges 🌼
