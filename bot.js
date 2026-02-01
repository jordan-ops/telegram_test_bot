const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();
app.use(express.json());

const token = process.env.BOT_TOKEN;
const port = process.env.PORT || 3000;
const domain = process.env.RAILWAY_PUBLIC_DOMAIN;

if (!token || !domain) {
  console.error("Missing BOT_TOKEN or RAILWAY_PUBLIC_DOMAIN");
  process.exit(1);
}

const bot = new TelegramBot(token, { webHook: true });

// Correct webhook URL
const webhookUrl = `https://${domain}/${token}`;
bot.setWebHook(webhookUrl);

app.post(`/${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, '✅ Bot is alive!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

