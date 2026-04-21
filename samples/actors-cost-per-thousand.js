/**
 * NOTE: All financial values (revenue, costs, counts, etc.) have been randomized
 * while preserving the API response structure. This is sample data only.
 */
fetch("https://console-backend.apify.com/actor-analytics/costs-per-thousand-results?month=2026-04-01", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "authorization": "Bearer [REDACTED]",
    "sec-ch-ua": "\"Google Chrome\";v=\"147\", \"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"147\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "x-idempotency-key": "00000000-0000-0008-0000-000000000000",
    "Referer": "https://console.apify.com/"
  },
  "body": null,
  "method": "GET"
});

/**
 * {
    "dailyActorRunsCost": {
        "2026-04-08": 0.35127814384736106,
        "2026-04-03": 0.3781606291370309,
        "2026-04-20": 0.11149775785334706,
        "2026-04-14": 0.2523391893820456,
        "2026-04-01": 1.0501049905918376,
        "2026-04-18": 0.3754885220497659,
        "2026-04-16": 0.07351213082733417,
        "2026-04-04": 0.42082827100756826,
        "2026-04-15": 0.0786531827393018,
        "2026-04-17": 0.152979880782893,
        "2026-04-06": 0.28193775838957774,
        "2026-04-07": 0.15281572320650225,
        "2026-04-21": 0.07318774778731892,
        "2026-04-02": 0.36402303453126317,
        "2026-04-19": 0.14187488551175656,
        "2026-04-10": 0.15139478950614904,
        "2026-04-12": 0.3511950801154434,
        "2026-04-09": 0.10153577269478772,
        "2026-04-13": 0.30264775354912005,
        "2026-04-11": 0.901823038936326,
        "2026-04-05": 0.13312309891114615
    },
    "totalActorRunsCost": {
        "maxActorRunsCost": 1.0501049905918376,
        "minActorRunsCost": 0.07318774778731892,
        "avgActorRunsCost": 2.7142
    }
}
 */