import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/**
 * Read-only Supabase client for the academy's public content tables
 * (question bank, coding challenges, lecture series). Uses the anon key,
 * which is safe to hold server-side or client-side — RLS policies on those
 * tables only grant SELECT, so this key can never write or read anything else.
 */
export function getSupabaseContentClient(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required');
  }

  client = createClient(url, anonKey, { auth: { persistSession: false } });
  return client;
}
