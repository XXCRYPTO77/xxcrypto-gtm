'use client';

import React from 'react';
import { IntegrationPath } from './components/IntegrationPath';
import { ApiMatrix } from './components/ApiMatrix';
import { SecurityTabs } from './components/SecurityTabs';
import { ExtensionCards } from './components/ExtensionCards';
import { V20Pillars } from './components/V20Pillars';

// AuditCompliance is built by Airy — lazy load to avoid import errors until delivered
let AuditCompliance: React.ComponentType | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  AuditCompliance = require('./components/AuditCompliance').default;
} catch { /* not yet delivered */ }

const HR = () => (
  <div className="mx-auto max-w-7xl px-6">
    <hr className="border-border" />
  </div>
);

export default function VisionModule() {
  return (
    <div className="space-y-0">
      {/* Phase 1–3: Integration path overview */}
      <IntegrationPath />
      <HR />

      {/* API capability matrix — M1-M18 full endpoint table */}
      <ApiMatrix />
      <HR />

      {/* Security architecture deep-dive — 4 tabs */}
      <SecurityTabs />
      <HR />

      {/* Audit & compliance (Airy) — placeholder until delivered */}
      {AuditCompliance ? (
        <>
          <AuditCompliance />
          <HR />
        </>
      ) : null}

      {/* Extension directions — E1-E5 */}
      <ExtensionCards />

      {/* v2.0 Vision — brand-color full-width closing section */}
      <V20Pillars />
    </div>
  );
}
