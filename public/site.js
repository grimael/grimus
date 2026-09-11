const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('[data-nav]');

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
});

document.querySelectorAll('.logo-strip span, .tool-chip, .social-card').forEach((container) => {
  const image = container.querySelector('img');

  if (!image) return;

  const markMissing = () => {
    container.classList.add('logo-missing');
  };

  image.addEventListener('error', markMissing, { once: true });

  if (image.complete && image.naturalWidth === 0) {
    markMissing();
  }
});

const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card[data-category]');
const emptyState = document.querySelector('[data-empty-state]');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    let visible = 0;

    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));

    projectCards.forEach((card) => {
      const match = filter === 'Tous' || card.getAttribute('data-category') === filter;
      card.hidden = !match;
      if (match) visible += 1;
    });

    if (emptyState) {
      emptyState.hidden = visible > 0;
    }
  });
});

/* ── Theme toggle (white filter) ───────────────────────────── */
const themeCheckbox = document.querySelector('[data-theme-toggle]');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeCheckbox) themeCheckbox.checked = theme === 'light';
  if (window.__dataBgRefresh) window.__dataBgRefresh();
}

themeCheckbox?.addEventListener('change', () => {
  const theme = themeCheckbox.checked ? 'light' : 'dark';
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    /* localStorage unavailable */
  }
  applyTheme(theme);
});

applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

/* ── Project details dialog ────────────────────────────────── */
const projectDialog = document.getElementById('project-dialog');

// Built with DOM APIs (no innerHTML): the CSP enforces Trusted Types.
function createGithubIcon() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute(
    'd',
    'M12 2C6.48 2 2 6.58 2 12.25c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.49v-1.72c-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 7c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.95.68 1.92v2.84c0 .27.18.59.69.49A10.12 10.12 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z'
  );
  svg.appendChild(path);
  return svg;
}

function openProjectDialog(card) {
  if (!projectDialog || !card) return;
  const d = card.dataset;

  const image = projectDialog.querySelector('[data-dialog-image]');
  image.src = d.image || '';

  const categoryEl = projectDialog.querySelector('[data-dialog-category]');
  categoryEl.textContent = d.category || '';

  const lockEl = projectDialog.querySelector('[data-dialog-lock]');
  lockEl.hidden = d.private !== '1';

  const titleEl = projectDialog.querySelector('[data-dialog-title]');
  titleEl.textContent = d.title || '';

  const summaryEl = projectDialog.querySelector('[data-dialog-summary]');
  summaryEl.textContent = d.summary || '';

  const impactEl = projectDialog.querySelector('[data-dialog-impact]');
  impactEl.textContent = d.impact || '';

  let stack = [];
  try {
    stack = JSON.parse(d.stack || '[]');
  } catch (e) {
    stack = [];
  }

  const stack0El = projectDialog.querySelector('[data-dialog-stack0]');
  stack0El.textContent = stack[0] || '';

  const stackList = projectDialog.querySelector('[data-dialog-stack-list]');
  stackList.replaceChildren();
  stack.forEach((tech) => {
    const span = document.createElement('span');
    span.textContent = tech;
    stackList.appendChild(span);
  });

  const actions = projectDialog.querySelector('[data-dialog-actions]');
  actions.replaceChildren();

  if (d.private === '1') {
    const span = document.createElement('span');
    span.className = 'btn btn-disabled';
    span.textContent = 'Privé';
    actions.appendChild(span);
  } else {
    if (d.liveUrl) {
      const live = document.createElement('a');
      live.className = 'btn btn-primary btn-compact';
      live.href = d.liveUrl;
      live.target = '_blank';
      live.rel = 'noopener noreferrer';
      live.textContent = 'Voir';
      actions.appendChild(live);
    }
    if (d.repoUrl) {
      const repo = document.createElement('a');
      repo.className = 'btn btn-ghost btn-icon';
      repo.href = d.repoUrl;
      repo.target = '_blank';
      repo.rel = 'noopener noreferrer';
      repo.title = 'GitHub';
      repo.setAttribute('aria-label', d.repoAria || '');
      repo.appendChild(createGithubIcon());
      actions.appendChild(repo);
    }
  }

  if (typeof projectDialog.showModal === 'function') {
    projectDialog.showModal();
  }
}

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-open-project]');
  if (!trigger) return;
  openProjectDialog(trigger.closest('.project-card'));
});

projectDialog?.querySelector('[data-dialog-close]')?.addEventListener('click', () => projectDialog.close());

projectDialog?.addEventListener('click', (event) => {
  if (event.target === projectDialog) projectDialog.close();
});
