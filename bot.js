const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token);

const port = process.env.PORT || 3000; // Railway provides PORT env variable
const url = process.env.RAILWAY_STATIC_URL || 'https://example.com'; // optional fallback

// Use webhook instead of polling
bot.setWebHook(`${url}/${token}`);

// Simple endpoint using Express to receive updates
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.post(`/${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Test command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Bot is alive!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

