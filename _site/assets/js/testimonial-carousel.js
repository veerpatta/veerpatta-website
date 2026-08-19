/* ============================================
   TESTIMONIAL CAROUSEL
   Auto-rotating parent testimonials with touch support
   Mobile-first design for 3G networks
   ============================================ */
(function initTestimonialCarousel() {
  'use strict';

  // Configuration
  const config = {
    autoPlayInterval: 5000, // 5 seconds
    transitionDuration: 500, // 500ms
    touchThreshold: 50, // 50px swipe to trigger
    pauseOnHover: true
  };

  // State
  let currentSlide = 0;
  let autoPlayTimer = null;
  let isTransitioning = false;
  let touchStartX = 0;
  let touchEndX = 0;

  // DOM Elements
  const carousel = document.querySelector('.testimonials-carousel');
  if (!carousel) return; // Exit if no carousel on page

  const track = carousel.querySelector('.testimonial-track');
  const slides = carousel.querySelectorAll('.testimonial-slide');
  const prevBtn = carousel.querySelector('.testimonial-nav.prev');
  const nextBtn = carousel.querySelector('.testimonial-nav.next');
  const dotsContainer = carousel.querySelector('.testimonial-dots');

  if (!track || slides.length === 0) return;

  const totalSlides = slides.length;

  /* ============================================
     INITIALIZATION
     ============================================ */
  function init() {
    // Create dots for navigation
    createDots();

    // Set initial active states
    updateSlide(0, false);

    // Add event listeners
    if (prevBtn) prevBtn.addEventListener('click', handlePrevClick);
    if (nextBtn) nextBtn.addEventListener('click', handleNextClick);

    // Touch events for swipe
    track.addEventListener('touchstart', handleTouchStart, { passive: true });
    track.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Mouse events for desktop drag (optional)
    track.addEventListener('mousedown', handleMouseDown);

    // Pause on hover (desktop)
    if (config.pauseOnHover) {
      carousel.addEventListener('mouseenter', stopAutoPlay);
      carousel.addEventListener('mouseleave', startAutoPlay);
    }

    // Keyboard navigation for accessibility
    carousel.addEventListener('keydown', handleKeyDown);

    // Start autoplay
    startAutoPlay();

    // Pause autoplay when tab is not visible (performance optimization)
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }

  /* ============================================
     DOT NAVIGATION
     ============================================ */
  function createDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot';
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('active');
        dot.removeAttribute('aria-current');
      }
    });
  }

  /* ============================================
     SLIDE NAVIGATION
     ============================================ */
  function updateSlide(index, animate = true) {
    if (isTransitioning) return;

    // Ensure index is within bounds
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentSlide = index;

    // Update active states
    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });

    // Update dots
    updateDots();

    // Set transitioning flag
    if (animate) {
      isTransitioning = true;
      setTimeout(() => {
        isTransitioning = false;
      }, config.transitionDuration);
    }
  }

  function goToSlide(index) {
    if (index === currentSlide) return;
    stopAutoPlay();
    updateSlide(index);
    startAutoPlay();
  }

  function nextSlide() {
    updateSlide(currentSlide + 1);
  }

  function prevSlide() {
    updateSlide(currentSlide - 1);
  }

  /* ============================================
     AUTO PLAY
     ============================================ */
  function startAutoPlay() {
    stopAutoPlay(); // Clear any existing timer
    autoPlayTimer = setInterval(nextSlide, config.autoPlayInterval);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  /* ============================================
     EVENT HANDLERS
     ============================================ */
  function handlePrevClick(e) {
    e.preventDefault();
    stopAutoPlay();
    prevSlide();
    startAutoPlay();
  }

  function handleNextClick(e) {
    e.preventDefault();
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      handlePrevClick(e);
    } else if (e.key === 'ArrowRight') {
      handleNextClick(e);
    }
  }

  /* ============================================
     TOUCH & SWIPE SUPPORT
     ============================================ */
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  }

  function handleSwipe() {
    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) < config.touchThreshold) {
      return; // Swipe too short
    }

    stopAutoPlay();

    if (swipeDistance > 0) {
      // Swipe left - next slide
      nextSlide();
    } else {
      // Swipe right - prev slide
      prevSlide();
    }

    startAutoPlay();
  }

  /* ============================================
     MOUSE DRAG SUPPORT (Desktop)
     ============================================ */
  let isDragging = false;
  let dragStartX = 0;

  function handleMouseDown(e) {
    isDragging = true;
    dragStartX = e.clientX;
    track.style.cursor = 'grabbing';

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    e.preventDefault();
  }

  function handleMouseUp(e) {
    if (!isDragging) return;

    isDragging = false;
    track.style.cursor = 'grab';

    const dragDistance = dragStartX - e.clientX;

    if (Math.abs(dragDistance) > config.touchThreshold) {
      stopAutoPlay();

      if (dragDistance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }

      startAutoPlay();
    }

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  /* ============================================
     VISIBILITY CHANGE (Performance)
     ============================================ */
  function handleVisibilityChange() {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  }

  /* ============================================
     PUBLIC API (Optional)
     ============================================ */
  const PublicAPI = {
    next: nextSlide,
    prev: prevSlide,
    goTo: goToSlide,
    play: startAutoPlay,
    pause: stopAutoPlay,
    getCurrentSlide: () => currentSlide
  };

  // Expose to window if needed by other scripts
  window.TestimonialCarousel = PublicAPI;

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
