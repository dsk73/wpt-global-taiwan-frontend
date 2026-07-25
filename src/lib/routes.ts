export const routes = {
  home: (locale: string) => `/${locale}`,

  activities: (locale: string) =>
    `/${locale}/activities`,

  activity: (locale: string, slug: string) =>
    `/${locale}/activities/${slug}`,

  tutorials: (locale: string) =>
    `/${locale}/tutorials`,

  tutorial: (locale: string, slug: string) =>
    `/${locale}/tutorials/${slug}`,

  community: (locale: string) =>
    `/${locale}/community`,

  communityPost: (locale: string, slug: string) =>
    `/${locale}/community/${slug}`,
};