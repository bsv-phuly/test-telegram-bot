"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.composer = void 0;
exports.setupScheduler = setupScheduler;
var cron_1 = require("cron");
var grammy_1 = require("grammy");
// import { prisma } from '../../prisma';
var index_1 = require("../server/index");
// Store active sessions (in a real app, use a database)
var activeSessions = {};
// Create composer
var composer = new grammy_1.Composer();
exports.composer = composer;
// Set up session middleware with proper typing
// Custom session middleware that uses Prisma
composer.use(function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var chatId, session;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Only proceed if we have a chat
                if (!ctx.chat)
                    return [2 /*return*/, next()];
                chatId = ctx.chat.id.toString();
                return [4 /*yield*/, index_1.prisma.session.findUnique({
                        where: { chatId: chatId }
                    })];
            case 1:
                session = _a.sent();
                // Provide default session data if none exists
                if (!session) {
                    ctx.session = {
                        isActive: false
                    };
                }
                else {
                    // Map Prisma session to bot session
                    ctx.session = {
                        chatId: session.chatId,
                        linkToPin: session.linkToPin,
                        messageText: session.messageText,
                        isActive: session.isActive
                    };
                }
                // Process next middleware
                return [4 /*yield*/, next()];
            case 2:
                // Process next middleware
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
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
composer.command("start", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.reply("Welcome to Daily Pin Bot!\n\n" +
                    "Commands:\n" +
                    "/setup [link] [optional message] - Setup daily pin with a link and optional message\n" +
                    "/activate - Activate daily pins\n" +
                    "/deactivate - Deactivate daily pins\n" +
                    "/status - Check current setup status\n" +
                    "/help - Show available commands")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
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
composer.command("help", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.reply("Available commands:\n" +
                    "/setup [link] [optional message] - Setup daily pin with a link and optional message\n" +
                    "/activate - Activate daily pins\n" +
                    "/deactivate - Deactivate daily pins\n" +
                    "/status - Check current setup status")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
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
composer.command("setup", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var args, chatId, link, message;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                args = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text.split(" ");
                if (!(!args || args.length < 2)) return [3 /*break*/, 2];
                return [4 /*yield*/, ctx.reply("Please provide a link to pin")];
            case 1:
                _b.sent();
                return [2 /*return*/];
            case 2:
                chatId = ctx.chat.id.toString();
                link = args[1];
                message = args.slice(2).join(" ") || "Daily reminder";
                return [4 /*yield*/, index_1.prisma.session.upsert({
                        where: { chatId: chatId },
                        update: {
                            linkToPin: link,
                            messageText: message,
                        },
                        create: {
                            chatId: chatId,
                            linkToPin: link,
                            messageText: message,
                            isActive: false,
                        }
                    })];
            case 3:
                _b.sent();
                return [4 /*yield*/, ctx.reply("Daily pin has been set up with link: ".concat(link, "\nMessage: ").concat(message))];
            case 4:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
// Activate daily pins
// composer.command("activate", async (ctx) => {
//     if (!ctx.session.chatId || !ctx.session.linkToPin) {
//         await ctx.reply("Please set up the bot first using /setup [link] [optional message]");
//         return;
//     }
//     ctx.session.isActive = true;
//     await ctx.reply("Daily pins activated! The bot will pin a message every weekday at 8:30 AM.");
// });
composer.command("activate", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var chatId, session;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chatId = ctx.chat.id.toString();
                return [4 /*yield*/, index_1.prisma.session.findUnique({ where: { chatId: chatId } })];
            case 1:
                session = _a.sent();
                if (!(!session || !session.linkToPin)) return [3 /*break*/, 3];
                return [4 /*yield*/, ctx.reply("Please set up the bot first using /setup [link] [optional message]")];
            case 2:
                _a.sent();
                return [2 /*return*/];
            case 3: return [4 /*yield*/, index_1.prisma.session.update({
                    where: { chatId: chatId },
                    data: { isActive: true },
                })];
            case 4:
                _a.sent();
                return [4 /*yield*/, ctx.reply("Daily pins activated! The bot will pin a message every weekday at 8:30 AM.")];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// Deactivate daily pins
composer.command("deactivate", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var chatId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chatId = ctx.chat.id.toString();
                return [4 /*yield*/, index_1.prisma.session.update({
                        where: { chatId: chatId },
                        data: { isActive: false },
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, ctx.reply("Daily pins deactivated.")];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// Check status
composer.command("status", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var chatId, session, status;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chatId = ctx.chat.id.toString();
                return [4 /*yield*/, index_1.prisma.session.findUnique({ where: { chatId: chatId } })];
            case 1:
                session = _a.sent();
                if (!!session) return [3 /*break*/, 3];
                return [4 /*yield*/, ctx.reply("No setup found. Please use /setup to configure the bot.")];
            case 2:
                _a.sent();
                return [2 /*return*/];
            case 3:
                status = session.isActive ? "Active" : "Inactive";
                return [4 /*yield*/, ctx.reply("Status: ".concat(status, "\n") +
                        "Link: ".concat(session.linkToPin, "\n") +
                        "Message: ".concat(session.messageText, "\n") +
                        "Chat ID: ".concat(chatId))];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// Handle all messages to update session store
composer.on("message", function (ctx) {
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
function sendAndPinDailyMessage(bot, chatId, linkToPin, messageText) {
    return __awaiter(this, void 0, void 0, function () {
        var fullMessage, sentMsg, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    fullMessage = "".concat(messageText, "\n").concat(linkToPin);
                    return [4 /*yield*/, bot.api.sendMessage(chatId, fullMessage)];
                case 1:
                    sentMsg = _a.sent();
                    return [4 /*yield*/, bot.api.pinChatMessage(chatId, sentMsg.message_id)];
                case 2:
                    _a.sent();
                    console.log("Sent and pinned message to ".concat(chatId));
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error sending/pinning to ".concat(chatId, ":"), error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
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
function setupScheduler(bot) {
    var _this = this;
    var job = new cron_1.CronJob('0 30 8 * * 1-5', function () { return __awaiter(_this, void 0, void 0, function () {
        var activeSessions, _i, activeSessions_1, session_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Running daily pin job at 8:30 AM');
                    return [4 /*yield*/, index_1.prisma.session.findMany({
                            where: { isActive: true },
                        })];
                case 1:
                    activeSessions = _a.sent();
                    _i = 0, activeSessions_1 = activeSessions;
                    _a.label = 2;
                case 2:
                    if (!(_i < activeSessions_1.length)) return [3 /*break*/, 5];
                    session_1 = activeSessions_1[_i];
                    return [4 /*yield*/, sendAndPinDailyMessage(bot, session_1.chatId, session_1.linkToPin, session_1.messageText)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    }); }, null, true, 'UTC');
    job.start();
    return job;
}
