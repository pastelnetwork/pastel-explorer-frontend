import i18n, { TOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { setDefaultLocale } from 'react-datepicker';

import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export const translate = (key: string, option?: TOptions | undefined): string => {
  if (option) {
    return i18n.t(`${key}.message`, {
      ...option,
      defaultValue: '<span class="skeleton-text"></span>',
    }) as string;
  }

  return i18n.t(`${key}.message`, { defaultValue: '<span class="skeleton-text"></span>' });
};

export const translateDropdown = (key: string, option?: TOptions | undefined): string => {
  if (option) {
    return i18n.t(`${key}.message`, { ...option, defaultValue: '' }) as string;
  }

  return i18n.t(`${key}.message`, { defaultValue: '' });
};

export const changeLanguage = (lang: string): void => {
  i18n.changeLanguage(lang);
  setDefaultLocale(lang);
};

export default i18n;
