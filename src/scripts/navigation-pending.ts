/** Observe native page loads. Links keep the browser's normal history, scroll and cancellation. */
const delay = 275;

export function installNavigationPending() {
  const bar = document.querySelector<HTMLElement>('[data-nav-pending]');
  const status = document.querySelector<HTMLElement>('[data-nav-announcement]');
  const template = bar?.querySelector('template');
  if (!bar || !status || !template) return;

  let timer: number | undefined;
  const clear = () => {
    window.clearTimeout(timer);
    bar.hidden = true;
    status.textContent = '';
  };
  const isPage = (url: URL) => url.origin === location.origin &&
    /^\/(en|hi|news)\//.test(url.pathname) &&
    (url.pathname !== location.pathname || url.search !== location.search);
  const pending = () => {
    clear();
    timer = window.setTimeout(() => {
      if (!bar.querySelector('picture')) bar.append(template.content.cloneNode(true));
      bar.hidden = false;
      status.textContent = bar.dataset.message ?? '';
    }, delay);
  };
  type NavigationStart = Event & {destination:{url:string};downloadRequest:string|null;signal:AbortSignal};
  const navigation = (window as Window & {navigation?:EventTarget}).navigation;
  if (navigation) {
    navigation.addEventListener('navigate', event => {
      const change = event as NavigationStart;
      clear();
      if (change.downloadRequest !== null || !isPage(new URL(change.destination.url))) return;
      pending();
      change.signal.addEventListener('abort', clear, {once:true});
    });
    navigation.addEventListener('navigateerror', clear);
    navigation.addEventListener('navigatesuccess', clear);
  } else {
    window.addEventListener('click', event => {
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey ||
          event.altKey || event.shiftKey || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      if (isPage(new URL(link.href))) pending();
    });
  }
  window.addEventListener('pageshow',clear);
  window.addEventListener('pagehide',clear);
  window.addEventListener('keydown', event => { if (event.key === 'Escape') clear(); });
}
if (typeof document !== 'undefined') installNavigationPending();
