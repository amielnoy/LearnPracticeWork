# Monitoring

The monitoring stack is Grafana + Prometheus + Pushgateway, with both data producers written
in Python:

- FastAPI exposes request counts, latency histograms, in-flight requests, and relay results at
  `/metrics` — available wherever the API runs as a real process, which is this compose stack.
  The deployed API is a Vercel function and answers 404 there on purpose: each invocation is its
  own process, so a scrape would report what one instance happened to see.
- Login counters group attempts by outcome, approximate country, client type (`desktop_web`,
  `ios`, `android`, or `other`), and a pseudonymous user identifier.
- AI counters group server-proxied requests by provider, model, status, approximate country,
  client type, and pseudonymous user identifier.
- `python -m app.monitor` probes the local Scalar reference and the deployed site and its API
  at <https://learn-practice-work.vercel.app> — one origin now, so both probes point at it.
  `VERCEL_SITE_ORIGIN` overrides that default in `compose.yaml`; point it at a deployment
  hostname such as
  <https://learn-practice-work-73spot260-amielnoy-9725s-projects.vercel.app> to watch a
  single deployment instead of whatever the alias currently serves.
- `python -m app.test_history` converts the existing Allure result files into Prometheus
  metrics after every local or CI test run.

## Run locally

```bash
docker compose -f monitoring/compose.yaml up -d --build
PUSHGATEWAY_URL=http://127.0.0.1:9091 \
  pnpm --filter @workspace/api-server run publish:test-metrics
```

Open <http://localhost:3000/d/academy-overview/academy-servers-and-test-history>.
Prometheus is bound to <http://localhost:9090>, Pushgateway to <http://localhost:9091>, and the
Python probe metrics to <http://localhost:9108>. All ports bind to loopback only. Grafana is
provisioned read-only with anonymous Viewer access; it creates no default admin and disables
telemetry, update checks, and automatic plugin installation.

The default probe list is the set of public servers used by this repository. Override
`MONITORED_SERVERS` with a JSON object of `name: URL` pairs to change it. URLs may be HTTP(S)
only and cannot contain embedded credentials. The compose default also checks
`http://api:8080/api/docs`, so Scalar availability appears in Grafana as `local-scalar`.

## Production

Set long, independent random values for `METRICS_TOKEN` and `METRICS_ID_SALT` wherever the API
runs as a real process — `vercel env add` covers the deployed function, but `/metrics` does not
answer there at all, so these matter only for a containerised instance. Production FastAPI
returns 404 from `/metrics` without the matching bearer token. Configure that instance's
Prometheus scrape with the token. The salt creates stable HMAC-based user labels without
exporting an email address.

Country is an approximate two-letter code supplied by the trusted hosting proxy, and client
type is derived from the request's User-Agent. **On Vercel it is always `unknown`**:
`metrics.country()` reads `x-academy-client-country`, `fly-client-country` and `cf-ipcountry`,
and Vercel sends `x-vercel-ip-country`. Adding that name to the list is the whole fix; until
then the geography panels describe the container, not the deployment. Login and AI panels
never include names, email addresses, IP addresses, access tokens, prompts, responses, or API
keys. AI usage covers only requests through the Python proxy; browser-side bring-your-own-key
requests cannot be observed by the server. Avoid broad Grafana access because even pseudonymous
usage data can be sensitive.

Deploy the monitoring compose stack, or equivalent managed Grafana/Prometheus services, on a
private host. Then configure these GitHub repository settings:

| Setting | Kind | Purpose |
| --- | --- | --- |
| `GRAFANA_URL` | Repository variable | Public base URL linked from every Actions run summary |
| `PUSHGATEWAY_URL` | Actions secret | Pushgateway endpoint receiving test history |
| `PUSHGATEWAY_USERNAME` | Actions secret | Optional HTTP basic-auth username |
| `PUSHGATEWAY_PASSWORD` | Actions secret | Optional HTTP basic-auth password |

When `PUSHGATEWAY_URL` is absent, the CI publisher explicitly reports that history publishing
is disabled and exits successfully. Credentials never appear in a Vite variable, repository
variable, repository variable, or committed file.

Prometheus retains 90 days locally. Pushgateway holds the latest result per branch while
Prometheus preserves each scrape over time, which is what makes the Grafana test-history panel
historical rather than a copy of the latest HTML report. The provisioned dashboard has nine
panels covering server health, request performance, relay results, test history, login
geography/client mix, pseudonymous login activity, and server-proxied AI usage.
