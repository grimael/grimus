export const profile = {
  email: 'grimael.s@outlook.com',
  github: 'https://github.com/grimael',
  linkedin: 'https://www.linkedin.com/in/grimael',
  headline: 'Transformer les données brutes en décisions utiles, et construire les outils pour les voir clairement.',
  bio:
    "Data scientist et Analyste Statisticien diplômé de l'ENSEA d'Abidjan, je conçois des solutions data de bout en bout : collecte, ETL, entrepôt de données, tableaux de bord BI, modèles statistiques et outils web interactifs."
};

export type SkillLogo = {
  name: string;
  icon?: string;
  initials?: string;
};

const logo = (file: string) => `${import.meta.env.BASE_URL}assets/logos/${file}`;

export const skillLogos: SkillLogo[] = [
  { name: 'Python', icon: logo('python.svg') },
  { name: 'R', icon: logo('r.svg') },
  { name: 'scikit-learn', icon: logo('scikit-learn.svg') },
  { name: 'pandas', icon: logo('pandas.svg') },
  { name: 'NumPy', icon: logo('numpy.svg') },
  { name: 'Matplotlib', icon: logo('matplotlib.svg') },
  { name: 'STATA', icon: logo('stata.svg') },
  { name: 'SPSS', icon: logo('spss.svg') },
  { name: 'LightGBM', icon: logo('lightgbm.png') },
  { name: 'SHAP', icon: logo('shap.png') },
  { name: 'Gemini', icon: logo('gemini.svg') },
  { name: 'Groq', initials: 'GQ' },
  { name: 'SQL', icon: logo('sql.svg') },
  { name: 'PostgreSQL', icon: logo('postgresql.svg') },
  { name: 'DuckDB', icon: logo('duckdb.svg') },
  { name: 'Apache Hop', icon: logo('apache-hop.svg') },
  { name: 'Talend', icon: logo('talend.svg') },
  { name: 'FastAPI', icon: logo('fastapi.svg') },
  { name: 'Docker', icon: logo('docker.svg') },
  { name: 'GitHub Actions', icon: logo('github-actions.svg') },
  { name: 'Git', icon: logo('git.svg') },
  { name: 'GitHub', icon: logo('github.svg') },
  { name: 'Power BI', icon: logo('power-bi.svg') },
  { name: 'Tableau', icon: logo('tableau.svg') },
  { name: 'Apache Superset', icon: logo('apache-superset.svg') },
  { name: 'R Shiny', icon: logo('r.svg') },
  { name: 'Streamlit', icon: logo('streamlit.svg') },
  { name: 'Excel', icon: logo('excel.svg') },
  { name: 'QGIS', icon: logo('qgis.svg') },
  { name: 'HTML5', icon: logo('html5.svg') },
  { name: 'CSS3', icon: logo('css3.svg') },
  { name: 'JavaScript', icon: logo('javascript.svg') },
  { name: 'TypeScript', icon: logo('typescript.svg') },
  { name: 'React', icon: logo('react.svg') },
  { name: 'Next.js', icon: logo('next-js.svg') },
  { name: 'Node.js', icon: logo('node-js.svg') },
  { name: 'Tailwind CSS', icon: logo('tailwind-css.svg') },
  { name: 'Astro', icon: logo('astro.svg') },
  { name: 'Supabase', icon: logo('supabase.svg') },
  { name: 'Electron', icon: logo('electron.svg') },
  { name: 'Vercel', icon: logo('vercel.svg') },
  { name: 'Render', icon: logo('render.svg') },
  { name: 'LaTeX', icon: logo('latex.svg') },
  { name: 'KoboToolbox', icon: logo('kobotoolbox.png') },
  { name: 'ODK', icon: logo('odk.jpg') },
  { name: 'CSPro', icon: logo('cspro.png') },
  { name: 'Survey Solutions', icon: logo('survey-solutions.png') },
  { name: 'VS Code', icon: logo('vs-code.svg') },
  { name: 'PowerPoint', icon: logo('powerpoint.svg') },
  { name: 'Canva', icon: logo('canva.svg') },
  { name: 'Jupyter', icon: logo('jupyter.svg') },
  { name: 'Google Colab', icon: logo('google-colab.svg') }
];

export type ExpertisePillar = {
  title: string;
  lead: string;
  skills: string[];
  /** Names from `skillLogos`. */
  tools: string[];
  wide?: boolean;
};

