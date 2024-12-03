import React, { createContext, useContext, useState } from 'react';
import nookies from 'nookies';
import i18n from '../../../i18n';
import { useRouter } from 'next/router';

interface LanguageCurrencyContextProps {
  language: string;
  currency: string;
  currencySymbol: string;
  setLanguage: (language: string) => void;
  setCurrency: (currency: string) => void;
}

export const LANGUAGES = [
  { code: 'en', name: 'Eng', fullName: 'English' },
  { code: 'ja', name: 'Ja', fullName: 'Japanese' },
];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

const LanguageCurrencyContext = createContext<
  LanguageCurrencyContextProps | undefined
>(undefined);

export const LanguageCurrencyProvider: React.FC<{
  children: React.ReactNode;
  initialLanguage: string;
  initialCurrency: string;
}> = ({ children, initialLanguage, initialCurrency }) => {
  const router = useRouter();
  const { asPath } = router;
  const [language, setLanguageState] = useState<string>(initialLanguage);
  const [currency, setCurrencyState] = useState<string>(initialCurrency);
  const [currencySymbol, setCurrencySymbol] = useState<string>('$');

  const setLanguage = (newLanguage: any) => {
    setLanguageState(newLanguage);
    nookies.set(null, 'language', newLanguage, { path: '/' });
    i18n.changeLanguage(newLanguage);
    router.replace(asPath, asPath, { locale: newLanguage });
  };

  const setCurrency = (newCurrency: any) => {
    setCurrencyState(newCurrency);
    nookies.set(null, 'currency', newCurrency, { path: '/' });
    router.reload();
  };
  return (
    <LanguageCurrencyContext.Provider
      value={{ language, currency, setLanguage, setCurrency, currencySymbol }}
    >
      {children}
    </LanguageCurrencyContext.Provider>
  );
};

export const useLanguageCurrency = (): LanguageCurrencyContextProps => {
  const context = useContext(LanguageCurrencyContext);
  if (!context) {
    throw new Error(
      'useLanguageCurrency must be used within a LanguageCurrencyProvider'
    );
  }
  return context;
};
