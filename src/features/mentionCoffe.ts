import { CronJob } from 'cron';
import { Composer, Context, session } from "grammy";
// import { prisma } from '../../prisma';
import { prisma } from '../../server/index';

// Define session interface
interface SessionData {
    chatId?: string;
    linkToPin?: string;
    messageText?: string;
    isActive: boolean;
}

// Create context type with session
type MyContext = Context & {
    session: SessionData;
};

// Store active sessions (in a real app, use a database)
const activeSessions: Record<string, SessionData> = {};

// Create composer
const composer = new Composer<MyContext>();

// Set up session middleware with proper typing
// Custom session middleware that uses Prisma
composer.use(async (ctx, next) => {
    // Only proceed if we have a chat
    if (!ctx.chat) return next();

    const chatId = ctx.chat.id.toString();

    // Find or create session
    let session = await prisma.session.findUnique({
        where: { chatId }
    });

    // Provide default session data if none exists
    if (!session) {
        ctx.session = {
            isActive: false
        };
    } else {
        // Map Prisma session to bot session
        ctx.session = {
            chatId: session.chatId,
            linkToPin: session.linkToPin,
            messageText: session.messageText,
            isActive: session.isActive
        };
    }

    // Process next middleware
    await next();
});

// Command to start the bot
// composer.command("start", async (ctx) => {
//     await ctx.reply(
//         "Welcome to Daily Pin Bot!\n\n" +
//         "Commands:\n" +
//         "/setup [link] [optional message] - Setup daily pin with a link and optional message\n" +
//         "/activate - Activate daily pins\n" +
//         "/deactivate - Deactivate daily pins\n" +
//         "/status - Check current setup status\n" +
//         "/help - Show available commands"
//     );
// });
composer.command("start", async (ctx) => {
    await ctx.reply(
        "Welcome to Daily Pin Bot!\n\n" +
        "Commands:\n" +
        "/setup [link] [optional message] - Setup daily pin with a link and optional message\n" +
        "/activate - Activate daily pins\n" +
        "/deactivate - Deactivate daily pins\n" +
        "/status - Check current setup status\n" +
        "/help - Show available commands"
    );
});

// Help command
// composer.command("help", async (ctx) => {
//     await ctx.reply(
//         "Available commands:\n" +
//         "/setup [link] [optional message] - Setup daily pin with a link and optional message\n" +
//         "/activate - Activate daily pins\n" +
//         "/deactivate - Deactivate daily pins\n" +
//         "/status - Check current setup status"
//     );
// });
composer.command("help", async (ctx) => {
    await ctx.reply(
        "Available commands:\n" +
        "/setup [link] [optional message] - Setup daily pin with a link and optional message\n" +
        "/activate - Activate daily pins\n" +
        "/deactivate - Deactivate daily pins\n" +
        "/status - Check current setup status"
    );
});

// Setup daily pin
// composer.command("setup", async (ctx) => {
//     const args = ctx.message?.text.split(" ");

//     if (!args || args.length < 2) {
//         await ctx.reply("Please provide a link to pin");
//         return;
//     }

//     const link = args[1];
//     const message = args.slice(2).join(" ") || "Daily reminder";

//     // Save the chat ID, link and message
//     ctx.session.chatId = ctx.chat.id.toString();
//     ctx.session.linkToPin = link;
//     ctx.session.messageText = message;

//     await ctx.reply(`Daily pin has been set up with link: ${link}\nMessage: ${message}`);
// });
composer.command("setup", async (ctx) => {
    const args = ctx.message?.text.split(" ");

    if (!args || args.length < 2) {
        await ctx.reply("Please provide a link to pin");
        return;
    }

    const chatId = ctx.chat.id.toString();
    const link = args[1];
    const message = args.slice(2).join(" ") || "Daily reminder";

    await prisma.session.upsert({
        where: { chatId },
        update: {
            linkToPin: link,
            messageText: message,
        },
        create: {
            chatId,
            linkToPin: link,
            messageText: message,
            isActive: false,
        }
    });

    await ctx.reply(`Daily pin has been set up with link: ${link}\nMessage: ${message}`);
});

// Activate daily pins
// composer.command("activate", async (ctx) => {
//     if (!ctx.session.chatId || !ctx.session.linkToPin) {
//         await ctx.reply("Please set up the bot first using /setup [link] [optional message]");
//         return;
//     }

