export type Project = {
  title: string;
  slug: string;
  category: 'Statistique' | 'Data Visualisation' | 'Géospatial' | 'Recherche' | 'Web' | 'IA';
  image: string;
  summary: string;
  impact: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  private?: boolean;
  featured?: boolean;
};

const github = 'https://github.com/grimael';
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
const projectImage = asset('/assets/Images/Project.svg');
const image = (name: string) => asset(`/assets/Images/optimized/${name}.webp`);

export const projects: Project[] = [
  {
    title: 'OpenDataViz — Observatoire économique africain',
    slug: 'opendataviz-observatoire-afrique',
    category: 'Data Visualisation',
    image: image('opendataviz'),
    summary:
      "Observatoire de données couvrant les 54 pays africains : un pipeline ETL Python extrait chaque jour 60 indicateurs répartis en quatre pôles (Économie, Santé, Éducation, Infrastructure) depuis l'API de la Banque mondiale, les charge dans un entrepôt DuckDB en modèle en étoile, comble les lacunes par imputation ML (KNN / itérative) et projette cinq ans en avant (ElasticNet).",
    impact:
      "Environ 80 000 enregistrements traçables — observés, imputés ou projetés — servis par une API FastAPI (export CSV, Excel, Stata, SPSS, Parquet), un dashboard Astro doté d'un atelier de statistiques avancées, et un assistant IA qui répond uniquement à partir de requêtes réelles sur l'entrepôt (8 outils, Groq / Gemini).",
    stack: ['Python', 'DuckDB', 'scikit-learn', 'FastAPI', 'Astro', 'Chart.js'],
    liveUrl: 'https://opendataviz.onrender.com',
    repoUrl: `${github}/opendataviz-pipeline`,
    featured: true
  },
  {
    title: 'Dashboard Churn Télécom & Assistant IA',
    slug: 'dashboard-churn-telecom-ia',
    category: 'Data Visualisation',
    image: image('churn-dashboard'),
    summary:
      "Dashboard d'analyse du churn pour un opérateur télécom californien, construit à partir de 6 fichiers Excel bruts liés par client, pour identifier qui résilie, pourquoi et où — avec la rigueur statistique d'une vraie analyse (tests du χ², V de Cramér, mise en garde sur les corrélations concomitantes).",
    impact:
      "Assistant IA intégré (bouton flottant) qui répond en langage naturel en interrogeant librement les 7 043 clients — pas seulement des agrégats précalculés — via Gemini avec bascule automatique vers Groq, et deux outils de requêtage dédiés.",
    stack: ['R', 'Shiny', 'Gemini API', 'Groq', 'Analyse statistique'],
    liveUrl: 'https://grimus.shinyapps.io/Dash/',
    repoUrl: `${github}/R_Data_Viz`
  },
  {
    title: 'Prédiction NPS client — Challenge Artefact',
    slug: 'prediction-nps-artefact',
    category: 'IA',
    image: image('nps'),
    summary:
      "Prédiction de la catégorie NPS (Detractor / Passive / Promoter) de clients télécom n'ayant jamais répondu à l'enquête de satisfaction, à partir d'un modèle entraîné sur un échantillon biaisé de répondants, avec interprétabilité SHAP et audit d'équité.",
    impact:
      'Modèle ordinal robuste au biais de sélection (QWK 0.273 sur la population silencieuse), dashboard Streamlit à 4 pages (prédiction individuelle, SHAP, performance, équité), pipeline reproductible et documenté (38 décisions tracées).',
    stack: ['Python', 'scikit-learn', 'LightGBM', 'SHAP', 'Streamlit'],
    repoUrl: `${github}/NPS_Project`
  },
  {
    title: 'Portfolio GRIMUS',
    slug: 'portfolio-grimus',
    category: 'Web',
    image: image('profil-costume-banniere'),
    summary: 'Portfolio personnel construit pour présenter un profil data, des projets, des livrables et des canaux de contact professionnels.',
    impact: 'Site statique optimisé pour GitHub Pages, navigation claire, identité visuelle personnalisée et structure maintenable.',
    stack: ['Astro', 'HTML', 'CSS', 'JavaScript'],
    private: true,
    featured: true
  },
  {
    title: 'RH IA Pro',
    slug: 'rh-ia-pro',
    category: 'IA',
    image: image('rh-ai'),
    summary: 'Solution RH intégrée orientée opérations, pilotage et automatisation, avec une architecture full-stack et une base pour des fonctions IA.',
    impact: 'Frontend React, backend FastAPI, stockage PostgreSQL ou Supabase, coque Electron et socle prévu pour l’IA locale avec Ollama.',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Electron', 'Ollama'],
    repoUrl: `${github}/RH_Project`,
    featured: true
  },
  {
    title: 'DocuMind AI',
    slug: 'doc-ai',
    category: 'IA',
    image: projectImage,
    summary: 'Plateforme de numérisation intelligente documentaire pour importer, sécuriser, modéliser, vérifier humainement et exporter des documents.',
    impact: 'MVP full-stack préparé pour brancher progressivement la conversion PDF, le preprocessing OpenCV, PaddleOCR et un workflow de validation documentaire.',
    stack: ['FastAPI', 'Next.js', 'TypeScript', 'Tailwind CSS', 'SQLAlchemy', 'OCR'],
    repoUrl: `${github}/doc-ai`,
    featured: true
  },
  {
    title: 'Plateforme web AMET-ESA',
    slug: 'plateforme-amet-esa',
    category: 'Web',
    image: projectImage,
    summary: 'Plateforme vitrine et système de gestion de contenus pour AMET-ESA, avec frontend statique, backend Express et données Supabase.',
    impact: 'Espace administrateur, contenus dynamiques, authentification, stockage média et publication de données réelles depuis la base.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Express', 'Supabase'],
    private: true,
    featured: true
  },
  {
    title: 'Excellence BeGou',
    slug: 'excellence-begou',
    category: 'Web',
    image: projectImage,
    summary: 'Plateforme éditoriale et communautaire dédiée aux parcours d’excellence, à la diaspora et aux talents émergents.',
    impact: 'Socle premium avec administration, base de données structurée, stockage média, interactions communautaires et authentification sécurisée.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    repoUrl: `${github}/excellence-begou`
  },
  {
    title: 'Profil GitHub',
    slug: 'profil-github-grimael',
    category: 'Web',
    image: image('profil-ensea-banniere'),
    summary: 'Profil GitHub personnel conçu pour centraliser l’identité technique, les projets, les domaines de compétence et les liens utiles.',
    impact: 'Point d’entrée clair vers les dépôts, les projets publics et la présence technique.',
    stack: ['GitHub', 'Markdown', 'Portfolio', 'Documentation'],
    repoUrl: `${github}/grimael`
  },
  {
    title: 'Analyse de sentiments NLP - Youssoupha',
    slug: 'nlp-analyse-sentiments-youssoupha',
    category: 'IA',
    image: projectImage,
    summary: 'Projet NLP d’analyse de sentiments appliqué à des textes liés à Youssoupha, avec préparation des données et lecture des polarités.',
    impact: 'Exploration textuelle, nettoyage, extraction de signaux linguistiques et restitution des tendances de sentiment.',
    stack: ['Python', 'NLP', 'Analyse de sentiments', 'Data science'],
    repoUrl: `${github}/NLP_Analyse_sentiments`
  },
  {
    title: 'Étude économétrique : corruption et investissement public',
    slug: 'econometrie-corruption-investissement',
    category: 'Statistique',
    image: image('logo_maphix'),
    summary: "Analyse des effets de la corruption sur l'investissement public en Afrique subsaharienne avec une lecture économétrique orientée décision.",
    impact: 'Modèles de régression, interprétation causale prudente, recommandations de politique publique et restitution claire.',
    stack: ['Économétrie', 'Régression', 'R', 'Analyse publique'],
    liveUrl: 'https://drive.google.com/file/d/1FpKmP7QUJN9bS9Yb9jz2GkIkQPxc5Qbf/view?usp=sharing'
  },
  {
    title: 'Tableau de bord R Shiny',
    slug: 'dashboard-rshiny',
    category: 'Data Visualisation',
    image: image('shiny'),
    summary: 'Application web interactive pour explorer des données complexes avec filtres dynamiques et visualisations exploitables.',
    impact: 'Expérience analytique fluide, lecture rapide des tendances et export des résultats pour les utilisateurs métiers.',
    stack: ['R', 'Shiny', 'Visualisation', 'Interface analytique'],
    liveUrl: 'https://maphixz.shinyapps.io/project/',
    repoUrl: `${github}/R_Shiny`
  },
  {
    title: 'Power BI - Coupe du Monde 2018',
    slug: 'powerbi-coupe-du-monde-2018',
    category: 'Data Visualisation',
    image: image('power'),
    summary: 'Tableau de bord Power BI pour analyser les performances des équipes, les statistiques de match et les dynamiques du tournoi.',
    impact: 'Tableaux de bord clairs, comparaison des équipes, indicateurs de performance et visualisation géographique.',
    stack: ['Power BI', 'DAX', 'Modélisation', 'Analyse sportive'],
    liveUrl: 'https://app.powerbi.com/groups/me/reports/138e8739-ab87-4ccc-87a1-6ef83aed68ef/81cbe8fe1dedb44b8db8?experience=power-bi'
  },
  {
    title: 'Projet Data Viz - Transport au Togo',
    slug: 'transport-togo-dataviz',
    category: 'Data Visualisation',
    image: image('image'),
    summary: 'Analyse des performances du secteur logistique et transport au Togo avec indicateurs, tendances et comparaisons régionales.',
    impact: "Tableau de bord décisionnel centré sur les KPI, la lecture temporelle et les zones d'amélioration opérationnelle.",
    stack: ['Power BI', 'KPI', 'Analyse transport', 'Visualisation'],
    liveUrl: 'https://app.powerbi.com/groups/me/reports/d83f5d40-fc18-473f-a659-8e7e28c03b2f/1f5a89a6e9eb01911d69?experience=power-bi'
  },
  {
    title: 'Projet Marketing Étudiants',
    slug: 'marketing-etudiants-ensea',
    category: 'Statistique',
    image: image('marketing'),
    summary: "Étude de marché autour de l'ENSEA pour comprendre comportements, besoins et préférences des étudiants.",
    impact: 'Enquêtes, analyses factorielles, tests statistiques et restitution orientée action.',
    stack: ['Enquête', 'Analyse factorielle', 'Tests statistiques', 'Présentation'],
    liveUrl: 'https://docs.google.com/presentation/d/1aWxuUbisc8ePkQNlmtg2tqZgS21tqKBI/edit?usp=sharing&ouid=107155812438891407989&rtpof=true&sd=true'
  },
  {
    title: 'Projet QGIS - RGPH 2021',
    slug: 'qgis-rgph-2021-abidjan',
    category: 'Géospatial',
    image: image('qgis'),
    summary: "Cartographie et analyse démographique des communes d'Abidjan à partir du RGPH 2021.",
    impact: 'Cartes thématiques, analyse spatiale et visualisation de la répartition de population.',
    stack: ['QGIS', 'Cartographie', 'Analyse spatiale', 'RGPH'],
    liveUrl: 'https://drive.google.com/file/d/1NqlOS3TgirnoT7CBnfWz5LzdzXq0naGt/view?usp=sharing',
    repoUrl: `${github}/Projet_SIG`
  },
  {
    title: 'Rapport de stage - Crise en Ukraine',
    slug: 'rapport-ukraine-commerce',
    category: 'Recherche',
    image: image('academique'),
    summary: 'Analyse des effets de la crise en Ukraine sur les flux commerciaux internationaux et les équilibres macroéconomiques.',
    impact: 'Lecture sectorielle, synthèse économique et mise en évidence des impacts régionaux.',
    stack: ['Recherche', 'Macroéconomie', 'Commerce international', 'Rapport'],
    liveUrl: 'https://drive.google.com/file/d/1UQadUGKtUvkHn2LbB771EJ8Nocfhlvpl/view?usp=sharing'
  },
  {
    title: 'Affiche - Activités CEMAC',
    slug: 'affiche-cemac',
    category: 'Data Visualisation',
    image: image('affiche1'),
    summary: 'Infographie professionnelle pour une campagne de sensibilisation autour des activités CEMAC.',
    impact: "Communication visuelle claire, hiérarchie de l'information et design adapté à une diffusion institutionnelle.",
    stack: ['Design graphique', 'Infographie', 'Communication', 'Canva']
  },
  {
    title: 'Déploiement Apache Superset',
    slug: 'superset-deploy',
    category: 'Data Visualisation',
    image: projectImage,
    summary: 'Configuration de déploiement pour Apache Superset afin de préparer un environnement BI exploitable.',
    impact: 'Base technique pour publier, administrer et maintenir des tableaux de bord analytiques avec Superset.',
    stack: ['Apache Superset', 'BI', 'Déploiement', 'Data visualisation'],
    repoUrl: `${github}/superset-deploy`
  },
  {
    title: 'Dashboard R Shiny',
    slug: 'dashboard-rshiny-public',
    category: 'Data Visualisation',
    image: image('shiny'),
    summary: 'Dépôt public consacré à un tableau de bord interactif développé avec R Shiny.',
    impact: 'Mise en valeur de la construction d’interfaces analytiques dynamiques avec filtres, restitution visuelle et logique serveur R.',
    stack: ['R', 'Shiny', 'Dashboard', 'Visualisation'],
    repoUrl: `${github}/Dashboard-Rshiny`
  },
  {
    title: 'Tableau Desktop',
    slug: 'tableau-desktop',
    category: 'Data Visualisation',
    image: projectImage,
    summary: 'Projet de visualisation construit autour de Tableau Desktop pour explorer et restituer des données métier.',
    impact: 'Production de vues analytiques lisibles pour faciliter la comparaison, le suivi d’indicateurs et la prise de décision.',
    stack: ['Tableau', 'Data visualisation', 'BI', 'Dashboard'],
    repoUrl: `${github}/Tableau-Desktop`
  },
  {
    title: 'Application VBA - Évaluation de salaire',
    slug: 'projet-vba-evaluation-salaire',
    category: 'Statistique',
    image: projectImage,
    summary: "Application d'évaluation de salaire développée avec VBA pour automatiser un calcul ou une analyse dans l'environnement Excel.",
    impact: 'Automatisation de traitements répétitifs, structuration des règles de calcul et interface bureautique utilisable par des profils non techniques.',
    stack: ['VBA', 'Excel', 'Automatisation', 'Analyse'],
    repoUrl: `${github}/Projet_VBA`
  },
  {
    title: 'Algorithmes génétiques',
    slug: 'projet-algorithmes-genetiques',
    category: 'IA',
    image: projectImage,
    summary: "Projet Python autour des algorithmes génétiques et de l'optimisation par recherche évolutive.",
    impact: "Expérimentation de méthodes d'optimisation, représentation de solutions candidates et amélioration progressive par sélection.",
    stack: ['Python', 'Algorithmes génétiques', 'Optimisation', 'IA'],
    repoUrl: `${github}/Projet_Algorithmes_gen`
  },
  {
    title: 'Segmentation client par Data Mining',
    slug: 'segmentation-client-data-mining',
    category: 'Statistique',
    image: projectImage,
    summary: 'Projet de Data Mining visant à identifier des profils clients homogènes à partir de données socio-démographiques, comportementales et transactionnelles.',
    impact: 'Nettoyage des données, feature engineering, ACP, comparaison de modèles de clustering et recommandations marketing par segment client.',
    stack: ['Python', 'Jupyter Notebook', 'Pandas', 'Scikit-learn', 'Clustering', 'ACP'],
    repoUrl: `${github}/data-mining-project`
  },
  {
    title: 'Architecture ETL et Data Warehouse national',
    slug: 'etl-datawarehouse-national',
    category: 'Data Visualisation',
    image: projectImage,
    summary: 'Centralisation, nettoyage et structuration de données nationales multi-sources pour alimenter un reporting automatisé.',
    impact: 'Définition de KPIs, documentation méthodologique et pipeline de données pour améliorer la productivité du reporting.',
    stack: ['Apache Hop', 'SQL', 'Entrepôt de données', 'Superset'],
    private: true
  }
];

export const featuredProjects = projects.filter((project) => project.featured);
