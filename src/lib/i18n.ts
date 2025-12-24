import 'server-only';

export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'es', 'hi', 'pt'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

const dictionaries = {
    en: () => import('@/dictionaries/en.json').then((module) => module.default),
    es: () => import('@/dictionaries/es.json').then((module) => module.default),
    hi: () => import('@/dictionaries/hi.json').then((module) => module.default),
    pt: () => import('@/dictionaries/pt.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale]?.() ?? dictionaries.en();
};
