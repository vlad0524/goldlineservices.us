/* =====================================================================
   SERVICE PAGE ENGINE (shared by every *-repair.html page)
   Each page only defines  const PAGE = {...}  (its own texts). Everything else (layout logic,
   prices, credit, warranty, installation switch, form, FAQ, schema) is built here, from site-config.js.
   ===================================================================== */
(function () {
    const S = window.SITE, P = (typeof PAGE !== "undefined") ? PAGE : null;
    if (!S || !P) return;
    const $ = id => document.getElementById(id);
    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
    const money = n => '$' + Number(n);

    /* ---------- icons ---------- */
    const I = {
        pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
        bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
        shield: '<path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/>',
        check: '<path d="m5 12 5 5 9-10"/>',
        chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>',
        phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
        mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
        clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
        plus: '<path d="M12 5v14M5 12h14"/>',
        arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
        dollar: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9.2c-.4-.8-1.4-1.2-2.5-1.2-1.4 0-2.5.7-2.5 1.8 0 2.7 5 1.2 5 3.9 0 1.1-1.1 1.8-2.5 1.8-1.2 0-2.2-.5-2.6-1.3M12 6.5V8M12 16v1.5"/>',
        snow: '<path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5 4.9 17.5"/>',
        thermo: '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/>',
        drop: '<path d="M12 3s6 6.2 6 10.5A6 6 0 0 1 6 13.5C6 9.2 12 3 12 3z"/>',
        ice: '<path d="M6 3h12l2 5-8 13L4 8z"/><path d="M4 8h16"/>',
        volume: '<path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
        flame: '<path d="M12 2s5 4.5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.5 1 2 2 2 0-3-1-5 1-7z"/>',
        washer: '<rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="14" r="4.5"/><path d="M8 6h.01M11 6h.01"/>',
        oven: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M7 6h.01M11 6h.01"/><rect x="7" y="12" width="10" height="6" rx="1"/>',
        tool: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7V21h3.3l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
        gauge: '<path d="M3.3 17a9 9 0 1 1 17.4 0"/><path d="M12 14l4-4"/><path d="M12 14h.01"/>',
        wifi: '<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 20h.01"/>',
        bubbles: '<circle cx="8" cy="15" r="4"/><circle cx="16" cy="8" r="3"/><circle cx="17.5" cy="17" r="2"/>',
        fridge: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M5 10h14M9 6v1M9 14v3"/>',
        cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
        wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7V21h3.3l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
        cog: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
        box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
        star: '<path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7.1L12 17.8 5.8 21.3l1.4-7.1L2 9.4l7-.8z"/>'
    };
    const ic = n => `<svg viewBox="0 0 24 24" aria-hidden="true">${I[n] || I.tool}</svg>`;

    /* ---------- switches from site-config.js (SERVICES -> group -> item) ---------- */
    const grp = (S.services && S.services[P.group]) || {};
    const item = (grp.items && grp.items[P.item]) || {};
    const INSTALL = item.install === true;
    const MAINT = item.maintenance !== false;
    const F = S.fees[P.fee] || { standard: 0, emergency: 0 };
    const C = S.credit || {};
    const CREDIT_ON = !!(C.enabled && C[P.fee] != null);
    const noun = P.appliance, Noun = cap(P.appliance);
    const place = P.segment === 'Commercial' ? 'business' : 'home';

    const creditSentence = CREDIT_ON
        ? `If you approve the repair (jobs over ${money(C[P.fee])}), the ${money(F.standard)} is deducted from your total.`
        : '';

    /* ---------- hero: what we do chips ---------- */
    const chips = ['Repair'];
    if (MAINT) chips.push('Maintenance');
    chips.push(INSTALL ? 'Installation' : 'Parts replacement');
    $('offerChips').innerHTML = chips.map(c => `<li>${ic('check')}${c}</li>`).join('');

    /* ---------- problems ---------- */
    $('pgrid').innerHTML = P.problems.map(p =>
        `<a class="pcell" href="#quote" data-sym="${esc(p[1])}"><div class="ico">${ic(p[0])}</div><h3>${p[1]}</h3><p>${p[2]}</p><span class="go">Get it fixed ${ic('arrow')}</span></a>`).join('');
    document.querySelectorAll('[data-sym]').forEach(a => a.addEventListener('click', () => {
        const m = $('f-msg'); m.value = a.dataset.sym;
        setTimeout(() => $('f-name').focus({ preventScroll: true }), 500);
    }));

    /* ---------- what we do: repair / maintenance / installation (or parts) ---------- */
    const offer = [];
    offer.push({ ic: 'wrench', t: 'Repair', d: P.repairText || `We find the real cause on site and repair any fault on any ${noun}, all brands and models. You get the exact price before work begins.` });
    if (MAINT) offer.push({ ic: 'cog', t: 'Maintenance', d: P.maint });
    offer.push(INSTALL ? { ic: 'box', t: 'Installation', d: P.install, tag: 'New units' } : { ic: 'box', t: 'Parts replacement', d: P.parts });
    $('offergrid').innerHTML = offer.map(o =>
        `<div class="ocard"><div class="ico">${ic(o.ic)}</div><h3>${o.t}${o.tag ? `<em>${o.tag}</em>` : ''}</h3><p>${o.d}</p></div>`).join('');
    $('offergrid').dataset.n = offer.length;

    /* ---------- price card ---------- */
    const checks = [
        `Technician visit to your ${place}`,
        'Full diagnosis of the problem',
        'Exact repair price before any work begins'
    ];
    if (CREDIT_ON) checks.push(`<b>Approve the repair and the ${money(F.standard)} is deducted from your total</b> <small>(repairs over ${money(C[P.fee])})</small>`);
    checks.push(`<b>{{warranty}} warranty</b> on our work and on every part we install, replace or repair`);
    $('pfee').textContent = money(F.standard);
    $('pchecks').innerHTML = checks.map(c => `<li>${ic('check')}<span>${c}</span></li>`).join('');
    $('pcredit').innerHTML = CREDIT_ON ? `${ic('shield')}<span>Credited toward your repair</span>` : '';
    $('pcredit').style.display = CREDIT_ON ? '' : 'none';

    /* ---------- steps ---------- */
    const steps = [
        ['Call or book online', 'Tell us what is wrong. Same-day emergency visits are available.'],
        ['Confirm your arrival window', 'We agree on a time that works for you, and a technician comes to your ' + place + '.'],
        ['Diagnosis and exact price', 'We find the real cause and tell you the exact repair price before any work begins.'],
        ['Repair with a warranty', 'We repair it, test it, and cover the work and parts with a {{warranty}} warranty.']
    ];
    $('steps').innerHTML = steps.map((s, i) => `<li><span class="n">${i + 1}</span><div><h3>${s[0]}</h3><p>${s[1]}</p></div></li>`).join('');

    /* ---------- brands + cities ---------- */
    const bl = P.brands.map(b => `<div class="brand">${b}</div>`).join('');
    $('brandtrack').innerHTML = bl + bl;
    $('cities').innerHTML = S.cities.map(c => `<a class="chip" href="service-areas.html">${ic('pin')}${c}</a>`).join('') + `<a class="chip more" href="service-areas.html">All areas ${ic('arrow')}</a>`;

    /* ---------- FAQ ---------- */
    const faq = [];
    faq.push([`How much does ${noun} repair cost?`,
        `The diagnostic visit is ${money(F.standard)}. After the diagnosis we tell you the exact repair price before any work begins, because the final cost depends on the part and the problem. ${creditSentence}`.trim()]);
    (P.faq || []).forEach(q => faq.push(q));
    faq.push(['Do you offer a warranty?', 'Yes. Our work, and every part we install, replace or repair, is covered by a {{warranty}} warranty.']);
    faq.push(['When can you come?', "We're open Monday through Saturday, 8:00 AM to 9:00 PM. We're closed on Sundays, but emergency calls are available."]);
    $('faqlist').innerHTML = faq.map((q, i) => `<details class="f"${i ? '' : ' open'}><summary>${q[0]}<span class="pm">${ic('plus')}</span></summary><p>${q[1]}</p></details>`).join('');

    /* ---------- structured data (Service + FAQ) ---------- */
    try {
        const url = location.origin && location.origin !== 'null' ? location.origin + location.pathname : '';
        const ld = [{
            '@context': 'https://schema.org', '@type': 'Service', name: P.name + ' repair', serviceType: P.name + ' repair',
            areaServed: S.cities.map(c => ({ '@type': 'City', name: c + ', IL' })),
            provider: { '@type': 'HomeAndConstructionBusiness', name: 'Gold Line Services', telephone: S.phoneTel, url: location.origin }
        }, {
            '@context': 'https://schema.org', '@type': 'FAQPage',
            mainEntity: faq.map(q => ({ '@type': 'Question', name: S.sub(q[0]), acceptedAnswer: { '@type': 'Answer', text: S.sub(q[1]).replace(/<[^>]+>/g, '') } }))
        }];
        const sc = document.createElement('script'); sc.type = 'application/ld+json'; sc.textContent = JSON.stringify(ld); document.head.appendChild(sc);
    } catch (e) { }

    /* ---------- lead form (same fields and Google Sheet as before) ---------- */
    const FEEG = F, emBox = $('f-emg');
    $('emFee').textContent = money(FEEG.emergency); $('emReg').textContent = money(FEEG.standard);
    const pIn = $('f-phone'), zIn = $('f-zip');
    pIn.maxLength = 14;
    pIn.addEventListener('input', () => { const d = pIn.value.replace(/\D/g, '').slice(0, 10); pIn.value = d.length > 6 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : d.length > 3 ? `(${d.slice(0, 3)}) ${d.slice(3)}` : d; });
    zIn.addEventListener('input', () => { zIn.value = zIn.value.replace(/\D/g, '').slice(0, 5); });
    $('leadForm').addEventListener('submit', async e => {
        e.preventDefault();
        const f = e.target, msg = $('fmsg'), v = n => f.elements[n].value.trim();
        const fail = t => { msg.className = 'fmsg err'; msg.textContent = t; };
        msg.className = 'fmsg';
        if (v('company')) return;
        if (v('name').length < 2) return fail('Please enter your full name.');
        if (v('phone').replace(/\D/g, '').length < 10) return fail('Please enter a valid phone number.');
        if (!/^\d{5}$/.test(v('zip'))) return fail('Please enter a 5-digit ZIP code.');
        const data = { appliance: P.name, name: v('name'), phone: v('phone'), zip: v('zip'), message: v('message') };
        const btn = f.querySelector('button[type=submit]'), emg = emBox.checked;
        const payload = { source: P.name + ' page quick form', category: P.category, equipment: P.name, segment: P.segment || 'Residential', brand: '', diagnostic_fee: emg ? FEEG.emergency : FEEG.standard, standard_fee: FEEG.standard, emergency_fee: FEEG.emergency, problem: data.message, name: data.name, phone: data.phone, email: '', address: 'ZIP ' + data.zip, availability: '', emergency: emg };
        if (!S.sheetsUrl) { console.error('SHEETS_URL is empty: set it in site-config.js'); return fail('Online form is temporarily unavailable. Please call ' + S.phone + '.'); }
        btn.disabled = true;
        try {
            await fetch(S.sheetsUrl, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) });
            if (typeof gtag === 'function') gtag('event', 'generate_lead', { appliance: data.appliance });
            S.trackLead();   /* Google Ads "Booking form" conversion (now on EVERY service page) */
            f.reset(); msg.className = 'fmsg ok'; msg.textContent = 'Thank you! We received your request and will contact you shortly.';
        } catch (x) { fail('Something went wrong. Please call ' + S.phone + '.'); }
        btn.disabled = false;
    });

    /* ---------- mobile menu (animations live in fx.js) ---------- */
    const h = $('header'), b = $('burger');
    b.onclick = () => { const o = h.classList.toggle('open'); b.setAttribute('aria-expanded', o); };
    document.querySelectorAll('[data-ic]').forEach(e => { e.outerHTML = ic(e.dataset.ic); });
})();
