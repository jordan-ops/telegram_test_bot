const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const token = process.env.BOT_TOKEN; // set this in Railway variables
const port = process.env.PORT || 3000;
const url = process.env.RAILWAY_STATIC_URL; // Railway's public URL

const bot = new TelegramBot(token);
bot.setWebHook(`${url}/${token}`); // Telegram will send updates here

app.post(`/${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Bot is alive!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

