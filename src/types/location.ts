export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface LocationApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Location[];
}

export interface LocationFilters {
  name?: string;
  type?: string;
  dimension?: string;
}