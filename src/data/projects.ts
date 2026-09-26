import { type Project } from "@/types/project";

// Static project data — update this to add/remove projects
// For each project, you can add socialLinks to display embeds
export const projects: Project[] = [
  {
    title: "Cinematic Reel 2024",
    slug: "cinematic-reel-2024",
    category: "video-editing",
    tags: ["Cinematic", "Color Grading", "Storytelling"],
    date: "2024-11-15",
    excerpt:
      "A compilation of cinematic shots edited and color-graded to showcase visual storytelling techniques.",
    description:
      "A cinematic reel capturing the essence of visual storytelling through careful editing and color grading. This project demonstrates the power of pacing, rhythm, and color in conveying emotion.\n\nThe edit uses a combination of natural lighting and cinematic color grades to create a cohesive visual language throughout the piece.",
    coverImage:
      "https://images.unsplash.com/photo-1536240478700-b869ad10a2eb?w=1200&q=80",
    featured: true,
    socialLinks: [
      {
        platform: "youtube",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        embedId: "dQw4w9WgXcQ",
      },
    ],
  },
  {
    title: "Brand Identity Motion",
    slug: "brand-identity-motion",
    category: "motion-graphic",
    tags: ["Motion Design", "Brand", "After Effects"],
    date: "2024-09-08",
    excerpt:
      "Logo animation and brand motion guidelines for a creative agency — smooth, purposeful, and on-brand.",
    description:
      "A complete brand motion package including logo reveal animation, lower thirds, and transition templates. Designed to feel clean, intentional, and adaptable across different media formats.\n\nEvery animation decision was guided by the brand's personality — refined, forward-thinking, and human.",
    coverImage:
      "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1200&q=80",
    featured: true,
    socialLinks: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    title: "Event Poster Series",
    slug: "event-poster-series",
    category: "graphic-design",
    tags: ["Print", "Typography", "Poster Design"],
    date: "2024-07-20",
    excerpt:
      "A series of event posters built around editorial typography and minimal use of illustration.",
    description:
      "A poster series for a local creative festival. The design system was built around strong typographic hierarchy, a constrained two-color palette, and intentional negative space.\n\nThe goal was to make posters that communicated clearly from a distance while rewarding closer inspection with typographic detail.",
    coverImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    featured: true,
    socialLinks: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    title: "AMV — Fragments",
    slug: "amv-fragments",
    category: "video-editing",
    tags: ["AMV", "Anime", "After Effects", "Motion"],
    date: "2024-05-10",
    excerpt:
      "An anime music video edit that explores fragmented memory and visual rhythm through precise clip timing.",
    description:
      "An AMV project that uses editing rhythm and motion blur to synchronize visual storytelling with music. Each cut was timed to the beat with careful attention to emotional arc.",
    coverImage:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
    featured: false,
    socialLinks: [
      {
        platform: "youtube",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        embedId: "dQw4w9WgXcQ",
      },
    ],
  },
  {
    title: "Social Media Graphics Pack",
    slug: "social-media-graphics",
    category: "graphic-design",
    tags: ["Social Media", "Template", "Branding"],
    date: "2024-03-18",
    excerpt:
      "A modular social media graphics system — Instagram stories, posts, and reels covers for a lifestyle brand.",
    description:
      "A complete social media design system built around a single brand identity. Templates are modular and designed to be easy to customize without losing consistency.",
    coverImage:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80",
    featured: false,
    socialLinks: [
      {
        platform: "tiktok",
        url: "https://www.tiktok.com/",
      },
    ],
  },
  {
    title: "Kinetic Typography",
    slug: "kinetic-typography",
    category: "motion-graphic",
    tags: ["Typography", "Motion", "After Effects"],
    date: "2024-01-25",
    excerpt:
      "Kinetic typography animation for a spoken word piece — letters that move with meaning.",
    description:
      "A motion typography project where text animation serves the meaning of the words, not just aesthetics. Each word transition was choreographed to the rhythm and emotion of the audio.",
    coverImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    featured: false,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
