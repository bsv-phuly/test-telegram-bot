import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
    sessions: defineTable({
        chatId: v.string(),
        linkToPin: v.string(),
        messageText: v.string(),
        isActive: v.boolean(),
    }).index("by_chatId", ["chatId"]),
});
