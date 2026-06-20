import { createContext, useContext } from 'react';
import type { Lang } from './translations';

export const LangContext = createContext<Lang>('fr');
export const useLang = () => useContext(LangContext);
