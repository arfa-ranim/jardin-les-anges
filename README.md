# Jardin des Anges – Site vitrine + Dashboard Supabase

Site vitrine responsive construit avec **React 19 + Vite + Tailwind CSS v4** et un backend **100% Supabase** pour gérer les contenus, les catégories et la galerie média.  
L'interface publique charge dynamiquement les textes enregistrés dans Supabase et l'espace Admin permet de modifier ces contenus, créer des catégories et téléverser des images/vidéos en stockage Supabase.

## 🚀 Pile technique

- **Frontend**: Vite + React 19 + React Router v7
- **Styling**: Tailwind CSS 4.1 (via `@tailwindcss/postcss`)
- **Backend**: Supabase (tables + Storage public)
- **Linting**: ESLint 9

## 📦 Installation

```bash
npm install
```

## ⚙️ Configuration

1. Créez un fichier `.env.local` à la racine du projet
2. Copiez les variables d'environnement nécessaires depuis votre projet Supabase

### Variables d'environnement requises

| Variable | Description |
| --- | --- |
| `VITE_SUPABASE_URL` | URL du projet Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clé `anon` (publique) de votre projet Supabase |
| `VITE_SUPABASE_STORAGE_BUCKET` | Nom du bucket (par défaut `gallery-media`) |
| `VITE_SUPABASE_GALLERY_TABLE` | Table des médias (par défaut `gallery_items`) |
| `VITE_SUPABASE_CATEGORY_TABLE` | Table des catégories (par défaut `gallery_categories`) |
| `VITE_SUPABASE_TEXT_TABLE` | Table des textes (par défaut `site_texts`) |
| `VITE_ADMIN_EMAIL` | Email admin affiché dans l'interface |

> ⚠️ **Important**: Ne commitez jamais votre fichier `.env.local` dans le dépôt Git. Ajoutez-le à votre `.gitignore`.

## 🏃 Démarrage

```bash
npm run dev
```

L'application sera accessible sur : http://localhost:5173

## 🗄️ Configuration Supabase

### Tables à créer

Créez ces tables dans votre projet Supabase (toutes avec `RLS` activé) :

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

### Configuration du Storage

1. Créez un bucket public nommé `gallery-media` (ou le nom que vous avez configuré dans `VITE_SUPABASE_STORAGE_BUCKET`)
2. Configurez les politiques de stockage :

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

### Configuration de l'authentification

1. Dans le tableau de bord Supabase, allez dans **Authentication** → **Users**
2. Créez un utilisateur admin avec un email et un mot de passe
3. Utilisez cet email dans la variable `VITE_ADMIN_EMAIL`

> 💡 L'authentification utilise **Supabase Auth** avec JWT. Les opérations d'écriture sont protégées par des règles RLS qui vérifient `auth.jwt() IS NOT NULL`.

## 👨‍💼 Utilisation de l'admin

1. Rendez-vous sur `/admin`
2. Connectez-vous avec l'**email** et le **mot de passe** de l'utilisateur Supabase Auth
3. Trois zones de gestion :
   - **Textes du site** : modification des textes dynamiques
   - **Catégories** : création/suppression de catégories
   - **Galerie** : téléversement d'images/vidéos et suppression

## 📝 Structure des contenus

| Page | Clés concernées |
| --- | --- |
| Accueil | `home.*` |
| À propos | `about.*` |
| Activités | `activities.*` |
| Galerie | `gallery.*` |
| Contact / Footer | `contact.*` |

Tous les éléments ont des valeurs par défaut. Dès que vous sauvegardez via l'admin, Supabase prend le relais.

## 🚢 Build & déploiement

```bash
npm run build
npm run preview   # pour tester localement le build
```

### Déploiement sur Vercel / Netlify

1. Poussez le dépôt sur GitHub/GitLab
2. Connectez votre dépôt à Vercel/Netlify
3. Configurez :
   - **Framework**: Vite
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
   - **Environment variables**: Ajoutez toutes les variables `VITE_*` listées ci-dessus
4. Vérifiez que le bucket Supabase est public et que les tables contiennent des données

## 🐛 Résolution de problèmes

- **La galerie ne se charge pas** : Vérifiez les variables `VITE_SUPABASE_*`, les règles RLS et que le bucket est public
- **Upload impossible** : 
  - Vérifiez que vous êtes connecté (le JWT doit être présent)
  - Vérifiez les politiques RLS sur les tables et le bucket Storage
  - Assurez-vous que `auth.jwt() IS NOT NULL` dans vos politiques d'écriture
- **Connexion admin échoue** : 
  - Vérifiez que l'utilisateur existe dans Supabase Auth
  - Vérifiez que l'email correspond exactement
- **Erreurs de console** : Lancez `npm run lint`

## 📜 Scripts disponibles

| Commande | Description |
| --- | --- |
| `npm run dev` | Développement avec HMR |
| `npm run build` | Build de production |
| `npm run preview` | Prévisualise le dossier `dist` |
| `npm run lint` | Vérifie le code avec ESLint |

## 📄 Licence

Ce projet est sous licence MIT.

---

Made with ❤️ using React, Vite, and Supabase
