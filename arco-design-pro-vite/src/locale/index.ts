import { createI18n } from 'vue-i18n';
import en from './en-US';
import cn from './zh-CN';

export const LOCALE_OPTIONS = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
];

const savedLocale = localStorage.getItem('arco-locale');
const browserLocale = navigator.language?.toLowerCase() || '';
const defaultLocale =
  savedLocale === 'zh-CN' || savedLocale === 'en-US'
    ? savedLocale
    : browserLocale.startsWith('zh')
      ? 'zh-CN'
      : 'en-US';

document.documentElement.lang = defaultLocale;

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  legacy: false,
  allowComposition: true,
  messages: {
    'en-US': en,
    'zh-CN': cn,
  },
});

export default i18n;
