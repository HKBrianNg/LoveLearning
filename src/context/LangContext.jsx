import { createContext, useContext, useState, useEffect } from 'react';
import { messages } from '../locales';

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('appLang') || 'zh-CN';
  });

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('appLang', newLang);
  };

  const t = messages[lang];

  return (
    <LangContext.Provider value={{ lang, t, changeLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}