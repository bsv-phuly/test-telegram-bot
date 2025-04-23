"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSessionActive = exports.upsertSession = exports.getActiveSessions = exports.getSession = void 0;
const server_1 = require("./_generated/server");
const values_1 = require("convex/values");
// Query to get a session by chatId
exports.getSession = (0, server_1.query)({
    args: { chatId: values_1.v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("sessions")
            .withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
            .first();
    },
});
// Query to get all active sessions
exports.getActiveSessions = (0, server_1.query)({
    handler: async (ctx) => {
        return await ctx.db
            .query("sessions")
            .filter((q) => q.eq(q.field("isActive"), true))
            .collect();
    },
});
// Mutation to create or update a session
exports.upsertSession = (0, server_1.mutation)({
    args: {
        chatId: values_1.v.string(),
        linkToPin: values_1.v.string(),
        messageText: values_1.v.string(),
        isActive: values_1.v.boolean(),
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
        }
        else {
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
exports.updateSessionActive = (0, server_1.mutation)({
    args: {
        chatId: values_1.v.string(),
        isActive: values_1.v.boolean(),
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
