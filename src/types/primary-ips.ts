import { HetznerAction } from './common.js';

export interface PrimaryIp {
  id: number;
  name: string;
  ip: string;
  type: string;
  assignee_id: number | null;
  assignee_type: string;
  datacenter: { id: number; name: string; description: string };
  dns_ptr: { ip: string; dns_ptr: string }[];
  auto_delete: boolean;
  blocked: boolean;
  protection: { delete: boolean };
  labels: Record<string, string>;
  created: string;
}

export interface PrimaryIpListResponse {
  primary_ips: PrimaryIp[];
  meta: { pagination: { page: number; per_page: number; previous_page: number | null; next_page: number | null; last_page: number; total_entries: number } };
}

export interface PrimaryIpResponse {
  primary_ip: PrimaryIp;
}

export interface PrimaryIpCreateResponse {
  primary_ip: PrimaryIp;
  action: HetznerAction;
}

export interface PrimaryIpActionResponse {
  action: HetznerAction;
}
