// vite.config.js
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            'process.env.LANGBASE_API_KEY': JSON.stringify(env.LANGBASE_API_KEY),
            'process.env.BOT_TOKEN': JSON.stringify(env.BOT_TOKEN),
        },
        // build: {
        //     lib: {
        //         entry: ['src/main.ts'],
        //         fileName: (format, entryName) => `my-lib-${entryName}.${format}.js`,
        //         name: 'my-test-bot',
        //     },
        // },
    }
});
