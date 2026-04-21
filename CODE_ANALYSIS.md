# Code Analysis & Improvement Suggestions

## Current Architecture

Your apify-insight project is well-structured with clear separation of concerns:

### ✅ **Strengths**

1. **Pure Functions** - `diff.js` and `report.js` are pure functions with no side effects, making them testable and reliable
2. **Proper Error Handling** - Gracefully skips actors with fetch errors instead of crashing
3. **Formatted Output** - Beautiful HTML report with dark theme, responsive design, and interactive sections
4. **Server Rate Limiting** - Good implementation with 300ms delays between account-wide API calls and staggered per-actor requests
5. **Data Privacy** - Proper obfuscation of sample data for safe public sharing
6. **Progress Logging** - Real-time feedback on which actors are being processed

---

## 🔴 Issues & Recommendations

### 1. **Actor Concurrency Control Could Be More Efficient**
**Current**: Max 2 concurrent actors with 500ms stagger
```javascript
const perActorResults = await pAll(perActorFns, 2, 500);
```
**Issue**: With 40+ actors, this creates long wait times (20+ minutes for full run)

**Recommendation**:
- Increase concurrency to 3-5 (most APIs allow 5-10 concurrent)
- Reduce stagger to 200ms
- Scale based on observed API response times

```javascript
// Better approach
const perActorResults = await pAll(perActorFns, 4, 200);
```

---

### 2. **Snapshot Comparison Logic Could Detect More Issues**
**Current**: Only tracks runs, revenue, and margin changes

**Recommendation - Add these metrics**:
```javascript
// In diff.js - add these status triggers:
- Average response time increase >20%
- Cost per result increased significantly
- Error rate spike (not just low success rate)
- User churn detection (paying users dropped)
- Inconsistent run patterns (high variance in daily runs)
```

---

### 3. **Missing Alert Thresholds Configuration**
**Current**: Hardcoded thresholds in diff.js (50% success rate, 20% revenue drop)

**Recommendation**: Make these configurable
```javascript
// Add to input schema:
{
  "alertThresholds": {
    "minSuccessRate": 50,
    "maxRevenueDropPercent": 20,
    "maxRunsDropPercent": 50,
    "maxCostIncreaseFold": 2
  }
}
```

---

### 4. **No Historical Trend Analysis**
**Current**: Only compares previous snapshot vs. current

**Recommendation**: Track 7-day or 30-day trends:
```javascript
// After loading previous snapshot, also load:
- 7-day average metrics
- 30-day trends
- Seasonal patterns

// Display in report:
"Revenue trend: ↓ 5% vs last 7 days"
"Success rate: ↓ from 85% to 78% (abnormal spike in failures)"
```

---

### 5. **Missing Anomaly Detection**
**Recommendation**: Add statistical anomaly detection
```javascript
// Flag if metric deviation is >2 standard deviations from average
function detectAnomalies(curr, historical) {
  const mean = historical.reduce((a,b) => a+b) / historical.length;
  const stdDev = Math.sqrt(
    historical.reduce((sq, n) => sq + Math.pow(n - mean, 2)) / historical.length
  );
  return Math.abs(curr - mean) > 2 * stdDev;
}
```

---

### 6. **Report Only Shows Today's Data**
**Current**: `card()` function only displays current snapshot

**Recommendation**: Add comparison rows:
```javascript
// Instead of just showing:
"Total Revenue: $5,000"

// Show:
"Total Revenue: $5,000 (vs $4,200 avg) ↑"
"Daily Runs: 250 (vs 180 avg) ↑"
```

---

### 7. **No Actor Recommendation Engine**
**Recommendation**: Add automatic suggestions to report
```javascript
const recommendations = {
  shouldScale: actors.filter(a => a.todayRuns > 1000).length,
  shouldOptimize: actors.filter(a => a.costPer1000Results > avg * 1.5),
  shouldInvestigate: actors.filter(a => a.succeededRuns / a.totalRuns < 0.5),
};

// Display in report:
"📊 Scaling opportunity: actor-005 had 2,500 runs today (3x usual)"
"⚠️  Performance concern: 3 actors have higher-than-average costs"
```

---

### 8. **No Retry Logic for Failed Requests**
**Current**: One failed API call skips entire actor

**Recommendation**: Add exponential backoff retry
```javascript
async function apiFetchWithRetry(url, token, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiFetch(url, token);
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
      await sleep(delay);
    }
  }
}
```

---

### 9. **Email Removal Incomplete**
**Current**: `emailTo` field still in recommended input structure

**Recommendation**: Update `.actor/input_schema.json` to remove emailTo property entirely

---

### 10. **Missing Performance Metrics for KV Store Operations**
**Current**: No logging of how long snapshot save/load takes

**Recommendation**: Add timing logs
```javascript
const startSave = Date.now();
await saveSnapshot(store, currSnapshot);
log.info('Snapshot saved', { duration: Date.now() - startSave });
```

---

## 🟡 Nice-to-Have Features

### A. **Weekly Digest Email** (New Feature)
- Summarize week's changes
- Highlight best/worst performing actors
- Trend analysis with charts

### B. **Slack Integration**
- Send alerts to Slack channel instead of email
- Quick action buttons in Slack messages
- Better for team collaboration

### C. **Export Options**
- CSV export of actor metrics
- JSON raw data export
- PDF report generation

### D. **Actor Grouping**
- Group by category (scraper, downloader, etc.)
- Custom actor tags/labels
- Filter report by tag

### E. **Comparison Dashboard**
- Compare two actors side-by-side
- Month-over-month changes
- Peer benchmarking (vs same-type actors)

---

## 📋 Refactoring Opportunities

### 1. **Extract threshold logic into constants**
```javascript
// fetcher.js
const API_DELAYS = {
  ACCOUNT_WIDE: 300,
  BETWEEN_ACTORS: 500,
};
const CONCURRENCY = {
  ACTOR_FETCH: 4,
};
```

### 2. **Create a Config type/class**
```javascript
class MonitorConfig {
  constructor(input) {
    this.thresholds = input.alertThresholds || DEFAULT_THRESHOLDS;
    this.concurrency = input.concurrency || DEFAULT_CONCURRENCY;
  }
}
```

### 3. **Separate report styling into CSS file**
- More maintainable
- Could support themes (light/dark)
- Easier to customize colors

---

## 🎯 Priority Roadmap

**High Priority** (do next):
1. Increase concurrency (currently too slow with 40+ actors)
2. Add configurable alert thresholds
3. Fix historical trend tracking

**Medium Priority** (this month):
4. Add retry logic for API calls
5. Improve anomaly detection logic
6. Add recommendations to report

**Low Priority** (nice to have):
7. Slack integration
8. CSV/JSON exports
9. Multi-snapshot comparison

---

## Summary

Your codebase is **well-architected** and **production-ready** with good error handling and UX. The main opportunities are:
- **Performance**: Increase concurrency for faster runs
- **Intelligence**: Add trend analysis and anomaly detection
- **Configuration**: Make thresholds adjustable
- **Features**: Add recommendations and webhook integrations

Would you like me to implement any of these suggestions?
