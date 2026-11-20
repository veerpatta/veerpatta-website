import {normalizeIndianPhone} from './phone';
export const received = (ok:boolean, json:unknown):boolean => ok && typeof json==='object' && json!==null && 'ok' in json && json.ok===true;
if(typeof document!=='undefined') for(const form of document.querySelectorAll<HTMLFormElement>('[data-campaign-form]')) {
 if(form.dataset.receiptBound) continue;form.dataset.receiptBound='true';
 const button=form.querySelector<HTMLButtonElement>('[type=submit]')!, fieldset=form.querySelector('fieldset')!,status=form.querySelector<HTMLElement>('[data-campaign-status]')!,phone=form.elements.namedItem('phone') as HTMLInputElement, guardian=(form.elements.namedItem('guardian')||form.elements.namedItem('parent')) as HTMLInputElement;
 const hi=form.dataset.lang==='hi'; let busy=false;
 [phone,guardian].forEach(el=>el.addEventListener('input',()=>el.setCustomValidity('')));
 form.addEventListener('submit',async e=>{
  e.preventDefault();if(busy)return;
  const normalized=normalizeIndianPhone(phone.value),name=guardian.value.trim();
  if(name.length<2){guardian.setCustomValidity(hi?'अभिभावक का नाम लिखें।':'Enter the parent or guardian’s name.');guardian.reportValidity();return;}
  if(!normalized){phone.setCustomValidity(hi?'सही भारतीय मोबाइल नंबर लिखें।':'Enter a valid Indian mobile number.');phone.reportValidity();return;}
  if(!form.reportValidity())return;
  const data=new FormData(form);data.set('phone',normalized);data.set(guardian.name,name);
  busy=true;fieldset.disabled=true;button.disabled=true;form.setAttribute('aria-busy','true');status.textContent='';
  const pending=window.setTimeout(()=>{status.textContent=hi?'पूछताछ भेजी जा रही है…':'Sending your enquiry…';},275);
  const controller=new AbortController(),timer=window.setTimeout(()=>controller.abort(),25_000);
  try{const response=await fetch(form.action,{method:'POST',headers:{Accept:'application/json'},body:data,signal:controller.signal});if(!received(response.ok,await response.json()))throw new Error('Unconfirmed');
   form.reset();status.textContent=hi?'आपकी पूछताछ भेज दी गई है। प्रवेश या आने का समय अभी पक्का नहीं है।':'Your enquiry was sent. This does not confirm admission or a visit.'; document.dispatchEvent(new Event('vpps:enquiry-received'));
  }catch{status.textContent=hi?'पूछताछ मिलने की पुष्टि नहीं हुई। आपका विवरण यहीं है। दोबारा भेजने से पहले कार्यालय में फ़ोन करें।':'We could not confirm receipt. Your details are still here. Call the office before sending again.';}
  finally{clearTimeout(pending);clearTimeout(timer);busy=false;fieldset.disabled=false;button.disabled=false;form.removeAttribute('aria-busy');status.focus();}
 });
}
