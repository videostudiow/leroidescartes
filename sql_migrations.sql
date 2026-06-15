-- ============================================================
-- Le Roi Des Cartes — Migrations SQL Supabase
-- À exécuter dans Supabase SQL Editor dans cet ordre
-- ============================================================

-- ── Tables communes ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_colors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  label text NOT NULL
);

CREATE TABLE IF NOT EXISTS site_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- ── Table spécifique boutique ────────────────────────────────

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  day_of_week text NOT NULL,
  start_time text NOT NULL,
  end_time text NOT NULL,
  image_url text,
  active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ── RLS — Row Level Security ─────────────────────────────────

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Lecture publique
CREATE POLICY "Public read site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Public read site_colors" ON site_colors FOR SELECT USING (true);
CREATE POLICY "Public read site_info" ON site_info FOR SELECT USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);

-- Écriture contact_messages (anonyme peut insérer — formulaire public)
CREATE POLICY "Public insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Lecture admin sur contact_messages
CREATE POLICY "Admin read contact_messages" ON contact_messages FOR SELECT
  USING (auth.role() = 'authenticated');

-- Écriture admin (UPDATE + DELETE)
CREATE POLICY "Admin write site_content" ON site_content FOR ALL
  USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write site_colors" ON site_colors FOR ALL
  USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write site_info" ON site_info FOR ALL
  USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write contact_messages" ON contact_messages FOR ALL
  USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write events" ON events FOR ALL
  USING (auth.role() = 'authenticated');

-- ── Supabase Storage — Bucket "media" ───────────────────────
-- À créer depuis le Dashboard Supabase > Storage > New Bucket
-- Nom : media
-- Public : OUI (accès public en lecture)

-- ── Seed — Contenu initial ───────────────────────────────────

