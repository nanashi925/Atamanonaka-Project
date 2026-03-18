const characters = [...document.querySelectorAll('.character')];

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
