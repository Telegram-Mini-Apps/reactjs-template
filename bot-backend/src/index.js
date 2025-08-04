import { Telegraf, Markup } from 'telegraf';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes for the frontend
app.get('/api/users/:telegramId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', req.params.telegramId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'User not found' });
      }
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { telegramId, nickname, avatarUrl } = req.body;

    const { data, error } = await supabase
      .from('users')
      .insert([{ telegram_id: telegramId, nickname, avatar_url: avatarUrl }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { nickname, avatarUrl } = req.body;

    const { data, error } = await supabase
      .from('users')
      .update({ nickname, avatar_url: avatarUrl })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/locations', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/locations', async (req, res) => {
  try {
    const { name, description, latitude, longitude, category, userId } = req.body;

    const { data, error } = await supabase
      .from('locations')
      .insert([{
        name,
        description,
        latitude,
        longitude,
        category,
        user_id: userId,
        type: 'permanent',
        is_approved: false
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Initialize Telegram Bot
const bot = new Telegraf(process.env.BOT_TOKEN);

const FRONTEND_URL = process.env.FRONTEND_URL;

// Bot commands
bot.start(async (ctx) => {
  await ctx.reply(
    '🌟 Welcome to OpenFreeMap!\n\nDiscover and share places around the world using our interactive map.',
    Markup.inlineKeyboard([
      [Markup.button.webApp('🗺️ Open Map', FRONTEND_URL)],
      [Markup.button.callback('ℹ️ Help', 'help')]
    ])
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
    Markup.inlineKeyboard([
      [Markup.button.webApp('🗺️ Open Map', FRONTEND_URL)],
      [Markup.button.callback('🔙 Back', 'back_to_start')]
    ])
  );
});

bot.action('back_to_start', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
    '🌟 Welcome to OpenFreeMap!\n\nDiscover and share places around the world using our interactive map.',
    Markup.inlineKeyboard([
      [Markup.button.webApp('🗺️ Open Map', FRONTEND_URL)],
      [Markup.button.callback('ℹ️ Help', 'help')]
    ])
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
    Markup.inlineKeyboard([
      [Markup.button.webApp('🗺️ Open Map', FRONTEND_URL)]
    ])
  );
});

// Error handling
bot.catch((err, ctx) => {
  console.error('Bot error:', err);
  console.error('Error context:', ctx);
  ctx.reply('Sorry, something went wrong. Please try /start to begin again.');
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Start bot
bot.launch().then(() => {
  console.log('Bot started successfully');
  console.log('Frontend URL:', FRONTEND_URL);
}).catch(err => {
  console.error('Failed to start bot:', err);
});