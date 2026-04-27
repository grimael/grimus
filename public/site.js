/* Word-reveal animation for hero h1 */
const heroH1 = document.querySelector('.hero h1');
if (heroH1) {
  const words = heroH1.textContent.trim().split(/\s+/);
  heroH1.innerHTML = '';
  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.className = 'hero-word';
    span.textContent = word;
    span.style.setProperty('--wi', i);
    heroH1.appendChild(span);
    if (i < words.length - 1) heroH1.appendChild(document.createTextNode(' '));
  });
}

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('[data-nav]');

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
});

const revealItems = document.querySelectorAll('[data-reveal], .project-card');
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

const light = document.querySelector('.cursor-light');
window.addEventListener('pointermove', (event) => {
  light?.style.setProperty('--x', `${event.clientX}px`);
  light?.style.setProperty('--y', `${event.clientY}px`);
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
