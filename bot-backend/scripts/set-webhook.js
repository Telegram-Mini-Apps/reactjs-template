import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const BACKEND_URL = process.env.BACKEND_URL;

if (!BOT_TOKEN || !BACKEND_URL) {
  console.error('Missing BOT_TOKEN or BACKEND_URL environment variables');
  process.exit(1);
}

const webhookUrl = `${BACKEND_URL}/webhook`;

async function setWebhook() {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`,
      {
        url: webhookUrl,
        allowed_updates: ['message', 'callback_query']
      }
    );

    if (response.data.ok) {
      console.log('✅ Webhook set successfully!');
      console.log(`📡 Webhook URL: ${webhookUrl}`);
    } else {
      console.error('❌ Failed to set webhook:', response.data);
    }
  } catch (error) {
    console.error('❌ Error setting webhook:', error.message);
  }
}

setWebhook();