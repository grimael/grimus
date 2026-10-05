import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dataFile = path.join(rootDir, 'src/data/projects.generated.json');

const validCategories = [
  'Statistique',
  'Data Visualisation',
  'Géospatial',
  'Recherche',
  'Web',
  'IA'
];

const sanitizeText = (value, fallback = '') => {
  if (typeof value !== 'string') return fallback;
  return value.trim() || fallback;
};

const slugify = (value) => {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
};

const ensureCategory = (value) => {
  return validCategories.includes(value) ? value : 'Web';
};

const projectFromPayload = (payload) => {
  const rawTitle = sanitizeText(payload.title, 'Projet sans titre');
  const slug = slugify(payload.slug || rawTitle);
  const stack = Array.isArray(payload.stack)
    ? payload.stack.map((item) => sanitizeText(item, '')).filter(Boolean)
    : [];

  return {
    title: rawTitle,
    slug,
    category: ensureCategory(sanitizeText(payload.category, 'Web')),
    image: sanitizeText(payload.image, '/assets/Images/Project.svg'),
    summary: sanitizeText(payload.summary, 'Projet ajouté automatiquement depuis un dépôt GitHub.'),
    impact: sanitizeText(payload.impact, 'Projet intégré automatiquement à partir d’un README structuré.'),
    stack,
    liveUrl: sanitizeText(payload.liveUrl, ''),
    repoUrl: sanitizeText(payload.repoUrl, ''),
    private: Boolean(payload.private),
    featured: Boolean(payload.featured)
  };
};

const parseInput = () => {
  const rawPayload = process.env.PROJECT_PAYLOAD;

  if (!rawPayload || rawPayload === '{}') {
    throw new Error('Missing PROJECT_PAYLOAD. Dispatch a valid client payload or pass a JSON string.');
  }

  try {
    return JSON.parse(rawPayload);
  } catch (error) {
    throw new Error(`Invalid JSON payload: ${error.message}`);
  }
};

const main = () => {
  const payload = parseInput();
  const project = projectFromPayload(payload);

  let current = [];
  if (fs.existsSync(dataFile)) {
    const raw = fs.readFileSync(dataFile, 'utf8');
    current = raw ? JSON.parse(raw) : [];
  }

  const next = [...current];
  const index = next.findIndex((item) => item.slug === project.slug || item.repoUrl === project.repoUrl || item.title === project.title);

  if (index >= 0) {
    next[index] = project;
  } else {
    next.push(project);
  }

  fs.writeFileSync(dataFile, `${JSON.stringify(next, null, 2)}\n`);
  console.log(`Synced project: ${project.title}`);
};

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
