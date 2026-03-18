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


const characterIntroRoot = document.querySelector('[data-character-intro]');
const characterIntroStart = document.querySelector('[data-character-intro-start]');
const characterIntroChartCard = characterIntroRoot?.querySelector('.character-intro__chart-card');
const characterIntroDetail = document.querySelector('[data-character-intro-detail]');
const characterCard = document.querySelector('[data-character-card]');
const characterImage = document.querySelector('[data-character-image]');
const characterName = document.querySelector('[data-character-name]');
const characterText = document.querySelector('[data-character-text]');
const characterQuote = document.querySelector('[data-character-quote]');
const characterPrev = document.querySelector('[data-character-prev]');
const characterNext = document.querySelector('[data-character-next]');
const characterBack = document.querySelector('[data-character-back]');
const characterDots = document.querySelector('[data-character-dots]');

const characterProfiles = [
  {
    key: 'girl',
    image: 'Assets/Image/Ozyou-icon.PNG',
    imageAlt: 'お嬢のアイコン',
    name: 'お嬢',
    tone: 'girl',
    text: 'くまさんと恋人が大好き。にんげんが、ちょっとこわい。昼夜逆転生活になっている。',
    quote: '「いつかきっと、たましいが痛みなく消えちゃえばいいのにな。」',
  },
  {
    key: 'bear',
    image: 'Assets/Image/Kumasan-icon.PNG',
    imageAlt: 'くまさんのアイコン',
    name: 'くまさん',
    tone: 'bear',
    text: 'お嬢が大好き。お嬢のぬいぐるみ。お嬢の健康が心配。',
    quote: '「嗚呼、もどかしい。僕の手で、僕の意思で。君を抱きしめられたなら……。」',
  },
  {
    key: 'lover',
    image: 'Assets/Image/Koibito-icon.PNG',
    imageAlt: '恋人のアイコン',
    name: '恋人',
    tone: 'lover',
    text: 'お嬢がとても大好き。毎日のように病んでいる彼女に元気になってもらいたい。',
    quote: '「ねえ、愛しい人。私がいるのに、何故貴女は死へと急いでしまうの……。」',
  },
];

let activeCharacterIndex = 0;
let isCharacterIntroOpen = false;

const renderCharacterDots = () => {
  if (!characterDots) {
    return;
  }

  characterDots.replaceChildren();

  characterProfiles.forEach((profile, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `${profile.name} の紹介を表示`);
    dot.setAttribute('aria-pressed', String(index === activeCharacterIndex));

    if (index === activeCharacterIndex) {
      dot.classList.add('is-active');
    }

    dot.addEventListener('click', () => {
      activeCharacterIndex = index;
      renderCharacterCard();
    });

    characterDots.append(dot);
  });
};

const renderCharacterCard = () => {
  const profile = characterProfiles[activeCharacterIndex];

  if (!profile || !characterCard || !characterImage || !characterName || !characterText || !characterQuote) {
    return;
  }

  characterCard.dataset.tone = profile.tone;
  characterImage.src = profile.image;
  characterImage.alt = profile.imageAlt;
  characterName.textContent = profile.name;
  characterText.textContent = profile.text;
  characterQuote.textContent = profile.quote;
  renderCharacterDots();
};

const openCharacterIntro = () => {
  if (!characterIntroRoot || !characterIntroChartCard || !characterIntroDetail || isCharacterIntroOpen) {
    return;
  }

  isCharacterIntroOpen = true;
  characterIntroRoot.classList.add('is-transitioning');

  window.setTimeout(() => {
    characterIntroChartCard.hidden = true;
    characterIntroDetail.hidden = false;
    characterIntroRoot.classList.remove('is-transitioning');
  }, TRANSITION_MS);
};

const closeCharacterIntro = () => {
  if (!characterIntroRoot || !characterIntroChartCard || !characterIntroDetail || !isCharacterIntroOpen) {
    return;
  }

  isCharacterIntroOpen = false;
  characterIntroChartCard.hidden = false;
  characterIntroDetail.hidden = true;
  characterIntroRoot.classList.remove('is-transitioning');
};

if (characterIntroStart) {
  characterIntroStart.addEventListener('click', openCharacterIntro);
}

if (characterPrev) {
  characterPrev.addEventListener('click', () => {
    activeCharacterIndex = (activeCharacterIndex - 1 + characterProfiles.length) % characterProfiles.length;
    renderCharacterCard();
  });
}

if (characterNext) {
  characterNext.addEventListener('click', () => {
    activeCharacterIndex = (activeCharacterIndex + 1) % characterProfiles.length;
    renderCharacterCard();
  });
}

if (characterBack) {
  characterBack.addEventListener('click', closeCharacterIntro);
}

renderCharacterCard();
