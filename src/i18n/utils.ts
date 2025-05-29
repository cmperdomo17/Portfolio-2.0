import { labels } from './ui';

const defaultLanguage = 'en';

export function useTranslations(lang: keyof typeof labels) {
    return function translate(key: keyof typeof labels[typeof lang]) {
        return labels[lang][key] || labels[defaultLanguage][key];
    };
}