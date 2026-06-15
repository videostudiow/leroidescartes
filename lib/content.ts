// Valeurs par défaut — toutes les clés doivent exister aussi dans le seed SQL.
// Ces valeurs sont écrasées par ce qui est en Supabase (getSiteData).

export const defaultContent: Record<string, string> = {
  // Top bar
  topbar_livraison: "Livraison GRATUITE au Canada à partir de 250 $",
  topbar_adresse: "347 Rue Duvernay, Beloeil",

  // Hero
  hero_badge: "BOUTIQUE FAMILIALE",
  hero_titre_ligne1: "LE REPAIRE",
  hero_titre_ligne2: "DES COLLECTIONNEURS",
  hero_titre_ligne3: "DE LA RIVE-SUD.",
  hero_description:
    "Pokémon, Magic, Riftbound, Yu-Gi-Oh!, NHL, Funko Pop — et tout ce qui se chasse, se trade, se sleeve ou se garde sous étui. Boutique familiale à Beloeil, livraison partout au Canada.",
  hero_cta_principal: "Magasiner les Boosters",
  hero_cta_secondaire: "Soirées de Jeu",
  hero_stat_1_valeur: "18k+",
  hero_stat_1_label: "Cartes en stock",
  hero_stat_2_valeur: "7 jrs/7",
  hero_stat_2_label: "Ouvert",
  hero_stat_3_valeur: "12 h",
  hero_stat_3_label: "Support offert",

  // Catégories
  categories_titre: "CHOISIS TON TERRAIN DE CHASSE",
  categories_lien: "voir tout le catalogue →",

  // Événements
  evenements_badge: "LA TABLE EST PRÊTE",
  evenements_titre_ligne1: "CHAQUE SEMAINE,",
  evenements_titre_ligne2: "ON JOUE POUR VRAI.",
  evenements_description:
    "Pas besoin d'être pro — juste d'avoir envie. Tables, sleeves, et même un coup de main pour bâtir ton premier deck.",
  evenements_cta: "Réserver ma place",

  // Partenaires
  partenaires_badge: "DISTRIBUTEUR AUTORISÉ",

  // Breakouts
  breakouts_badge: "EN DIRECT",
  breakouts_titre: "BREAKOUTS DU JEUDI SOIR",
  breakouts_description:
    "On ouvre les hotties box devant la caméra. Tu purrais une équipe, une division, ou un random — tu gardes les hits. Rift et TCG, chances égales, on reparte avec un résultat. On joue pour vrai, avec un risque 97.",
  breakouts_cta_principal: "Voir les Breaks à venir",
  breakouts_cta_secondaire: "Regarder en direct",

  // Visite
  visite_badge: "EN PERSONNE",
  visite_titre_ligne1: "PASSE NOUS VOIR",
  visite_titre_ligne2: "À BELOEIL.",
  visite_description:
    "Entreprise familiale. On parle cartes, on trade, on évalue ta collection — plus ou moins un ami et un Funko Pop qui fait la photo.",

  // À propos
  apropos_titre: "Notre histoire",
  apropos_sous_titre: "Entreprise familiale depuis le début",
  apropos_texte:
    "Le Roi Des Cartes est né d'une passion pour les cartes de collection. Nous avons comme mission de donner un service de première qualité, avec passion et amour. Boutique familiale à Beloeil, on connaît nos clients par leur prénom et leur deck de cœur.",
  apropos_valeur_1_titre: "Livraison gratuite",
  apropos_valeur_1_texte: "Sur toutes les commandes de 250 $ et plus au Canada",
  apropos_valeur_2_titre: "Paiements sécurisés",
  apropos_valeur_2_texte: "100 % sécurisé via Shopify — aucune donnée stockée",
  apropos_valeur_3_titre: "Support 12h/jour",
  apropos_valeur_3_texte: "Disponibles du matin au soir pour vos questions",
  apropos_valeur_4_titre: "Boutique familiale",
  apropos_valeur_4_texte: "Service personnalisé, passion authentique",

  // Contact
  contact_titre: "Contactez-nous",
  contact_sous_titre: "On vous répond vite",
  contact_description:
    "Question sur un produit, évaluation de carte, événement — on est là.",

  // Footer
  footer_description:
    "Boutique familiale de cartes à collectionner et objets géek. Avec nous, vous trouverez ce que vous cherchez pour les chasseurs, les joueurs, et les nostalgiques.",
  footer_watermark: "Site créé par Studio W",

  // Images
  hero_image_url: "",
  logo_url:
    "https://leroidescartes.ca/cdn/shop/files/LeRoiDesCartes_LOGO.png?v=1745604164",
};

export const defaultSiteInfo: Record<string, string> = {
  nom: "Le Roi Des Cartes",
  adresse: "347 Rue Duvernay, Beloeil, QC",
  telephone: "(450) 281-0625",
  email: "dsm.sportscards@gmail.com",
  heures_lundi: "10h–17h",
  heures_mardi: "10h–17h",
  heures_mercredi: "10h–17h",
  heures_jeudi: "10h–21h",
  heures_vendredi: "10h–21h",
  heures_samedi: "10h–17h",
  heures_dimanche: "9h–17h",
  facebook: "https://www.facebook.com/p/Le-Roi-des-Cartes-100064515383829/",
  tiktok: "https://www.tiktok.com/@leroidescartes",
  ebay: "https://www.ebay.com/str/mojocards",
  domain: "https://leroidescartes.ca",
};

export const defaultColors: Record<string, string> = {
  background: "#EDE8D7",
  text: "#0F0F0F",
  primary: "#E53935",
  secondary: "#F5C52B",
  accent: "#22C55E",
  dark: "#0F0F0F",
  muted: "#6B6B6B",
  border: "#D4CEB8",
};
