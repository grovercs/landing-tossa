import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pages = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    updated: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    image: z.string(),
    date: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    readingTime: z.number(),
    author: z.string(),
    description: z.string(),
  }),
});

const rooms = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/rooms" }),
  schema: z.object({
    title: z.string(),
    price: z.number(),
    date: z.string(),
    rating: z.number(),
    ratingCount: z.number(),
    label: z.string().optional(),
    featuredImage: z.string(),
    gallery: z.array(z.string()).length(4),
    amenities: z.array(
      z.object({
        icon: z.string(),
        label: z.string(),
      })
    ),
  }),
});

export const collections = { pages, blog, rooms };
