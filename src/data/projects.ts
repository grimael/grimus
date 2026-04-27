export type Project = {
  title: string;
  slug: string;
  category: 'Statistique' | 'Tableau de bord' | 'Visualisation' | 'Géospatial' | 'Recherche' | 'Web' | 'IA';
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

export const projects: Project[] = [
  {
    title: 'Portfolio GRIMUS',
    slug: 'portfolio-grimus',
    category: 'Web',
    image: asset('/assets/Images/Grimus.png'),
    summary: 'Portfolio personnel construit pour présenter un profil data, des projets, des livrables et des canaux de contact professionnels.',
    impact: 'Site statique optimisé pour GitHub Pages, navigation claire, identité visuelle personnalisée et structure maintenable.',
    stack: ['Astro', 'HTML', 'CSS', 'JavaScript'],
    repoUrl: `${github}/grimus`,
    featured: true
  },
  {
    title: 'RH IA Pro',
    slug: 'rh-ia-pro',
    category: 'IA',
    image: projectImage,
    summary: 'Solution RH intégrée orientée opérations, pilotage et automatisation, avec une architecture full-stack et une base pour des fonctions IA.',
    impact: 'Frontend React, backend FastAPI, stockage PostgreSQL ou Supabase, coque Electron et socle prévu pour l’IA locale avec Ollama.',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Electron', 'Ollama'],
    private: true,
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
    private: true
  },
  {
    title: 'Profil GitHub GRIMAEL',
    slug: 'profil-github-grimael',
    category: 'Web',
    image: asset('/assets/Images/grimus2.png'),
    summary: 'Profil GitHub personnel conçu pour centraliser l’identité technique, les projets, les domaines de compétence et les liens utiles.',
    impact: 'Point d’entrée clair vers les dépôts, les projets publics et la présence technique de GRIMA Michael.',
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
    image: asset('/assets/Images/logo_maphix.png'),
    summary: "Analyse des effets de la corruption sur l'investissement public en Afrique subsaharienne avec une lecture économétrique orientée décision.",
    impact: 'Modèles de régression, interprétation causale prudente, recommandations de politique publique et restitution claire.',
    stack: ['Économétrie', 'Régression', 'R', 'Analyse publique'],
    liveUrl: 'https://drive.google.com/file/d/1FpKmP7QUJN9bS9Yb9jz2GkIkQPxc5Qbf/view?usp=sharing',
    repoUrl: `${github}/econometrie-corruption-investissement`
  },
  {
    title: 'Tableau de bord R Shiny',
    slug: 'dashboard-rshiny',
    category: 'Tableau de bord',
    image: asset('/assets/Images/shiny.png'),
    summary: 'Application web interactive pour explorer des données complexes avec filtres dynamiques et visualisations exploitables.',
    impact: 'Expérience analytique fluide, lecture rapide des tendances et export des résultats pour les utilisateurs métiers.',
    stack: ['R', 'Shiny', 'Visualisation', 'Interface analytique'],
    liveUrl: 'https://maphixz.shinyapps.io/project/',
    repoUrl: `${github}/dashboard-rshiny`
  },
  {
    title: 'Power BI - Coupe du Monde 2018',
    slug: 'powerbi-coupe-du-monde-2018',
    category: 'Tableau de bord',
    image: asset('/assets/Images/power.png'),
    summary: 'Tableau de bord Power BI pour analyser les performances des équipes, les statistiques de match et les dynamiques du tournoi.',
    impact: 'Tableaux de bord clairs, comparaison des équipes, indicateurs de performance et visualisation géographique.',
    stack: ['Power BI', 'DAX', 'Modélisation', 'Analyse sportive'],
    liveUrl: 'https://app.powerbi.com/groups/me/reports/138e8739-ab87-4ccc-87a1-6ef83aed68ef/81cbe8fe1dedb44b8db8?experience=power-bi',
    repoUrl: `${github}/powerbi-world-cup-2018`
  },
  {
    title: 'Projet Data Viz - Transport au Togo',
    slug: 'transport-togo-dataviz',
    category: 'Tableau de bord',
    image: asset('/assets/Images/image.png'),
    summary: 'Analyse des performances du secteur logistique et transport au Togo avec indicateurs, tendances et comparaisons régionales.',
    impact: "Tableau de bord décisionnel centré sur les KPI, la lecture temporelle et les zones d'amélioration opérationnelle.",
    stack: ['Power BI', 'KPI', 'Analyse transport', 'Visualisation'],
    liveUrl: 'https://app.powerbi.com/groups/me/reports/d83f5d40-fc18-473f-a659-8e7e28c03b2f/1f5a89a6e9eb01911d69?experience=power-bi',
    repoUrl: `${github}/transport-togo-dataviz`
  },
  {
    title: 'Projet Marketing Étudiants',
    slug: 'marketing-etudiants-ensea',
    category: 'Statistique',
    image: asset('/assets/Images/marketing.png'),
    summary: "Étude de marché autour de l'ENSEA pour comprendre comportements, besoins et préférences des étudiants.",
    impact: 'Enquêtes, analyses factorielles, tests statistiques et restitution orientée action.',
    stack: ['Enquête', 'Analyse factorielle', 'Tests statistiques', 'Présentation'],
    liveUrl: 'https://docs.google.com/presentation/d/1aWxuUbisc8ePkQNlmtg2tqZgS21tqKBI/edit?usp=sharing&ouid=107155812438891407989&rtpof=true&sd=true',
    repoUrl: `${github}/marketing-etudiants-ensea`
  },
  {
    title: 'Projet QGIS - RGPH 2021',
    slug: 'qgis-rgph-2021-abidjan',
    category: 'Géospatial',
    image: asset('/assets/Images/qgis.png'),
    summary: "Cartographie et analyse démographique des communes d'Abidjan à partir du RGPH 2021.",
    impact: 'Cartes thématiques, analyse spatiale et visualisation de la répartition de population.',
    stack: ['QGIS', 'Cartographie', 'Analyse spatiale', 'RGPH'],
    liveUrl: 'https://drive.google.com/file/d/1NqlOS3TgirnoT7CBnfWz5LzdzXq0naGt/view?usp=sharing',
    repoUrl: `${github}/qgis-rgph-2021-abidjan`
  },
  {
    title: 'Rapport de stage - Crise en Ukraine',
    slug: 'rapport-ukraine-commerce',
    category: 'Recherche',
    image: asset('/assets/Images/academique.png'),
    summary: 'Analyse des effets de la crise en Ukraine sur les flux commerciaux internationaux et les équilibres macroéconomiques.',
    impact: 'Lecture sectorielle, synthèse économique et mise en évidence des impacts régionaux.',
    stack: ['Recherche', 'Macroéconomie', 'Commerce international', 'Rapport'],
    liveUrl: 'https://drive.google.com/file/d/1UQadUGKtUvkHn2LbB771EJ8Nocfhlvpl/view?usp=sharing',
    repoUrl: `${github}/rapport-ukraine-commerce`
  },
  {
    title: 'Affiche - Activités CEMAC',
    slug: 'affiche-cemac',
    category: 'Visualisation',
    image: asset('/assets/Images/affiche1.png'),
    summary: 'Infographie professionnelle pour une campagne de sensibilisation autour des activités CEMAC.',
    impact: "Communication visuelle claire, hiérarchie de l'information et design adapté à une diffusion institutionnelle.",
    stack: ['Design graphique', 'Infographie', 'Communication', 'Canva'],
    repoUrl: `${github}/affiche-cemac`
  },
  {
    title: 'Segmentation comportementale clients',
    slug: 'segmentation-comportementale-clients',
    category: 'Statistique',
    image: projectImage,
    summary: 'Projet analytique autour de la segmentation de profils clients à partir de comportements observés.',
    impact: 'Structuration des variables, classification exploratoire et lecture métier des groupes obtenus.',
    stack: ['Python', 'Clustering', 'ACP', 'Analyse client'],
    private: true
  },
  {
    title: 'Système de recommandation de trajets à Abidjan',
    slug: 'recommandation-trajets-abidjan',
    category: 'Web',
    image: projectImage,
    summary: "Prototype orienté data produit pour recommander des trajets dans l'environnement urbain d'Abidjan.",
    impact: 'Combinaison de logique métier, données géographiques et interface web pour faciliter la décision de parcours.',
    stack: ['Python', 'JavaScript', 'Géospatial', 'Application web'],
    private: true
  },
  {
    title: 'Architecture ETL et Data Warehouse national',
    slug: 'etl-datawarehouse-national',
    category: 'Tableau de bord',
    image: projectImage,
    summary: 'Centralisation, nettoyage et structuration de données nationales multi-sources pour alimenter un reporting automatisé.',
    impact: 'Définition de KPIs, documentation méthodologique et pipeline de données pour améliorer la productivité du reporting.',
    stack: ['Apache Hop', 'SQL', 'Entrepôt de données', 'Superset'],
    private: true
  }
];

export const featuredProjects = projects.filter((project) => project.featured);
