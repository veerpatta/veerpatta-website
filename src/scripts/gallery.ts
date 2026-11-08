export const galleryCategories = ['all','campus','academic','sports','cultural','ncc','celebrations'] as const;
export type GalleryCategory = typeof galleryCategories[number];
export function normaliseCategory(value:string|null):GalleryCategory {
 return galleryCategories.includes(value as GalleryCategory)?value as GalleryCategory:'all';
}
export function countVisiblePhotos(categories:string[],filter:GalleryCategory):number {return categories.filter(c=>filter==='all'||c===filter).length;}
