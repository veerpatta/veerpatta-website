import {bindNativeEnquiryForm} from './enquiry';
import {normaliseCategory} from './gallery';
const hi=document.documentElement.lang==='hi';
const menu=document.querySelector<HTMLDetailsElement>('[data-mobile-menu]');
if(menu){
 document.addEventListener('click',e=>{if(menu.open && !menu.contains(e.target as Node)) menu.open=false;});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary')?.focus();}});
 window.matchMedia('(min-width: 1100px)').addEventListener('change',()=>{menu.open=false;});
}
const enquiry=document.querySelector<HTMLDialogElement>('#enquiry-dialog');
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
for(const trigger of document.querySelectorAll<HTMLAnchorElement>('[data-enquiry-open]')) trigger.addEventListener('click',e=>{if(enquiry&&openDialog(enquiry,trigger))e.preventDefault();});
for(const trigger of document.querySelectorAll<HTMLAnchorElement>('[data-photo-open]')) trigger.addEventListener('click',e=>{
 if(!photoDialog) return;
 const img=photoDialog.querySelector<HTMLImageElement>('img');
 const caption=photoDialog.querySelector('figcaption');
 if(img){img.src=trigger.href;img.alt=trigger.dataset.photoCaption||'';}
 if(caption)caption.textContent=trigger.dataset.photoCaption||'';
 if(openDialog(photoDialog,trigger))e.preventDefault();
});
const chips=document.querySelectorAll<HTMLButtonElement>('[data-gallery-filter]');
const photos=document.querySelectorAll<HTMLElement>('[data-gallery-category]');
function applyGallery(updateUrl:boolean,requested:string|null){
 const category=normaliseCategory(requested);
 let count=0;
 for(const photo of photos){photo.hidden=category!=='all'&&photo.dataset.galleryCategory!==category;if(!photo.hidden)count++;}
 for(const chip of chips)chip.setAttribute('aria-pressed',String(chip.dataset.galleryFilter===category));
 const label=document.querySelector('[data-gallery-count]');
 if(label)label.textContent=`${count} ${hi?'तस्वीरें':'photographs'}`;
 if(updateUrl){const url=new URL(location.href);if(category==='all')url.searchParams.delete('category');else url.searchParams.set('category',category);history.replaceState(null,'',url);}
}
if(chips.length){applyGallery(false,new URLSearchParams(location.search).get('category'));for(const chip of chips)chip.addEventListener('click',()=>applyGallery(true,chip.dataset.galleryFilter||null));window.addEventListener('popstate',()=>applyGallery(false,new URLSearchParams(location.search).get('category')));}
for(const card of document.querySelectorAll<HTMLAnchorElement>('[data-video-src]')) card.addEventListener('click',event=>{
 event.preventDefault();
 const video=document.createElement('video');
 video.className='school-video';video.controls=true;video.playsInline=true;video.muted=true;video.preload='metadata';video.tabIndex=0;
 video.poster=card.dataset.videoPoster||'';
 video.setAttribute('aria-label',card.dataset.videoTitle||'School video');
 video.src=card.dataset.videoSrc||card.href;
 if(card.dataset.videoId==='school-story'){
  for(const lang of ['en','hi']){const track=document.createElement('track');track.kind='captions';track.label=lang==='hi'?'हिंदी':'English';track.srclang=lang;track.src=`/assets/media/videos/school-story-${lang}.vtt`;track.default=lang===(hi?'hi':'en');video.append(track);}
 }
 const error=document.createElement('p');error.className='video-error';error.hidden=true;
 const fallback=document.createElement('a');fallback.href=video.src;fallback.textContent=hi?'वीडियो सीधे खोलें':'Open the video directly';
 error.append(hi?'वीडियो नहीं चल सका। ':'This video could not play. ',fallback);
 video.addEventListener('error',()=>{error.hidden=false;});
 video.addEventListener('play',()=>{for(const other of document.querySelectorAll('video'))if(other!==video)other.pause();});
 card.replaceWith(video);video.after(error);video.focus();
 video.play().catch(()=>{error.hidden=false;});
});
for(const form of document.querySelectorAll<HTMLFormElement>('.enquiry-form')) bindNativeEnquiryForm(form,hi);
window.addEventListener('pageshow',()=>{for(const button of document.querySelectorAll<HTMLButtonElement>('form button[aria-busy]')){button.disabled=false;button.removeAttribute('aria-busy');}});
// Content never starts hidden. Motion is a small progressive enhancement.
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target);}},{threshold:0.1});
 for(const node of document.querySelectorAll('[data-reveal]'))observer.observe(node);
}
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
