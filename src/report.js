/**
 * Pure function — returns a self-contained HTML string.
 * No external dependencies, no CDN links, inline CSS + JS only.
 *
 * Design: dark navy financial dashboard.
 * Inspired by Bloomberg Terminal + Robinhood — data-forward, high contrast,
 * green = gain, red = loss, amber = caution. Georgia for authority,
 * SF Mono / Cascadia for crisp numbers.
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

function num(n, dec = 0) {
  const v = Number(n ?? 0);
  return dec === 0 ? v.toLocaleString('en-US') : v.toFixed(dec);
}

function delta(n, dec = 2) {
  const v = Number(n ?? 0);
  const abs = Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  return v >= 0 ? `+$${abs}` : `−$${abs}`;
}

// 1. Metric card component

function card(label, value, sub, accentVar, tooltip = '') {
  return `
<div class="card"${tooltip ? ` data-tip="${esc(tooltip)}"` : ''} style="--accent-c:${accentVar}">
  <div class="card-label">${esc(label)}</div>
  <div class="card-value">${value}</div>
  ${sub ? `<div class="card-sub">${esc(sub)}</div>` : ''}
</div>`;
}

// 2. Actor row renderer

function renderActorRow(d) {
  const id = esc(d.actorId);
  const title = esc(d.actorTitle || d.actorName);

  let signal = '';
  let signalClass = d.status;
  if (d.status === 'red') {
    signal = d.isRemoved
      ? 'Removed'
      : d.todayRuns === 0
        ? 'No runs today'
        : `${num(d.todaySuccessRate, 1)}% success`;
  } else if (d.status === 'yellow') {
    signal = `Rev ${delta(d.revenueDelta)}`;
  } else {
    signal = `${money(d.todayRevenue)} today`;
  }

  const badges = [
    d.isNew ? `<span class="badge badge-new">NEW</span>` : '',
    d.isRemoved ? `<span class="badge badge-rm">REMOVED</span>` : '',
  ].join('');

  return `
<div class="arow" data-status="${d.status}">
  <div class="arow-hdr" onclick="toggleActor('${id}')">
    <span class="status-dot dot-${d.status}"></span>
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
        <div class="drow"><span>Paying</span><span class="dval">${num(d.payingUsers)}<em>+${d.newPayingUsers} today</em></span></div>
        <div class="drow"><span>Free</span><span class="dval">${num(d.freeUsers)}<em>+${d.newFreeUsers} today</em></span></div>
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

    </div>
  </div>
</div>`;
}

// 3. Section renderer with status guidance

function getSectionInfo(status) {
  const info = {
    red: '<strong>Critical Issues:</strong> Actors with zero runs today, very low success rates, or recently removed. Check logs for errors, verify input format, and ensure scaling is appropriate.',
    yellow: '<strong>Performance Decline:</strong> Revenue dropped >15% or metrics shifted significantly from baseline. Monitor closely for emerging issues before they escalate.',
    green: '<strong>Healthy:</strong> Actors running smoothly with consistent revenue and high success rates. No immediate action needed.'
  };
  return info[status] || '';
}

function renderSection(actors, status, label, openByDefault) {
  if (actors.length === 0) return '';
  const infoText = getSectionInfo(status);
  return `
<div class="section" data-status="${status}">
  <div class="sec-info">${infoText}</div>
  <div class="sec-hdr" onclick="toggleSec('${status}')">
    <span class="sec-dot dot-${status}"></span>
    <span class="sec-label">${esc(label)}</span>
    <span class="sec-count">${actors.length} actor${actors.length !== 1 ? 's' : ''}</span>
    <svg class="sec-chev" id="sc-${status}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"${openByDefault ? '' : ' style="transform:rotate(-90deg)"'}>
      <polyline points="5 8 10 13 15 8"/>
    </svg>
  </div>
  <div class="sec-body" id="sec-${status}"${openByDefault ? '' : ' style="display:none"'}>
    ${actors.map(renderActorRow).join('\n')}
  </div>
</div>`;
}

// 4. Main report HTML generator

export function generateReport(accountSummary, diffs, reportUrl = null, isFirstRun = false) {
  const date = accountSummary.today;
  const timeStr = new Date(accountSummary.capturedAt).toISOString().slice(11, 19);

  const red = diffs.filter((d) => d.status === 'red');
  const yellow = diffs.filter((d) => d.status === 'yellow');
  const green = diffs.filter((d) => d.status === 'green');

  const successRate = accountSummary.todayRuns > 0
    ? (accountSummary.todaySucceeded / accountSummary.todayRuns) * 100
    : 0;

  const overviewCards = [
    card('Total Revenue', money(accountSummary.totalRevenue), 'month to date', 'var(--green)', 'Sum of all actor earnings for the current calendar month'),
    card('Total Cost', money(accountSummary.totalCost), 'month to date', 'var(--amber)', 'Platform compute costs deducted from your earnings'),
    card('Net Profit', money(accountSummary.netProfit), 'month to date', 'var(--green)', 'Revenue minus cost. Your take-home for the month so far'),
    card('Profit Margin', pct(accountSummary.overallMargin), 'month to date', 'var(--blue)', 'Net profit as a percentage of total revenue'),
    card('Runs Today', num(accountSummary.todayRuns), null, 'var(--blue)', 'Total actor runs across all actors today'),
    card('Success Rate', `${num(successRate, 1)}%`, 'today', successRate >= 90 ? 'var(--green)' : 'var(--amber)', 'Percentage of today\'s runs that completed successfully'),
    card('New Paying Users', `+${num(accountSummary.todayPayingUsers)}`, 'today', 'var(--teal)', 'New users who started a paid subscription today'),
    card('New Free Users', `+${num(accountSummary.todayFreeUsers)}`, 'today', 'var(--muted)', 'New users who started a free trial today'),
  ].join('\n');

  const firstRunBanner = isFirstRun ? `
<div class="first-run-banner">
  <div class="frb-icon">📊</div>
  <div class="frb-body">
    <div class="frb-title">Baseline snapshot captured — this is your first run</div>
    <div class="frb-text">Today's data has been saved. The <strong>red / yellow / green status indicators</strong>, revenue deltas, and trend comparisons will appear on your <strong>next run</strong> once there is a previous snapshot to compare against. Schedule the actor to run again tomorrow (or at your preferred interval) to start seeing insights.</div>
  </div>
</div>` : '';

  const sections = [
    renderSection(red, 'red', 'Needs Attention', true),
    renderSection(yellow, 'yellow', 'Watch Closely', true),
    renderSection(green, 'green', 'On Track', false),
  ].join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Apify Monitor — ${esc(date)}</title>
<style>
/* 1. CSS Variables and Color Palette */
:root {
  --bg:           #080F1C;
  --surface:      #0E1826;
  --surface-2:    #162030;
  --surface-3:    #1C2A3E;
  --border:       rgba(148,180,220,.09);
  --border-md:    rgba(148,180,220,.15);

  --text:         #D8E8FF;
  --text-2:       #7A9EC0;
  --text-3:       #3D6080;

  --blue:         #4C8FFF;
  --teal:         #2DCBB0;
  --muted:        #4A6A8A;

  --green:        #00C48C;
  --green-dim:    rgba(0,196,140,.10);
  --green-border: rgba(0,196,140,.28);

  --red:          #F0556A;
  --red-dim:      rgba(240,85,106,.10);
  --red-border:   rgba(240,85,106,.28);

  --amber:        #F5A623;
  --amber-dim:    rgba(245,166,35,.10);
  --amber-border: rgba(245,166,35,.28);

  --pos: #00C48C;
  --neg: #F0556A;
  --warn: #F5A623;

  --radius: 8px;
  --mono: 'SF Mono','Cascadia Code','Fira Code','Consolas','Courier New',monospace;
}

