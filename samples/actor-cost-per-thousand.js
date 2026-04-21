/**
 * NOTE: All financial values (revenue, costs, counts, etc.) have been randomized
 * while preserving the API response structure. This is sample data only.
 */
fetch("https://console-backend.apify.com/actor-analytics/costs-per-thousand-results?month=2026-04-01&actorIds%5B%5D=L1pgSVp05HPJPOpr1", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "authorization": "Bearer [REDACTED]",
    "sec-ch-ua": "\"Google Chrome\";v=\"147\", \"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"147\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "x-idempotency-key": "00000000-0000-0002-0000-000000000000",
    "Referer": "https://console.apify.com/"
  },
  "body": null,
  "method": "GET"
});

/**
 * {
    "dailyActorRunsCost": {
        "2026-04-11": 0.012967424775139595,
        "2026-04-13": 0.008104665756493037,
        "2026-04-08": 0.00881759738978493,
        "2026-04-20": 0.010778585811227027,
        "2026-04-16": 0.009546046489248757,
        "2026-04-01": 0.00843659133878179,
        "2026-04-18": 0.006312830813730885,
        "2026-04-04": 0.0075294663140561624,
        "2026-04-17": 0.0075858855807701495,
        "2026-04-15": 0.006142947590131586,
        "2026-04-06": 0.007126826488764477,
        "2026-04-02": 0.007582378843564595,
        "2026-04-19": 0.006140445506014296,
        "2026-04-07": 0.00824792240421374,
        "2026-04-21": 0.008478794983995591,
        "2026-04-09": 0.011591791254931828,
        "2026-04-10": 0.007123588253109357,
        "2026-04-12": 0.007623591756408792,
        "2026-04-05": 0.006694007841224633,
        "2026-04-14": 0.006090302449296454,
        "2026-04-03": 0.009369587926377605
    },
    "totalActorRunsCost": {
        "maxActorRunsCost": 0.012967424775139595,
        "minActorRunsCost": 0.006090302449296454,
        "avgActorRunsCost": 4.4331
    }
}
 */