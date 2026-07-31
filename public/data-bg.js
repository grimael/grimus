(function () {
  var canvas = document.getElementById('data-bg');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var width = 0;
  var height = 0;
  var particles = [];
  var packets = [];
  var linkDist = 150;
  var accentColor = '124, 108, 246';
  var accent2Color = '167, 139, 250';
  var running = false;

  function hexToRgbString(hex) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
    if (!m) return null;
    return parseInt(m[1], 16) + ', ' + parseInt(m[2], 16) + ', ' + parseInt(m[3], 16);
  }

  function readColors() {
    var styles = getComputedStyle(document.documentElement);
    accentColor = hexToRgbString(styles.getPropertyValue('--accent')) || accentColor;
    accent2Color = hexToRgbString(styles.getPropertyValue('--accent-2')) || accent2Color;
  }

  function initParticles() {
    var area = width * height;
    var count = Math.max(20, Math.min(65, Math.round(area / 20000)));
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 1.2 + Math.random() * 1.5
      });
    }
    packets = [];
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  function frame() {
    ctx.clearRect(0, 0, width, height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }

    ctx.lineWidth = 1;
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var a = particles[i];
        var b = particles[j];
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < linkDist) {
          var alpha = (1 - dist / linkDist) * 0.16;
          ctx.strokeStyle = 'rgba(' + accentColor + ', ' + alpha.toFixed(3) + ')';
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();

          if (!reduceMotion && packets.length < 14 && Math.random() < 0.0008) {
            packets.push({ a: a, b: b, t: 0 });
          }
        }
      }
    }

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.fillStyle = 'rgba(' + accentColor + ', 0.55)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    for (var i = packets.length - 1; i >= 0; i--) {
      var pk = packets[i];
      pk.t += 0.016;
      if (pk.t >= 1) {
        packets.splice(i, 1);
        continue;
      }
      var x = pk.a.x + (pk.b.x - pk.a.x) * pk.t;
      var y = pk.a.y + (pk.b.y - pk.a.y) * pk.t;
      var glow = Math.sin(pk.t * Math.PI);
      ctx.fillStyle = 'rgba(' + accent2Color + ', ' + (0.55 + glow * 0.4).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(x, y, 1.8 + glow * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!reduceMotion) requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    readColors();
    resize();
    frame();
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  window.__dataBgRefresh = readColors;

  start();
})();
