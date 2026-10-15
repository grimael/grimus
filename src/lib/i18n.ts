import { withBase } from './paths';

export type Lang = 'fr';
export type Page = 'home' | 'about' | 'expertise' | 'projects' | 'contact';
export const pagePaths: Record<Page, string> = { home: '', about: 'about', expertise: 'expertise', projects: 'projects', contact: 'contact' };

export function localizedPath(path = '', _lang: Lang = 'fr') {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return withBase(`/${clean}${clean ? '/' : ''}`);
}

export const ui = { fr: {
    nav: ['Accueil', 'À propos', 'Expertise', 'Projets', 'Contact'],
    skip: 'Aller au contenu', menu: 'Ouvrir le menu', close: 'Fermer', navigation: 'Navigation principale',
    theme: 'Changer le thème', light: 'Thème clair', dark: 'Thème sombre',
    eyebrow: 'STATISTIQUE · DATA SCIENCE · IA',
    heroLine1: 'Des données', heroLine2: 'en solutions', heroAccent: 'à impact',
    heroDescription: 'Statisticien de formation, je conçois des analyses, des outils de reporting et des applications fondées sur les données pour éclairer les décisions et répondre à des problématiques concrètes.',
    explore: 'Explorer mes projets', contact: 'Me contacter',
    identity: 'Michaël S. GRIMA', identityRole: 'Statistique, analyse et applications data',
    projectsCount: 'projets au portfolio', expertiseCount: 'domaines complémentaires', educationStat: 'Formation en statistique',
    technology: 'Technologies principales', organizations: 'Formation & expériences', education: 'Formation', experience: 'Expérience professionnelle',
    expertiseEyebrow: 'MON EXPERTISE', expertiseTitle: 'Un ensemble de compétences\nau service de vos données.',
    expertiseDescription: 'De la collecte des données à la mise en ligne des applications, j’interviens sur l’ensemble de la chaîne de valeur data.',
    more: 'Voir plus', featuredEyebrow: 'MES PROJETS PHARES',
    featuredTitle: 'Des réalisations concrètes\npour des problématiques réelles.',
    featuredDescription: 'Une sélection de travaux en analyse de données, intelligence artificielle et développement d’applications.',
    allProjects: 'Tous les projets', journeyEyebrow: 'PARCOURS', journeyTitle: 'Formation statistique.\nExpérience terrain.',
    journeyLink: 'Découvrir mon parcours', valuesTitle: 'Ce qui guide mon travail',
    values: ['Rigueur méthodologique', 'Curiosité et apprentissage', 'Clarté des résultats', 'Utilité des solutions'],
    contactEyebrow: 'UNE IDÉE · UN PROJET · UNE COLLABORATION', contactTitle: 'Discutons de votre projet.',
    contactDescription: 'Vous travaillez sur une problématique liée aux données, à l’analyse ou à l’intelligence artificielle ? Échangeons sur vos besoins et les possibilités de collaboration.',
    footer: 'Statistique. Données. Décisions.', copyright: 'Tous droits réservés.',
    aboutEyebrow: 'À PROPOS', aboutTitle: 'Michaël S. GRIMA', aboutSubtitle: 'La rigueur statistique,\nle goût de construire.',
    aboutLead: 'Formé à l’ENSEA d’Abidjan, je relie l’analyse statistique, l’ingénierie des données et le développement d’applications.',
    aboutParagraphs: [
      'Mon travail commence par une question : que cherche-t-on à comprendre, et sur quelles données peut-on s’appuyer ? Je prépare les données, choisis des méthodes adaptées et restitue les résultats en tenant compte de leurs limites.',
      'Mes expériences documentées couvrent l’assurance, le service public et la formation professionnelle. J’y ai travaillé sur les analyses, les indicateurs, les flux ETL et le reporting.',
      'Mes projets personnels prolongent cette approche : observatoire de données africaines, tableaux de bord R Shiny, modèles interprétables et applications web. La recherche économétrique sur la corruption et l’investissement public fait aussi partie de ce parcours.'
    ],
    approachEyebrow: 'MA FAÇON DE TRAVAILLER', approachTitle: 'Comprendre. Construire. Restituer.',
    approachSteps: [
      ['Comprendre le problème', 'Définir la question, les sources, les contraintes et le livrable attendu.'],
      ['Construire avec méthode', 'Préparer des données fiables, comparer les méthodes et documenter les choix.'],
      ['Restituer avec clarté', 'Livrer une analyse, un tableau de bord ou une application dont les limites sont explicites.']
    ],
    expertisePageTitle: 'De la donnée brute\nà l’application utile.', expertisePageLead: 'Des compétences mises en pratique dans les analyses, les pipelines et les applications du portfolio.',
    skills: 'Compétences', tools: 'Outils', related: 'Explorer les projets associés',
    projectsEyebrow: 'PORTFOLIO', projectsTitle: 'Des données. Du code.\nDes projets concrets.',
    projectsLead: 'Analyses, modèles, tableaux de bord et applications : chaque projet documente une façon de résoudre un problème.',
    all: 'Tous', search: 'Rechercher un projet', searchPlaceholder: 'Projet, outil, mot-clé…', clear: 'Effacer la recherche',
    results: 'projets', emptyTitle: 'Aucun projet trouvé', emptyDescription: 'Essayez un autre mot-clé ou une autre catégorie.', reset: 'Réinitialiser',
    details: 'Voir le projet', preview: 'Aperçu rapide', caseStudy: 'Fiche projet', private: 'Projet privé',
    screenshotAlt: 'Capture du projet',
    overview: 'Contexte & démarche', deliverables: 'Livrables & résultats', technologies: 'Technologies',
    source: 'Code source', live: 'Voir le livrable', back: 'Retour aux projets', imagePreview: 'Agrandir la capture',
    restricted: 'L’accès à ce livrable peut nécessiter une connexion à Power BI.',
    privateDescription: 'Le code de ce projet n’est pas public. Les informations présentées se limitent à sa description au portfolio.',
    relatedTitle: 'À explorer également',
    contactPageEyebrow: 'CONTACT', contactPageLead: 'Une analyse à mener, un tableau de bord à concevoir ou une application à construire : parlons de votre besoin.',
    channels: 'Restons en contact', emailHint: 'Écrivez-moi directement', linkedinHint: 'Mon profil professionnel', githubHint: 'Mes projets et mon code', whatsappHint: 'Échangeons par message',
    scopeTitle: 'Votre point de départ', scopeSteps: ['Le contexte et la question à résoudre', 'Les données et contraintes disponibles', 'Le livrable et le calendrier envisagés'],
    mailSubject: 'Projet data depuis votre portfolio', mailBody: 'Bonjour Michaël,\n\nJe souhaite échanger sur un projet.\n\nContexte :\nDonnées disponibles :\nObjectif et livrable :\nCalendrier :\n',
    meta: {
      home: ['GRIMAEL.DEV — Statistique, Data Science & IA', 'Michaël S. GRIMA : analyses statistiques, reporting, tableaux de bord et applications data. Découvrez les projets et le parcours.'],
      about: ['À propos — GRIMAEL.DEV', 'Le parcours de Michaël S. GRIMA, sa formation à l’ENSEA et son approche de la statistique, de la data et des applications.'],
      expertise: ['Expertise — GRIMAEL.DEV', 'Statistique, analyse de données, machine learning, ingénierie des données, BI et développement d’applications.'],
      projects: ['Projets — GRIMAEL.DEV', 'Explorez 25 projets : OpenDataViz, RH IA Pro, R Shiny, Power BI, économétrie, machine learning et cartographie.'],
      contact: ['Contact — GRIMAEL.DEV', 'Contactez Michaël S. GRIMA pour échanger sur une analyse, un tableau de bord ou une application data.']
    }
  } };

export const term = (value: string, _lang: Lang) => value;
