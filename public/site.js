const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('[data-nav]');

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
});

const revealItems = document.querySelectorAll('[data-reveal], .project-card');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const light = document.querySelector('.cursor-light');
window.addEventListener('pointermove', (event) => {
  light?.style.setProperty('--x', `${event.clientX}px`);
  light?.style.setProperty('--y', `${event.clientY}px`);
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

document.querySelectorAll('img.image-rotator[data-images]').forEach((image) => {
  const sources = image.dataset.images.split('|').filter(Boolean);

  if (sources.length < 2) return;

  let current = Math.max(0, sources.indexOf(image.getAttribute('src')));

  window.setInterval(() => {
    current = (current + 1) % sources.length;
    image.classList.add('is-swapping');

    window.setTimeout(() => {
      image.src = sources[current];
      image.classList.remove('is-swapping');
    }, 450);
  }, 4000);
});

const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card[data-category]');
const emptyState = document.querySelector('[data-empty-state]');

document.querySelectorAll('.project-card.private .project-media').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    let visible = 0;

    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));

    projectCards.forEach((card) => {
      const match = filter === 'Tous' || card.getAttribute('data-category') === filter;
      card.hidden = !match;
      card.classList.toggle('is-visible', match);
      if (match) visible += 1;
    });

    if (emptyState) {
      emptyState.hidden = visible > 0;
    }
  });
});
