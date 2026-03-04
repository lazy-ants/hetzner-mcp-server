import { HetznerAction } from './common.js';

export interface NetworkSubnet {
  type: string;
  ip_range: string;
  network_zone: string;
  gateway: string;
  vswitch_id?: number;
}

export interface NetworkRoute {
  destination: string;
  gateway: string;
}

export interface Network {
  id: number;
  name: string;
  ip_range: string;
  subnets: NetworkSubnet[];
  routes: NetworkRoute[];
  servers: number[];
  load_balancers: number[];
  labels: Record<string, string>;
  created: string;
  protection: { delete: boolean };
  expose_routes_to_vswitch: boolean;
}

export interface NetworkListResponse {
  networks: Network[];
  meta: { pagination: { page: number; per_page: number; previous_page: number | null; next_page: number | null; last_page: number; total_entries: number } };
}

export interface NetworkResponse {
  network: Network;
}

export interface NetworkActionResponse {
  action: HetznerAction;
}
