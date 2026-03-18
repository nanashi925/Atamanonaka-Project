const characters = [...document.querySelectorAll('.character')];
const aboutToggle = document.querySelector('[data-about-toggle]');
const aboutPanel = document.getElementById('project-about');

characters.forEach((character) => {
  character.addEventListener('click', () => {
    const isActive = character.classList.contains('is-active');

    characters.forEach((item) => {
      item.classList.remove('is-active');
      item.setAttribute('aria-expanded', 'false');
    });

    if (!isActive) {
      character.classList.add('is-active');
      character.setAttribute('aria-expanded', 'true');
    }
  });
});

if (aboutToggle && aboutPanel) {
  aboutToggle.addEventListener('click', () => {
    const isExpanded = aboutToggle.getAttribute('aria-expanded') === 'true';

    aboutToggle.setAttribute('aria-expanded', String(!isExpanded));
    aboutPanel.hidden = isExpanded;
  });
}
