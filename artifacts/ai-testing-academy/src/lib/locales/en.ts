export const en = {
  dir: 'ltr' as 'ltr' | 'rtl',
  lang: 'en' as string,
  ui: {
    skip: 'Skip to main content',
    navOpen: 'Open navigation menu',
    navClose: 'Close navigation menu',
    toTop: 'Back to top',
  },
  nav: {
    logo: 'AI Testing Academy',
    agentsGroup: 'Agents',
    // Keyed by section id, not ordered: the order lives in `lib/sections.ts`,
    // which is what both the nav and the page render from. Only the words are
    // translated.
    labels: {
      resume: '📄 Resume & CV',
      'lecture-series': '🎓 Lecture Series',
      'interview-talk': '🎙️ Mock Interview',
      'interview-questions': '❓ Interview Questions',
      'coding-challenges': '🐍 Python Coding Challenges',
      setup: '⚙️ Settings',
    } as Record<string, string>,
    communityGroup: 'Community',
    community: [
      {
        href: 'https://www.youtube.com/@amielnoy',
        label: '▶ YouTube',
        cls: 'youtube-btn',
        target: '_blank',
      },
      {
        href: 'https://www.linkedin.com/in/amiel-peled/',
        label: '💼 LinkedIn',
        cls: 'linkedin-btn',
        target: '_blank',
      },
      {
        href: 'https://chat.whatsapp.com/Bwjb01CGfxqIE04lkz2us0?mode=gi_t',
        label: '💬 AI Automation & DevOps Community',
        cls: 'whatsapp-btn',
        target: '_blank',
      },
    ],
    themeToggle: { ariaLabel: 'Toggle theme' },
    langToggle: { ariaLabel: 'Switch language', label: 'עברית' },
  },
  hero: {
    h1Line1: 'AI Testing Academy',
    h1Line2: 'Your AI-Powered QA Career Launchpad',
    p: 'Master test automation, DevOps, and AI testing with hands-on agents, structured lectures, and real interview practice. Built for QA engineers who want to stay ahead of the curve.',
    badges: [
      '🤖 AI Agents',
      '🎙️ Mock Interviews',
      '📄 Resume Review',
      '🎓 Lecture Series',
      '🐳 DevOps & CI',
    ],
    cta: [
      {
        href: '#interview-talk',
        label: 'Try a sample interview →',
        cls: 'primary',
        sampleResume: false,
        sampleInterview: true,
      },
      {
        href: '#resume',
        label: 'Analyze a sample CV',
        cls: 'ghost',
        sampleResume: true,
        sampleInterview: false,
      },
      {
        href: '#lecture-series',
        label: 'Watch Lectures',
        cls: 'ghost',
        sampleResume: false,
        sampleInterview: false,
      },
    ],
    tldr: {
      heading: 'What you get:',
      items: [
        { b: 'Agent 1', text: ' — AI resume scorer and rewriter for QA roles' },
        { b: 'Agent 2', text: ' — Live mock interview, 5 stages' },
        { b: 'Lecture Series', text: ' — 10 in-depth lectures on AI Testing' },
        { b: 'Question Bank', text: ' — 25+ real interview questions + AI enrichment' },
      ],
    },
  },
  setup: {
    title: 'Connection Setup',
    settingsTitle: 'AI provider settings',
    settingsHint: 'Optional while free usage is available',
    settingsQuotaHint: 'Free daily usage is exhausted — connect your own provider to continue',
    lead: 'Connect your AI provider once — both agents share the same key. Gemini has a free tier; Claude gives the best resume rewrites.',
    boxTitle: '🔌 Choose your AI provider',
    providerLabel: 'Provider',
    modelLabel: 'Model',
    testBtn: '🔗 Test connection',
    useOwnKeyLabel: 'Use my own API key',
    rememberKeyLabel: 'Remember this key on this device',
    rememberKeyWarning:
      'Only enable this on a private device. The key will remain in browser storage after you close this tab.',
    apiKeyLabel: 'API Key',
    resetBtn: '🔄 Reset provider settings',
    notice:
      "Your own key is kept only for this browser session unless you explicitly choose to remember it, and is sent directly to the provider's API. If you use the default key, requests are proxied through our server — the key itself never reaches your browser.",
    providers: [
      { value: 'groq', label: 'GPT-OSS (Groq)' },
      { value: 'anthropic', label: 'Claude (Anthropic)' },
      { value: 'openai', label: 'GPT (OpenAI)' },
    ],
  },
  tools: {
    eyebrow: 'Choose your path',
    title: 'What do you want to work on today?',
    lead: 'Start immediately with the academy’s free daily AI allowance. Provider setup is optional until that allowance is used.',
    resume: {
      title: 'Resume Coach',
      desc: 'Score a QA or SDET resume, identify gaps, and build a stronger targeted version.',
      cta: 'Analyze a sample CV →',
    },
    interview: {
      title: 'Mock Interview',
      desc: 'Practice a realistic multi-stage interview and receive a focused verdict.',
      cta: 'Try a sample interview →',
    },
    practice: {
      title: 'Practice Library',
      desc: 'Work through interview questions and Python automation challenges at your pace.',
      cta: 'Start practicing →',
    },
    continueLabel: 'Continue where you stopped',
    progressLabel: 'Progress',
    completedLabel: 'complete',
    freshLabel: 'Not started',
    quotaAvailableLabel: 'Up to {limit} free AI requests are available each day',
    quotaLabel: '{remaining} of {limit} free AI requests remaining in your current allowance',
  },
  resume: {
    title: 'Agent 1 — Resume & Cover Letter',
    lead: 'Upload your CV and get a scored evaluation with strengths, gaps, and an AI-rewritten version tailored to any QA or SDET role.',
    boxTitle: '📄 Evaluate & improve your resume',
    targetRoleLabel: 'Target role',
    targetRoleOptional: '(optional)',
    targetRolePlaceholder: 'e.g. SDET, QA Automation Lead, DevOps Engineer',
    uploadZoneAriaLabel: 'Upload resume — click or drag a file',
    uploadPrompt: '📁 Click or drag your resume here — PDF, DOCX, or TXT',
    pasteLabel: 'Or paste your resume text:',
    pastePlaceholder: 'Paste your resume text here…',
    jobDescLabel: 'Job description',
    jobDescOptional: '(optional — for targeted rewrite)',
    jobDescPlaceholder: 'Paste the job description here to get a targeted rewrite…',
    evaluateBtn: '📊 Evaluate resume',
    scoreAriaLabel: 'Overall score',
    strengthsTitle: '✅ Strengths',
    gapsTitle: '⚠️ Gaps',
    recsTitle: '💡 Recommendations',
    buildResumeBtn: '✨ Build improved resume',
    improvedTitle: '✨ Improved resume',
    downloadPdfBtn: '⬇️ Download as PDF',
    tipsTitle: "📋 Resume Do's & Don'ts",
    tipsLead:
      "The biggest mistake job seekers make: assuming that if they're a fit for the role, recruiters will figure it out on their own. They won't. Spell it out.",
    doTitle: '✅ Do',
    dontTitle: "🚫 Don't",
    dos: [
      "Understand the job posting deeply — what actually matters to them and what they're looking for.",
      'Match your titles precisely to what the recruiter is searching for, not just what was on your email signature.',
      'Weave keywords straight from the job description into the resume, so it clears the automated screen.',
      'Show a clear employment timeline and fill any gaps in it.',
      "Chew through what you did and spoon-feed it to the reader — don't expect anyone to dig your relevant experience out of the bullets.",
      "Make the formula obvious on every line: this is what I did >> this is what they're looking for >> this is why I'm the right fit.",
    ],
    donts: [
      "If you did something but didn't write it down, as far as the recruiter is concerned, you didn't do it.",
      "Don't leave your most relevant experience buried in a role from 10 years ago and expect anyone to reach it.",
      'Don\'t rely on "if they read closely, they\'ll get it" — in most cases no one reads closely, and an ATS scans the file before a human ever sees it.',
      "Don't leave a generic title that doesn't tell the recruiter you're a fit for this specific role.",
      "Don't count on explaining the fit out loud — you might never get to that stage.",
      "Don't assume the reader will guess the connection between your experience and the job's requirements — spell it out.",
    ],
    tipsSourceLabel: '💡 Inspired by this LinkedIn post',
    tipsSourceUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7495691019024400384/',
    tipsExpertBtn: '👩‍💼 Follow resume expert Noa Lebovich on LinkedIn',
    tipsExpertUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7495691019024400384/',
  },
  interview: {
    title: 'Agent 2 — Mock Interview',
    lead: 'Run a realistic QA-Automation interview with an AI interviewer — five stages, from HR to AI testing.',
    boxTitle: '🎙️ Start your mock interview',
    notice:
      'Free AI usage starts automatically. If it is unavailable or exhausted, open Settings to connect your own provider.',
    chatAriaLabel: 'Interview chat',
    initialMsg:
      'Press "Start interview" to begin. The AI interviewer will guide you through all five stages.',
    chatPlaceholder: 'Type your answer… (Enter to send, Shift+Enter for new line)',
    sendBtn: 'Send',
    startBtn: '▶️ Start interview',
    verdictBtn: '🏁 Get verdict',
  },
  footer: {
    year: new Date().getFullYear(),
    text: 'AI Testing Academy · Built by',
    authorHref: 'https://www.linkedin.com/in/amiel-peled/',
    authorName: 'Amiel Peled',
    suffix: '· For QA engineers who want to stay ahead',
  },
  progress: {
    title: '📊 Your Progress',
    lead: 'Tracked locally in this browser — come back anytime to pick up where you left off.',
    overallLabel: 'Overall',
    lecturesLabel: 'Lectures viewed',
    challengesLabel: 'Coding challenges completed',
    interviewLabel: 'Mock interview',
    resumeLabel: 'Resume review',
    notStarted: 'Not started',
    started: 'In progress',
    doneLabel: 'Completed',
    badgesTitle: '🏅 Badges',
    badges: {
      firstLecture: { label: 'Lecture Explorer', desc: 'Open your first lecture' },
      allLectures: { label: 'Series Graduate', desc: 'View every live lecture' },
      firstChallenge: { label: 'Code Warrior', desc: 'Solve your first coding challenge' },
      allChallenges: { label: 'Code Master', desc: 'Solve every coding challenge' },
      interview: { label: 'Interview Ready', desc: 'Complete a mock interview' },
      resume: { label: 'Resume Polished', desc: 'Get your resume reviewed' },
      allRounder: { label: 'All-Rounder', desc: 'Complete every section of the academy' },
    },
  },
  whatsNew: {
    title: '✨ What’s New',
    items: [
      {
        title: '4 new AI Testing lectures added',
        desc: 'Security, performance, AI-assisted test generation, and building a full AI testing strategy — lectures 7 through 10 are live now.',
        href: '#lecture-series',
        cta: 'Explore the lecture series →',
      },
    ],
  },
  s: {
    keyLabelGroq: 'Groq API Key',
    keyLabelGemini: 'Gemini API Key',
    keyLabelAnthropic: 'Claude API Key',
    keyLabelOpenai: 'OpenAI API Key',
    errGeminiKeyHint: ' (Gemini keys start with AIza — get one free at aistudio.google.com)',
    errGroqKeyHint: ' (Groq keys start with gsk_ — get one free at console.groq.com)',
    errKeyNotAnthropic: 'This looks like an OpenAI key. Switch the provider dropdown to OpenAI.',
    errKeyNotOpenai: 'This looks like an Anthropic key. Switch the provider dropdown to Claude.',
    errKeyNotGroq: 'This does not look like a Groq key. Groq keys start with gsk_.',
    placeholderEnvKey: '(using server-configured default key)',
    labelSuffixLocal: ' Key',
    labelSuffixEnv: ' Key (server default)',
    statusTesting: '⏳ Testing connection…',
    statusOkPrefix: '✅ Connected (',
    pingSystem: 'You are a helpful assistant. Reply with exactly the word: OK',
    pingUser: 'Ping',
    errNoKey: 'No AI provider is available. Add your key in Settings.',
    errTruncated:
      'The model ran out of room before finishing. Try a shorter role or fewer keywords.',
    errBlockedPrefix: 'Network error reaching ',
    errBlockedMid: '. Possible causes:\n',
    errBlockedCauses:
      '• CORS policy blocking the browser-direct request\n• Firewall or network issue\n',
    errBlockedTry: 'Try switching to a different provider.\n',
    errBlockedOpenUrl: '',
    errApiPrefix: 'API error (',
    errProxyBusy:
      'The shared AI service is busy, or its free allowance is spent. Wait a moment and try again, or connect your own provider key in Settings to keep going.',
    errProxyUnavailable:
      'The academy’s own AI key is unavailable right now. Connect your own provider key in Settings to keep going.',
    errNoJson: 'Could not parse JSON from the model response. Please try again.',
    uploadReading: '⏳ Reading ',
    uploadPreparing: '⏳ Preparing to read ',
    uploadPageMid: ' — page ',
    uploadPageOf: ' of ',
    errScannedPdf:
      'This PDF has no text layer — it is a scan or an image-only export, which an applicant tracking system cannot read either. Re-export it as a text PDF, or paste the text below.',
    signInAria: 'Sign in with Google',
    signingInStatus: 'Signing in…',
    signInError: 'Sign-in failed. Please try again.',
    signInBusy: 'Too many sign-in attempts right now. Please wait a minute and try again.',
    signInUnavailable: 'Sign-in is temporarily unavailable on this server.',
    signOutBtn: 'Sign out',
    uploadPrompt: '📁 Click or drag your resume here — PDF, DOCX, or TXT',
    uploadLoadedMid: ' · ',
    uploadLoadedSuffix: ' chars loaded',
    errCdnFail: 'Could not load the parser library:\n',
    errFormatPrefix: 'Unsupported file type: ',
    errFormatSuffix: '. Please use PDF, DOCX, or TXT.',
    errExtractFail: 'Could not extract text. Try copying and pasting the text manually.',
    errResumeEmpty: 'Please paste or upload your resume first.',
    errNoEval: 'Please evaluate the resume first before building the improved version.',
    btnEvaluating: '⏳ Evaluating…',
    btnEvaluate: '📊 Evaluate resume',
    btnImproving: '⏳ Building improved resume…',
    btnBuildResume: '✨ Build improved resume',
    btnPreparingPdf: '⏳ Preparing PDF…',
    btnDownloadPdf: '⬇️ Download as PDF',
    promptRolePrefix: 'Target role: ',
    promptResumeLabel: '\n\nResume text:\n',
    promptRolePrefixImprove: 'Rewrite the following resume for the target role: ',
    promptJobDescLabel: '\n\nJob description to tailor for:\n',
    promptEvalResultsLabel:
      '\n\nPrevious evaluation results (gaps and recommendations to address):\n',
    promptOriginalResumeLabel: '\n\nOriginal resume:\n',
    statusInterviewerThinking: '⏳ Interviewer is thinking…',
    statusGeneratingVerdict: '⏳ Generating your verdict…',
    errNoKeyInterview:
      'Free AI access is unavailable. Add your API key in Settings, then start the interview.',
    interviewOpener: 'Please start the interview. I am ready.',
    interviewOpenerMsg: "Ready — let's go!",
    btnRestartInterview: '🔄 Restart interview',
    videoLoading: 'Loading video…',
    videoMissingPrefix: 'Video file not found: ',
    videoMissingSuffix: '',
    themeLabelLight: 'Light mode',
    themeLabelDark: 'Dark mode',
    copyBtn: 'Copy',
    copyBtnDone: '✅ Copied!',
    copyBtnReset: 'Copy',
    copyBtnFail: '❌ Failed to copy',
    voiceLang: 'en-US',
    btnVoiceOn: '🎙️ Voice mode',
    btnVoiceOff: '🔇 Voice off',
    btnMic: '🎤 Speak',
    btnMicListening: '⏹ Listening…',
    errVoiceNotSupported:
      'Voice mode requires a browser that supports the Web Speech API (Chrome/Edge recommended).',
  },
  codingChallenges: {
    title: '🐍 Python Coding Challenges for Test Automation',
    lead: '40 practical coding problems that come up in real QA-Automation interviews, grouped into three levels. Click once to reveal a hint, click again to reveal a short, efficient solution with time and space complexity.',
    hintLabel: '💡 Hint',
    complexityLabel: '⏱️ Complexity',
    showHintBtn: 'Show hint',
    showSolutionBtn: 'Show solution',
    hideBtn: 'Hide',
    challengeCountLabel: '{count} challenges',
    levels: [
      {
        label: 'Level 1 — Fundamentals',
        blurb:
          'Lists, dicts and a little recursion. Nothing here needs a clever trick, only a clean single pass.',
        items: [
          {
            title: '1. Deduplicate test IDs, preserving order',
            prompt:
              'Given a list of test case IDs that may contain duplicates, return a new list with duplicates removed, preserving first-seen order.',
            hint: 'Use a set to track what has been seen while iterating once and appending only unseen items to the result list.',
            code: `def dedupe(ids):
    seen = set()
    result = []
    for i in ids:
        if i not in seen:
            seen.add(i)
            result.append(i)
    return result`,
            complexity:
              'Time: O(n) average (set lookups are O(1) amortized). Space: O(n) for the seen set and result.',
          },
          {
            title: '2. Find the first duplicate test ID',
            prompt:
              'Given a large list of test IDs, return the first ID that appears more than once, or None if there are no duplicates.',
            hint: 'Avoid the naive O(n^2) nested-loop check — a single pass with a set gets it done in one sweep.',
            code: `def first_duplicate(ids):
    seen = set()
    for i in ids:
        if i in seen:
            return i
        seen.add(i)
    return None`,
            complexity: 'Time: O(n). Space: O(n) for the seen set.',
          },
          {
            title: '3. Flatten a nested test suite',
            prompt:
              'Test suites can nest suites inside suites arbitrarily deep (a tree of lists). Write a function that flattens this structure into a single list of leaf test names.',
            hint: 'Recursion works naturally on a tree: if a node is a list, recurse into each child; if it is a plain value (a leaf test name), add it to the result.',
            code: `def flatten_suite(node):
    result = []
    def walk(n):
        if isinstance(n, (list, tuple)):
            for child in n:
                walk(child)
        else:
            result.append(n)
    walk(node)
    return result`,
            complexity:
              'Time: O(n) where n = total number of nodes in the tree. Space: O(d) recursion stack (d = tree depth) plus O(n) for the output.',
          },
          {
            title: '4. Count test results by status',
            prompt:
              'Given a list of result dicts like `{"name": ..., "status": "passed"}`, return how many results there are per status.',
            hint: 'One pass and a dict of counters is enough. collections.Counter does the bookkeeping for you.',
            code: `from collections import Counter

def count_by_status(results):
    return Counter(r["status"] for r in results)`,
            complexity: 'Time: O(n). Space: O(k), where k is the number of distinct statuses.',
          },
          {
            title: '5. Find the N slowest tests',
            prompt:
              'Given a list of test dicts with a `duration` field, return the n slowest of them, slowest first.',
            hint: 'Sorting the whole list is O(m log m) when you only need n items. heapq.nlargest keeps a heap of size n instead.',
            code: `import heapq

def slowest(tests, n):
    return heapq.nlargest(n, tests, key=lambda t: t["duration"])`,
            complexity: 'Time: O(m log n) for m tests. Space: O(n) for the heap and the result.',
          },
          {
            title: '6. Group tests by tag',
            prompt:
              'Given a list of test dicts like `{"name": ..., "tags": ["smoke", "api"]}`, return a dict mapping each tag to the list of test names carrying it.',
            hint: 'A plain dict forces you to check "is this key here yet?" on every insert. collections.defaultdict(list) creates the empty list for you on first touch.',
            code: `from collections import defaultdict

def group_by_tag(tests):
    groups = defaultdict(list)
    for test in tests:
        for tag in test.get("tags", ()):
            groups[tag].append(test["name"])
    return dict(groups)`,
            complexity:
              'Time: O(n*t) for n tests with t tags each. Space: O(n*t) for the grouped output.',
          },
          {
            title: '7. Chunk test IDs into batches',
            prompt:
              'Split a flat list of test IDs into consecutive batches of at most `size` items, so each batch can be handed to a separate CI runner.',
            hint: 'Slice with a stride: range(0, len(ids), size) gives you every batch start, and a slice past the end simply returns a shorter list — no special case for the remainder.',
            code: `def chunk(ids, size):
    if size <= 0:
        raise ValueError("size must be positive")
    return [ids[i:i + size] for i in range(0, len(ids), size)]`,
            complexity: 'Time: O(n). Space: O(n) for the batches.',
          },
          {
            title: '8. Parse a duration string into seconds',
            prompt:
              'Test reports print durations as strings like `"1h 2m 30s"`, `"90s"` or `"2m"`. Convert one into a total number of seconds.',
            hint: 'Split on whitespace and read each token as a number plus a unit suffix. A units dict keyed by the suffix letter turns the whole thing into one multiply-and-add.',
            code: `UNITS = {"h": 3600, "m": 60, "s": 1}

def parse_duration(text):
    total = 0
    for token in text.split():
        unit = token[-1]
        if unit not in UNITS:
            raise ValueError(f"Unknown unit in {token!r}")
        total += float(token[:-1]) * UNITS[unit]
    return total`,
            complexity: 'Time: O(n) in the length of the string. Space: O(n) for the split tokens.',
          },
          {
            title: '9. Diff two config dicts',
            prompt:
              'Compare a baseline config against a new one and report which keys were added, which were removed, and which changed value.',
            hint: 'Treat the two key sets as sets: new - old is added, old - new is removed, and the intersection only needs a value comparison.',
            code: `def diff_config(old, new):
    old_keys, new_keys = set(old), set(new)
    return {
        "added": sorted(new_keys - old_keys),
        "removed": sorted(old_keys - new_keys),
        "changed": sorted(
            k for k in old_keys & new_keys if old[k] != new[k]
        ),
    }`,
            complexity: 'Time: O(n + m) for the two configs. Space: O(n + m) for the key sets.',
          },
          {
            title: '10. Which tests ran yesterday but not today?',
            prompt:
              'Given the ordered list of test names from run A and from run B, return the names present in A but missing from B, keeping the order they had in A.',
            hint: 'Build a set from B first so each membership check is O(1), then filter A in order. Using a plain list for the lookup silently makes this O(n*m).',
            code: `def missing_from(run_a, run_b):
    present = set(run_b)
    return [name for name in run_a if name not in present]`,
            complexity:
              'Time: O(n + m). Space: O(m) for the lookup set, plus O(n) worst case for the output.',
          },
          {
            title: '11. Find the longest test name',
            prompt:
              'Given a list of test names, return the longest one. If several tie, return the one that appears first.',
            hint: 'max() takes a key function, so max(names, key=len) does the whole scan for you — and it already returns the first of any tie. Handle the empty list explicitly.',
            code: `def longest_name(names):
    if not names:
        return None
    return max(names, key=len)`,
            complexity: 'Time: O(n) over the names. Space: O(1).',
          },
          {
            title: '12. Total and average suite duration',
            prompt:
              'Given a list of test dicts with a `duration` field, return the total runtime and the average runtime of the suite.',
            hint: 'sum() over a generator avoids building an intermediate list. The only trap is dividing by zero when the suite is empty — decide what an empty suite should report before you divide.',
            code: `def suite_timing(tests):
    total = sum(t["duration"] for t in tests)
    average = total / len(tests) if tests else 0.0
    return total, average`,
            complexity: 'Time: O(n). Space: O(1) — the generator holds one value at a time.',
          },
          {
            title: '13. Compute the pass rate',
            prompt:
              'Given a list of result dicts with a `status` field, return the percentage that passed, rounded to one decimal place.',
            hint: 'A boolean is an int in Python, so sum(r["status"] == "passed" for r in results) counts matches directly. Guard the empty case before dividing.',
            code: `def pass_rate(results):
    if not results:
        return 0.0
    passed = sum(r["status"] == "passed" for r in results)
    return round(passed / len(results) * 100, 1)`,
            complexity: 'Time: O(n). Space: O(1).',
          },
          {
            title: '14. Turn a test title into a valid identifier',
            prompt:
              'Convert a human title like `"Login  with VALID user!"` into a snake_case test function name: `login_with_valid_user`.',
            hint: 'Lowercase, then replace every run of non-alphanumeric characters with a single underscore, then trim the underscores off the ends. One regex substitution handles the runs.',
            code: `import re

def slugify(title):
    slug = re.sub(r"[^a-z0-9]+", "_", title.lower())
    return slug.strip("_")`,
            complexity: 'Time: O(n) in the length of the title. Space: O(n) for the new string.',
          },
          {
            title: '15. Zip names and statuses into a dict',
            prompt:
              'A legacy report gives you test names and their statuses as two parallel lists. Build a single dict mapping each name to its status.',
            hint: 'dict(zip(names, statuses)) is the idiomatic one-liner. Note that zip stops at the shorter list, so check the lengths first if a mismatch is a real error.',
            code: `def to_report(names, statuses):
    if len(names) != len(statuses):
        raise ValueError("Mismatched report columns")
    return dict(zip(names, statuses))`,
            complexity: 'Time: O(n). Space: O(n) for the resulting dict.',
          },
          {
            title: '16. Tests that failed in every run',
            prompt:
              'Given several runs, each a list of the test names that failed in it, return the names that failed in every single run — the consistently broken ones.',
            hint: 'That is a set intersection. set.intersection(*rest) folds them all together, and an empty input needs its own answer.',
            code: `def always_failing(runs):
    if not runs:
        return set()
    first, *rest = (set(run) for run in runs)
    return first.intersection(*rest)`,
            complexity: 'Time: O(total names across runs). Space: O(size of the smallest run).',
          },
          {
            title: '17. Sort tests by status, then by duration',
            prompt:
              'Order a list of test dicts so failures come first, and within each status the slowest tests come first.',
            hint: 'Return a tuple from the sort key: Python compares tuples element by element. Negating the duration flips just that field to descending without a second sort.',
            code: `def triage_order(tests):
    return sorted(
        tests,
        key=lambda t: (t["status"] != "failed", -t["duration"]),
    )`,
            complexity: 'Time: O(n log n). Space: O(n) for the sorted copy.',
          },
          {
            title: '18. Drop empty query parameters',
            prompt:
              'Before sending a request, remove every key from a params dict whose value is None or an empty string, so the URL stays clean.',
            hint: 'A dict comprehension rebuilds the dict in one pass. Test against None explicitly — `if value` would also throw away 0 and False, which are legitimate values.',
            code: `def clean_params(params):
    return {
        k: v for k, v in params.items()
        if v is not None and v != ""
    }`,
            complexity: 'Time: O(n). Space: O(n) for the filtered dict.',
          },
          {
            title: '19. Find gaps in a numbered test sequence',
            prompt:
              'Test cases are numbered 1..n. Given the numbers that actually ran, return the missing ones in ascending order.',
            hint: 'Build the full expected range as a set and subtract what ran. Sorting the difference at the end is cheaper than scanning the list once per candidate.',
            code: `def missing_ids(ran, n):
    return sorted(set(range(1, n + 1)) - set(ran))`,
            complexity: 'Time: O(n + m) plus O(k log k) to sort k missing IDs. Space: O(n).',
          },
          {
            title: '20. Case-insensitive search over test names',
            prompt:
              'Return every test name that contains a given search term, ignoring differences in case.',
            hint: 'Lowercase the term once outside the loop rather than on every comparison, then check `term in name.lower()`.',
            code: `def search(names, term):
    needle = term.lower()
    return [name for name in names if needle in name.lower()]`,
            complexity:
              'Time: O(n*L) for n names of average length L. Space: O(n) worst case for the matches.',
          },
        ],
      },
      {
        label: 'Level 2 — Interview standard',
        blurb:
          'The shape most QA-Automation interviews actually take: decorators, polling, schema validation and log diffing.',
        items: [
          {
            title: '1. Poll until a condition is true',
            prompt:
              'Write `wait_until(condition, timeout=10, interval=0.5)` that polls a callable until it returns a truthy value, or raises `TimeoutError`.',
            hint: 'Record the start time with time.monotonic(), loop while elapsed time < timeout, sleep `interval` between checks, and raise if the loop exits without success.',
            code: `import time

def wait_until(condition, timeout=10, interval=0.5):
    start = time.monotonic()
    while time.monotonic() - start < timeout:
        result = condition()
        if result:
            return result
        time.sleep(interval)
    raise TimeoutError(f"Condition not met within {timeout}s")`,
            complexity:
              'Time: O(timeout / interval) polls (plus the cost of condition() each time). Space: O(1).',
          },
          {
            title: '2. Retry decorator for flaky tests',
            prompt:
              'Write a `retry` decorator that retries a flaky test function up to N times with exponential backoff before finally letting the exception propagate.',
            hint: 'Wrap the function with *args/**kwargs, catch the exception inside a loop, sleep with base_delay * 2**attempt, and only re-raise on the last attempt.',
            code: `import time
from functools import wraps

def retry(times=3, base_delay=0.5, exceptions=(Exception,)):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            for attempt in range(times):
                try:
                    return fn(*args, **kwargs)
                except exceptions:
                    if attempt == times - 1:
                        raise
                    time.sleep(base_delay * (2 ** attempt))
        return wrapper
    return decorator`,
            complexity:
              'Time: O(1) wrapper overhead, up to `times` calls to fn in the worst case. Space: O(1) extra.',
          },
          {
            title: '3. Validate an API response shape',
            prompt:
              'Write a function that checks a parsed API response dict contains all `required_keys` with non-None values, returning the list of missing or invalid keys.',
            hint: 'A single pass over `required_keys`, checking `key not in data or data[key] is None`, is all you need — no need to loop over `data` itself.',
            code: `def validate_response(data, required_keys):
    missing = []
    for key in required_keys:
        if key not in data or data[key] is None:
            missing.append(key)
    return missing`,
            complexity:
              'Time: O(k) where k = number of required keys (dict lookups are O(1) average). Space: O(k) for the output.',
          },
          {
            title: '4. Diff two test-run logs',
            prompt:
              'Given two ordered lists of step names from two test runs, find the length of the longest sequence of steps that appears in the same relative order in both (to highlight where the runs diverged).',
            hint: 'This is the classic Longest Common Subsequence problem: build a 2D DP table where dp[i][j] is the LCS length of the first i steps of run A and the first j steps of run B.',
            code: `def lcs(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[n][m]`,
            complexity:
              'Time: O(n*m). Space: O(n*m), can be reduced to O(min(n,m)) with a rolling array.',
          },
          {
            title: '5. Split tests into balanced CI shards',
            prompt:
              'Split a list of tests with known durations across n parallel CI shards, so the slowest shard finishes as early as possible.',
            hint: 'Longest-processing-time-first: sort descending, then always drop the next test into the shard with the smallest running total. A min-heap keeps that lookup cheap.',
            code: `import heapq

def shard_tests(tests, n):
    shards = [[] for _ in range(n)]
    totals = [(0, i) for i in range(n)]
    heapq.heapify(totals)
    for test in sorted(tests, key=lambda t: t["duration"], reverse=True):
        total, i = heapq.heappop(totals)
        shards[i].append(test)
        heapq.heappush(totals, (total + test["duration"], i))
    return shards`,
            complexity:
              'Time: O(m log m) for the sort plus O(m log n) for the heap. Space: O(m) for the shards.',
          },
          {
            title: '6. Detect flaky tests across runs',
            prompt:
              'Given several test runs, each a dict of test name to "passed" or "failed", return the names of tests that did not always produce the same result.',
            hint: 'A test is flaky when the set of statuses it produced has more than one member. Collect statuses per name in one pass, then filter.',
            code: `from collections import defaultdict

def find_flaky(runs):
    statuses = defaultdict(set)
    for run in runs:
        for name, status in run.items():
            statuses[name].add(status)
    return sorted(n for n, s in statuses.items() if len(s) > 1)`,
            complexity:
              'Time: O(r*n) for r runs of n tests. Space: O(n) — each test holds at most a couple of distinct statuses.',
          },
          {
            title: '7. Deep-merge config with environment overrides',
            prompt:
              'Merge a base config dict with an environment override dict. Nested dicts must merge key by key rather than the override replacing the whole branch.',
            hint: 'Recurse only when both sides hold a dict; in every other case the override wins. Copy as you go so the base config is never mutated.',
            code: `def deep_merge(base, override):
    result = dict(base)
    for key, value in override.items():
        if isinstance(result.get(key), dict) and isinstance(value, dict):
            result[key] = deep_merge(result[key], value)
        else:
            result[key] = value
    return result`,
            complexity:
              'Time: O(n) over the total number of keys in both trees. Space: O(n) for the merged copy plus O(d) recursion depth.',
          },
          {
            title: '8. Redact secrets from log lines',
            prompt:
              'Before attaching test logs to a report, replace the value of any `token`, `password` or `api_key` assignment with `***`, keeping the rest of the line intact.',
            hint: 'One regex with an alternation over the key names, a capture group for the key-and-separator, and a backreference in the replacement so only the value is swapped.',
            code: `import re

SECRET = re.compile(
    r"(?i)\\b(token|password|api_key|secret)(\\s*[=:]\\s*)(\\S+)"
)

def redact(line):
    return SECRET.sub(r"\\1\\2***", line)`,
            complexity: 'Time: O(n) in the length of the line. Space: O(n) for the redacted copy.',
          },
          {
            title: '9. Assert an API response contains an expected subset',
            prompt:
              'Write `matches_subset(actual, expected)` that returns True when every key in `expected` is present in `actual` with an equal value, recursively, while extra keys in `actual` are allowed.',
            hint: 'Recurse when both sides are dicts, compare directly otherwise. This is exactly how a partial-match assertion in an API test framework works.',
            code: `def matches_subset(actual, expected):
    if isinstance(expected, dict):
        if not isinstance(actual, dict):
            return False
        return all(
            key in actual and matches_subset(actual[key], value)
            for key, value in expected.items()
        )
    return actual == expected`,
            complexity:
              'Time: O(e) in the size of the expected subset. Space: O(d) recursion depth.',
          },
          {
            title: '10. Walk a paginated API endpoint',
            prompt:
              'An endpoint returns `{"items": [...], "next": <cursor or None>}`. Yield every item across all pages without loading the whole result set into memory.',
            hint: 'A generator lets the caller start processing page one while later pages are still being fetched. Loop on the cursor and `yield from` each page of items.',
            code: `def iter_all(fetch_page):
    cursor = None
    while True:
        page = fetch_page(cursor)
        yield from page["items"]
        cursor = page.get("next")
        if not cursor:
            return`,
            complexity:
              'Time: O(total items) with one request per page. Space: O(page size) — only one page is held at a time.',
          },
        ],
      },
      {
        label: 'Level 3 — Advanced',
        blurb: 'Where candidates get separated: intervals, caching, graphs and concurrency.',
        items: [
          {
            title: '1. Merge overlapping CI job time ranges',
            prompt:
              'You have a list of (start, end) time ranges when CI test jobs are scheduled. Merge all overlapping ranges into the minimal set of non-overlapping ranges.',
            hint: 'Sort the ranges by start time first, then walk through them, merging the current range into the last one whenever they overlap.',
            code: `def merge_ranges(ranges):
    if not ranges:
        return []
    ranges = sorted(ranges, key=lambda r: r[0])
    merged = [ranges[0]]
    for start, end in ranges[1:]:
        last_start, last_end = merged[-1]
        if start <= last_end:
            merged[-1] = (last_start, max(last_end, end))
        else:
            merged.append((start, end))
    return merged`,
            complexity: 'Time: O(n log n), dominated by the sort. Space: O(n) for the output.',
          },
          {
            title: '2. Rate-limit an API test helper',
            prompt:
              'Write a decorator that limits an API-calling test helper to at most `max_calls` per `period` seconds, sleeping as needed instead of failing.',
            hint: 'Keep a deque of recent call timestamps; before each call, drop timestamps older than `period`, then sleep if the deque is already full.',
            code: `import time
from collections import deque
from functools import wraps

def rate_limited(max_calls, period):
    def decorator(fn):
        calls = deque()
        @wraps(fn)
        def wrapper(*args, **kwargs):
            now = time.monotonic()
            while calls and now - calls[0] > period:
                calls.popleft()
            if len(calls) >= max_calls:
                time.sleep(period - (now - calls[0]))
            calls.append(time.monotonic())
            return fn(*args, **kwargs)
        return wrapper
    return decorator`,
            complexity:
              'Time: O(1) amortized per call (deque push/pop). Space: O(max_calls) for the timestamp window.',
          },
          {
            title: '3. Cache an expensive test fixture (LRU)',
            prompt:
              'Avoid re-computing an expensive fixture (e.g. seeding a test database) for the same input by caching the last N results.',
            hint: '`functools.lru_cache` gives you this for free; to implement it by hand, use an OrderedDict and move a key to the end on every access, evicting from the front when over capacity.',
            code: `from functools import lru_cache

@lru_cache(maxsize=32)
def build_fixture(seed):
    return heavy_setup(seed)  # expensive setup, e.g. seeding a test DB

# Manual version:
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return None
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)`,
            complexity: 'Time: O(1) per get/put (OrderedDict operations). Space: O(capacity).',
          },
          {
            title: '4. Detect a cycle in fixture dependencies',
            prompt:
              'Fixtures depend on other fixtures, given as a dict of name to list of dependency names. Report whether any dependency cycle exists.',
            hint: 'Three-colour DFS. Grey means "on the current path", so meeting a grey node again is the cycle. Black nodes are already proven clean and can be skipped.',
            code: `WHITE, GREY, BLACK = 0, 1, 2

def has_cycle(deps):
    colour = {}

    def visit(node):
        state = colour.get(node, WHITE)
        if state == GREY:
            return True
        if state == BLACK:
            return False
        colour[node] = GREY
        for dep in deps.get(node, ()):
            if visit(dep):
                return True
        colour[node] = BLACK
        return False

    return any(visit(node) for node in deps)`,
            complexity:
              'Time: O(V + E) over fixtures and dependency edges. Space: O(V) for the colours and the recursion stack.',
          },
          {
            title: '5. Run async tests with a concurrency limit',
            prompt:
              'Run a list of async test coroutines concurrently, but never more than `limit` at a time, and collect every result even if some fail.',
            hint: 'asyncio.gather starts everything at once, so wrap each coroutine in a Semaphore to cap what runs. return_exceptions keeps one failure from cancelling the batch.',
            code: `import asyncio

async def run_all(tests, limit=5):
    semaphore = asyncio.Semaphore(limit)

    async def run_one(test):
        async with semaphore:
            return await test()

    return await asyncio.gather(
        *(run_one(test) for test in tests),
        return_exceptions=True,
    )`,
            complexity:
              'Time: O(m) tasks with at most `limit` in flight, so wall clock is roughly total_work / limit. Space: O(m) for the results.',
          },
          {
            title: '6. Order fixture setup by dependency',
            prompt:
              'Given fixtures as a dict of name to its dependency names, produce a setup order in which every fixture appears after everything it depends on. Raise if that is impossible.',
            hint: 'Kahn topological sort: count incoming edges, start from the fixtures with none, and decrement as you emit. If you emit fewer nodes than exist, the leftovers form a cycle.',
            code: `from collections import deque

def setup_order(deps):
    nodes = set(deps) | {d for ds in deps.values() for d in ds}
    indegree = {n: 0 for n in nodes}
    dependents = {n: [] for n in nodes}
    for node, requires in deps.items():
        for dep in requires:
            dependents[dep].append(node)
            indegree[node] += 1

    queue = deque(sorted(n for n in nodes if indegree[n] == 0))
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for dependent in dependents[node]:
            indegree[dependent] -= 1
            if indegree[dependent] == 0:
                queue.append(dependent)

    if len(order) != len(nodes):
        raise ValueError("Cyclic fixture dependencies")
    return order`,
            complexity:
              'Time: O(V + E) over fixtures and dependency edges. Space: O(V + E) for the indegree and dependents maps.',
          },
          {
            title: '7. Run blocking health checks in a thread pool',
            prompt:
              'Call a blocking `check(url)` against many URLs concurrently, pair every result with its URL, and record a failure instead of aborting the batch when one check raises.',
            hint: 'ThreadPoolExecutor suits blocking I/O. Submit into a future-to-url dict so as_completed can tell you which URL each finished future belongs to, and call result() inside a try.',
            code: `from concurrent.futures import ThreadPoolExecutor, as_completed

def check_all(urls, check, workers=10, timeout=30):
    results = {}
    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = {pool.submit(check, url): url for url in urls}
        for future in as_completed(futures, timeout=timeout):
            url = futures[future]
            try:
                results[url] = ("ok", future.result())
            except Exception as exc:
                results[url] = ("error", repr(exc))
    return results`,
            complexity:
              'Time: roughly total_io / workers wall clock for n URLs. Space: O(n) for the futures and results.',
          },
          {
            title: '8. A context manager with guaranteed cleanup',
            prompt:
              'Write a context manager that provisions a test resource, hands it to the body, and always tears it down — even when the body raises — while letting that exception propagate.',
            hint: 'With @contextmanager, put the teardown in a finally around the yield. Returning nothing (falsy) from __exit__ is what lets the original exception keep travelling.',
            code: `from contextlib import contextmanager

@contextmanager
def temp_environment(provision, destroy):
    env = provision()
    try:
        yield env
    finally:
        destroy(env)

# Equivalent class form:
class TempEnvironment:
    def __init__(self, provision, destroy):
        self._provision, self._destroy = provision, destroy

    def __enter__(self):
        self.env = self._provision()
        return self.env

    def __exit__(self, exc_type, exc, tb):
        self._destroy(self.env)
        return False  # never swallow the test failure`,
            complexity: 'Time: O(1) plus the provision and destroy costs. Space: O(1).',
          },
          {
            title: '9. Bisect the build that broke a test',
            prompt:
              'You have an ordered list of builds where the test passed at the start and fails at the end. Find the first failing build using as few test runs as possible.',
            hint: 'The pass/fail sequence is monotonic, so binary search applies: keep the invariant that lo is known-good territory and hi is known-bad, and halve the window each run.',
            code: `def first_bad_build(builds, is_bad):
    lo, hi = 0, len(builds) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if is_bad(builds[mid]):
            hi = mid
        else:
            lo = mid + 1
    return builds[lo]`,
            complexity: 'Time: O(log n) test runs for n builds. Space: O(1).',
          },
          {
            title: '10. Top-K error messages in a huge log',
            prompt:
              'A CI log is far larger than memory. Report the k most frequent error messages, reading the file only once.',
            hint: 'Stream the file line by line instead of read().splitlines(), count into a Counter, and use heapq.nlargest so the ranking never sorts the whole vocabulary.',
            code: `import heapq
from collections import Counter

def top_errors(path, k=10, prefix="ERROR"):
    counts = Counter()
    with open(path, encoding="utf-8", errors="replace") as fh:
        for line in fh:                     # streams, never loads the file
            if line.startswith(prefix):
                counts[line.strip()] += 1
    return heapq.nlargest(k, counts.items(), key=lambda kv: kv[1])`,
            complexity:
              'Time: O(n + u log k) for n lines and u distinct messages. Space: O(u) — bounded by distinct messages, not file size.',
          },
        ],
      },
    ],
  },
  prompts: {
    resume: `You are an expert QA/SDET career coach reviewing a resume for QA Automation roles.
Evaluate the resume thoroughly and return ONLY valid JSON — no prose, no markdown outside the JSON block:
{"overall":75,"summary":"One concise sentence summarizing overall resume quality and fit for QA roles.","categories":[{"name":"Technical Skills","score":80},{"name":"Testing Frameworks","score":75},{"name":"CI/CD & DevOps","score":65},{"name":"AI & LLM Testing","score":50},{"name":"Clarity & Impact","score":80}],"strengths":["Clear strength 1","Clear strength 2","Clear strength 3"],"gaps":["Gap 1","Gap 2","Gap 3"],"recommendations":["Specific actionable recommendation 1","Specific actionable recommendation 2","Specific actionable recommendation 3"]}`,
    improve: `You are an expert QA/SDET career coach and professional resume writer. Rewrite the provided resume to be compelling, ATS-friendly, and perfectly targeted for QA Automation and SDET roles. Guidelines:
- Use strong action verbs (Built, Designed, Automated, Reduced, Improved, Led)
- Quantify impact wherever possible (reduced test runtime by 40%, 95% coverage)
- Highlight test automation, CI/CD, and AI/LLM testing experience prominently
- Tailor wording to the provided job description if given
- Keep the same factual information — do not invent experience
Return ONLY the rewritten resume text — no JSON, no markdown headers, no commentary before or after.`,
    interview: `You are a senior QA Automation interviewer conducting a structured technical interview for a QA/SDET/DevOps role. 
Progress through these 5 stages in order, spending 2-3 questions on each before moving to the next:

Stage 1 — HR & Motivation: background, why QA automation, career goals, culture fit
Stage 2 — Test Automation Knowledge: frameworks (Playwright, Selenium, pytest), strategies, Page Object Model, flakiness
Stage 3 — Code & API Testing: practical Python/JS concepts, REST API testing, mocking, debugging flaky tests
Stage 4 — DevOps & CI/CD: GitHub Actions, Docker, parallel test execution, pipeline design
Stage 5 — AI Testing: testing LLM features, prompt injection, non-determinism, LLM-as-judge evaluation

Rules:
- Ask exactly ONE question at a time
- Be professional but conversational and encouraging
- After each answer, give ONE sentence of brief constructive feedback before asking the next question
- Track which stage you are in and announce stage transitions naturally
- When you receive "___VERDICT___", stop the interview and provide a structured verdict:
  * Score each stage 1-10 with a one-sentence rationale
  * Overall hiring recommendation (Strong Hire / Hire / Borderline / No Hire)
  * Top 3 strengths observed
  * Top 3 specific areas to improve before the next interview
  * Encouragement and next steps`,
  },
};

export type Locale = typeof en;
