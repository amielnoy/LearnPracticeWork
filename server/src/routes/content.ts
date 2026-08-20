import { Router, type IRouter } from 'express';
import { getSupabaseContentClient } from '../lib/supabase';
import { logger } from '../lib/logger';

const router: IRouter = Router();

function isLang(value: unknown): value is 'en' | 'he' {
  return value === 'en' || value === 'he';
}

router.get('/content/question-bank', async (req, res) => {
  const lang = isLang(req.query.lang) ? req.query.lang : 'en';
  try {
    const supabase = getSupabaseContentClient();
    const { data: stages, error: stagesError } = await supabase
      .from('question_bank_stages')
      .select('id, position, icon, title')
      .eq('lang', lang)
      .order('position');
    if (stagesError) throw stagesError;

    const stageIds = (stages ?? []).map(s => s.id);
    const { data: items, error: itemsError } = await supabase
      .from('question_bank_items')
      .select('stage_id, position, question, hint, answer')
      .in('stage_id', stageIds.length > 0 ? stageIds : [-1])
      .order('position');
    if (itemsError) throw itemsError;

    const result = (stages ?? []).map(stage => ({
      icon: stage.icon,
      title: stage.title,
      items: (items ?? [])
        .filter(item => item.stage_id === stage.id)
        .map(item => ({ q: item.question, hint: item.hint, answer: item.answer })),
    }));

    res.json({ stages: result });
  } catch (err) {
    logger.error({ err }, 'Failed to load question bank content');
    res.status(503).json({ error: 'Content temporarily unavailable' });
  }
});

router.get('/content/coding-challenges', async (req, res) => {
  const lang = isLang(req.query.lang) ? req.query.lang : 'en';
  try {
    const supabase = getSupabaseContentClient();
    const { data: levels, error: levelsError } = await supabase
      .from('coding_challenge_levels')
      .select('id, position, label, blurb')
      .eq('lang', lang)
      .order('position');
    if (levelsError) throw levelsError;

    const levelIds = (levels ?? []).map(l => l.id);
    const { data: challenges, error: challengesError } = await supabase
      .from('coding_challenges')
      .select('level_id, position, title, prompt, hint, code, complexity')
      .in('level_id', levelIds.length > 0 ? levelIds : [-1])
      .order('position');
    if (challengesError) throw challengesError;

    const result = (levels ?? []).map(level => ({
      label: level.label,
      blurb: level.blurb,
      items: (challenges ?? [])
        .filter(c => c.level_id === level.id)
        .map(c => ({
          title: c.title,
          prompt: c.prompt,
          hint: c.hint,
          code: c.code,
          complexity: c.complexity,
        })),
    }));

    res.json({ levels: result });
  } catch (err) {
    logger.error({ err }, 'Failed to load coding challenges content');
    res.status(503).json({ error: 'Content temporarily unavailable' });
  }
});

router.get('/content/lecture-series', async (req, res) => {
  const lang = isLang(req.query.lang) ? req.query.lang : 'en';
  try {
    const supabase = getSupabaseContentClient();
    const { data: tracks, error: tracksError } = await supabase
      .from('lecture_tracks')
      .select('id, position, title, lead')
      .eq('lang', lang)
      .order('position');
    if (tracksError) throw tracksError;

    const trackIds = (tracks ?? []).map(t => t.id);
    const { data: lectures, error: lecturesError } = await supabase
      .from('lecture_items')
      .select('track_id, position, num, ready, title, description, url')
      .in('track_id', trackIds.length > 0 ? trackIds : [-1])
      .order('position');
    if (lecturesError) throw lecturesError;

    const result = (tracks ?? []).map(track => ({
      title: track.title,
      lead: track.lead,
      lectures: (lectures ?? [])
        .filter(l => l.track_id === track.id)
        .map(l => ({
          num: l.num,
          ready: l.ready,
          title: l.title,
          desc: l.description,
          ...(l.url ? { url: l.url } : {}),
        })),
    }));

    res.json({ tracks: result });
  } catch (err) {
    logger.error({ err }, 'Failed to load lecture series content');
    res.status(503).json({ error: 'Content temporarily unavailable' });
  }
});

export default router;
