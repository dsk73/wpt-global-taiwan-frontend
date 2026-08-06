/**
 * ------------------------------------------------------------
 * Strapi API Endpoints
 * ------------------------------------------------------------
 * Centralized API endpoints used throughout the application.
 * Never hardcode endpoint strings inside services.
 * ------------------------------------------------------------
 */

export const ENDPOINTS = {
  HERO: "/hero-slides",

  ACTIVITIES: "/activities",

  AMBASSADORS: "/brand-ambassadors",

  PAYMENT_METHODS: "/payment-methods",

  FAQ: "/faqs",

  CONTENT: "/contents",

  SETTINGS: "/website-setting",

  FOOTER: "/footer",

  ABOUT: "/about-page",

  DOWNLOAD: "/download-page",

  COMMUNITY_PAGE: "/community-page",

  PARTNERSHIP: "/partnership",

  REGISTER: "/register",

  POKER_EXCHANGE: "/poker-exchange",

  TEACHING_CENTER: "/teaching-center",

  HERO_PROMOTION_CARD: "/hero-promotion-card",
} as const;

/**
 * ------------------------------------------------------------
 * Default Query Options
 * ------------------------------------------------------------
 */

export const DEFAULT_POPULATE = "*";

export const DEFAULT_SORT = ["DisplayOrder:asc"];

/**
 * ------------------------------------------------------------
 * Build Common Query Object
 * ------------------------------------------------------------
 */

export function defaultQuery(locale: string) {
  return {
    locale,
    populate: DEFAULT_POPULATE,
  };
}
