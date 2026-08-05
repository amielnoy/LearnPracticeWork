export const en = {
  dir: 'ltr' as 'ltr' | 'rtl',
  lang: 'en' as string,
  ui: {
    skip: 'Skip to main content',
    navOpen: 'Open navigation menu',
    toTop: 'Back to top',
  },
  nav: {
    logo: 'AI Testing Academy',
    agentsGroup: 'Agents',
    links: [
      { href: '#setup', label: '⚙️ Connection Setup' },
      { href: '#resume', label: '📄 Resume & CV' },
      { href: '#lecture-series', label: '🎓 Lecture Series' },
      { href: '#interview-talk', label: '🎙️ Mock Interview' },
      { href: '#interview-questions', label: '❓ Interview Questions' },
      { href: '#coding-challenges', label: '🐍 Python Coding Challenges' },
    ],
    communityGroup: 'Community',
    community: [
      { href: 'https://www.youtube.com/@amielnoy', label: '▶ YouTube', cls: 'github-btn', target: '_blank' },
      { href: 'https://www.linkedin.com/in/amiel-peled/', label: '💼 LinkedIn', cls: 'telegram-btn', target: '_blank' },
      { href: 'https://chat.whatsapp.com/Bwjb01CGfxqIE04lkz2us0?mode=gi_t', label: '💬 AI Automation & DevOps Community', cls: 'whatsapp-btn', target: '_blank' },
    ],
    themeToggle: { ariaLabel: 'Toggle theme' },
    langToggle: { ariaLabel: 'Switch language', label: 'עברית' },
  },
  hero: {
    h1Line1: 'AI Testing Academy',
    h1Line2: 'Your AI-Powered QA Career Launchpad',
    p: 'Master test automation, DevOps, and AI testing with hands-on agents, structured lectures, and real interview practice. Built for QA engineers who want to stay ahead of the curve.',
    badges: ['🤖 AI Agents', '🎙️ Mock Interviews', '📄 Resume Review', '🎓 Lecture Series', '🐳 DevOps & CI'],
    cta: [
      { href: '#setup', label: 'Get Started →', cls: 'primary' },
      { href: '#lecture-series', label: 'Watch Lectures', cls: 'ghost' },
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
    num: '01',
    title: 'Connection Setup',
    lead: 'Connect your AI provider once — both agents share the same key. Gemini has a free tier; Claude gives the best resume rewrites.',
    boxTitle: '🔌 Choose your AI provider',
    providerLabel: 'Provider',
    modelLabel: 'Model',
    testBtn: '🔗 Test connection',
    useOwnKeyLabel: 'Use my own API key',
    apiKeyLabel: 'API Key',
    resetBtn: '🔄 Reset all settings',
    notice: "If you enter your own key, it's stored only in your browser's localStorage and sent directly to the provider's API. If you use the default key, requests are proxied through our server — the key itself never reaches your browser.",
    providers: [
      { value: 'gemini', label: 'Gemini (Google)' },
      { value: 'anthropic', label: 'Claude (Anthropic)' },
      { value: 'openai', label: 'GPT (OpenAI)' },
    ],
  },
  resume: {
    num: '02',
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
  },
  interview: {
    num: '05',
    title: 'Agent 2 — Mock Interview',
    lead: 'Run a realistic QA-Automation interview with an AI interviewer — five stages, from HR to AI testing.',
    boxTitle: '🎙️ Start your mock interview',
    notice: 'Make sure the connection is configured above. The agent uses the same API key.',
    chatAriaLabel: 'Interview chat',
    initialMsg: 'Press "Start interview" to begin. The AI interviewer will guide you through all five stages.',
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
  s: {
    keyLabelGemini: 'Gemini API Key',
    keyLabelAnthropic: 'Claude API Key',
    keyLabelOpenai: 'OpenAI API Key',
    errGeminiKeyHint: ' (Gemini keys start with AIza — get one free at aistudio.google.com)',
    errKeyNotAnthropic: 'This looks like an OpenAI key. Switch the provider dropdown to OpenAI.',
    errKeyNotOpenai: 'This looks like an Anthropic key. Switch the provider dropdown to Claude.',
    placeholderEnvKey: '(using server-configured default key)',
    labelSuffixLocal: ' Key',
    labelSuffixEnv: ' Key (server default)',
    statusTesting: '⏳ Testing connection…',
    statusOkPrefix: '✅ Connected (',
    pingSystem: 'You are a helpful assistant. Reply with exactly the word: OK',
    pingUser: 'Ping',
    errNoKey: 'No API key set. Add your key in Connection Setup above.',
    errBlockedPrefix: 'Network error reaching ',
    errBlockedMid: '. Possible causes:\n',
    errBlockedCauses: '• CORS policy blocking the browser-direct request\n• Firewall or network issue\n',
    errBlockedTry: 'Try switching to a different provider.\n',
    errBlockedOpenUrl: '',
    errApiPrefix: 'API error (',
    errNoJson: 'Could not parse JSON from the model response. Please try again.',
    uploadReading: '⏳ Reading ',
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
    promptEvalResultsLabel: '\n\nPrevious evaluation results (gaps and recommendations to address):\n',
    promptOriginalResumeLabel: '\n\nOriginal resume:\n',
    statusInterviewerThinking: '⏳ Interviewer is thinking…',
    statusGeneratingVerdict: '⏳ Generating your verdict…',
    errNoKeyInterview: 'Set your API key in Connection Setup first, then start the interview.',
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
  },
  codingChallenges: {
    title: '🐍 Python Coding Challenges for Test Automation',
    lead: '15 practical coding problems that come up in real QA-Automation interviews, grouped into three levels. Click once to reveal a hint, click again to reveal a short, efficient solution with time and space complexity.',
    hintLabel: '💡 Hint',
    complexityLabel: '⏱️ Complexity',
    showHintBtn: 'Show hint',
    showSolutionBtn: 'Show solution',
    hideBtn: 'Hide',
    levels: [
    {
      label: 'Level 1 — Fundamentals',
      blurb: 'Lists, dicts and a little recursion. Nothing here needs a clever trick, only a clean single pass.',
      items: [
      {
        title: '1. Deduplicate test IDs, preserving order',
        prompt: 'Given a list of test case IDs that may contain duplicates, return a new list with duplicates removed, preserving first-seen order.',
        hint: 'Use a set to track what has been seen while iterating once and appending only unseen items to the result list.',
        code: `def dedupe(ids):
    seen = set()
    result = []
    for i in ids:
        if i not in seen:
            seen.add(i)
            result.append(i)
    return result`,
        complexity: 'Time: O(n) average (set lookups are O(1) amortized). Space: O(n) for the seen set and result.',
      },
      {
        title: '2. Find the first duplicate test ID',
        prompt: 'Given a large list of test IDs, return the first ID that appears more than once, or None if there are no duplicates.',
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
        prompt: 'Test suites can nest suites inside suites arbitrarily deep (a tree of lists). Write a function that flattens this structure into a single list of leaf test names.',
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
        complexity: 'Time: O(n) where n = total number of nodes in the tree. Space: O(d) recursion stack (d = tree depth) plus O(n) for the output.',
      },
      {
        title: '4. Count test results by status',
        prompt: 'Given a list of result dicts like `{"name": ..., "status": "passed"}`, return how many results there are per status.',
        hint: 'One pass and a dict of counters is enough. collections.Counter does the bookkeeping for you.',
        code: `from collections import Counter

def count_by_status(results):
    return Counter(r["status"] for r in results)`,
        complexity: 'Time: O(n). Space: O(k), where k is the number of distinct statuses.',
      },
      {
        title: '5. Find the N slowest tests',
        prompt: 'Given a list of test dicts with a `duration` field, return the n slowest of them, slowest first.',
        hint: 'Sorting the whole list is O(m log m) when you only need n items. heapq.nlargest keeps a heap of size n instead.',
        code: `import heapq

def slowest(tests, n):
    return heapq.nlargest(n, tests, key=lambda t: t["duration"])`,
        complexity: 'Time: O(m log n) for m tests. Space: O(n) for the heap and the result.',
      },
      ],
    },
    {
      label: 'Level 2 — Interview standard',
      blurb: 'The shape most QA-Automation interviews actually take: decorators, polling, schema validation and log diffing.',
      items: [
      {
        title: '1. Poll until a condition is true',
        prompt: 'Write `wait_until(condition, timeout=10, interval=0.5)` that polls a callable until it returns a truthy value, or raises `TimeoutError`.',
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
        complexity: 'Time: O(timeout / interval) polls (plus the cost of condition() each time). Space: O(1).',
      },
      {
        title: '2. Retry decorator for flaky tests',
        prompt: 'Write a `retry` decorator that retries a flaky test function up to N times with exponential backoff before finally letting the exception propagate.',
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
        complexity: 'Time: O(1) wrapper overhead, up to `times` calls to fn in the worst case. Space: O(1) extra.',
      },
      {
        title: '3. Validate an API response shape',
        prompt: 'Write a function that checks a parsed API response dict contains all `required_keys` with non-None values, returning the list of missing or invalid keys.',
        hint: 'A single pass over `required_keys`, checking `key not in data or data[key] is None`, is all you need — no need to loop over `data` itself.',
        code: `def validate_response(data, required_keys):
    missing = []
    for key in required_keys:
        if key not in data or data[key] is None:
            missing.append(key)
    return missing`,
        complexity: 'Time: O(k) where k = number of required keys (dict lookups are O(1) average). Space: O(k) for the output.',
      },
      {
        title: '4. Diff two test-run logs',
        prompt: 'Given two ordered lists of step names from two test runs, find the length of the longest sequence of steps that appears in the same relative order in both (to highlight where the runs diverged).',
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
        complexity: 'Time: O(n*m). Space: O(n*m), can be reduced to O(min(n,m)) with a rolling array.',
      },
      {
        title: '5. Split tests into balanced CI shards',
        prompt: 'Split a list of tests with known durations across n parallel CI shards, so the slowest shard finishes as early as possible.',
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
        complexity: 'Time: O(m log m) for the sort plus O(m log n) for the heap. Space: O(m) for the shards.',
      },
      ],
    },
    {
      label: 'Level 3 — Advanced',
      blurb: 'Where candidates get separated: intervals, caching, graphs and concurrency.',
      items: [
      {
        title: '1. Merge overlapping CI job time ranges',
        prompt: 'You have a list of (start, end) time ranges when CI test jobs are scheduled. Merge all overlapping ranges into the minimal set of non-overlapping ranges.',
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
        prompt: 'Write a decorator that limits an API-calling test helper to at most `max_calls` per `period` seconds, sleeping as needed instead of failing.',
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
        complexity: 'Time: O(1) amortized per call (deque push/pop). Space: O(max_calls) for the timestamp window.',
      },
      {
        title: '3. Cache an expensive test fixture (LRU)',
        prompt: 'Avoid re-computing an expensive fixture (e.g. seeding a test database) for the same input by caching the last N results.',
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
        prompt: 'Fixtures depend on other fixtures, given as a dict of name to list of dependency names. Report whether any dependency cycle exists.',
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
        complexity: 'Time: O(V + E) over fixtures and dependency edges. Space: O(V) for the colours and the recursion stack.',
      },
      {
        title: '5. Run async tests with a concurrency limit',
        prompt: 'Run a list of async test coroutines concurrently, but never more than `limit` at a time, and collect every result even if some fail.',
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
        complexity: 'Time: O(m) tasks with at most `limit` in flight, so wall clock is roughly total_work / limit. Space: O(m) for the results.',
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
