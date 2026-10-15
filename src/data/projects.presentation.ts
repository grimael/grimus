import type { Project } from './projects';

export const hasProjectImage = (project: Project) => !project.image.endsWith('/Project.svg') && !/logo_maphix|profil-|grima-editorial/i.test(project.image);

export const shortDescriptions: Record<string, string> = {
  'opendataviz-observatoire-afrique': 'Un observatoire pour explorer les données économiques et sociales de l’Afrique.',
  'rh-ia-pro': 'Une application RH pour centraliser les opérations, le pilotage et l’automatisation.',
  'prediction-nps-artefact': 'Prédire la satisfaction client en tenant compte du biais de sélection et de l’équité.',
  'dashboard-churn-telecom-ia': 'Comprendre la résiliation client avec R Shiny et un assistant connecté aux données.'
};
