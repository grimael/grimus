document.addEventListener("DOMContentLoaded", function () {
  // === MENU HAMBURGER ===
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  // === VALIDATION DU FORMULAIRE ===
  const form = document.getElementById("contact-form");
  const nom = document.getElementById("nom");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  const nomError = document.getElementById("nom-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  const formMessage = document.getElementById("form-message");

  form.addEventListener("submit", function (e) {
    let valid = true;

    // Réinitialiser les messages d’erreur
    nomError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formMessage.textContent = "";
    formMessage.classList.remove("error", "success");

    // Validation du nom
    if (nom.value.trim() === "") {
      nomError.textContent = "Veuillez entrer votre nom.";
      valid = false;
    }

    // Validation de l'email
    if (email.value.trim() === "") {
      emailError.textContent = "Veuillez entrer votre email.";
      valid = false;
    } else if (!email.value.includes("@") || !email.value.includes(".")) {
      emailError.textContent = "Email invalide.";
      valid = false;
    }

    // Validation du message
    if (message.value.trim() === "") {
      messageError.textContent = "Veuillez entrer votre message.";
      valid = false;
    }

    if (!valid) {
      e.preventDefault(); // Empêche l’envoi du formulaire si erreurs
      formMessage.textContent = "Veuillez corriger les erreurs ci-dessus.";
      formMessage.classList.add("error");
    } else {
      formMessage.textContent = "Message en cours d'envoi...";
      formMessage.classList.add("success");
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const navItems = navLinks.querySelectorAll("a");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    // Cacher le menu quand un lien est cliqué (UX mobile)
    navItems.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }
});

// === MENU HAMBURGER RESPONSIVE ===
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  // Afficher/Masquer le menu au clic sur hamburger
  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  // Cacher le menu au clic sur un lien
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // === SYSTEME DE FILTRAGE DES PROJETS ===
  const buttons = document.querySelectorAll('.category-btn');
  const projectCards = document.querySelectorAll('.project-card');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      buttons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const selectedCategory = this.getAttribute('data-category');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        card.style.display =
          selectedCategory === 'all' || cardCategory === selectedCategory
            ? 'block'
            : 'none';
      });
    });
  });

  // === CITATIONS ANIMÉES (optionnel, si utilisé sur la page d'accueil) ===
  const quotes = [
    "« Explorer, comprendre, visualiser. »",
    "« Les données ont une voix, je leur donne un visage. »",
    "« Rendre l’invisible visible. »",
    "« Data is the new art. »"
  ];

  let current = 0;
  const quoteEl = document.getElementById("quote");

  if (quoteEl) {
    function showNextQuote() {
      current = (current + 1) % quotes.length;
      quoteEl.classList.remove("fade-in");
      void quoteEl.offsetWidth; // relance l'animation
      quoteEl.textContent = quotes[current];
      quoteEl.classList.add("fade-in");
    }

    setInterval(showNextQuote, 4000);
  }
});

