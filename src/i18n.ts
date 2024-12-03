import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "../public/locales/en.json";
import jpTranslation from "../public/locales/ja.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  debug: true,
  resources: {
    en: { translation: enTranslation },
    ja: { translation: jpTranslation },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
