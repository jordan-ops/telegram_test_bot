// bot.js
import TelegramBot from "node-telegram-bot-api";
import OpenClaw from "openclaw";

// Load environment variables
const TELEGRAM_TOKEN = process.env.BOT_TOKEN;
const CLAW_API_KEY = process.env.OPENROUTER_API_KEY;

// Validate environment variables
if (!TELEGRAM_TOKEN) {
  console.error("Error: BOT_TOKEN is not set!");
  process.exit(1);
}
if (!CLAW_API_KEY) {
  console.error("Error: OPENROUTER_API_KEY is not set!");
  process.exit(1);
}

// Initialize Telegram bot
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Initialize OpenClaw
const claw = new OpenClaw({
  apiKey: CLAW_API_KEY,
  provider: "openrouter", // change if using OpenAI, Anthropic, etc.
});

// Handle /start command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Hello ${msg.from.first_name}! I am your AI assistant. Send me a message and I will reply.`
  );
});

// Handle /help command
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Just type anything and I will answer using AI.\nCommands:\n/start - Start bot\n/help - Show this message"
  );
});

// Handle all other messages
bot.on("message", async (msg) => {
  // Ignore /start and /help (already handled)
  if (msg.text.startsWith("/")) return;

  const chatId = msg.chat.id;
  const userMessage = msg.text;

  try {
    // Send message to OpenClaw AI
    const response = await claw.sendMessage({
      input: userMessage,
      channel: "telegram",
    });

    // Reply to user
    bot.sendMessage(chatId, response.output || "🤖 I couldn't generate a response.");
  } catch (err) {
    console.error("OpenClaw error:", err);
    bot.sendMessage(chatId, "❌ Error contacting AI. Please try again later.");
  }
});

console.log("🤖 Telegram AI bot is running...");

