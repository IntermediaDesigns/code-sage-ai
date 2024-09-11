import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createCodeSnippet = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    language: v.string(),
    content: v.string(),
    analysis: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const codeSnippetId = await ctx.db.insert("codeSnippets", {
      ...args,
      createdAt: Date.now(),
    });
    console.log('Code snippet created with ID:', codeSnippetId);
    return codeSnippetId;
  },
});

export const getCodeSnippets = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const snippets = await ctx.db
      .query("codeSnippets")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .take(100);
    console.log('Retrieved snippets:', snippets.length);
    return snippets;
  },
});

export const getCodeSnippet = query({
  args: { id: v.id("codeSnippets") },
  handler: async (ctx, args) => {
    const snippet = await ctx.db.get(args.id);
    if (!snippet) {
      throw new Error("Code snippet not found");
    }
    return snippet;
  },
});

export const deleteCodeSnippet = mutation({
  args: { id: v.id("codeSnippets") },
  handler: async (ctx, args) => {
    const { id } = args;
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error("Code snippet not found");
    }
    await ctx.db.delete(id);
  },
});