import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function revealPage(page: import('@playwright/test').Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise(resolve => setTimeout(resolve, 30));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    await document.fonts.ready;
  });
  await page.locator('main img').evaluateAll(async images => {
    await Promise.all(images.map(async image => {
      const img = image as HTMLImageElement;
      img.loading = 'eager';
      await img.decode().catch(() => undefined);
    }));
  });
  await page.waitForFunction(() => document.getAnimations().filter(animation => animation.effect?.getTiming().iterations !== Infinity).every(animation => animation.playState === 'finished'));
}

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`homepage layout and assets at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await revealPage(page);
    await expect(page.locator('h1')).toContainText('Des données');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const broken = await page.locator('main img').evaluateAll(images => images.filter(image => !(image as HTMLImageElement).complete || (image as HTMLImageElement).naturalWidth === 0).map(image => (image as HTMLImageElement).src));
    expect(broken).toEqual([]);
    await expect(page.locator('.floating-stats, .stat-card, .code-note, .portrait-note')).toHaveCount(0);
    const iconOffsets = await page.locator('.footer-links a').evaluateAll(links => links.map(link => {
      const frame = link.getBoundingClientRect();
      const icon = link.querySelector('img, svg')!.getBoundingClientRect();
      return [Math.abs(frame.x + frame.width / 2 - icon.x - icon.width / 2), Math.abs(frame.y + frame.height / 2 - icon.y - icon.height / 2)];
    }));
    iconOffsets.forEach(offset => offset.forEach(value => expect(value).toBeLessThan(.6)));
    if (width >= 700) {
      const description = await page.locator('.hero-description').boundingBox();
      const portrait = await page.locator('.hero-portrait').boundingBox();
      expect(description!.x + description!.width).toBeLessThanOrEqual(portrait!.x + 1);
    }
    await page.screenshot({ path: `qa/home-${width}.png`, fullPage: true, animations: 'disabled' });
    expect(errors).toEqual([]);
  });
}

test('French pages, simplified layout and metadata', async ({ request }) => {
  const paths: string[] = [];
  async function walk(folder: string, path = '') {
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      if (entry.isDirectory()) await walk(join(folder, entry.name), `${path}/${entry.name}`);
      else if (entry.name === 'index.html') paths.push(`${path}/`);
    }
  }
  await walk('dist');
  expect(paths).toHaveLength(30);
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const html = await response.text();
    expect(html).toContain('lang="fr"');
    expect(html).toContain('<title>grimael</title>');
    expect(html).not.toContain('hreflang=');
    expect(html).not.toContain('href="/en/');
    expect(html).not.toMatch(/language-switch|data-language|hero-identity|contact-signature|contact-band|footer-top/);
    expect(html).not.toContain('UNE IDÉE · UN PROJET · UNE COLLABORATION');
    expect(html).not.toContain('Capture à venir');
    expect(html).toContain('Michaël S. <span>GRIMA</span>');
    expect(html).toContain('rel="canonical"');
    expect(html).toContain('property="og:image"');
    expect(html).not.toMatch(/Télécharger.*CV|Download.*(?:CV|résumé)/i);
    for (const href of [...html.matchAll(/href="(\/[^"#?]*\/)(?:[?#][^"]*)?"/g)].map(match => match[1])) expect((await request.get(href)).status(), href).toBe(200);
  }
  const sitemap = await request.get('/sitemap.xml');
  const xml = await sitemap.text();
  expect(xml.match(/<loc>/g)).toHaveLength(30);
  expect(xml).not.toContain('/en/');
  expect((await request.get('/en/')).status()).toBe(404);
  expect((await request.get('/en/projects/rh-ia-pro/')).status()).toBe(404);
});

test('data favicon is local, versioned and has no external content', async ({ page, request }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('grimael');
  const favicon = page.locator('link[rel="icon"]');
  await expect(favicon).toHaveAttribute('href', '/favicon.svg?v=data-1');
  const response = await request.get((await favicon.getAttribute('href'))!);
  expect(response.status()).toBe(200);
  const svg = await response.text();
  expect(svg).toContain('grimael - data');
  expect(svg).not.toMatch(/<script|<image|<foreignObject|href=/i);
});

test('WhatsApp contact is explicit and does not load a third-party widget', async ({ page, context }) => {
  const requests: string[] = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('/contact/');
  await revealPage(page);
  const contactLinks = page.locator('.contact-socials a');
  await expect(contactLinks).toHaveCount(4);
  expect(await page.locator('.contact-socials').innerText()).toBe('');
  for (const link of await contactLinks.all()) {
    await expect(link).toHaveAttribute('aria-label', /^(Email|LinkedIn|GitHub|WhatsApp)$/);
    await expect(link).toHaveAttribute('title', (await link.getAttribute('aria-label'))!);
    await expect(link.locator('img')).toHaveCount(1);
  }
  const whatsapp = page.getByRole('link', { name: /WhatsApp/ });
  await expect(whatsapp.locator('img')).toHaveAttribute('src', '/assets/logos/whatsapp.svg');
  await expect(whatsapp).toHaveAttribute('href', 'https://wa.me/2250718283603');
  await expect(whatsapp).toHaveAttribute('target', '_blank');
  await expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer nofollow');
  await expect(whatsapp).toHaveAttribute('referrerpolicy', 'no-referrer');
  await expect(page.locator('body')).not.toContainText('0718283603');
  await expect(page.locator('[itemprop="telephone"], meta[content*="0718283603"]')).toHaveCount(0);
  expect(requests.filter(url => ['wa.me', 'whatsapp.com'].some(host => new URL(url).hostname === host || new URL(url).hostname.endsWith(`.${host}`)))).toEqual([]);
  const externalRequests: string[] = [];
  await context.route('https://wa.me/**', async route => {
    externalRequests.push(route.request().url());
    expect(route.request().headers()['referer']).toBeUndefined();
    await route.fulfill({ contentType: 'text/html', body: '<title>WhatsApp test</title>' });
  });
  const popupPromise = page.waitForEvent('popup');
  await whatsapp.click();
  const popup = await popupPromise;
  await popup.waitForLoadState();
  expect(externalRequests).toEqual(['https://wa.me/2250718283603']);
  expect(await popup.evaluate(() => window.opener === null)).toBe(true);
  await popup.close();
  for (const width of [360, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const dark of [false, true]) {
      await page.locator('[data-theme-toggle]').setChecked(dark);
      await revealPage(page);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `qa/contact-whatsapp-${width}-${dark ? 'dark' : 'light'}.png`, fullPage: true, animations: 'disabled' });
    }
  }
});

test('filters, search, empty state and preview preserve context', async ({ page }) => {
  await page.goto('/projects/');
  await expect(page.locator('.project-card:visible')).toHaveCount(25);
  await page.locator('[data-filter="IA"]').click();
  await expect(page.locator('.project-card:visible')).toHaveCount(5);
  await page.locator('[data-project-search]').fill('RH');
  await expect(page.locator('.project-card:visible')).toHaveCount(1);
  await page.reload();
  await expect(page).toHaveURL(/\/projects\/.*category=IA.*q=RH/);
  await expect(page.locator('.project-card:visible')).toHaveCount(1);
  await page.locator('[data-open-project]:visible').click();
  await expect(page.locator('#project-dialog')).toBeVisible();
  await expect(page.locator('#dialog-title')).toHaveText('RH IA Pro');
  await page.keyboard.press('Escape');
  await expect(page.locator('#project-dialog')).not.toBeVisible();
  await page.locator('[data-project-search]').fill('zzznomatch');
  await expect(page.locator('[data-empty-state]')).toBeVisible();
  await page.locator('[data-empty-state] [data-reset-filters]').click();
  await expect(page.locator('.project-card:visible')).toHaveCount(25);
});

test('mobile navigation, theme and detail image preview', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('[data-menu-toggle]').click();
  await expect(page.locator('[data-menu-toggle]')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('main')).toHaveAttribute('inert', '');
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-menu-toggle]')).toHaveAttribute('aria-expanded', 'false');
  await page.locator('[data-theme-toggle]').check();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.locator('[data-menu-toggle]').click();
  await page.locator('[data-nav] a').nth(3).click();
  await expect(page).toHaveURL('/projects/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.locator('.project-body h3 a').first().click();
  await page.locator('[data-image-preview]').click();
  await expect(page.locator('#image-dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#image-dialog')).not.toBeVisible();
  await page.screenshot({ path: 'qa/detail-dark-mobile.png', fullPage: true, animations: 'disabled' });
});

for (const path of ['/', '/about/', '/expertise/', '/projects/', '/contact/', '/projects/opendataviz-observatoire-afrique/']) {
  test(`accessibility ${path}`, async ({ page }) => {
    await page.goto(path);
    await revealPage(page);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]);
  });
}

test('French mobile and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  await revealPage(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator('.hero-copy h1')).toContainText('Des données');
  expect(await page.locator('.technology-track').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  expect(await page.locator('.organizations-track').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  await page.screenshot({ path: 'qa/home-reduced-motion-360.png', fullPage: true, animations: 'disabled' });
  await page.locator('[data-theme-toggle]').check();
  await page.screenshot({ path: 'qa/home-dark-360.png', fullPage: true, animations: 'disabled' });
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]);
});

test('secondary pages remain usable at mobile and tablet widths', async ({ page }) => {
  test.setTimeout(90000);
  for (const width of [360, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/about/', '/expertise/', '/projects/', '/contact/', '/projects/rh-ia-pro/', '/projects/doc-ai/']) {
      await page.goto(path);
      await revealPage(page);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} at ${width}`).toBe(true);
      await expect(page.locator('h1')).toBeVisible();
      if (path.startsWith('/projects/') && path !== '/projects/') {
        await expect(page.locator('.intro-portrait')).toHaveCount(0);
        if (path === '/projects/rh-ia-pro/') await expect(page.locator('.intro-project-media > img')).toHaveAttribute('src', await page.locator('.case-image img').getAttribute('src') as string);
        else await expect(page.locator('.intro-project-placeholder')).toBeVisible();
      } else await expect(page.locator('.intro-portrait img')).toHaveAttribute('src', '/assets/Images/optimized/grima-editorial.webp');
      if (path === '/about/') await expect(page.locator('h1')).not.toContainText('GRIMA');
      if (path === '/contact/') await expect(page.locator('.intro-copy a.btn')).toHaveCount(0);
      if (width === 360 && path.startsWith('/projects/') && path !== '/projects/') await page.screenshot({ path: `qa/${path.split('/')[2]}-360.png`, fullPage: true, animations: 'disabled' });
      if (width === 360 && ['/about/', '/expertise/', '/projects/', '/contact/'].includes(path)) await page.screenshot({ path: `qa/${path.split('/')[1]}-360.png`, fullPage: true, animations: 'disabled' });
    }
  }
});

