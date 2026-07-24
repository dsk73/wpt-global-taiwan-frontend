export const BREAKPOINTS = {
  xs: 480,

  sm: 640,

  md: 768,

  lg: 1024,

  xl: 1280,

  "2xl": 1536,
} as const;

export const MEDIA_QUERY = {
  mobile: `(max-width:${BREAKPOINTS.md - 1}px)`,

  tablet: `(min-width:${BREAKPOINTS.md}px)`,

  desktop: `(min-width:${BREAKPOINTS.lg}px)`,

  wide: `(min-width:${BREAKPOINTS.xl}px)`,
} as const;