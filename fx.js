/* =====================================================================
   FX: animations for the whole site (loaded automatically by site-config.js)
   Light on purpose: only transform / opacity, one rAF-throttled scroll handler,
   animations of sections that are off-screen are paused. Respects "reduce motion".
   ===================================================================== */
(function () {
    if (window.__fx) return; window.__fx = 1;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $$ = s => [...document.querySelectorAll(s)];

    /* scroll progress bar + header shadow (one rAF per frame, no layout reads while scrolling) */
    const bar = document.createElement('div'); bar.id = 'fxbar'; document.body.appendChild(bar);
    const hdr = document.getElementById('header');
    let max = 1, tick = false, lastY = -1;
    const measure = () => { const h = document.documentElement; max = Math.max(1, h.scrollHeight - h.clientHeight); };
    const paint = () => {
        tick = false; const y = window.scrollY || document.documentElement.scrollTop; if (y === lastY) return; lastY = y;
        bar.style.transform = 'scaleX(' + Math.min(1, y / max).toFixed(4) + ')';
        if (hdr) hdr.classList.toggle('scrolled', y > 10);
    };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(paint); } }, { passive: true });
    addEventListener('resize', measure, { passive: true }); addEventListener('load', () => { measure(); paint(); });
    measure(); paint(); setTimeout(measure, 1500);

    if (reduce) { document.documentElement.classList.add('no-fx'); return; }

    /* pause looping animations of everything that is off-screen */
    const vis = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('off', !e.isIntersecting)), { rootMargin: '120px 0px' });
    $$('section, footer, .features').forEach(el => vis.observe(el));

    /* floating glow orbs (loop) in hero + dark sections */
    ['.sp-dark', '.sp-areas', 'section.dark:not(.foot)', '.sp-cta .cta-card'].forEach(sel => $$(sel).forEach(host => {
        if (host.querySelector(':scope>.fxorb')) return;
        host.classList.add('fx-host');
        host.insertAdjacentHTML('afterbegin', '<span class="fxorb fa" aria-hidden="true"></span><span class="fxorb fb" aria-hidden="true"></span>');
    }));


    /* hero waves (about / contact / service areas / legal): smooth lines + small glowing dots, loop */
    $$('.about-hero, .legal-hero').forEach(host => {
        if (host.querySelector(':scope>.hwaves')) return;
        const W = 1440, mk = (base, a1, a2, ph, cls) => { let d = ''; for (let x = 0; x <= 2 * W; x += 30) { const y = base + a1 * Math.sin(2 * Math.PI * x / W + ph) + a2 * Math.sin(4 * Math.PI * x / W + ph * 2); d += (x ? 'L' : 'M') + x + ' ' + y.toFixed(1) } return '<path class="' + cls + '" d="' + d + '"/>' };
        let dots = ''; [[8,18,5,0],[18,70,3,1.4],[30,36,4,.6],[42,82,6,2.2],[55,24,3,3],[63,60,5,.9],[74,40,4,2.6],[84,78,3,1.8],[92,22,6,.3]].forEach(p => { dots += '<i style="left:' + p[0] + '%;top:' + p[1] + '%;width:' + p[2] + 'px;height:' + p[2] + 'px;animation-delay:-' + p[3] + 's"></i>' });
        const svg = (cls, p) => '<svg class="' + cls + '" viewBox="0 0 ' + 2 * W + ' 400" preserveAspectRatio="none" aria-hidden="true">' + p + '</svg>';
        host.insertAdjacentHTML('afterbegin', '<div class="hwaves" aria-hidden="true">' + svg('w1', mk(130, 26, 8, 0, '')) + svg('w2', mk(215, 34, 10, 1.7, '')) + svg('w3', mk(305, 22, 12, 3.4, '')) + dots + '</div>');
    });

    /* reveal on scroll: [selector, stagger ms, keep class, direction] */
    const R = [
        ['.sp-head, .sec-head', 0, 'keep'], ['.sp-sec .pcell', 55], ['.ocard', 130], ['.pr', 90], ['.chip', 40],
        ['.features .feat', 90], ['.f', 60], ['.group-title', 0], ['.grid2>.card, .grid3>.card', 90],
        ['.why-card', 80], ['.do-card', 100], ['.do-note', 0], ['.c-item', 70], ['.c-form', 0], ['.c-left>*', 60],
        ['.dir .inner>*:not(.cities):not(.none)', 60], ['.cov-wrap>div', 120], ['.city-list', 0, '', 'fx-r'], ['.areas-wrap>div:first-child', 0, '', 'fx-l'],
        ['.faq-wrap>div:first-child', 0, '', 'fx-l'], ['.sp-price .price-card', 0, '', 'fx-r'], ['.sp-areas .row>div:first-child', 0, '', 'fx-l'],
        ['.sp-brands .marq', 0], ['.sp .pnote', 0], ['.cta-card', 0], ['.legal-card', 0], ['.foot-grid>div', 90]
    ];
    const clean = el => { el.classList.remove('fx', 'fx-l', 'fx-r', 'fx-z', 'in'); el.style.removeProperty('--d'); };
    const io = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target; io.unobserve(el);
        requestAnimationFrame(() => {
            el.classList.add('in');
            if (el.dataset.keep) return;
            const done = () => { clean(el); };
            el.addEventListener('transitionend', ev => { if (ev.target === el && ev.propertyName === 'transform') done(); }, { once: true });
            setTimeout(() => { if (el.classList.contains('fx')) done(); }, 2600);   /* safety */
        });
    }), { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    R.forEach(([sel, step, keep, dir]) => $$(sel).forEach(el => {
        if (el.classList.contains('fx') || el.closest('.hero')) return;
        const rc = el.getBoundingClientRect(); if (rc.top < innerHeight * 0.85 && rc.bottom > 0) return;   /* already on screen at load: no hide-then-show flash */
        const idx = [...el.parentElement.children].indexOf(el);
        el.style.setProperty('--d', Math.min(idx, 7) * step + 'ms');
        el.classList.add('fx'); if (dir) el.classList.add(dir); if (keep) el.dataset.keep = '1';
        io.observe(el);
    }));

    /* steps timeline */
    $$('.sp-steps').forEach(ol => {
        [...ol.children].forEach((li, i) => { li.style.setProperty('--d', (i * 0.45) + 's'); li.style.setProperty('--ld', (i * 0.45 + 0.3) + 's'); });
        const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { ol.classList.add('go'); o.disconnect(); } }), { threshold: 0.25 });
        o.observe(ol);
    });

    /* price count-up */
    const pf = document.getElementById('pfee');
    if (pf) {
        const target = parseFloat(pf.textContent.replace(/[^0-9.]/g, ''));
        if (target) {
            pf.textContent = '$0'; setTimeout(() => { if (pf.textContent === '$0') pf.textContent = '$' + target; }, 12000);
            const o = new IntersectionObserver(es => es.forEach(e => {
                if (!e.isIntersecting) return; o.disconnect();
                const t0 = performance.now(), D = 1300;
                (function step(t) { const p = Math.min(1, (t - t0) / D); pf.textContent = '$' + Math.round(target * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); })(t0);
            }), { threshold: 0.4 });
            o.observe(pf);
        }
    }

    /* soft spotlight following the cursor (one rAF per frame) */
    let px = 0, py = 0, pc = null, ptick = false;
    document.addEventListener('pointermove', e => {
        const c = e.target.closest && e.target.closest('.pcell, .ocard'); if (!c) return;
        pc = c; px = e.clientX; py = e.clientY;
        if (!ptick) { ptick = true; requestAnimationFrame(() => { ptick = false; const r = pc.getBoundingClientRect(); pc.style.setProperty('--mx', (px - r.left) + 'px'); pc.style.setProperty('--my', (py - r.top) + 'px'); }); }
    }, { passive: true });
})();
