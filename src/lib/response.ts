/**
 * ------------------------------------------------------------
 * Strapi Response Utilities
 * ------------------------------------------------------------
 * Normalizes Strapi API responses and provides
 * helper utilities for extracting data, meta,
 * pagination, and error information.
 * ------------------------------------------------------------
 */

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination?: Pagination;
  [key: string]: unknown;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: Meta;
  error?: unknown;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: Meta;
  error?: unknown;
}

export function normalizeSingle<T>(
  response: StrapiResponse<T>
): T {
  return response.data;
}

export function normalizeCollection<T>(
  response: StrapiCollectionResponse<T>
): T[] {
  return response.data;
}

export function extractMeta(
  response: {
    meta?: Meta;
  }
): Meta | undefined {
  return response.meta;
}

export function extractPagination(
  response: {
    meta?: Meta;
  }
): Pagination | undefined {
  return response.meta?.pagination;
}

export function hasError(
  response: {
    error?: unknown;
  }
): boolean {
  return Boolean(response.error);
}

export function getError(
  response: {
    error?: unknown;
  }
): unknown {
  return response.error;
}

export function isCollectionResponse<T>(
  response: unknown
): response is StrapiCollectionResponse<T> {
  return (
    typeof response === "object" &&
    response !== null &&
    Array.isArray((response as StrapiCollectionResponse<T>).data)
  );
}

export function isSingleResponse<T>(
  response: unknown
): response is StrapiResponse<T> {
  return (
    typeof response === "object" &&
    response !== null &&
    !Array.isArray((response as StrapiResponse<T>).data)
  );
}