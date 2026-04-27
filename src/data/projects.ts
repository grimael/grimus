export type Project = {
  title: string;
  slug: string;
  category: 'Statistique' | 'Dashboard' | 'Visualisation' | 'Geospatial' | 'Recherche' | 'Web';
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

export const projects: Project[] = [
  {
    title: 'Etude econometrique: corruption et investissement public',
    slug: 'econometrie-corruption-investissement',
    category: 'Statistique',
    image: '/assets/Images/logo_maphix.png',
    summary:
      "Analyse des effets de la corruption sur l'investissement public en Afrique subsaharienne avec une lecture econometrique orientee decision.",
    impact:
      'Modeles de regression, interpretation causale prudente, recommandations de politique publique et restitution claire.',
    stack: ['Econometrie', 'Regression', 'R', 'Analyse publique'],
    liveUrl: 'https://drive.google.com/file/d/1FpKmP7QUJN9bS9Yb9jz2GkIkQPxc5Qbf/view?usp=sharing',
    repoUrl: `${github}/econometrie-corruption-investissement`,
    featured: true
  },
  {
    title: 'Dashboard R Shiny',
    slug: 'dashboard-rshiny',
    category: 'Dashboard',
    image: '/assets/Images/shiny.png',
    summary:
      'Application web interactive pour explorer des donnees complexes avec filtres dynamiques et visualisations exploitables.',
    impact:
      'Experience analytique fluide, lecture rapide des tendances et export des resultats pour les utilisateurs metiers.',
    stack: ['R', 'Shiny', 'DataViz', 'UI analytique'],
    liveUrl: 'https://maphixz.shinyapps.io/project/',
    repoUrl: `${github}/dashboard-rshiny`,
    featured: true
  },
  {
    title: 'Power BI - Coupe du Monde 2018',
    slug: 'powerbi-coupe-du-monde-2018',
    category: 'Dashboard',
    image: '/assets/Images/power.png',
    summary:
      'Dashboard Power BI pour analyser les performances des equipes, les statistiques de match et les dynamiques du tournoi.',
    impact:
      'Tableaux de bord clairs, comparaison des equipes, indicateurs de performance et visualisation geographique.',
    stack: ['Power BI', 'DAX', 'Data modeling', 'Sport analytics'],
    liveUrl:
      'https://app.powerbi.com/groups/me/reports/138e8739-ab87-4ccc-87a1-6ef83aed68ef/81cbe8fe1dedb44b8db8?experience=power-bi',
    repoUrl: `${github}/powerbi-world-cup-2018`,
    featured: true
  },
  {
    title: 'Projet Data Viz - Transport au Togo',
    slug: 'transport-togo-dataviz',
    category: 'Dashboard',
    image: '/assets/Images/image.png',
    summary:
      'Analyse des performances du secteur logistique et transport au Togo avec indicateurs, tendances et comparaisons regionales.',
    impact:
      'Dashboard decisionnel centre sur les KPI, la lecture temporelle et les zones d amelioration operationnelle.',
    stack: ['Power BI', 'KPI', 'Transport analytics', 'Visualisation'],
    liveUrl:
      'https://app.powerbi.com/groups/me/reports/d83f5d40-fc18-473f-a659-8e7e28c03b2f/1f5a89a6e9eb01911d69?experience=power-bi',
    repoUrl: `${github}/transport-togo-dataviz`
  },
  {
    title: 'Projet Marketing Etudiants',
    slug: 'marketing-etudiants-ensea',
    category: 'Statistique',
    image: '/assets/Images/marketing.png',
    summary:
      "Etude de marche autour de l'ENSEA pour comprendre comportements, besoins et preferences des etudiants.",
    impact:
      'Enquetes, analyses factorielles, tests statistiques et restitution orientee action.',
    stack: ['Enquete', 'Analyse factorielle', 'Tests statistiques', 'Presentation'],
    liveUrl:
      'https://docs.google.com/presentation/d/1aWxuUbisc8ePkQNlmtg2tqZgS21tqKBI/edit?usp=sharing&ouid=107155812438891407989&rtpof=true&sd=true',
    repoUrl: `${github}/marketing-etudiants-ensea`
  },
  {
    title: 'Projet QGIS - RGPH 2021',
    slug: 'qgis-rgph-2021-abidjan',
    category: 'Geospatial',
    image: '/assets/Images/qgis.png',
    summary:
      "Cartographie et analyse demographique des communes d'Abidjan a partir du RGPH 2021.",
    impact:
      'Cartes thematiques, analyse spatiale et visualisation de la repartition de population.',
    stack: ['QGIS', 'Cartographie', 'Analyse spatiale', 'RGPH'],
    liveUrl: 'https://drive.google.com/file/d/1NqlOS3TgirnoT7CBnfWz5LzdzXq0naGt/view?usp=sharing',
    repoUrl: `${github}/qgis-rgph-2021-abidjan`
  },
  {
    title: 'Rapport de stage - Crise en Ukraine',
    slug: 'rapport-ukraine-commerce',
    category: 'Recherche',
    image: '/assets/Images/academique.png',
    summary:
      'Analyse des effets de la crise en Ukraine sur les flux commerciaux internationaux et les equilibres macroeconomiques.',
    impact:
      'Lecture sectorielle, synthese economique et mise en evidence des impacts regionaux.',
    stack: ['Recherche', 'Macroeconomie', 'Commerce international', 'Rapport'],
    liveUrl: 'https://drive.google.com/file/d/1UQadUGKtUvkHn2LbB771EJ8Nocfhlvpl/view?usp=sharing',
    repoUrl: `${github}/rapport-ukraine-commerce`
  },
  {
    title: 'Affiche - Activites CEMAC',
    slug: 'affiche-cemac',
    category: 'Visualisation',
    image: '/assets/Images/affiche1.png',
    summary:
      'Infographie professionnelle pour une campagne de sensibilisation autour des activites CEMAC.',
    impact:
      'Communication visuelle claire, hierarchie de l information et design adapte a une diffusion institutionnelle.',
    stack: ['Design graphique', 'Infographie', 'Communication', 'Canva'],
    repoUrl: `${github}/affiche-cemac`
  },
  {
    title: 'Segmentation comportementale clients',
    slug: 'segmentation-comportementale-clients',
    category: 'Statistique',
    image: '/assets/Images/marketing.png',
    summary:
      'Projet analytique autour de la segmentation de profils clients a partir de comportements observes.',
    impact:
      'Structuration des variables, classification exploratoire et lecture metier des groupes obtenus.',
    stack: ['Python', 'Clustering', 'ACP', 'Analyse client'],
    private: true
  },
  {
    title: 'Systeme de recommandation de trajets a Abidjan',
    slug: 'recommandation-trajets-abidjan',
    category: 'Web',
    image: '/assets/Images/qgis.png',
    summary:
      "Prototype oriente data produit pour recommander des trajets dans l'environnement urbain d'Abidjan.",
    impact:
      'Combinaison de logique metier, donnees geographiques et interface web pour faciliter la decision de parcours.',
    stack: ['Python', 'JavaScript', 'Geospatial', 'Web app'],
    private: true
  },
  {
    title: 'Architecture ETL et Data Warehouse national',
    slug: 'etl-datawarehouse-national',
    category: 'Dashboard',
    image: '/assets/Images/power.png',
    summary:
      'Centralisation, nettoyage et structuration de donnees nationales multi-sources pour alimenter un reporting automatise.',
    impact:
      'Definition de KPIs, documentation methodologique et pipeline de donnees pour ameliorer la productivite du reporting.',
    stack: ['Apache Hop', 'SQL', 'Data Warehouse', 'Superset'],
    private: true
  }
];

export const featuredProjects = projects.filter((project) => project.featured);
