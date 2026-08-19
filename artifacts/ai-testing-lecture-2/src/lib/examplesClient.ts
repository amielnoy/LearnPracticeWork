import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { lang } from './i18n';

/**
 * Worked-example slide content lives in the `lecture_examples` Supabase
 * table (see the "AI Testing" track content). This deck fetches it live at
 * runtime using the public anon key — RLS on that table only grants SELECT,
 * so this key can never write or read anything else.
 */

export interface ExampleRow {
  label: string;
  value: string;
}

export interface ExamplePanel {
  label?: string;
  rows: ExampleRow[];
  verdict?: { status: string; note: string };
}

export interface LectureExample {
  eyebrow: string;
  title: string;
  bullets: string[];
  panels: ExamplePanel[];
}

/** This deck is always "Prompt Engineering for Testers" (lecture 2 of the AI Testing track). */
const LECTURE_ITEM_ID: Record<'en' | 'he', number> = { en: 2, he: 22 };

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (client) return client;
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  if (!url || !anonKey) {
    throw new Error('VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required');
  }
  client = createClient(url, anonKey, { auth: { persistSession: false } });
  return client;
}

export async function fetchLectureExample(position: number): Promise<LectureExample> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('lecture_examples')
    .select('eyebrow, title, bullets, panels')
    .eq('lecture_item_id', LECTURE_ITEM_ID[lang])
    .eq('lang', lang)
    .eq('position', position)
    .single();
  if (error) throw error;
  return data as unknown as LectureExample;
}