/* 2. CSS Reset and Base Styles */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{
  font-family: -apple-system,'Segoe UI',BlinkMacSystemFont,system-ui,sans-serif;
  font-size:14px;line-height:1.6;
  color:var(--text);background:var(--bg);
  -webkit-font-smoothing:antialiased;
}
a{color:var(--blue);text-decoration:none;}
a:hover{text-decoration:underline;}

/* 3. Header Section */
.header{
  background: linear-gradient(160deg,#0A1628 0%,#0D1E38 100%);
  border-bottom: 1px solid var(--border-md);
  padding: 0;
}
.header-inner{
  max-width:1200px;margin:0 auto;
  padding:28px 32px 24px;
  display:flex;align-items:flex-end;gap:24px;
}
.header-left{ flex:1; }
.header-eyebrow{
  font-size:10px;font-weight:700;letter-spacing:2.5px;
  text-transform:uppercase;color:var(--blue);
  margin-bottom:6px;
}
.header-title{
  font-family: Georgia,'Times New Roman',serif;
  font-size:26px;font-weight:700;
  color:#EEF4FF;letter-spacing:-.3px;
  line-height:1.2;
}
.header-right{ text-align:right; }
.header-date{
  font-family: var(--mono);
  font-size:13px;color:var(--text-2);
  margin-bottom:4px;
}
.header-link{
  font-size:11px;color:var(--blue);
  display:inline-flex;align-items:center;gap:4px;
}

/* 4. Layout Container */
.wrap{max-width:1200px;margin:0 auto;padding:0 32px 64px;}

/* 5. Section Title Styling */
.blk-title{
  font-size:9.5px;font-weight:700;letter-spacing:2px;
  text-transform:uppercase;color:var(--text-3);
  margin:36px 0 14px;
  display:flex;align-items:center;gap:12px;
}
.blk-title::after{
  content:'';flex:1;height:1px;background:var(--border);
}

/* 6. Overview Metric Cards */
.cards{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:12px;
}
@media(max-width:860px){ .cards{grid-template-columns:repeat(2,1fr);} }

.card{
  background:var(--surface);
  border:1px solid var(--border);
  border-top: 2px solid var(--accent-c, var(--blue));
  border-radius:var(--radius);
  padding:16px 18px 14px;
  transition:border-color .2s;
}
.card:hover{ border-color:var(--border-md); }
.card-label{
  font-size:11px;font-weight:600;letter-spacing:1.2px;
  text-transform:uppercase;color:var(--text-3);
  margin-bottom:8px;
}
.card-value{
  font-family:var(--mono);
  font-size:28px;font-weight:700;
  color:#EEF4FF;line-height:1;
}
.card-sub{
  font-size:10px;color:var(--text-3);margin-top:6px;
}

/* 7. First-run Banner */
.first-run-banner{
  display:flex;align-items:flex-start;gap:16px;
  margin:24px 0 32px;
  padding:20px 24px;
  background:linear-gradient(135deg,rgba(76,143,255,.08) 0%,rgba(45,203,176,.05) 100%);
  border:1px solid rgba(76,143,255,.28);
  border-left:4px solid var(--blue);
  border-radius:var(--radius);
}
.frb-icon{font-size:28px;flex-shrink:0;line-height:1;margin-top:2px;}
.frb-title{
  font-size:15px;font-weight:700;color:#EEF4FF;
  margin-bottom:6px;
}
.frb-text{
  font-size:14px;line-height:1.7;color:var(--text-2);
}
.frb-text strong{color:var(--text);font-weight:600;}

/* 8. Tooltip Hover System */
[data-tip]{
  position:relative;cursor:help;
}
[data-tip]:hover::after{
  content:attr(data-tip);
  position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);
  background:#1A2944;color:var(--text-2);
  border:1px solid var(--border-md);
  border-radius:6px;padding:7px 11px;
  font-size:12px;font-weight:400;line-height:1.5;
  white-space:nowrap;z-index:100;
  font-family:-apple-system,'Segoe UI',sans-serif;
  pointer-events:none;
  box-shadow:0 4px 16px rgba(0,0,0,.4);
}
[data-tip]:hover::before{
  content:'';
  position:absolute;bottom:calc(100% + 1px);left:50%;transform:translateX(-50%);
  border:5px solid transparent;
  border-top-color:#1A2944;
  z-index:101;
  pointer-events:none;
}

