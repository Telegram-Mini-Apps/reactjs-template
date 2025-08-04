import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);
const FRONTEND_URL = process.env.FRONTEND_URL;

// Bot commands
bot.start(async (ctx) => {
  await ctx.reply(
    '🌟 Welcome to OpenFreeMap!\n\nDiscover and share places around the world using our interactive map.',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🗺️ Open Map', web_app: { url: FRONTEND_URL } }],
          [{ text: 'ℹ️ Help', callback_data: 'help' }]
        ]
      }
    }
  );
});

bot.action('help', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
    '🆘 How to use OpenFreeMap:\n\n' +
    '1. 🗺️ Open the map using the button below\n' +
    '2. 📍 Allow location access or search for a place\n' +
    '3. ➕ Tap on the map to add new locations\n' +
    '4. 👤 Edit your profile and manage your places\n\n' +
    'The map works best on mobile devices!',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🗺️ Open Map', web_app: { url: FRONTEND_URL } }],
          [{ text: '🔙 Back', callback_data: 'back_to_start' }]
        ]
      }
    }
  );
});

bot.action('back_to_start', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
    '🌟 Welcome to OpenFreeMap!\n\nDiscover and share places around the world using our interactive map.',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🗺️ Open Map', web_app: { url: FRONTEND_URL } }],
          [{ text: 'ℹ️ Help', callback_data: 'help' }]
        ]
      }
    }
  );
});

bot.command('help', async (ctx) => {
  await ctx.reply(
    '🆘 OpenFreeMap Commands:\n\n' +
    '/start - Main menu\n' +
    '/map - Open the interactive map\n' +
    '/help - Show this help message\n\n' +
    'Use the web app for the best experience!'
  );
});

bot.command('map', async (ctx) => {
  await ctx.reply(
    '🗺️ Open the interactive map:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🗺️ Open Map', web_app: { url: FRONTEND_URL } }]
        ]
      }
    }
  );
});

// Webhook handler for Vercel
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await bot.handleUpdate(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ error: 'Webhook failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}