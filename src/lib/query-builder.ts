//src/lib/query-builder.ts

/**
 * ------------------------------------------------------------
 * Strapi Query Builder
 * ------------------------------------------------------------
 * Generates URLSearchParams for Strapi REST API.
 *
 * Supports:
 * - locale
 * - populate
 * - filters
 * - sort
 * - fields
 * - pagination
 * - publicationState
 * ------------------------------------------------------------
 */

import { DEFAULT_LOCALE } from "@/config/languages";

/* ---------------------------------------------------------- */
/* Types */
/* ---------------------------------------------------------- */

export interface PopulateObject {
  [key: string]: Populate;
}

export type Populate =
  | true
  | "*"
  | string[]
  | PopulateObject;

export interface PaginationOptions {
  page?: number;
  pageSize?: number;
  start?: number;
  limit?: number;
}

export interface QueryOptions {
  locale?: string;

  populate?: Populate;

  fields?: string[];

  filters?: Record<string, unknown>;

  sort?: string[];

  pagination?: PaginationOptions;

  publicationState?: "live" | "preview";
}

/* ---------------------------------------------------------- */
/* Helpers */
/* ---------------------------------------------------------- */

function appendPopulate(
  params: URLSearchParams,
  populate: Populate,
  parent = "populate",
): void {
  if (populate === "*") {
    params.append(parent, "*");
    return;
  }

  if (populate === true) {
    params.append(parent, "true");
    return;
  }

  if (Array.isArray(populate)) {
    populate.forEach((field, index) => {
      params.append(`${parent}[${index}]`, field);
    });

    return;
  }

  Object.entries(populate).forEach(([key, value]) => {
    const current = `${parent}[${key}]`;

    if (value === true) {
      params.append(current, "true");
      return;
    }

    if (value === "*") {
      params.append(current, "*");
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((field, index) => {
        params.append(`${current}[${index}]`, field);
      });

      return;
    }

    appendPopulate(params, value, current);
  });
}

function appendFields(
  params: URLSearchParams,
  fields: string[],
): void {
  fields.forEach((field, index) => {
    params.append(`fields[${index}]`, field);
  });
}

function appendSort(
  params: URLSearchParams,
  sort: string[],
): void {
  sort.forEach((value, index) => {
    params.append(`sort[${index}]`, value);
  });
}

function appendPagination(
  params: URLSearchParams,
  pagination: PaginationOptions,
): void {
  Object.entries(pagination).forEach(([key, value]) => {
    if (value !== undefined) {
      params.append(`pagination[${key}]`, String(value));
    }
  });
}

function appendFilters(
  params: URLSearchParams,
  filters: Record<string, unknown>,
  parent = "filters",
): void {
  Object.entries(filters).forEach(([key, value]) => {
    const current = `${parent}[${key}]`;

    if (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      appendFilters(
        params,
        value as Record<string, unknown>,
        current,
      );
      return;
    }

    params.append(current, String(value));
  });
}

/* ---------------------------------------------------------- */
/* Public */
/* ---------------------------------------------------------- */

export function buildQuery(
  options: QueryOptions = {},
): string {
  const params = new URLSearchParams();

  params.append(
    "locale",
    options.locale ?? DEFAULT_LOCALE,
  );

  if (options.populate) {
    appendPopulate(params, options.populate);
  }

  if (options.fields?.length) {
    appendFields(params, options.fields);
  }

  if (options.filters) {
    appendFilters(params, options.filters);
  }

  if (options.sort?.length) {
    appendSort(params, options.sort);
  }

  if (options.pagination) {
    appendPagination(params, options.pagination);
  }

  if (options.publicationState) {
    params.append(
      "publicationState",
      options.publicationState,
    );
  }

  return params.toString();
}