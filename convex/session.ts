import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to get a session by chatId
export const getSession = query({
    args: { chatId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("sessions")
            .withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
            .first();
    },
});

// Query to get all active sessions
export const getActiveSessions = query({
    handler: async (ctx) => {
        return await ctx.db
            .query("sessions")
            .filter((q) => q.eq(q.field("isActive"), true))
            .collect();
    },
});

// Mutation to create or update a session
export const upsertSession = mutation({
    args: {
        chatId: v.string(),
        linkToPin: v.string(),
        messageText: v.string(),
        isActive: v.boolean(),
    },
    handler: async (ctx, args) => {
        const existingSession = await ctx.db
            .query("sessions")
            .withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
            .first();

        if (existingSession) {
            return await ctx.db.patch(existingSession._id, {
                linkToPin: args.linkToPin,
                messageText: args.messageText,
                isActive: args.isActive,
            });
        } else {
            return await ctx.db.insert("sessions", {
                chatId: args.chatId,
                linkToPin: args.linkToPin,
                messageText: args.messageText,
                isActive: args.isActive,
            });
        }
    },
});

// Mutation to update session isActive state
export const updateSessionActive = mutation({
    args: {
        chatId: v.string(),
        isActive: v.boolean(),
    },
    handler: async (ctx, args) => {
        const existingSession = await ctx.db
            .query("sessions")
            .withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
            .first();

        if (!existingSession) {
            throw new Error("Session not found");
        }

        return await ctx.db.patch(existingSession._id, {
            isActive: args.isActive,
        });
    },
});