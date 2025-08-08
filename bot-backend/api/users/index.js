import { supabase } from '../../lib/supabase.js';

export default async function handler(req, res) {
  // Enable CORS - allow frontend origins
  const allowedOrigins = [
    'https://openfreemap-frontend.vercel.app',
    'https://tma-ofm-react-template.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { telegramId, nickname, avatarUrl } = req.body;
      
      // First try to get existing user
      const { data: existingUser, error: findError } = await supabase
        .from('users')
        .select('*')
        .eq('telegram_id', telegramId)
        .single();

      if (existingUser && !findError) {
        // User already exists, return it
        return res.status(200).json(existingUser);
      }

      // User doesn't exist, create new one
      const { data, error } = await supabase
        .from('users')
        .insert([{ telegram_id: telegramId, nickname, avatar_url: avatarUrl }])
        .select()
        .single();

      if (error) {
        // If still a duplicate error, try to fetch the user again
        if (error.code === '23505') {
          const { data: retryUser } = await supabase
            .from('users')
            .select('*')
            .eq('telegram_id', telegramId)
            .single();
          
          if (retryUser) {
            return res.status(200).json(retryUser);
          }
        }
        throw error;
      }

      res.status(201).json(data);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}