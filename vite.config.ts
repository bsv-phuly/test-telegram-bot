// vite.config.js
import { exec } from "child_process";
import { defineConfig, loadEnv } from "vite";

function openFirebaseHostingUrl() {
    return {
        name: 'open-firebase-after-build',
        buildEnd() {
            const url = 'https://test-bot-app-799e1.web.app'
            const openCommand = `start ${url}`
            exec(openCommand)
        }
    }
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [openFirebaseHostingUrl()],
        define: {
            'process.env.LANGBASE_API_KEY': JSON.stringify(env.LANGBASE_API_KEY),
            'process.env.BOT_TOKEN': JSON.stringify(env.BOT_TOKEN),
        },
        base: '/test-telegram-bot/',
        // build: {
        //     lib: {
        //         entry: ['src/main.ts'],
        //         fileName: (format, entryName) => `my-lib-${entryName}.${format}.js`,
        //         name: 'my-test-bot',
        //     },
        // },
    }
});