test('old English preferences do not redirect visitors', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('language', 'en'));
  await page.goto('/');
  await expect(page).toHaveURL('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.locator('.site-header .wordmark')).toHaveText('Michaël S. GRIMA');
  await expect(page.locator('[data-language]')).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('language'))).toBeNull();
  await page.reload();
  await expect(page).toHaveURL('/');
});

test('home preserves the black and white portrait in both themes', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await revealPage(page);
  await expect(page.locator('.hero-portrait img')).toHaveAttribute('src', '/assets/Images/optimized/grima-editorial.webp');
  expect(await page.locator('.hero-portrait img').evaluate(el => getComputedStyle(el).maskImage)).toBe('none');
  expect(await page.locator('.hero-section').evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgb(0, 0, 0)');
  await page.locator('[data-theme-toggle]').check();
  await page.screenshot({ path: 'qa/home-dark-1440.png', fullPage: true, animations: 'disabled' });
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]);
});

test('organization logos scroll opposite to technologies without captions', async ({ page }) => {
  await page.goto('/');
  await revealPage(page);
  await expect(page.locator('.organizations-set').first().locator('img')).toHaveCount(4);
  await expect(page.locator('.organizations-set').first().locator('img').last()).toHaveAttribute('src', /METFPA/);
  await expect(page.locator('.organization-item strong, .organization-item small')).toHaveCount(0);
  expect(await page.locator('.technology-track').evaluate(el => getComputedStyle(el).animationDirection)).toBe('normal');
  expect(await page.locator('.organizations-track').evaluate(el => getComputedStyle(el).animationDirection)).toBe('reverse');
  await page.locator('.organizations-window').focus();
  expect(await page.locator('.organizations-track').evaluate(el => getComputedStyle(el).animationPlayState)).toBe('paused');
  const setWidth = await page.locator('.organizations-set').first().evaluate(el => el.getBoundingClientRect().width);
  const windowWidth = await page.locator('.organizations-window').evaluate(el => el.getBoundingClientRect().width);
  expect(setWidth).toBeGreaterThanOrEqual(windowWidth);
});

