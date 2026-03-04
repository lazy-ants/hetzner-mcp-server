import { HetznerAction } from './common.js';

export interface FloatingIp {
  id: number;
  name: string;
  description: string;
  ip: string;
  type: string;
  server: number | null;
  home_location: { id: number; name: string; description: string; country: string; city: string; latitude: number; longitude: number; network_zone: string };
  dns_ptr: { ip: string; dns_ptr: string }[];
  blocked: boolean;
  protection: { delete: boolean };
  labels: Record<string, string>;
  created: string;
}

export interface FloatingIpListResponse {
  floating_ips: FloatingIp[];
  meta: { pagination: { page: number; per_page: number; previous_page: number | null; next_page: number | null; last_page: number; total_entries: number } };
}

export interface FloatingIpResponse {
  floating_ip: FloatingIp;
}

export interface FloatingIpCreateResponse {
  floating_ip: FloatingIp;
  action: HetznerAction;
}

export interface FloatingIpActionResponse {
  action: HetznerAction;
}
