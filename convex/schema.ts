import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  codeSnippets: defineTable({
    userId: v.string(),
    title: v.string(),
    language: v.string(),
    content: v.string(),
    createdAt: v.number()
  }),
  reviews: defineTable({
    codeSnippetId: v.id('codeSnippets'),
    userId: v.string(),
    content: v.string(),
    aiSuggestions: v.string(),
    createdAt: v.number()
  }),
  notifications: defineTable({
    userId: v.string(),
    content: v.string(),
    read: v.boolean(),
    createdAt: v.number()
  })
})
