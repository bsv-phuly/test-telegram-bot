"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAiSupportAgent = runAiSupportAgent;
exports.runMemoryAgent = runMemoryAgent;
const langbase_1 = require("langbase");
const langbase = new langbase_1.Langbase({
    apiKey: process.env.LANGBASE_API_KEY,
});
async function runAiSupportAgent({ chunks, query, }) {
    const systemPrompt = await getSystemPrompt(chunks);
    const { completion } = await langbase.pipes.run({
        stream: false,
        name: 'ai-support-agent',
        messages: [
            {
                role: 'system',
                content: systemPrompt,
            },
            {
                role: 'user',
                content: query,
            },
        ],
    });
    return completion;
}
async function getSystemPrompt(chunks) {
    let chunksText = '';
    for (const chunk of chunks) {
        chunksText += chunk.text + '\n';
    }
    const systemPrompt = `
    You're a helpful AI assistant.
    You will assist users with their queries.

    Always ensure that you provide accurate and to the point information.
    Below is some CONTEXT for you to answer the questions. ONLY answer from the CONTEXT. CONTEXT consists of multiple information chunks. Each chunk has a source mentioned at the end.

For each piece of response you provide, cite the source in brackets like so: [1].

At the end of the answer, always list each source with its corresponding number and provide the document name. like so [1] Filename.doc. If there is a URL, make it hyperlink on the name.

 If you don't know the answer, say so. Ask for more context if needed.
    ${chunksText}`;
    return systemPrompt;
}
async function runMemoryAgent(query) {
    const chunks = await langbase.memories.retrieve({
        query,
        topK: 4,
        memory: [
            {
                name: 'knowledge-base',
            },
        ],
    });
    return chunks;
}
