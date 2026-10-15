const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

function setMenu(open, restoreFocus = false) {
  if (!menuToggle || !nav) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  if (main) main.inert = open;
  if (footer) footer.inert = open;
  if (restoreFocus) menuToggle.focus();
}
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  setMenu(open);
  if (open) nav.querySelector('a')?.focus();
});
nav?.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('click', event => {
  if (menuToggle?.getAttribute('aria-expanded') === 'true' && !header.contains(event.target)) setMenu(false, true);
});
document.addEventListener('keydown', event => {
  if (menuToggle?.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') { setMenu(false, true); event.preventDefault(); }
  if (event.key === 'Tab') {
    const focusable = [...header.querySelectorAll('a, button, input')].filter(el => el.getClientRects().length);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { last.focus(); event.preventDefault(); }
    if (!event.shiftKey && document.activeElement === last) { first.focus(); event.preventDefault(); }
  }
});
window.matchMedia('(min-width: 700px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 15);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const themeCheckbox = document.querySelector('[data-theme-toggle]');
function applyTheme(theme) {
  root.dataset.theme = theme;
  if (themeCheckbox) {
    themeCheckbox.checked = theme === 'dark';
    themeCheckbox.setAttribute('aria-label', theme === 'dark' ? themeCheckbox.dataset.lightLabel : themeCheckbox.dataset.darkLabel);
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101b23' : '#f4f9fc');
}
themeCheckbox?.addEventListener('change', () => {
  const theme = themeCheckbox.checked ? 'dark' : 'light';
  try { localStorage.setItem('theme', theme); } catch { /* Storage is optional. */ }
  applyTheme(theme);
});
applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
document.querySelectorAll('[data-marquee-toggle]').forEach(button => button.addEventListener('click', () => {
  const paused = button.getAttribute('aria-pressed') !== 'true';
  const window = document.getElementById(button.getAttribute('aria-controls'));
  if (!window) return;
  button.setAttribute('aria-pressed', String(paused));
  const label = paused ? button.dataset.playLabel : button.dataset.pauseLabel;
  button.setAttribute('aria-label', label);
  button.title = label;
  window.classList.toggle('is-paused', paused);
}));
const catalog = document.querySelector('[data-project-catalog]');
if (catalog) {
  const cards = [...catalog.querySelectorAll('.project-card')];
  const buttons = [...catalog.querySelectorAll('[data-filter]')];
  const input = catalog.querySelector('[data-project-search]');
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const initial = new URLSearchParams(window.location.search);
  let category = buttons.some(b => b.dataset.filter === initial.get('category')) ? initial.get('category') : 'all';
  input.value = initial.get('q') || '';
  function filterProjects(updateUrl = true) {
    const query = normalize(input.value.trim());
    let visible = 0;
    buttons.forEach(button => {
      const active = button.dataset.filter === category;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    cards.forEach(card => {
      const matches = (category === 'all' || card.dataset.category === category) && normalize(card.dataset.search).includes(query);
      const wasHidden = card.hidden;
      card.hidden = !matches;
      if (matches) visible++;
      if (matches && wasHidden && !reducedMotion.matches) {
        card.classList.remove('filter-enter');
        requestAnimationFrame(() => card.classList.add('filter-enter'));
      }
    });
    catalog.querySelector('[data-empty-state]').hidden = visible > 0;
    catalog.querySelector('[data-result-count]').textContent = String(visible);
    catalog.querySelector('[data-clear-search]').hidden = !input.value;
    catalog.querySelector('.catalog-status [data-reset-filters]').hidden = category === 'all' && !input.value;
    if (updateUrl) {
      const url = new URL(window.location.href);
      category === 'all' ? url.searchParams.delete('category') : url.searchParams.set('category', category);
      input.value.trim() ? url.searchParams.set('q', input.value.trim()) : url.searchParams.delete('q');
      history.replaceState(null, '', url);
    }
  }
  buttons.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; filterProjects(); }));
  input.addEventListener('input', () => filterProjects());
  catalog.querySelector('[data-clear-search]').addEventListener('click', () => { input.value = ''; filterProjects(); input.focus(); });
  catalog.querySelectorAll('[data-reset-filters]').forEach(button => button.addEventListener('click', () => { category = 'all'; input.value = ''; filterProjects(); }));
  window.addEventListener('popstate', () => {
    const params = new URLSearchParams(window.location.search);
    category = buttons.some(b => b.dataset.filter === params.get('category')) ? params.get('category') : 'all';
    input.value = params.get('q') || '';
    filterProjects(false);
  });
  filterProjects(false);
}

const projectDialog = document.querySelector('#project-dialog');
const imageDialog = document.querySelector('#image-dialog');
function openDialog(dialog) { dialog.showModal(); document.body.classList.add('dialog-open'); }
function bindDialog(dialog, closeSelector) {
  if (!dialog) return;
  dialog.querySelector(closeSelector).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
}
bindDialog(projectDialog, '[data-dialog-close]');
bindDialog(imageDialog, '[data-image-close]');
document.querySelectorAll('[data-open-project]').forEach(button => button.addEventListener('click', () => {
  const data = button.closest('.project-card').dataset;
  const image = projectDialog.querySelector('[data-dialog-image]');
  image.hidden = !data.image;
  if (data.image) image.src = data.image; else image.removeAttribute('src');
  image.alt = data.title;
  projectDialog.querySelector('[data-dialog-placeholder]').hidden = Boolean(data.image);
  for (const field of ['title', 'summary', 'impact']) projectDialog.querySelector(`[data-dialog-${field}]`).textContent = data[field];
  projectDialog.querySelector('[data-dialog-category]').textContent = data.categoryLabel;
  projectDialog.querySelector('[data-dialog-detail]').href = data.detailUrl;
  const stack = projectDialog.querySelector('[data-dialog-stack-list]');
  stack.replaceChildren();
  JSON.parse(data.stack).forEach(tech => { const item = document.createElement('span'); item.textContent = tech; stack.append(item); });
  openDialog(projectDialog);
}));
document.querySelectorAll('[data-image-preview]').forEach(button => button.addEventListener('click', () => {
  const image = imageDialog.querySelector('[data-full-image]');
  image.src = button.dataset.image;
  image.alt = button.dataset.alt;
  openDialog(imageDialog);
}));

let revealObserver;
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); revealObserver.unobserve(entry.target); }
  }), { threshold: .08 });
  document.querySelectorAll('[data-reveal]').forEach(el => {
    if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('will-reveal');
    revealObserver.observe(el);
  });
}
window.addEventListener('pagehide', () => revealObserver?.disconnect());
window.addEventListener('pageshow', event => {
  if (event.persisted) document.querySelectorAll('.will-reveal').forEach(el => el.classList.add('is-revealed'));
});
