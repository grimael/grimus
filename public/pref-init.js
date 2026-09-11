(function () {
  // GitHub Pages cannot send frame-ancestors / X-Frame-Options headers:
  // refuse to render inside a frame (clickjacking protection).
  if (window.top !== window.self) {
    document.documentElement.hidden = true;
    try {
      window.top.location.replace(window.self.location.href);
    } catch (e) {
      /* top navigation blocked: the page simply stays hidden */
    }
  }

  try {
    var theme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    /* localStorage unavailable: keep defaults from the HTML */
  }
})();
