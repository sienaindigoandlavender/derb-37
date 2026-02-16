import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Site Supabase — entries, settings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase: SupabaseClient = supabaseUrl && (supabaseServiceKey || supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey)
  : null as any;

// Nexus Supabase — legal pages, content network, newsletter
const nexusUrl = process.env.NEXUS_SUPABASE_URL || '';
const nexusKey = process.env.NEXUS_SUPABASE_ANON_KEY || '';

export const nexus: SupabaseClient = nexusUrl && nexusKey
  ? createClient(nexusUrl, nexusKey)
  : null as any;

export const hasSupabase = !!(supabaseUrl && (supabaseServiceKey || supabaseAnonKey));
export const hasNexus = !!(nexusUrl && nexusKey);
