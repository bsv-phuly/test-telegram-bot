"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("convex/server");
const values_1 = require("convex/values");
exports.default = (0, server_1.defineSchema)({
    sessions: (0, server_1.defineTable)({
        chatId: values_1.v.string(),
        linkToPin: values_1.v.string(),
        messageText: values_1.v.string(),
        isActive: values_1.v.boolean(),
    }).index("by_chatId", ["chatId"]),
});
