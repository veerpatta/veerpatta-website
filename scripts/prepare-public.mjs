import {cpSync,mkdirSync,rmSync,statSync} from 'node:fs';
// Whitelist public media extensions, never copy notes, placeholders or tooling.
rmSync('public/assets',{recursive:true,force:true});
mkdirSync('public/assets',{recursive:true});
const publicMedia=/\.(?:webp|jpe?g|png|gif|svg|mp4|webm|vtt)$/i;
for(const dir of ['images','media'])cpSync(`assets/${dir}`,`public/assets/${dir}`,{recursive:true,filter:path=>statSync(path).isDirectory()||publicMedia.test(path)});