/* 9. Status Summary Pills */
.status-row{
  display:flex;gap:10px;
  margin:20px 0 32px;
}
.stat-pill{
  display:flex;align-items:center;gap:8px;
  padding:8px 16px;
  border-radius:6px;
  border:1px solid var(--pill-border, var(--border));
  background:var(--pill-bg, var(--surface));
  font-size:12px;font-weight:600;color:var(--text-2);
}
.stat-pill .pill-num{
  font-family:var(--mono);font-size:18px;font-weight:700;
  color:var(--pill-color, var(--text));
  line-height:1;
}
.pill-red   { --pill-color:var(--red);  --pill-bg:var(--red-dim);  --pill-border:var(--red-border); }
.pill-amber { --pill-color:var(--amber);--pill-bg:var(--amber-dim);--pill-border:var(--amber-border);}
.pill-green { --pill-color:var(--green);--pill-bg:var(--green-dim);--pill-border:var(--green-border);}

/* 10. Status Indicator Dots */
.status-dot, .sec-dot{
  width:8px;height:8px;border-radius:50%;flex-shrink:0;
}
.dot-red    { background:var(--red);   box-shadow:0 0 6px var(--red);   }
.dot-yellow { background:var(--amber); box-shadow:0 0 6px var(--amber); }
.dot-green  { background:var(--green); box-shadow:0 0 6px var(--green); }

