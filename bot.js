;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "👋 Hi! I'm your test bot.\nSend any message and I'll reply."
  );
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Available commands:\n/start – start the bot\n/help – show this help"
  );
});

bot.on("message", (msg) => {
  // Ignore commands (they start with /)
  if (msg.text.startsWith("/")) return;

  bot.sendMessage(msg.chat.id, "You said: " + msg.text);
});

console.log("Bot is running...");

