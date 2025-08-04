export default function handler(req, res) {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    platform: 'Vercel',
    environment: {
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_ANON_KEY,
      hasBotToken: !!process.env.BOT_TOKEN,
      hasFrontendUrl: !!process.env.FRONTEND_URL,
      hasBackendUrl: !!process.env.BACKEND_URL
    }
  });
}