/* 11. Section Container */
.section{ margin-bottom:20px; }

.sec-hdr{
  display:flex;align-items:center;gap:10px;
  padding:11px 16px;
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:var(--radius) var(--radius) 0 0;
  cursor:pointer;user-select:none;
  transition:background .15s;
}
.sec-hdr:hover{ background:var(--surface-2); }
.sec-label{
  font-size:14px;font-weight:700;letter-spacing:.4px;
  color:var(--text);flex:1;
}
.sec-count{
  font-size:11px;color:var(--text-3);
  background:var(--surface-3);
  padding:2px 10px;border-radius:20px;
  font-family:var(--mono);
}
.sec-chev{
  width:16px;height:16px;color:var(--text-3);
  transition:transform .2s;flex-shrink:0;
}

.sec-body{
  border:1px solid var(--border);border-top:none;
  border-radius:0 0 var(--radius) var(--radius);
  overflow:hidden;
}

/* 12. Actor Row Styles */
.arow{
  border-left:3px solid transparent;
  border-bottom:1px solid var(--border);
  transition:background .12s;
}
.arow:last-child{ border-bottom:none; }
.arow[data-status="red"]    { border-left-color:var(--red);   }
.arow[data-status="yellow"] { border-left-color:var(--amber); }
.arow[data-status="green"]  { border-left-color:var(--green); }

.arow-hdr{
  display:flex;align-items:center;gap:12px;
  padding:12px 18px 12px 14px;
  cursor:pointer;user-select:none;
  background:var(--surface);
}
.arow-hdr:hover{ background:var(--surface-2); }

.aname{
  flex:1;font-size:15px;font-weight:600;color:var(--text);
  display:flex;align-items:center;gap:8px;
  min-width:0;
}
.aname-text{
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}

.asignal{
  font-family:var(--mono);font-size:12px;font-weight:600;
  white-space:nowrap;padding:2px 0;
}
.sig-red    { color:var(--red);   }
.sig-yellow { color:var(--amber); }
.sig-green  { color:var(--pos);   }

