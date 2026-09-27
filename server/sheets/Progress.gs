/**
 * The learner progress store, as a web app bound to LearnPracticeWorkData.
 *
 * Deployed by hand from the Apps Script editor, but committed here so the code
 * guarding the sheet is reviewable and diffable. `tests/unit/progressMerge.spec.ts`
 * reads this file and holds `mergeProgress` to the rules the SQL merge had.
 */

var MAX_IDS = 500;
var TOOLS = ['resume', 'interview', 'practice'];

/**
 * How long a request waits for the script lock — deliberately well under
 * `sheets_store.TIMEOUT`, which is 20 seconds. The two numbers belong together:
 * a wait budget equal to the HTTP timeout means the client gives up at the same
 * instant this does, so a successful write is discarded as a 500 and the
 * `{"error":"busy"}` this exists to return is never seen.
 */
var LOCK_WAIT_MS = 12000;

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
  // `Object.create(null)` rather than `{}`: a plain object inherits from
  // Object.prototype, so an id named `constructor`, `toString`, `valueOf`,
  // `hasOwnProperty` or `__proto__` read as already seen and was dropped.
  var seen = Object.create(null);
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

/**
 * The `google_sub` cell, forced to text *unconditionally*.
 *
 * A Google `sub` is a ~21-digit decimal string. Written bare, `setValues` and
 * `appendRow` parse it as a number, which exceeds IEEE-754 precision: it reads
 * back with its tail zeroed, `rowIndexFor` never matches it again, every sync
 * appends another row, and every load answers `emptyProgress()` — which the
 * client then adopts over the learner's real `localStorage`. `text()` cannot
 * be weakened to cover this, because its job is the narrower one of disarming
 * a formula; this one applies to a single column whose values are never
 * anything but opaque text.
 */
function forcedText(value) {
  return "'" + String(value == null ? '' : value);
}

function untext(value) {
  var s = String(value == null ? '' : value);
  return s.charAt(0) === "'" ? s.slice(1) : s;
}

function rowFromProgress(sub, progress) {
  return [
    forcedText(sub),
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
    // Plain text on the sub column, so a value typed in by hand behaves like
    // one `forcedText` wrote: without it Sheets parses a 21-digit sub as a
    // number and the row becomes unfindable.
    tab.getRange(1, 1, tab.getMaxRows(), 1).setNumberFormat('@');
  }
  return tab;
}

/** First match wins, and a duplicate sub is an error rather than a coin toss. */
function rowIndexFor(tab, sub) {
  // Apps Script requires numRows >= 1, so a tab holding only its header row
  // must not reach getRange at all — `sheet()` creates exactly that state, and
  // the range would throw on the first request after every deployment.
  var dataRows = tab.getLastRow() - 1;
  if (dataRows < 1) return -1;
  var column = tab.getRange(2, 1, dataRows, 1).getValues();
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
  // Only these two. `load` used to be the single special case and everything
  // else fell through to the write, so a request with no `op` at all merged
  // `emptyProgress()` into the row.
  var op = String(body.op || '');
  if (op !== 'load' && op !== 'merge') return json({ error: 'unknown op' });

  var lock = LockService.getScriptLock();
  // Shorter than `sheets_store.TIMEOUT` (20s) on purpose. At 20s the script can
  // spend the client's whole budget waiting: the caller's ReadTimeout and this
  // giving up land together, so it reads a 500 and discards a union that was
  // written, and the 'busy' signal below could never be observed. Keep the two
  // numbers apart — if TIMEOUT moves, move this with it.
  if (!lock.tryLock(LOCK_WAIT_MS)) return json({ error: 'busy' });
  try {
    var tab = sheet();
    var index = rowIndexFor(tab, sub);
    var stored = index === -1 ? emptyProgress() : progressFromRow(tab.getRange(index, 1, 1, HEADERS.length).getValues()[0]);
    if (op === 'load') return json({ progress: stored });

    var merged = mergeProgress(stored, body.progress);
    var row = rowFromProgress(sub, merged);
    if (index === -1) tab.appendRow(row);
    else tab.getRange(index, 1, 1, HEADERS.length).setValues([row]);
    return json({ progress: merged });
  } finally {
    lock.releaseLock();
  }
}
