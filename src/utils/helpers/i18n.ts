import i18n, { TOptions, StringMap } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { setDefaultLocale } from 'react-datepicker';

import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export const translate = (key: string, option?: TOptions<StringMap> | undefined): string => {
  if (option) {
    return i18n.t(`${key}.message`, option);
  }

  return i18n.t(`${key}.message`);
};

export const changeLanguage = (lang: string): void => {
  i18n.changeLanguage(lang);
  setDefaultLocale(lang);
};

export default i18n;
