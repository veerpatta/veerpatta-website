import {normaliseCategory} from './gallery';
const hi=document.documentElement.lang==='hi';
const menu=document.querySelector<HTMLDetailsElement>('[data-mobile-menu]');
if(menu){
 document.addEventListener('click',e=>{if(menu.open && !menu.contains(e.target as Node)) menu.open=false;});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary')?.focus();}});
 window.matchMedia('(min-width: 1100px)').addEventListener('change',()=>{menu.open=false;});
}
const photoDialog=document.querySelector<HTMLDialogElement>('#photo-dialog');
const dialogOpeners=new WeakMap<HTMLDialogElement,HTMLElement>();
function openDialog(dialog:HTMLDialogElement,trigger:HTMLElement){
 if(typeof dialog.showModal!=='function') return false;
 if(dialog.open) return true;
 dialogOpeners.set(dialog,trigger);
 if(menu) menu.open=false;
 dialog.showModal();
 document.body.classList.add('dialog-open');
 return true;
}
function finishDialogClose(dialog:HTMLDialogElement){
 if(dialog.open) return;
 const trigger=dialogOpeners.get(dialog);
 if(!trigger) return;
 dialogOpeners.delete(dialog);
 document.body.classList.toggle('dialog-open',!!document.querySelector('dialog[open]'));
 if(trigger.isConnected) trigger.focus();
}
function closeDialog(dialog:HTMLDialogElement){dialog.close();finishDialogClose(dialog);}
for(const dialog of document.querySelectorAll<HTMLDialogElement>('dialog')) {
 dialog.querySelector('[data-dialog-close]')?.addEventListener('click',()=>closeDialog(dialog));
 dialog.addEventListener('click',e=>{if(e.target===dialog) {const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) closeDialog(dialog);}});
 dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog(dialog);});
 dialog.addEventListener('close',()=>finishDialogClose(dialog));
}
function followsNormally(event: MouseEvent) {
  return event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey;
}

for (const trigger of document.querySelectorAll<HTMLAnchorElement>('[data-photo-open]')) {
  trigger.addEventListener('click', event => {
    if (followsNormally(event) || !photoDialog || typeof photoDialog.showModal !== 'function') return;
    const img = photoDialog.querySelector('img');
    const caption = photoDialog.querySelector('figcaption');
    if (img) {
      img.src = trigger.href;
      img.alt = trigger.dataset.photoCaption || '';
    }
    if (caption) caption.textContent = trigger.dataset.photoCaption || '';
    if (openDialog(photoDialog, trigger)) event.preventDefault();
  });
}

const filters = document.querySelector<HTMLElement>('[data-enhanced-gallery]');
if (filters) {
  const chips = filters.querySelectorAll<HTMLButtonElement>('[data-gallery-filter]');
  const pictures = document.querySelectorAll<HTMLElement>('[data-gallery-category]');
  const countLabel = document.querySelector('[data-gallery-count]');

  const applyFilter = (requested: string | null) => {
    const category = normaliseCategory(requested);
    let count = 0;
    for (const picture of pictures) {
      picture.hidden = category !== 'all' && picture.dataset.galleryCategory !== category;
      if (!picture.hidden) count++;
    }
    for (const chip of chips) chip.setAttribute('aria-pressed', String(chip.dataset.galleryFilter === category));
    const unit = hi ? (count === 1 ? 'तस्वीर' : 'तस्वीरें') : (count === 1 ? 'photograph' : 'photographs');
    if (countLabel) countLabel.textContent = `${count} ${unit}`;
  };
  const readFilter = () => applyFilter(new URLSearchParams(location.search).get('category'));
  readFilter();
  filters.hidden = false;
  for (const chip of chips) {
    chip.addEventListener('click', () => {
      const category = normaliseCategory(chip.dataset.galleryFilter ?? null);
      const url = new URL(location.href);
      if (category === 'all') url.searchParams.delete('category');
      else url.searchParams.set('category', category);
      if (url.href !== location.href) history.pushState(null, '', url);
      applyFilter(category);
    });
  }
  window.addEventListener('popstate', readFilter);
}

for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-video-src]')) {
  link.addEventListener('click', event => {
    const template = link.parentElement?.querySelector<HTMLTemplateElement>('[data-video-template]');
    if (!template || followsNormally(event)) return;
    const fragment = template.content.cloneNode(true) as DocumentFragment;
    const video = fragment.querySelector('video');
    const error = fragment.querySelector<HTMLElement>('[data-video-error]');
    if (!video || !error) return;
    event.preventDefault();
    video.muted = true;
    video.addEventListener('error', () => { error.hidden = false; });
    video.addEventListener('play', () => {
      error.hidden = true;
      for (const other of document.querySelectorAll('video')) if (other !== video) other.pause();
    });
    link.replaceWith(fragment);
    template.remove();
    video.focus();
    video.play().catch(() => { error.hidden = false; });
  });
}
window.addEventListener('pageshow',()=>{for(const button of document.querySelectorAll<HTMLButtonElement>('form button[aria-busy]')){button.disabled=false;button.removeAttribute('aria-busy');}});
// Content never starts hidden. Motion is a small progressive enhancement.
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target);}},{threshold:0.1});
 for(const node of document.querySelectorAll('[data-reveal]'))observer.observe(node);
}
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
