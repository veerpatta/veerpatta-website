(function () {
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

  // IMPORTANT: Expose GalleryLoader FIRST so gallery-items.js can register items
  window.GalleryLoader = {
    registerItems: function (category, files) {
      if (GALLERY_ITEMS[category]) {
        GALLERY_ITEMS[category] = files;
        console.log('Registered gallery items for:', category, files);
      }
    }
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
      console.log('Loading category:', category, 'items:', items);

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

    // Initialize gallery filter AFTER items are loaded
    initGalleryFilter();
  }

  /**
   * Initialize gallery filter tabs
   * Called after gallery items are dynamically loaded
   */
  function initGalleryFilter() {
    const pills = document.querySelectorAll('.pill');
    const galleryGrid = document.getElementById('gallery-grid');

    if (!pills.length || !galleryGrid) return;

    pills.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        pills.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        const items = galleryGrid.querySelectorAll('.gallery-item');

        // Animate items out then in
        items.forEach((item, index) => {
          const category = item.getAttribute('data-category');
          const shouldShow = (filter === 'all' || filter === category);

          if (shouldShow) {
            // Fade in with stagger
            setTimeout(() => {
              item.style.display = '';
              item.style.opacity = '0';
              item.style.transform = 'scale(0.9)';

              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              }, 50);
            }, index * 50);
          } else {
            // Fade out
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  function init() {
    const isGalleryPage = window.location.pathname.includes('/gallery');
    if (!isGalleryPage) return;

    // Small delay to ensure gallery-items.js has finished registering all items
    setTimeout(loadGallery, 300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
