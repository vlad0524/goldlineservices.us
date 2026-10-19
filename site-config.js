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
    appliances: { standard: 75,  emergency: 100 },
    hvac:       { standard: 75,  emergency: 100 },
    hvacCom:    { standard: 100, emergency: 150 },  // HVAC commercial
    pool:       { standard: 75,  emergency: 100 }
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

  /* 4) COMMERCIAL SERVICES: true = show commercial HVAC everywhere (menu, home page cards,
        booking form, footer, About, Contact). false = hide it everywhere. */
  const COMMERCIAL = false;

  /* 5) GOOGLE REVIEWS shown in the small badge on the service pages */
  const RATING = "5.0";            // average rating, e.g. "5.0" or "4.8"
  const REVIEW_COUNT = "22+";      // number of reviews, e.g. "21+" or "34"
  const REVIEWS_URL = "https://share.google/feIekBTpIm25aUQHO";   // where the badge links to

  /* 6) GOOGLE ADS CONVERSION: "Booking form" label from Google Ads. Fires after a form is sent.
        Leave "" to turn the conversion tracking off. */
  const ADS_CONVERSION = "AW-18441761320/xenoCN613KEdEKjk29lE";














  /* ---------------- do not edit below ---------------- */
  const fmt = p => `(${p.slice(0, 3)}) ${p.slice(3, 6)}-${p.slice(6)}`;
  const S = {
    phone: fmt(PHONE), phoneTel: "+1" + PHONE,
    sms: fmt(TEXT_PHONE), smsTel: "+1" + TEXT_PHONE,
    email: EMAIL, sheetsUrl: SHEETS_URL, fees: FEES, credit: CREDIT, commercial: COMMERCIAL
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
