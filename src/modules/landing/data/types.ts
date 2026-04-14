export type CapabilityGroup = 'info' | 'trade' | 'auth' | 'platform';

export interface Capability {
  code: string;
  name: string;
  desc: string;
  group: CapabilityGroup;
}

export interface UseCase {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  prompt: string;
  cta: string;
}

export interface ComingSoonItem {
  id: string;
  label: string;
}
