// bot.js
const TelegramBot = require('node-telegram-bot-api');

// Replace this with your BotFather token
const token = 'YOUR_BOT_TOKEN_HERE';

// Create bot with polling
const bot = new TelegramBot(token, { polling: true });

console.log('Telegram bot is running...');

// Listen for any text message
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    console.log(`Received message from ${chatId}: ${text}`);

    // Example: simple reply
    bot.sendMessage(chatId, `You said: ${text}`);
});

// Listen for commands (like /start)
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome! I am your CommonJS Telegram bot.');
});

// You can add more command handlers here
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Available commands:\n/start - Start bot\n/help - Show this message');
});

