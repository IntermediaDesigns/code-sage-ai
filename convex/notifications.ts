import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addNotification = mutation({
  args: { userId: v.string(), content: v.string(), snippetId: v.id("codeSnippets") },
  handler: async (ctx, args) => {
    const notificationId = await ctx.db.insert("notifications", {
      userId: args.userId,
      content: args.content,
      read: false,
      createdAt: Date.now(),
    });
    return notificationId;
  },
});

export const getUnreadNotifications = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notifications")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .filter((q) => q.eq(q.field("read"), false))
      .order("desc")
      .collect();
  },
});

export const markNotificationAsRead = mutation({
  args: { id: v.id("notifications") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { read: true });
  },
});