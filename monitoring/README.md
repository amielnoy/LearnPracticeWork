# Monitoring

The monitoring stack is Grafana + Prometheus + Pushgateway, with both data producers written
in Python:

- FastAPI exposes request counts, latency histograms, in-flight requests, and Replit relay
  results at `/metrics`.
- Login counters group attempts by outcome, approximate country, client type (`desktop_web`,
  `ios`, `android`, or `other`), and a pseudonymous user identifier.
- AI counters group server-proxied requests by provider, model, status, approximate country,
  client type, and pseudonymous user identifier.
- `python -m app.monitor` probes the Fly API, Replit site and academy, and GitHub Pages.
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
only and cannot contain embedded credentials.

## Production

Set long, independent random values for `METRICS_TOKEN` and `METRICS_ID_SALT` with
`fly secrets set`. Production FastAPI returns 404 from `/metrics` without the matching bearer
token. Configure the production Prometheus scrape with that token. The salt creates stable
HMAC-based user labels without exporting an email address. Do not put either value in Replit.

Country is an approximate two-letter code supplied by the trusted hosting proxy, and client
type is derived from the request's User-Agent. The Replit relay overwrites its internal country
header before forwarding it, so a browser cannot choose that metric label. Login and AI panels
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
variable, Replit environment, or committed file.

Prometheus retains 90 days locally. Pushgateway holds the latest result per branch while
Prometheus preserves each scrape over time, which is what makes the Grafana test-history panel
historical rather than a copy of the latest HTML report. The provisioned dashboard has nine
panels covering server health, request performance, relay results, test history, login
geography/client mix, pseudonymous login activity, and server-proxied AI usage.
