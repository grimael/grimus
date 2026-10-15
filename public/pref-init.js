(function () {
  document.documentElement.classList.remove('no-js');
  if (window.top !== window.self) {
    document.documentElement.hidden = true;
    try { window.top.location.replace(window.self.location.href); } catch { /* Frame stays hidden. */ }
  }
  try {
    document.documentElement.dataset.theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    localStorage.removeItem('language');
  } catch { /* Retain the server-rendered light theme. */ }
})();
