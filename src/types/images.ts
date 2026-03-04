import { HetznerAction } from './common.js';

export interface Image {
  id: number;
  type: string;
  status: string;
  name: string | null;
  description: string;
  image_size: number | null;
  disk_size: number;
  created: string;
  created_from: { id: number; name: string } | null;
  bound_to: number | null;
  os_flavor: string;
  os_version: string | null;
  architecture: string;
  rapid_deploy: boolean;
  protection: { delete: boolean };
  deprecated: string | null;
  labels: Record<string, string>;
}

export interface ImageListResponse {
  images: Image[];
}

export interface ImageResponse {
  image: Image;
}

export interface CreateImageResponse {
  image: Image;
  action: HetznerAction;
}
