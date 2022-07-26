import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { enUS, enGB, nl } from 'date-fns/locale';
import english from './assets/locales/en.json';
import dutch from './assets/locales/nl.json';

registerLocale('en', enUS);
registerLocale('en-US', enUS);
registerLocale('en-GB', enGB);
registerLocale('nl', nl);
registerLocale('nl-NL', nl);
registerLocale('nl-BE', nl);

const resources = {
  en: { translation: english },
  nl: { translation: dutch },
};

const updateHTMLLang = (lng) => {
  if (document.documentElement) {
    document.documentElement.setAttribute('lang', lng);
  }
  setDefaultLocale(lng);
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    saveMissing: true,
    resources,
    fallbackLng: 'en',

    nonExplicitSupportedLngs: true, // allow full locales pass as a general one, e.g. en-US will pass as en
    cleanCode: true, // make sure EN language code is treated as en
    supportedLngs: ['en', 'nl'],
    preload: ['en', 'nl'],

    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: './assets/locales/{{ns}}.json',
    },

    // allow keys to be phrases having `:`, `.`
    nsSeparator: false,
    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => updateHTMLLang);

i18n.on('missingKey', (_lngs, _namespace, key, res) => {
  if (key.trim() !== '' || res.trim() !== '') {
    console.warn('missing translation key found:', key);
    // Add the key so that it doesn't crash
    i18n.addResource(i18n.language, key, res);
  }
});

i18n.on('languageChanged', updateHTMLLang);

export default i18n;
