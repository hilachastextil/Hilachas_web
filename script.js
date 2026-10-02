/* ===== HILACHAS — Interaction Script ===== */
(function () {
  'use strict';

  // ----- HEADER scroll state -----
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Active section in nav -----
  const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
  const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const setActiveLink = () => {
    const y = window.scrollY + 120;
    let current = null;
    sections.forEach(s => { if (s.offsetTop <= y) current = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  };
  window.addEventListener('scroll', setActiveLink, { passive: true });

  // ----- Mobile menu -----
  const toggle = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');
  toggle.addEventListener('click', () => {
    const open = navList.classList.toggle('active');
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', open);
  });
  navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navList.classList.remove('active');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', false);
  }));

  // ----- Smooth scroll (with offset already in CSS) -----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const off = window.matchMedia('(max-width: 968px)').matches ? 96 : (window.scrollY > 24 ? 76 : 96);
      window.scrollTo({ top: target.offsetTop - off, behavior: 'smooth' });
    });
  });

  // ----- Reveal on scroll -----
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ----- Stat counter -----
  const statIo = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = parseInt(el.dataset.target, 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const dur = 1400;
      const tick = now => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = prefix + Math.floor(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + target + suffix;
      };
      requestAnimationFrame(tick);
      statIo.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.stat-item h3[data-target]').forEach(el => statIo.observe(el));

  // ===== SPEC SHEETS =====
  const SPECS = {
    // ── JERSEY ──
    jersey: {
      name: 'Jersey Peinado',
      desc: 'Tejido de punto liso, ligero y de excelente caída. La base más versátil del catálogo.',
      variantTable: {
        headers: ['Título', 'Composición', 'Rinde (m/kg)', 'Ancho'],
        rows: [
          ['20/1', 'Algodón 100%', '3,10', '0,90 m'],
          ['24/1', 'Algodón 100%', '3,30', '0,90 m'],
          ['30/1', 'Algodón 100%', '3,80', '0,90 m'],
        ],
      },
      table: [
        ['Estructura', 'Punto jersey simple (single)'],
        ['Encogimiento', '< 5% en lavado a 30°C'],
        ['Solidez color', '4/5 (escala gris)'],
      ],
      uses: ['Remeras', 'Vestidos', 'Pijamas', 'Bebés', 'Ropa interior'],
    },
    'jersey-cardado': {
      name: 'Jersey Cardado',
      desc: 'Tejido de punto cardado, con mayor suavidad y calidez al tacto que el peinado.',
      table: [
        ['Estructura', 'Punto jersey simple (single)'],
        ['Gramaje', '160–200 g/m²'],
        ['Títulos', '24/1 · 30/1 (cardado)'],
        ['Composición', '100% algodón cardado'],
        ['Ancho', '1,80 m tubular'],
        ['Encogimiento', '< 6% en lavado a 30°C'],
        ['Solidez color', '4/5 (escala gris)'],
      ],
      uses: ['Remeras invierno', 'Ropa interior', 'Pijamas', 'Segunda piel'],
    },
    'jersey-lycra': {
      name: 'Jersey con Lycra',
      desc: 'Tejido de punto con lycra. Elasticidad superior y recupero de forma para prendas ajustadas.',
      table: [
        ['Estructura', 'Punto jersey con lycra'],
        ['Gramaje', '150–185 g/m²'],
        ['Títulos', '24/1 · 30/1'],
        ['Composición', '95% algodón / 5% lycra'],
        ['Ancho', '1,80 m tubular'],
        ['Recupero', '> 90% post-estiramiento'],
        ['Solidez color', '4/5 (escala gris)'],
      ],
      uses: ['Bodies', 'Ropa interior', 'Remeras ajustadas', 'Calzas', 'Tops'],
    },
    deportivo: {
      name: 'Deportivo',
      desc: 'Tejido técnico ligero y transpirable para indumentaria deportiva y activewear.',
      table: [
        ['Estructura', 'Punto jersey técnico'],
        ['Gramaje', '130–160 g/m²'],
        ['Títulos', '24/1 · 30/1'],
        ['Composición', '100% poliéster · CO/PES'],
        ['Ancho', '1,80 m tubular'],
        ['Transpirabilidad', 'Alta (moisture-wicking)'],
        ['Solidez color', '4/5 (escala gris)'],
      ],
      uses: ['Remeras deportivas', 'Polos', 'Tops activewear', 'Musculosas'],
    },
    // ── RÚSTICO ──
    rustico: {
      name: 'Rústico Invisible Peinado',
      desc: 'French terry peinado con interior en rústico. Ideal para media estación.',
      table: [
        ['Artículo', '2026'],
        ['Composición', '88% Alg / 12% Pol'],
        ['Ancho', '0,95 m'],
        ['Acabado', 'Interior en Rústico'],
        ['Rinde', '1,75 m/kg'],
      ],
      uses: ['Buzos canguro', 'Joggers', 'Vestidos deportivos', 'Sweat-dresses'],
    },
    'rustico-cardado': {
      name: 'Rústico Invisible Cardado',
      desc: 'French terry cardado con interior en rústico. Mayor suavidad y cuerpo.',
      table: [
        ['Artículo', '2013'],
        ['Composición', '88% Alg / 12% Pol'],
        ['Ancho', '0,95 m'],
        ['Acabado', 'Interior en Rústico'],
        ['Rinde', '1,75 m/kg'],
      ],
      uses: ['Buzos de abrigo', 'Joggers invierno', 'Camperas liviana', 'Outerwear'],
    },
    'rustico-comun': {
      name: 'Rústico Común',
      desc: 'French terry de algodón 100% con interior en rústico. Transpirable y versátil para entretiempo.',
      table: [
        ['Artículo', '2022'],
        ['Composición', 'Algodón 100%'],
        ['Ancho', '0,95 m'],
        ['Acabado', 'Interior en Rústico'],
        ['Rinde', '2,30 m/kg'],
      ],
      uses: ['Buzos primavera', 'Joggers entretiempo', 'Vestidos casual', 'Shorts'],
    },
    'rustico-leila': {
      name: 'Rústico Leila Elastizado',
      desc: 'Rústico elastizado con interior en rústico. Caída fluida y mayor movimiento.',
      table: [
        ['Artículo', '2032'],
        ['Composición', '88% Alg / 12% Pol'],
        ['Ancho', '0,95 m'],
        ['Acabado', 'Interior en Rústico'],
        ['Rinde', '2,30 m/kg'],
      ],
      uses: ['Buzos elastizados', 'Joggers', 'Vestidos deportivos', 'Outerwear'],
    },
    // ── FRISA ──
    frisa: {
      name: 'Frisa Invisible Peinada',
      desc: 'Tejido perchado de alto gramaje con interior afelpado. Diseñado para abrigo y durabilidad.',
      table: [
        ['Estructura', 'Felpa francesa con perchado interior'],
        ['Gramaje', '280–340 g/m²'],
        ['Títulos', '24/1 (cara) · 12/1 (rizo/percha)'],
        ['Composición', '88% algodón / 12% poly'],
        ['Ancho', '0,90 m / rinde 1,80 m'],
        ['Encogimiento', '< 6% en lavado a 30°C'],
        ['Solidez color', '4/5'],
      ],
      uses: ['Buzos', 'Camperas', 'Joggers de invierno', 'Capuchas'],
    },
    'frisa-cardada': {
      name: 'Frisa Invisible Cardada',
      desc: 'Frisa de proceso cardado con interior más suave y voluminoso. Máximo abrigo.',
      table: [
        ['Estructura', 'Felpa francesa cardada, perchado dos caras'],
        ['Gramaje', '300–360 g/m²'],
        ['Títulos', '24/1 (cara) · 12/1 (percha)'],
        ['Composición', '88% algodón / 12% poly'],
        ['Ancho', '0,90 m / rinde 1,80 m'],
        ['Encogimiento', '< 7% en lavado a 30°C'],
        ['Solidez color', '4/5'],
      ],
      uses: ['Buzos de abrigo máximo', 'Camperas invierno', 'Joggers premium'],
    },
    'frisa-algodon': {
      name: 'Frisa Algodón 100%',
      desc: 'Frisa sin poliéster. Máxima transpirabilidad y suavidad natural.',
      table: [
        ['Estructura', 'Felpa francesa, perchado interior'],
        ['Gramaje', '270–320 g/m²'],
        ['Títulos', '24/1 (cara) · 12/1 (rizo/percha)'],
        ['Composición', '100% algodón'],
        ['Ancho', '0,90 m / rinde 1,80 m'],
        ['Encogimiento', '< 6% en lavado a 30°C'],
        ['Solidez color', '4/5'],
      ],
      uses: ['Buzos eco', 'Prendas naturales', 'Marcas sustentables', 'Bebés'],
    },
    'frisa-liviana': {
      name: 'Frisa Liviana',
      desc: 'Frisa de menor gramaje para entretiempo. Abriga sin pesar.',
      table: [
        ['Estructura', 'Felpa francesa liviana, perchado interior'],
        ['Gramaje', '220–260 g/m²'],
        ['Títulos', '24/1 (cara) · 12/1 (rizo)'],
        ['Composición', '65% algodón / 35% poly'],
        ['Ancho', '0,90 m / rinde 1,80 m'],
        ['Encogimiento', '< 5%'],
        ['Solidez color', '4/5'],
      ],
      uses: ['Buzos entretiempo', 'Camperas livianas', 'Joggers primavera'],
    },
    // ── COMPLEMENTOS ──
    ribb: {
      name: 'Ribb Peinado',
      desc: 'Tejido acanalado 1×1 de algodón puro. Complemento clásico para cuellos, puños y terminaciones.',
      table: [
        ['Artículo', '5009'],
        ['Composición', 'Algodón 100%'],
        ['Ancho', '0,80 m'],
        ['Rinde', '3,00 m/kg'],
      ],
      uses: ['Cuellos', 'Puños', 'Cinturas', 'Bastillas elásticas'],
    },
    'morley-lycra': {
      name: 'Morley Con Lycra',
      desc: 'Acanalado fino elastizado. Complemento para frisa, cuellos y puños con buena recuperación.',
      table: [
        ['Artículo', '5000'],
        ['Composición', '97% Alg / 3% Elastano'],
        ['Ancho', '0,62 m'],
        ['Rinde', '3,00 m/kg'],
      ],
      uses: ['Cuellos frisa', 'Puños', 'Bodies', 'Vestidos ajustados'],
    },
    'morley-algodon': {
      name: 'Morley 100% algodón',
      desc: 'Acanalado fino de algodón puro. Transpirable y de tacto natural para terminaciones de calidad.',
      table: [
        ['Artículo', '5047'],
        ['Composición', 'Algodón 100%'],
        ['Ancho', '0,62 m'],
        ['Rinde', '3,00 m/kg'],
      ],
      uses: ['Cuellos naturales', 'Puños', 'Terminaciones', 'Bodies algodón'],
    },
  };

  const modal = document.getElementById('specModal');
  const specTitle = document.getElementById('specTitle');
  const specBody = document.getElementById('specBody');

  const openSpec = key => {
    const s = SPECS[key];
    if (!s) return;
    specTitle.textContent = s.name;
    specBody.innerHTML = `
      <div class="spec-section">
        <p style="color:var(--neutral); margin-bottom: 18px;">${s.desc}</p>
      </div>
      <div class="spec-section">
        <h4>Datos técnicos</h4>
        <table>
          ${s.table.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}
        </table>
      </div>
      <div class="spec-section">
        <h4>Usos típicos</h4>
        <div class="spec-uses">${s.uses.map(u => `<span class="spec-use">${u}</span>`).join('')}</div>
      </div>
    `;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  };
  const closeSpec = () => { modal.hidden = true; document.body.style.overflow = ''; };

  document.querySelectorAll('.sc-spec-btn, .product-spec-btn').forEach(btn =>
    btn.addEventListener('click', () => openSpec(btn.dataset.spec))
  );
  modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeSpec));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeSpec(); });
  document.getElementById('specPrint').addEventListener('click', () => window.print());

  // ===== CATÁLOGO: lista de artículos + ficha =====
  const catBrowser = document.querySelector('.cat-browser');
  if (catBrowser) {
    const lists = [...catBrowser.querySelectorAll('.cat-list')];
    const items = [...catBrowser.querySelectorAll('.cat-item')];
    const details = [...catBrowser.querySelectorAll('.cat-detail')];

    const showItem = key => {
      items.forEach(b => {
        const on = b.dataset.item === key;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      details.forEach(d => { d.hidden = d.dataset.item !== key; });
    };

    const showCat = cat => {
      lists.forEach(l => { l.hidden = l.dataset.cat !== cat; });
      const first = catBrowser.querySelector(`.cat-list[data-cat="${cat}"] .cat-item`);
      if (first) showItem(first.dataset.item);
    };

    items.forEach(b => b.addEventListener('click', () => showItem(b.dataset.item)));

    document.querySelectorAll('.sc-cat-tabs .palette-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.sc-cat-tabs .palette-tab').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        showCat(tab.dataset.cat);
      });
    });

    showCat('jersey');
  }

  // ===== CONTACT FORM (WhatsApp deeplink) =====
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    // basic validation
    let ok = true;
    ['nombre','telefono','email'].forEach(id => {
      const f = form.elements[id];
      if (!f.value.trim()) { f.style.borderColor = '#D93434'; ok = false; }
      else f.style.borderColor = '';
    });
    if (!ok) return;

    const fd = new FormData(form);
    const lines = [
      `Hola Hilachas! Soy *${fd.get('nombre')}*`,
      fd.get('empresa') ? `Empresa: ${fd.get('empresa')}` : '',
      `Tel: ${fd.get('telefono')}`,
      `Email: ${fd.get('email')}`,
      fd.get('producto') ? `Producto de interés: ${fd.get('producto')}` : '',
      '',
      fd.get('mensaje') || 'Quería pedirles información y muestras.',
    ].filter(Boolean).join('\n');
    const url = `https://wa.me/541151272233?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank');
    form.reset();

    const btn = form.querySelector('.form-submit');
    const orig = btn.textContent;
    btn.textContent = '✓ Abrimos WhatsApp con tu mensaje';
    btn.style.background = 'var(--success)';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3500);
  });

  // ===== TWEAKS PANEL =====
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "heroVariant": "default"
  }/*EDITMODE-END*/;

  let tweaks = { ...TWEAK_DEFAULTS };
  let panel = null;

  const applyTweaks = () => {
    document.getElementById('hero').setAttribute('data-variant', tweaks.heroVariant);
  };

  const buildPanel = () => {
    const p = document.createElement('div');
    p.className = 'tweaks-panel';
    p.innerHTML = `
      <div class="tweaks-panel-head">
        <h4>Tweaks</h4>
        <button class="tweaks-panel-close" aria-label="Cerrar">×</button>
      </div>
      <div class="tweaks-section-label">Estilo del hero</div>
      <div class="tweaks-radio" id="heroVariantRadio">
        ${[
          ['default','Default'],
          ['editorial','Editorial'],
          ['textura','Textura'],
          ['brutalist','Brutalist'],
        ].map(([v,l]) => `
          <input type="radio" name="hv" id="hv-${v}" value="${v}" ${tweaks.heroVariant===v?'checked':''}>
          <label for="hv-${v}">${l}</label>
        `).join('')}
      </div>
    `;
    document.body.appendChild(p);
    p.querySelector('.tweaks-panel-close').addEventListener('click', () => {
      p.hidden = true;
      window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
    });
    p.querySelectorAll('input[name="hv"]').forEach(r =>
      r.addEventListener('change', () => {
        tweaks.heroVariant = r.value;
        applyTweaks();
        try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { heroVariant: r.value } }, '*'); } catch(_) {}
      })
    );
    return p;
  };

  window.addEventListener('message', e => {
    const d = e.data || {};
    if (d.type === '__activate_edit_mode') {
      if (!panel) panel = buildPanel();
      panel.hidden = false;
    } else if (d.type === '__deactivate_edit_mode') {
      if (panel) panel.hidden = true;
    }
  });
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch(_) {}

  applyTweaks();

  // ===== CURRENT YEAR (graceful, in case footer ever templates it) =====
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

})();
