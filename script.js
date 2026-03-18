const characters = [...document.querySelectorAll('.character')];
const aboutToggle = document.querySelector('[data-about-toggle]');
const aboutPanel = document.getElementById('project-about');
const introOverlay = document.querySelector('[data-intro-overlay]');
const introButton = document.querySelector('[data-intro-button]');
const backgroundAudio = document.querySelector('[data-bg-audio]');
const TRANSITION_MS = 1300;

const dialogueMap = {
  bear: [
    '君はすぐに、パンを焦がすんだから…',
    '料理、上手くなったね。',
    '君が笑顔になってくれると僕は嬉しいよ。',
    'だいすきだよ、--ちゃん。',
    'くまさんがぎゅーってしてあげる、ぎゅーって。',
    'ごはんたべた？',
    'おかたづけした？',
    'もー、また朝まで起きて！もーだよ、もー！ぷんぷん！',
    '同じ年にいなくなったら、僕たちは同じ場所に行けるのかなあ。',
    'ながいきしてね',
    '僕もだいすきだよ、--ちゃん。',
    '君が大好きな人となかよくね',
    'ねれない？僕がぎゅーってしてあげる。',
    'よしよし、大丈夫、大丈夫だよ。',
    'くまさんがいるから大丈夫だよ。',
    'ずっと、げんきでいてね。--ちゃん。',
  ],
  girl: [
    'ねむい',
    'だるい',
    'つかれた',
    'といれ',
    'おふろはいらなきゃ',
    'やだなー、人生って',
    '私なんて、生きる価値はあるのかな',
    'あーあ、この世ってなんでこんなに疲れるんだろ。',
    'にんげん、やだなー。',
    'ひといきつきたいな。',
    '恋人と会いたい。',
    '恋人だいすき。',
    'わたしって、すてられちゃうのかな？',
    '〇にたい',
    '〇えたい',
    'あのね、人ってね。どうにもならない時もあるんだよ',
  ],
};

const randomFrom = (items) => items[Math.floor(Math.random() * items.length)];

const showCharacterDialogue = (character) => {
  const { character: key } = character.dataset;
  const speechText = character.querySelector('.speech-text');
  const lines = dialogueMap[key];

  characters.forEach((item) => {
    item.classList.remove('is-active');
    item.setAttribute('aria-expanded', 'false');
  });

  if (!speechText || !lines || lines.length === 0) {
    return;
  }

  speechText.textContent = randomFrom(lines);
  character.classList.add('is-active');
  character.setAttribute('aria-expanded', 'true');
};

const setupBackgroundAudioSession = () => {
  if (!backgroundAudio) {
    return;
  }

  backgroundAudio.setAttribute('playsinline', '');
  backgroundAudio.preload = 'auto';

  if ('mediaSession' in navigator) {
    if (typeof MediaMetadata !== 'undefined') {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'あたまのなかぷろじぇくと',
        artist: 'ややちゃむの(汚)部屋',
        album: 'あたまのなかぷろじぇくと',
        artwork: [
          {
            src: 'Assets/Image/Kumasan-Ozyou-scene-two-shot.PNG',
            sizes: '1200x630',
            type: 'image/png',
          },
        ],
      });
    }

    navigator.mediaSession.setActionHandler('play', async () => {
      await backgroundAudio.play();
      navigator.mediaSession.playbackState = 'playing';
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
      }
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      backgroundAudio.pause();
    });
  }

  if ('audioSession' in navigator && navigator.audioSession) {
    navigator.audioSession.type = 'playback';
  }
};

setupBackgroundAudioSession();

characters.forEach((character) => {
  character.addEventListener('click', () => {
    showCharacterDialogue(character);
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
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
      }
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

if (backgroundAudio) {
  backgroundAudio.addEventListener('play', () => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'playing';
    }
  });

  backgroundAudio.addEventListener('pause', () => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'paused';
    }
  });
}
