/**
 * ============================================================
 *  CONTENU DU PORTFOLIO — fichier de données unique
 * ============================================================
 *  Tout le texte affiché sur le site vient d'ici.
 *  Pour modifier le portfolio, il suffit d'éditer ce fichier :
 *  aucune autre modification n'est nécessaire.
 *
 *  Un champ laissé vide masque l'élément correspondant.
 *
 *  Seule exception : les balises <meta> (SEO / Open Graph) sont
 *  écrites en dur dans index.html, car les robots ne lisent pas le JS.
 * ============================================================
 */
window.PORTFOLIO = {
  identity: {
    name: "N'dri Konan Jean Jaurès",
    shortName: "Jean Jaurès",
    initials: "NJ",
    title: "Data Analyst · Développeur Full Stack",
    tagline:
      "Data Analyst et Développeur Full Stack : deux métiers que je maîtrise chacun pleinement. Je peux exercer l'un sans l'autre, ou les combiner quand un projet le demande.",
    location: "Abidjan, Côte d'Ivoire",
    availability: ["Freelance", "CDI", "Remote"],
    // Technologies affichées sous les boutons du hero (8 maximum conseillé)
    heroStack: ["Python", "Pandas", "SQL", "Power BI", "Django", "FastAPI", "React", "PostgreSQL"],
    email: "jjaures077@gmail.com",
    github: "https://github.com/Jojobcd",
    linkedin: "",
    cv: "",
  },

  about: {
    intro:
      "Je mène deux métiers, chacun avec ses missions, ses outils et ses résultats. Vous pouvez me recruter comme Data Analyst, comme Développeur Full Stack, ou pour un projet qui demande les deux.",
    // Deux profils autonomes et de même niveau. « filter » relie le bloc au filtre de projets.
    profiles: [
      {
        role: "Data Analyst",
        icon: "chart",
        filter: "data",
        pitch:
          "Je transforme des données brutes en décisions : extraction SQL, nettoyage Python, statistiques rigoureuses et tableaux de bord utilisés au quotidien.",
        text:
          "Pendant un an, j'ai mené une mission de data analyst à distance pour Mecatronix : extraction SQL, nettoyage Python, automatisation VBA et tableaux de bord Power BI pour trois équipes. Auparavant, au service comptable du Groupe Azalaï Hotels, j'ai automatisé les états financiers en Python et détecté des anomalies comptables par l'analyse de données. J'analyse aussi des données d'enquêtes nationales (EDS-CI, EHCVM).",
      },
      {
        role: "Développeur Full Stack",
        icon: "code",
        filter: "fullstack",
        pitch:
          "Je conçois et je livre des applications web de bout en bout : base de données, API, interface, déploiement et support, jusqu'à la production.",
        text:
          "À la DSI du Groupe Azalaï Hotels, j'ai créé deux applications : la gestion des commandes décentralisées, déployée sur 8 sites, et le suivi de la satisfaction client par QR code, qui a recueilli 1 200 réponses en 3 mois. Depuis octobre 2025, je pilote chez Legalis Africa le développement de deux plateformes SaaS : Sankofa, solution juridique, fiscale et comptable pour TPE/PME utilisée par 400 utilisateurs actifs, et AGORA, plateforme de gouvernance d'entreprise pour l'espace OHADA. J'y travaille en freelance depuis juin 2026.",
      },
    ],
    bridge: {
      title: "Et quand un projet demande les deux",
      text:
        "Les deux métiers se nourrissent dans les deux sens : une analyse peut devenir une application, et une application produit des données que je sais exploiter.",
      example:
        "Exemple : AgriCredit AI, un modèle de scoring (data) livré dans une application web et un canal USSD/SMS (full stack).",
    },
    approachTitle: "Une même exigence dans les deux métiers",
    approach: [
      {
        title: "Partir de la question",
        text: "Avant une analyse comme avant une application, je formule le besoin réel à servir.",
      },
      {
        title: "Vérifier avant d'affirmer",
        text: "Un chiffre publié doit tenir à la relecture, une application livrée doit tenir en production.",
      },
      {
        title: "Livrer quelque chose qui sert",
        text: "Un tableau de bord consulté chaque semaine, une application utilisée chaque jour : je mesure mon travail à son usage réel.",
      },
    ],
  },

  // Compétences : une colonne par métier (pas de pourcentages), puis les outils communs
  skills: [
    {
      domain: "Data Analyst",
      icon: "chart",
      groups: [
        {
          label: "",
          items: [
            "Python (Pandas, NumPy)",
            "SQL",
            "Power BI / Tableau",
            "Excel avancé & VBA",
            "Visualisation (Plotly, Seaborn)",
            "Nettoyage & analyse de données",
            "Statistiques (régression, tests)",
            "Scikit-learn, XGBoost, SHAP",
          ],
        },
      ],
    },
    {
      domain: "Développeur Full Stack",
      icon: "code",
      groups: [
        {
          label: "Backend",
          items: [
            "Python (Django, FastAPI, Flask)",
            "Java (Java EE, Spring Boot)",
            "PHP (Laravel)",
            "Node.js (Express)",
            "PostgreSQL",
            "API REST",
          ],
        },
        {
          label: "Frontend",
          items: ["JavaScript / TypeScript", "React", "HTML / CSS", "Tailwind CSS"],
        },
      ],
    },
  ],
  sharedTools: { label: "Outils communs", items: ["Git & GitHub", "Docker", "Linux"] },

  /**
   * Projets.
   *  - categories : "data" et/ou "fullstack" (sert aux filtres)
   *  - image      : capture réelle (sinon une illustration est générée)
   *  - dashboard  : true si le projet comprend un tableau de bord
   *                 (sert au chiffre clé « dashboards créés »)
   *  - result     : le résultat chiffré mis en avant sur la carte
   *  - cover      : illustration générée si pas d'image :
   *                 "chart" | "app" | "network" | "qr" | "sheet" | "vote"
   *  - confidential : true pour un projet d'entreprise dont le code
   *                   n'est pas public (badge + pas de liens)
   *  - context    : entreprise / cadre et période (affiché sur la carte)
   *  - hidden     : true pour retirer un projet du site sans le supprimer
   */
  projects: [
    {
      id: "octobre-rose",
      title: "Octobre Rose",
      subtitle: "Accès au dépistage du cancer du sein en Côte d'Ivoire",
      categories: ["data"],
      image: "assets/img/octobre-rose.webp",
      imageAlt: "Tableau de bord Octobre Rose : taux de dépistage par profil de femmes",
      dashboard: true,
      problem:
        "Quels profils de femmes (région, milieu, éducation, richesse) ont le moins accès au dépistage du cancer du sein ?",
      solution:
        "Analyse des microdonnées EDS-CI 2021 (14 870 femmes de 15 à 49 ans) : taux pondérés, régression logistique avec erreurs-types robustes par grappe, correction de Holm-Bonferroni, test de robustesse par tranche d'âge, puis tableau de bord interactif.",
      result: { value: "17,5 %", label: "de femmes déjà dépistées : à peine une sur six" },
      highlights: [
        "Éducation et richesse sont les facteurs les plus liés au dépistage (odds ratio ajustés ×5,04 et ×2,48), confirmés sur toutes les tranches d'âge.",
        "Le signal régional ne résiste pas au test de robustesse : présenté comme une piste, pas comme un acquis.",
        "Revue critique externe : 14 points soulevés, 14 corrigés et documentés.",
      ],
      stack: ["Python", "Pandas", "Statsmodels", "Plotly", "Power BI"],
      links: {
        demo: "https://jojobcd.github.io/octobre-rose-cancer-sein-ci/reports/dashboard.html",
        github: "https://github.com/Jojobcd/octobre-rose-cancer-sein-ci",
      },
    },
    {
      id: "agricredit",
      title: "AgriCredit AI",
      subtitle: "Scoring de risque de crédit agricole",
      categories: ["fullstack", "data"],
      image: "assets/img/agricredit.webp",
      imageAlt: "Page d'accueil d'AgriCredit AI : plateforme d'aide à la décision de crédit agricole",
      cover: "chart",
      dashboard: true,
      problem:
        "Les institutions de microfinance n'ont pas d'outil pour évaluer des agriculteurs sans historique bancaire.",
      solution:
        "Plateforme où les agents de terrain saisissent le profil de l'exploitation. Un microservice Python calcule un score XGBoost expliqué variable par variable (SHAP) ; l'agent garde la décision. Moteur à règles en secours et canal USSD/SMS pour les zones sans internet.",
      result: { value: "AUC 0,70", label: "contre 0,66 pour le moteur à règles de départ" },
      highlights: [
        "Score expliqué en points (SHAP) : chaque facteur qui augmente ou baisse le risque est affiché.",
        "Méthode validée sur un jeu réel public (German Credit) : AUC 0,78.",
        "Limite assumée : aucun jeu public africain ne relie exploitation et remboursement ; le modèle est entraîné sur des données semi-synthétiques calibrées.",
        "Tableau de bord en 3 vues, motifs de refus obligatoires, démo en ligne.",
      ],
      stack: ["FastAPI", "XGBoost", "SHAP", "Spring Boot", "Angular", "PostgreSQL"],
      links: {
        demo: "https://agricredit-frontend-p510.onrender.com",
        github: "",
      },
    },
    // --- Études de cas en entreprise (code confidentiel) ---
    {
      id: "sankofa",
      title: "Sankofa",
      subtitle: "SaaS juridique, fiscal et comptable pour TPE/PME",
      context: "Legalis Africa · 2025-2026",
      confidential: true,
      categories: ["fullstack"],
      image: "assets/img/sankofa.webp",
      imageAlt: "Page d'accueil de Sankofa by Legalis Africa, legaltech et taxtech",
      cover: "app",
      dashboard: true,
      problem:
        "Les TPE/PME ivoiriennes doivent jongler entre juriste, fiscaliste et comptable pour créer leur entreprise et rester en règle.",
      solution:
        "Plateforme SaaS qui regroupe création d'entreprise guidée, veille et calendrier fiscal, suivi des déclarations, comptabilité, automatisations et IA, avec paiement en ligne par Mobile Money.",
      result: { value: "400", label: "utilisateurs actifs en production" },
      highlights: [
        "Paiements Mobile Money intégrés : CinetPay, Kkiapay et API Wave.",
        "Création d'entreprise guidée en 4 étapes, avec dépôt sécurisé des pièces.",
        "Développement piloté au sein d'une équipe de 2 développeurs.",
      ],
      stack: ["Python", "Django", "JavaScript", "MySQL", "CinetPay", "Kkiapay", "Wave"],
      links: { demo: "https://www.sankofa-legaltech.com/", github: "" },
    },
    {
      id: "agora",
      title: "AGORA",
      subtitle: "Gouvernance d'entreprise pour l'espace OHADA",
      context: "Legalis Africa · 2025-2026",
      confidential: true,
      categories: ["fullstack"],
      image: "",
      cover: "vote",
      dashboard: false,
      problem:
        "Convoquer une assemblée, faire voter les résolutions et produire un procès-verbal conforme au droit OHADA reste un processus papier, long et risqué.",
      solution:
        "Plateforme qui couvre tout le cycle de la gouvernance : convocations, votes, résolutions, génération des procès-verbaux et audit de conformité.",
      result: { value: "Cycle complet", label: "de la convocation au procès-verbal, avec audit de conformité" },
      highlights: [
        "Conception et développement de la plateforme, de la maquette fonctionnelle à la production.",
        "Pilotage des livraisons avec une équipe de 2 développeurs.",
      ],
      stack: [],
      links: { demo: "", github: "" },
    },
    {
      id: "azalai-commandes",
      title: "Commandes multi-sites",
      subtitle: "Application de gestion des commandes décentralisées",
      context: "Groupe Azalaï Hotels · DSI · 2025",
      confidential: true,
      categories: ["fullstack"],
      image: "",
      cover: "network",
      dashboard: false,
      problem:
        "Les commandes des différents sites du groupe étaient gérées localement, sans vision commune ni suivi centralisé.",
      solution:
        "Conception et développement en autonomie d'une application web qui centralise les commandes de tous les sites, puis accompagnement des utilisateurs dans la prise en main et le dépannage au quotidien.",
      result: { value: "8 sites", label: "équipés, 25 collaborateurs utilisateurs" },
      highlights: [
        "Développée seul, du recueil du besoin au déploiement.",
        "Mise en service sur 8 sites, utilisée chaque jour par 25 collaborateurs.",
        "Formation et support des utilisateurs après la mise en production.",
      ],
      stack: [],
      links: { demo: "", github: "" },
    },
    {
      id: "azalai-satisfaction",
      title: "Satisfaction client par QR code",
      subtitle: "Collecte automatisée et alertes en temps réel",
      context: "Groupe Azalaï Hotels · DSI · 2025",
      confidential: true,
      categories: ["fullstack", "data"],
      image: "",
      cover: "qr",
      dashboard: true,
      problem:
        "Les retours des clients étaient peu collectés et arrivaient trop tard pour corriger un problème pendant le séjour.",
      solution:
        "QR codes qui renvoient vers des formulaires automatisés ; les réponses alimentent un suivi de la satisfaction, et les retours négatifs déclenchent une alerte en temps réel.",
      result: { value: "1 200", label: "réponses clients collectées en 3 mois" },
      highlights: [
        "Formulaires automatisés, accessibles sans application à installer.",
        "Alertes en temps réel pour traiter un mécontentement avant le départ du client.",
      ],
      stack: [],
      links: { demo: "", github: "" },
    },
    {
      id: "mecatronix-bi",
      title: "Reporting commercial & stocks",
      subtitle: "Tableaux de bord Power BI et rapports automatisés",
      context: "Mecatronix · Data Analyst · 2025-2026",
      confidential: true,
      categories: ["data"],
      image: "",
      cover: "sheet",
      dashboard: true,
      problem:
        "Les rapports mensuels prenaient 4 heures à produire à la main, à partir de données dispersées dans 4 sources, et les stocks dormants passaient inaperçus.",
      solution:
        "Extraction SQL et nettoyage Python (Pandas) de plus de 500 000 lignes, automatisation VBA de 8 rapports mensuels, puis 6 tableaux de bord Power BI (ventes, stocks, performance) pour les équipes commerciale, logistique et la direction.",
      result: { value: "4 h → 5 min", label: "pour produire les rapports mensuels" },
      highlights: [
        "8 rapports mensuels automatisés en VBA.",
        "6 tableaux de bord Power BI suivis par 3 équipes : commercial, logistique, direction.",
        "Analyses statistiques ayant permis d'identifier les références à faible rotation et d'ajuster le suivi des stocks.",
      ],
      stack: ["SQL", "Python", "Pandas", "Power BI", "Excel", "VBA"],
      links: { demo: "", github: "" },
    },
    {
      id: "azalai-compta",
      title: "Automatisation comptable",
      subtitle: "États financiers, rapprochements et reporting",
      context: "Groupe Azalaï Hotels · Direction Finance et DSI · 2024-2025",
      confidential: true,
      categories: ["data"],
      image: "",
      cover: "chart",
      dashboard: true,
      problem:
        "Les états financiers, les rapprochements et les rapports de suivi étaient préparés à la main à partir de nombreux fichiers Excel.",
      solution:
        "Scripts Python qui lisent les fichiers Excel, effectuent les rapprochements, repèrent les soldes manquants et produisent automatiquement les rapports et les tableaux de bord de suivi.",
      result: { value: "≈ 15 h", label: "économisées chaque mois sur les états financiers" },
      highlights: [
        "Préparation des rapports comptables ramenée de plusieurs heures à quelques minutes.",
        "Recherche automatique des soldes manquants.",
        "Détection d'anomalies comptables par l'analyse de données, avec la Direction financière et comptable.",
      ],
      stack: ["Python", "Pandas", "Excel"],
      links: { demo: "", github: "" },
    },
    {
      id: "pauvrete-ci",
      title: "Pauvreté des ménages",
      subtitle: "Prédire la pauvreté en Côte d'Ivoire (EHCVM 2021)",
      categories: ["data"],
      image: "assets/img/pauvrete-ci.webp",
      imageAlt: "Graphique des 15 variables les plus prédictives de la pauvreté (Random Forest)",
      dashboard: false,
      problem:
        "Peut-on repérer un ménage pauvre à partir de ses caractéristiques observables, sans connaître ses revenus ?",
      solution:
        "Fusion et nettoyage des fichiers ménage et bien-être de l'EHCVM 2021, analyse exploratoire, puis comparaison régression logistique / Random Forest en excluant toute variable ayant servi à calculer la cible.",
      result: { value: "AUC 0,84", label: "Random Forest, rappel de 76,5 %" },
      highlights: [
        "Taux de pauvreté recalculé : 37,5 %, identique au taux officiel, ce qui valide la préparation des données.",
        "Le milieu rural (54,4 %) est plus de deux fois plus touché que le milieu urbain (22,2 %).",
        "Projet réalisé en Master 1 Big Data & Intelligence Artificielle.",
      ],
      stack: ["Python", "Pandas", "Scikit-learn", "Seaborn", "Jupyter"],
      links: {
        demo: "",
        github: "https://github.com/jojobcd/prediction-pauvrete-cote-ivoire",
      },
    },
    {
      id: "gestagri",
      title: "GestAgri",
      subtitle: "Gestion de coopératives agricoles",
      hidden: true,
      categories: ["fullstack"],
      image: "",
      dashboard: true,
      problem:
        "Les coopératives suivent producteurs, parcelles, intrants et ventes dans des carnets et des fichiers Excel dispersés.",
      solution:
        "Application web centralisée : de la parcelle à la vente, avec gestion des stocks d'intrants, calcul des rendements, paiements et tableau de bord analytique. API REST sécurisée par JWT.",
      result: { value: "12 modules", label: "et 6 rôles, de l'agent de terrain au comptable" },
      highlights: [
        "Logique métier (stocks, montants) centralisée côté serveur pour garantir la cohérence.",
        "Compatible SQLite et PostgreSQL sans changer le code métier.",
      ],
      stack: ["React", "Vite", "Node.js", "Express", "Sequelize", "JWT"],
      links: { demo: "", github: "" },
    },
  ],

  // Expérience (de la plus récente à la plus ancienne)
  experience: [
    {
      role: "Développeur chef de projet",
      context: "Legalis Africa · Abidjan · en freelance depuis juin 2026",
      period: "oct. 2025 — aujourd'hui",
      duration: "",
      missions: [
        "Pilotage du développement de solutions SaaS avec une équipe de 2 développeurs : planification et suivi des livraisons.",
        "Conception et développement d'AGORA, plateforme de gouvernance d'entreprise pour l'espace OHADA.",
        "Conception et développement de Sankofa, SaaS juridique, fiscal et comptable pour TPE/PME, avec paiements Mobile Money (CinetPay, Kkiapay, Wave).",
        "Usage quotidien d'assistants de codage IA (Claude Code) pour le développement, les tests et le débogage.",
      ],
      results: [
        "Sankofa en production avec 400 utilisateurs actifs.",
        "Livraisons tenues dans les délais.",
      ],
    },
    {
      role: "Data Analyst",
      context: "Mecatronix · Abidjan · Mission à distance",
      period: "juin 2025 — juin 2026",
      duration: "1 an",
      missions: [
        "Automatisation VBA des rapports mensuels (8 rapports).",
        "Conception et maintenance de 6 tableaux de bord Power BI (ventes, stocks, performance) pour les équipes commerciale, logistique et la direction.",
        "Extraction SQL et nettoyage Python (Pandas) de plus de 500 000 lignes issues de 4 sources.",
        "Analyses statistiques et reportings Excel/Power BI sur la rotation des stocks.",
      ],
      results: [
        "Rapports mensuels produits en 5 minutes au lieu de 4 heures.",
        "6 tableaux de bord suivis par 3 équipes.",
        "Références à faible rotation identifiées, suivi des stocks ajusté.",
      ],
    },
    {
      role: "Stagiaire Développeur Full Stack",
      context: "Salam Management Services / Groupe Azalaï Hotels · DSI · Marcory",
      period: "janv. 2025 — juin 2025",
      duration: "6 mois",
      missions: [
        "Développement en autonomie d'une application web de gestion des commandes décentralisées.",
        "Suivi de la satisfaction client par QR code : formulaires automatisés et alertes en temps réel.",
        "Automatisation de tableaux de bord Excel/Python pour le suivi comptable.",
        "Accompagnement des utilisateurs et dépannage au quotidien.",
      ],
      results: [
        "Application déployée sur 8 sites, utilisée par 25 collaborateurs.",
        "1 200 réponses clients collectées en 3 mois.",
        "Préparation des rapports ramenée de plusieurs heures à quelques minutes.",
      ],
    },
    {
      role: "Stagiaire Développeur Python",
      context: "Salam Management Services / Groupe Azalaï Hotels · Direction Finance · Marcory",
      period: "juin 2024 — janv. 2025",
      duration: "7 mois",
      missions: [
        "Automatisation des états financiers et des rapprochements.",
        "Génération automatique de rapports à partir de fichiers Excel : soldes manquants, suivi comptable.",
        "Analyse de données comptables avec la Direction financière et comptable.",
      ],
      results: [
        "Environ 15 heures économisées par mois.",
        "Détection d'anomalies comptables par l'analyse de données.",
      ],
    },
  ],

  // Formation (de la plus récente à la plus ancienne)
  education: [
    { degree: "Master 2 Big Data & Intelligence Artificielle", school: "Institut Universitaire d'Abidjan · Cocody", period: "depuis oct. 2026", status: "En cours" },
    { degree: "Master 1 Big Data & Intelligence Artificielle", school: "Institut Universitaire d'Abidjan · Cocody", period: "déc. 2025 — juil. 2026" },
    { degree: "Licence MIAGE (Méthodes informatiques appliquées à la gestion des entreprises)", school: "Université Polytechnique de Bingerville", period: "janv. 2022 — mars 2024" },
  ],

  /**
   * Chiffres clés.
   *  - value : nombre fixe, OU
   *  - from  : "projects" (nombre de projets) / "dashboards" (projets avec dashboard: true)
   *            → calculé automatiquement depuis la liste ci-dessus
   */
  stats: [
    { value: 2, suffix: " ans", label: "en développement full stack" },
    { value: 1, suffix: " an", label: "en analyse de données" },
    { from: "projects", label: "projets livrés" },
    // + 5 : les 6 tableaux Power BI de Mecatronix comptent pour 6, mais leur carte projet en compte déjà 1
    { from: "dashboards", plus: 5, label: "tableaux de bord créés" },
  ],

  contact: {
    intro:
      "Un poste de Data Analyst, un poste de développeur, ou un projet qui demande les deux ? Parlons-en.",
    // Identifiant Formspree (ex. "xyzabcde"). Vide → le formulaire ouvre la messagerie de l'utilisateur.
    formspreeId: "",
  },
};
