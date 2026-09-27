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
