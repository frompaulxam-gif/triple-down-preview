(() => {
  const section = id => document.querySelector(`[data-section-id="${id}"]`);
  const aboutOriginal = section('699cebb961f58430e8d24847');
  const firstServiceOriginal = section('699ceb4c20c1829d7152ef4f');
  const serviceOriginals = [
    '699ceb4c20c1829d7152ef4f',
    '626ed4bda6ff595d5a888847',
    '66bf39dbf79041068a0d40dc',
    '626edbaa1b6c545dfb289258',
    '699d97a4c9befe6c42c97ac9',
  ].map(section);
  if (!aboutOriginal || !serviceOriginals.every(Boolean)) return;

  const questions = [
    ['Who we are', 'We are operators first. We’ve built venues, events, brands and communities from the ground up. We understand culture because we live inside it and growth because we’ve sustained it.'],
    ['Our approach', 'We start with structure. Before campaigns and creative, we look at foundations: revenue streams, margins, positioning, audience clarity and operational friction. Then we build the systems for growth.'],
    ['Who we work with', 'We work with hospitality venues, music and cultural spaces, food and drink brands, community-led businesses and experience-driven operators building something lasting.'],
  ];
  const services = [
    ['Brand & positioning', '1ad5504d4296.jpg'],
    ['Programming & experience', '33827fcc685f.jpg'],
    ['Growth & revenue', 'cd68a78ef967.jpg'],
    ['Spaces & infrastructure', '50c3211a026f.jpg'],
    ['Community & expansion', 'fa5275108959.jpg'],
  ];

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  const about = element('section');
  about.id = 'td-cinematic-about';
  about.setAttribute('aria-label', 'About Triple Down Group');
  const veil = element('div', 'td-cinematic-about__veil');
  veil.append(element('span', 'td-cinematic-about__eyebrow', 'TRIPLE DOWN GROUP / OUR POV'));
  const body = element('div', 'td-cinematic-about__body');
  body.append(element('h2', '', 'The questions behind the work.'));
  const answers = element('div', 'td-cinematic-about__questions');
  questions.forEach(([title, copy], index) => {
    const detail = element('details');
    if (index === 0) detail.open = true;
    const summary = element('summary', '', title);
    const icon = element('b');
    icon.setAttribute('aria-hidden', 'true');
    summary.append(icon);
    detail.append(summary, element('p', '', copy));
    answers.append(detail);
  });
  body.append(answers);
  veil.append(body);
  about.append(veil);

  const serviceSection = element('section');
  serviceSection.id = 'td-cinematic-services';
  serviceSection.setAttribute('aria-label', 'What we do');
  const stage = element('div', 'td-cinematic-stage');
  const choices = element('div', 'td-cinematic-choices');
  choices.setAttribute('aria-label', 'Explore what we do');
  const panels = [];
  const buttons = [];
  services.forEach(([title, file], index) => {
    const panel = element('div', `td-cinematic-stage__panel${index === 0 ? ' is-active' : ''}`);
    panel.style.setProperty('--td-chapter-photo', `url("${new URL(`assets/site/${file}`, document.baseURI)}")`);
    panel.append(element('span', 'td-cinematic-stage__eyebrow', 'WHAT WE DO'), element('h2', '', title));
    stage.append(panel);
    panels.push(panel);
    const button = element('button', `td-cinematic-choice${index === 0 ? ' is-active' : ''}`, title);
    button.type = 'button';
    button.setAttribute('aria-pressed', String(index === 0));
    button.addEventListener('click', () => {
      buttons.forEach((item, i) => {
        const selected = i === index;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-pressed', String(selected));
        panels[i].classList.toggle('is-active', selected);
      });
    });
    choices.append(button);
    buttons.push(button);
  });
  serviceSection.append(stage, choices);

  aboutOriginal.before(about);
  firstServiceOriginal.before(serviceSection);
  document.documentElement.classList.add('td-cinematic-ready');
})();
