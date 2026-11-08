import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
test('service worker clones navigation before asynchronous cache opens and keeps write alive',async()=>{
 const listeners={},waits=[],writes=[];let release;const gate=new Promise(resolve=>release=resolve);
 const source=fs.readFileSync('public/sw.js','utf8');
 vm.runInNewContext(source,{URL,Promise,self:{location:{origin:'https://school.example'},addEventListener:(k,fn)=>listeners[k]=fn},fetch:async()=>new Response('new page',{status:200}),caches:{open:()=>gate.then(()=>({put:async(req,res)=>writes.push(await res.text())}))}});
 let responsePromise;listeners.fetch({request:new Request('https://school.example/en/'),respondWith(p){responsePromise=p;},waitUntil(p){waits.push(p);}});
 // Request.mode cannot be 'navigate' in Node, so use a view exposing that browser mode.
 listeners.fetch({request:{method:'GET',url:'https://school.example/en/',mode:'navigate',headers:new Headers()},respondWith(p){responsePromise=p;},waitUntil(p){waits.push(p);}});
 const response=await responsePromise;assert.equal(await response.text(),'new page');release();await Promise.all(waits);assert.deepEqual(writes,['new page']);assert.equal(waits.length,1);
});