test('expertise retains only essential notions and tools', async ({ page }) => {
  await page.goto('/expertise/');
  await expect(page.locator('.pillar-card')).toHaveCount(6);
  await expect(page.locator('.pillar-card h2')).toContainText(['Statistique & Économétrie', 'Analyse de données', 'Data Engineering', 'Data Science & Machine Learning', 'BI & Reporting', 'Développement web']);
  for (const card of await page.locator('.pillar-card').all()) {
    expect(await card.locator('.pillar-skills li').count()).toBeLessThanOrEqual(5);
    expect(await card.locator('.tool-chips li').count()).toBeGreaterThan(0);
  }
  await expect(page.locator('main')).not.toContainText('Gestion de projets data');
  await expect(page.locator('main')).not.toContainText('Analyse de corrélation');
});

test('project details use their own screenshot or a neutral fallback', async ({ page }) => {
  await page.goto('/projects/');
  const projects = await page.locator('.project-card').evaluateAll(cards => cards.map(card => ({ href: (card as HTMLElement).dataset.detailUrl!, image: (card as HTMLElement).dataset.image! })));
  for (const project of projects) {
    await page.goto(project.href);
    await expect(page.locator('.intro-portrait')).toHaveCount(0);
    await expect(page.locator('main img[src*="profil-"], main img[src*="grima-editorial"]')).toHaveCount(0);
    if (project.image) await expect(page.locator('.intro-project-media > img')).toHaveAttribute('src', project.image);
    else await expect(page.locator('.intro-project-placeholder')).toBeVisible();
    if (project.href.includes('opendataviz')) {
      await revealPage(page);
      await page.screenshot({ path: 'qa/project-screenshot-desktop.png', fullPage: true, animations: 'disabled' });
    }
  }
});

