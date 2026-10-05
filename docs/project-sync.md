# Synchronisation automatique des projets

Ce portfolio peut recevoir automatiquement des données depuis n’importe quel dépôt GitHub de projet.

## Format recommandé du README

Chaque dépôt projet doit utiliser ce format de base :

```md
# Nom du projet

> Une phrase courte qui résume le projet.

## Résumé
Description courte du problème, de la solution et de la valeur créée.

## Stack
- Python
- FastAPI
- Astro
- DuckDB

## Fonctionnalités
- Fonction 1
- Fonction 2
- Fonction 3

## Impact
- Impact business
- Impact technique
- Impact utilisateur

## Captures
![Capture](docs/screenshots/overview.png)

## Liens
- Live: https://example.com
- GitHub: https://github.com/grimael/mon-projet
``` 

## Workflow projet → portfolio

Le dépôt projet déclenche un workflow à chaque push. Ce workflow lit le README, parse les sections, puis envoie les données au dépôt portfolio.

## Payload attendu par le portfolio

```json
{
  "title": "OpenDataViz",
  "slug": "opendataviz",
  "category": "Data Visualisation",
  "summary": "Plateforme de visualisation de données pour suivre les indicateurs économiques en Afrique.",
  "impact": "Le projet met à disposition un tableau de bord ...",
  "stack": ["Python", "DuckDB", "FastAPI", "Astro"],
  "image": "https://raw.githubusercontent.com/grimael/monprojet/main/docs/screenshots/overview.png",
  "liveUrl": "https://example.com",
  "repoUrl": "https://github.com/grimael/monprojet",
  "featured": true
}
```

## Secret GitHub à configurer

Dans le dépôt projet, créez un secret :

- `PORTFOLIO_REPO`: `grimael/grimus`
- `PORTFOLIO_TOKEN`: un PAT avec accès en écriture sur le dépôt du portfolio

## Réformulation avec Gemini

Le meilleur scénario consiste à garder le parsing strict du README et à appeler l’API Gemini uniquement pour reformuler la description courte et l’impact. Cela évite de dépendre de l’IA pour la logique métier tout en gardant un résultat plus fluide sur le portfolio.

## Ce qui est prêt dans ce dépôt

- le workflow de réception côté portfolio dans [.github/workflows/project-sync.yml](../.github/workflows/project-sync.yml)
- le script de synchronisation dans [scripts/sync-project.mjs](../scripts/sync-project.mjs)
- le script de parsing du README dans [scripts/parse-readme.mjs](../scripts/parse-readme.mjs)
- le fichier d’entrée dynamique dans [src/data/projects.generated.json](../src/data/projects.generated.json)

## Étape suivante

Dans le dépôt projet, il faut ajouter un workflow équivalent qui appelle le parseur du README, puis envoie le payload au portfolio via `repository_dispatch` ou un appel GitHub API.
