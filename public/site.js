const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('[data-nav]');

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
});

document.querySelectorAll('.logo-strip span, .skill-logo-grid article, .social-card').forEach((container) => {
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

document.querySelectorAll('.project-card.private .project-media').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
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
