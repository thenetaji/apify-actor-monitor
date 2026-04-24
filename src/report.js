/**
 * Pure function — returns a self-contained HTML string.
 * No external dependencies, no CDN links, inline CSS + JS only.
 *
 * Design: refined dark financial terminal.
 * Sharp grid, ruled lines, monospaced numbers, color used sparingly for signal.
 */

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function money(n, dec = 2) {
  const v = Number(n ?? 0);
  return '$' + v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

function pct(n, dec = 1) {
  return `${(Number(n ?? 0) * 100).toFixed(dec)}%`;
}

function pctRaw(n, dec = 1) {
  return `${Number(n ?? 0).toFixed(dec)}%`;
}

function num(n, dec = 0) {
  const v = Number(n ?? 0);
  return dec === 0 ? v.toLocaleString('en-US') : v.toFixed(dec);
}

function delta(n, dec = 2) {
  const v = Number(n ?? 0);
  const abs = Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  return v >= 0 ? `+$${abs}` : `−$${abs}`;
}

function signDelta(n) {
  const v = Number(n ?? 0);
  return v >= 0 ? `+${num(v)}` : `${num(v)}`;
}

// 0a. Inline SVG sparkline from an array of numeric values
function sparkline(values, w = 80, h = 20, colorVar = 'var(--c-blue)') {
  if (!values || values.length < 2) return '';
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const xStep = w / (values.length - 1);
  const points = values
    .map((v, i) => {
      const x = +(i * xStep).toFixed(1);
      const y = +(h - 2 - ((v - min) / range) * (h - 4)).toFixed(1);
      return `${x},${y}`;
    })
    .join(' ');
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg" style="color:${colorVar};display:inline-block;vertical-align:middle;"><polyline points="${points}" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

// 0b. Top gainers / losers section (shown after revenue split, skipped on first run)
function gainersLosersSection(diffs, isFirstRun) {
  if (isFirstRun) return '';
  const active = diffs.filter((d) => !d.isRemoved && d.revenueDelta !== 0);
  if (active.length === 0) return '';

  const gainers = [...active].sort((a, b) => b.revenueDelta - a.revenueDelta).filter((d) => d.revenueDelta > 0).slice(0, 3);
  const losers = [...active].sort((a, b) => a.revenueDelta - b.revenueDelta).filter((d) => d.revenueDelta < 0).slice(0, 3);
  if (gainers.length === 0 && losers.length === 0) return '';

  const truncate = (s, n = 26) => (s.length > n ? s.slice(0, n - 1) + '\u2026' : s);

  function glRows(actors, cls, sign) {
    return actors.map((d) => `
<div class="gl-item">
  <span class="gl-name">${esc(truncate(d.actorTitle || d.actorName))}</span>
  <span class="gl-delta ${cls}">${sign}$${Math.abs(d.revenueDelta).toFixed(2)}</span>
</div>`).join('');
  }

  return `
<div class="blk-title">Revenue Movers</div>
<div class="gl-grid">
  <div class="gl-col">
    <div class="gl-head gl-head-gain">Top Gainers</div>
    ${gainers.length ? glRows(gainers, 'gl-pos', '+') : '<div class="gl-empty">—</div>'}
  </div>
  <div class="gl-col">
    <div class="gl-head gl-head-loss">Top Losers</div>
    ${losers.length ? glRows(losers, 'gl-neg', '\u2212') : '<div class="gl-empty">—</div>'}
  </div>
</div>`;
}
function card(label, value, sub, accentVar, tooltip = '', comp = '') {
  return `
<div class="card"${tooltip ? ` data-tip="${esc(tooltip)}"` : ''} style="--ac:${accentVar}">
  <div class="card-label">${esc(label)}</div>
  <div class="card-value">${value}</div>
  ${comp ? `<div class="card-comp">${comp}</div>` : ''}
  ${sub ? `<div class="card-sub">${esc(sub)}</div>` : ''}
</div>`;
}

// 2. Revenue split bar component
function revenueBar(payingRev, freeRev, payingRevToday, freeRevToday) {
  const totalMTD = payingRev + freeRev;
  const payingPct = totalMTD > 0 ? (payingRev / totalMTD) * 100 : 0;
  const freePct = 100 - payingPct;
  const totalToday = payingRevToday + freeRevToday;
  const payingPctToday = totalToday > 0 ? (payingRevToday / totalToday) * 100 : 0;
  const freePctToday = 100 - payingPctToday;

  return `
<div class="rev-split">
  <div class="rev-split-row">
    <div class="rev-split-col">
      <div class="rev-split-head">Revenue Source — Month to Date</div>
      <div class="rev-split-bar">
        <div class="rev-bar-fill rev-bar-paying" style="width:${payingPct.toFixed(1)}%" data-tip="Paying users: ${money(payingRev)} (${payingPct.toFixed(1)}%)"></div>
        <div class="rev-bar-fill rev-bar-free"   style="width:${freePct.toFixed(1)}%"   data-tip="Free users: ${money(freeRev)} (${freePct.toFixed(1)}%)"></div>
      </div>
      <div class="rev-split-legend">
        <span class="legend-dot leg-paying"></span><span class="legend-label">Paying <strong>${money(payingRev)}</strong> <em>${payingPct.toFixed(1)}%</em></span>
        <span class="legend-dot leg-free"></span><span class="legend-label">Free <strong>${money(freeRev)}</strong> <em>${freePct.toFixed(1)}%</em></span>
      </div>
    </div>
    <div class="rev-split-col">
      <div class="rev-split-head">Revenue Source — Today</div>
      <div class="rev-split-bar">
        <div class="rev-bar-fill rev-bar-paying" style="width:${payingPctToday.toFixed(1)}%" data-tip="Paying users: ${money(payingRevToday)} (${payingPctToday.toFixed(1)}%)"></div>
        <div class="rev-bar-fill rev-bar-free"   style="width:${freePctToday.toFixed(1)}%"   data-tip="Free users: ${money(freeRevToday)} (${freePctToday.toFixed(1)}%)"></div>
      </div>
      <div class="rev-split-legend">
        <span class="legend-dot leg-paying"></span><span class="legend-label">Paying <strong>${money(payingRevToday)}</strong> <em>${payingPctToday.toFixed(1)}%</em></span>
        <span class="legend-dot leg-free"></span><span class="legend-label">Free <strong>${money(freeRevToday)}</strong> <em>${freePctToday.toFixed(1)}%</em></span>
      </div>
    </div>
  </div>
</div>`;
}

// 3. Actor row renderer
function renderActorRow(d, trendData = new Map()) {
  const id = esc(d.actorId);
  const title = esc(d.actorTitle || d.actorName);

  let signal = '';
  let signalClass = d.status;
  if (d.status === 'red') {
    signal = d.isRemoved ? 'Removed' : d.todayRuns === 0 ? 'No runs today' : `${num(d.todaySuccessRate, 1)}% success`;
  } else if (d.status === 'yellow') {
    signal = `Rev ${delta(d.revenueDelta)}`;
  } else {
    signal = `${money(d.todayRevenue)} today`;
  }

  const badges = [
    d.isNew ? `<span class="badge badge-new">NEW</span>` : '',
    d.isRemoved ? `<span class="badge badge-rm">REMOVED</span>` : '',
  ].join('');

  // Trend sparklines (only shown when 2+ historical data points exist for this actor)
  const trend = trendData.get(d.actorId);
  const sparkSection = trend && trend.runs.length >= 2 ? `
      <div class="dsec dsec-spark">
        <div class="dsec-head">Trend (7d)</div>
        <div class="spark-row">
          <div class="spark-item">
            <div class="spark-label">Runs</div>
            ${sparkline(trend.runs, 80, 20, 'var(--c-blue)')}
          </div>
          <div class="spark-item">
            <div class="spark-label">Revenue</div>
            ${sparkline(trend.revenue, 80, 20, 'var(--c-green)')}
          </div>
        </div>
      </div>` : '';

  return `
<div class="arow" data-status="${d.status}" data-name="${title.toLowerCase()}" data-revenue="${(d.totalRevenue ?? 0).toFixed(4)}" data-runs="${d.todayRuns ?? 0}" data-rate="${(d.todaySuccessRate ?? 0).toFixed(4)}">
  <div class="arow-hdr" onclick="toggleActor('${id}')">
    <span class="status-pip pip-${d.status}"></span>
    <span class="aname">${title}${badges}</span>
    <span class="asignal sig-${signalClass}">${signal}</span>
    <svg class="chevron" id="chev-${id}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="5 8 10 13 15 8"/>
    </svg>
  </div>
  <div class="adetail" id="d-${id}">
    <div class="detail-grid">

      <div class="dsec">
        <div class="dsec-head">Financials — Month</div>
        <div class="drow"><span>Revenue</span><span class="dval pos">${money(d.totalRevenue)}</span></div>
        <div class="drow"><span>Cost</span><span class="dval">${money(d.totalCost)}</span></div>
        <div class="drow"><span>Net Profit</span><span class="dval ${d.netProfit >= 0 ? 'pos' : 'neg'}">${money(d.netProfit)}</span></div>
        <div class="drow"><span>Margin</span><span class="dval pos">${pct(d.profitMargin)}</span></div>
      </div>

      <div class="dsec">
        <div class="dsec-head">Users — Month</div>
        <div class="drow"><span>Paying MTD</span><span class="dval">${num(d.payingUsers)}<em class="${d.newPayingUsersGained >= 0 ? 'pos' : 'neg'}">${d.newPayingUsersGained >= 0 ? '+' : ''}${d.newPayingUsersGained} since last run</em></span></div>
        <div class="drow"><span>Free MTD</span><span class="dval">${num(d.freeUsers)}<em class="${d.newFreeUsersGained >= 0 ? 'pos' : 'neg'}">${d.newFreeUsersGained >= 0 ? '+' : ''}${d.newFreeUsersGained} since last run</em></span></div>
        <div class="drow"><span>Active Today (paying)</span><span class="dval">${num(d.todayPayingUsers)}</span></div>
        <div class="drow"><span>Active Today (free)</span><span class="dval">${num(d.todayFreeUsers)}</span></div>
      </div>

      <div class="dsec">
        <div class="dsec-head">Today's Runs</div>
        <div class="drow"><span>Total</span><span class="dval">${num(d.todayRuns)}</span></div>
        <div class="drow"><span>Succeeded</span><span class="dval pos">${num(d.todaySucceeded)}</span></div>
        <div class="drow"><span>Failed / T-O</span><span class="dval ${d.todayFailed > 0 ? 'neg' : ''}">${num(d.todayFailed)}</span></div>
        <div class="drow"><span>Success Rate</span><span class="dval ${d.todaySuccessRate >= 90 ? 'pos' : d.todaySuccessRate < 50 ? 'neg' : 'warn'}">${num(d.todaySuccessRate, 1)}%</span></div>
      </div>

      <div class="dsec">
        <div class="dsec-head">Efficiency</div>
        <div class="drow"><span>Cost / 1k Results</span><span class="dval">${money(d.costPer1000Results, 4)}</span></div>
        <div class="drow"><span>Daily Results avg</span><span class="dval">${num(d.dailyResults?.avg, 0)}</span></div>
        <div class="drow"><span>Results min / max</span><span class="dval">${num(d.dailyResults?.min)} / ${num(d.dailyResults?.max)}</span></div>
        <div class="drow"><span>Daily Runs avg</span><span class="dval">${num(d.dailyRuns?.avg, 1)}</span></div>
        <div class="drow"><span>Runs min / max</span><span class="dval">${num(d.dailyRuns?.min)} / ${num(d.dailyRuns?.max)}</span></div>
      </div>
      ${sparkSection}

    </div>
  </div>
</div>`;
}

// 4. Section renderer
function getSectionInfo(status) {
  const info = {
    red: '<strong>Critical:</strong> Actors with zero runs today, low success rates, or recently removed. Check logs immediately.',
    yellow: '<strong>Watch:</strong> Revenue shifted >20% or run volume changed significantly. Monitor before escalating.',
    green: '<strong>Healthy:</strong> Running smoothly with consistent revenue and high success rates.',
  };
  return info[status] || '';
}

function renderSection(actors, status, label, openByDefault, trendData = new Map()) {
  if (actors.length === 0) return '';
  const infoText = getSectionInfo(status);
  return `
<div class="section">
  <div class="sec-hdr" onclick="toggleSec('${status}')">
    <span class="sec-pip pip-${status}"></span>
    <span class="sec-label">${esc(label)}</span>
    <span class="sec-count">${actors.length}</span>
    <span class="sort-btns" onclick="event.stopPropagation()">
      <button class="sort-btn" onclick="sortSection('sec-${status}','revenue',this)" data-field="revenue">Rev</button>
      <button class="sort-btn" onclick="sortSection('sec-${status}','runs',this)" data-field="runs">Runs</button>
      <button class="sort-btn" onclick="sortSection('sec-${status}','rate',this)" data-field="rate">Rate</button>
    </span>
    <svg class="sec-chev" id="sc-${status}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"${openByDefault ? '' : ' style="transform:rotate(-90deg)"'}>
      <polyline points="5 8 10 13 15 8"/>
    </svg>
  </div>
  <div class="sec-body" id="sec-${status}"${openByDefault ? '' : ' style="display:none"'}>
    <div class="sec-info">${infoText}</div>
    ${actors.map((d) => renderActorRow(d, trendData)).join('\n')}
  </div>
</div>`;
}

// 5. Main report HTML generator
export function generateReport(accountSummary, diffs, reportUrl = null, isFirstRun = false, fetchErrorCount = 0, trendData = new Map(), prevAccountSummary = null) {
  const date = accountSummary.today;
  const timeStr = new Date(accountSummary.capturedAt).toISOString().slice(11, 19);

  const red = diffs.filter((d) => d.status === 'red');
  const yellow = diffs.filter((d) => d.status === 'yellow');
  const green = diffs.filter((d) => d.status === 'green');

  const actorRunsTotal = diffs.reduce((s, d) => s + (d.todayRuns ?? 0), 0);
  const actorSucceededTotal = diffs.reduce((s, d) => s + (d.todaySucceeded ?? 0), 0);
  const successRate = actorRunsTotal > 0 ? (actorSucceededTotal / actorRunsTotal) * 100 : 0;
  const runsTooltip = fetchErrorCount > 0
    ? `Sum of today's runs across all actors shown. Note: ${fetchErrorCount} actor(s) failed to load and are excluded.`
    : `Sum of today's runs across all actors shown below`;

  const todayProfit = accountSummary.todayRevenue - accountSummary.todayCost;

  // Comparison helpers — show prev-day values on today's cards when prevAccountSummary is available
  const prevDate = prevAccountSummary?.today ?? null;
  const prevDateLabel = prevDate ? prevDate.slice(5) : '';
  function cmpMoney(prevVal, currVal) {
    if (!prevAccountSummary || prevVal == null) return '';
    const diff = currVal - prevVal;
    const clr = diff >= 0 ? 'var(--pos)' : 'var(--neg)';
    const sign = diff >= 0 ? '+' : '\u2212';
    const absDiff = '$' + Math.abs(diff).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `vs ${money(prevVal)} on ${prevDateLabel} <span style="color:${clr}">(${sign}${absDiff})</span>`;
  }
  function cmpNum(prevVal, currVal) {
    if (!prevAccountSummary || prevVal == null) return '';
    const diff = currVal - prevVal;
    const clr = diff >= 0 ? 'var(--pos)' : 'var(--neg)';
    const sign = diff >= 0 ? '+' : '\u2212';
    return `vs ${num(prevVal)} on ${prevDateLabel} <span style="color:${clr}">(${sign}${num(Math.abs(diff))})</span>`;
  }
  const prevTodayProfit = prevAccountSummary ? (prevAccountSummary.todayRevenue - prevAccountSummary.todayCost) : 0;

  const activeDiffs = diffs.filter((d) => !d.isRemoved);
  const totalPayingMTD = activeDiffs.reduce((s, d) => s + (d.payingUsers ?? 0), 0);
  const totalFreeMTD = activeDiffs.reduce((s, d) => s + (d.freeUsers ?? 0), 0);

  const overviewCards = [
    card('Total Revenue', money(accountSummary.totalRevenue), 'month to date', 'var(--c-green)', 'Sum of all actor earnings for the current calendar month'),
    card('Total Cost', money(accountSummary.totalCost), 'month to date', 'var(--c-amber)', 'Platform compute costs deducted from your earnings'),
    card('Net Profit', money(accountSummary.netProfit), 'month to date', 'var(--c-green)', 'Revenue minus cost. Your take-home for the month so far'),
    card('Profit Margin', pct(accountSummary.overallMargin), 'month to date', 'var(--c-blue)', 'Net profit as a percentage of total revenue'),
    card('Revenue Today', money(accountSummary.todayRevenue), 'today', 'var(--c-teal)', 'Revenue earned from actor runs today', cmpMoney(prevAccountSummary?.todayRevenue, accountSummary.todayRevenue)),
    card('Cost Today', money(accountSummary.todayCost), 'today', 'var(--c-amber)', 'Platform compute costs incurred today', cmpMoney(prevAccountSummary?.todayCost, accountSummary.todayCost)),
    card('Profit Today', money(todayProfit), 'today', todayProfit >= 0 ? 'var(--c-green)' : 'var(--c-red)', 'Revenue minus cost for today', cmpMoney(prevTodayProfit, todayProfit)),
    card('Runs Today', num(actorRunsTotal), null, 'var(--c-blue)', runsTooltip, cmpNum(prevAccountSummary?.todayRuns, actorRunsTotal)),
    card('Success Rate', `${num(successRate, 1)}%`, 'today', successRate >= 90 ? 'var(--c-green)' : 'var(--c-amber)', 'Percentage of today\'s runs that completed successfully'),
    card('Paying Users MTD', num(totalPayingMTD), 'month to date', 'var(--c-teal)', 'Cumulative unique paying users across all actors this month'),
    card('Free Users MTD', num(totalFreeMTD), 'month to date', 'var(--c-blue)', 'Cumulative unique free users across all actors this month'),
    card('Paying Active Today', num(accountSummary.todayPayingUsers), 'ran actors today', 'var(--c-teal)', 'Unique paying users who ran at least one of your actors today'),
    card('Free Active Today', num(accountSummary.todayFreeUsers), 'ran actors today', 'var(--c-muted)', 'Unique free-tier users who ran at least one of your actors today'),
  ].join('\n');

  const revSplit = revenueBar(
    accountSummary.payingRevenueMTD ?? 0,
    accountSummary.freeRevenueMTD ?? 0,
    accountSummary.todayPayingRevenue ?? 0,
    accountSummary.todayFreeRevenue ?? 0,
  );

  const firstRunBanner = isFirstRun ? `
<div class="frb">
  <div class="frb-icon">◈</div>
  <div class="frb-body">
    <div class="frb-title">Baseline snapshot captured — this is your first run</div>
    <div class="frb-text">Today's data has been saved. Status indicators, revenue deltas, and trend comparisons will appear on your <strong>next run</strong> once there is a previous snapshot to compare against.</div>
  </div>
</div>` : '';

  const sections = [
    renderSection(red, 'red', 'Needs Attention', true, trendData),
    renderSection(yellow, 'yellow', 'Watch Closely', true, trendData),
    renderSection(green, 'green', 'On Track', false, trendData),
  ].join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Apify Monitor — ${esc(date)}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

:root {
  --bg:        #0C0E14;
  --bg-2:      #13151E;
  --bg-3:      #191C28;
  --bg-4:      #1E2232;
  --border:    rgba(255,255,255,.07);
  --border-md: rgba(255,255,255,.12);
  --border-hi: rgba(255,255,255,.20);

  --text:      #F0F2FF;
  --text-2:    #8B91B0;
  --text-3:    #454C6B;
  --text-4:    #2C3050;

  --c-blue:   #5B8DEF;
  --c-teal:   #34D1B5;
  --c-green:  #3DD68C;
  --c-red:    #F0556A;
  --c-amber:  #F5A623;
  --c-purple: #9B7BFF;
  --c-muted:  #5A6080;

  --green-dim:    rgba(61,214,140,.10);
  --green-border: rgba(61,214,140,.25);
  --red-dim:      rgba(240,85,106,.10);
  --red-border:   rgba(240,85,106,.25);
  --amber-dim:    rgba(245,166,35,.10);
  --amber-border: rgba(245,166,35,.25);

  --pos:  #3DD68C;
  --neg:  #F0556A;
  --warn: #F5A623;

  --r: 6px;
  --sans: 'DM Sans', 'Segoe UI', system-ui, sans-serif;
  --mono: 'DM Mono', 'SF Mono', 'Cascadia Code', 'Fira Code', monospace;
}

*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; }
body {
  font-family: var(--sans);
  font-size: 13px;
  line-height: 1.5;
  color: var(--text);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
}

/* ── HEADER ── */
.hdr {
  background: var(--bg-2);
  border-bottom: 1px solid var(--border-md);
  position: sticky; top: 0; z-index: 50;
}
.hdr-inner {
  max-width: 1280px; margin: 0 auto;
  padding: 0 32px;
  height: 64px;
  display: flex; align-items: center; gap: 20px;
}
.hdr-brand {
  display: flex; align-items: center; gap: 10px;
}
.hdr-logo {
  width: 28px; height: 28px;
  background: linear-gradient(135deg, var(--c-teal), var(--c-blue));
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 800; color: #fff;
  font-family: var(--mono);
  letter-spacing: -1px;
  flex-shrink: 0;
}
.hdr-name {
  font-size: 11px; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; color: var(--text-2);
}
.hdr-sep {
  width: 1px; height: 24px; background: var(--border-md);
}
.hdr-title {
  font-size: 16px; font-weight: 700; color: var(--text);
  letter-spacing: -.2px;
}
.hdr-right {
  margin-left: auto;
  display: flex; align-items: center; gap: 16px;
}
.hdr-ts {
  font-family: var(--mono); font-size: 12px; color: var(--text-3);
}
.hdr-link {
  font-size: 12px; font-weight: 600; color: var(--c-blue);
  text-decoration: none; display: flex; align-items: center; gap: 4px;
  padding: 6px 12px;
  border: 1px solid rgba(91,141,239,.3);
  border-radius: var(--r);
  transition: background .15s, border-color .15s;
}
.hdr-link:hover { background: rgba(91,141,239,.08); border-color: rgba(91,141,239,.5); text-decoration: none; }

/* ── LAYOUT ── */
.wrap { max-width: 1280px; margin: 0 auto; padding: 28px 32px 80px; }

/* ── SECTION TITLES ── */
.blk-title {
  font-size: 10px; font-weight: 700; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--text-3);
  margin: 32px 0 14px;
  display: flex; align-items: center; gap: 12px;
}
.blk-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }

