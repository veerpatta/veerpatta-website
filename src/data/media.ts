import catalogue from './published-media.json' with { type: 'json' };

interface Bilingual {
  en: string;
  hi: string;
}

export interface SchoolPhoto {
  widths: number[];
  avifWidths?: number[];
  w: number;
  h: number;
  pos?: string;
  gallery?: string;
  alt: Bilingual;
}

export interface SchoolVideo {
  file: string;
  bytes: number;
  poster: string;
  seconds: number;
  caption: Bilingual;
  description: Bilingual;
  scenes: ({ start: number } & Bilingual)[];
}

// Staging reads this same catalogue. Unlisted originals, extra widths and
// historic event recordings stay out of the public site.
export const photos: Record<string, SchoolPhoto> = catalogue.photos;
export const videos: Record<string, SchoolVideo> = catalogue.videos;
export const galleryIds = Object.keys(photos).filter(id => photos[id].gallery);
