'use client';

import React from 'react';
import { Claw42LocaleCtx, useClaw42LocaleState } from './useT';

export function Claw42LocaleProvider({ children }: { children: React.ReactNode }) {
  const value = useClaw42LocaleState();
  return <Claw42LocaleCtx.Provider value={value}>{children}</Claw42LocaleCtx.Provider>;
}
