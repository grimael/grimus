import fs from 'node:fs';

const fallbackCategory = 'Web';

const extractSection = (markdown, heading) => {
  const regex = new RegExp(`##\\s*${heading}\\s*\\n([\\s\\S]*?)(?=\\n##\\s+|\\n#\\s+|$)`, 'i');
  const match = markdown.match(regex);
  return match ? match[1].trim() : '';
};

const parseStack = (markdown) => {
  const candidates = [
    extractSection(markdown, 'Stack'),
    extractSection(markdown, 'Technologies'),
    extractSection(markdown, 'Technologie')
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    const items = candidate
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('- '))
      .map((line) => line.replace(/^\-\s*/, '').trim())
      .filter(Boolean);

    if (items.length) return items;
  }

  return [];
};

const parseLinks = (markdown) => {
  const live = markdown.match(/Live:\s*(https?:\/\/[^\s]+)/i)?.[1] || '';
  const repo = markdown.match(/GitHub:\s*(https?:\/\/github\.com\/[^\s]+)/i)?.[1] || '';
  return { live, repo };
};

const parseImage = (markdown) => {
  const match = markdown.match(/!\[[^\]]*\]\((https?:\/\/[^\s)]+|\.\/[^\s)]+|\.\.\/[^\s)]+)\)/i);
  return match ? match[1] : '/assets/Images/Project.svg';
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

const parseReadme = (markdown) => {
  const title = markdown
    .match(/^#\s+(.+)$/m)?.[1]
    .trim() || 'Projet sans titre';

  const summary = markdown
    .split('\n')
    .find((line) => line.startsWith('> '))
    ?.replace(/^>\s*/, '')
    .trim() || markdown.split('\n').find((line) => !line.startsWith('#')).trim();

  const impact = extractSection(markdown, 'Impact') || extractSection(markdown, 'Résultat');
  const stack = parseStack(markdown);
  const links = parseLinks(markdown);
  const image = parseImage(markdown);

  return {
    title,
    slug: slugify(title),
    category: fallbackCategory,
    summary,
    impact,
    stack,
    image,
    liveUrl: links.live || '',
    repoUrl: links.repo || '',
    featured: true
  };
};

const [filePath] = process.argv.slice(2);

if (!filePath) {
  console.error('Usage: node scripts/parse-readme.mjs ./README.md');
  process.exit(1);
}

const markdown = fs.readFileSync(filePath, 'utf8');
const payload = parseReadme(markdown);
console.log(JSON.stringify(payload, null, 2));
