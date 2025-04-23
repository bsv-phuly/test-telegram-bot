"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const agents_1 = require("./agents");
const mentionCoffe_1 = require("./features/mentionCoffe");
// import { prisma } from './server/index';
const BOT_TOKEN = process.env.BOT_TOKEN;
const CONVEX_URL = process.env.CONVEX_URL;
if (!BOT_TOKEN) {
    throw new Error("BOT_TOKEN is required in .env file");
}
// Create a bot object
const token = BOT_TOKEN;
const bot = new grammy_1.Bot(token);
bot.use(mentionCoffe_1.composer);
async function sendMessage(message) {
    const query = message;
    const chunks = await (0, agents_1.runMemoryAgent)(query);
    const completion = await (0, agents_1.runAiSupportAgent)({
        chunks,
        query,
    });
    console.log('Completion:', completion);
    return completion;
}
async function startBot() {
    console.log('init ...');
    try {
        console.log('starting ...');
        await bot.start();
        console.log("Bot started");
        // Register listeners to handle messages
        bot.on("message:text", async (ctx) => {
            ctx.reply(await sendMessage(ctx.message.text));
        });
        bot.hears(/chat *(.+)?/, async (ctx) => {
            console.log(ctx, 'ctx');
            console.log(ctx.message, 'ctx.message');
            if (ctx.message?.text)
                ctx.reply(await sendMessage(ctx.message.text));
        });
        bot.command("chat", async (ctx) => {
            await ctx.reply("Hi! I can only read messages that explicitly reply to me!", {
                // Make Telegram clients automatically show a reply interface to the user.
                reply_markup: { force_reply: true },
            });
        });
        // Setup the scheduler
        (0, mentionCoffe_1.setupScheduler)(bot);
    }
    catch (error) {
        console.error("Failed to start the bot:", error);
    }
}
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcUmZKxPKECtpJNXmgqTuRl4-cpUKiuSU",
    authDomain: "test-bot-app-799e1.firebaseapp.com",
    projectId: "test-bot-app-799e1",
    storageBucket: "test-bot-app-799e1.firebasestorage.app",
    messagingSenderId: "107447802957",
    appId: "1:107447802957:web:96478207fb609157005004",
    measurementId: "G-8EWP5E4X9Z"
};
// Initialize Firebase
const initApp = (0, app_1.initializeApp)(firebaseConfig);
const main = async () => {
    initApp;
    await startBot();
};
main();
