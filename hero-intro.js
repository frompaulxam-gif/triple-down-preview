(() => {
  const root = document.documentElement;
  const hero = document.getElementById('td-hero');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const accents = new Set(['bodoni', 'dm-serif', 'fraunces', 'lora']);
  const accent = new URLSearchParams(location.search).get('accent');
  if (accents.has(accent)) root.dataset.tdAccent = accent;
  let brand;
  const finish = () => {
    root.classList.remove('td-intro-pending', 'td-intro-running', 'td-intro-paused');
    brand?.remove();
    if (hero) hero.dataset.introState = 'complete';
  };
  if (!hero || reduce.matches || scrollY > 24) return finish();

  const makeBrand = () => {
    const headerBrand = [...document.querySelectorAll('#header .td-site-logo-link')]
      .find(el => el.getBoundingClientRect().width > 0);
    if (!headerBrand) return;
    const target = headerBrand.getBoundingClientRect();
    brand = document.createElement('div');
    brand.className = 'td-hero-brand-reveal';
    brand.setAttribute('aria-hidden', 'true');
    brand.innerHTML = '<img class="td-site-logo" src="assets/triple-down-logo-vector.svg" alt=""><span class="td-site-wordmark"><span>TRIPLE DOWN</span><span>GROUP</span></span>';
    brand.style.left = `${target.left}px`;
    brand.style.top = `${target.top}px`;
    document.body.append(brand);
    const rect = brand.getBoundingClientRect();
    const width = rect.width || target.width;
    const height = rect.height || target.height;
    const markWidth = brand.querySelector('.td-site-logo').getBoundingClientRect().width;
    const scale = Math.min(2.25, innerWidth * .86 / width);
    const groupDx = innerWidth / 2 - target.left - width / 2;
    brand.style.setProperty('--td-brand-mark-dx', `${groupDx + scale * (width - markWidth) / 2}px`);
    brand.style.setProperty('--td-brand-group-dx', `${groupDx}px`);
    brand.style.setProperty('--td-brand-dy', `${innerHeight / 2 - target.top - height / 2}px`);
    brand.style.setProperty('--td-brand-scale', String(scale));
  };
  const ready = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.race([ready, new Promise(resolve => setTimeout(resolve, 1200))]).then(() => {
    if (reduce.matches || scrollY > 24) return finish();
    makeBrand();
    hero.dataset.introState = 'running';
    root.classList.add('td-intro-running');
    if (document.hidden) root.classList.add('td-intro-paused');
  });
  hero.querySelector('.td-statement-line:last-child').addEventListener('animationend', finish, { once: true });
  document.addEventListener('visibilitychange', () => {
    root.classList.toggle('td-intro-paused', document.hidden && hero.dataset.introState === 'running');
  });
  addEventListener('resize', () => { if (hero.dataset.introState === 'running') finish(); }, { passive: true });
  reduce.addEventListener('change', () => { if (reduce.matches) finish(); });
})();
