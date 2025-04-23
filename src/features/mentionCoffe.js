"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composer = void 0;
exports.setupScheduler = setupScheduler;
const cron_1 = require("cron");
const grammy_1 = require("grammy");
const browser_1 = require("convex/browser");
const api_1 = require("../../convex/_generated/api");
// import { getActiveSessions, upsertSession } from '../../convex/session';
// Define your client
const convex = new browser_1.ConvexHttpClient(process.env.CONVEX_URL || "");
// Store active sessions (in a real app, use a database)
const activeSessions = {};
// Create composer
const composer = new grammy_1.Composer();
exports.composer = composer;
composer.command("start", async (ctx) => {
    await ctx.reply("Welcome to Daily Pin Bot!\n\n" +
        "Commands:\n" +
        "/setup [link] [optional message] - Setup daily pin with a link and optional message\n" +
        "/activate - Activate daily pins\n" +
        "/deactivate - Deactivate daily pins\n" +
        "/status - Check current setup status\n" +
        "/help - Show available commands");
});
// Help command
composer.command("help", async (ctx) => {
    await ctx.reply("Available commands:\n" +
        "/setup [link] [optional message] - Setup daily pin with a link and optional message\n" +
        "/activate - Activate daily pins\n" +
        "/deactivate - Deactivate daily pins\n" +
        "/status - Check current setup status");
});
// Setup daily pin
composer.command("setup", async (ctx) => {
    const args = ctx.message?.text.split(" ");
    if (!args || args.length < 2) {
        await ctx.reply("Please provide a link to pin");
        return;
    }
    const chatId = ctx.chat.id.toString();
    const link = args[1];
    const message = args.slice(2).join(" ") || "Daily reminder";
    await convex.mutation(api_1.api.session.upsertSession, {
        chatId,
        linkToPin: link,
        messageText: message,
        isActive: false,
    });
    await ctx.reply(`Daily pin has been set up with link: ${link}\nMessage: ${message}`);
});
// Activate daily pins
composer.command("activate", async (ctx) => {
    const chatId = ctx.chat.id.toString();
    const session = await convex.query(api_1.api.session.getSession, { chatId });
    if (!session || !session.linkToPin) {
        await ctx.reply("Please set up the bot first using /setup [link] [optional message]");
        return;
    }
    await convex.mutation(api_1.api.session.updateSessionActive, {
        chatId,
        isActive: true,
    });
    await ctx.reply("Daily pins activated! The bot will pin a message every weekday at 8:30 AM.");
});
// Deactivate daily pins
composer.command("deactivate", async (ctx) => {
    const chatId = ctx.chat.id.toString();
    await convex.mutation(api_1.api.session.updateSessionActive, {
        chatId,
        isActive: false,
    });
    await ctx.reply("Daily pins deactivated.");
});
// Check status
composer.command("status", async (ctx) => {
    const chatId = ctx.chat.id.toString();
    const session = await convex.query(api_1.api.session.getSession, { chatId });
    if (!session) {
        await ctx.reply("No setup found. Please use /setup to configure the bot.");
        return;
    }
    const status = session.isActive ? "Active" : "Inactive";
    await ctx.reply(`Status: ${status}\n` +
        `Link: ${session.linkToPin}\n` +
        `Message: ${session.messageText}\n` +
        `Chat ID: ${chatId}`);
});
// Function to send and pin daily message
async function sendAndPinDailyMessage(bot, chatId, linkToPin, messageText) {
    try {
        const fullMessage = `${messageText}\n${linkToPin}`;
        const sentMsg = await bot.api.sendMessage(chatId, fullMessage);
        await bot.api.pinChatMessage(chatId, sentMsg.message_id);
        console.log(`Sent and pinned message to ${chatId}`);
    }
    catch (error) {
        console.error(`Error sending/pinning to ${chatId}:`, error);
    }
}
// Setup scheduler function to be called from main
function setupScheduler(bot) {
    const job = new cron_1.CronJob('0 30 8 * * 1-5', async () => {
        console.log('Running daily pin job at 8:30 AM');
        const activeSessions = await convex.query(api_1.api.session.getActiveSessions);
        for (const session of activeSessions) {
            await sendAndPinDailyMessage(bot, session.chatId, session.linkToPin, session.messageText);
        }
    }, null, true, 'UTC');
    job.start();
    return job;
}
