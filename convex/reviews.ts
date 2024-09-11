import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const addUserReview = mutation({
  args: {
    snippetId: v.string(),
    userId: v.string(),
    content: v.string()
  },
  handler: async (ctx, args) => {
    const reviewId = await ctx.db.insert('reviews', {
      ...args,
      createdAt: Date.now()
    })
    return reviewId
  }
})

export const getUserReviews = query({
  args: { snippetId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('reviews')
      .filter(q => q.eq(q.field('snippetId'), args.snippetId))
      .order('desc')
      .collect()
  }
})

export const getAIReview = query({
  args: { snippetId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('reviews')
      .filter(q =>
        q.and(
          q.eq(q.field('snippetId'), args.snippetId),
          q.eq(q.field('userId'), 'AI')
        )
      )
      .first()
  }
})