//     ctx.session.isActive = true;
//     await ctx.reply("Daily pins activated! The bot will pin a message every weekday at 8:30 AM.");
// });
composer.command("activate", async (ctx) => {
    const chatId = ctx.chat.id.toString();

    const session = await prisma.session.findUnique({ where: { chatId } });

    if (!session || !session.linkToPin) {
        await ctx.reply("Please set up the bot first using /setup [link] [optional message]");
        return;
    }

    await prisma.session.update({
        where: { chatId },
        data: { isActive: true },
    });

    await ctx.reply("Daily pins activated! The bot will pin a message every weekday at 8:30 AM.");
});


// Deactivate daily pins
composer.command("deactivate", async (ctx) => {
    const chatId = ctx.chat.id.toString();

    await prisma.session.update({
        where: { chatId },
        data: { isActive: false },
    });

    await ctx.reply("Daily pins deactivated.");
});

// Check status
composer.command("status", async (ctx) => {
    const chatId = ctx.chat.id.toString();
    const session = await prisma.session.findUnique({ where: { chatId } });

    if (!session) {
        await ctx.reply("No setup found. Please use /setup to configure the bot.");
        return;
    }

    const status = session.isActive ? "Active" : "Inactive";

    await ctx.reply(
        `Status: ${status}\n` +
        `Link: ${session.linkToPin}\n` +
        `Message: ${session.messageText}\n` +
        `Chat ID: ${chatId}`
    );
});

// Handle all messages to update session store
composer.on("message", (ctx) => {
    if (ctx.session.isActive && ctx.session.chatId && ctx.session.linkToPin) {
        activeSessions[ctx.session.chatId] = {
            isActive: ctx.session.isActive,
            linkToPin: ctx.session.linkToPin,
            messageText: ctx.session.messageText,
            chatId: ctx.session.chatId
        };
    }
});

// Function to send and pin daily message
// async function sendAndPinDailyMessage(bot: any, chatId: string, linkToPin: string, messageText: string) {
//     try {
//         // Send message with link
//         const fullMessage = `${messageText}\n${linkToPin}`;
//         const sentMsg = await bot.api.sendMessage(chatId, fullMessage);

//         // Pin the message
//         await bot.api.pinChatMessage(chatId, sentMsg.message_id);

//         console.log(`Sent and pinned daily message in chat ${chatId}`);
//     } catch (error) {
//         console.error(`Error sending/pinning message in chat ${chatId}:`, error);
//     }
// }
async function sendAndPinDailyMessage(bot: any, chatId: string, linkToPin: string, messageText: string) {
    try {
        const fullMessage = `${messageText}\n${linkToPin}`;
        const sentMsg = await bot.api.sendMessage(chatId, fullMessage);
        await bot.api.pinChatMessage(chatId, sentMsg.message_id);

        console.log(`Sent and pinned message to ${chatId}`);
    } catch (error) {
        console.error(`Error sending/pinning to ${chatId}:`, error);
    }
}

// Setup scheduler function to be called from main
// function setupScheduler(bot: any) {
//     // Setup cron job to run at 8:30 AM Monday through Friday
//     const job = new CronJob('0 30 8 * * 1-5', () => {
//         console.log('Running daily pin job at 8:30 AM');

//         // Iterate through active sessions and send/pin messages
//         Object.values(activeSessions).forEach(session => {
//             if (session.isActive && session.chatId && session.linkToPin) {
//                 sendAndPinDailyMessage(
//                     bot,
//                     session.chatId,
//                     session.linkToPin,
//                     session.messageText || "Daily reminder"
//                 );
//             }
//         });
//     }, null, true, 'UTC'); // Change timezone as needed

//     // Start the cron job
//     job.start();
//     console.log("Daily pin job scheduled for 8:30 AM Monday-Friday");

//     return job;
// }
function setupScheduler(bot: any) {
    const job = new CronJob('0 30 8 * * 1-5', async () => {
        console.log('Running daily pin job at 8:30 AM');

        const activeSessions = await prisma.session.findMany({
            where: { isActive: true },
        });

        for (const session of activeSessions) {
            await sendAndPinDailyMessage(
                bot,
                session.chatId,
                session.linkToPin,
                session.messageText
            );
        }
    }, null, true, 'UTC');

    job.start();
    return job;
}


export { composer, setupScheduler, MyContext };