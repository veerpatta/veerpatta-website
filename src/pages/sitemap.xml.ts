import type { APIRoute } from 'astro';
import {site} from '../data/site';
export const GET:APIRoute=()=>{
 const pages=['','about','academics','admissions','beyond','digital','contact','faq','gallery','news','privacy'];
 const urls=['en','hi'].flatMap(lang=>pages.map(p=>`${site.url}/${lang}/${p?p+'/':''}`));
 for(const lang of ['en','hi'])urls.push(`${site.url}/news/2025-01-15-sports-day-${lang}/`);
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url=>`<url><loc>${url}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
