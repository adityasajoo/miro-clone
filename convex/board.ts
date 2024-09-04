import { mutation, query } from './_generated/server'
import { v } from 'convex/values';

const images = [
    "/placeholders/1.svg",
    "/placeholders/2.svg",
    "/placeholders/3.svg",
    "/placeholders/4.svg",
    "/placeholders/5.svg",
    "/placeholders/6.svg",
]

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const imageUrl = images[Math.floor(Math.random() * images.length)];

        const board = ctx.db.insert('boards', {
            title: args.title,
            orgId: args.orgId,
            imageUrl,
            authorId: identity.subject,
            authorName: identity.name!,
        });

        return board;
    }
})

export const remove = mutation({
    args: {
        id: v.id("boards"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;
        const existingFav = await ctx.db.query('userFavorites')
            .withIndex('by_user_board', (q) =>
                q.eq('userId', userId)
                    .eq('boardId', args.id)
            ).unique();

        if (existingFav) {
            await ctx.db.delete(existingFav._id);
        }

        await ctx.db.delete(args.id);

    }

})

export const update = mutation({
    args: {
        id: v.id("boards"),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const title = args.title.trim();

        if (!title) {
            throw new Error("Title is required");
        }

        if (title.length > 60) {
            throw new Error("Title is too long");
        }

        const board = ctx.db.patch(args.id, {
            title: args.title,
        });

        return board;
    }
})

export const favorite = mutation({
    args: {
        id: v.id("boards"),
        orgId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error("Board not found");
        }

        const userId = identity.subject;

        const existing = await ctx.db.query('userFavorites')
            .withIndex('by_user_board', (q) =>
                q.eq('userId', userId)
                    .eq('boardId', args.id)
            ).unique();

        if (existing) {
            throw new Error("Already favorited");
        }


        const favorite = await ctx.db.insert('userFavorites', {
            userId,
            boardId: board._id,
            orgId: args.orgId,
        });

        return favorite;
    }
})

export const unfavorite = mutation({
    args: {
        id: v.id("boards"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error("Board not found");
        }

        const userId = identity.subject;

        const existing = await ctx.db.query('userFavorites')
            .withIndex('by_user_board', (q) =>
                q.eq('userId', userId)
                    .eq('boardId', board._id)
            ).unique();

        if (!existing) {
            throw new Error("Favorite not found");
        }
        const unFavorite = await ctx.db.delete(existing._id);

        return unFavorite;
    }
})

export const get = query({
    args: {
        id: v.id("boards"),
    },
    handler: async (ctx, args) => {
        const board = await ctx.db.get(args.id);
        return board;
    }

})