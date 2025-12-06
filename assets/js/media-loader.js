/**
 * Media Loader - Auto-detects and loads images/videos
 * Supports: .jpg, .jpeg, .png, .webp, .gif, .mp4, .webm, .mov
 */

(function () {
  'use strict';

  const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  const VIDEO_EXTS = ['mp4', 'webm', 'mov'];

  function getExtension(filename) {
    return filename.split('.').pop().toLowerCase();
  }

  function isImage(filename) {
    return IMAGE_EXTS.includes(getExtension(filename));
  }

  function isVideo(filename) {
    return VIDEO_EXTS.includes(getExtension(filename));
  }

  function getPosterImage(videoFilename) {
    const baseName = videoFilename.replace(/\.[^/.]+$/, '');
    return `${baseName}-poster.jpg`;
  }

  function createImageElement(src, alt, className) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';
    img.loading = 'lazy';
    if (className) img.className = className;

    // Add 'loaded' class when image loads - required because CSS hides lazy images by default
    img.addEventListener('load', function () {
      this.classList.add('loaded');
    });

    // Handle already-cached images that load immediately
    if (img.complete) {
      img.classList.add('loaded');
    }

    return img;
  }

  function createVideoElement(src, poster, className) {
    const video = document.createElement('video');
    video.src = src;
    video.controls = true;
    video.preload = 'metadata';
    if (poster) video.poster = poster;
    if (className) video.className = className;

    const source = document.createElement('source');
    source.src = src;
    source.type = `video/${getExtension(src)}`;
    video.appendChild(source);

    video.innerHTML += 'Your browser does not support the video tag.';
    return video;
  }

  async function loadCaptions(folderPath) {
    try {
      const response = await fetch(`${folderPath}/captions.txt`);
      if (!response.ok) return {};

      const text = await response.text();
      const captions = {};

      text.split('\n').forEach(line => {
        line = line.trim();
        if (!line || line.startsWith('#')) return;

        const parts = line.split('|').map(p => p.trim());
        if (parts.length === 3) {
          const filename = parts[0];
          const enCaption = parts[1].replace('EN:', '').trim();
          const hiCaption = parts[2].replace('HI:', '').trim();

          captions[filename] = { en: enCaption, hi: hiCaption };
        }
      });

      return captions;
    } catch (error) {
      console.warn('No captions file found:', error);
      return {};
    }
  }

  function getCurrentLanguage() {
    const path = window.location.pathname;
    return path.includes('/hi/') ? 'hi' : 'en';
  }

  window.MediaLoader = {
    isImage,
    isVideo,
    getPosterImage,
    createImageElement,
    createVideoElement,
    loadCaptions,
    getCurrentLanguage
  };

})();