INSERT INTO site_content (key, value) VALUES
  ('topbar_livraison', 'Livraison GRATUITE au Canada à partir de 250 $'),
  ('topbar_adresse', '347 Rue Duvernay, Beloeil'),
  ('hero_badge', 'BOUTIQUE FAMILIALE'),
  ('hero_titre_ligne1', 'LE REPAIRE'),
  ('hero_titre_ligne2', 'DES COLLECTIONNEURS'),
  ('hero_titre_ligne3', 'DE LA RIVE-SUD.'),
  ('hero_description', 'Pokémon, Magic, Riftbound, Yu-Gi-Oh!, NHL, Funko Pop — et tout ce qui se chasse, se trade, se sleeve ou se garde sous étui. Boutique familiale à Beloeil, livraison partout au Canada.'),
  ('hero_cta_principal', 'Magasiner les Boosters'),
  ('hero_cta_secondaire', 'Soirées de Jeu'),
  ('hero_stat_1_valeur', '18k+'),
  ('hero_stat_1_label', 'Cartes en stock'),
  ('hero_stat_2_valeur', '7 jrs/7'),
  ('hero_stat_2_label', 'Ouvert'),
  ('hero_stat_3_valeur', '12 h'),
  ('hero_stat_3_label', 'Support offert'),
  ('categories_titre', 'CHOISIS TON TERRAIN DE CHASSE'),
  ('categories_lien', 'voir tout le catalogue →'),
  ('evenements_badge', 'LA TABLE EST PRÊTE'),
  ('evenements_titre_ligne1', 'CHAQUE SEMAINE,'),
  ('evenements_titre_ligne2', 'ON JOUE POUR VRAI.'),
  ('evenements_description', 'Pas besoin d''être pro — juste d''avoir envie. Tables, sleeves, et même un coup de main pour bâtir ton premier deck.'),
  ('evenements_cta', 'Réserver ma place'),
  ('partenaires_badge', 'DISTRIBUTEUR AUTORISÉ'),
  ('breakouts_badge', 'EN DIRECT'),
  ('breakouts_titre', 'BREAKOUTS DU JEUDI SOIR'),
  ('breakouts_description', 'On ouvre les hotties box devant la caméra. Tu purrais une équipe, une division, ou un random — tu gardes les hits. On joue pour vrai avec un risque 97.'),
  ('breakouts_cta_principal', 'Voir les Breaks à venir'),
  ('breakouts_cta_secondaire', 'Regarder en direct'),
  ('visite_badge', 'EN PERSONNE'),
  ('visite_titre_ligne1', 'PASSE NOUS VOIR'),
  ('visite_titre_ligne2', 'À BELOEIL.'),
  ('visite_description', 'Entreprise familiale. On parle cartes, on trade, on évalue ta collection — plus ou moins un ami et un Funko Pop qui fait la photo.'),
  ('apropos_titre', 'Notre histoire'),
  ('apropos_sous_titre', 'Entreprise familiale depuis le début'),
  ('apropos_texte', 'Le Roi Des Cartes est né d''une passion pour les cartes de collection. Nous avons comme mission de donner un service de première qualité, avec passion et amour.'),
  ('apropos_valeur_1_titre', 'Livraison gratuite'),
  ('apropos_valeur_1_texte', 'Sur toutes les commandes de 250 $ et plus au Canada'),
  ('apropos_valeur_2_titre', 'Paiements sécurisés'),
  ('apropos_valeur_2_texte', '100 % sécurisé via Shopify — aucune donnée stockée'),
  ('apropos_valeur_3_titre', 'Support 12h/jour'),
  ('apropos_valeur_3_texte', 'Disponibles du matin au soir pour vos questions'),
  ('apropos_valeur_4_titre', 'Boutique familiale'),
  ('apropos_valeur_4_texte', 'Service personnalisé, passion authentique'),
  ('contact_titre', 'Contactez-nous'),
  ('contact_description', 'Question sur un produit, évaluation de carte, événement — on est là.'),
  ('footer_description', 'Boutique familiale de cartes à collectionner et objets géek. Avec nous, vous trouverez ce que vous cherchez pour les chasseurs, les joueurs, et les nostalgiques.'),
  ('hero_image_url', ''),
  ('logo_url', 'https://leroidescartes.ca/cdn/shop/files/LeRoiDesCartes_LOGO.png?v=1745604164')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_colors (key, value, label) VALUES
  ('background', '#EDE8D7', 'Arrière-plan (fond crème)'),
  ('text', '#0F0F0F', 'Couleur du texte principal'),
  ('primary', '#E53935', 'Couleur principale (rouge)'),
  ('secondary', '#F5C52B', 'Couleur secondaire (jaune)'),
  ('accent', '#22C55E', 'Couleur accent (vert LIVE)'),
  ('dark', '#0F0F0F', 'Couleur sombre (sections)'),
  ('muted', '#6B6B6B', 'Textes secondaires'),
  ('border', '#D4CEB8', 'Bordures')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_info (key, value) VALUES
  ('nom', 'Le Roi Des Cartes'),
  ('adresse', '347 Rue Duvernay, Beloeil, QC'),
  ('telephone', '(450) 281-0625'),
  ('email', 'dsm.sportscards@gmail.com'),
  ('heures_lundi', '10h–17h'),
  ('heures_mardi', '10h–17h'),
  ('heures_mercredi', '10h–17h'),
  ('heures_jeudi', '10h–21h'),
  ('heures_vendredi', '10h–21h'),
  ('heures_samedi', '10h–17h'),
  ('heures_dimanche', '9h–17h'),
  ('facebook', 'https://www.facebook.com/p/Le-Roi-des-Cartes-100064515383829/'),
  ('tiktok', 'https://www.tiktok.com/@leroidescartes'),
  ('ebay', 'https://www.ebay.com/str/mojocards'),
  ('domain', 'https://leroidescartes.ca')
ON CONFLICT (key) DO NOTHING;

INSERT INTO events (title, description, day_of_week, start_time, end_time, active, sort_order) VALUES
  ('Soirées Riftbound', 'Venez découvrir Riftbound, le nouveau TCG de League of Legends. Tables disponibles, débutants bienvenus.', 'jeudi', '19h', '22h', true, 1),
  ('Magic Night', 'Commander, Draft, Legacy — tous les formats. Bienvenue aux débutants. On prête des decks si tu n''en as pas encore.', 'vendredi', '19h', '22h', true, 2),
  ('Trading Day', 'Échanges entre collectionneurs. Apportez vos doublons, votre binder, vos listes. Évaluations gratuites sur place.', 'samedi', '10h', '17h', true, 3);
