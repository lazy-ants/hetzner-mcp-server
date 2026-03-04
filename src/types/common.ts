export interface HetznerError {
  error: {
    code: string;
    message: string;
  };
}

export interface PaginationMeta {
  page: number;
  per_page: number;
  previous_page: number | null;
  next_page: number | null;
  last_page: number;
  total_entries: number;
}

export interface HetznerAction {
  id: number;
  command: string;
  status: string;
  progress: number;
  started: string;
  finished: string | null;
  error: { code: string; message: string } | null;
  resources: { id: number; type: string }[];
}
