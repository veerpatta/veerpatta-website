import test from 'node:test';
import assert from 'node:assert/strict';
import {bindNativeEnquiryForm, nativePhonePattern} from '../src/scripts/enquiry.ts';
class MockForm extends EventTarget{
 button={disabled:false,attrs:new Map<string,string>(),setAttribute(k:string,v:string){this.attrs.set(k,v);}};
 input={value:'9413748575',message:'',setCustomValidity(v:string){this.message=v;},reportValidity(){return !this.message;},addEventListener(){}};
 querySelector(selector:string){return selector.includes('phone')?this.input:this.button;}
}
test('native submit handler leaves canceled wizard or invalid submissions enabled',()=>{
 const form=new MockForm();bindNativeEnquiryForm(form as unknown as HTMLFormElement,false);const event=new Event('submit',{cancelable:true});event.preventDefault();form.dispatchEvent(event);assert.equal(form.button.disabled,false);assert.equal(form.button.attrs.has('aria-busy'),false);
});
test('invalid native phone stops submission without disabling Send',()=>{
 const form=new MockForm();form.input.value='----------';bindNativeEnquiryForm(form as unknown as HTMLFormElement,false);const event=new Event('submit',{cancelable:true});form.dispatchEvent(event);assert.equal(event.defaultPrevented,true);assert.equal(form.button.disabled,false);assert.match(form.input.message,/10-digit/);
});
test('valid native enquiry becomes pending only when it submits',()=>{
 const form=new MockForm();bindNativeEnquiryForm(form as unknown as HTMLFormElement,false);const event=new Event('submit',{cancelable:true});form.dispatchEvent(event);assert.equal(event.defaultPrevented,false);assert.equal(form.button.disabled,true);assert.equal(form.button.attrs.get('aria-busy'),'true');
});
test('native phone regex is valid under HTML v semantics and rejects punctuation',()=>{
 const pattern=new RegExp(`^(?:${nativePhonePattern})$`,'v');for(const p of ['9413748575','+91 94137 48575','091?']) assert.equal(pattern.test(p),p!=='091?');assert.equal(pattern.test('----------'),false);assert.equal(pattern.test('1234567890'),false);
});
