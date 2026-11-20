/** Full-document navigation stays native. This never delays or intercepts the link. */
const waitMs=275;
export function installNavigationPending(){
 const bar=document.querySelector<HTMLElement>('[data-nav-pending]'),live=document.querySelector<HTMLElement>('[data-nav-announcement]');
 if(!bar||!live)return;
 let timer:number|undefined,reset:number|undefined;
 const clear=()=>{clearTimeout(timer);clearTimeout(reset);bar.hidden=true;live.textContent='';};
 document.addEventListener('click',(e:MouseEvent)=>{
  const a=e.target instanceof Element?e.target.closest<HTMLAnchorElement>('a[href]'):null;
  if(!a||e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||a.hasAttribute('download')||(a.target&&a.target!=='_self'))return;
  const dest=new URL(a.href,location.href);
  if(!/^https?:$/.test(dest.protocol)||dest.origin!==location.origin||!/^\/(?:en|hi|news)\//.test(dest.pathname)||(dest.pathname===location.pathname&&dest.search===location.search))return;
  clear();timer=window.setTimeout(()=>{bar.hidden=false;live.textContent=bar.dataset.message||'';},waitMs);
  reset=window.setTimeout(clear,15000);
 });
 window.addEventListener('pagehide',clear);window.addEventListener('pageshow',clear);
 document.addEventListener('keydown',e=>{if(e.key==='Escape')clear();});
}
if(typeof document!=='undefined')installNavigationPending();
