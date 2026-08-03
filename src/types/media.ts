// src/types/media.ts

export interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;

  path?: string | null;

  width: number | null;
  height: number | null;

  size: number;
  sizeInBytes?: number;

  url: string;
}

export interface MediaFormats {
  thumbnail?: MediaFormat;
  small?: MediaFormat;
  medium?: MediaFormat;
  large?: MediaFormat;
}

export interface Media {
  id: number;
  documentId?: string;

  name?: string;

  url: string;

  alternativeText?: string | null;
  caption?: string | null;

  width?: number | null;
  height?: number | null;

  ext?: string;
  mime?: string;

  size?: number;

  hash?: string;

  previewUrl?: string | null;

  provider?: string;
  provider_metadata?: unknown;

  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;

  formats?: MediaFormats;
}
