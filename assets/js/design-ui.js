/* ============================================
   DESIGN UI
   Interactions the ported design needs that the repo did not
   already provide. Everything else reuses what was here:
   admission-wizard.js, fee-calculator.js, gallery-loader.js and
   marketing-enhancements.js (FAQ accordion).
   ============================================ */

/* --------------------------------------------
   Enquiry buttons
   The drawer already exposes window.openEnquiryDrawer(); the design's
   hero and CTA bands just need to be wired to it.
   -------------------------------------------- */
(function initEnquiryTriggers() {
  'use strict';

  var triggers = document.querySelectorAll('[data-enquiry-open]');
  if (!triggers.length) return;

  Array.prototype.forEach.call(triggers, function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (typeof window.openEnquiryDrawer === 'function') {
        window.openEnquiryDrawer();
      } else {
        // Drawer include missing on this page — fall back to contact.
        var base = window.SITE_BASEURL || '';
        var lang = document.documentElement.lang === 'hi' ? 'hi' : 'en';
        window.location.href = base + '/' + lang + '/contact/';
      }
    });
  });
})();

/* --------------------------------------------
   Notice filters
   Chips carry data-notice-filter; rows carry data-notice-kind.
   The first chip is "all" and matches everything.
   -------------------------------------------- */
(function initNoticeFilter() {
  'use strict';

  var chips = document.querySelectorAll('[data-notice-filter]');
  if (!chips.length) return;

  var rows = document.querySelectorAll('[data-notice-kind]');
  if (!rows.length) return;

  function apply(filter, isFirst) {
    Array.prototype.forEach.call(rows, function (row) {
      var kind = row.getAttribute('data-notice-kind') || '';
      var show = isFirst || kind === filter;
      if (show) {
        row.removeAttribute('hidden');
      } else {
        row.setAttribute('hidden', '');
      }
    });
  }

  Array.prototype.forEach.call(chips, function (chip, i) {
    chip.addEventListener('click', function () {
      Array.prototype.forEach.call(chips, function (c) {
        c.classList.remove('is-active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('is-active');
      chip.setAttribute('aria-pressed', 'true');
      apply(chip.getAttribute('data-notice-filter'), i === 0);
    });
    chip.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
  });
})();

/* --------------------------------------------
   Tap-to-play videos
   _includes/design/video.html renders a link to the MP4 with a poster
   photo. A tap swaps it for a <video> and starts it, so nothing of the
   clip is downloaded until someone asks for it.
   -------------------------------------------- */
(function initVideoCards() {
  'use strict';

  var cards = document.querySelectorAll('[data-video-src]');
  if (!cards.length) return;

  Array.prototype.forEach.call(cards, function (card) {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      var video = document.createElement('video');
      video.className = 'dc-video-player';
      video.src = card.getAttribute('data-video-src');
      video.poster = card.getAttribute('data-video-poster') || '';
      video.controls = true;
      video.playsInline = true;
      video.setAttribute('aria-label', card.getAttribute('aria-label') || '');
      card.parentNode.replaceChild(video, card);
      var started = video.play();
      if (started && started.catch) started.catch(function () {});
      video.focus();
    });
  });
})();

/* --------------------------------------------
   Hero background video
   Only for wide screens on a decent connection, and never with
   reduced motion or Data Saver. Everyone else keeps the still photo,
   which is what a phone on 3G should get. The clip has no sound.
   -------------------------------------------- */
(function initHeroVideo() {
  'use strict';

  var holder = document.querySelector('[data-hero-video]');
  if (!holder || !window.matchMedia) return;
  if (!window.matchMedia('(min-width: 1024px)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var conn = navigator.connection;
  if (conn && (conn.saveData || /2g|3g/.test(conn.effectiveType || ''))) return;

  var video = document.createElement('video');
  video.className = 'dc-hero-video';
  video.muted = true;
  video.loop = true;
  video.autoplay = true;
  video.playsInline = true;
  video.setAttribute('aria-hidden', 'true');
  video.addEventListener('playing', function () {
    video.classList.add('is-playing');
  });
  video.src = holder.getAttribute('data-hero-video');
  holder.appendChild(video);
})();
