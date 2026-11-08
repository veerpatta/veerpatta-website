import {normalizeIndianPhone} from './phone.ts';
/** Valid with HTML pattern's UnicodeSets/v semantics. Separators remain optional. */
export const nativePhonePattern=String.raw`(?:(?:\+91|91|0)[\s\-]*)?[6-9](?:[\s\-]*[0-9]){9}`;
export function bindNativeEnquiryForm(form:HTMLFormElement,hi:boolean):void {
 const phone=form.querySelector<HTMLInputElement>('input[name="phone"]');
 phone?.addEventListener('input',()=>phone.setCustomValidity(''));
 form.addEventListener('submit',event=>{
  if(event.defaultPrevented)return;
  if(phone&&!normalizeIndianPhone(phone.value)){
   event.preventDefault();phone.setCustomValidity(hi?'भारत का सही 10 अंकों वाला मोबाइल नंबर लिखें।':'Enter a valid 10-digit Indian mobile number.');phone.reportValidity();return;
  }
  phone?.setCustomValidity('');
  const button=form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if(button){button.disabled=true;button.setAttribute('aria-busy','true');}
 });
}
