import { Bot } from "grammy";
import 'dotenv/config';
import { runMemoryAgent, runAiSupportAgent } from './src/agents'
import { composer, setupScheduler, MyContext } from "./features/mentionCoffe";

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
    throw new Error("BOT_TOKEN is required in .env file");
}
// Create a bot object
const token = BOT_TOKEN;
const bot = new Bot<MyContext>(token);
bot.use(composer);

async function sendMessage(message: string) {
    const query = message;
    const chunks = await runMemoryAgent(query);

    const completion = await runAiSupportAgent({
        chunks,
        query,
    });

    console.log('Completion:', completion);
    return completion;
}

async function startBot() {
    console.log('init ...')
    try {
        console.log('starting ...')
        await bot.start();
        console.log("Bot started");
        // Register listeners to handle messages
        bot.on("message:text", async (ctx) => {
            ctx.reply(await sendMessage(ctx.message.text));
        });

        bot.hears(/chat *(.+)?/, async (ctx) => {
            console.log(ctx, 'ctx')
            console.log(ctx.message, 'ctx.message')
            if (ctx.message?.text) ctx.reply(await sendMessage(ctx.message.text));
        });

        bot.command("chat", async (ctx) => {
            await ctx.reply("Hi! I can only read messages that explicitly reply to me!", {
                // Make Telegram clients automatically show a reply interface to the user.
                reply_markup: { force_reply: true },
            });
        });
        // Setup the scheduler
        setupScheduler(bot);
    } catch (error) {
        console.error("Failed to start the bot:", error);
    }
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAP4eL6JBVcnPHOeeB7aVX6gL1XqA_Oah4",
    authDomain: "telegram-bot-app-12291.firebaseapp.com",
    projectId: "telegram-bot-app-12291",
    storageBucket: "telegram-bot-app-12291.firebasestorage.app",
    messagingSenderId: "541703448699",
    appId: "1:541703448699:web:d1f5980cb5d9f4e5df5ade"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const main = async () => {
    app;
    await startBot();
}

main();
// Handle shutdown
process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());