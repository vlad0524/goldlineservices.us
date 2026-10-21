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

  /* 2b) SERVICES: THE ONE PLACE THAT CONTROLS THE WHOLE SITE  <<< -----------------------------------------------------------
         Everything below changes EVERYWHERE at once: the Services menu in the header (every page, desktop + phone), the cards
         on the home page and the equipment list in the booking form.

         SWITCHES
           group  show: false  = the whole group disappears (its menu column, home section, booking tile).
           item   show: false  = only that service disappears.     item  wide: true = big home card (2 per row), false = small (3 per row).
           The "commercial" group is OFF by default: change its show to true to switch commercial HVAC on everywhere.

         HOW TO ADD A NEW SERVICE (e.g. "Dishwasher")
           1. Copy any item block inside the right group, paste it under the last item of that group (do not forget the comma
              after the previous item), change the key (dishwasher), and change the texts.
           2. Create the page file (copy an existing service page, e.g. dryer-repair.html -> dishwasher-repair.html) and write
              the same file name in  page:  .
           Done: it shows up in the header menu on all pages, on the home page and in the booking form.
           (The footer links are hand-picked, so add a footer link manually only if you want one there.)

         HOW TO ADD A NEW GROUP: copy a whole group block (hvac / appliances / pool), change its key and texts, and give it
           fee: a key that exists in FEES and CREDIT below (e.g. "appliances"); icon: one of snow flame fridge washer oven drop bolt home tool cpu.

         ITEM FIELDS
           name  = name in the menu and on the home card      page = its page file     img = home card photo
           ask   = small question above the card title        text = card description
           formName / formText / icon = how it looks in the booking form
         GROUP FIELDS
           title = menu column title + card tag     heading = home page section title     suffix = added to card titles
           fee = price group (FEES)     mergeInto = show this group's items inside another group's booking tile */
  const SERVICES = {
    hvac: {
      show: true,
      title: "HVAC", heading: "Heating & Cooling Repair and Installation",
      fee: "hvac",
      icon: "snow", text: "Air conditioning, furnace, and heating", brand: false,   // booking form tile
      items: {
        airConditioner: { show: true, wide: true, name: "Air Conditioner", page: "air-conditioner-repair.html", img: "./hvac/ac-logo.jpg",
          ask: "AC not cooling?",
          text: "Restore strong cooling, steady airflow, and efficient performance all summer.",
          formName: "Air Conditioner", formText: "Not cooling, noisy, or leaking.", icon: "snow" },

        furnace: { show: true, wide: true, name: "Furnace", page: "furnace-repair.html", img: "./hvac/hvac-logo.jpg",
          ask: "No heat? We can fix it",
          text: "Get safe, consistent heat back with fast diagnostics and dependable repairs.",
          formName: "Furnace / Heating", formText: "No heat or uneven heating.", icon: "flame" },

        miniSplit: { show: false, wide: true, name: "Mini-Split Systems", page: "mini-split-repair.html", img: "./hvac/mini-split.jpg",
          ask: "Cooling several rooms without ducts?",
          text: "Ductless systems with one outdoor unit connected to one or more indoor units, professionally installed and serviced.",
          formName: "Mini-Split System", formText: "Ductless indoor or outdoor units.", icon: "snow" },

        packaged: { show: true, wide: true, name: "Packaged Units", page: "packaged-unit-repair.html", img: "./hvac/packaged-unit.jpg",
          ask: "Apartment or rooftop unit not working?",
          text: "Repair and installation of all-in-one heating and cooling units, from apartment closet models to rooftop systems.",
          formName: "Packaged Unit", formText: "All-in-one rooftop or closet units.", icon: "home" },

        wallUnit: { show: true, wide: true, name: "Through-the-Wall Units", page: "through-the-wall-repair.html", img: "./hvac/wall-unit.jpg",
          ask: "Need comfort in just one room?",
          text: "Professional installation and repair of compact through-the-wall units, for cooling only or cooling and heating.",
          formName: "Through-the-Wall Unit", formText: "Wall-mounted cooling and heating.", icon: "home" }
      }
    },
    commercial: {
      show: false,
      title: "Commercial", heading: "Commercial Air Conditioning & Heating",
      fee: "hvacCom",   mergeInto: "hvac",   // its items are listed inside the "hvac" tile of the booking form
      items: {
        commercialAc: { show: true, wide: true, name: "Commercial Air Conditioning", page: "commercial-ac-repair.html", img: "./hvac/",
          ask: "AC down at your business?",
          text: "Keep staff and customers comfortable with fast repairs and reliable installation of rooftop and cooling units.",
          formName: "Commercial Air Conditioner", formText: "Rooftop and commercial cooling systems.", icon: "snow" },

        commercialHeating: { show: true, wide: true, name: "Commercial Heating", page: "commercial-heating-repair.html", img: "./hvac/",
          ask: "No heat at your business?",
          text: "Get your space warm again with dependable repair and installation of furnaces and heating systems.",
          formName: "Commercial Furnace / Heating", formText: "Commercial heating systems.", icon: "flame" }
      }
    },
    appliances: {
      show: true,
      title: "Appliances", heading: "Appliance Repair", suffix: " Repair",
      fee: "appliances",
      icon: "fridge", text: "Refrigerator, washer, dryer, oven, and more", brand: true,   // booking form tile
      items: {
        refrigerator: { show: true, wide: false, name: "Refrigerator", page: "refrigerator-repair.html", img: "./appliance/refrigerator-lg.jpg",
          ask: "Not cooling or leaking?",
          text: "Get your fridge back to the right temperature and keep your groceries safe.",
          formName: "Refrigerator", formText: "Not cooling, leaking, or noisy.", icon: "fridge" },

        freezer: { show: true, wide: false, name: "Freezer", page: "freezer-repair.html", img: "./appliance/Sub-Zero-freezer.jpg",
          ask: "Frost buildup or warm freezer?",
          text: "Fix frost buildup, warm spots, and noisy cycles to protect your food.",
          formName: "Freezer", formText: "Warm, frosting up, or not running.", icon: "snow" },

        washer: { show: true, wide: false, name: "Washer", page: "washer-repair.html", img: "./appliance/washer-logo.jpg",
          ask: "Won't drain or spin?",
          text: "Fix water not draining, drum not spinning, or leaks and error codes.",
          formName: "Washer", formText: "Won't drain, spin, or fill.", icon: "washer" },

        dryer: { show: true, wide: false, name: "Dryer", page: "dryer-repair.html", img: "./appliance/Dryer-logo.jpg",
          ask: "Not heating or drying?",
          text: "Solve no-heat, long drying times, and a drum that won’t turn.",
          formName: "Dryer", formText: "Not heating or drying slowly.", icon: "washer" },

        ovenStove: { show: true, wide: false, name: "Oven & Stove", page: "oven-stove-repair.html", img: "./appliance/range-logo.jpg",
          ask: "Oven not heating evenly?",
          text: "Resolve heating, ignition, and temperature issues for consistent cooking.",
          formName: "Oven & Stove", formText: "Not heating or won't ignite.", icon: "oven" },

        cooktopRange: { show: true, wide: false, name: "Cooktop & Range", page: "cooktop-range-repair.html", img: "./appliance/cook-top-logo.jpg",
          ask: "Burner won't light?",
          text: "Repair burners, igniters, and controls on cooktops and ranges.",
          formName: "Cooktop & Range", formText: "Burners won't light or heat.", icon: "flame" }
      }
    },
    pool: {
      show: true,
      title: "Pool / Spa", heading: "Pool & Spa Repair & Installation",
      fee: "pool",
      icon: "drop", text: "Pump, filter, heater, salt cell, and more", brand: false,   // booking form tile
      items: {
        pump: { show: true, wide: false, name: "Pump", page: "pool-pump-repair.html", img: "./pool/",
          ask: "Noisy pump or low flow?",
          text: "Fix noise, loss of prime, and flow problems to keep water moving.",
          formName: "Pump", formText: "Noise, low flow, or loss of prime.", icon: "drop" },

        filter: { show: true, wide: false, name: "Filter", page: "pool-filter-repair.html", img: "./pool/",
          ask: "Cloudy water or high pressure?",
          text: "Restore filtration, pressure balance, and water clarity.",
          formName: "Filter", formText: "Cloudy water or high pressure.", icon: "drop" },

        saltCell: { show: true, wide: false, name: "Salt Cells", page: "pool-salt-cell-repair.html", img: "./pool/",
          ask: "Low chlorine or cell error?",
          text: "Inspect, clean, and replace salt cells to keep chlorine production steady.",
          formName: "Salt Cell", formText: "Low chlorine or cell errors.", icon: "bolt" },

        heater: { show: true, wide: false, name: "Heater", page: "pool-heater-repair.html", img: "./pool/",
          ask: "Pool heater not heating?",
          text: "Repair ignition, heating, and temperature control issues.",
          formName: "Heater", formText: "Water not heating.", icon: "flame" },

        plumbing: { show: true, wide: false, name: "Plumbing (Above Ground)", page: "pool-plumbing-repair.html", img: "./pool/",
          ask: "Leaks at pipes or valves?",
          text: "Fix leaks, valves, and fittings on above-ground pool and spa plumbing.",
          formName: "Plumbing (Above Ground)", formText: "Leaks at pipes or valves.", icon: "tool" },

        timers: { show: true, wide: false, name: "Timers & Smart Systems", page: "pool-timers-repair.html", img: "./pool/",
          ask: "Timer or automation issues?",
          text: "Set up and repair timers, automation, and smart controls.",
          formName: "Timers & Smart Systems", formText: "Automation or timer issues.", icon: "cpu" },

        electronics: { show: true, wide: false, name: "Electronics", page: "pool-electronics-repair.html", img: "./pool/",
          ask: "Control panel not responding?",
          text: "Diagnose control boards, panels, and electronic components.",
          formName: "Electronics", formText: "Control panels and boards.", icon: "cpu" }
      }
    }
  };



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
      latestEnd: 20,       // a regular window must END by this hour (20 = 8:00 PM). null = use "close" from hours above
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
      latestEnd: 21,       // an emergency window must END by this hour (21 = 9:00 PM). With evening visits ON, HVAC is cut at evening.from
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



  /* 4) COMMERCIAL: switched in SERVICES above (commercial: { show: true / false }). Nothing to set here. */
  const COMMERCIAL = SERVICES.commercial.show !== false && Object.keys(SERVICES.commercial.items).some(k => SERVICES.commercial.items[k].show !== false);

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
    email: EMAIL, sheetsUrl: SHEETS_URL, fees: FEES, credit: CREDIT, schedule: SCHEDULE, commercial: COMMERCIAL, services: SERVICES
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
  /* services helpers (used by the home page and the booking form) */
  const _gOn = g => { const G = SERVICES[g]; return !G || (G.show !== false && Object.keys(G.items).some(k => G.items[k].show !== false)); };
  S.groupOn = _gOn;
  S.serviceOn = (g, k) => { const G = SERVICES[g]; if (!G) return true; if (!_gOn(g)) return false; const i = G.items[k]; return !i || i.show !== false; };
  S.serviceWide = (g, k) => !!(SERVICES[g] && SERVICES[g].items[k] && SERVICES[g].items[k].wide);
  /* visible groups with their visible services (the home page, the booking form and the menus are all built from this) */
  S.groups = () => Object.keys(SERVICES).filter(_gOn).map(id => {
    const G = SERVICES[id];
    return Object.assign({ id: id }, G, { items: Object.keys(G.items).filter(k => G.items[k].show !== false).map(k => Object.assign({ k: k }, G.items[k])) });
  });
  const _esc = t => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  /* builds the Services menu (desktop + phone) from SERVICES on EVERY page */
  function renderMenu() {
    const g = S.groups(), mega = document.getElementById("mega"), mm = document.getElementById("mmenu");
    const links = G => G.items.map(i => `<a href="${_esc(i.page)}">${_esc(i.name)}</a>`).join("");
    if (mega) mega.innerHTML = g.map(G => `<div><h4>${_esc(G.title)}</h4>${links(G)}</div>`).join("");
    if (mm) mm.innerHTML = g.map(G => `<h4>${_esc(G.title)}</h4>${links(G)}`).join("");
  }
  document.addEventListener("click", e => {   /* menu links: close the phone menu / drop the focus of the desktop one */
    if (!e.target.closest) return;
    if (e.target.closest(".mobile a")) { const h = document.getElementById("header"); if (h) h.classList.remove("open"); }
    if (e.target.closest(".mega a") && document.activeElement) document.activeElement.blur();
  });
  /* footer links that point to a group anchor (index.html#hvac) are matched by their text */
  const FOOT = { "air conditioner repair": ["hvac", ["airConditioner"]], "furnace repair": ["hvac", ["furnace"]], "refrigerator repair": ["appliances", ["refrigerator"]], "washer & dryer repair": ["appliances", ["washer", "dryer"]], "oven & stove repair": ["appliances", ["ovenStove"]], "pool / spa repair": ["pool", []] };
  /* removes menu / footer links of switched-off services on EVERY page (the Services menu, phone menu, footer) */
  function hideOff() {
    const off = new Set(), groups = new Set();
    Object.keys(SERVICES).forEach(g => { if (!_gOn(g)) groups.add(g); Object.keys(SERVICES[g].items).forEach(k => { if (!S.serviceOn(g, k)) off.add(SERVICES[g].items[k].page); }); });
    document.querySelectorAll(".mega a, #mmenu a, footer a, #groups a").forEach(a => {
      const h = a.getAttribute("href") || "", m = h.match(/^(?:\.\/)?([\w-]+\.html)(?:[?#].*)?$/), t = h.match(/#(\w+)$/);
      let gone = !!((m && off.has(m[1])) || (t && groups.has(t[1])));
      const f = a.closest("footer") && FOOT[a.textContent.replace(/\s+/g, " ").trim().toLowerCase()];   /* footer service links are decided by their text */
      if (f) gone = !_gOn(f[0]) || (f[1].length > 0 && f[1].every(k => !S.serviceOn(f[0], k)));
      if (gone) (a.closest("li") || a).remove();
    });
    document.querySelectorAll("#mega > div").forEach(c => { if (!c.querySelector("a")) c.remove(); });
    const mm = document.getElementById("mmenu"); if (mm) mm.querySelectorAll("h4").forEach(h => { const n = h.nextElementSibling; if (!n || n.tagName !== "A") h.remove(); });
  }
  S.apply = walk; S.sub = sub;
  S.trackLead = function () { try { if (ADS_CONVERSION && typeof gtag === "function") gtag("event", "conversion", { send_to: ADS_CONVERSION }); } catch (e) { } };
  function start() {
    if (!COMMERCIAL) document.querySelectorAll("[data-commercial]").forEach(e => e.remove());
    const st = document.createElement("style"); st.textContent = ".mega .inner{grid-template-columns:none!important;grid-auto-flow:column;grid-auto-columns:1fr}"; document.head.appendChild(st);   /* any number of menu columns in one row */
    renderMenu();
    walk(document.body);
    hideOff();
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(x => { if (x.nodeType === 1 || x.nodeType === 3) walk(x.nodeType === 3 ? x.parentNode : x); }))).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
  return S;
})();