/* ── METRIC CARDS ── */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 10px;
}
.card {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 16px 18px 14px;
  position: relative;
  overflow: hidden;
  transition: border-color .15s, transform .15s;
  cursor: default;
}
.card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--ac, var(--c-blue));
}
.card:hover { border-color: var(--border-md); transform: translateY(-1px); }
.card-label {
  font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
  text-transform: uppercase; color: var(--text-3);
  margin-bottom: 10px;
}
.card-value {
  font-family: var(--mono);
  font-size: 26px; font-weight: 500; line-height: 1;
  color: var(--text); letter-spacing: -.5px;
}
.card-sub {
  font-size: 10px; color: var(--text-3); margin-top: 8px;
  text-transform: uppercase; letter-spacing: .8px;
}
.card-comp {
  font-size: 11px; color: var(--text-3); margin-top: 6px;
  font-family: var(--mono); line-height: 1.5;
}

/* ── REVENUE SPLIT PANEL ── */
.rev-split {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 20px 24px;
  margin-top: 10px;
}
.rev-split-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}
@media(max-width:640px) { .rev-split-row { grid-template-columns: 1fr; } }
.rev-split-head {
  font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
  text-transform: uppercase; color: var(--text-3);
  margin-bottom: 12px;
}
.rev-split-bar {
  height: 8px;
  border-radius: 4px;
  background: var(--bg-4);
  overflow: hidden;
  display: flex;
  margin-bottom: 12px;
}
.rev-bar-fill {
  height: 100%;
  transition: width .4s ease;
  position: relative; cursor: help;
}
.rev-bar-paying { background: var(--c-teal); }
.rev-bar-free   { background: var(--c-blue); opacity: .55; }
.rev-split-legend {
  display: flex; gap: 20px; align-items: center;
}
.legend-dot {
  width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
}
.leg-paying { background: var(--c-teal); }
.leg-free   { background: var(--c-blue); opacity: .7; }
.legend-label {
  font-size: 12px; color: var(--text-2);
  display: flex; align-items: center; gap: 6px;
}
.legend-label strong { font-family: var(--mono); font-weight: 500; color: var(--text); font-size: 13px; }
.legend-label em { font-style: normal; font-family: var(--mono); font-size: 11px; color: var(--text-3); }

