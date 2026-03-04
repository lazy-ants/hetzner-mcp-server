export interface Datacenter {
  id: number;
  name: string;
  description: string;
  location: Location;
  server_types: {
    supported: number[];
    available: number[];
    available_for_migration: number[];
  };
}

export interface Location {
  id: number;
  name: string;
  description: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  network_zone: string;
}

export interface ServerType {
  id: number;
  name: string;
  description: string;
  cores: number;
  memory: number;
  disk: number;
  deprecated: boolean;
  prices: { location: string; price_hourly: { net: string; gross: string }; price_monthly: { net: string; gross: string } }[];
  storage_type: string;
  cpu_type: string;
  architecture: string;
}
