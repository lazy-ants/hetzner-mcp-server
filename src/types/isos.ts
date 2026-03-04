export interface Iso {
  id: number;
  name: string;
  description: string;
  type: string;
  architecture: string | null;
  deprecated: string | null;
}

export interface IsoListResponse {
  isos: Iso[];
}

export interface IsoResponse {
  iso: Iso;
}
