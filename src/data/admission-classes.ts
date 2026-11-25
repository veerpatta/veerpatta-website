import type { Lang } from './site.ts';

export const admissionClassGroups = [
  {
    name: { en: 'Early years', hi: 'पूर्व-प्राथमिक' },
    classes: ['Nursery', 'JKG', 'SKG'],
  },
  {
    name: { en: 'Primary', hi: 'प्राथमिक' },
    classes: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
  },
  {
    name: { en: 'Middle school', hi: 'उच्च प्राथमिक' },
    classes: ['Class 6', 'Class 7', 'Class 8'],
  },
  {
    name: { en: 'Secondary & senior secondary', hi: 'माध्यमिक और उच्च माध्यमिक' },
    classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
  },
] as const;

export type AdmissionClass = typeof admissionClassGroups[number]['classes'][number];

export function admissionClassName(lang: Lang, grade: AdmissionClass): string {
  switch (grade) {
    case 'Nursery': return lang === 'hi' ? 'नर्सरी' : 'Nursery';
    case 'JKG': return lang === 'hi' ? 'जूनियर केजी' : 'Junior KG';
    case 'SKG': return lang === 'hi' ? 'सीनियर केजी' : 'Senior KG';
    default: return lang === 'hi' ? grade.replace('Class ', 'कक्षा ') : grade;
  }
}
