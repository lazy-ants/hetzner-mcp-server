import { HetznerAction } from './common.js';

export interface FirewallRule {
  direction: 'in' | 'out';
  protocol: 'tcp' | 'udp' | 'icmp' | 'esp' | 'gre';
  port?: string;
  source_ips?: string[];
  destination_ips?: string[];
  description?: string;
}

export interface FirewallAppliedTo {
  type: 'server' | 'label_selector';
  server?: { id: number };
  label_selector?: { selector: string };
}

export interface Firewall {
  id: number;
  name: string;
  rules: FirewallRule[];
  applied_to: FirewallAppliedTo[];
  labels: Record<string, string>;
  created: string;
}

export interface FirewallListResponse {
  firewalls: Firewall[];
  meta: { pagination: { page: number; per_page: number; previous_page: number | null; next_page: number | null; last_page: number; total_entries: number } };
}

export interface FirewallResponse {
  firewall: Firewall;
}

export interface FirewallActionResponse {
  actions: HetznerAction[];
}
