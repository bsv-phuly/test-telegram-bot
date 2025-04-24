import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            'process.env.LANGBASE_API_KEY': JSON.stringify(env.LANGBASE_API_KEY),
            'process.env.BOT_TOKEN': JSON.stringify(env.BOT_TOKEN),
            'process.env.CONVEX_DEPLOYMENT': JSON.stringify(env.CONVEX_DEPLOYMENT),
            'process.env.CONVEX_URL': JSON.stringify(env.CONVEX_URL),
        },
        entry: ["/src/main.tsx"],
        base: '/',
        // base: '/test-telegram-bot/',
    };
});