/* ── FIRST RUN BANNER ── */
.frb {
  display: flex; align-items: flex-start; gap: 16px;
  margin: 16px 0 0;
  padding: 18px 22px;
  background: var(--bg-3);
  border: 1px solid var(--border-md);
  border-left: 3px solid var(--c-blue);
  border-radius: var(--r);
}
.frb-icon {
  font-size: 20px; color: var(--c-blue); flex-shrink: 0; line-height: 1.4;
  font-family: var(--mono);
}
.frb-title { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.frb-text  { font-size: 13px; color: var(--text-2); line-height: 1.6; }
.frb-text strong { color: var(--text); font-weight: 600; }

/* ── STATUS PILLS ── */
.status-row { display: flex; gap: 8px; margin: 24px 0 28px; }
.s-pill {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 18px;
  border-radius: var(--r);
  border: 1px solid var(--border);
  background: var(--bg-2);
  font-size: 12px; font-weight: 600; color: var(--text-2);
  cursor: default;
}
.s-pill-num {
  font-family: var(--mono); font-size: 22px; font-weight: 500;
  line-height: 1;
}
.s-pill.s-red    { border-color: var(--red-border);   background: var(--red-dim);   }
.s-pill.s-red    .s-pill-num { color: var(--c-red);   }
.s-pill.s-amber  { border-color: var(--amber-border); background: var(--amber-dim); }
.s-pill.s-amber  .s-pill-num { color: var(--c-amber); }
.s-pill.s-green  { border-color: var(--green-border); background: var(--green-dim); }
.s-pill.s-green  .s-pill-num { color: var(--c-green); }

/* ── SECTION ── */
.section { margin-bottom: 12px; border: 1px solid var(--border); border-radius: var(--r); overflow: hidden; }

.sec-hdr {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 18px;
  background: var(--bg-2);
  cursor: pointer; user-select: none;
  transition: background .12s;
}
.sec-hdr:hover { background: var(--bg-3); }

.sec-pip {
  width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
}
.pip-red    { background: var(--c-red);   box-shadow: 0 0 5px var(--c-red);   }
.pip-yellow { background: var(--c-amber); box-shadow: 0 0 5px var(--c-amber); }
.pip-green  { background: var(--c-green); box-shadow: 0 0 5px var(--c-green); }

.sec-label { font-size: 13px; font-weight: 700; color: var(--text); flex: 1; }
.sec-count {
  font-family: var(--mono); font-size: 12px; font-weight: 500;
  color: var(--text-3);
  background: var(--bg-4); padding: 2px 10px; border-radius: 20px;
}
.sec-chev { width: 14px; height: 14px; color: var(--text-3); transition: transform .2s; }

.sec-body { border-top: 1px solid var(--border); }
.sec-info {
  padding: 10px 18px;
  background: var(--bg-3);
  border-bottom: 1px solid var(--border);
  font-size: 12px; color: var(--text-2); line-height: 1.5;
}
.sec-info strong { color: var(--text); font-weight: 600; }

/* ── ACTOR ROWS ── */
.arow {
  border-left: 3px solid transparent;
  border-bottom: 1px solid var(--border);
  transition: background .1s;
}
.arow:last-child { border-bottom: none; }
.arow[data-status="red"]    { border-left-color: var(--c-red);   }
.arow[data-status="yellow"] { border-left-color: var(--c-amber); }
.arow[data-status="green"]  { border-left-color: var(--c-green); }

.arow-hdr {
  display: flex; align-items: center; gap: 12px;
  padding: 11px 18px 11px 14px;
  cursor: pointer; user-select: none;
  background: var(--bg-2);
  transition: background .1s;
}
.arow-hdr:hover { background: var(--bg-3); }

.status-pip {
  width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
}

.aname {
  flex: 1; font-size: 14px; font-weight: 600; color: var(--text);
  display: flex; align-items: center; gap: 8px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.asignal {
  font-family: var(--mono); font-size: 12px; font-weight: 500;
  white-space: nowrap; padding: 2px 0;
}
.sig-red    { color: var(--c-red);   }
.sig-yellow { color: var(--c-amber); }
.sig-green  { color: var(--pos);     }

.chevron { width: 14px; height: 14px; color: var(--text-3); transition: transform .2s; flex-shrink: 0; }

/* ── BADGES ── */
.badge {
  font-size: 9px; font-weight: 800; letter-spacing: 1px;
  padding: 2px 6px; border-radius: 3px;
  text-transform: uppercase; flex-shrink: 0;
}
.badge-new { background: var(--green-dim); color: var(--c-green); border: 1px solid var(--green-border); }
.badge-rm  { background: var(--red-dim);   color: var(--c-red);   border: 1px solid var(--red-border);   }

/* ── ACTOR DETAIL ── */
.adetail {
  display: none;
  padding: 20px;
  background: var(--bg);
  border-top: 1px solid var(--border);
}
.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
.dsec-head {
  font-size: 9px; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; color: var(--text-3);
  margin-bottom: 10px; padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}
.drow {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 5px 0;
  border-bottom: 1px solid var(--border);
  font-size: 13px;
}
.drow:last-child { border-bottom: none; }
.drow > span:first-child { color: var(--text-2); }
.dval {
  font-family: var(--mono); font-size: 14px; font-weight: 500;
  color: var(--text); text-align: right;
}
.dval.pos  { color: var(--pos);  }
.dval.neg  { color: var(--neg);  }
.dval.warn { color: var(--warn); }
.dval em {
  display: block; font-style: normal;
  font-size: 11px; font-weight: 500;
  font-family: var(--mono);
}

/* ── TOOLTIP ── */
[data-tip] { position: relative; cursor: help; }
[data-tip]:hover::after {
  content: attr(data-tip);
  position: absolute; bottom: calc(100% + 7px); left: 50%; transform: translateX(-50%);
  background: var(--bg-4); color: var(--text-2);
  border: 1px solid var(--border-md);
  border-radius: var(--r); padding: 7px 11px;
  font-size: 11px; font-weight: 400; line-height: 1.5;
  white-space: nowrap; z-index: 200;
  font-family: var(--sans); pointer-events: none;
  box-shadow: 0 8px 24px rgba(0,0,0,.5);
  max-width: 280px; white-space: normal; text-align: center;
}
[data-tip]:hover::before {
  content: '';
  position: absolute; bottom: calc(100% + 2px); left: 50%; transform: translateX(-50%);
  border: 5px solid transparent; border-top-color: var(--bg-4);
  z-index: 201; pointer-events: none;
}

/* ── GAINERS / LOSERS ── */
.gl-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
@media(max-width:600px) { .gl-grid { grid-template-columns: 1fr; } }
.gl-col {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 16px 18px;
}
.gl-head {
  font-size: 9px; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; margin-bottom: 10px;
  padding-bottom: 8px; border-bottom: 1px solid var(--border);
}
.gl-head-gain { color: var(--c-green); }
.gl-head-loss { color: var(--c-red); }
.gl-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 6px 0; border-bottom: 1px solid var(--border);
}
.gl-item:last-child { border-bottom: none; }
.gl-name {
  font-size: 13px; color: var(--text-2);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  max-width: 65%;
}
.gl-delta {
  font-family: var(--mono); font-size: 13px; font-weight: 500;
  white-space: nowrap;
}
.gl-pos { color: var(--c-green); }
.gl-neg { color: var(--c-red); }
.gl-empty { font-size: 12px; color: var(--text-3); text-align: center; padding: 8px 0; }

/* ── SEARCH BAR ── */
.search-wrap { margin: 0 0 12px; }
.actor-search {
  width: 100%;
  padding: 10px 16px;
  background: var(--bg-2);
  border: 1px solid var(--border-md);
  border-radius: var(--r);
  color: var(--text);
  font-family: var(--sans);
  font-size: 14px;
  outline: none;
  transition: border-color .15s;
}
.actor-search::placeholder { color: var(--text-3); }
.actor-search:focus { border-color: var(--c-blue); }

/* ── SORT BUTTONS ── */
.sort-btns {
  display: flex; gap: 4px; margin-left: auto; margin-right: 8px;
}
.sort-btn {
  background: var(--bg-4);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-3);
  font-family: var(--sans);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .5px;
  padding: 3px 8px;
  cursor: pointer;
  transition: background .12s, color .12s, border-color .12s;
  white-space: nowrap;
}
.sort-btn:hover { background: var(--bg-3); color: var(--text-2); border-color: var(--border-md); }
.sort-btn.sort-asc,
.sort-btn.sort-desc { background: rgba(91,141,239,.12); color: var(--c-blue); border-color: rgba(91,141,239,.3); }
.sort-btn.sort-asc::after  { content: ' ↑'; }
.sort-btn.sort-desc::after { content: ' ↓'; }

