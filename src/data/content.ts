import { expertisePillars } from './profile';
import type { Lang } from '../lib/i18n';

export const expertise = [
    { icon: 'ChartColumnIncreasing', category: 'Data Visualisation', fr: ['Analyse de données', 'Exploration, préparation et lecture statistique des données.'] },
    { icon: 'BrainCircuit', category: 'IA', fr: ['Data Science & Machine Learning', 'Modèles prédictifs, apprentissage automatique et IA.'] },
    { icon: 'Database', category: 'Data Visualisation', fr: ['Ingénierie des données', 'Pipelines ETL, entrepôts et flux de données documentés.'] },
    { icon: 'MonitorCog', category: 'Data Visualisation', fr: ['Business intelligence', 'Tableaux de bord Power BI, indicateurs et reporting.'] },
    { icon: 'ChartSpline', category: 'Statistique', fr: ['Modélisation statistique', 'Régression, économétrie et analyse de données de panel.'] },
    { icon: 'Boxes', category: 'Web', fr: ['Applications data', 'Interfaces Shiny, APIs et applications web analytiques.'] }
] as const;

export function localizedPillars(_lang: Lang) {
  return expertisePillars;
}

export const journey = { fr: [
    { date: 'Janvier 2026', role: 'Support Data & Business Intelligence', org: 'SanlamAllianz Participations', description: 'Analyse de données financières, tableaux de bord Power BI et pipelines ETL Apache Hop pour le reporting mensuel.', icon: 'BriefcaseBusiness' },
    { date: 'Oct. 2025 — Janv. 2026', role: 'Statisticien — Data Analyst', org: 'Observatoire du Service Public', description: 'Analyses multi-sources, rapports et suivi des indicateurs de performance du service public.', icon: 'ChartColumn' },
    { date: 'Mai — Septembre 2025', role: 'Statisticien — Data Analyst', org: 'Ministère de l’Enseignement Technique', description: 'Architecture ETL, entrepôt de données national et reporting sous Apache Superset.', icon: 'Database' },
    { date: 'Formation', role: 'Statistique & Data Science', org: 'ENSEA d’Abidjan', description: 'Une formation statistique mobilisée dans les analyses, les travaux économétriques et les applications du portfolio.', icon: 'GraduationCap' }
  ] } as const;
