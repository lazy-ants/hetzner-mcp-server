export interface PlacementGroup {
  id: number;
  name: string;
  type: string;
  created: string;
  labels: Record<string, string>;
  servers: number[];
}

export interface PlacementGroupListResponse {
  placement_groups: PlacementGroup[];
}

export interface PlacementGroupResponse {
  placement_group: PlacementGroup;
}
