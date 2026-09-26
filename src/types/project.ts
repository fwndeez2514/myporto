// Project data types for the portfolio
export type ProjectCategory = "video-editing" | "motion-graphic" | "graphic-design";

export interface SocialLink {
  platform: "instagram" | "youtube" | "tiktok";
  url: string;
  embedId?: string;
}

export interface Project {
  title: string;
  slug: string;
  category: ProjectCategory;
  tags: string[];
  date: string;
  excerpt: string;
  description: string;
  coverImage: string;
  featured?: boolean;
  socialLinks?: SocialLink[];
}

export type CategoryLabel = {
  [K in ProjectCategory]: string;
};

export const CATEGORY_LABELS: CategoryLabel = {
  "video-editing": "Video Editing",
  "motion-graphic": "Motion Graphic",
  "graphic-design": "Graphic Design",
};

export const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as ProjectCategory[];
