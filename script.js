const characters = [...document.querySelectorAll('.character')];
const aboutToggle = document.querySelector('[data-about-toggle]');
const aboutPanel = document.getElementById('project-about');
const introOverlay = document.querySelector('[data-intro-overlay]');
const introButton = document.querySelector('[data-intro-button]');
const backgroundAudio = document.querySelector('[data-bg-audio]');
const TRANSITION_MS = 1300;

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

const revealSite = async () => {
  if (!introOverlay) {
    return;
  }

  document.body.classList.add('is-transitioning');

  if (backgroundAudio) {
    try {
      backgroundAudio.volume = 0.7;
      await backgroundAudio.play();
    } catch {
      // Safari等で再生条件を満たしても失敗する場合は、そのまま画面遷移だけ続行する
    }
  }

  window.setTimeout(() => {
    document.body.classList.remove('is-transitioning', 'is-locked');
    document.body.classList.add('is-revealed');
    introOverlay.setAttribute('aria-hidden', 'true');
  }, TRANSITION_MS);
};

if (introOverlay && introButton) {
  document.body.classList.add('is-locked');
  introOverlay.setAttribute('aria-hidden', 'false');
  introButton.addEventListener('click', revealSite, { once: true });
}
