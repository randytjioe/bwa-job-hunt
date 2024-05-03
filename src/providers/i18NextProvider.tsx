"use client";

import i18n from "@/lib/i18n";
import { FC, ReactNode } from "react";
import { I18nextProvider as I8NextProvider } from "react-i18next";
interface i18NextProviderProps {
  children: ReactNode;
}

const i18NextProvider: FC<i18NextProviderProps> = ({ children }) => {
  return (
    <I8NextProvider i18n={i18n} defaultNS={"translation"}>
      {children}
    </I8NextProvider>
  );
};

export default i18NextProvider;
