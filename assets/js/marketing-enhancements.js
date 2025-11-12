// Marketing Enhancements JavaScript - Veer Patta Public School
// Handles testimonials carousel, FAQ accordion, and related animations

/* ============================================
   TESTIMONIALS CAROUSEL WITH AUTO-ROTATION
   Auto-advances every 5 seconds with manual controls
   ============================================ */
(function initTestimonialsCarousel() {
  const carousel = document.querySelector('.testimonials-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.testimonial-slide');
  const prevBtn = carousel.querySelector('.testimonial-nav.prev');
  const nextBtn = carousel.querySelector('.testimonial-nav.next');
  const dotsContainer = carousel.querySelector('.testimonial-dots');

  if (!slides.length) return;

  let currentSlide = 0;
  let autoRotateTimer;
  const autoRotateInterval = 5000; // 5 seconds

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('testimonial-dot');
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', 'Go to testimonial ' + (index + 1));
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.testimonial-dot');

  function goToSlide(index) {
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    // Update current slide index
    currentSlide = index;

    // Add active class to new slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    // Reset auto-rotation timer
    resetAutoRotate();
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }

  function startAutoRotate() {
    autoRotateTimer = setInterval(nextSlide, autoRotateInterval);
  }

  function stopAutoRotate() {
    clearInterval(autoRotateTimer);
  }

  function resetAutoRotate() {
    stopAutoRotate();
    startAutoRotate();
  }

  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // Keyboard navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Pause auto-rotation on hover
  carousel.addEventListener('mouseenter', stopAutoRotate);
  carousel.addEventListener('mouseleave', startAutoRotate);

  // Pause auto-rotation when page is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoRotate();
    } else {
      startAutoRotate();
    }
  });

  // Start auto-rotation
  startAutoRotate();
})();

/* ============================================
   FAQ ACCORDION FUNCTIONALITY
   Smooth expand/collapse with animations
   ============================================ */
(function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';

      // Close all other FAQs (accordion behavior)
      faqItems.forEach(otherItem => {
        const otherQuestion = otherItem.querySelector('.faq-question');
        const otherAnswer = otherItem.querySelector('.faq-answer');

        if (otherItem !== item) {
          otherQuestion.setAttribute('aria-expanded', 'false');
          otherAnswer.classList.remove('open');
        }
      });

      // Toggle current FAQ
      if (isExpanded) {
        question.setAttribute('aria-expanded', 'false');
        answer.classList.remove('open');
      } else {
        question.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');

        // Smooth scroll to question if it's out of view
        setTimeout(() => {
          const rect = question.getBoundingClientRect();
          const headerHeight = 80; // Adjust based on your header height

          if (rect.top < headerHeight) {
            window.scrollTo({
              top: window.scrollY + rect.top - headerHeight - 20,
              behavior: 'smooth'
            });
          }
        }, 300);
      }
    });

    // Keyboard accessibility
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });
})();

/* ============================================
   TRUST BADGES HORIZONTAL SCROLL ENHANCEMENT
   Smooth scrolling and touch support
   ============================================ */
(function initTrustBadgesScroll() {
  const badgesWrapper = document.querySelector('.trust-badges-wrapper');
  if (!badgesWrapper) return;

  // Only apply on mobile/tablet where scrolling is needed
  if (window.innerWidth >= 900) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  badgesWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    badgesWrapper.style.cursor = 'grabbing';
    startX = e.pageX - badgesWrapper.offsetLeft;
    scrollLeft = badgesWrapper.scrollLeft;
  });

  badgesWrapper.addEventListener('mouseleave', () => {
    isDown = false;
    badgesWrapper.style.cursor = 'grab';
  });

  badgesWrapper.addEventListener('mouseup', () => {
    isDown = false;
    badgesWrapper.style.cursor = 'grab';
  });

  badgesWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - badgesWrapper.offsetLeft;
    const walk = (x - startX) * 2;
    badgesWrapper.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  badgesWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - badgesWrapper.offsetLeft;
    scrollLeft = badgesWrapper.scrollLeft;
  }, { passive: true });

  badgesWrapper.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - badgesWrapper.offsetLeft;
    const walk = (x - startX) * 2;
    badgesWrapper.scrollLeft = scrollLeft - walk;
  }, { passive: true });
})();

