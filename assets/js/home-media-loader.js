(function() {
  'use strict';

  const MEDIA_BASE = '/veerpatta-website/assets/media';

  const HOME_HERO_FILES = [
    'hero-video.mp4',
    'hero-video.webm',
    'hero-main.jpg',
    'hero-main.png',
    'hero-main.webp'
  ];

  const PROGRAM_CARDS = [
    { id: 'lead', files: ['program-lead.mp4', 'program-lead.jpg'] },
    { id: 'ncc', files: ['program-ncc.mp4', 'program-ncc.jpg'] },
    { id: 'sports', files: ['program-sports.mp4', 'program-sports.jpg'] },
    { id: 'arts', files: ['program-arts.mp4', 'program-arts.jpg'] }
  ];

  async function fileExists(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  async function loadHeroMedia() {
    const heroContainer = document.querySelector('.hero img, .hero video');
    if (!heroContainer) return;

    for (const filename of HOME_HERO_FILES) {
      const url = `${MEDIA_BASE}/home/${filename}`;
      if (await fileExists(url)) {

        if (window.MediaLoader.isVideo(filename)) {
          const video = window.MediaLoader.createVideoElement(url, null, 'hero-media');
          video.autoplay = true;
          video.muted = true;
          video.loop = true;
          video.playsInline = true;
          heroContainer.replaceWith(video);
        } else {
          heroContainer.src = url;
          heroContainer.style.display = 'block';
        }

        return;
      }
    }
  }

  async function loadProgramCards() {
    for (const program of PROGRAM_CARDS) {
      const programElement = document.querySelector(`.program img[src*="${program.id}-program"]`);
      if (!programElement) continue;

      for (const filename of program.files) {
        const url = `${MEDIA_BASE}/home/${filename}`;
        if (await fileExists(url)) {

          if (window.MediaLoader.isVideo(filename)) {
            const video = window.MediaLoader.createVideoElement(url, null, 'program-media');
            video.muted = true;
            video.loop = true;
            programElement.replaceWith(video);
          } else {
            programElement.src = url;
          }

          break;
        }
      }
    }
  }

  function init() {
    const isHomePage = window.location.pathname.match(/\/(en|hi)\/?$/);
    if (!isHomePage) return;

    loadHeroMedia();
    loadProgramCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
