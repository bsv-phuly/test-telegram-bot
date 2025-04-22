import { Bot } from "grammy";
import { runMemoryAgent, runAiSupportAgent } from './agents'
import { composer, setupScheduler, MyContext } from "./features/mentionCoffe";
// import { prisma } from '../prisma';
import { prisma } from '../server/index';

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
    apiKey: "AIzaSyAcUmZKxPKECtpJNXmgqTuRl4-cpUKiuSU",
    authDomain: "test-bot-app-799e1.firebaseapp.com",
    projectId: "test-bot-app-799e1",
    storageBucket: "test-bot-app-799e1.firebasestorage.app",
    messagingSenderId: "107447802957",
    appId: "1:107447802957:web:96478207fb609157005004",
    measurementId: "G-8EWP5E4X9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const main = async () => {
    app;
    const session = await prisma.session.findMany();
    console.log(session);
    await startBot();
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });;