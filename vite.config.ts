// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: ['src/main.ts'],
            fileName: (format, entryName) => `my-lib-${entryName}.${format}.js`,
            name: 'my-test-bot',
        },
    },
});
