import { mutation } from './_generated/server'
import { v } from 'convex/values';

const images = [
    "/placeholders/1.jpg",
    "/placeholders/2.jpg",
    "/placeholders/3.jpg",
    "/placeholders/4.jpg",
    "/placeholders/5.jpg",
    "/placeholders/6.jpg",
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
