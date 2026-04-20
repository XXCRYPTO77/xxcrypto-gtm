import type { Metadata } from 'next';
import Claw42LandingModule from '@/modules/claw42-landing';

export const metadata: Metadata = {
  title: 'Claw 42 · AI Trading Agent',
  description:
    'Redefine trading with AI Agents. Claw 42 turns exchange primitives into AI-callable Skills — from market data to execution.',
};

export default function Home() {
  return <Claw42LandingModule />;
}
