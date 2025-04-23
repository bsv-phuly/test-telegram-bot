"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const langbase_1 = require("langbase");
const langbase = new langbase_1.Langbase({
    apiKey: process.env.LANGBASE_API_KEY,
});
async function main() {
    const memory = await langbase.memories.create({
        name: 'knowledge-base',
        description: 'An AI memory for agentic memory workshop',
        // embedding_model: 'google:text-embedding-004'
        embedding_model: 'openai:text-embedding-3-large'
    });
    console.log('AI Memory:', memory);
}
main();
