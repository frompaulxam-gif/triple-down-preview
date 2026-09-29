document.querySelectorAll('.services-b').forEach((gallery) => {
  const choices = [...gallery.querySelectorAll('.stage-choice')];
  const panels = [...gallery.querySelectorAll('.stage-panel')];

  function select(index) {
    choices.forEach((choice, i) => {
      const active = i === index;
      choice.classList.toggle('is-active', active);
      choice.setAttribute('aria-pressed', String(active));
    });
    panels.forEach((panel, i) => panel.classList.toggle('is-active', i === index));
  }

  choices.forEach((choice, index) => choice.addEventListener('click', () => select(index)));
});
