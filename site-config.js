/* =====================================================================
   GOLD LINE SERVICES - SITE SETTINGS (edit ONLY this file)
   Loaded by every page. Change a value here -> it changes everywhere.
   ===================================================================== */

window.SITE = (function () {

  /* 1) PHONE: type digits only, 10 digits. Everything else is automatic */
  const PHONE = "9299091265";      // main number: header, buttons, footer, links
  const TEXT_PHONE = "9299091266"; // number for "Text us"
  const EMAIL = "contact.goldlineservice@gmail.com";

  /* 2) GOOGLE SHEETS: paste your Apps Script Web App URL (ends with /exec) */
  const SHEETS_URL = "https://script.google.com/macros/s/AKfycbxv2qmR2L8RBleVGkWXBeFzdT4Xpaz9lK867NJ41aIjXoTXBxZ_PZqf4xq_RZu-iL47ng/exec";

  /* 3) DIAGNOSTIC FEES (USD): standard = normal visit, emergency = emergency visit */
  const FEES = {
    appliances: { standard: 79,  emergency: 150 },
    hvac:       { standard: 79,  emergency: 150 },
    hvacCom:    { standard: 100, emergency: 200 },  // HVAC commercial
    pool:       { standard: 79,  emergency: 150 }
  };

  /* 3b) DIAGNOSTIC CREDIT: the diagnostic fee is deducted from the repair if the customer approves it.
         Number = the repair must be OVER this amount (USD). Set it separately for each group.
         enabled: false  ->  hides all "credited toward your repair" texts in the booking form. */
  const CREDIT = {
    enabled: true,
    appliances: 200,
    hvac:       250,
    hvacCom:    300, // HVAC commercial
    pool:       250
  };



  /* 3c) BOOKING SCHEDULE (schedule-service page). <<< ------------------------------------------------------------------------------------
         Hours are 24h numbers: 8 = 8:00 AM, 17 = 5:00 PM, 19.5 = 7:30 PM, 22 = 10:00 PM.   true = yes / available, false = no.

         HOW A DAY WORKS (default settings):

           8:00 AM ───────────── NORMAL windows ─────────────► 7:00 PM (regular)  /  8:00 PM (emergency)
           a window must END by "latestEnd" and be at least "minWindow" long (3 h)
           latest START = latestEnd - minWindow  (regular 4:00 PM, emergency 5:00 PM)

         EVENING visits (HVAC only) are OFF by default (evening.enabled: false). When you turn them on (true):
           HVAC emergency normal windows end by 7:00 PM, and an extra choice appears in the From / To lists:
           "Evening: 7:00 PM – 10:00 PM" at the evening fee (a window must START at "evening.from" or later).

         "Today" closes by itself when the last window no longer fits: with the settings above emergency today closes at 5:00 PM
         (8 PM - 3 h), minus "leadMinutes". "sameDayUntil" can only stop it EARLIER, never later. */
  const SCHEDULE = {
    daysAhead: 14,       // how many days the calendar shows
    leadMinutes: 0,      // today: the earliest window may start this many minutes from now (0 = no buffer, 30 = at least 30 min from now)

    /* OUR WORKING HOURS per weekday: [open, close]. Windows start at "open" or later. A normal window ends by "close"
       or by latestEnd below (whichever is earlier). Evening windows ignore "close" (they use evening.until).
       null = we do not work that day at all. */
    hours: {
      mon: [8, 21], tue: [8, 21], wed: [8, 21], thu: [8, 21], fri: [8, 21], sat: [8, 21], sun: [8, 20]
    },

    /* HOLIDAYS: US federal holidays are added automatically (auto: true).
       add / remove = your own dates as "YYYY-MM-DD", e.g. add: ["2026-12-24"] */
    holidays: { auto: true, add: [], remove: [] },

    /* CLOSED DATES (vacation, etc.): one line per period, dates as "YYYY-MM-DD" (from = first day, to = last day; one day: same date in both).
       emergency: true  = regular visits are closed, but emergency visits are still accepted
       emergency: false = completely closed (no regular, no emergency)
       example:  { from: "2026-12-24", to: "2026-12-26", emergency: false }                                                       */
    closed: [
      // { from: "2026-12-24", to: "2026-12-26", emergency: false },
    ],

    /* ------------------------------------------------ REGULAR requests ---------------------------------------------------------------- */
    regular: {
      days: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: false },   // available for regular visits?
      holidays: false,     // holidays available for regular visits?
      startFromDay: 1,     // first bookable day: 0 = today, 1 = tomorrow (default: today is NOT offered), 2 = day after tomorrow ...
      sameDayUntil: null,  // only if startFromDay is 0. null = automatic. A number = stop taking today at this hour (14 = 2:00 PM)
      latestEnd: 19,       // a regular window must END by this hour (19 = 7:00 PM). null = use "close" from hours above
      minWindow: 3,        // shortest arrival window the customer may pick, in HOURS
      minDays: 2           // the customer must choose at least this many days (1 = one day is enough)
    },

    /* ---------------------------------------- EMERGENCY requests (own settings) --------------------------------------------------------- */
    emergency: {
      enabled: true,       // false = NO emergency option at all (the Emergency checkbox is hidden everywhere)
      days: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: true },    // do we work these days for emergency?
      holidays: true,      // do we work holidays for emergency?
      daysAhead: 2,        // 2 = today + tomorrow. Days further out are offered ONLY if regular visits are not available that day
                           //     (for example Sundays and holidays). 14 = every day of the calendar.
      sameDayUntil: null,  // normal emergency windows today: null = automatic, a number = stop at this hour (15 = 3:00 PM)
      latestEnd: 21,       // an emergency window must END by this hour (20 = 8:00 PM). With evening visits ON, HVAC is cut at evening.from
      minWindow: 3,        // shortest arrival window, in HOURS
      minDays: 1,          // the customer must choose at least this many days

      /* EVENING visits (OFF by default): only with Emergency checked, only for equipment that has a fee below (HVAC). A window that STARTS at "from"
         or later costs the evening fee. Windows that start earlier are normal windows and must end by "from". */
      evening: {
        enabled: false,    // true = turn evening visits ON (HVAC only). false = OFF (default)
        from: 19,          // evening windows START at this hour or later (19 = 7:00 PM)
        until: 22,         // an evening window must END by this hour (22 = 10:00 PM)
        minWindow: 3,      // shortest evening window, in HOURS (from 19 + until 22 + 3 h = exactly 7-10 PM; 2 h would also allow 7-9, 7:30-9:30, 8-10 PM)
        sameDayUntil: null, // evening windows today: null = automatic (closes by itself), a number = stop at this hour (17 = 5:00 PM)
        otherDays: true,   // true = evening also on tomorrow / Sundays / holidays; false = today only
        fees: { hvac: 200, hvacCom: 250, appliances: null, pool: null }   // evening fee per equipment group, null = no evening visits for it
      }
    }
  };



  /* 4) COMMERCIAL SERVICES: true = show commercial HVAC everywhere (menu, home page cards,
        booking form, footer, About, Contact). false = hide it everywhere. */
  const COMMERCIAL = false;

  /* 5) GOOGLE REVIEWS shown in the small badge on the service pages */
  const RATING = "5.0";            // average rating, e.g. "5.0" or "4.8"
  const REVIEW_COUNT = "25+";      // number of reviews, e.g. "21+" or "34"
  const REVIEWS_URL = "https://share.google/feIekBTpIm25aUQHO";   // where the badge links to

  /* 6) GOOGLE ADS CONVERSION: "Booking form" label from Google Ads. Fires after a form is sent.
        Leave "" to turn the conversion tracking off. */
  const ADS_CONVERSION = "AW-18441761320/xenoCN613KEdEKjk29lE";














  /* ---------------- do not edit below ---------------- */
  const fmt = p => `(${p.slice(0, 3)}) ${p.slice(3, 6)}-${p.slice(6)}`;
  const S = {
    phone: fmt(PHONE), phoneTel: "+1" + PHONE,
    sms: fmt(TEXT_PHONE), smsTel: "+1" + TEXT_PHONE,
    email: EMAIL, sheetsUrl: SHEETS_URL, fees: FEES, credit: CREDIT, schedule: SCHEDULE, commercial: COMMERCIAL
  };
  const MAP = { "{{rating}}": RATING, "{{reviewCount}}": REVIEW_COUNT, "{{reviewsUrl}}": REVIEWS_URL, "{{phone}}": S.phone, "{{phoneTel}}": S.phoneTel, "{{sms}}": S.sms, "{{smsTel}}": S.smsTel, "{{email}}": S.email };
  /* fee tokens: {{feeAppliances}} = standard, {{feeAppliancesEm}} = emergency (also Hvac, HvacCom, Pool) */
  Object.keys(FEES).forEach(k => { const K = k[0].toUpperCase() + k.slice(1); MAP["{{fee" + K + "}}"] = "$" + FEES[k].standard; MAP["{{fee" + K + "Em}}"] = "$" + FEES[k].emergency; });
  /* credit tokens: {{creditAppliances}}, {{creditHvac}}, {{creditHvacCom}}, {{creditPool}} = minimum repair amount */
  Object.keys(FEES).forEach(k => { const K = k[0].toUpperCase() + k.slice(1); MAP["{{credit" + K + "}}"] = "$" + CREDIT[k]; });
  const re = /\{\{\w+\}\}/g;
  const sub = s => s.replace(re, m => (m in MAP ? MAP[m] : m));
  function walk(root) {
    if (!root) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n; while ((n = w.nextNode())) if (n.nodeValue.indexOf("{{") > -1 && !/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName)) n.nodeValue = sub(n.nodeValue);
    const els = root.nodeType === 1 ? [root, ...root.querySelectorAll("*")] : [...root.querySelectorAll("*")];
    els.forEach(e => { if (e.nodeName === "SCRIPT" || e.nodeName === "STYLE") return; for (const a of e.attributes) if (a.value.indexOf("{{") > -1) e.setAttribute(a.name, sub(a.value)); });
  }
  /* holidays helper (used by the booking page) */
  const _hol = {};
  const _p2 = n => String(n).padStart(2, "0");
  const _iso = d => d.getFullYear() + "-" + _p2(d.getMonth() + 1) + "-" + _p2(d.getDate());
  function usHolidays(y) {
    const nth = (m, wd, n) => { const d = new Date(y, m, 1); let c = 0; for (;;) { if (d.getDay() === wd && ++c === n) return d; d.setDate(d.getDate() + 1); } };
    const last = (m, wd) => { const d = new Date(y, m + 1, 0); while (d.getDay() !== wd) d.setDate(d.getDate() - 1); return d; };
    return [new Date(y, 0, 1), nth(0, 1, 3), nth(1, 1, 3), last(4, 1), new Date(y, 5, 19), new Date(y, 6, 4), nth(8, 1, 1), nth(9, 1, 2), new Date(y, 10, 11), nth(10, 4, 4), new Date(y, 11, 25)].map(_iso);
  }
  S.isHoliday = function (k) {
    const H = SCHEDULE.holidays || {};
    if ((H.remove || []).indexOf(k) > -1) return false;
    if ((H.add || []).indexOf(k) > -1) return true;
    if (H.auto === false) return false;
    const y = +k.slice(0, 4); if (!_hol[y]) _hol[y] = usHolidays(y);
    return _hol[y].indexOf(k) > -1;
  };
  S.closure = function (k) { return (SCHEDULE.closed || []).find(r => k >= r.from && k <= (r.to || r.from)) || null; };
  S.apply = walk; S.sub = sub;
  S.trackLead = function () { try { if (ADS_CONVERSION && typeof gtag === "function") gtag("event", "conversion", { send_to: ADS_CONVERSION }); } catch (e) { } };
  function start() {
    if (!COMMERCIAL) document.querySelectorAll("[data-commercial]").forEach(e => e.remove());
    if (COMMERCIAL) { const st = document.createElement("style"); st.textContent = ".mega .inner{grid-template-columns:none!important;grid-auto-flow:column;grid-auto-columns:1fr}"; document.head.appendChild(st); }   /* 4 menu columns in one row */
    walk(document.body);
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(x => { if (x.nodeType === 1 || x.nodeType === 3) walk(x.nodeType === 3 ? x.parentNode : x); }))).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
  return S;
})();
