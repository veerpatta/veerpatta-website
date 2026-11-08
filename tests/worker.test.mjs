import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../worker.js';

const bytes = Uint8Array.from({ length: 10 }, (_, index) => index);
const videoUrl = 'https://school.example/assets/media/videos/example.mp4';

function fixture({ method = 'GET', range, url = videoUrl, status = 200, body = bytes } = {}) {
  const calls = [];
  let upstream;
  const request = new Request(url, {
    method,
    headers: range === undefined ? {} : { Range: range },
  });
  const env = {
    ASSETS: {
      async fetch(assetRequest) {
        calls.push(assetRequest);
        upstream = new Response(method === 'HEAD' ? null : body, {
          status,
          headers: {
            'Content-Type': url.endsWith('.mp4') ? 'video/mp4' : 'text/html',
            'Content-Length': String(body.byteLength ?? body.length),
            'Cache-Control': 'public, max-age=3600',
            ETag: '"example-video"',
          },
        });
        return upstream;
      },
    },
  };
  return {
    request,
    calls,
    get upstream() { return upstream; },
    run: () => worker.fetch(request, env),
  };
}

for (const { name, range, start, end } of [
  { name: 'initial Safari probe', range: 'bytes=0-1', start: 0, end: 1 },
  { name: 'middle segment', range: 'bytes=3-5', start: 3, end: 5 },
  { name: 'open-ended range', range: 'bytes=7-', start: 7, end: 9 },
  { name: 'suffix range', range: 'bytes=-3', start: 7, end: 9 },
  { name: 'end exceeding file size', range: 'bytes=7-999', start: 7, end: 9 },
  { name: 'suffix exceeding file size', range: 'bytes=-999', start: 0, end: 9 },
  { name: 'range surrounding whitespace', range: ' bytes=0-1 ', start: 0, end: 1 },
]) {
  test(`video byte range: ${name} returns the exact 206 bytes and headers`, async () => {
    const mock = fixture({ range });
    const response = await mock.run();
    assert.equal(response.status, 206);
    assert.equal(response.headers.get('Content-Range'), `bytes ${start}-${end}/${bytes.length}`);
    assert.equal(response.headers.get('Content-Length'), String(end - start + 1));
    assert.equal(response.headers.get('Accept-Ranges'), 'bytes');
    assert.equal(response.headers.get('Content-Type'), 'video/mp4');
    assert.equal(response.headers.get('Cache-Control'), 'public, max-age=3600');
    assert.equal(response.headers.get('ETag'), '"example-video"');
    assert.deepEqual(new Uint8Array(await response.arrayBuffer()), bytes.slice(start, end + 1));
    assert.equal(mock.calls.length, 1);
    assert.equal(mock.calls[0].url, videoUrl);
    assert.equal(mock.calls[0].method, 'GET');
    assert.equal(mock.calls[0].headers.get('Accept-Encoding'), 'identity');
    assert.equal(mock.calls[0].headers.get('Range'), null, 'upstream must receive the whole-file request');
  });
}

for (const range of [undefined, '', 'bytes=-', 'bytes=abc-def', 'items=0-1', 'bytes=0-1,3-5', 'bytes=0-1, 3-5', 'bytes=1.5-2']) {
  test(`missing, invalid or multiple range ${JSON.stringify(range)} falls back to the complete 200 asset`, async () => {
    const mock = fixture({ range });
    const response = await mock.run();
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Content-Range'), null);
    assert.equal(response.headers.get('Content-Length'), String(bytes.length));
    assert.equal(response.headers.get('Accept-Ranges'), 'bytes');
    assert.deepEqual(new Uint8Array(await response.arrayBuffer()), bytes);
  });
}

for (const range of ['bytes=10-', 'bytes=999-1000', 'bytes=5-3', 'bytes=-0']) {
  test(`unsatisfiable range ${range} returns an empty 416 with the full size`, async () => {
    const response = await fixture({ range }).run();
    assert.equal(response.status, 416);
    assert.equal(response.headers.get('Content-Range'), `bytes */${bytes.length}`);
    assert.equal(response.headers.get('Content-Length'), null);
    assert.equal(response.headers.get('Accept-Ranges'), 'bytes');
    assert.equal((await response.arrayBuffer()).byteLength, 0);
  });
}

test('a byte range against an empty asset returns 416 with size zero', async () => {
  const response = await fixture({ range: 'bytes=0-1', body: new Uint8Array() }).run();
  assert.equal(response.status, 416);
  assert.equal(response.headers.get('Content-Range'), 'bytes */0');
  assert.equal((await response.arrayBuffer()).byteLength, 0);
});

test('HEAD ignores Range and keeps whole-file headers without a response body', async () => {
  const mock = fixture({ method: 'HEAD', range: 'bytes=0-1' });
  const response = await mock.run();
  assert.equal(mock.calls.length, 1);
  assert.equal(mock.calls[0].method, 'HEAD');
  assert.equal(mock.calls[0].headers.get('Accept-Encoding'), 'identity');
  assert.equal(mock.calls[0].headers.get('Range'), null);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Content-Length'), String(bytes.length));
  assert.equal(response.headers.get('Content-Range'), null);
  assert.equal(response.headers.get('Accept-Ranges'), 'bytes');
  assert.equal((await response.arrayBuffer()).byteLength, 0);
});

for (const method of ['GET', 'HEAD']) {
  test(`${method} missing-video 404 is passed through unchanged, even with Range`, async () => {
    const mock = fixture({ method, range: 'bytes=0-1', status: 404, body: 'Not found' });
    const response = await mock.run();
    assert.equal(response, mock.upstream);
    assert.equal(response.status, 404);
    assert.equal(response.headers.get('Content-Range'), null);
    assert.equal(response.headers.get('Accept-Ranges'), null);
    assert.equal(await response.text(), method === 'HEAD' ? '' : 'Not found');
  });
}

test('a non-200 upstream response is not converted to a partial response', async () => {
  const mock = fixture({ range: 'bytes=0-1', status: 503, body: 'Unavailable' });
  const response = await mock.run();
  assert.equal(response, mock.upstream);
  assert.equal(response.status, 503);
  assert.equal(await response.text(), 'Unavailable');
});

test('a non-video request without a range retains the upstream page and content type', async () => {
  // Cloudflare normally bypasses the Worker for pages, per run_worker_first.
  // Exercise the handler fallback separately from that infrastructure routing.
  const html = '<!doctype html><title>School</title>';
  const mock = fixture({ url: 'https://school.example/en/', body: html });
  const response = await mock.run();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Content-Type'), 'text/html');
  assert.equal(response.headers.get('Content-Length'), String(html.length));
  assert.equal(response.headers.get('Content-Range'), null);
  assert.equal(await response.text(), html);
  assert.equal(mock.calls[0].url, 'https://school.example/en/');
});
