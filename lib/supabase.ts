import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const hasSupabase = !!(url && (anonKey || serviceKey));

export function createClient(): SupabaseClient {
  if (!hasSupabase) {
    throw new Error('Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and a key.');
  }
  return createSupabaseClient(url, serviceKey || anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const supabase: SupabaseClient = hasSupabase
  ? createSupabaseClient(url, anonKey || serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : (null as unknown as SupabaseClient);