export const expertisePillars: ExpertisePillar[] = [
  {
    title: 'Statistique & Économétrie',
    lead: 'La rigueur méthodologique avant la visualisation.',
    skills: [
      'Statistique descriptive',
      "Statistique inférentielle et tests d'hypothèses (χ², V de Cramér)",
      'Probabilités',
      'Analyse exploratoire des données',
      'Régression, économétrie et données de panel',
      'Séries temporelles',
      'Analyse factorielle (ACP, AFC, ACM) et classification (CAH)',
      'Analyse de corrélation',
      'Théorie des sondages et échantillonnage',
      'Traitement des valeurs manquantes (imputation)',
      'Correction des biais de sélection'
    ],
    tools: ['R', 'Python', 'STATA', 'SPSS']
  },
  {
    title: 'Analyse de données',
    lead: 'Explorer, croiser et transformer la donnée brute en recommandations claires.',
    skills: [
      'SQL avancé',
      'Programmation Python et R',
      'Excel avancé et automatisation VBA',
      "Conception d'enquêtes et collecte de données",
      'Nettoyage et préparation des données',
      'Croisement de données multi-sources',
      'Formulation de recommandations à partir des résultats'
    ],
    tools: ['SQL', 'Excel', 'pandas', 'NumPy', 'Matplotlib', 'KoboToolbox', 'ODK', 'CSPro', 'Survey Solutions']
  },
  {
    title: 'Data Engineering',
    lead: 'Des flux de données fiables, automatisés et documentés.',
    skills: [
      'Pipelines ETL / ELT',
      "Architecture d'entrepôt de données",
      'Modélisation dimensionnelle (schéma en étoile)',
      'Bases de données analytiques',
      'Extraction de données via API',
      'Contrôle qualité automatisé (complétude, validité, fraîcheur)',
      'Automatisation et planification des traitements',
      "Développement d'API REST",
      'Conteneurisation'
    ],
    tools: ['Apache Hop', 'Talend', 'PostgreSQL', 'DuckDB', 'FastAPI', 'Docker', 'GitHub Actions']
  },
  {
    title: 'Data Science',
    lead: 'Des modèles appliqués à de vrais problèmes métier, interprétables et auditables.',
    skills: [
      'Apprentissage supervisé : classification et régression',
      'Apprentissage non supervisé : clustering et segmentation',
      'Feature engineering',
      'Interprétabilité des modèles',
      "Audit d'équité des modèles",
      'Prévision et projections',
      'NLP : analyse de sentiments',
      'Algorithmes génétiques et optimisation',
      'Deep learning',
      'OCR et vision par ordinateur',
      'IA générative : assistants LLM connectés aux données'
    ],
    tools: ['Python', 'scikit-learn', 'LightGBM', 'SHAP', 'Jupyter', 'Google Colab', 'Gemini', 'Groq']
  },
  {
    title: 'BI & Reporting',
    lead: 'Des indicateurs lisibles, actionnables et suivis dans la durée.',
    skills: [
      'Tableaux de bord décisionnels',
      'Modélisation Power BI et DAX',
      'Applications analytiques interactives',
      'Définition et suivi de KPIs (plus de 20)',
      'Reporting automatisé',
      'Cartographie et analyse spatiale',
      'Data storytelling, infographies et présentations',
      'Rapports analytiques pour les décideurs'
    ],
    tools: ['Power BI', 'Tableau', 'Apache Superset', 'R Shiny', 'Streamlit', 'QGIS', 'PowerPoint', 'Canva']
  },
  {
    title: 'Gestion de projets data',
    lead: 'Du cadrage au déploiement, avec un impact mesuré.',
    skills: [
      'Recueil et cadrage des besoins métier',
      "Conception d'architectures data de bout en bout",
      "Pilotage de déploiements avec mesure d'impact (jusqu'à 40 % de gain de productivité)",
      'Méthodes agiles (Scrum)',
      "Coordination d'équipe",
      'Formation des utilisateurs',
      'Documentation méthodologique et traçabilité des décisions',
      'Reproductibilité des analyses',
      'Versioning et collaboration'
    ],
    tools: ['Git', 'GitHub', 'LaTeX']
  },
  {
    title: 'Développement web',
    lead: 'Des produits web qui donnent une vraie présence aux résultats.',
    skills: [
      'HTML, CSS et JavaScript',
      'TypeScript',
      'React.js et Next.js',
      'Astro (sites statiques rapides et bien référencés)',
      'Node.js et Express (back-end, API)',
      'Tailwind CSS',
      'Bases de données et authentification',
      'Visualisation web interactive (Chart.js, Leaflet)',
      'Sites bilingues, adaptés au mobile et sécurisés',
      'Applications de bureau',
      'Déploiement et hébergement'
    ],
    tools: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Astro', 'Node.js', 'Tailwind CSS', 'Supabase', 'Electron', 'Vercel', 'Render', 'VS Code'],
    wide: true
  }
];
