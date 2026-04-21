# Apify Actor Monitor

> ⚠️ **First Run Notice**
> On the very first run, no actor comparison report will be generated — there is no previous snapshot to compare against. The actor will collect and store today's baseline snapshot. **The full report with red/yellow/green status, revenue deltas, and trend indicators will appear on the second run onwards.** Schedule a second run after at least an hour or the next day to start seeing meaningful insights.

A self-contained Apify Actor that watches your own Apify account, takes daily snapshots of every actor's performance, and emails you a clean HTML report — no external servers, no database, no third-party email service required.

---

## What it does

Every time it runs, the Actor:

1. Pulls analytics for all actors you own (runs, revenue, cost, users, success rate)
2. Compares today's numbers against the previous run's snapshot
3. Tags each actor **red / yellow / green** based on how it's doing
4. Saves the snapshot to a persistent Key-Value Store so history builds up over time
5. Generates a self-contained HTML report and saves it to the same store
6. Emails the report to you (if `emailTo` is set)

You set it on a cron schedule in the Apify Console (e.g. every hour or once a day) and it runs completely hands-off.

---

## Report preview

The email / HTML report is split into two parts:

**Overview cards** — account-wide numbers at a glance:
- Total Revenue, Cost, Net Profit, Margin (month to date)
- Total Runs Today, Success Rate, New Paying Users, New Free Users

**Actor breakdown** — three collapsible sections:

| Section | When an actor ends up here |
|---|---|
| 🔴 Needs Attention | Zero runs today (but had runs before), success rate below 50%, or a sudden cost spike |
| 🟡 Watch Closely | New paying users today, revenue moved >20%, or run count jumped/dropped >50% |
| 🟢 On Track | Everything else |

Each actor row is expandable and shows: monthly revenue/cost/profit/margin, today's run breakdown, daily run and result averages, cost per 1k results, and paying/free user counts.

---

## Input

| Field | Required | Default | Description |
|---|---|---|---|
| `apifyToken` | ✅ | — | Your Apify API token. Found at **Console → Settings → Integrations**. |
| `emailTo` | — | — | Email address to send the report to. Leave blank to skip email (report still saves to KV store). |
| `snapshotStoreName` | — | `apify-monitor-store` | Name of the Key-Value Store where snapshots and reports are kept. |

---

## Output

**Dataset** — one record per run, visible in the Apify Console UI:

```json
{
  "date": "2026-04-21",
  "capturedAt": "2026-04-21T12:00:00.000Z",
  "totalRevenue": 1234.67,
  "totalCost": 14.46,
  "netProfit": 1220.21,
  "overallMargin": 0.9883,
  "avgCostPer1000Results": 0.2371,
  "todayRevenue": 2.64,
  "todayCost": 0.01,
  "todayRuns": 604,
  "todaySucceeded": 602,
  "todayFailed": 2,
  "todaySuccessRate": 99.67,
  "todayPayingUsers": 87,
  "todayFreeUsers": 12,
  "actorsMonitored": 40,
  "statusCounts": { "red": 2, "yellow": 5, "green": 33 },
  "topActorsByRevenue": [ ... ],
  "flaggedActors": [ ... ],
  "reportUrl": "https://api.apify.com/v2/key-value-stores/.../records/report-2026-04-21"
}
```

**Key-Value Store** — the named store (`apify-monitor-store` by default) keeps:
- `snapshot_YYYY-MM-DD` — the full raw snapshot for each day (indefinitely)
- `snapshot_latest` — always the most recent snapshot (used for diffing)
- `report-YYYY-MM-DD` — the HTML report file, openable in any browser

---

## How to set up

### 1. Get your Apify API token

Go to [console.apify.com/settings/integrations](https://console.apify.com/settings/integrations) and copy your Personal API token.

### 2. Configure input

In the Apify Console, open your deployed Actor and fill in the input form:
- **Apify API Token** — paste your token
- **Report Email Address** — where you want the report sent
- **Snapshot Store Name** — leave as default unless you want a custom name

### 3. Run it manually once

Click **Start** to verify everything works. Check the **Dataset** tab to see the output record and the **Key-Value Store** tab to confirm the HTML report was saved.

### 4. Set a schedule

Go to **Schedules** in the Apify Console and create a new schedule:
- **Cron expression**: `0 20 * * *` — runs daily at 20:00 UTC (or adjust to your preferred time)
- **Actor**: select this Actor
- **Input**: same as above

That's it. You'll get a daily email with the full report, and every dataset row links directly to the stored HTML file.

---

## File structure

```
src/
├── main.js       Entry point — reads input, orchestrates everything
├── fetcher.js    All API calls to Apify analytics endpoints
├── storage.js    Key-Value Store helpers (open / read / write snapshots)
├── diff.js       Compares two snapshots and produces the diff + status tags
└── report.js     Generates the self-contained HTML report string
.actor/
├── actor.json         Actor metadata
└── input_schema.json  Input form definition
Dockerfile             Uses apify/actor-node:20
```

---

## Status logic explained

The diff engine compares the new snapshot against the previous one:

- **Red** if any of:
  - Actor had runs before but has zero today
  - Today's success rate is below 50%
  - Today's compute cost is more than 2× the previous day's cost

- **Yellow** if any of:
  - New paying users appeared today
  - Revenue changed by more than 20% vs the previous snapshot
  - Run count changed by more than 50% vs the daily average

- **Green** — everything else

On the very first run (no previous snapshot yet), all actors are shown as green since there is nothing to compare against.

---

## Tech stack

- **Runtime**: Node.js 20 on the Apify platform
- **Storage**: Apify Named Key-Value Store (persists across runs indefinitely)
- **Scheduling**: Apify built-in Schedules (cron)
- **Email**: Apify Send Mail Actor (`e643gqfZae2TfQEbA`)
- **Language**: JavaScript (ESM)
- **Dependencies**: `apify`, `apify-client`
