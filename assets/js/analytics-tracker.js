/* ============================================
   MARKETING ANALYTICS TRACKER
   Privacy-focused client-side analytics using localStorage
   Tracks scroll depth, time on page, exit intent, and engagement
   No external services - all data stored locally for internal dashboard
   ============================================ */
(function initAnalyticsTracker() {
  'use strict';

  // Configuration
  const config = {
    storageKey: 'vps_analytics',
    scrollDepthMarkers: [25, 50, 75, 100],
    timeIntervals: [10, 30, 60, 120, 300], // seconds
    exitIntentThreshold: 50, // pixels for mobile exit detection
    heartbeatInterval: 10000, // 10 seconds
    sessionTimeout: 1800000 // 30 minutes
  };

  // State
  let sessionData = {
    pageUrl: window.location.pathname,
    pageTitle: document.title,
    lang: document.documentElement.lang || 'en',
    sessionStart: Date.now(),
    lastActivity: Date.now(),
    scrollDepth: 0,
    maxScrollDepth: 0,
    timeOnPage: 0,
    engagementScore: 0,
    events: [],
    scrollMilestones: [],
    timeMilestones: [],
    ctaClicks: [],
    exitAttempts: 0,
    device: detectDevice(),
    referrer: document.referrer || 'direct'
  };

  let timers = {
    heartbeat: null,
    timeTracking: null
  };

  let hasTrackedExit = false;
  let hasSessionTimedOut = false;

  function updateLastActivity() {
    sessionData.lastActivity = Date.now();
  }

  /* ============================================
     INITIALIZATION
     ============================================ */
  function init() {
    // Start tracking
    trackPageView();
    attachEventListeners();
    startHeartbeat();
    startTimeTracking();

    // Track page unload
    window.addEventListener('beforeunload', handlePageUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }

  /* ============================================
     EVENT LISTENERS
     ============================================ */
  function attachEventListeners() {
    // Scroll tracking
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      updateLastActivity();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(trackScroll, 100);
    }, { passive: true });

    // Exit intent detection (mobile - scroll up quickly)
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = lastScrollY - currentScrollY;

      if (scrollDelta > config.exitIntentThreshold && currentScrollY < 200) {
        trackExitIntent('scroll_up');
      }

      lastScrollY = currentScrollY;
    }, { passive: true });

    // CTA click tracking
    document.addEventListener('click', (e) => {
      updateLastActivity();
      const target = e.target.closest('a, button');
      if (target) {
        trackCTAClick(target);
      }
    });

    document.addEventListener('keydown', updateLastActivity);
    document.addEventListener('touchstart', updateLastActivity, { passive: true });

    // Form interactions
    const forms = document.querySelectorAll('form, input, textarea, select');
    forms.forEach(element => {
      const markFormInteraction = () => updateLastActivity();
      element.addEventListener('input', markFormInteraction);
      element.addEventListener('change', markFormInteraction);

      element.addEventListener('focus', () => {
        updateLastActivity();
        trackEvent('form_interaction', {
          element: element.tagName,
          id: element.id || 'unnamed'
        });
      }, { once: true });
    });

    // Link clicks
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('external_link_click', {
          url: link.href,
          text: link.textContent.trim()
        });
      });
    });

    // WhatsApp button clicks
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
    whatsappLinks.forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('whatsapp_click', {
          context: getPageContext()
        });
      });
    });

    // Gallery interactions
    const galleryLinks = document.querySelectorAll('[data-gallery]');
    galleryLinks.forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('gallery_view', {
          category: link.dataset.gallery || 'unknown'
        });
      });
    });
  }

  /* ============================================
     TRACKING FUNCTIONS
     ============================================ */
  function trackPageView() {
    sessionData.sessionStart = Date.now();
    sessionData.lastActivity = Date.now();

    trackEvent('page_view', {
      url: sessionData.pageUrl,
      title: sessionData.pageTitle,
      lang: sessionData.lang,
      device: sessionData.device,
      referrer: sessionData.referrer
    });
  }

  function trackScroll() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    // Calculate scroll depth percentage
    const scrollDepth = Math.round(
      ((scrollTop + windowHeight) / documentHeight) * 100
    );

    sessionData.scrollDepth = scrollDepth;

    // Track max scroll depth
    if (scrollDepth > sessionData.maxScrollDepth) {
      sessionData.maxScrollDepth = scrollDepth;
    }

    // Track scroll depth milestones
    config.scrollDepthMarkers.forEach(marker => {
      if (scrollDepth >= marker && !sessionData.scrollMilestones.includes(marker)) {
        sessionData.scrollMilestones.push(marker);
        trackEvent('scroll_depth', {
          depth: marker,
          timestamp: Date.now() - sessionData.sessionStart
        });

        // Increase engagement score
        sessionData.engagementScore += 5;
      }
    });
  }

  function trackExitIntent(type) {
    if (hasTrackedExit) return;

    hasTrackedExit = true;
    sessionData.exitAttempts++;

    trackEvent('exit_intent', {
      type,
      scrollDepth: sessionData.maxScrollDepth,
      timeOnPage: Math.round((Date.now() - sessionData.sessionStart) / 1000)
    });

    // Could trigger exit intent popup here
    // showExitIntentPopup();
  }

  function trackCTAClick(element) {
    const ctaData = {
      type: element.tagName.toLowerCase(),
      text: element.textContent.trim().substring(0, 50),
      href: element.href || '',
      classes: element.className,
      timestamp: Date.now() - sessionData.sessionStart
    };

    sessionData.ctaClicks.push(ctaData);

    trackEvent('cta_click', ctaData);

    // Increase engagement score
    sessionData.engagementScore += 10;
  }

  function trackEvent(eventName, eventData = {}) {
    const event = {
      name: eventName,
      data: eventData,
      timestamp: Date.now(),
      relativeTime: Date.now() - sessionData.sessionStart
    };

    sessionData.events.push(event);

    // Save to localStorage
    saveAnalytics();
  }

  /* ============================================
     TIME TRACKING
     ============================================ */
  function startHeartbeat() {
    clearInterval(timers.heartbeat);

    timers.heartbeat = setInterval(() => {
      sessionData.timeOnPage = Math.round((Date.now() - sessionData.sessionStart) / 1000);

      // Check for session timeout
      const inactiveDuration = Date.now() - sessionData.lastActivity;
      if (inactiveDuration > config.sessionTimeout) {
        handleSessionTimeout();
      }
    }, config.heartbeatInterval);
  }

  function startTimeTracking() {
    config.timeIntervals.forEach(interval => {
      setTimeout(() => {
        if (!sessionData.timeMilestones.includes(interval)) {
          sessionData.timeMilestones.push(interval);
          trackEvent('time_on_page', {
            seconds: interval,
            scrollDepth: sessionData.maxScrollDepth
          });

          // Increase engagement score
          sessionData.engagementScore += 3;
        }
      }, interval * 1000);
    });
  }

  /* ============================================
     SESSION MANAGEMENT
     ============================================ */
  function handlePageUnload() {
    // Final save before leaving
    sessionData.timeOnPage = Math.round((Date.now() - sessionData.sessionStart) / 1000);
    sessionData.exitScrollDepth = sessionData.maxScrollDepth;

    trackEvent('page_exit', {
      timeOnPage: sessionData.timeOnPage,
      maxScrollDepth: sessionData.maxScrollDepth,
      engagementScore: calculateEngagementScore()
    });

    saveAnalytics();

    // Clear timers
    clearInterval(timers.heartbeat);
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      trackEvent('tab_hidden', {
        timeOnPage: Math.round((Date.now() - sessionData.sessionStart) / 1000)
      });

      // Pause timers
      clearInterval(timers.heartbeat);
    } else {
      trackEvent('tab_visible', {
        timeOnPage: Math.round((Date.now() - sessionData.sessionStart) / 1000)
      });

      // Resume timers
      startHeartbeat();
    }
  }

  function handleSessionTimeout() {
    if (hasSessionTimedOut) return;

    hasSessionTimedOut = true;

    trackEvent('session_timeout', {
      timeOnPage: sessionData.timeOnPage,
      maxScrollDepth: sessionData.maxScrollDepth
    });

    clearInterval(timers.heartbeat);
  }

  /* ============================================
     ENGAGEMENT SCORING
     ============================================ */
  function calculateEngagementScore() {
    let score = sessionData.engagementScore;

    // Bonus for time on page
    if (sessionData.timeOnPage > 60) score += 10;
    if (sessionData.timeOnPage > 180) score += 20;

    // Bonus for scroll depth
    if (sessionData.maxScrollDepth > 75) score += 15;
    if (sessionData.maxScrollDepth === 100) score += 10;

    // Bonus for CTA clicks
    score += sessionData.ctaClicks.length * 15;

    // Bonus for form interactions
    const formEvents = sessionData.events.filter(e => e.name === 'form_interaction');
    score += formEvents.length * 20;

    sessionData.engagementScore = score;
    return score;
  }

  /* ============================================
     DEVICE DETECTION
     ============================================ */
  function detectDevice() {
    const ua = navigator.userAgent;
    const width = window.innerWidth;

    let deviceType = 'desktop';
    if (width <= 768) {
      deviceType = 'mobile';
    } else if (width <= 1024) {
      deviceType = 'tablet';
    }

    return {
      type: deviceType,
      width,
      height: window.innerHeight,
      userAgent: ua,
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
      isAndroid: /Android/i.test(ua),
      isIOS: /iPhone|iPad|iPod/i.test(ua)
    };
  }

  /* ============================================
     CONTEXT DETECTION
     ============================================ */
  function getPageContext() {
    const path = window.location.pathname;

    if (path.includes('/admissions')) return 'admissions';
    if (path.includes('/contact')) return 'contact';
    if (path.includes('/about')) return 'about';
    if (path.includes('/academics')) return 'academics';
    if (path.includes('/gallery')) return 'gallery';
    if (path === '/' || path.includes('/en/') || path.includes('/hi/')) return 'home';

    return 'other';
  }

  /* ============================================
     DATA PERSISTENCE
     ============================================ */
  function saveAnalytics() {
    try {
      // Get existing analytics data
      const existingData = JSON.parse(localStorage.getItem(config.storageKey) || '[]');

      // Add current session to history
      const updatedData = [...existingData, sessionData];

      // Keep only last 100 sessions to avoid storage limits
      const trimmedData = updatedData.slice(-100);

      localStorage.setItem(config.storageKey, JSON.stringify(trimmedData));
    } catch (e) {
      console.warn('Failed to save analytics:', e);
    }
  }

  function getAnalyticsData() {
    try {
      return JSON.parse(localStorage.getItem(config.storageKey) || '[]');
    } catch (e) {
      console.warn('Failed to retrieve analytics:', e);
      return [];
    }
  }

  function clearAnalyticsData() {
    try {
      localStorage.removeItem(config.storageKey);
    } catch (e) {
      console.warn('Failed to clear analytics:', e);
    }
  }

  /* ============================================
     ANALYTICS DASHBOARD (Optional)
     ============================================ */
  function generateAnalyticsReport() {
    const allSessions = getAnalyticsData();

    const report = {
      totalSessions: allSessions.length,
      avgTimeOnPage: 0,
      avgScrollDepth: 0,
      avgEngagementScore: 0,
      topPages: {},
      deviceBreakdown: { mobile: 0, tablet: 0, desktop: 0 },
      languageBreakdown: { en: 0, hi: 0 },
      topCTAs: {},
      totalWhatsAppClicks: 0,
      exitIntents: 0
    };

    allSessions.forEach(session => {
      // Calculate averages
      report.avgTimeOnPage += session.timeOnPage || 0;
      report.avgScrollDepth += session.maxScrollDepth || 0;
      report.avgEngagementScore += session.engagementScore || 0;

      // Top pages
      const page = session.pageUrl;
      report.topPages[page] = (report.topPages[page] || 0) + 1;

      // Device breakdown
      const deviceType = session.device?.type || 'unknown';
      if (report.deviceBreakdown[deviceType] !== undefined) {
        report.deviceBreakdown[deviceType]++;
      }

      // Language breakdown
      const lang = session.lang;
      if (report.languageBreakdown[lang] !== undefined) {
        report.languageBreakdown[lang]++;
      }

      // WhatsApp clicks
      const whatsappEvents = session.events.filter(e => e.name === 'whatsapp_click');
      report.totalWhatsAppClicks += whatsappEvents.length;

      // Exit intents
      report.exitIntents += session.exitAttempts || 0;
    });

    // Calculate final averages
    if (allSessions.length > 0) {
      report.avgTimeOnPage = Math.round(report.avgTimeOnPage / allSessions.length);
      report.avgScrollDepth = Math.round(report.avgScrollDepth / allSessions.length);
      report.avgEngagementScore = Math.round(report.avgEngagementScore / allSessions.length);
    }

    return report;
  }

  /* ============================================
     PUBLIC API
     ============================================ */
  const PublicAPI = {
    trackEvent,
    getSessionData: () => sessionData,
    getAnalyticsData,
    generateReport: generateAnalyticsReport,
    clearData: clearAnalyticsData,
    getEngagementScore: calculateEngagementScore
  };

  window.AnalyticsTracker = PublicAPI;

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
