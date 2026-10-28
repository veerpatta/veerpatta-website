// Byte-range support for the site's video clips.
//
// Workers static assets answer every request with the whole file and
// ignore the Range header. Android and desktop browsers cope with that,
// but Safari on iPhone fetches video in ranges and will not play a clip
// served any other way. wrangler.jsonc runs this script first only for
// /assets/media/videos/*; every other path is still served straight from
// the asset store, without running any code.

const SINGLE_RANGE = /^bytes=(\d*)-(\d*)$/;

export default {
  async fetch(request, env) {
    // Always ask the asset store for the whole, unencoded file.
    const asset = await env.ASSETS.fetch(new Request(request.url, {
      method: request.method === 'HEAD' ? 'HEAD' : 'GET',
      headers: { 'Accept-Encoding': 'identity' }
    }));
    if (asset.status !== 200) return asset;

    const headers = new Headers(asset.headers);
    headers.set('Accept-Ranges', 'bytes');

    const range = request.method === 'GET' && SINGLE_RANGE.exec((request.headers.get('Range') || '').trim());
    if (!range || (range[1] === '' && range[2] === '')) {
      return new Response(asset.body, { status: 200, headers });
    }

    const body = await asset.arrayBuffer();
    const size = body.byteLength;
    let start;
    let end;
    if (range[1] === '') {
      // "bytes=-N": the last N bytes.
      start = Math.max(0, size - Number(range[2]));
      end = size - 1;
    } else {
      start = Number(range[1]);
      end = range[2] === '' ? size - 1 : Math.min(Number(range[2]), size - 1);
    }

    if (start >= size || start > end) {
      headers.set('Content-Range', `bytes */${size}`);
      headers.delete('Content-Length');
      return new Response(null, { status: 416, headers });
    }

    headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
    headers.set('Content-Length', String(end - start + 1));
    return new Response(body.slice(start, end + 1), { status: 206, headers });
  }
};
