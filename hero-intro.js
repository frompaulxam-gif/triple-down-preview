(() => {
  const root = document.documentElement;
  const hero = document.getElementById('td-hero');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const finish = () => {
    root.classList.remove('td-intro-pending', 'td-intro-running', 'td-intro-paused');
    if (hero) hero.dataset.introState = 'complete';
  };
  if (!hero || reduce.matches) return finish();
  const ready = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.race([ready, new Promise(resolve => setTimeout(resolve, 1200))]).then(() => {
    if (reduce.matches) return finish();
    hero.dataset.introState = 'running';
    root.classList.add('td-intro-running');
    if (document.hidden) root.classList.add('td-intro-paused');
  });
  hero.querySelector('.td-statement-line:last-child').addEventListener('animationend', finish, { once: true });
  document.addEventListener('visibilitychange', () => {
    root.classList.toggle('td-intro-paused', document.hidden && hero.dataset.introState === 'running');
  });
  reduce.addEventListener('change', () => { if (reduce.matches) finish(); });
})();
