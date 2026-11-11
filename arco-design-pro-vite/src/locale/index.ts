import { shallowRef } from 'vue';
import { createI18n } from 'vue-i18n';

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

type LocaleMessages = Record<string, unknown>;
type ArcoLocale = typeof import('@ekworp/arco-design-vue/es/locale/lang/zh-cn').default;

const localeLoaders: Record<string, () => Promise<{ default: LocaleMessages }>> = {
  'en-US': () => import('./en-US'),
  'zh-CN': () => import('./zh-CN'),
};

const arcoLocaleLoaders: Record<string, () => Promise<{ default: ArcoLocale }>> = {
  'en-US': () => import('@ekworp/arco-design-vue/es/locale/lang/en-us'),
  'zh-CN': () => import('@ekworp/arco-design-vue/es/locale/lang/zh-cn'),
};

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  legacy: false,
  allowComposition: true,
  messages: {},
});

export const arcoLocale = shallowRef<ArcoLocale>();

export async function loadLocale(locale: string) {
  const localeLoader = localeLoaders[locale];
  const arcoLocaleLoader = arcoLocaleLoaders[locale];
  if (!localeLoader || !arcoLocaleLoader) return;

  const [{ default: messages }, { default: componentLocale }] = await Promise.all([
    localeLoader(),
    arcoLocaleLoader(),
  ]);
  i18n.global.setLocaleMessage(locale, messages);
  arcoLocale.value = componentLocale;
}

await loadLocale(defaultLocale);

export default i18n;
