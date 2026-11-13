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
        snowflake: '<path d="M12 2v20M3.3 7l17.4 10M20.7 7 3.3 17"/><path d="m9.2 4 2.8 2.2L14.8 4M9.2 20l2.8-2.2 2.8 2.2M3.6 11.4l3.5-.2-1.1-3.4M20.4 12.6l-3.5.2 1.1 3.4M3.6 12.6l3.5.2-1.1 3.4M20.4 11.4l-3.5-.2 1.1-3.4"/>',
        frost: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 6.5v11M7.1 9.2l9.8 5.6M16.9 9.2l-9.8 5.6"/>',
        cube: '<path d="M12 3 4 7.5v9l8 4.5 8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>',
        leak: '<path d="M12 2.5s4.5 4.4 4.5 7.6a4.5 4.5 0 0 1-9 0C7.5 6.9 12 2.5 12 2.5z"/><path d="M4 17.5c2.7 0 2.7 1.7 5.3 1.7s2.7-1.7 5.4-1.7 2.7 1.7 5.3 1.7M4 21.5c2.7 0 2.7-1.2 5.3-1.2s2.7 1.2 5.4 1.2"/>',
        fan: '<circle cx="12" cy="12" r="1.8"/><path d="M12 10.2C12 6 10 3 7.5 3.5 5 4 6 8 10.4 10.8M13.8 12c4.2 0 7.2-2 6.7-4.5C20 5 16 6 13.2 10.4M12 13.8c0 4.2 2 7.2 4.5 6.7C19 20 18 16 13.6 13.2M10.2 12C6 12 3 14 3.5 16.5 4 19 8 18 10.8 13.6"/>',
        power: '<path d="M12 3v8"/><path d="M6.3 6.8a8 8 0 1 0 11.4 0"/>',
        alert: '<path d="M12 3 2.5 20h19z"/><path d="M12 10v4.5M12 17.5h.01"/>',
        door: '<path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M3 21h18"/><path d="M15 12.5h.01"/>',
        cycle: '<path d="M20 8a8 8 0 0 0-14-2.5L4 8M4 3v5h5"/><path d="M4 16a8 8 0 0 0 14 2.5L20 16M20 21v-5h-5"/>',
        wind: '<path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8"/>',
        star: '<path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7.1L12 17.8 5.8 21.3l1.4-7.1L2 9.4l7-.8z"/>'
    };
    const PICK = [
        [/ice maker/i, 'cube'], [/not cooling|not freezing|cooling the building/i, 'snowflake'],
        [/error|blinking/i, 'alert'], [/compressor|condensing unit/i, 'cog'],
        [/warm|too hot|thaw/i, 'thermo'], [/frost|ice\b|icing|freez|defrost|frozen/i, 'frost'],
        [/won'?t (turn on|start|spin)|will not start|no power|trips|breaker|shuts? off|shutting off|gfci|blank display/i, 'power'],
        [/dispenser|chlorine|cloudy|filter|salt/i, 'drop'],
        [/leak|drain|pooling|water damage|won'?t fill|fills slowly|prime|runs dry/i, 'leak'],
        [/noise|loud|grinding|rattl|bang|shake|hiss|click|buzz|hum|vibration/i, 'volume'],
        [/airflow|returns|fan/i, 'fan'], [/door|gasket|seal|latch|hinge|closer|lock/i, 'door'],
        [/cycling|turns on and off|resets/i, 'cycle'], [/smell|odor/i, 'wind'],
        [/warm|temperature|too hot|overheat|thaw|uneven|reaching|hot and cold/i, 'thermo'],
        [/ignit|pilot|burner|flame|not heating|no heat|heat|burn|element|plates/i, 'flame'],
        [/control|panel|display|thermostat|sensor|remote|app\b|induction|drive|power supply|knobs/i, 'cpu'],
        [/pressure|flow/i, 'gauge'], [/valve|pipe|fitting|union|wiring|outdoor|rooftop|jammed|actuator/i, 'tool']
    ];
    const pickIc = (title, key) => { for (const [re, n] of PICK) if (re.test(title)) return n; return key; };
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
        `<a class="pcell" href="#quote" data-sym="${esc(p[1])}"><div class="ico">${ic(pickIc(p[1], p[0]))}</div><h3>${p[1]}</h3><p>${p[2]}</p><span class="go">Get it fixed ${ic('arrow')}</span></a>`).join('');
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

/* ---------- "Start with the symptom" diagnosis section (inserted after "What we repair") ---------- */
(function () {
    const slug = (location.pathname.split('/').pop() || '').replace('.html', '');
    const D = {
        'refrigerator-repair': ['Restore safe, steady cooling before food and time are lost.', 'We look at the whole appliance system (power, airflow, water, heat, controls and mechanical parts) and explain the evidence behind every recommendation.', 'For a separate upright or chest freezer, see our <a href="freezer-repair.html">freezer repair service</a>. For a refrigerator with a freezer compartment, choose refrigerator when booking and tell us which section is warming.', ['French-door', 'Side-by-side', 'Bottom freezer', 'Top freezer', 'Built-in']],
        'freezer-repair': ['Get your freezer back to temperature before the food is lost.', 'A freezer that runs but does not freeze can have a dozen causes. We test the fan, defrost system, sensors, compressor and controls in order, so you pay for the real fix and nothing else.', 'For a fridge with a freezer compartment see <a href="refrigerator-repair.html">refrigerator repair</a>. For restaurants and shops see our <a href="commercial-freezer-repair.html">commercial freezer repair</a>.', ['Upright', 'Chest', 'Garage', 'Frost-free', 'Basement']],
        'washer-repair': ['Get the laundry done without the flood, the noise or the error code.', 'We check the drain, water supply, door lock, motor, bearings and control board before replacing anything, and show you what failed.', 'Need a dryer looked at too? See <a href="dryer-repair.html">dryer repair</a>. We can also install a replacement washer if repair no longer makes sense.', ['Front-load', 'Top-load', 'Stackable', 'High-efficiency', 'Washer-dryer combo']],
        'dryer-repair': ['Dry clothes in one cycle again, safely.', 'We test heat, airflow, the drum drive, sensors and controls, and we check the vent path because a restricted vent is the most common hidden cause and a fire risk.', 'Washer trouble too? See <a href="washer-repair.html">washer repair</a>. Gas and electric dryers are both covered.', ['Gas', 'Electric', 'Stackable', 'Front-load', 'Ventless']],
        'oven-stove-repair': ['Accurate heat, reliable ignition, a safe kitchen.', 'We test igniters, elements, thermostats, sensors and control boards, and check gas connections on gas ranges before anything is replaced.', 'For glass-top and induction surfaces see <a href="cooktop-range-repair.html">cooktop and range repair</a>.', ['Gas ranges', 'Electric ranges', 'Wall ovens', 'Double ovens', 'Dual fuel']],
        'cooktop-range-repair': ['Every burner and zone heating the way it should.', 'We test the switches, elements, igniters and control boards zone by zone, so only the part that failed is replaced.', 'Oven problems? See <a href="oven-stove-repair.html">oven and stove repair</a>.', ['Gas cooktops', 'Electric coil', 'Glass-top', 'Induction', 'Slide-in ranges']],
        'garbage-disposal-repair': ['Stop the jam, the leak and the smell.', 'We check the motor, flywheel, seals, wiring and the drain connection, and tell you honestly whether a repair or a new unit is the better value.', 'We work on InSinkErator, Waste King, Moen and other brands.', ['Continuous feed', 'Batch feed', 'Under-sink units', 'Leaking seals', 'Replacement']],
        'commercial-refrigerator-repair': ['Keep product safe and your kitchen running.', 'We test the evaporator and condenser fans, defrost system, door seals, controls and sealed system on site, and we explain what each repair means for your downtime.', 'Need a walk-in? See <a href="commercial-walk-in-cooler-repair.html">walk-in cooler repair</a>. For frozen product see <a href="commercial-freezer-repair.html">commercial freezer repair</a>.', ['Side-door (reach-in)', 'Prep tables', 'Display coolers', 'Under-counter', 'Bar fridges']],
        'commercial-freezer-repair': ['Hold temperature, protect product, avoid a lost day of sales.', 'We trace the fault through the defrost cycle, fans, controls and compressor and tell you what is urgent and what can wait.', 'For walk-ins see <a href="commercial-walk-in-freezer-repair.html">walk-in freezer repair</a>.', ['Side-door (reach-in)', 'Display freezers', 'Under-counter', 'Ice cream cabinets', 'Chest freezers']],
        'commercial-walk-in-cooler-repair': ['A warm walk-in is a race against the clock.', 'We check the condensing unit, evaporator fans, door heater and closer, and refrigerant circuit, and we get you stable first, then fix the root cause.', 'We also service <a href="commercial-walk-in-freezer-repair.html">walk-in freezers</a>.', ['Indoor walk-ins', 'Outdoor walk-ins', 'Remote condensing', 'Door and gasket', 'Controllers']],
        'commercial-walk-in-freezer-repair': ['Heavy frost, warm product, a failing defrost: we sort it out.', 'We test the defrost heaters and termination, evaporator fans, door heaters, controls and compressor, then correct the cause so the ice does not come back.', 'We also service <a href="commercial-walk-in-cooler-repair.html">walk-in coolers</a>.', ['Indoor walk-ins', 'Outdoor walk-ins', 'Defrost system', 'Door heaters', 'Controllers']],
        'air-conditioner-repair': ['Strong cooling and steady airflow for the whole season.', 'We measure airflow, pressures, electrical load and the condensate path before recommending a repair, because a weak AC is often a symptom of something upstream.', 'For ductless systems see <a href="mini-split-repair.html">mini-split repair</a>. For a rooftop or all-in-one see <a href="packaged-unit-repair.html">packaged unit repair</a>.', ['Central AC', 'Split systems', 'Heat pumps', 'Condensers', 'Air handlers']],
        'furnace-repair': ['Reliable heat before the cold hits.', 'We check ignition, gas supply, flame sensing, the blower, limit switches and controls on gas furnaces, and elements, sequencers and blowers on electric furnaces.', 'Gas and electric furnaces are both repaired. For a rooftop heater see <a href="commercial-heating-repair.html">commercial heating repair</a>.', ['Gas furnaces', 'Electric furnaces', 'High-efficiency', 'Single-stage', 'Variable-speed']],
        'mini-split-repair': ['Quiet comfort for every room, working again.', 'We check the indoor unit, outdoor unit, refrigerant circuit, drain and communication wiring, since many errors come from one weak link.', 'For central systems see <a href="air-conditioner-repair.html">air conditioner repair</a>.', ['Single-zone', 'Multi-zone', 'Wall-mounted', 'Ceiling cassette', 'Heat pump']],
        'packaged-unit-repair': ['One cabinet, many parts: we find the one that failed.', 'We test the compressor, fans, heat section, controls and airflow in a packaged system and report what we found before work starts.', 'Residential or small commercial rooftops are both covered.', ['Rooftop packaged', 'Ground-level packaged', 'Gas/electric', 'Heat pump', 'Dual-fuel']],
        'through-the-wall-repair': ['Cooling and heating from the wall, back to normal.', 'We check the fan, compressor, thermostat, sleeve seal and drain, and tell you honestly if the unit is worth repairing.', 'For ductless systems see <a href="mini-split-repair.html">mini-split repair</a>.', ['PTAC units', 'Wall sleeve units', 'Cooling only', 'Heat pump', 'Electric heat']],
        'commercial-ac-repair': ['Rooftop and commercial cooling, fixed without a long shutdown.', 'Rooftop boxes may be AC only, heat only, or both. We repair the cooling side and, on combination units, the heating side too, so one visit covers the whole box.', 'For heat-only equipment see <a href="commercial-heating-repair.html">commercial furnaces and heating</a>.', ['Rooftop units', 'Split commercial', 'Packaged systems', 'Condensing units', 'Combination AC and heat']],
        'commercial-heating-repair': ['Commercial heat that keeps your building comfortable.', 'We repair gas and electric rooftop heat sections, unit heaters and commercial furnaces. If the box also cools, we handle that side too.', 'For cooling see <a href="commercial-ac-repair.html">commercial air conditioning</a>.', ['Rooftop heat', 'Unit heaters', 'Commercial furnaces', 'Gas heat', 'Combination AC and heat']],
        'pool-pump-repair': ['Flow, pressure and a quiet pump again.', 'We test the motor, capacitor, seals, impeller and priming path before replacing anything, and we tell you if the pump or only the motor needs to go.', 'Related: <a href="pool-filter-repair.html">filter repair</a> and <a href="pool-plumbing-repair.html">above-ground plumbing</a>.', ['Single-speed', 'Two-speed', 'Variable-speed', 'Pool pumps', 'Spa pumps']],
        'pool-filter-repair': ['Clear water starts with a filter that actually filters.', 'We inspect the tank, valves, laterals and media, and test pressure to find why water is cloudy or the filter needs constant backwashing.', 'Related: <a href="pool-pump-repair.html">pool pump repair</a>.', ['Sand', 'Cartridge', 'DE', 'Multiport valves', 'Spa filters']],
        'pool-heater-repair': ['Warm water, working ignition, safe operation.', 'We check ignition, flame sensing, pressure switches, heat exchangers and controls, and tell you what is repairable and what is end of life.', 'Related: <a href="pool-electronics-repair.html">pool electronics repair</a>.', ['Gas heaters', 'Electric heaters', 'Heat pumps', 'Spa heaters', 'Controls']],
        'pool-salt-cell-repair': ['Clean, balanced water from your salt system.', 'We test the cell, the power supply and the flow switch, and tell you whether cleaning, repair or replacement is the right call.', 'Related: <a href="pool-electronics-repair.html">pool electronics repair</a>.', ['Salt cells', 'Power supplies', 'Flow switches', 'Control boards', 'Cell cleaning']],
        'pool-plumbing-repair': ['Leaks, weak flow and stuck valves above the ground.', 'We pressure test and inspect valves, unions, fittings and pipe to find the exact leak, and repair above-ground plumbing without digging.', 'Related: <a href="pool-pump-repair.html">pool pump repair</a>.', ['Valves', 'Unions', 'Fittings', 'Check valves', 'Equipment pad piping']],
        'pool-electronics-repair': ['Controls and wiring that run your pool reliably.', 'We trace power and communication faults across the panel, boards, remotes and wiring, and replace only the failed component.', 'Related: <a href="pool-timers-repair.html">timers and smart systems</a>.', ['Control panels', 'Remotes', 'Automation', 'Power centers', 'Wiring']],
        'pool-timers-repair': ['Schedules, timers and smart systems that behave.', 'We check the timer, relay, wiring and app connection to see why equipment ignores its schedule or does not respond.', 'Related: <a href="pool-electronics-repair.html">pool electronics repair</a>.', ['Mechanical timers', 'Digital timers', 'Smart controllers', 'App control', 'Relays']]
    };
    const d = D[slug], pg = document.getElementById('problems');
    if (!d || !pg) return;
    const hero = document.querySelector('.hero-bg');
    const src = hero ? hero.getAttribute('src') : '';
    const sec = document.createElement('section');
    sec.className = 'sp-sec sp-diag'; sec.id = 'diagnosis';
    sec.innerHTML = '<div class="inner"><div class="dg-grid"><div class="dg-txt">' +
        '<div class="kicker"><span class="kn">02</span>Start with the symptom</div>' +
        '<h2>A precise diagnosis starts before a part is changed</h2>' +
        '<p class="dg-lead">' + d[0] + '</p><p>' + d[1] + '</p><p>' + d[2] + '</p>' +
        '<ul class="dg-list">' + d[3].map(t => '<li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>' + t + '</li>').join('') + '</ul></div>' +
        '<div class="dg-img"><span class="dg-badge"><i>'+'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></i><b>Diagnosis first</b><em>Exact price before any work</em></span><img class="dg-slide on" src="' + src + '" alt="" loading="lazy" onerror="this.onerror=null;this.src=\'./appliance/range-logo.jpg\'"></div></div></div>';
    pg.after(sec);
    /* extra photos (site-config.js -> DIAG_IMAGES) fade into each other */
    const cfg = (window.SITE && SITE.diagImages) || {};
    const extra = [].concat(cfg.all || [], cfg[slug] || []).filter(Boolean);
    if (extra.length) {
        const box = sec.querySelector('.dg-img');
        extra.forEach(u => { const im = document.createElement('img'); im.className = 'dg-slide'; im.alt = ''; im.loading = 'lazy'; im.src = u; im.onerror = () => im.remove(); box.appendChild(im); });
        let i = 0, timer = null, vis = true;
        const next = () => {
            const all = box.querySelectorAll('.dg-slide'); if (all.length < 2 || !vis || document.hidden) return;
            all[i % all.length].classList.remove('on'); i = (i + 1) % all.length; all[i].classList.add('on');
        };
        const start = () => { if (!timer) timer = setInterval(next, Math.max(2, (SITE.diagSeconds || 5)) * 1000); };
        if ('IntersectionObserver' in window) new IntersectionObserver(es => { vis = es[0].isIntersecting; }).observe(box);
        start();
    }
    document.querySelectorAll('.sp-sec .kicker .kn').forEach((k, i) => { k.textContent = String(i + 1).padStart(2, '0'); });
})();
