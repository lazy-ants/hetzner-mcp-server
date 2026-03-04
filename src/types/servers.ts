import { HetznerAction } from './common.js';

export interface ServerPublicNet {
  ipv4: { ip: string; blocked: boolean; dns_ptr: string } | null;
  ipv6: { ip: string; blocked: boolean; dns_ptr: { ip: string; dns_ptr: string }[] } | null;
  floating_ips: number[];
  firewalls: { id: number; status: string }[];
}

export interface ServerPrivateNet {
  network: number;
  ip: string;
  alias_ips: string[];
  mac_address: string;
}

export interface Server {
  id: number;
  name: string;
  status: string;
  public_net: ServerPublicNet;
  private_net: ServerPrivateNet[];
  server_type: { id: number; name: string; description: string };
  datacenter: { id: number; name: string; description: string };
  image: { id: number; name: string; description: string } | null;
  iso: { id: number; name: string; description: string } | null;
  rescue_enabled: boolean;
  locked: boolean;
  outgoing_traffic: number | null;
  ingoing_traffic: number | null;
  included_traffic: number;
  protection: { delete: boolean; rebuild: boolean };
  labels: Record<string, string>;
  created: string;
  load_balancers: number[];
  placement_group: { id: number; name: string; type: string } | null;
}

export interface ServerListResponse {
  servers: Server[];
  meta: { pagination: { page: number; per_page: number; previous_page: number | null; next_page: number | null; last_page: number; total_entries: number } };
}

export interface ServerResponse {
  server: Server;
}

export interface ServerCreateResponse {
  server: Server;
  action: HetznerAction;
  root_password: string | null;
  next_actions: HetznerAction[];
}

export interface ServerActionResponse {
  action: HetznerAction;
}

export interface ServerRescueResponse {
  action: HetznerAction;
  root_password: string;
}

export interface ServerMetricsResponse {
  metrics: {
    start: string;
    end: string;
    step: number;
    time_series: Record<string, { values: [number, string][] }>;
  };
}
