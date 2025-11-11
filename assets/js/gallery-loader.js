(function() {
  'use strict';

  const MEDIA_BASE = '/veerpatta-website/assets/media/gallery';
  const CATEGORIES = ['sports', 'ncc', 'cultural', 'academic', 'celebrations'];

  const GALLERY_ITEMS = {
    sports: [],
    ncc: [],
    cultural: [],
    academic: [],
    celebrations: []
  };

  async function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Loading gallery...</p>';

    let totalItems = 0;
    const allCaptions = {};

    for (const category of CATEGORIES) {
      allCaptions[category] = await window.MediaLoader.loadCaptions(`${MEDIA_BASE}/${category}`);
    }

    const lang = window.MediaLoader.getCurrentLanguage();
    const itemsHtml = [];

    for (const category of CATEGORIES) {
      const items = GALLERY_ITEMS[category];

      for (const filename of items) {
        const url = `${MEDIA_BASE}/${category}/${filename}`;
        const captions = allCaptions[category][filename] || {};
        const caption = captions[lang] || filename;

        const figure = document.createElement('figure');
        figure.className = 'gallery-item';
        figure.setAttribute('data-category', category);

        if (window.MediaLoader.isImage(filename)) {
          const img = window.MediaLoader.createImageElement(url, caption);
          figure.appendChild(img);
        } else if (window.MediaLoader.isVideo(filename)) {
          const posterUrl = `${MEDIA_BASE}/${category}/${window.MediaLoader.getPosterImage(filename)}`;
          const video = window.MediaLoader.createVideoElement(url, posterUrl);
          figure.appendChild(video);
        }

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = caption;
        figure.appendChild(figcaption);

        itemsHtml.push(figure);
        totalItems++;
      }
    }

    if (totalItems === 0) {
      galleryGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No media files found. Upload to assets/media/gallery/</p>';
      return;
    }

    galleryGrid.innerHTML = '';
    itemsHtml.forEach(item => galleryGrid.appendChild(item));
  }

  function init() {
    const isGalleryPage = window.location.pathname.includes('/gallery');
    if (!isGalleryPage) return;

    loadGallery();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.GalleryLoader = {
    registerItems: function(category, files) {
      if (GALLERY_ITEMS[category]) {
        GALLERY_ITEMS[category] = files;
      }
    }
  };

})();
