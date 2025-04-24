// /api/init.ts
export default async function handler(req, res) {
    const webhookUrl = "https://test-telegram-bot-git-master-bsv-phulys-projects.vercel.app/api/telegram-webhook";

    const telegramResponse = await fetch(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/setWebhook`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: webhookUrl }),
        }
    );

    const data = await telegramResponse.json();
    res.status(200).json(data);
}
