import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import tc from './locales/tc.json';
import sc from './locales/sc.json';

const resources = {
  en: { translation: en },
  tc: { translation: tc },
  sc: { translation: sc },
};

function getInitialLanguage() {
  try {
    const raw = localStorage.getItem('weather-app-settings');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.language) return parsed.language;
    }
  } catch {
    // ignore
  }
  return 'en';
}

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
