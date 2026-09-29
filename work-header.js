const workMenuButton = document.querySelector('.work-menu-toggle');
const workMenu = document.querySelector('#work-nav');
if (workMenuButton && workMenu) {
  workMenuButton.addEventListener('click', () => {
    const open = workMenuButton.getAttribute('aria-expanded') !== 'true';
    workMenuButton.setAttribute('aria-expanded', String(open));
    workMenuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    workMenu.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && workMenuButton.getAttribute('aria-expanded') === 'true') {
      workMenuButton.click();
      workMenuButton.focus();
    }
  });
}
