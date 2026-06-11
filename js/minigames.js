/* ════════════════════════════════════════════════════════════
   Little Steps — mini-games (one per age, all gentle, no fail)
   API: Minigames.start(age, container, ctx, onDone)
     ctx = { name, look }
     onDone({ statKey, bonus, summary, tip:{head,body} })
   ════════════════════════════════════════════════════════════ */
'use strict';

const Minigames = (() => {

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let timers = [];
  function later(fn, ms) { const t = setTimeout(fn, ms); timers.push(t); return t; }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  function shell(container, title, sub, boardHTML, statusText) {
    container.innerHTML = `
      <div class="minigame-card">
        <div class="minigame-title">🧸 Play time: ${title}</div>
        <p class="minigame-sub">${sub}</p>
        <div class="minigame-board" id="mg-board">${boardHTML}</div>
        <div class="minigame-status" id="mg-status" aria-live="polite">${statusText || ''}</div>
        <div class="mg-btn-row" id="mg-controls"></div>
      </div>`;
    return {
      board: container.querySelector('#mg-board'),
      status: container.querySelector('#mg-status'),
      controls: container.querySelector('#mg-controls')
    };
  }

  function finish(container, onDone, result) {
    clearTimers();
    Sound.fanfare();
    const c = container.querySelector('#mg-controls');
    const s = container.querySelector('#mg-status');
    if (s) s.textContent = result.summary;
    if (c) {
      c.innerHTML = '';
      const btn = document.createElement('button');
      btn.className = 'btn btn-primary mg-big-btn';
      btn.textContent = 'Lovely! Continue →';
      btn.addEventListener('click', () => onDone(result));
      c.appendChild(btn);
      btn.focus();
    }
  }

  /* ══════════ AGE 1 — PEEKABOO ══════════ */
  function peekaboo(container, ctx, onDone) {
    const ROUNDS = 5;
    let round = 0, hits = 0, peeking = false, windowTimer = null;
    const face = (hidden) => `
      <svg viewBox="0 0 200 150" style="max-width:300px">
        <circle cx="100" cy="78" r="46" fill="#F5C9A4"/>
        <path d="M 96 32 Q 100 20 110 24 Q 102 26 104 34 Z" fill="#5B3A22"/>
        ${hidden
          ? `<g><ellipse cx="74" cy="74" rx="20" ry="26" fill="#EBA983" transform="rotate(14 74 74)"/><ellipse cx="126" cy="74" rx="20" ry="26" fill="#EBA983" transform="rotate(-14 126 74)"/></g>`
          : `<path d="M 78 68 Q 84 60 90 68" stroke="#3A2C22" stroke-width="4" fill="none" stroke-linecap="round"/>
             <path d="M 110 68 Q 116 60 122 68" stroke="#3A2C22" stroke-width="4" fill="none" stroke-linecap="round"/>
             <ellipse cx="74" cy="88" rx="8" ry="5" fill="#EBA983"/><ellipse cx="126" cy="88" rx="8" ry="5" fill="#EBA983"/>
             <path d="M 88 92 Q 100 106 112 92 Z" fill="#8C4A3C"/>
             <g fill="#F2B950"><path d="M 36 40 l 2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z"/><path d="M 162 36 l 2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z"/></g>`}
      </svg>`;
    const ui = shell(container, 'Peekaboo!',
      `${esc(ctx.name)} is hiding behind those little hands. When the face peeks out — hit the big button, fast!`,
      face(true), `Round 1 of ${ROUNDS} — wait for it…`);
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary mg-big-btn';
    btn.textContent = '🙈 Peekaboo!';
    ui.controls.appendChild(btn);

    function nextRound() {
      if (round >= ROUNDS) {
        finish(container, onDone, {
          statKey: 'bond', bonus: 3, energy: 6,
          summary: hits >= 4 ? `${hits} giggles out of ${ROUNDS} — ${esc(ctx.name)} is shrieking with joy!`
            : `${hits} giggle${hits === 1 ? '' : 's'} out of ${ROUNDS} — and ${esc(ctx.name)} loved every round anyway.`,
          tip: { head: 'Why peekaboo works', body: 'Peekaboo teaches object permanence — the huge discovery that things still exist when hidden. The suspense-then-relief cycle is a baby\'s first joke, and your reappearing face is the punchline. Repetition isn\'t boring to babies; it\'s science.' }
        });
        return;
      }
      round++;
      peeking = false;
      ui.board.innerHTML = face(true);
      ui.status.textContent = `Round ${round} of ${ROUNDS} — wait for it…`;
      later(() => {
        peeking = true;
        ui.board.innerHTML = face(false);
        ui.status.textContent = 'NOW! Peekaboo!';
        Sound.pop();
        windowTimer = later(() => {
          if (peeking) { peeking = false; ui.status.textContent = 'They hid again — keep watching!'; later(nextRound, 700); }
        }, 1500);
      }, 900 + Math.random() * 1800);
    }
    btn.addEventListener('click', () => {
      if (peeking) {
        peeking = false; hits++;
        clearTimeout(windowTimer);
        Sound.giggle();
        ui.status.textContent = '🎉 Giggle explosion!';
        later(nextRound, 800);
      } else {
        Sound.click();
        ui.status.textContent = 'Not yet — wait for the peek!';
      }
    });
    nextRound();
  }

  /* ══════════ AGE 2 — BLOCK TOWER ══════════ */
  function blockTower(container, ctx, onDone) {
    const TOTAL = 6, W = 300, H = 210, BW = 86, BH = 26;
    const colors = ['#E0785A', '#F2B950', '#8FB573', '#8FBEDC', '#B287B8', '#F2937B'];
    let placed = [], moving = null, dir = 1, raf = null, done = false;

    const ui = shell(container, 'Block Tower',
      `${esc(ctx.name)} hands you block after block. Tap <strong>Drop</strong> to stack them up — straight or wobbly, the tower will be magnificent.`,
      `<svg viewBox="0 0 ${W} ${H}" id="mg-tower" style="max-width:340px"><rect x="0" y="${H - 12}" width="${W}" height="12" fill="#D9BE9C"/></svg>`, 'Block 1 — tap Drop when it lines up!');
    const svg = ui.board.querySelector('#mg-tower');
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary mg-big-btn';
    btn.textContent = '🧱 Drop!';
    ui.controls.appendChild(btn);

    function draw() {
      let blocks = placed.map(b =>
        `<rect x="${b.x}" y="${b.y}" width="${BW}" height="${BH}" rx="5" fill="${b.c}" stroke="rgba(74,59,50,0.2)" stroke-width="2"/>`).join('');
      if (moving) blocks += `<rect x="${moving.x}" y="${moving.y}" width="${BW}" height="${BH}" rx="5" fill="${moving.c}" stroke="rgba(74,59,50,0.35)" stroke-width="2.5"/>`;
      svg.innerHTML = `<rect x="0" y="${H - 12}" width="${W}" height="12" fill="#D9BE9C"/>` + blocks;
    }
    function newBlock() {
      const idx = placed.length;
      moving = { x: 0, y: 16 + (TOTAL - 1 - idx) * 0, c: colors[idx % colors.length] };
      moving.y = (H - 12) - (idx + 1) * BH - 4 - 40;
      moving.y = Math.max(8, moving.y);
      dir = idx % 2 ? -1 : 1;
      ui.status.textContent = `Block ${idx + 1} of ${TOTAL} — tap Drop when it lines up!`;
      loop();
    }
    function loop() {
      if (done || !moving) return;
      moving.x += dir * (2.1 + placed.length * 0.35);
      if (moving.x <= 0) { moving.x = 0; dir = 1; }
      if (moving.x >= W - BW) { moving.x = W - BW; dir = -1; }
      draw();
      raf = requestAnimationFrame(loop);
    }
    btn.addEventListener('click', () => {
      if (!moving || done) return;
      cancelAnimationFrame(raf);
      const idx = placed.length;
      const targetX = idx === 0 ? (W - BW) / 2 : placed[idx - 1].x;
      const offset = Math.abs(moving.x - targetX);
      moving.y = (H - 12) - (idx + 1) * BH;
      placed.push(moving);
      Sound.stack();
      moving = null;
      draw();
      if (placed.length >= TOTAL) {
        done = true;
        const avgOff = placed.length > 1
          ? placed.slice(1).reduce((s, b, i) => s + Math.abs(b.x - placed[i].x), 0) / (placed.length - 1) : 0;
        const neat = avgOff < 18;
        later(() => {
          finish(container, onDone, {
            statKey: 'motor', bonus: 3, energy: 6,
            summary: neat
              ? `A six-block masterpiece! ${esc(ctx.name)} stares in awe… then demolishes it with a joyful ROAR. Perfect.`
              : `A gloriously wobbly tower! ${esc(ctx.name)} knocks it down immediately, laughing like a tiny godzilla. Ten out of ten.`,
            tip: { head: 'Stacking and smashing both count', body: 'Block play builds fine motor control, spatial reasoning, and early physics. And knocking towers down isn\'t naughty — toddlers are studying cause and effect, with the bonus thrill of being the cause. Build, smash, repeat: that\'s the lesson plan.' }
          });
        }, 600);
      } else {
        later(newBlock, idx === 0 && offset > 60 ? 350 : 250);
      }
    });
    newBlock();
  }

  /* ══════════ AGE 3 — SHAPE SORTER ══════════ */
  function shapeSorter(container, ctx, onDone) {
    const shapes = [
      { id: 'circle',   icon: '🔴', hole: '⭕', name: 'circle' },
      { id: 'square',   icon: '🟦', hole: '⬜', name: 'square' },
      { id: 'triangle', icon: '🔺', hole: '🔻', name: 'triangle' },
      { id: 'star',     icon: '⭐', hole: '✩', name: 'star' }
    ];
    let selected = null, matched = 0, tries = 0;
    const shuffledHoles = [...shapes].sort(() => Math.random() - 0.5);

    const ui = shell(container, 'Shape Sorter',
      `${esc(ctx.name)} dumps out the shape box. Tap a <strong>shape</strong>, then tap its <strong>matching hole</strong>.`,
      `<div style="display:flex;flex-direction:column;gap:18px;padding:18px;width:100%">
         <div style="display:flex;gap:12px;justify-content:center" id="mg-shapes">
           ${shapes.map(s => `<button class="shape-btn" data-shape="${s.id}" aria-label="${s.name} shape">${s.icon}</button>`).join('')}
         </div>
         <div style="display:flex;gap:12px;justify-content:center" id="mg-holes">
           ${shuffledHoles.map(s => `<button class="shape-btn" data-hole="${s.id}" aria-label="${s.name} hole" style="background:#EFE3CC">${s.hole}</button>`).join('')}
         </div>
       </div>`, 'Pick a shape first!');

    ui.board.addEventListener('click', (e) => {
      const sBtn = e.target.closest('[data-shape]');
      const hBtn = e.target.closest('[data-hole]');
      if (sBtn && !sBtn.classList.contains('matched')) {
        ui.board.querySelectorAll('[data-shape]').forEach(b => b.classList.remove('selected'));
        sBtn.classList.add('selected');
        selected = sBtn.dataset.shape;
        Sound.click();
        ui.status.textContent = 'Now find its hole!';
      } else if (hBtn && selected) {
        tries++;
        if (hBtn.dataset.hole === selected) {
          Sound.good();
          matched++;
          const shapeEl = ui.board.querySelector(`[data-shape="${selected}"]`);
          shapeEl.classList.remove('selected');
          shapeEl.classList.add('matched');
          hBtn.classList.add('matched');
          hBtn.textContent = shapeEl.textContent;
          selected = null;
          if (matched >= shapes.length) {
            finish(container, onDone, {
              statKey: 'motor', bonus: 3, energy: 6,
              summary: tries <= 5
                ? `All four shapes, almost no misses — ${esc(ctx.name)} does a victory wiggle!`
                : `All four shapes home safe! ${esc(ctx.name)} immediately dumps the box out to play again.`,
              tip: { head: 'Why shape play matters', body: 'Shape sorting trains visual discrimination, fine-motor precision, and the gloriously frustrating skill of rotating-until-it-fits. When a piece won\'t go, resist grabbing it — narrate instead: "try turning it!" The struggle is the workout.' }
            });
          } else {
            ui.status.textContent = `${matched} of ${shapes.length} matched — keep going!`;
          }
        } else {
          Sound.rough();
          ui.status.textContent = 'Almost! It wiggles but won\'t fit — try another hole.';
        }
      }
    });
  }

  /* ══════════ AGE 4 — FEELING FACES ══════════ */
  function feelingFaces(container, ctx, onDone) {
    const ROUNDS = [
      { mood: 'joy',      answer: 'Happy',      options: ['Happy', 'Angry', 'Sleepy'] },
      { mood: 'sad',      answer: 'Sad',        options: ['Excited', 'Sad', 'Silly'] },
      { mood: 'mad',      answer: 'Angry',      options: ['Angry', 'Scared', 'Happy'] },
      { mood: 'surprised',answer: 'Surprised',  options: ['Sleepy', 'Surprised', 'Grumpy'] },
      { mood: 'shy',      answer: 'Shy',        options: ['Shy', 'Angry', 'Bored'] }
    ];
    let idx = 0, right = 0;
    const ui = shell(container, 'Feeling Faces',
      `${esc(ctx.name)} is playing the feelings game — make a face, guess the feeling. Naming emotions is how kids learn to tame them!`,
      '', '');

    function render() {
      if (idx >= ROUNDS.length) {
        finish(container, onDone, {
          statKey: 'emotion', bonus: 3, energy: 6,
          summary: right >= 4
            ? `${right} of ${ROUNDS.length}! "${esc(ctx.name)}" declares you the Feelings Champion of the house.`
            : `${right} of ${ROUNDS.length} — and a lot of giggling at your guessing faces. Win-win.`,
          tip: { head: 'Name it to tame it', body: 'Kids who can label emotions ("I\'m frustrated!") regulate them dramatically better — naming a feeling literally calms the brain\'s alarm system. Feelings games, emotion words during stories, and narrating your own ("I\'m feeling rushed!") all build the vocabulary.' }
        });
        return;
      }
      const r = ROUNDS[idx];
      const skin = DATA.skins.find(s => s.id === ctx.look.skin) || DATA.skins[1];
      const hair = (DATA.hairs.find(h => h.id === ctx.look.hair) || DATA.hairs[0]).color;
      ui.board.innerHTML = `<svg viewBox="-60 -64 120 124" style="max-width:200px">
          <g>
            <circle cx="0" cy="0" r="40" fill="${skin.color}"/>
            <ellipse cx="-39" cy="2" rx="5" ry="7" fill="${skin.color}"/>
            <ellipse cx="39" cy="2" rx="5" ry="7" fill="${skin.color}"/>
            <g transform="scale(1.16)">${Baby.hair(4, hair)}</g>
            <g transform="scale(1.16)">${Baby.face(r.mood, skin)}</g>
          </g>
        </svg>`;
      ui.status.textContent = `Face ${idx + 1} of ${ROUNDS.length} — what's this feeling?`;
      ui.controls.innerHTML = '';
      const opts = [...r.options].sort(() => Math.random() - 0.5);
      opts.forEach(o => {
        const b = document.createElement('button');
        b.className = 'btn btn-soft';
        b.textContent = o;
        b.addEventListener('click', () => {
          ui.controls.querySelectorAll('button').forEach(x => { x.disabled = true; });
          if (o === r.answer) { right++; Sound.good(); ui.status.textContent = `Yes — ${r.answer.toLowerCase()}!`; }
          else { Sound.okay(); ui.status.textContent = `Good guess! That one was "${r.answer.toLowerCase()}".`; }
          idx++;
          later(render, 900);
        });
        ui.controls.appendChild(b);
      });
    }
    render();
  }

  /* ══════════ AGE 5 — COPY-CAT ══════════ */
  function copyCat(container, ctx, onDone) {
    const PADS = [
      { icon: '🐱', color: '#E0785A' }, { icon: '🐶', color: '#8FB573' },
      { icon: '🐸', color: '#8FBEDC' }, { icon: '🦆', color: '#F2B950' }
    ];
    let seq = [], input = [], round = 0, playing = false, score = 0;
    const ROUNDS = 3;

    const ui = shell(container, 'Copy-Cat',
      `${esc(ctx.name)} invented a game: "I do a pattern, YOU copy it!" Watch the animals light up, then repeat the pattern.`,
      `<div style="display:grid;grid-template-columns:repeat(2,72px);gap:12px;padding:18px;justify-content:center" id="mg-pads">
        ${PADS.map((p, i) => `<button class="simon-btn" data-pad="${i}" style="background:${p.color}22;border-color:${p.color}" aria-label="pad ${i + 1}">${p.icon}</button>`).join('')}
      </div>`, 'Watch closely…');

    function flash(i, d = 420) {
      return new Promise(res => {
        const pad = ui.board.querySelector(`[data-pad="${i}"]`);
        pad.classList.add('lit');
        Sound.simon(i);
        later(() => { pad.classList.remove('lit'); later(res, 150); }, d);
      });
    }
    async function playSeq() {
      playing = true;
      ui.status.textContent = `Pattern ${round + 1} of ${ROUNDS} — watch ${esc(ctx.name)}…`;
      await new Promise(r => later(r, 700));
      for (const i of seq) await flash(i);
      playing = false;
      input = [];
      ui.status.textContent = 'Your turn — copy the pattern!';
    }
    function nextRound() {
      round++;
      if (round > ROUNDS) {
        finish(container, onDone, {
          statKey: 'lang', bonus: 3, energy: 6,
          summary: score === ROUNDS
            ? `Three perfect patterns! ${esc(ctx.name)} immediately invents a 9-step sequence to defeat you.`
            : `${score} of ${ROUNDS} patterns copied — ${esc(ctx.name)} is delighted either way. "AGAIN!"`,
          tip: { head: 'Memory games grow brains', body: 'Copy-the-pattern games train working memory and attention — the same mental muscles behind following instructions and, later, reading. Turn-taking games where the child LEADS are double value: being the teacher is a powerful feeling at five.' }
        });
        return;
      }
      seq = Array.from({ length: round + 1 }, () => Math.floor(Math.random() * 4));
      playSeq();
    }
    ui.board.addEventListener('click', async (e) => {
      const pad = e.target.closest('[data-pad]');
      if (!pad || playing) return;
      const i = +pad.dataset.pad;
      pad.classList.add('lit');
      Sound.simon(i);
      later(() => pad.classList.remove('lit'), 200);
      input.push(i);
      const pos = input.length - 1;
      if (seq[pos] !== i) {
        playing = true;
        Sound.okay();
        ui.status.textContent = `Oops! ${esc(ctx.name)} giggles: "Nooo, like THIS—" (watch again)`;
        later(playSeq, 1100);
        return;
      }
      if (input.length === seq.length) {
        playing = true;
        score++;
        Sound.good();
        ui.status.textContent = '🎉 Perfect copy!';
        later(nextRound, 900);
      }
    });
    nextRound();
  }

  /* ══════════ AGE 6 — WORD BUILDER ══════════ */
  function wordBuilder(container, ctx, onDone) {
    const WORDS = ['CAT', 'SUN', 'DOG'];
    let wIdx = 0, slotPos = 0, mistakes = 0;

    const ui = shell(container, 'Word Builder',
      `${esc(ctx.name)} wants to show off some reading. Tap the letters <strong>in order</strong> to build each word!`, '', '');

    function render() {
      if (wIdx >= WORDS.length) {
        finish(container, onDone, {
          statKey: 'lang', bonus: 3, energy: 6,
          summary: mistakes <= 2
            ? `CAT, SUN, DOG — spelled like a champion! ${esc(ctx.name)} demands you now spell "EXCAVATOR".`
            : `All three words built! Some wrong turns, lots of laughing, zero pressure. That\'s how reading should feel.`,
          tip: { head: 'Keep early reading playful', body: 'At six, the goal isn\'t speed — it\'s the belief that words are toys, not tests. Word games, rhymes, and spotting letters on signs build phonics through play. Follow their energy: five fun minutes beat thirty forced ones, every time.' }
        });
        return;
      }
      const word = WORDS[wIdx];
      const letters = [...word, ...'BLE'.slice(0, 2)].sort(() => Math.random() - 0.5);
      slotPos = 0;
      const pics = { CAT: '🐱', SUN: '☀️', DOG: '🐶' };
      ui.board.innerHTML = `
        <div style="padding:16px;width:100%;text-align:center">
          <div style="font-size:3rem;margin-bottom:8px">${pics[word]}</div>
          <div id="mg-slots">${word.split('').map(() => `<span class="word-slot"></span>`).join('')}</div>
        </div>`;
      ui.status.textContent = `Word ${wIdx + 1} of ${WORDS.length} — what's that picture? Spell it!`;
      ui.controls.innerHTML = '';
      letters.forEach(L => {
        const b = document.createElement('button');
        b.className = 'shape-btn';
        b.textContent = L;
        b.setAttribute('aria-label', `letter ${L}`);
        b.addEventListener('click', () => {
          if (L === word[slotPos]) {
            Sound.pop();
            const slots = ui.board.querySelectorAll('.word-slot');
            slots[slotPos].textContent = L;
            slots[slotPos].classList.add('filled');
            slotPos++;
            b.disabled = true; b.style.opacity = '0.3';
            if (slotPos >= word.length) {
              ui.controls.querySelectorAll('button').forEach(x => { x.disabled = true; });
              Sound.good();
              ui.status.textContent = `${word}! Nailed it!`;
              wIdx++;
              later(render, 1000);
            }
          } else {
            mistakes++;
            Sound.okay();
            ui.status.textContent = `Hmm, not that one next — sound it out: "${word.split('').map((c, i) => i < slotPos ? c : '_').join(' ')}"`;
          }
        });
        ui.controls.appendChild(b);
      });
    }
    render();
  }

  const GAMES = { 1: peekaboo, 2: blockTower, 3: shapeSorter, 4: feelingFaces, 5: copyCat, 6: wordBuilder };

  function start(age, container, ctx, onDone) {
    clearTimers();
    const game = GAMES[age] || peekaboo;
    game(container, ctx, (result) => { clearTimers(); onDone(result); });
  }

  return { start, clearTimers };
})();