/* ── SPARKLINES ── */
.dsec-spark { grid-column: 1 / -1; }
.spark-row { display: flex; gap: 24px; align-items: flex-end; flex-wrap: wrap; }
.spark-item { display: flex; flex-direction: column; gap: 4px; }
.spark-label {
  font-size: 10px; color: var(--text-3);
  letter-spacing: .5px; text-transform: uppercase;
}
</style>
</head>
<body>

<div class="hdr">
  <div class="hdr-inner">
    <div class="hdr-brand">
      <div class="hdr-logo">A∿</div>
      <div class="hdr-name">Apify Monitor</div>
    </div>
    <div class="hdr-sep"></div>
    <div class="hdr-title">Performance Report &mdash; ${esc(date)}</div>
    <div class="hdr-right">
      <div class="hdr-ts">Generated ${esc(timeStr)} UTC</div>
      ${reportUrl ? `<a class="hdr-link" href="${esc(reportUrl)}">Open ↗</a>` : ''}
    </div>
  </div>
</div>

<div class="wrap">

  <div class="blk-title">Account Overview</div>
  <div class="cards">${overviewCards}</div>

  <div class="blk-title">Revenue Source</div>
  ${revSplit}

  ${gainersLosersSection(diffs, isFirstRun)}

  ${firstRunBanner}

  <div class="status-row">
    <div class="s-pill s-red">
      <div class="s-pill-num">${red.length}</div>
      <div>Needs Attention</div>
    </div>
    <div class="s-pill s-amber">
      <div class="s-pill-num">${yellow.length}</div>
      <div>Watch Closely</div>
    </div>
    <div class="s-pill s-green">
      <div class="s-pill-num">${green.length}</div>
      <div>On Track</div>
    </div>
  </div>

  <div class="blk-title">Actor Breakdown</div>
  <div class="search-wrap">
    <input type="text" id="actor-search" class="actor-search" placeholder="Search actors…" autocomplete="off" spellcheck="false">
  </div>
  ${sections}