.chevron{
  width:16px;height:16px;color:var(--text-3);
  transition:transform .2s;flex-shrink:0;
}

/* 13. Status Badges */
.badge{
  font-size:9px;font-weight:800;letter-spacing:1px;
  padding:2px 6px;border-radius:3px;
  text-transform:uppercase;flex-shrink:0;
}
.badge-new { background:var(--green-dim);color:var(--green);border:1px solid var(--green-border); }
.badge-rm  { background:var(--red-dim);  color:var(--red);  border:1px solid var(--red-border);   }

/* 14. Section Information Block */
.sec-info{
  padding:14px 18px;
  background:var(--surface);
  border:1px solid var(--border);
  border-bottom:none;
  border-radius:var(--radius) var(--radius) 0 0;
  font-size:13px;line-height:1.6;
  color:var(--text-2);
}
.sec-info strong{
  color:var(--text);
  font-weight:600;
}

/* 15. Actor Detail Expandable Panel */
.adetail{
  display:none;
  padding:20px 20px 20px 20px;
  background:var(--bg);
  border-top:1px solid var(--border);
}
.detail-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(210px,1fr));
  gap:24px;
}
.dsec-head{
  font-size:9.5px;font-weight:700;letter-spacing:1.8px;
  text-transform:uppercase;color:var(--text-3);
  margin-bottom:12px;padding-bottom:8px;
  border-bottom:1px solid var(--border);
}
.drow{
  display:flex;justify-content:space-between;align-items:baseline;
  padding:5px 0;
  border-bottom:1px solid var(--border);
  font-size:14px;
}
.drow:last-child{ border-bottom:none; }
.drow > span:first-child{ color:var(--text-2); }
.dval{
  font-family:var(--mono);font-size:15px;font-weight:600;
  color:var(--text);text-align:right;
}
.dval.pos  { color:var(--pos);  }
.dval.neg  { color:var(--neg);  }
.dval.warn { color:var(--warn); }
.dval em{
  display:block;font-style:normal;
  font-size:12px;color:var(--text-2);font-weight:600;
  font-family:var(--mono);
}
</style>
</head>
<body>

<div class="header">
  <div class="header-inner">
    <div class="header-left">
      <div class="header-eyebrow">Apify Actor Monitor</div>
      <h1 class="header-title">Performance Report &mdash; ${esc(date)}</h1>
    </div>
    <div class="header-right">
      <div class="header-date">Generated ${esc(timeStr)} UTC</div>
      ${reportUrl ? `<a class="header-link" href="${esc(reportUrl)}">Open in browser <span>↗</span></a>` : ''}
    </div>
  </div>
</div>

<div class="wrap">

  <div class="blk-title">Account Overview</div>
  <div class="cards">${overviewCards}</div>

  ${firstRunBanner}

  <div class="status-row">
    <div class="stat-pill pill-red">
      <div class="pill-num">${red.length}</div>
      <div>Needs Attention</div>
    </div>
    <div class="stat-pill pill-amber">
      <div class="pill-num">${yellow.length}</div>
      <div>Watch Closely</div>
    </div>
    <div class="stat-pill pill-green">
      <div class="pill-num">${green.length}</div>
      <div>On Track</div>
    </div>
  </div>

  <div class="blk-title">Actor Breakdown</div>
  ${sections}

</div>

<script>
function toggleActor(id) {
  var el    = document.getElementById('d-' + id);
  var chev  = document.getElementById('chev-' + id);
  var open  = el.style.display === 'block';
  el.style.display  = open ? 'none' : 'block';
  chev.style.transform = open ? '' : 'rotate(180deg)';
}
function toggleSec(status) {
  var body = document.getElementById('sec-' + status);
  var chev = document.getElementById('sc-' + status);
  var open = body.style.display !== 'none';
  body.style.display   = open ? 'none' : '';
  chev.style.transform = open ? 'rotate(-90deg)' : '';
}
</script>
</body>
</html>`;
}
