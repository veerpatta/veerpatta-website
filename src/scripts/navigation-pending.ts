/** Full-document navigation stays native, including with JavaScript disabled. */
export function installNavigationPending() {
  const notice = document.querySelector<HTMLElement>('[data-nav-pending]');
  const announcement = document.querySelector<HTMLElement>('[data-nav-announcement]');
  if (!notice || !announcement) return;

  const mark = notice.querySelector<HTMLImageElement>('[data-wait-mark]');
  let delay: number | undefined;
  let expiry: number | undefined;
  const clear = () => {
    window.clearTimeout(delay);
    window.clearTimeout(expiry);
    notice.hidden = true;
    announcement.textContent = '';
  };
  document.addEventListener('click', (event: MouseEvent) => {
    const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
    if (!anchor || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    if (anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
    const destination = new URL(anchor.href, location.href);
    if (destination.origin !== location.origin || !/^\/(?:en|hi|news)\//.test(destination.pathname)) return;
    if (destination.pathname === location.pathname && destination.search === location.search) return;
    clear();
    delay = window.setTimeout(() => {
      if (mark) mark.src = matchMedia('(prefers-reduced-motion: reduce)').matches
        ? '/assets/images/vpps-emblem-48.png'
        : '/assets/images/vpps-emblem-wait.gif';
      notice.hidden = false;
      announcement.textContent = notice.dataset.message || '';
    }, 500);
    expiry = window.setTimeout(clear, 15000);
  });
  window.addEventListener('pagehide', clear);
  window.addEventListener('pageshow', clear);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') clear(); });
}
if (typeof document !== 'undefined') installNavigationPending();
