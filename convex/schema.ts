import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  codeSnippets: defineTable({
    userId: v.string(),
    title: v.string(),
    language: v.string(),
    content: v.string(),
    createdAt: v.number(),
    analysis: v.string(),
  }),
  reviews: defineTable({
    snippetId: v.string(),
    userId: v.string(),
    content: v.string(),
    createdAt: v.number(),
  }),
  notifications: defineTable({
    userId: v.string(),
    content: v.string(),
    read: v.boolean(),
    createdAt: v.number(),
  }),
});