import { defineDocumentType, makeSource } from "contentlayer2/source-files";

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    category: {
      type: "enum",
      options: ["video-editing", "motion-graphic", "graphic-design"],
      required: true,
    },
    tags: { type: "list", of: { type: "string" }, required: true },
    date: { type: "date", required: true },
    excerpt: { type: "string", required: true },
    coverImage: { type: "string", required: true },
    featured: { type: "boolean", default: false },
    socialLinks: {
      type: "list",
      of: {
        type: "nested",
        def: () => ({
          name: "SocialLink",
          fields: {
            platform: {
              type: "enum",
              options: ["instagram", "youtube", "tiktok"],
              required: true,
            },
            url: { type: "string", required: true },
            embedId: { type: "string" },
          },
        }),
      },
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("projects/", ""),
    },
    url: {
      type: "string",
      resolve: (doc) =>
        `/work/${doc._raw.flattenedPath.replace("projects/", "")}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Project],
});
