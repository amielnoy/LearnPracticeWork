/**
 * The learner progress store, as a web app bound to LearnPracticeWorkData.
 *
 * Deployed by hand from the Apps Script editor, but committed here so the code
 * guarding the sheet is reviewable and diffable. `tests/unit/progressMerge.spec.ts`
 * reads this file and holds `mergeProgress` to the rules the SQL merge had.
 */

var MAX_IDS = 500;
var TOOLS = ['resume', 'interview', 'practice'];

function emptyProgress() {
  return {
    resumeStarted: false,
    resumeCompleted: false,
    interviewStarted: false,
    interviewAnswers: 0,
    interviewCompleted: false,
    practiceCompleted: [],
    lecturesViewed: [],
    lastTool: null,
  };
}

function ids(value) {
  if (!Array.isArray(value)) return [];
  return value.filter(function (id) {
    return typeof id === 'string' && id.length > 0;
  });
}

/**
 * Caps the row against a list the visitor controls. When the union exceeds
 * MAX_IDS, stored ids survive and incoming ids are dropped — an incoming
 * payload must never evict progress already recorded. Real ceilings are 40
 * coding challenges and 12 lectures, far below 500, so the cap only engages
 * under tampering.
 */
function union(a, b) {
  var seen = {};
  var out = [];
  ids(a)
    .concat(ids(b))
    .forEach(function (id) {
      if (!seen[id]) {
        seen[id] = true;
        out.push(id);
      }
    });
  return out.slice(0, MAX_IDS);
}

function tool(value) {
  return TOOLS.indexOf(value) === -1 ? null : value;
}

/** The union of two copies. Never last-write-wins: that loses a device's work. */
function mergeProgress(stored, incoming) {
  var s = stored || emptyProgress();
  var i = incoming || emptyProgress();
  return {
    resumeStarted: !!s.resumeStarted || !!i.resumeStarted,
    resumeCompleted: !!s.resumeCompleted || !!i.resumeCompleted,
    interviewStarted: !!s.interviewStarted || !!i.interviewStarted,
    interviewAnswers: Math.max(Number(s.interviewAnswers) || 0, Number(i.interviewAnswers) || 0),
    interviewCompleted: !!s.interviewCompleted || !!i.interviewCompleted,
    practiceCompleted: union(s.practiceCompleted, i.practiceCompleted),
    lecturesViewed: union(s.lecturesViewed, i.lecturesViewed),
    lastTool: tool(i.lastTool) || tool(s.lastTool) || null,
  };
}

var SHEET_NAME = 'learner_progress';
var HEADERS = [
  'google_sub', 'resume_started', 'resume_completed', 'interview_started',
  'interview_answers', 'interview_completed', 'practice_completed',
  'lectures_viewed', 'last_tool', 'updated_at',
];

/**
 * A leading `=`, `+`, `-` or `@` makes Sheets treat a value as a formula, and
 * both the ids and the sub arrive from a browser. An apostrophe forces text.
 */
function text(value) {
  var s = String(value == null ? '' : value);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function untext(value) {
  var s = String(value == null ? '' : value);
  return s.charAt(0) === "'" ? s.slice(1) : s;
}

function rowFromProgress(sub, progress) {
  return [
    text(sub),
    progress.resumeStarted,
    progress.resumeCompleted,
    progress.interviewStarted,
    progress.interviewAnswers,
    progress.interviewCompleted,
    text(JSON.stringify(ids(progress.practiceCompleted))),
    text(JSON.stringify(ids(progress.lecturesViewed))),
    text(progress.lastTool || ''),
    new Date().toISOString(),
  ];
}

function parseIds(cell) {
  try {
    return ids(JSON.parse(untext(cell) || '[]'));
  } catch (err) {
    return [];
  }
}

function progressFromRow(row) {
  return {
    resumeStarted: row[1] === true || row[1] === 'TRUE',
    resumeCompleted: row[2] === true || row[2] === 'TRUE',
    interviewStarted: row[3] === true || row[3] === 'TRUE',
    interviewAnswers: Number(row[4]) || 0,
    interviewCompleted: row[5] === true || row[5] === 'TRUE',
    practiceCompleted: parseIds(row[6]),
    lecturesViewed: parseIds(row[7]),
    lastTool: tool(untext(row[8])) || null,
  };
}

function sheet() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var tab = book.getSheetByName(SHEET_NAME);
  if (!tab) {
    tab = book.insertSheet(SHEET_NAME);
    tab.appendRow(HEADERS);
  }
  return tab;
}

/** First match wins, and a duplicate sub is an error rather than a coin toss. */
function rowIndexFor(tab, sub) {
  var column = tab.getRange(2, 1, Math.max(tab.getLastRow() - 1, 0), 1).getValues();
  var found = -1;
  for (var i = 0; i < column.length; i++) {
    if (untext(column[i][0]) === sub) {
      if (found !== -1) throw new Error('duplicate rows for one sub');
      found = i + 2;
    }
  }
  return found;
}

/**
 * The token travels in the POST body, not the query string: Apps Script's
 * `doPost(e)` cannot read custom request headers, and a query-string token
 * would land in Google's execution logs and any proxy log along the way.
 */
function authorized(body) {
  var expected = PropertiesService.getScriptProperties().getProperty('ACADEMY_TOKEN');
  if (!expected || expected.length < 32) return false;
  var given = (body && body.token) || '';
  if (given.length !== expected.length) return false;
  var diff = 0;
  for (var i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ given.charCodeAt(i);
  }
  return diff === 0;
}

/** Apps Script web apps always answer 200; the body carries the outcome, and
 *  `sheets_store` treats a body without `progress` as a failure. */
function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    // A body that will not parse cannot carry a valid token either; refusing
    // it here keeps the failure a plain 'unauthorized' instead of an
    // unhandled exception thrown before any lock is ever touched.
    return json({ error: 'unauthorized' });
  }
  if (!authorized(body)) return json({ error: 'unauthorized' });
  var sub = String(body.sub || '');
  if (!sub) return json({ error: 'missing sub' });

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return json({ error: 'busy' });
  try {
    var tab = sheet();
    var index = rowIndexFor(tab, sub);
    var stored = index === -1 ? emptyProgress() : progressFromRow(tab.getRange(index, 1, 1, HEADERS.length).getValues()[0]);
    if (body.op === 'load') return json({ progress: stored });

    var merged = mergeProgress(stored, body.progress);
    var row = rowFromProgress(sub, merged);
    if (index === -1) tab.appendRow(row);
    else tab.getRange(index, 1, 1, HEADERS.length).setValues([row]);
    return json({ progress: merged });
  } finally {
    lock.releaseLock();
  }
}
