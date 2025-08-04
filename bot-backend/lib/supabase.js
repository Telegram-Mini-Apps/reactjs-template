import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Debug environment variables
console.log('Environment check:', {
  hasSupabaseUrl: !!supabaseUrl,
  hasSupabaseKey: !!supabaseKey,
  supabaseUrlPrefix: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'undefined',
  supabaseKeyPrefix: supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'undefined'
});

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables:', {
    SUPABASE_URL: supabaseUrl ? 'SET' : 'MISSING',
    SUPABASE_ANON_KEY: supabaseKey ? 'SET' : 'MISSING',
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('SUPABASE'))
  });
  throw new Error(`Missing Supabase environment variables. URL: ${!!supabaseUrl}, Key: ${!!supabaseKey}`);
}

export const supabase = createClient(supabaseUrl, supabaseKey);