import { mutation } from './_generated/server'
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