</div>

<script>
function toggleActor(id) {
  var el   = document.getElementById('d-'    + id);
  var chev = document.getElementById('chev-' + id);
  var open = el.style.display === 'block';
  el.style.display     = open ? 'none' : 'block';
  chev.style.transform = open ? '' : 'rotate(180deg)';
}
function toggleSec(status) {
  var body = document.getElementById('sec-'  + status);
  var chev = document.getElementById('sc-'   + status);
  var open = body.style.display !== 'none';
  body.style.display   = open ? 'none' : '';
  chev.style.transform = open ? 'rotate(-90deg)' : '';
}
// Staggered card entrance
document.querySelectorAll('.card').forEach(function(c, i) {
  c.style.opacity = '0';
  c.style.transform = 'translateY(8px)';
  setTimeout(function() {
    c.style.transition = 'opacity .3s ease, transform .3s ease';
    c.style.opacity = '1';
    c.style.transform = '';
  }, 40 + i * 30);
});
// Live search / filter across all actor rows
var searchInput = document.getElementById('actor-search');
if (searchInput) {
  searchInput.addEventListener('input', function() {
    var q = this.value.toLowerCase().trim();
    document.querySelectorAll('.arow').forEach(function(row) {
      var name = row.getAttribute('data-name') || '';
      row.style.display = (!q || name.includes(q)) ? '' : 'none';
    });
  });
}
// Sort actors inside a section by a numeric data attribute
function sortSection(bodyId, field, btn) {
  var body = document.getElementById(bodyId);
  if (!body) return;
  var currentDir = btn.getAttribute('data-dir') || 'desc';
  var newDir = currentDir === 'desc' ? 'asc' : 'desc';
  // Reset all sort buttons in this section header
  btn.closest('.sec-hdr').querySelectorAll('.sort-btn').forEach(function(b) {
    b.classList.remove('sort-asc', 'sort-desc');
    b.removeAttribute('data-dir');
  });
  btn.classList.add(newDir === 'desc' ? 'sort-desc' : 'sort-asc');
  btn.setAttribute('data-dir', newDir);
  var rows = Array.from(body.querySelectorAll(':scope > .arow'));
  rows.sort(function(a, b) {
    var av = parseFloat(a.getAttribute('data-' + field) || '0');
    var bv = parseFloat(b.getAttribute('data-' + field) || '0');
    return newDir === 'desc' ? bv - av : av - bv;
  });
  rows.forEach(function(r) { body.appendChild(r); });
}
</script>
</body>
</html>`;
}