test('production pages enforce local resources, safe links and valid metadata', async ({ page, request }) => {
  test.setTimeout(120000);
  const files: string[] = [];
  async function walk(folder: string) {
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      const file = join(folder, entry.name);
      if (entry.isDirectory()) await walk(file); else files.push(file);
    }
  }
  await walk('dist');
  const htmlFiles = files.filter(file => file.endsWith('.html'));
  const documents = await Promise.all(htmlFiles.map(async file => ({ file, html: await readFile(file, 'utf8') })));
  const audit = await page.evaluate(documents => documents.map(({ file, html }) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const csp = doc.querySelector('meta[http-equiv="Content-Security-Policy"]')?.getAttribute('content') ?? '';
    const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';
    return {
      file, csp, canonical,
      headings: doc.querySelectorAll('h1').length,
      inline: doc.querySelectorAll('script:not([src]), style, [style], [onclick], iframe, form').length,
      unsafeLinks: [...doc.querySelectorAll<HTMLAnchorElement>('a[href]')].filter(link => {
        const href = link.getAttribute('href')!;
        const external = /^https?:/.test(href);
        return /^(?:javascript|data|vbscript):/i.test(href) || (external && link.target === '_blank' && (!link.relList.contains('noopener') || !link.relList.contains('noreferrer')));
      }).map(link => link.getAttribute('href')),
      resources: [...doc.querySelectorAll('script[src], img[src], link[rel="stylesheet"], link[rel="icon"]')].map(element => element.getAttribute('src') ?? element.getAttribute('href')!),
      personImage: doc.querySelector('meta[itemprop="image"]')?.getAttribute('content') ?? '',
      ogImageAlt: doc.querySelector('meta[property="og:image:alt"]')?.getAttribute('content') ?? '',
      ogImage: doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? ''
    };
  }), documents);
  const resources = new Set<string>();
  expect(audit).toHaveLength(30);
  for (const result of audit) {
    expect(result.headings, result.file).toBe(1);
    expect(result.inline, result.file).toBe(0);
    expect(result.unsafeLinks, result.file).toEqual([]);
    for (const directive of ["default-src 'self'", "script-src 'self'", "style-src 'self'", "font-src 'self'", "object-src 'none'", "frame-src 'none'", "form-action 'none'", "require-trusted-types-for 'script'", "trusted-types 'none'"]) expect(result.csp, result.file).toContain(directive);
    expect(result.csp).not.toMatch(/unsafe-inline|unsafe-eval|https?:|data:/);
    expect(result.canonical).toMatch(/^https:\/\/grimael\.dev\//);
    expect(result.ogImage).toMatch(/^https:\/\/grimael\.dev\//);
    expect(result.personImage).toBe('https://grimael.dev/assets/Images/optimized/grima-editorial.webp');
    expect(result.ogImageAlt).toMatch(/^(Portrait de Michaël|Capture du projet :)/);
    resources.add(new URL(result.ogImage).pathname);
    for (const resource of result.resources) {
      expect(resource, result.file).toMatch(/^\/(?!\/)/);
      resources.add(resource);
    }
  }
  for (const resource of resources) expect((await request.get(resource)).status(), resource).toBe(200);
  const filePaths = new Set(files.map(file => '/' + file.replaceAll('\\', '/').replace(/^dist\//, '')));
  for (const resource of resources) expect(filePaths.has(decodeURIComponent(new URL(resource, 'http://localhost').pathname)), `Case-sensitive asset path: ${resource}`).toBe(true);
  expect(files.some(file => /(?:\.env(?:\.|$)|\.map$|(?:^|[\\/])qa[\\/]|portrait-mask|data-bg\.js|instrument-serif|geist-variable|inter-(?:cyrillic|greek|vietnamese))/.test(file))).toBe(false);
  const svgFiles = files.filter(file => file.endsWith('.svg'));
  const svgDocuments = await Promise.all(svgFiles.map(async file => ({ file, svg: await readFile(file, 'utf8') })));
  const unsafeSvg = await page.evaluate(documents => documents.flatMap(({ file, svg }) => {
    const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
    const unsafe = doc.querySelector('parsererror, script, foreignObject, iframe') || [...doc.querySelectorAll('*')].some(element => [...element.attributes].some(attribute => /^on/i.test(attribute.name) || ((attribute.localName === 'href' || attribute.localName === 'src') && !attribute.value.startsWith('#'))));
    return unsafe ? [file] : [];
  }), svgDocuments);
  expect(unsafeSvg).toEqual([]);
});

test('production CSP blocks injected scripts and search remains plain text', async ({ page }) => {
  const payload = '<img src=x onerror="window.auditXss=true">';
  await page.goto(`/projects/?q=${encodeURIComponent(payload)}`);
  await expect(page.locator('[data-project-search]')).toHaveValue(payload);
  await expect(page.locator('[data-empty-state]')).toBeVisible();
  await expect(page.locator('img[src="x"], [onerror]')).toHaveCount(0);
  const blocked = await page.evaluate(() => {
    try {
      const script = document.createElement('script');
      script.textContent = 'window.auditXss=true';
      document.head.append(script);
      return false;
    } catch (error) { return error instanceof TypeError; }
  });
  expect(blocked).toBe(true);
  expect(await page.evaluate(() => (window as Window & { auditXss?: boolean }).auditXss)).toBeUndefined();
});

test('carousels cover their windows and can stay paused after focus leaves', async ({ page }) => {
  await page.goto('/');
  for (const width of [360, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const prefix of ['technology', 'organizations']) {
      const set = page.locator(`.${prefix}-set`).first();
      const window = page.locator(`.${prefix}-window`);
      expect(await set.evaluate(element => element.getBoundingClientRect().width), `${prefix} at ${width}`).toBeGreaterThanOrEqual(await window.evaluate(element => element.getBoundingClientRect().width));
    }
  }
  for (const prefix of ['technology', 'organizations']) {
    const toggle = page.locator(`[aria-controls="${prefix}-window"]`);
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await page.locator('.wordmark').focus();
    await page.mouse.move(0, 0);
    expect(await page.locator(`.${prefix}-track`).evaluate(element => getComputedStyle(element).animationPlayState)).toBe('paused');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await page.locator('.wordmark').focus();
    await page.mouse.move(0, 0);
    expect(await page.locator(`.${prefix}-track`).evaluate(element => getComputedStyle(element).animationPlayState)).toBe('running');
  }
});

test('mobile keyboard navigation and blocked storage remain usable', async ({ page }) => {
  await page.addInitScript(() => {
    for (const method of ['getItem', 'setItem', 'removeItem']) Object.defineProperty(Storage.prototype, method, { value: () => { throw new DOMException('Storage disabled', 'SecurityError'); } });
  });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('[data-theme-toggle]').check();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.locator('[data-menu-toggle]').click();
  await expect(page.locator('[data-nav] a').first()).toBeFocused();
  await page.locator('[data-menu-toggle]').focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('.wordmark')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('[data-menu-toggle]')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('main')).not.toHaveAttribute('inert', '');
  await expect(page.locator('[data-menu-toggle]')).toBeFocused();
  await page.locator('[data-menu-toggle]').click();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(page.locator('main')).not.toHaveAttribute('inert', '');
  expect(errors).toEqual([]);
});

test('core navigation and contact links work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 800 } });
  try {
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('[data-nav] a')).toHaveCount(5);
    for (const link of await page.locator('[data-nav] a').all()) await expect(link).toBeVisible();
    await expect(page.locator('.marquee-toggle').first()).not.toBeVisible();
    await page.locator('[data-nav] a[href="/projects/"]').click();
    await expect(page.locator('.project-card')).toHaveCount(25);
    await expect(page.locator('.catalog-toolbar')).not.toBeVisible();
    await page.locator('[data-nav] a[href="/contact/"]').click();
    await expect(page.locator('.contact-socials a')).toHaveCount(4);
    expect(await page.locator('.intro-copy').evaluate(element => getComputedStyle(element).opacity)).toBe('1');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: 'qa/contact-without-javascript.png', fullPage: true });
  } finally { await context.close(); }
});

test('home only requests local assets and has no significant initial layout shift', async ({ page }) => {
  await page.addInitScript(() => {
    const auditWindow = window as typeof window & { auditCls?: number };
    auditWindow.auditCls = 0;
    new PerformanceObserver(list => {
      for (const entry of list.getEntries() as (PerformanceEntry & { hadRecentInput: boolean; value: number })[]) {
        if (!entry.hadRecentInput) auditWindow.auditCls = (auditWindow.auditCls ?? 0) + entry.value;
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });
  const external: string[] = [];
  const failed: string[] = [];
  page.on('request', request => { if (new URL(request.url()).origin !== 'http://127.0.0.1:4322') external.push(request.url()); });
  page.on('requestfailed', request => failed.push(request.url()));
  await page.goto('/');
  await revealPage(page);
  expect(external).toEqual([]);
  expect(failed).toEqual([]);
  expect(await page.evaluate(() => [...document.fonts].filter(font => font.status === 'error').map(font => font.family))).toEqual([]);
  expect(await page.evaluate(() => (window as typeof window & { auditCls?: number }).auditCls)).toBeLessThan(.1);
});
