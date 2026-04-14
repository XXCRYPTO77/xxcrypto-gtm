import { useLocale } from '@/i18n/LocaleContext';
import zh from './zh.json';
import en from './en.json';

const DICTS = { zh, en } as const;

export type LandingDict = typeof zh;

export function useLandingT(): LandingDict {
  const { locale } = useLocale();
  return DICTS[locale] ?? DICTS.zh;
}
