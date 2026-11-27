import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';

test('a worker update caches both admissions pages before replacing the previous worker', async () => {
  const listeners = {};
  const cachedPaths = new Set();
  let completeDownload;
  let readyToReplace = false;
  const download = new Promise(resolve => { completeDownload = resolve; });
  const cache = {
    async addAll(paths) {
      await download;
      for (const path of paths) cachedPaths.add(path);
    }
  };
  const source = fs.readFileSync('public/sw.js', 'utf8');
  vm.runInNewContext(source, {
    self: {
      addEventListener(type, listener) { listeners[type] = listener; },
      skipWaiting() { readyToReplace = true; }
    },
    caches: { open: async () => cache }
  });

  let install;
  listeners.install({ waitUntil(promise) { install = promise; } });
  assert.equal(readyToReplace, false);
  completeDownload();
  await install;
  for (const lang of ['en', 'hi']) {
    assert.ok(cachedPaths.has(`/${lang}/`));
    assert.ok(cachedPaths.has(`/${lang}/admissions/`));
  }
  assert.equal(readyToReplace, true);
});

test('service worker clones navigation before asynchronous cache opens and keeps write alive',async()=>{
 const listeners={},waits=[],writes=[];let release;const gate=new Promise(resolve=>release=resolve);
 const source=fs.readFileSync('public/sw.js','utf8');
 vm.runInNewContext(source,{URL,Promise,self:{location:{origin:'https://school.example'},addEventListener:(k,fn)=>listeners[k]=fn},fetch:async()=>new Response('new page',{status:200}),caches:{open:()=>gate.then(()=>({put:async(req,res)=>writes.push(await res.text())}))}});
 let responsePromise;listeners.fetch({request:new Request('https://school.example/en/'),respondWith(p){responsePromise=p;},waitUntil(p){waits.push(p);}});
 // Request.mode cannot be 'navigate' in Node, so use a view exposing that browser mode.
 listeners.fetch({request:{method:'GET',url:'https://school.example/en/',mode:'navigate',headers:new Headers()},respondWith(p){responsePromise=p;},waitUntil(p){waits.push(p);}});
 const response=await responsePromise;assert.equal(await response.text(),'new page');release();await Promise.all(waits);assert.deepEqual(writes,['new page']);assert.equal(waits.length,1);
});
