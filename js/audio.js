/* ════════════════════════════════════════════════════════════
   Little Steps — gentle WebAudio sounds (no asset files)
   ════════════════════════════════════════════════════════════ */
'use strict';

const Sound = (() => {
  let ctx = null;
  let enabled = true;

  function ac() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  /* one soft sine/triangle blip */
  function tone(freq, t0, dur, { type = 'sine', vol = 0.12, slide = 0 } = {}) {
    const c = ac();
    if (!c || !enabled) return;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    const start = c.currentTime + t0;
    osc.frequency.setValueAtTime(freq, start);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), start + dur);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(vol, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(gain).connect(c.destination);
    osc.start(start);
    osc.stop(start + dur + 0.05);
  }

  const S = {
    setEnabled(v) { enabled = v; },
    isEnabled() { return enabled; },

    click()    { tone(620, 0, 0.07, { type: 'triangle', vol: 0.07 }); },
    pop()      { tone(440, 0, 0.09, { type: 'sine', vol: 0.1, slide: 220 }); },
    good()     { tone(523, 0, 0.12, { vol: 0.1 }); tone(659, 0.09, 0.12, { vol: 0.1 }); tone(784, 0.18, 0.2, { vol: 0.1 }); },
    okay()     { tone(523, 0, 0.12, { vol: 0.09 }); tone(587, 0.1, 0.18, { vol: 0.09 }); },
    rough()    { tone(330, 0, 0.22, { vol: 0.08, slide: -60 }); tone(262, 0.18, 0.3, { vol: 0.07, slide: -40 }); },
    giggle()   { tone(880, 0, 0.07, { vol: 0.09, slide: 200 }); tone(990, 0.09, 0.07, { vol: 0.09, slide: 220 }); tone(1100, 0.18, 0.09, { vol: 0.09, slide: 240 }); },
    cry()      { tone(490, 0, 0.3, { vol: 0.06, slide: -120 }); tone(470, 0.32, 0.34, { vol: 0.05, slide: -130 }); },
    sparkle()  { tone(1320, 0, 0.1, { vol: 0.07 }); tone(1760, 0.08, 0.14, { vol: 0.06 }); },
    drop()     { tone(300, 0, 0.1, { type: 'triangle', vol: 0.12, slide: -120 }); },
    stack()    { tone(392, 0, 0.08, { type: 'triangle', vol: 0.1 }); tone(523, 0.07, 0.1, { type: 'triangle', vol: 0.09 }); },
    lullaby()  { [392, 440, 392, 330].forEach((f, i) => tone(f, i * 0.28, 0.26, { vol: 0.06 })); },
    birthday() { [523, 523, 587, 523, 698, 659].forEach((f, i) => tone(f, i * 0.22, 0.2, { vol: 0.1 })); },
    fanfare()  { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.3, { vol: 0.1 })); },
    simon(i)   { tone([330, 392, 494, 587][i % 4], 0, 0.24, { vol: 0.12 }); }
  };
  return S;
})();
