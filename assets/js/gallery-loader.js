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

  const REGISTRATION_TIMEOUT_MS = 1500;

  // Promise to track when items are registered
  let itemsRegisteredResolver;
  let registrationResolved = false;
  const itemsRegisteredPromise = new Promise(resolve => {
    itemsRegisteredResolver = resolve;
  });

  function resolveRegistration() {
    if (registrationResolved) return;
    registrationResolved = true;
    if (window.galleryRegistrationTimeout) {
      clearTimeout(window.galleryRegistrationTimeout);
      window.galleryRegistrationTimeout = null;
    }
    if (itemsRegisteredResolver) itemsRegisteredResolver();
  }

  // IMPORTANT: Expose GalleryLoader FIRST so gallery-items.js can register items
  window.GalleryLoader = {
    registerItems: function (category, files) {
      if (GALLERY_ITEMS[category]) {
        GALLERY_ITEMS[category] = files;
        // Debounce the resolve to allow synchronous registrations to finish.
        if (window.galleryRegistrationTimeout) clearTimeout(window.galleryRegistrationTimeout);
        window.galleryRegistrationTimeout = setTimeout(resolveRegistration, 50);
      }
    },
    finalizeRegistration: resolveRegistration
  };

  function waitForRegistration() {
    return Promise.race([
      itemsRegisteredPromise.then(() => true),
      new Promise(resolve => {
        setTimeout(() => {
          if (!registrationResolved) {
            console.warn(
              `Gallery item registration did not complete within ${REGISTRATION_TIMEOUT_MS}ms. Continuing with available items.`
            );
          }
          resolve(false);
        }, REGISTRATION_TIMEOUT_MS);
      })
    ]);
  }

  async function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Loading gallery...</p>';

    // Wait for items to be registered, but never block forever.
    await waitForRegistration();

    let totalItems = 0;
    const allCaptions = {};

    try {
        const captionPromises = CATEGORIES.map(category => 
            window.MediaLoader.loadCaptions(`${MEDIA_BASE}/${category}`)
                .then(captions => {
                    allCaptions[category] = captions;
                })
                .catch(err => {
                    console.warn(`Failed to load captions for ${category}`, err);
                    allCaptions[category] = {};
                })
        );
        
        await Promise.all(captionPromises);
    } catch (e) {
        console.error("Error loading captions", e);
    }

    const lang = window.MediaLoader.getCurrentLanguage();
    const itemsHtml = [];

    for (const category of CATEGORIES) {
      const items = GALLERY_ITEMS[category];
      if (!items || items.length === 0) continue;

      // console.log('Loading category:', category, 'items:', items);

      for (const filename of items) {
        const url = `${MEDIA_BASE}/${category}/${filename}`;
        const captions = allCaptions[category][filename] || {};
        const caption = captions[lang] || filename;

        const figure = document.createElement('figure');
        figure.className = 'gallery-item';
        figure.setAttribute('data-category', category);

        // Pre-hide for animation
        figure.style.opacity = '0'; 
        figure.style.display = 'none'; // Initially hidden for filter to reveal

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
      galleryGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Gallery is temporarily unavailable. Please try again shortly.</p>';
      return;
    }

    galleryGrid.innerHTML = '';
    itemsHtml.forEach(item => galleryGrid.appendChild(item));

    // Initialize gallery filter - this will reveal the items
    initGalleryFilter();
    
    // Trigger "All" filter to show items initially
    const allBtn = document.querySelector('.pill[data-filter="all"]');
    if(allBtn) allBtn.click();
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
        // Remove old listeners to prevent duplicates if re-initialized
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });
    
    // Re-select refreshed buttons
    const freshPills = document.querySelectorAll('.pill');

    freshPills.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        freshPills.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        const items = galleryGrid.querySelectorAll('.gallery-item');

        // Simple counter for stagger delay
        let visibleIndex = 0;

        items.forEach((item) => {
          const category = item.getAttribute('data-category');
          const shouldShow = (filter === 'all' || filter === category);

          if (shouldShow) {
            // Display first, then animate opacity
            item.style.display = '';
            
            // Use setTimeout to allow display:block to apply before opacity transition
            setTimeout(() => {
                // Stagger effect
                const delay = visibleIndex * 50; 
                item.style.transition = `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`;
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 10);
            
            visibleIndex++;
          } else {
            // Fade out then hide
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
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

    // Load gallery immediately, it will wait for the promise internally
    loadGallery();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
