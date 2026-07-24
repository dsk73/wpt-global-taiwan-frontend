export interface StrapiImage {
  id: number;

  url: string;

  alternativeText?: string;

  width: number;

  height: number;
}

export interface ApiResponse<T> {
  data: T;

  meta: Record<string, unknown>;
}