import { HetznerAction } from './common.js';

export interface Certificate {
  id: number;
  name: string;
  type: 'uploaded' | 'managed';
  certificate?: string;
  fingerprint: string;
  domain_names: string[];
  not_valid_before: string;
  not_valid_after: string;
  labels: Record<string, string>;
  created: string;
  status?: { issuance: string; renewal: string; error?: { code: string; message: string } };
  used_by: { id: number; type: string }[];
}

export interface CertificateListResponse {
  certificates: Certificate[];
  meta: { pagination: { page: number; per_page: number; previous_page: number | null; next_page: number | null; last_page: number; total_entries: number } };
}

export interface CertificateResponse {
  certificate: Certificate;
}

export interface CertificateCreateResponse {
  certificate: Certificate;
  action?: HetznerAction;
}

export interface CertificateActionResponse {
  action: HetznerAction;
}
