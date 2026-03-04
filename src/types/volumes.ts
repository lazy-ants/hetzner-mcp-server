import { HetznerAction } from './common.js';

export interface Volume {
  id: number;
  name: string;
  size: number;
  server: number | null;
  status: string;
  location: { id: number; name: string; description: string; country: string; city: string; latitude: number; longitude: number; network_zone: string };
  format: string | null;
  linux_device: string | null;
  protection: { delete: boolean };
  labels: Record<string, string>;
  created: string;
}

export interface VolumeListResponse {
  volumes: Volume[];
  meta: { pagination: { page: number; per_page: number; previous_page: number | null; next_page: number | null; last_page: number; total_entries: number } };
}

export interface VolumeResponse {
  volume: Volume;
}

export interface VolumeCreateResponse {
  volume: Volume;
  action: HetznerAction;
  next_actions: HetznerAction[];
}

export interface VolumeActionResponse {
  action: HetznerAction;
}
