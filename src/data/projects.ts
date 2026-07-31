export type Project = {
  title: string;
  titleEn: string;
  slug: string;
  category: 'Statistique' | 'Tableau de bord' | 'Visualisation' | 'Géospatial' | 'Recherche' | 'Web' | 'IA';
  image: string;
  summary: string;
  summaryEn: string;
  impact: string;
  impactEn: string;
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

export const categoryLabels: Record<Project['category'] | 'Tous', { fr: string; en: string }> = {
  Tous: { fr: 'Tous', en: 'All' },
  Statistique: { fr: 'Statistique', en: 'Statistics' },
  'Tableau de bord': { fr: 'Tableau de bord', en: 'Dashboard' },
  Visualisation: { fr: 'Visualisation', en: 'Visualization' },
  Géospatial: { fr: 'Géospatial', en: 'Geospatial' },
  Recherche: { fr: 'Recherche', en: 'Research' },
  Web: { fr: 'Web', en: 'Web' },
  IA: { fr: 'IA', en: 'AI' }
};

export const stackTranslations: Record<string, string> = {
  'Analyse de sentiments': 'Sentiment analysis',
  'Data science': 'Data science',
  Économétrie: 'Econometrics',
  Régression: 'Regression',
  'Analyse publique': 'Public policy analysis',
  Visualisation: 'Visualization',
  'Interface analytique': 'Analytics interface',
  Modélisation: 'Modeling',
  'Analyse sportive': 'Sports analytics',
  'Analyse transport': 'Transport analysis',
  Enquête: 'Survey',
  'Analyse factorielle': 'Factor analysis',
  'Tests statistiques': 'Statistical tests',
  Présentation: 'Presentation',
  Cartographie: 'Mapping',
  'Analyse spatiale': 'Spatial analysis',
  RGPH: 'Census',
  Recherche: 'Research',
  Macroéconomie: 'Macroeconomics',
  'Commerce international': 'International trade',
  Rapport: 'Report',
  'Design graphique': 'Graphic design',
  Infographie: 'Infographic',
  Communication: 'Communication',
  Déploiement: 'Deployment',
  'Data visualisation': 'Data visualization',
  Automatisation: 'Automation',
  Analyse: 'Analysis',
  'Algorithmes génétiques': 'Genetic algorithms',
  Optimisation: 'Optimization',
  Géospatial: 'Geospatial',
  'Application web': 'Web application',
  'Entrepôt de données': 'Data warehouse'
};

export const projects: Project[] = [
  {
    title: 'Prédiction NPS client — Challenge Artefact',
    titleEn: 'Customer NPS Prediction — Artefact Challenge',
    slug: 'prediction-nps-artefact',
    category: 'IA',
    image: image('nps'),
    summary:
      "Prédiction de la catégorie NPS (Detractor / Passive / Promoter) de clients télécom n'ayant jamais répondu à l'enquête de satisfaction, à partir d'un modèle entraîné sur un échantillon biaisé de répondants, avec interprétabilité SHAP et audit d'équité.",
    summaryEn:
      'Predicting the NPS category (Detractor / Passive / Promoter) of telecom customers who never answered the satisfaction survey, using a model trained on a biased respondent sample, with SHAP interpretability and a fairness audit.',
    impact:
      'Modèle ordinal robuste au biais de sélection (QWK 0.273 sur la population silencieuse), dashboard Streamlit à 4 pages (prédiction individuelle, SHAP, performance, équité), pipeline reproductible et documenté (38 décisions tracées).',
    impactEn:
      'Selection-bias-robust ordinal model (QWK 0.273 on the silent population), 4-page Streamlit dashboard (individual prediction, SHAP, performance, fairness), fully reproducible and documented pipeline (38 tracked decisions).',
    stack: ['Python', 'scikit-learn', 'LightGBM', 'SHAP', 'Streamlit'],
    repoUrl: `${github}/NPS_Project`
  },
  {
    title: 'Portfolio GRIMUS',
    titleEn: 'GRIMUS Portfolio',
    slug: 'portfolio-grimus',
    category: 'Web',
    image: image('Grimus'),
    summary: 'Portfolio personnel construit pour présenter un profil data, des projets, des livrables et des canaux de contact professionnels.',
    summaryEn: 'Personal portfolio built to present a data profile, projects, deliverables and professional contact channels.',
    impact: 'Site statique optimisé pour GitHub Pages, navigation claire, identité visuelle personnalisée et structure maintenable.',
    impactEn: 'Static site optimized for GitHub Pages, clear navigation, custom visual identity and a maintainable structure.',
    stack: ['Astro', 'HTML', 'CSS', 'JavaScript'],
    private: true,
    featured: true
  },
  {
    title: 'RH IA Pro',
    titleEn: 'RH IA Pro',
    slug: 'rh-ia-pro',
    category: 'IA',
    image: image('rh-ai'),
    summary: 'Solution RH intégrée orientée opérations, pilotage et automatisation, avec une architecture full-stack et une base pour des fonctions IA.',
    summaryEn: 'Integrated HR solution focused on operations, oversight and automation, with a full-stack architecture and a foundation for AI features.',
    impact: 'Frontend React, backend FastAPI, stockage PostgreSQL ou Supabase, coque Electron et socle prévu pour l’IA locale avec Ollama.',
    impactEn: 'React frontend, FastAPI backend, PostgreSQL or Supabase storage, Electron shell and a foundation planned for local AI with Ollama.',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Electron', 'Ollama'],
    repoUrl: `${github}/RH_Project`,
    featured: true
  },
  {
    title: 'DocuMind AI',
    titleEn: 'DocuMind AI',
    slug: 'doc-ai',
    category: 'IA',
    image: projectImage,
    summary: 'Plateforme de numérisation intelligente documentaire pour importer, sécuriser, modéliser, vérifier humainement et exporter des documents.',
    summaryEn: 'Intelligent document digitization platform to import, secure, model, human-verify and export documents.',
    impact: 'MVP full-stack préparé pour brancher progressivement la conversion PDF, le preprocessing OpenCV, PaddleOCR et un workflow de validation documentaire.',
    impactEn: 'Full-stack MVP set up to progressively plug in PDF conversion, OpenCV preprocessing, PaddleOCR and a document validation workflow.',
    stack: ['FastAPI', 'Next.js', 'TypeScript', 'Tailwind CSS', 'SQLAlchemy', 'OCR'],
    repoUrl: `${github}/doc-ai`,
    featured: true
  },
  {
    title: 'Plateforme web AMET-ESA',
    titleEn: 'AMET-ESA Web Platform',
    slug: 'plateforme-amet-esa',
    category: 'Web',
    image: projectImage,
    summary: 'Plateforme vitrine et système de gestion de contenus pour AMET-ESA, avec frontend statique, backend Express et données Supabase.',
    summaryEn: 'Showcase platform and content management system for AMET-ESA, with a static frontend, Express backend and Supabase data.',
    impact: 'Espace administrateur, contenus dynamiques, authentification, stockage média et publication de données réelles depuis la base.',
    impactEn: 'Admin area, dynamic content, authentication, media storage and real data published straight from the database.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Express', 'Supabase'],
    private: true,
    featured: true
  },
  {
    title: 'Excellence BeGou',
    titleEn: 'Excellence BeGou',
    slug: 'excellence-begou',
    category: 'Web',
    image: projectImage,
    summary: 'Plateforme éditoriale et communautaire dédiée aux parcours d’excellence, à la diaspora et aux talents émergents.',
    summaryEn: 'Editorial and community platform dedicated to stories of excellence, the diaspora and emerging talent.',
    impact: 'Socle premium avec administration, base de données structurée, stockage média, interactions communautaires et authentification sécurisée.',
    impactEn: 'Premium foundation with admin tooling, a structured database, media storage, community interactions and secure authentication.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    repoUrl: `${github}/excellence-begou`
  },
  {
    title: 'Profil GitHub',
    titleEn: 'GitHub Profile',
    slug: 'profil-github-grimael',
    category: 'Web',
    image: image('grimus2'),
    summary: 'Profil GitHub personnel conçu pour centraliser l’identité technique, les projets, les domaines de compétence et les liens utiles.',
    summaryEn: 'Personal GitHub profile designed to centralize technical identity, projects, areas of expertise and useful links.',
    impact: 'Point d’entrée clair vers les dépôts, les projets publics et la présence technique.',
    impactEn: 'A clear entry point to repositories, public projects and technical presence.',
    stack: ['GitHub', 'Markdown', 'Portfolio', 'Documentation'],
    repoUrl: `${github}/grimael`
  },
  {
    title: 'Analyse de sentiments NLP - Youssoupha',
    titleEn: 'NLP Sentiment Analysis - Youssoupha',
    slug: 'nlp-analyse-sentiments-youssoupha',
    category: 'IA',
    image: projectImage,
    summary: 'Projet NLP d’analyse de sentiments appliqué à des textes liés à Youssoupha, avec préparation des données et lecture des polarités.',
    summaryEn: 'NLP sentiment analysis project applied to texts related to Youssoupha, with data preparation and polarity reading.',
    impact: 'Exploration textuelle, nettoyage, extraction de signaux linguistiques et restitution des tendances de sentiment.',
    impactEn: 'Text exploration, cleaning, extraction of linguistic signals and reporting of sentiment trends.',
    stack: ['Python', 'NLP', 'Analyse de sentiments', 'Data science'],
    repoUrl: `${github}/NLP_Analyse_sentiments`
  },
  {
    title: 'Étude économétrique : corruption et investissement public',
    titleEn: 'Econometric Study: Corruption and Public Investment',
    slug: 'econometrie-corruption-investissement',
    category: 'Statistique',
    image: image('logo_maphix'),
    summary: "Analyse des effets de la corruption sur l'investissement public en Afrique subsaharienne avec une lecture économétrique orientée décision.",
    summaryEn: 'Analysis of the effects of corruption on public investment in sub-Saharan Africa, with a decision-oriented econometric reading.',
    impact: 'Modèles de régression, interprétation causale prudente, recommandations de politique publique et restitution claire.',
    impactEn: 'Regression models, cautious causal interpretation, public policy recommendations and a clear write-up.',
    stack: ['Économétrie', 'Régression', 'R', 'Analyse publique'],
    liveUrl: 'https://drive.google.com/file/d/1FpKmP7QUJN9bS9Yb9jz2GkIkQPxc5Qbf/view?usp=sharing'
  },
  {
    title: 'Tableau de bord R Shiny',
    titleEn: 'R Shiny Dashboard',
    slug: 'dashboard-rshiny',
    category: 'Tableau de bord',
    image: image('shiny'),
    summary: 'Application web interactive pour explorer des données complexes avec filtres dynamiques et visualisations exploitables.',
    summaryEn: 'Interactive web application to explore complex data with dynamic filters and actionable visualizations.',
    impact: 'Expérience analytique fluide, lecture rapide des tendances et export des résultats pour les utilisateurs métiers.',
    impactEn: 'Smooth analytical experience, fast trend reading and result exports for business users.',
    stack: ['R', 'Shiny', 'Visualisation', 'Interface analytique'],
    liveUrl: 'https://maphixz.shinyapps.io/project/',
    repoUrl: `${github}/R_Shiny`
  },
  {
    title: 'Power BI - Coupe du Monde 2018',
    titleEn: 'Power BI - 2018 World Cup',
    slug: 'powerbi-coupe-du-monde-2018',
    category: 'Tableau de bord',
    image: image('power'),
    summary: 'Tableau de bord Power BI pour analyser les performances des équipes, les statistiques de match et les dynamiques du tournoi.',
    summaryEn: 'Power BI dashboard to analyze team performance, match statistics and tournament dynamics.',
    impact: 'Tableaux de bord clairs, comparaison des équipes, indicateurs de performance et visualisation géographique.',
    impactEn: 'Clear dashboards, team comparisons, performance indicators and geographic visualization.',
    stack: ['Power BI', 'DAX', 'Modélisation', 'Analyse sportive'],
    liveUrl: 'https://app.powerbi.com/groups/me/reports/138e8739-ab87-4ccc-87a1-6ef83aed68ef/81cbe8fe1dedb44b8db8?experience=power-bi'
  },
  {
    title: 'Projet Data Viz - Transport au Togo',
    titleEn: 'Data Viz Project - Transport in Togo',
    slug: 'transport-togo-dataviz',
    category: 'Tableau de bord',
    image: image('image'),
    summary: 'Analyse des performances du secteur logistique et transport au Togo avec indicateurs, tendances et comparaisons régionales.',
    summaryEn: 'Analysis of logistics and transport sector performance in Togo, with indicators, trends and regional comparisons.',
    impact: "Tableau de bord décisionnel centré sur les KPI, la lecture temporelle et les zones d'amélioration opérationnelle.",
    impactEn: 'Decision-support dashboard centered on KPIs, time-based reading and areas for operational improvement.',
    stack: ['Power BI', 'KPI', 'Analyse transport', 'Visualisation'],
    liveUrl: 'https://app.powerbi.com/groups/me/reports/d83f5d40-fc18-473f-a659-8e7e28c03b2f/1f5a89a6e9eb01911d69?experience=power-bi'
  },
  {
    title: 'Projet Marketing Étudiants',
    titleEn: 'Student Marketing Project',
    slug: 'marketing-etudiants-ensea',
    category: 'Statistique',
    image: image('marketing'),
    summary: "Étude de marché autour de l'ENSEA pour comprendre comportements, besoins et préférences des étudiants.",
    summaryEn: 'Market study around ENSEA to understand student behaviors, needs and preferences.',
    impact: 'Enquêtes, analyses factorielles, tests statistiques et restitution orientée action.',
    impactEn: 'Surveys, factor analyses, statistical tests and an action-oriented write-up.',
    stack: ['Enquête', 'Analyse factorielle', 'Tests statistiques', 'Présentation'],
    liveUrl: 'https://docs.google.com/presentation/d/1aWxuUbisc8ePkQNlmtg2tqZgS21tqKBI/edit?usp=sharing&ouid=107155812438891407989&rtpof=true&sd=true'
  },
  {
    title: 'Projet QGIS - RGPH 2021',
    titleEn: 'QGIS Project - 2021 Census',
    slug: 'qgis-rgph-2021-abidjan',
    category: 'Géospatial',
    image: image('qgis'),
    summary: "Cartographie et analyse démographique des communes d'Abidjan à partir du RGPH 2021.",
    summaryEn: "Mapping and demographic analysis of Abidjan's districts based on the 2021 national census.",
    impact: 'Cartes thématiques, analyse spatiale et visualisation de la répartition de population.',
    impactEn: 'Thematic maps, spatial analysis and visualization of population distribution.',
    stack: ['QGIS', 'Cartographie', 'Analyse spatiale', 'RGPH'],
    liveUrl: 'https://drive.google.com/file/d/1NqlOS3TgirnoT7CBnfWz5LzdzXq0naGt/view?usp=sharing',
    repoUrl: `${github}/Projet_SIG`
  },
  {
    title: 'Rapport de stage - Crise en Ukraine',
    titleEn: 'Internship Report - Ukraine Crisis',
    slug: 'rapport-ukraine-commerce',
    category: 'Recherche',
    image: image('academique'),
    summary: 'Analyse des effets de la crise en Ukraine sur les flux commerciaux internationaux et les équilibres macroéconomiques.',
    summaryEn: 'Analysis of the effects of the Ukraine crisis on international trade flows and macroeconomic balances.',
    impact: 'Lecture sectorielle, synthèse économique et mise en évidence des impacts régionaux.',
    impactEn: 'Sector-by-sector reading, economic synthesis and a spotlight on regional impacts.',
    stack: ['Recherche', 'Macroéconomie', 'Commerce international', 'Rapport'],
    liveUrl: 'https://drive.google.com/file/d/1UQadUGKtUvkHn2LbB771EJ8Nocfhlvpl/view?usp=sharing'
  },
  {
    title: 'Affiche - Activités CEMAC',
    titleEn: 'Poster - CEMAC Activities',
    slug: 'affiche-cemac',
    category: 'Visualisation',
    image: image('affiche1'),
    summary: 'Infographie professionnelle pour une campagne de sensibilisation autour des activités CEMAC.',
    summaryEn: 'Professional infographic for an awareness campaign around CEMAC activities.',
    impact: "Communication visuelle claire, hiérarchie de l'information et design adapté à une diffusion institutionnelle.",
    impactEn: 'Clear visual communication, information hierarchy and design suited for institutional distribution.',
    stack: ['Design graphique', 'Infographie', 'Communication', 'Canva']
  },
  {
    title: 'Déploiement Apache Superset',
    titleEn: 'Apache Superset Deployment',
    slug: 'superset-deploy',
    category: 'Tableau de bord',
    image: projectImage,
    summary: 'Configuration de déploiement pour Apache Superset afin de préparer un environnement BI exploitable.',
    summaryEn: 'Deployment configuration for Apache Superset to set up a usable BI environment.',
    impact: 'Base technique pour publier, administrer et maintenir des tableaux de bord analytiques avec Superset.',
    impactEn: 'Technical foundation to publish, administer and maintain analytical dashboards with Superset.',
    stack: ['Apache Superset', 'BI', 'Déploiement', 'Data visualisation'],
    repoUrl: `${github}/superset-deploy`
  },
  {
    title: 'Dashboard R Shiny',
    titleEn: 'R Shiny Dashboard (Public Repo)',
    slug: 'dashboard-rshiny-public',
    category: 'Tableau de bord',
    image: image('shiny'),
    summary: 'Dépôt public consacré à un tableau de bord interactif développé avec R Shiny.',
    summaryEn: 'Public repository dedicated to an interactive dashboard built with R Shiny.',
    impact: 'Mise en valeur de la construction d’interfaces analytiques dynamiques avec filtres, restitution visuelle et logique serveur R.',
    impactEn: 'Showcases the build of dynamic analytical interfaces with filters, visual reporting and R server-side logic.',
    stack: ['R', 'Shiny', 'Dashboard', 'Visualisation'],
    repoUrl: `${github}/Dashboard-Rshiny`
  },
  {
    title: 'Tableau Desktop',
    titleEn: 'Tableau Desktop',
    slug: 'tableau-desktop',
    category: 'Tableau de bord',
    image: projectImage,
    summary: 'Projet de visualisation construit autour de Tableau Desktop pour explorer et restituer des données métier.',
    summaryEn: 'Visualization project built around Tableau Desktop to explore and report on business data.',
    impact: 'Production de vues analytiques lisibles pour faciliter la comparaison, le suivi d’indicateurs et la prise de décision.',
    impactEn: 'Production of readable analytical views to ease comparison, indicator tracking and decision-making.',
    stack: ['Tableau', 'Data visualisation', 'BI', 'Dashboard'],
    repoUrl: `${github}/Tableau-Desktop`
  },
  {
    title: 'Application VBA - Évaluation de salaire',
    titleEn: 'VBA App - Salary Evaluation',
    slug: 'projet-vba-evaluation-salaire',
    category: 'Statistique',
    image: projectImage,
    summary: "Application d'évaluation de salaire développée avec VBA pour automatiser un calcul ou une analyse dans l'environnement Excel.",
    summaryEn: 'Salary evaluation application built with VBA to automate a calculation or analysis within Excel.',
    impact: 'Automatisation de traitements répétitifs, structuration des règles de calcul et interface bureautique utilisable par des profils non techniques.',
    impactEn: 'Automation of repetitive tasks, structured calculation rules and an office interface usable by non-technical people.',
    stack: ['VBA', 'Excel', 'Automatisation', 'Analyse'],
    repoUrl: `${github}/Projet_VBA`
  },
  {
    title: 'Algorithmes génétiques',
    titleEn: 'Genetic Algorithms',
    slug: 'projet-algorithmes-genetiques',
    category: 'IA',
    image: projectImage,
    summary: "Projet Python autour des algorithmes génétiques et de l'optimisation par recherche évolutive.",
    summaryEn: 'Python project around genetic algorithms and optimization through evolutionary search.',
    impact: "Expérimentation de méthodes d'optimisation, représentation de solutions candidates et amélioration progressive par sélection.",
    impactEn: 'Experimentation with optimization methods, representation of candidate solutions and progressive improvement through selection.',
    stack: ['Python', 'Algorithmes génétiques', 'Optimisation', 'IA'],
    repoUrl: `${github}/Projet_Algorithmes_gen`
  },
  {
    title: 'Segmentation client par Data Mining',
    titleEn: 'Customer Segmentation via Data Mining',
    slug: 'segmentation-client-data-mining',
    category: 'Statistique',
    image: projectImage,
    summary: 'Projet de Data Mining visant à identifier des profils clients homogènes à partir de données socio-démographiques, comportementales et transactionnelles.',
    summaryEn: 'Data mining project aiming to identify homogeneous customer profiles from socio-demographic, behavioral and transactional data.',
    impact: 'Nettoyage des données, feature engineering, ACP, comparaison de modèles de clustering et recommandations marketing par segment client.',
    impactEn: 'Data cleaning, feature engineering, PCA, clustering model comparison and marketing recommendations per customer segment.',
    stack: ['Python', 'Jupyter Notebook', 'Pandas', 'Scikit-learn', 'Clustering', 'ACP'],
    repoUrl: `${github}/data-mining-project`
  },
  {
    title: 'Architecture ETL et Data Warehouse national',
    titleEn: 'National ETL & Data Warehouse Architecture',
    slug: 'etl-datawarehouse-national',
    category: 'Tableau de bord',
    image: projectImage,
    summary: 'Centralisation, nettoyage et structuration de données nationales multi-sources pour alimenter un reporting automatisé.',
    summaryEn: 'Centralization, cleaning and structuring of multi-source national data to feed automated reporting.',
    impact: 'Définition de KPIs, documentation méthodologique et pipeline de données pour améliorer la productivité du reporting.',
    impactEn: 'KPI definition, methodological documentation and a data pipeline to improve reporting productivity.',
    stack: ['Apache Hop', 'SQL', 'Entrepôt de données', 'Superset'],
    private: true
  }
];

export const featuredProjects = projects.filter((project) => project.featured);
