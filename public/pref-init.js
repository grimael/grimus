(function () {
  try {
    var lang = localStorage.getItem('lang') === 'en' ? 'en' : 'fr';
    var theme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    /* localStorage unavailable: keep defaults from the HTML */
  }
})();
