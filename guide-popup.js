(() => {
  const KEY = 'tdg-guide-popup-dismissed-v1';
  const params = new URLSearchParams(location.search);
  const force = params.get('popup') === '1';
  try { if (!force && sessionStorage.getItem(KEY)) return; } catch (_) {}

  const overlay = document.createElement('div');
  overlay.className = 'td-guide-popup';
  overlay.hidden = true;
  overlay.innerHTML = `
    <section class="td-guide-popup__dialog" role="dialog" aria-modal="true" aria-labelledby="td-guide-popup-title" aria-describedby="td-guide-popup-copy">
      <button class="td-guide-popup__close" type="button" aria-label="Close guide popup">&times;</button>
      <img class="td-guide-popup__image" src="assets/site/3c4a3e4e9c5c.jpg" alt="Crowd under purple lights at a live event">
      <div class="td-guide-popup__body">
        <p class="td-guide-popup__eyebrow">Triple Down Group / Start here</p>
        <h2 class="td-guide-popup__title" id="td-guide-popup-title">Serious about growth?</h2>
        <p class="td-guide-popup__copy" id="td-guide-popup-copy">Get the 6-week marketing guide. A practical starting point for your next launch, event or campaign.</p>
        <form class="td-guide-popup__form" novalidate>
          <label class="td-guide-popup__field" for="td-guide-popup-email">Email*</label>
          <input class="td-guide-popup__input" id="td-guide-popup-email" type="email" autocomplete="email" required maxlength="254" aria-describedby="td-guide-popup-error">
          <button class="td-guide-popup__submit" type="submit">Submit</button>
          <p class="td-guide-popup__error" id="td-guide-popup-error" hidden>Please enter a valid email address.</p>
        </form>
        <div class="td-guide-popup__success" hidden>
          <p>Your sample guide is ready.</p>
          <a class="td-guide-popup__action" href="assets/triple-down-marketing-guide-sample.pdf" download="triple-down-marketing-guide-sample.pdf"><span>Download the guide</span><span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>`;
  document.body.append(overlay);

  const dialog = overlay.querySelector('[role="dialog"]');
  const closeButton = overlay.querySelector('.td-guide-popup__close');
  const form = overlay.querySelector('.td-guide-popup__form');
  const email = overlay.querySelector('.td-guide-popup__input');
  const error = overlay.querySelector('.td-guide-popup__error');
  const success = overlay.querySelector('.td-guide-popup__success');
  const action = overlay.querySelector('.td-guide-popup__action');
  let previousFocus;

  const remember = () => { try { sessionStorage.setItem(KEY, '1'); } catch (_) {} };
  const close = () => {
    if (overlay.hidden) return;
    overlay.hidden = true;
    document.documentElement.classList.remove('td-guide-popup-open');
    remember();
    if (previousFocus && previousFocus.isConnected) previousFocus.focus();
  };
  const open = () => {
    if (document.hidden) {
      document.addEventListener('visibilitychange', () => { if (!document.hidden) open(); }, { once: true });
      return;
    }
    previousFocus = document.activeElement;
    overlay.hidden = false;
    document.documentElement.classList.add('td-guide-popup-open');
    closeButton.focus();
  };

  closeButton.addEventListener('click', close);
  overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
  action.addEventListener('click', remember);
  form.addEventListener('submit', event => {
    event.preventDefault();
    email.value = email.value.trim();
    if (!email.checkValidity()) {
      email.setAttribute('aria-invalid', 'true');
      error.hidden = false;
      email.focus();
      return;
    }
    email.value = '';
    email.removeAttribute('aria-invalid');
    error.hidden = true;
    form.hidden = true;
    success.hidden = false;
    remember();
    action.focus();
  });
  email.addEventListener('input', () => { email.removeAttribute('aria-invalid'); error.hidden = true; });
  overlay.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    const focusable = Array.from(dialog.querySelectorAll('button,input,a[href]')).filter(element => element.getClientRects().length);
    const index = focusable.indexOf(document.activeElement);
    if (event.shiftKey && index <= 0) { event.preventDefault(); focusable[focusable.length - 1].focus(); }
    else if (!event.shiftKey && index >= focusable.length - 1) { event.preventDefault(); closeButton.focus(); }
  });
  window.setTimeout(open, force ? 100 : 12000);
})();
