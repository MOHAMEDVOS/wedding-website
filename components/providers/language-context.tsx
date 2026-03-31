"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ar" | "en";

interface LanguageContextValue {
    lang: Language;
    toggle: () => void;
    isAr: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
    lang: "ar",
    toggle: () => {},
    isAr: true,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Language>("ar");

    const toggle = () => setLang((l) => (l === "ar" ? "en" : "ar"));

    return (
        <LanguageContext.Provider value={{ lang, toggle, isAr: lang === "ar" }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLang() {
    return useContext(LanguageContext);
}
