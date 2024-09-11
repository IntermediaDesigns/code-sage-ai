import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createCodeSnippet = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    language: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const codeSnippetId = await ctx.db.insert("codeSnippets", {
      ...args,
      createdAt: Date.now(),
    });
    return codeSnippetId;
  },
});

export const getCodeSnippets = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("codeSnippets")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .take(10);
  },
});

export const getCodeSnippet = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});