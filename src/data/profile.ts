export const profile = {
  email: 'grimael.s@outlook.com',
  github: 'https://github.com/grimael',
  linkedin: 'https://www.linkedin.com/in/grimael',
  whatsapp: 'https://wa.me/2250718283603',
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
    lead: 'La rigueur statistique pour comprendre et modéliser.',
    skills: [
      'Statistique descriptive et inférentielle',
      'Régression et économétrie',
      'Séries temporelles et prévision',
      'Analyse multivariée',
      'Sondages et échantillonnage'
    ],
    tools: ['R', 'Python', 'STATA', 'SPSS']
  },
  {
    title: 'Analyse de données',
    lead: 'Des données fiables et des résultats lisibles.',
    skills: [
      'Collecte et préparation des données',
      'Analyse exploratoire',
      'Analyse de données multi-sources',
      'Visualisation des données',
      'Recommandations et aide à la décision'
    ],
    tools: ['SQL', 'Excel', 'pandas', 'NumPy', 'Matplotlib', 'KoboToolbox', 'ODK', 'CSPro', 'Survey Solutions']
  },
  {
    title: 'Data Engineering',
    lead: 'Des flux de données fiables, automatisés et documentés.',
    skills: [
      'Pipelines ETL / ELT',
      'Entrepôts et modélisation des données',
      'Bases de données analytiques',
      'Intégration de données et API',
      'Qualité et automatisation des traitements'
    ],
    tools: ['Apache Hop', 'Talend', 'PostgreSQL', 'DuckDB', 'FastAPI', 'Docker', 'GitHub Actions']
  },
  {
    title: 'Data Science & Machine Learning',
    lead: 'Des modèles adaptés aux besoins, évalués et interprétables.',
    skills: [
      'Apprentissage supervisé et non supervisé',
      'Évaluation et interprétabilité des modèles',
      'Deep learning',
      'Traitement du langage et vision par ordinateur',
      'IA générative et assistants LLM'
    ],
    tools: ['Python', 'scikit-learn', 'LightGBM', 'SHAP', 'Jupyter', 'Google Colab', 'Gemini', 'Groq']
  },
  {
    title: 'BI & Reporting',
    lead: 'Des indicateurs clairs pour accompagner les décisions.',
    skills: [
      'Tableaux de bord décisionnels',
      'Modélisation analytique et DAX',
      'Définition et suivi des indicateurs',
      'Reporting automatisé',
      'Data storytelling et restitution'
    ],
    tools: ['Power BI', 'Tableau', 'Apache Superset', 'R Shiny', 'Streamlit', 'QGIS', 'PowerPoint', 'Canva']
  },
  {
    title: 'Développement web',
    lead: 'Des applications qui rendent les données accessibles.',
    skills: [
      'Interfaces web interactives et responsives',
      'Développement d’API et services back-end',
      'Bases de données et authentification',
      'Applications analytiques et de bureau',
      'Déploiement et hébergement'
    ],
    tools: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Astro', 'Node.js', 'Tailwind CSS', 'Supabase', 'Electron', 'Vercel', 'Render', 'VS Code']
  }
];
