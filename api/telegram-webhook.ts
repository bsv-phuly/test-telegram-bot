// /api/telegram-webhook.ts
import { Bot } from "grammy";
import { composer, setupScheduler, MyContext } from "../src/features/mentionCoffe";
import { runMemoryAgent, runAiSupportAgent } from "../src/agents";

const bot = new Bot<MyContext>(process.env.BOT_TOKEN!);
bot.use(composer);

bot.on("message:text", async (ctx) => {
    const chunks = await runMemoryAgent(ctx.message.text);
    const completion = await runAiSupportAgent({
        chunks,
        query: ctx.message.text,
    });

    await ctx.reply(completion);
});

// Set up once and handle incoming webhook updates
setupScheduler(bot); // optional if you use scheduling

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            await bot.handleUpdate(req.body);
            res.status(200).json({ ok: true });
        } catch (error) {
            console.error("Bot handler error:", error);
            res.status(500).json({ error: "Bot failed" });
        }
    } else {
        res.status(405).end();
    }
}
