/* ════════════════════════════════════════════════════════════
   Little Steps — game engine & UI
   ════════════════════════════════════════════════════════════ */
'use strict';

(() => {

  /* ────────── helpers ────────── */
  const $ = sel => document.querySelector(sel);
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const shuffle = arr => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  const SAVE_KEY = 'littleSteps.slots.v1';
  const SETTINGS_KEY = 'littleSteps.settings.v1';
  const LAST_KEY = 'littleSteps.lastSlot.v1';
  const SCENARIOS_PER_AGE = 6;
  const MINIGAME_AFTER = 3; /* minigame plays after this many scenarios in each age */

  /* ────────── persistent settings ────────── */
  let settings = { sound: true, reduceMotion: false, largeText: false };
  function loadSettings() {
    try { Object.assign(settings, JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}); } catch (e) { /* fresh */ }
    applySettings();
  }
  function applySettings() {
    Sound.setEnabled(settings.sound);
    document.documentElement.classList.toggle('reduce-motion', settings.reduceMotion);
    document.documentElement.classList.toggle('large-text', settings.largeText);
    $('#set-sound').checked = settings.sound;
    $('#set-motion').checked = settings.reduceMotion;
    $('#set-text').checked = settings.largeText;
  }
  function saveSettings() { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }

  /* ────────── save slots ────────── */
  function loadSlots() {
    try { const s = JSON.parse(localStorage.getItem(SAVE_KEY)); if (Array.isArray(s) && s.length === 3) return s; } catch (e) { /* fresh */ }
    return [null, null, null];
  }
  function persistSlots(slots) { localStorage.setItem(SAVE_KEY, JSON.stringify(slots)); }
  function saveGame() {
    if (!state) return;
    state.updated = Date.now();
    const slots = loadSlots();
    slots[state.slot] = state;
    persistSlots(slots);
    localStorage.setItem(LAST_KEY, String(state.slot));
  }

  /* ────────── game state ────────── */
  let state = null;

  function buildQueue(age) {
    const pool = DATA.scenarios.filter(s => s.age === age);
    const anchors = pool.filter(s => s.anchor);
    const rest = shuffle(pool.filter(s => !s.anchor));
    let chosen = [...anchors, ...rest].slice(0, Math.max(SCENARIOS_PER_AGE, anchors.length));
    chosen = chosen.slice(0, SCENARIOS_PER_AGE);
    /* shuffle, but force any `last:true` scenario to the end */
    const lastOnes = chosen.filter(s => s.last);
    const others = shuffle(chosen.filter(s => !s.last));
    return [...others, ...lastOnes].map(s => s.id);
  }

  function newState(slot, name, look) {
    return {
      v: 1, slot, name, look,
      temperament: pick(Object.keys(DATA.temperaments)),
      age: 1, queue: buildQueue(1), idx: 0,
      phase: 'intro', minigameDone: false,
      stats: { bond: 24, lang: 22, motor: 22, emotion: 22 },
      energy: 70,
      counts: { best: 0, ok: 0, poor: 0 },
      ageBest: 0,
      memories: [], badges: [],
      completed: false,
      created: Date.now(), updated: Date.now()
    };
  }

  const fmt = s => String(s).replace(/\{name\}/g, esc(state ? state.name : ''));
  const scenarioById = id => DATA.scenarios.find(s => s.id === id);

  /* ────────── screens ────────── */
  const SCREENS = ['title', 'slots', 'howto', 'setup', 'game', 'birthday', 'album', 'ending'];
  let albumReturn = 'title';
  function show(name) {
    SCREENS.forEach(s => { $('#screen-' + s).hidden = (s !== name); });
    window.scrollTo(0, 0);
  }

  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { t.hidden = true; }, 2200);
  }

  /* ────────── confirm modal ────────── */
  let confirmCb = null;
  function askConfirm(title, text, cb) {
    $('#confirm-title').textContent = title;
    $('#confirm-text').textContent = text;
    confirmCb = cb;
    $('#modal-confirm').hidden = false;
    $('#btn-confirm-no').focus();
  }
  $('#btn-confirm-yes').addEventListener('click', () => { $('#modal-confirm').hidden = true; if (confirmCb) confirmCb(); confirmCb = null; });
  $('#btn-confirm-no').addEventListener('click', () => { $('#modal-confirm').hidden = true; confirmCb = null; });

  /* ────────── title ────────── */
  function renderTitle() {
    const look = { skin: pick(DATA.skins).id, hair: pick(DATA.hairs).id };
    $('#title-baby').innerHTML = Baby.portraitSVG(look, 'joy', 2);
    const last = localStorage.getItem(LAST_KEY);
    const slots = loadSlots();
    const cont = $('#btn-continue');
    if (last !== null && slots[+last]) {
      const saved = slots[+last];
      cont.hidden = false;
      cont.innerHTML = `
        <span class="continue-label">▶ Continue</span>
        <span class="continue-save"><strong>${esc(saved.name)}</strong>, age ${saved.age}</span>
      `;
    } else cont.hidden = true;
    show('title');
  }

  $('#btn-continue').addEventListener('click', () => {
    const last = +localStorage.getItem(LAST_KEY);
    const slots = loadSlots();
    if (slots[last]) { Sound.click(); resumeSlot(last); }
  });
  $('#btn-newgame').addEventListener('click', () => {
    Sound.click();
    const slots = loadSlots();
    const free = slots.findIndex(s => !s);
    if (free === -1) { toast('All 3 slots are full — pick one to replace.'); renderSlots(); show('slots'); return; }
    openSetup(free);
  });
  $('#btn-slots').addEventListener('click', () => { Sound.click(); renderSlots(); show('slots'); });
  $('#btn-howto').addEventListener('click', () => { Sound.click(); show('howto'); });
  $('#btn-howto-back').addEventListener('click', () => { Sound.click(); renderTitle(); });
  $('#btn-slots-back').addEventListener('click', () => { Sound.click(); renderTitle(); });

  /* ────────── settings modal ────────── */
  function openSettings() { $('#modal-settings').hidden = false; $('#set-sound').focus(); }
  $('#btn-settings').addEventListener('click', () => { Sound.click(); openSettings(); });
  $('#btn-game-settings').addEventListener('click', () => { Sound.click(); openSettings(); });
  $('#btn-settings-close').addEventListener('click', () => { Sound.click(); $('#modal-settings').hidden = true; });
  $('#set-sound').addEventListener('change', e => { settings.sound = e.target.checked; applySettings(); saveSettings(); if (settings.sound) Sound.good(); });
  $('#set-motion').addEventListener('change', e => { settings.reduceMotion = e.target.checked; applySettings(); saveSettings(); });
  $('#set-text').addEventListener('change', e => { settings.largeText = e.target.checked; applySettings(); saveSettings(); });

  /* ────────── save slots screen ────────── */
  function renderSlots() {
    const slots = loadSlots();
    const list = $('#slot-list');
    list.innerHTML = '';
    slots.forEach((s, i) => {
      const card = document.createElement('div');
      card.className = 'slot-card';
      if (s) {
        const d = new Date(s.updated);
        card.innerHTML = `
          <div class="slot-portrait">${Baby.portraitSVG(s.look, s.completed ? 'proud' : 'happy', s.age)}</div>
          <div class="slot-info">
            <div class="slot-name">${esc(s.name)} ${DATA.temperaments[s.temperament].icon}</div>
            <div class="slot-meta">${s.completed ? '🎓 Journey complete!' : `Age ${s.age} · moment ${Math.min(s.idx + 1, SCENARIOS_PER_AGE)} of ${SCENARIOS_PER_AGE}`} · saved ${d.toLocaleDateString()}</div>
          </div>
          <div class="slot-actions">
            <button class="btn btn-primary" data-play="${i}">${s.completed ? 'Revisit' : 'Play'}</button>
            <button class="btn btn-danger" data-del="${i}">Delete</button>
          </div>`;
      } else {
        card.innerHTML = `
          <div class="slot-empty-icon">🌱</div>
          <div class="slot-info"><div class="slot-name">Empty slot</div><div class="slot-meta">A journey waiting to begin</div></div>
          <div class="slot-actions"><button class="btn btn-soft" data-new="${i}">New journey</button></div>`;
      }
      list.appendChild(card);
    });
    list.onclick = (e) => {
      const play = e.target.closest('[data-play]');
      const del = e.target.closest('[data-del]');
      const nw = e.target.closest('[data-new]');
      if (play) { Sound.click(); resumeSlot(+play.dataset.play); }
      if (nw) { Sound.click(); openSetup(+nw.dataset.new); }
      if (del) {
        const i = +del.dataset.del;
        const s = loadSlots()[i];
        askConfirm('Delete this journey?', `${s.name}'s whole journey (age ${s.age}) will be gone forever. This can't be undone.`, () => {
          const slots = loadSlots();
          slots[i] = null;
          persistSlots(slots);
          if (localStorage.getItem(LAST_KEY) === String(i)) localStorage.removeItem(LAST_KEY);
          if (state && state.slot === i) state = null; /* else beforeunload would resurrect it */
          toast('Journey deleted.');
          renderSlots();
        });
      }
    };
  }

  function resumeSlot(i) {
    const slots = loadSlots();
    if (!slots[i]) return;
    state = slots[i];
    localStorage.setItem(LAST_KEY, String(i));
    if (state.completed) { renderEnding(); show('ending'); return; }
    show('game');
    renderGame();
  }

  /* ────────── setup ────────── */
  let setupSlot = 0;
  let setupLook = { skin: 'peach', hair: 'cocoa-h' };
  function openSetup(slot) {
    setupSlot = slot;
    setupLook = { skin: pick(DATA.skins).id, hair: pick(DATA.hairs).id };
    $('#input-name').value = '';
    renderSwatches();
    renderSetupPreview();
    show('setup');
    $('#input-name').focus();
  }
  function renderSwatches() {
    const skinRow = $('#skin-row'), hairRow = $('#hair-row');
    skinRow.innerHTML = DATA.skins.map(s =>
      `<button type="button" class="swatch" role="radio" aria-checked="${s.id === setupLook.skin}" data-skin="${s.id}" style="background:${s.color}" aria-label="skin tone ${s.id}"></button>`).join('');
    hairRow.innerHTML = DATA.hairs.map(h =>
      `<button type="button" class="swatch" role="radio" aria-checked="${h.id === setupLook.hair}" data-hair="${h.id}" style="background:${h.color}" aria-label="hair color ${h.id}"></button>`).join('');
  }
  function renderSetupPreview() {
    $('#setup-baby-preview').innerHTML = Baby.portraitSVG(setupLook, 'happy', 1);
  }
  $('#skin-row').addEventListener('click', e => {
    const b = e.target.closest('[data-skin]');
    if (b) { setupLook.skin = b.dataset.skin; Sound.pop(); renderSwatches(); renderSetupPreview(); }
  });
  $('#hair-row').addEventListener('click', e => {
    const b = e.target.closest('[data-hair]');
    if (b) { setupLook.hair = b.dataset.hair; Sound.pop(); renderSwatches(); renderSetupPreview(); }
  });
  $('#btn-randname').addEventListener('click', () => {
    $('#input-name').value = pick(DATA.names);
    Sound.pop();
  });
  $('#btn-setup-back').addEventListener('click', () => { Sound.click(); renderTitle(); });
  $('#setup-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#input-name').value.trim();
    if (!name) { toast('Give your little one a name!'); return; }
    const slots = loadSlots();
    const begin = () => {
      state = newState(setupSlot, name, { ...setupLook });
      saveGame();
      Sound.birthday();
      show('game');
      renderGame();
    };
    if (slots[setupSlot]) {
      askConfirm('Replace this journey?', `Slot ${setupSlot + 1} already holds ${slots[setupSlot].name}'s journey. Starting fresh will erase it.`, begin);
    } else begin();
  });

  /* ────────── HUD ────────── */
  function renderHUD() {
    $('#hud-age').textContent = `Age ${state.age}`;
    const total = SCENARIOS_PER_AGE + 1; /* scenarios + play session */
    let stepsDone = state.idx + (state.minigameDone ? 1 : 0);
    if (state.idx > MINIGAME_AFTER && !state.minigameDone) stepsDone = state.idx; /* safety */
    const dots = [];
    for (let i = 0; i < total; i++) {
      const cls = i < stepsDone ? 'done' : (i === stepsDone ? 'current' : '');
      dots.push(`<span class="day-dot ${cls}"></span>`);
    }
    $('#hud-days').innerHTML = dots.join('');

    const chips = DATA.statDefs.map(d => {
      const v = state.stats[d.key];
      return `<div class="stat-chip" role="img" aria-label="${d.label} ${v} out of 100" title="${d.label}: ${v}/100">
        <span class="stat-icon">${d.icon}</span>
        <span class="stat-bar"><span class="stat-fill ${d.css}" style="width:${v}%"></span></span>
      </div>`;
    });
    const lowE = state.energy < 25;
    chips.push(`<div class="stat-chip ${lowE ? 'energy-low' : ''}" role="img" aria-label="Your energy ${state.energy} out of 100" title="Your energy: ${state.energy}/100${lowE ? ' — running low!' : ''}">
      <span class="stat-icon">⚡</span>
      <span class="stat-bar"><span class="stat-fill energy" style="width:${state.energy}%"></span></span>
    </div>`);
    $('#hud-stats').innerHTML = chips.join('');
  }

  /* ────────── scene ────────── */
  function renderScene(mood, opts = {}) {
    $('#scene').innerHTML = Baby.sceneSVG(state, mood, opts);
    $('#stage').style.background = Baby.stageColor(state, opts.sceneId);
  }

  function floaties(deltas) {
    const stage = $('#stage');
    const entries = Object.entries(deltas).filter(([, v]) => v !== 0);
    entries.forEach(([k, v], i) => {
      const def = DATA.statDefs.find(d => d.key === k);
      const icon = def ? def.icon : '⚡';
      const el = document.createElement('div');
      el.className = 'floaty';
      el.style.color = v > 0 ? '#6E9455' : '#B14A33';
      el.style.left = (34 + i * 11 + Math.random() * 6) + '%';
      el.style.top = (28 + Math.random() * 20) + '%';
      el.textContent = `${icon} ${v > 0 ? '+' : ''}${v}`;
      stage.appendChild(el);
      setTimeout(() => el.remove(), 1700);
    });
  }

  /* ────────── game flow ────────── */
  function renderGame() {
    renderHUD();
    if (state.phase === 'intro') renderIntro();
    else if (state.phase === 'minigame') renderMinigame();
    else renderScenario();
  }

  function renderIntro() {
    const intro = DATA.ageIntros[state.age];
    state.currentTime = 'Morning';
    renderScene(state.age === 1 ? 'curious' : 'joy', { parentPose: 'kneel' });
    $('#card-area').innerHTML = `
      <div class="scenario-card">
        <div class="scenario-head">
          <span style="font-size:1.6rem">${intro.icon}</span>
          <span class="scenario-title">${intro.title}</span>
        </div>
        <p class="scenario-text">${fmt(intro.text)}</p>
        <div class="choices">
          <button class="btn btn-primary" id="btn-intro-go" style="width:100%">Start the year →</button>
        </div>
      </div>`;
    $('#btn-intro-go').addEventListener('click', () => {
      Sound.click();
      state.phase = 'scene';
      saveGame();
      renderGame();
    });
  }

  function currentScenario() { return scenarioById(state.queue[state.idx]); }

  function renderScenario() {
    const sc = currentScenario();
    if (!sc) { advance(); return; }
    state.currentTime = sc.time;
    renderScene(pick(['neutral', 'curious', 'happy']), { sceneId: sc.id, parentPose: 'stand' });
    const order = shuffle(sc.choices.map((c, i) => i));
    const keys = ['1', '2', '3'];
    const meta = DATA.choiceMeta[sc.id] || [];
    $('#card-area').innerHTML = `
      <div class="scenario-card">
        <div class="scenario-head">
          <span class="scenario-time">${sc.icon} ${sc.time}</span>
          <span class="scenario-title">${sc.title}</span>
        </div>
        <div class="speech-bubble">${fmt(sc.text)}</div>
        <div class="action-row">
          ${order.map((ci, i) => {
            const m = meta[ci] || { icon: '🤔', act: 'Respond' };
            return `
            <button class="action-tile" data-choice="${ci}" title="${esc(sc.choices[ci].label)}">
              <span class="action-key">${keys[i]}</span>
              <span class="action-icon" aria-hidden="true">${m.icon}</span>
              <span class="action-label">${fmt(m.act)}</span>
              <span class="action-sub">${fmt(sc.choices[ci].label)}</span>
            </button>`;
          }).join('')}
        </div>
      </div>`;
    $('#card-area').querySelectorAll('[data-choice]').forEach(btn => {
      btn.addEventListener('click', () => chooseOption(sc, +btn.dataset.choice));
    });
  }

  /* ── scene reaction particles ── */
  function motionOK() {
    return !settings.reduceMotion && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  function burst(quality, cx, cy) {
    if (!motionOK()) return;
    const stage = $('#stage');
    const sets = {
      best: ['💛', '✨', '💖', '⭐'],
      ok: ['✨', '🙂'],
      poor: ['💧', '🌧️']
    };
    const icons = sets[quality] || sets.ok;
    const n = quality === 'best' ? 10 : 6;
    const rect = stage.getBoundingClientRect();
    const baseX = cx !== undefined ? cx : rect.width * 0.52;
    const baseY = cy !== undefined ? cy : rect.height * 0.45;
    for (let i = 0; i < n; i++) {
      const el = document.createElement('span');
      el.className = 'pop-part';
      el.textContent = pick(icons);
      el.style.left = baseX + (Math.random() * 60 - 30) + 'px';
      el.style.top = baseY + (Math.random() * 30 - 15) + 'px';
      const up = quality !== 'poor';
      el.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
      el.style.setProperty('--dy', (up ? -(40 + Math.random() * 70) : (30 + Math.random() * 50)) + 'px');
      el.style.animationDelay = (Math.random() * 0.25) + 's';
      stage.appendChild(el);
      setTimeout(() => el.remove(), 1700);
    }
  }

  function temperamentAdjust(fx, quality) {
    const out = { ...fx };
    const t = state.temperament;
    if (t === 'sunny' && quality === 'best') out.bond = (out.bond || 0) + 1;
    if (t === 'spirited') {
      if (out.emotion > 0) out.emotion += 1;
      if (quality === 'poor') out.emotion = (out.emotion || 0) - 1;
    }
    if (t === 'cautious') {
      if (out.motor > 1) out.motor -= 1;
      if (quality === 'best' && out.emotion > 0) out.emotion += 1;
    }
    if (t === 'sensitive') {
      if (out.emotion > 0) out.emotion += 1;
      if (out.emotion < 0) out.emotion -= 1;
    }
    return out;
  }

  function chooseOption(sc, ci) {
    const choice = sc.choices[ci];
    let fx = temperamentAdjust(choice.fx, choice.q);
    const lowEnergy = state.energy < 25;
    let energyNote = '';
    if (lowEnergy && choice.q === 'best') {
      DATA.statDefs.forEach(d => { if (fx[d.key] > 0) fx[d.key] = Math.max(1, Math.ceil(fx[d.key] / 2)); });
      energyNote = pick(DATA.lowEnergyNotes);
    }
    const deltas = {};
    DATA.statDefs.forEach(d => {
      const v = fx[d.key] || 0;
      if (v) {
        const before = state.stats[d.key];
        state.stats[d.key] = clamp(before + v, 0, 100);
        deltas[d.key] = state.stats[d.key] - before;
      }
    });
    const eBefore = state.energy;
    state.energy = clamp(state.energy + (fx.energy || 0) + 3, 0, 100); /* +3 natural regen per moment */
    const eDelta = state.energy - eBefore;

    state.counts[choice.q]++;
    if (choice.q === 'best') state.ageBest++;

    /* ── the beat: scene reacts FIRST, words come after ── */
    if (choice.q === 'best') Sound.good(); else if (choice.q === 'ok') Sound.okay(); else Sound.rough();
    if (choice.mood === 'cry') setTimeout(() => Sound.cry(), 350);
    if (choice.mood === 'joy') setTimeout(() => Sound.giggle(), 350);
    renderScene(choice.mood, {
      sceneId: sc.id,
      parentPose: choice.q === 'best' ? 'kneel' : (choice.q === 'poor' ? 'far' : 'stand')
    });
    renderHUD();
    burst(choice.q);
    floaties({ ...deltas, ...(eDelta ? { energy: eDelta } : {}) });
    saveGame();

    /* temperament flavor line (sometimes) */
    let flavor = '';
    if (Math.random() < 0.3) {
      flavor = `<p style="color:var(--ink-faint);font-size:0.9rem;margin-top:8px">${DATA.temperaments[state.temperament].icon} ${fmt(pick(DATA.temperaments[state.temperament].flavor))}</p>`;
    }

    const ql = DATA.qualityLabels[choice.q];
    const deltaChips = [
      ...Object.entries(deltas).map(([k, v]) => {
        const def = DATA.statDefs.find(d => d.key === k);
        return `<span class="delta-chip ${v > 0 ? 'up' : 'down'}">${def.icon} ${def.label} ${v > 0 ? '+' : ''}${v}</span>`;
      }),
      ...(eDelta ? [`<span class="delta-chip ${eDelta > 0 ? 'up' : 'down'}">⚡ Energy ${eDelta > 0 ? '+' : ''}${eDelta}</span>`] : [])
    ].join('');

    const showFeedback = () => {
      $('#card-area').innerHTML = `
        <div class="feedback-card">
          <div class="feedback-react">
            <span class="react-label ${ql.css}">${ql.icon} ${ql.label}</span>
            <div class="react-row" style="margin-top:10px">
              <div class="react-avatar">${Baby.portraitSVG(state.look, choice.mood, state.age)}</div>
              <div>
                ${fmt(choice.react)}
                ${energyNote ? `<p style="color:#B14A33;font-size:0.9rem;margin-top:8px">⚡ ${energyNote}</p>` : ''}
                ${flavor}
              </div>
            </div>
          </div>
          <div class="stat-deltas">${deltaChips}</div>
          <div class="tip-card">
            <div class="tip-head">💡 ${esc(choice.tip.head)}</div>
            <div class="tip-body">${fmt(choice.tip.body)}</div>
          </div>
          <button class="btn btn-primary" id="btn-continue-feedback" style="width:100%">Continue →</button>
        </div>`;
      $('#btn-continue-feedback').addEventListener('click', () => { Sound.click(); advance(); });
      $('#btn-continue-feedback').focus({ preventScroll: true });
      setTimeout(() => $('#btn-continue-feedback')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
    };

    if (motionOK()) {
      $('#card-area').innerHTML = `<div class="beat-dots" aria-hidden="true">● ● ●</div>`;
      setTimeout(showFeedback, 800);
    } else {
      showFeedback();
    }
  }

  function advance() {
    state.idx++;
    if (state.idx === MINIGAME_AFTER && !state.minigameDone) {
      state.phase = 'minigame';
      saveGame();
      renderGame();
      return;
    }
    if (state.idx >= state.queue.length) {
      birthday();
      return;
    }
    state.phase = 'scene';
    saveGame();
    renderGame();
  }

  /* ────────── minigame phase ────────── */
  function renderMinigame() {
    state.currentTime = 'Afternoon';
    renderScene('joy', { parentPose: 'kneel' });
    Minigames.start(state.age, $('#card-area'), { name: state.name, look: state.look }, (result) => {
      const before = state.stats[result.statKey];
      state.stats[result.statKey] = clamp(before + result.bonus, 0, 100);
      const eBefore = state.energy;
      state.energy = clamp(state.energy + (result.energy || 0), 0, 100);
      state.minigameDone = true;
      renderHUD();
      renderScene('joy', { parentPose: 'kneel' });
      floaties({ [result.statKey]: state.stats[result.statKey] - before, energy: state.energy - eBefore });
      const def = DATA.statDefs.find(d => d.key === result.statKey);
      $('#card-area').innerHTML = `
        <div class="feedback-card">
          <div class="feedback-react">
            <span class="react-label good">🧸 Play session</span><br>
            ${esc(result.summary)}
          </div>
          <div class="stat-deltas">
            <span class="delta-chip up">${def.icon} ${def.label} +${result.bonus}</span>
            <span class="delta-chip up">⚡ Energy +${result.energy || 0}</span>
          </div>
          <div class="tip-card">
            <div class="tip-head">💡 ${esc(result.tip.head)}</div>
            <div class="tip-body">${fmt(result.tip.body)}</div>
          </div>
          <button class="btn btn-primary" id="btn-continue-feedback" style="width:100%">Continue →</button>
        </div>`;
      setTimeout(() => $('#btn-continue-feedback')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
      $('#btn-continue-feedback').addEventListener('click', () => {
        Sound.click();
        state.phase = 'scene';
        saveGame();
        renderGame();
      });
      saveGame();
    });
  }

  /* ────────── birthday / age-up ────────── */
  function birthday() {
    const newAge = state.age + 1;
    /* memories for the age just finished */
    const base = DATA.memories.find(m => m.age === state.age && !m.bonus);
    const bonus = DATA.memories.find(m => m.age === state.age && m.bonus);
    if (base && !state.memories.includes(base.id)) state.memories.push(base.id);
    const gotBonus = state.ageBest >= 4;
    if (gotBonus && bonus && !state.memories.includes(bonus.id)) state.memories.push(bonus.id);

    if (newAge > 6) { finishGame(); return; }

    /* milestones */
    const rules = DATA.milestoneRules[newAge] || [];
    const items = [];
    rules.forEach(r => {
      if (state.stats[r.stat] >= r.min) {
        items.push({ icon: r.icon, title: r.title, sub: r.sub, hit: true });
        state.badges.push({ age: newAge, icon: r.icon, title: r.title });
      } else if (r.miss) {
        items.push({ icon: r.miss.icon, title: r.miss.title, sub: r.miss.sub, hit: false });
      }
    });

    const t = DATA.temperaments[state.temperament];
    const tempNote = newAge === 2
      ? `<div class="temperament-note">🔍 <strong>You're getting to know them…</strong> ${fmt(t.insight)}</div>`
      : `<div class="temperament-note">${t.icon} ${fmt(pick(t.flavor))}</div>`;

    const growthRows = DATA.statDefs.map(d => `
      <div class="growth-row">
        <span class="growth-label">${d.icon} ${d.label}</span>
        <span class="growth-bar"><span class="growth-fill ${'stat-fill ' + d.css}" style="width:${state.stats[d.key]}%;"></span></span>
      </div>`).join('');

    $('#birthday-panel').innerHTML = `
      <div class="birthday-baby">${Baby.portraitSVG(state.look, 'joy', newAge)}</div>
      <h2 class="panel-title">🎂 ${esc(state.name)} turns ${newAge}!</h2>
      <p class="panel-sub">Another year of little steps — here's how ${esc(state.name)} grew.</p>
      <div class="growth-report">${growthRows}</div>
      <div class="milestone-list">
        ${items.map((m, i) => `
          <div class="milestone-item" style="animation-delay:${0.15 + i * 0.12}s">
            <span class="mi-icon">${m.icon}</span>
            <div><strong>${m.title}</strong><span class="mi-sub">${m.sub}</span></div>
          </div>`).join('')}
        <div class="milestone-item" style="animation-delay:${0.15 + items.length * 0.12}s">
          <span class="mi-icon">📔</span>
          <div><strong>Memory saved: ${base ? base.title : ''}</strong>
          <span class="mi-sub">${gotBonus && bonus ? `Bonus memory too: ${bonus.title} — your warm choices this year unlocked it!` : 'Added to the album.'}</span></div>
        </div>
      </div>
      ${tempNote}
      <div class="panel-actions">
        <button class="btn btn-soft" id="btn-bday-album">📔 Album</button>
        <button class="btn btn-primary btn-big" id="btn-bday-go">Onward to age ${newAge} →</button>
      </div>`;

    /* advance state */
    state.age = newAge;
    state.queue = buildQueue(newAge);
    state.idx = 0;
    state.phase = 'intro';
    state.minigameDone = false;
    state.ageBest = 0;
    saveGame();

    Sound.birthday();
    show('birthday');
    confetti();
    $('#btn-bday-go').addEventListener('click', () => {
      Sound.click();
      show('game');
      renderGame();
    });
    $('#btn-bday-album').addEventListener('click', () => {
      Sound.click();
      albumReturn = 'birthday';
      renderAlbum();
      show('album');
    });
  }

  function confetti() {
    if (settings.reduceMotion) return;
    const layer = $('#confetti-layer');
    layer.innerHTML = '';
    const colors = ['#E0785A', '#F2B950', '#8FB573', '#8FBEDC', '#B287B8', '#F2937B'];
    for (let i = 0; i < 60; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + '%';
      c.style.background = pick(colors);
      c.style.animationDuration = (2.4 + Math.random() * 2.4) + 's';
      c.style.animationDelay = (Math.random() * 1.2) + 's';
      c.style.transform = `rotate(${Math.random() * 360}deg)`;
      layer.appendChild(c);
    }
    setTimeout(() => { layer.innerHTML = ''; }, 6500);
  }

  /* ────────── album ────────── */
  function renderAlbum() {
    const unlocked = state ? state.memories : [];
    $('#album-sub').textContent = state
      ? `${unlocked.length} of ${DATA.memories.length} memories collected on ${state.name}'s journey`
      : 'Start a journey to collect memories!';
    $('#album-grid').innerHTML = DATA.memories.map((m, i) => {
      const has = unlocked.includes(m.id);
      return `
      <div class="memory-card ${has ? '' : 'memory-locked'}" style="animation-delay:${i * 0.06}s">
        <div class="memory-photo">
          <span class="memory-emoji">${has ? m.emoji : '🔒'}</span>
          <div class="memory-age">Age ${m.age}${m.bonus ? ' · bonus' : ''}</div>
        </div>
        <div class="memory-caption">${has ? `<strong>${m.title}</strong><br>${m.caption}` : (m.bonus ? 'A bonus memory — earned through especially warm choices.' : 'Still to come…')}</div>
      </div>`;
    }).join('');
  }
  $('#btn-album').addEventListener('click', () => { Sound.click(); albumReturn = 'game'; renderAlbum(); show('album'); });
  $('#btn-album-back').addEventListener('click', () => {
    Sound.click();
    show(albumReturn);
    if (albumReturn === 'game') renderGame();
  });

  /* ────────── ending ────────── */
  function finishGame() {
    state.completed = true;
    saveGame();
    renderEnding();
    Sound.fanfare();
    show('ending');
  }

  function renderEnding() {
    const total = state.counts.best + state.counts.ok + state.counts.poor;
    const ratio = total ? state.counts.best / total : 0;
    const style = [...DATA.endingStyles].sort((a, b) => b.minBestRatio - a.minBestRatio).find(s => ratio >= s.minBestRatio) || DATA.endingStyles[DATA.endingStyles.length - 1];
    const t = DATA.temperaments[state.temperament];

    const childLines = DATA.statDefs.map(d => {
      const lines = DATA.endingChildLines[d.key];
      const v = state.stats[d.key];
      return `<div class="milestone-item"><span class="mi-icon">${d.icon}</span><div><strong>${d.label}: ${v}/100</strong><span class="mi-sub">${esc(state.name)} ${v >= 62 ? lines.high : lines.low}</span></div></div>`;
    }).join('');

    $('#ending-panel').innerHTML = `
      <div class="birthday-baby">${Baby.portraitSVG(state.look, 'proud', 6)}</div>
      <h2 class="panel-title">🎓 Off to first grade!</h2>
      <p class="panel-sub">Five years of little steps. ${esc(state.name)} — your ${t.icon} ${t.name.toLowerCase()} kid — walks into school today. You watch from the gate, holding a backpack-shaped hole in your morning.</p>
      <div class="ending-style-badge">
        <div style="font-size:0.85rem;font-weight:800;color:var(--ink-faint);text-transform:uppercase;letter-spacing:0.08em">Your parenting style</div>
        <div class="style-name">${style.name}</div>
        <div class="style-desc">${style.desc}</div>
      </div>
      <div class="milestone-list">${childLines}</div>
      <div class="milestone-item"><span class="mi-icon">📊</span><div><strong>The journey in numbers</strong>
        <span class="mi-sub">${total} moments lived · ${state.counts.best} lovely, ${state.counts.ok} fair, ${state.counts.poor} rough · ${state.memories.length}/${DATA.memories.length} memories · ${state.badges.length} milestones</span></div></div>
      <div class="temperament-note">💛 <strong>The real secret:</strong> there was no perfect run. Children don't need perfect parents — they need present ones who repair, laugh, rest, and keep showing up. However you played: that was the lesson. Try a new temperament next time — a ${t.name === 'Spirited' ? 'cautious' : 'spirited'} child plays very differently!</div>
      <div class="panel-actions">
        <button class="btn btn-soft" id="btn-end-album">📔 Album</button>
        <button class="btn btn-primary" id="btn-end-again">🌱 New journey</button>
        <button class="btn btn-soft" id="btn-end-title">🏠 Title</button>
      </div>`;
    $('#btn-end-album').addEventListener('click', () => { Sound.click(); albumReturn = 'ending'; renderAlbum(); show('album'); });
    $('#btn-end-again').addEventListener('click', () => {
      Sound.click();
      const slots = loadSlots();
      const free = slots.findIndex(s => !s);
      if (free === -1) { renderSlots(); show('slots'); toast('All slots full — pick one to replace.'); }
      else openSetup(free);
    });
    $('#btn-end-title').addEventListener('click', () => { Sound.click(); renderTitle(); });
  }

  /* ────────── exit / home ────────── */
  $('#btn-home').addEventListener('click', () => {
    Sound.click();
    saveGame();
    toast('Saved! 💾');
    renderTitle();
  });

  /* ────────── keyboard ────────── */
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (!$('#modal-confirm').hidden || !$('#modal-settings').hidden) {
      if (e.key === 'Escape') { $('#modal-confirm').hidden = true; $('#modal-settings').hidden = true; }
      return;
    }
    if (!$('#screen-game').hidden) {
      if (['1', '2', '3'].includes(e.key)) {
        const btns = $('#card-area').querySelectorAll('[data-choice]');
        const i = +e.key - 1;
        if (btns[i]) { e.preventDefault(); btns[i].click(); }
      } else if (e.key === 'Enter') {
        const cont = $('#btn-continue-feedback') || $('#btn-intro-go');
        if (cont && document.activeElement !== cont) { e.preventDefault(); cont.click(); }
      }
    }
  });

  /* ── tap the baby: giggles + hearts, any time ── */
  let lastPet = 0;
  $('#scene').addEventListener('click', (e) => {
    if (!e.target.closest('.baby-rig')) return;
    const now = Date.now();
    if (now - lastPet < 600) return; /* don't spam giggles */
    lastPet = now;
    Sound.giggle();
    const rect = $('#stage').getBoundingClientRect();
    burst('best', e.clientX - rect.left, e.clientY - rect.top);
  });

  window.addEventListener('beforeunload', () => { if (state && !state.completed) saveGame(); });

  /* ────────── boot ────────── */
  loadSettings();
  renderTitle();

})();