/* ============================================
   ANIMATE WHY CHOOSE US CARDS ON SCROLL
   ============================================ */
(function initWhyChooseUsAnimation() {
  const whyChooseCards = document.querySelectorAll('.why-choose-card');
  if (!whyChooseCards.length) return;

  if (!('IntersectionObserver' in window)) {
    whyChooseCards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation
        setTimeout(() => {
          entry.target.classList.add('animate-fadeUp', 'animated');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  whyChooseCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
  });
})();

/* ============================================
   ANIMATE TRUST BADGES ON SCROLL
   ============================================ */
(function initTrustBadgesAnimation() {
  const badges = document.querySelectorAll('.trust-badge');
  if (!badges.length) return;

  if (!('IntersectionObserver' in window)) {
    badges.forEach(badge => {
      badge.style.opacity = '1';
      badge.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation
        setTimeout(() => {
          entry.target.classList.add('animate-slideIn', 'animated');
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  badges.forEach(badge => {
    badge.style.opacity = '0';
    badge.style.transform = 'translateX(-20px)';
    observer.observe(badge);
  });
})();

/* ============================================
   ENQUIRY DRAWER FUNCTIONALITY
   Bottom sheet for admissions enquiries with validation
   ============================================ */
(function initEnquiryDrawer() {
  // Marketing Enhancements Module
  window.MarketingEnhancements = window.MarketingEnhancements || {};

  Object.assign(window.MarketingEnhancements, {

    // Open enquiry drawer
    openEnquiryDrawer: function() {
      var drawer = document.getElementById('enquiryDrawer');
      var overlay = document.getElementById('enquiryOverlay');

      if (drawer && overlay) {
        drawer.classList.add('active');
        overlay.classList.add('active');
        drawer.setAttribute('aria-hidden', 'false');
        overlay.setAttribute('aria-hidden', 'false');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Focus first input
        setTimeout(function() {
          var firstInput = drawer.querySelector('input');
          if (firstInput) firstInput.focus();
        }, 300);

        // Track event
        if (window.trackEvent) {
          window.trackEvent('Enquiry Drawer: Opened');
        }
      }
    },

    // Close enquiry drawer
    closeEnquiryDrawer: function() {
      var drawer = document.getElementById('enquiryDrawer');
      var overlay = document.getElementById('enquiryOverlay');

      if (drawer && overlay) {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        drawer.setAttribute('aria-hidden', 'true');
        overlay.setAttribute('aria-hidden', 'true');

        // Restore body scroll
        document.body.style.overflow = '';

        // Track event
        if (window.trackEvent) {
          window.trackEvent('Enquiry Drawer: Closed');
        }
      }
    },

    // Validate form field
    validateField: function(field) {
      var errorSpan = document.getElementById(field.id + 'Error');
      var form = field.closest('form');
      var errorRequired = form.dataset.errorRequired || 'This field is required';
      var errorPhone = form.dataset.errorPhone || 'Please enter a valid phone number';

      // Clear previous errors
      if (errorSpan) {
        errorSpan.textContent = '';
        field.classList.remove('error');
      }

      // Check required
      if (field.hasAttribute('required') && !field.value.trim()) {
        if (errorSpan) {
          errorSpan.textContent = errorRequired;
          field.classList.add('error');
        }
        return false;
      }

      // Check phone pattern
      if (field.type === 'tel' && field.value.trim()) {
        var phonePattern = /^[0-9]{10,12}$/;
        if (!phonePattern.test(field.value.trim())) {
          if (errorSpan) {
            errorSpan.textContent = errorPhone;
            field.classList.add('error');
          }
          return false;
        }
      }

      return true;
    },

    // Validate entire form
    validateForm: function(form) {
      var isValid = true;
      var fields = form.querySelectorAll('input[required], select[required]');

      fields.forEach(function(field) {
        if (!window.MarketingEnhancements.validateField(field)) {
          isValid = false;
        }
      });

      return isValid;
    },

    // Get form data as object
    getFormData: function(form) {
      var data = {};
      var inputs = form.querySelectorAll('input, select');

      inputs.forEach(function(input) {
        if (input.name) {
          data[input.name] = input.value;
        }
      });

      return data;
    },

    // Format enquiry message
    formatEnquiryMessage: function(data, lang) {
      if (lang === 'hi') {
        return 'वीर पट्टा पब्लिक स्कूल में प्रवेश पूछताछ\n\n' +
               'अभिभावक का नाम: ' + data.parent_name + '\n' +
               'बच्चे का नाम: ' + data.child_name + '\n' +
               'कक्षा: ' + data.class_sought + '\n' +
               'फोन: ' + data.phone + '\n\n' +
               'कृपया विवरण साझा करें।';
      } else {
        return 'Admission Enquiry for Veer Patta Public School\n\n' +
               'Parent Name: ' + data.parent_name + '\n' +
               'Child Name: ' + data.child_name + '\n' +
               'Class: ' + data.class_sought + '\n' +
               'Phone: ' + data.phone + '\n\n' +
               'Please share details.';
      }
    },

    // Submit via email (mailto)
    submitViaEmail: function(form) {
      var data = window.MarketingEnhancements.getFormData(form);
      var lang = form.dataset.lang || 'en';
      var schoolEmail = form.dataset.schoolEmail || 'veerpatta.school@gmail.com';

      var subject = lang === 'hi' ?
        'प्रवेश पूछताछ - ' + data.child_name :
        'Admission Enquiry - ' + data.child_name;

      var body = window.MarketingEnhancements.formatEnquiryMessage(data, lang);

      var mailtoLink = 'mailto:' + schoolEmail +
                       '?subject=' + encodeURIComponent(subject) +
                       '&body=' + encodeURIComponent(body);

      window.location.href = mailtoLink;

      // Track event
      if (window.trackEvent) {
        window.trackEvent('Lead: Enquiry Submitted', { method: 'email' });
      }
    },

    // Submit via WhatsApp
    submitViaWhatsApp: function() {
      var form = document.getElementById('enquiryForm');
      if (!form) return;

      if (!window.MarketingEnhancements.validateForm(form)) {
        return;
      }

      var data = window.MarketingEnhancements.getFormData(form);
      var lang = form.dataset.lang || 'en';
      var schoolPhone = form.dataset.schoolPhone || '919413748575';

      var message = window.MarketingEnhancements.formatEnquiryMessage(data, lang);

      var whatsappLink = 'https://wa.me/' + schoolPhone + '?text=' + encodeURIComponent(message);

      window.open(whatsappLink, '_blank', 'noopener,noreferrer');

      // Show success
      window.MarketingEnhancements.showSuccess();

      // Track event
      if (window.trackEvent) {
        window.trackEvent('Lead: Enquiry Submitted', { method: 'whatsapp' });
      }
    },

    // Show success toast
    showSuccess: function() {
      var toast = document.getElementById('successToast');
      if (toast) {
        toast.classList.add('show');

        setTimeout(function() {
          toast.classList.remove('show');
          window.MarketingEnhancements.closeEnquiryDrawer();

          // Reset form
          var form = document.getElementById('enquiryForm');
          if (form) form.reset();
        }, 3000);
      }
    }
  });

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {

    // Close drawer on overlay click
    var overlay = document.getElementById('enquiryOverlay');
    if (overlay) {
      overlay.addEventListener('click', function() {
        window.MarketingEnhancements.closeEnquiryDrawer();
      });
    }

    // Close drawer on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        window.MarketingEnhancements.closeEnquiryDrawer();
      }
    });

    // Form submission
    var form = document.getElementById('enquiryForm');
    if (form) {

      // Real-time validation
      var fields = form.querySelectorAll('input, select');
      fields.forEach(function(field) {
        field.addEventListener('blur', function() {
          window.MarketingEnhancements.validateField(field);
        });

        field.addEventListener('input', function() {
          // Clear error on input
          var errorSpan = document.getElementById(field.id + 'Error');
          if (errorSpan && errorSpan.textContent) {
            errorSpan.textContent = '';
            field.classList.remove('error');
          }
        });
      });

      // Form submit (email)
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (window.MarketingEnhancements.validateForm(form)) {
          window.MarketingEnhancements.submitViaEmail(form);
          window.MarketingEnhancements.showSuccess();
        }
      });
    }
  });

})();

console.log('Marketing enhancements loaded - Testimonials, FAQ, animations, and enquiry drawer ready');
