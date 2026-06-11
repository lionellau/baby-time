/* ════════════════════════════════════════════════════════════
   Little Steps — SVG child renderer, parent figure,
   scenario items & location backdrops
   ════════════════════════════════════════════════════════════ */
'use strict';

const Baby = (() => {

  /* outfit colors per age */
  const OUTFITS = {
    1: { main: '#FFB7A0', trim: '#F2937B' },
    2: { main: '#FFD27D', trim: '#EBB45A' },
    3: { main: '#A8D08D', trim: '#8BB573' },
    4: { main: '#92C5E8', trim: '#6FA8CE' },
    5: { main: '#C9A8DC', trim: '#AD88C4' },
    6: { main: '#F2A0B5', trim: '#D97F97' }
  };

  /* ── face parts per mood (head centered at 0,0 r=34) ── */
  function faceSVG(mood, skin) {
    const eyeY = -2, eyeDX = 13;
    let eyes = '', brows = '', mouth = '', extra = '';
    const openEye = (dx) => `<circle cx="${dx}" cy="${eyeY}" r="3.6" fill="#3A2C22"/><circle cx="${dx + 1.2}" cy="${eyeY - 1.2}" r="1.2" fill="#fff"/>`;
    const happyEye = (dx) => `<path d="M ${dx - 4.5} ${eyeY + 1} Q ${dx} ${eyeY - 5} ${dx + 4.5} ${eyeY + 1}" stroke="#3A2C22" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    const sadShutEye = (dx) => `<path d="M ${dx - 4.5} ${eyeY - 1} Q ${dx} ${eyeY + 4} ${dx + 4.5} ${eyeY - 1}" stroke="#3A2C22" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    const sleepEye = (dx) => `<path d="M ${dx - 4.5} ${eyeY + 1} L ${dx + 4.5} ${eyeY + 1}" stroke="#3A2C22" stroke-width="2.6" stroke-linecap="round"/>`;

    switch (mood) {
      case 'joy':
        eyes = happyEye(-eyeDX) + happyEye(eyeDX);
        mouth = `<path d="M -9 12 Q 0 24 9 12 Z" fill="#8C4A3C"/><path d="M -6 16.5 Q 0 21 6 16.5 Q 0 19.5 -6 16.5" fill="#E58D7E"/>`;
        break;
      case 'proud':
        eyes = happyEye(-eyeDX) + happyEye(eyeDX);
        mouth = `<path d="M -8 12 Q 0 20 8 12" stroke="#8C4A3C" stroke-width="3" fill="none" stroke-linecap="round"/>`;
        break;
      case 'happy':
        eyes = openEye(-eyeDX) + openEye(eyeDX);
        mouth = `<path d="M -7 12 Q 0 19 7 12" stroke="#8C4A3C" stroke-width="3" fill="none" stroke-linecap="round"/>`;
        break;
      case 'curious':
        eyes = openEye(-eyeDX) + openEye(eyeDX);
        brows = `<path d="M -18 -12 Q -13 -15 -8 -13" stroke="#3A2C22" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M 8 -15 Q 13 -18 18 -14" stroke="#3A2C22" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
        mouth = `<ellipse cx="0" cy="14" rx="4" ry="5" fill="#8C4A3C"/>`;
        break;
      case 'surprised':
        eyes = `<circle cx="${-eyeDX}" cy="${eyeY}" r="4.6" fill="#3A2C22"/><circle cx="${-eyeDX + 1.4}" cy="${eyeY - 1.4}" r="1.5" fill="#fff"/><circle cx="${eyeDX}" cy="${eyeY}" r="4.6" fill="#3A2C22"/><circle cx="${eyeDX + 1.4}" cy="${eyeY - 1.4}" r="1.5" fill="#fff"/>`;
        brows = `<path d="M -18 -14 Q -13 -17 -8 -15" stroke="#3A2C22" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M 8 -15 Q 13 -17 18 -14" stroke="#3A2C22" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
        mouth = `<ellipse cx="0" cy="15" rx="5.5" ry="6.5" fill="#8C4A3C"/>`;
        break;
      case 'neutral':
        eyes = openEye(-eyeDX) + openEye(eyeDX);
        mouth = `<path d="M -5 14 Q 0 16 5 14" stroke="#8C4A3C" stroke-width="3" fill="none" stroke-linecap="round"/>`;
        break;
      case 'sad':
        eyes = openEye(-eyeDX) + openEye(eyeDX);
        brows = `<path d="M -17 -13 Q -12 -11 -8 -9" stroke="#3A2C22" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M 8 -9 Q 12 -11 17 -13" stroke="#3A2C22" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
        mouth = `<path d="M -6 17 Q 0 11 6 17" stroke="#8C4A3C" stroke-width="3" fill="none" stroke-linecap="round"/>`;
        break;
      case 'cry':
        eyes = sadShutEye(-eyeDX) + sadShutEye(eyeDX);
        brows = `<path d="M -17 -13 Q -12 -11 -8 -9" stroke="#3A2C22" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M 8 -9 Q 12 -11 17 -13" stroke="#3A2C22" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
        mouth = `<path d="M -8 13 Q 0 9 8 13 Q 6 22 0 22 Q -6 22 -8 13 Z" fill="#8C4A3C"/>`;
        extra = `<g class="tears"><ellipse cx="${-eyeDX - 6}" cy="8" rx="2.4" ry="4" fill="#9CD2F0"/><ellipse cx="${eyeDX + 6}" cy="8" rx="2.4" ry="4" fill="#9CD2F0"/></g>`;
        break;
      case 'mad':
        eyes = openEye(-eyeDX) + openEye(eyeDX);
        brows = `<path d="M -18 -10 L -8 -14" stroke="#3A2C22" stroke-width="2.6" stroke-linecap="round"/><path d="M 8 -14 L 18 -10" stroke="#3A2C22" stroke-width="2.6" stroke-linecap="round"/>`;
        mouth = `<path d="M -6 16 Q 0 12 6 16" stroke="#8C4A3C" stroke-width="3" fill="none" stroke-linecap="round"/>`;
        break;
      case 'sleepy':
        eyes = sleepEye(-eyeDX) + sleepEye(eyeDX);
        mouth = `<ellipse cx="0" cy="15" rx="3" ry="3.6" fill="#8C4A3C"/>`;
        break;
      case 'shy':
        eyes = `<circle cx="${-eyeDX}" cy="${eyeY + 2}" r="3.2" fill="#3A2C22"/><circle cx="${eyeDX}" cy="${eyeY + 2}" r="3.2" fill="#3A2C22"/>`;
        mouth = `<path d="M -5 13 Q 0 17 5 13" stroke="#8C4A3C" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
        break;
      default:
        eyes = openEye(-eyeDX) + openEye(eyeDX);
        mouth = `<path d="M -7 12 Q 0 19 7 12" stroke="#8C4A3C" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    }
    const blush = (mood === 'shy' || mood === 'joy' || mood === 'proud' || mood === 'happy')
      ? `<ellipse cx="-21" cy="9" rx="5.5" ry="3.5" fill="${skin.cheek}" opacity="0.75"/><ellipse cx="21" cy="9" rx="5.5" ry="3.5" fill="${skin.cheek}" opacity="0.75"/>`
      : `<ellipse cx="-21" cy="9" rx="5" ry="3" fill="${skin.cheek}" opacity="0.4"/><ellipse cx="21" cy="9" rx="5" ry="3" fill="${skin.cheek}" opacity="0.4"/>`;
    /* open-eyed moods blink every few seconds — keeps the child feeling alive */
    const blinkable = !['joy', 'proud', 'cry', 'sleepy'].includes(mood);
    const eyesOut = blinkable ? `<g class="blink">${eyes}</g>` : eyes;
    return brows + eyesOut + blush + mouth + extra;
  }

  /* hair grows with age */
  function hairSVG(age, hairColor) {
    if (age <= 1) {
      return `<path d="M -3 -34 Q 0 -44 8 -41 Q 2 -40 4 -33 Z" fill="${hairColor}"/>`;
    } else if (age === 2) {
      return `<path d="M -20 -26 Q -14 -40 0 -40 Q 14 -40 20 -26 Q 12 -33 0 -33 Q -12 -33 -20 -26 Z" fill="${hairColor}"/>
              <path d="M -2 -38 Q 2 -46 10 -42 Q 3 -41 5 -35 Z" fill="${hairColor}"/>`;
    } else if (age <= 4) {
      return `<path d="M -26 -18 Q -26 -42 0 -42 Q 26 -42 26 -18 Q 20 -30 8 -31 Q 14 -36 6 -38 Q -2 -33 -12 -32 Q -22 -30 -26 -18 Z" fill="${hairColor}"/>`;
    }
    return `<path d="M -28 -12 Q -30 -44 0 -44 Q 30 -44 28 -12 Q 25 -22 18 -28 Q 20 -33 12 -36 Q 4 -39 -6 -36 Q -16 -34 -20 -28 Q -26 -22 -28 -12 Z" fill="${hairColor}"/>`;
  }

  /* ── mood bubble floating over the child's head ── */
  function bubbleSVG(mood) {
    const sym = {
      joy: `<text x="0" y="0" font-size="20" font-weight="900" fill="#E0A030" font-family="Nunito,sans-serif">♪</text><text x="14" y="-12" font-size="14" font-weight="900" fill="#E0A030" font-family="Nunito,sans-serif">♪</text>`,
      proud: `<path d="M 0 -12 l 3.2 7 7.6 0.8 -5.6 5 1.6 7.4 -6.8 -3.8 -6.8 3.8 1.6 -7.4 -5.6 -5 7.6 -0.8 Z" fill="#F2B950"/>`,
      happy: `<path d="M 0 2 C -2 -3 -9 -3 -9 2 C -9 6 -4 9 0 12 C 4 9 9 6 9 2 C 9 -3 2 -3 0 2 Z" fill="#E8716B"/>`,
      shy: `<path d="M 0 2 C -1.6 -2 -7 -2 -7 2 C -7 5 -3 7.5 0 10 C 3 7.5 7 5 7 2 C 7 -2 1.6 -2 0 2 Z" fill="#F2A0B5"/>`,
      curious: `<text x="0" y="6" font-size="26" font-weight="900" fill="#5E92B4" font-family="Nunito,sans-serif" text-anchor="middle">?</text>`,
      surprised: `<text x="0" y="6" font-size="26" font-weight="900" fill="#E0785A" font-family="Nunito,sans-serif" text-anchor="middle">!</text>`,
      sad: `<path d="M 0 -6 Q 6 4 6 8 A 6 6 0 1 1 -6 8 Q -6 4 0 -6 Z" fill="#9CD2F0"/>`,
      cry: `<path d="M -6 -8 Q -1 0 -1 3 A 5 5 0 1 1 -11 3 Q -11 0 -6 -8 Z" fill="#9CD2F0"/><path d="M 8 -4 Q 13 4 13 7 A 5 5 0 1 1 3 7 Q 3 4 8 -4 Z" fill="#9CD2F0"/>`,
      mad: `<g stroke="#E0584A" stroke-width="3" stroke-linecap="round" fill="none"><path d="M -8 -8 Q -2 -5 -8 -2"/><path d="M 8 -8 Q 2 -5 8 -2"/><path d="M -3 -12 Q 0 -7 3 -12"/></g>`,
      sleepy: `<text x="0" y="0" font-size="16" font-weight="900" fill="#8FBEDC" font-family="Nunito,sans-serif">z</text><text x="12" y="-12" font-size="12" font-weight="900" fill="#8FBEDC" font-family="Nunito,sans-serif">z</text>`,
      neutral: ''
    }[mood] || '';
    if (!sym) return '';
    return `<g class="mood-bubble" transform="translate(44 -64)">${sym}</g>`;
  }

  /* ── the child (sitting at age 1, standing after) ── */
  function childSVG(opts, mood, age, withBubble) {
    const skin = DATA.skins.find(s => s.id === opts.skin) || DATA.skins[1];
    const hair = (DATA.hairs.find(h => h.id === opts.hair) || DATA.hairs[0]).color;
    const fit = OUTFITS[age] || OUTFITS[1];
    const animClass = ({
      joy: 'anim-bounce', proud: 'anim-bounce', happy: 'anim-idle', curious: 'anim-idle',
      surprised: 'anim-idle', neutral: 'anim-idle', sad: 'anim-idle', cry: 'anim-cry',
      mad: 'anim-wiggle', sleepy: 'anim-sleepy', shy: 'anim-idle'
    })[mood] || 'anim-idle';

    const bodyH = 34 + age * 6;
    const headCY = 100 - bodyH - 26;

    let body;
    if (age === 1) {
      body = `
        <ellipse cx="0" cy="86" rx="30" ry="17" fill="${fit.main}"/>
        <ellipse cx="-20" cy="94" rx="11" ry="7" fill="${skin.color}"/>
        <ellipse cx="20" cy="94" rx="11" ry="7" fill="${skin.color}"/>
        <path d="M -24 62 Q 0 52 24 62 L 27 86 Q 0 96 -27 86 Z" fill="${fit.main}"/>
        <path d="M -24 64 Q -34 70 -32 80" stroke="${skin.color}" stroke-width="10" fill="none" stroke-linecap="round"/>
        <path d="M 24 64 Q 34 70 32 80" stroke="${skin.color}" stroke-width="10" fill="none" stroke-linecap="round"/>`;
    } else {
      const legL = 12 + age * 2.4;
      const hipY = 100 - legL;
      const armRaise = (mood === 'joy' || mood === 'proud')
        ? `<path d="M -22 ${hipY - 22} Q -34 ${hipY - 34} -30 ${hipY - 42}" stroke="${skin.color}" stroke-width="9" fill="none" stroke-linecap="round"/>
           <path d="M 22 ${hipY - 22} Q 34 ${hipY - 34} 30 ${hipY - 42}" stroke="${skin.color}" stroke-width="9" fill="none" stroke-linecap="round"/>`
        : `<path d="M -21 ${hipY - 24} Q -29 ${hipY - 14} -27 ${hipY - 4}" stroke="${skin.color}" stroke-width="9" fill="none" stroke-linecap="round"/>
           <path d="M 21 ${hipY - 24} Q 29 ${hipY - 14} 27 ${hipY - 4}" stroke="${skin.color}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
      body = `
        <rect x="-13" y="${hipY}" width="9" height="${legL}" rx="4.5" fill="${skin.color}"/>
        <rect x="4" y="${hipY}" width="9" height="${legL}" rx="4.5" fill="${skin.color}"/>
        <ellipse cx="-8.5" cy="99" rx="8" ry="4.5" fill="${fit.trim}"/>
        <ellipse cx="8.5" cy="99" rx="8" ry="4.5" fill="${fit.trim}"/>
        <path d="M -20 ${hipY - 30} Q 0 ${hipY - 38} 20 ${hipY - 30} L 17 ${hipY + 2} Q 0 ${hipY + 8} -17 ${hipY + 2} Z" fill="${fit.main}"/>
        ${armRaise}`;
    }

    return `
      <g class="baby-rig ${animClass}">
        ${body}
        <g transform="translate(0 ${headCY})">
          <circle cx="0" cy="0" r="34" fill="${skin.color}"/>
          <ellipse cx="-33" cy="2" rx="4.5" ry="6" fill="${skin.color}"/>
          <ellipse cx="33" cy="2" rx="4.5" ry="6" fill="${skin.color}"/>
          ${hairSVG(age, hair)}
          ${faceSVG(mood, skin)}
          ${withBubble ? bubbleSVG(mood) : ''}
        </g>
      </g>`;
  }

  /* ── parent figure: poses kneel / stand / far ── */
  function parentSVG(look, pose) {
    const skin = DATA.skins.find(s => s.id === look.skin) || DATA.skins[1];
    const hair = (DATA.hairs.find(h => h.id === look.hair) || DATA.hairs[0]).color;
    const shirt = '#7FA8C9', pants = '#5E7A93';
    const face = (kind) => {
      const eyes = `<circle cx="-9" cy="-2" r="2.6" fill="#3A2C22"/><circle cx="9" cy="-2" r="2.6" fill="#3A2C22"/>`;
      const happyEyes = `<path d="M -12 -1 Q -9 -5 -6 -1" stroke="#3A2C22" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M 6 -1 Q 9 -5 12 -1" stroke="#3A2C22" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
      const mouths = {
        smile: `<path d="M -5 9 Q 0 14 5 9" stroke="#8C4A3C" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
        soft: `<path d="M -4 10 Q 0 12.5 4 10" stroke="#8C4A3C" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
        flat: `<path d="M -4 10 L 4 10" stroke="#8C4A3C" stroke-width="2.4" stroke-linecap="round"/>`
      };
      return (kind === 'smile' ? happyEyes : eyes) + (mouths[kind] || mouths.soft);
    };
    const head = (kind) => `
      <circle cx="0" cy="0" r="24" fill="${skin.color}"/>
      <path d="M -24 -4 Q -24 -28 0 -28 Q 24 -28 24 -4 Q 18 -16 6 -18 Q -8 -20 -16 -14 Q -22 -10 -24 -4 Z" fill="${hair}"/>
      <path d="M -25 -2 Q -28 8 -23 12 L -22 0 Z" fill="${hair}"/>
      <path d="M 25 -2 Q 28 8 23 12 L 22 0 Z" fill="${hair}"/>
      ${face(kind)}`;

    if (pose === 'kneel') {
      /* kneeling, arms reaching toward the child (to the right) */
      return `
      <g class="parent-rig anim-idle parent-enter">
        <path d="M -16 100 Q -18 84 -4 82 L 14 84 Q 24 86 22 96 L 18 100 Z" fill="${pants}"/>
        <ellipse cx="-12" cy="99" rx="9" ry="4.5" fill="#4A5A68"/>
        <ellipse cx="16" cy="99" rx="8" ry="4.5" fill="#4A5A68"/>
        <path d="M -14 84 Q -16 52 4 50 L 12 52 Q 22 56 18 84 Z" fill="${shirt}"/>
        <path d="M 10 60 Q 28 64 38 74" stroke="${skin.color}" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M 6 66 Q 22 74 32 84" stroke="${skin.color}" stroke-width="8" fill="none" stroke-linecap="round"/>
        <g transform="translate(2 32)">${head('smile')}</g>
      </g>`;
    }
    const mouthKind = pose === 'far' ? 'flat' : 'soft';
    /* standing */
    return `
    <g class="parent-rig anim-idle">
      <rect x="-12" y="46" width="10" height="50" rx="5" fill="${pants}"/>
      <rect x="3" y="46" width="10" height="50" rx="5" fill="${pants}"/>
      <ellipse cx="-7" cy="98" rx="9" ry="4.5" fill="#4A5A68"/>
      <ellipse cx="8" cy="98" rx="9" ry="4.5" fill="#4A5A68"/>
      <path d="M -16 -2 Q 0 -8 16 -2 L 14 50 Q 0 55 -14 50 Z" fill="${shirt}"/>
      <path d="M -14 6 Q -24 18 -20 34" stroke="${skin.color}" stroke-width="8" fill="none" stroke-linecap="round"/>
      ${pose === 'far'
        ? `<path d="M 14 6 Q 24 18 20 34" stroke="${skin.color}" stroke-width="8" fill="none" stroke-linecap="round"/>`
        : `<path d="M 14 6 Q 26 14 30 26" stroke="${skin.color}" stroke-width="8" fill="none" stroke-linecap="round"/>`}
      <g transform="translate(0 -26)">${head(mouthKind)}</g>
    </g>`;
  }

  /* ════════ ITEMS — drawn near the child (local origin at floor) ════════ */
  const ITEMS = {
    rattle: () => `<ellipse cx="0" cy="-8" rx="11" ry="11" fill="#F2B950"/><rect x="-3" y="0" width="6" height="16" rx="3" fill="#E0785A"/><circle cx="0" cy="-8" r="4" fill="#FDF6E9"/>`,
    book: () => `<g transform="rotate(-8)"><rect x="-26" y="-34" width="52" height="38" rx="4" fill="#E0785A"/><rect x="-21" y="-30" width="42" height="30" rx="2" fill="#FDF6E9"/><circle cx="-8" cy="-17" r="6" fill="#F2B950"/><path d="M 2 -24 q 8 6 14 0 M 2 -14 h 14" stroke="#8FB573" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M 0 -34 V 4" stroke="#C5603F" stroke-width="2"/></g>`,
    highchair: () => `<rect x="-30" y="-66" width="60" height="10" rx="5" fill="#D9A06B"/><rect x="-26" y="-58" width="52" height="6" fill="#C68753"/><path d="M -26 -56 L -34 0 M 26 -56 L 34 0" stroke="#C68753" stroke-width="7" stroke-linecap="round"/><circle cx="-8" cy="-63" r="4" fill="#F2D14F"/><circle cx="4" cy="-62" r="3.4" fill="#F2D14F"/><ellipse cx="14" cy="6" rx="6" ry="2.5" fill="#F2D14F"/><ellipse cx="-18" cy="8" rx="5" ry="2" fill="#F2D14F"/>`,
    cushions: () => `<ellipse cx="0" cy="-6" rx="30" ry="12" fill="#B287B8"/><ellipse cx="-12" cy="-18" rx="22" ry="10" fill="#8FBEDC"/><ellipse cx="14" cy="-22" rx="18" ry="9" fill="#F2B950"/>`,
    crib: () => `<rect x="-44" y="-50" width="88" height="44" rx="6" fill="#D9A06B"/><rect x="-40" y="-72" width="6" height="70" rx="3" fill="#C68753"/><rect x="34" y="-72" width="6" height="70" rx="3" fill="#C68753"/><rect x="-44" y="-74" width="88" height="8" rx="4" fill="#C68753"/>${[-26, -12, 2, 16].map(x => `<rect x="${x}" y="-64" width="5" height="18" rx="2.5" fill="#C68753"/>`).join('')}<ellipse cx="0" cy="-46" rx="34" ry="8" fill="#FDF6E9"/>`,
    dog: () => `<g class="anim-wiggle"><ellipse cx="0" cy="-14" rx="24" ry="14" fill="#C98F4E"/><circle cx="22" cy="-26" r="12" fill="#C98F4E"/><path d="M 14 -36 Q 10 -46 18 -44 Z" fill="#B57F40"/><path d="M 30 -36 Q 34 -46 26 -44 Z" fill="#B57F40"/><circle cx="26" cy="-28" r="2" fill="#3A2C22"/><circle cx="32" cy="-24" r="2.6" fill="#3A2C22"/><path d="M -22 -22 Q -32 -30 -28 -16" stroke="#C98F4E" stroke-width="6" fill="none" stroke-linecap="round"/><rect x="-14" y="-6" width="6" height="8" rx="3" fill="#B57F40"/><rect x="8" y="-6" width="6" height="8" rx="3" fill="#B57F40"/></g>`,
    pots: () => `<ellipse cx="-14" cy="-8" rx="18" ry="10" fill="#9AA5B1"/><rect x="-32" y="-22" width="36" height="16" rx="4" fill="#B8C2CC"/><rect x="6" y="-14" width="30" height="12" rx="4" fill="#9AA5B1"/><ellipse cx="21" cy="-16" rx="15" ry="5" fill="#CDD6DE"/><circle cx="21" cy="-19" r="3" fill="#7A8794"/><path d="M -38 -30 l 4 -6 M -28 -34 l 1 -7 M -18 -32 l -3 -6" stroke="#A99A8D" stroke-width="2.4" stroke-linecap="round"/>`,
    tabletBasket: () => `<path d="M -34 -22 L -28 2 H 8 L 14 -22 Z" fill="#C98F4E"/><path d="M -34 -22 H 14" stroke="#B57F40" stroke-width="4"/><circle cx="-22" cy="-26" r="7" fill="#E0785A"/><rect x="-14" y="-32" width="12" height="12" rx="3" fill="#8FB573"/><circle cx="4" cy="-27" r="6" fill="#F2B950"/><g transform="translate(34 -12) rotate(12)"><rect x="-12" y="-18" width="24" height="34" rx="4" fill="#3A3F47"/><rect x="-9" y="-14" width="18" height="24" rx="2" fill="#8FBEDC"/></g>`,
    tablet: () => `<g transform="rotate(-6)"><rect x="-24" y="-38" width="48" height="34" rx="5" fill="#3A3F47"/><rect x="-19" y="-33" width="38" height="24" rx="2" fill="#8FBEDC"/><path d="M -8 -27 l 12 6 -12 6 Z" fill="#FDF6E9"/></g>`,
    cart: () => `<path d="M -30 -56 L -24 -18 H 22 L 30 -50 H -26" stroke="#8A95A1" stroke-width="4" fill="none" stroke-linejoin="round"/><path d="M -24 -18 H 22" stroke="#8A95A1" stroke-width="4"/><circle cx="-16" cy="-8" r="6" fill="#5E6B77"/><circle cx="14" cy="-8" r="6" fill="#5E6B77"/><rect x="-18" y="-46" width="14" height="10" rx="2" fill="#E0785A"/><rect x="-2" y="-50" width="12" height="14" rx="2" fill="#8FB573"/><rect x="10" y="-44" width="10" height="8" rx="2" fill="#F2B950"/>`,
    shirts: () => `<g transform="rotate(-5)"><path d="M -30 -40 L -20 -46 H -2 L 8 -40 L 2 -32 L -2 -36 V -10 H -20 V -36 L -24 -32 Z" fill="#E0584A"/></g><g transform="translate(26 2) rotate(6)"><path d="M -14 -36 L -6 -41 H 8 L 16 -36 L 12 -29 L 8 -32 V -8 H -6 V -32 L -10 -29 Z" fill="#8FB573"/><circle cx="1" cy="-22" r="6" fill="#5E8A4A"/></g>`,
    sandbox: () => `<path d="M -44 0 L -36 -16 H 36 L 44 0 Z" fill="#D9A06B"/><ellipse cx="0" cy="-14" rx="32" ry="7" fill="#F2DBA8"/><path d="M 10 -18 l 4 -14 6 1 -3 14 Z" fill="#E0785A"/><ellipse cx="14" cy="-32" rx="7" ry="4" fill="#C5603F"/><path d="M -22 -18 q 4 -8 12 -6" stroke="#8FBEDC" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    plate: () => `<rect x="-40" y="-38" width="80" height="8" rx="4" fill="#D9A06B"/><path d="M -34 -30 L -38 0 M 34 -30 L 38 0" stroke="#C68753" stroke-width="6" stroke-linecap="round"/><ellipse cx="0" cy="-42" rx="22" ry="6" fill="#FDFDFB"/><path d="M -8 -48 q 2 -6 8 -4 q 6 -2 6 4 Z" fill="#8FB573"/><circle cx="-3" cy="-50" r="3.4" fill="#7CA05F"/><circle cx="5" cy="-49" r="3" fill="#7CA05F"/><path d="M -16 -44 q 6 -3 10 0" stroke="#F2D14F" stroke-width="3" fill="none"/>`,
    potty: () => `<ellipse cx="0" cy="-4" rx="24" ry="9" fill="#8FBEDC"/><path d="M -24 -4 Q -24 -28 0 -28 Q 24 -28 24 -4 Z" fill="#A8CDE6"/><ellipse cx="0" cy="-26" rx="17" ry="5" fill="#FDF6E9"/><rect x="-28" y="-22" width="8" height="10" rx="4" fill="#8FBEDC"/>`,
    sofa: () => `<rect x="-50" y="-44" width="100" height="34" rx="10" fill="#B28778"/><rect x="-50" y="-22" width="100" height="20" rx="8" fill="#A1786A"/><rect x="-58" y="-40" width="14" height="38" rx="7" fill="#A1786A"/><rect x="44" y="-40" width="14" height="38" rx="7" fill="#A1786A"/><rect x="-40" y="-40" width="36" height="16" rx="6" fill="#C49384"/><rect x="2" y="-40" width="36" height="16" rx="6" fill="#C49384"/>`,
    truck: () => `<g class="anim-idle"><rect x="-34" y="-30" width="44" height="22" rx="4" fill="#E0584A"/><path d="M 10 -26 H 28 L 34 -14 V -8 H 10 Z" fill="#C74436"/><rect x="14" y="-23" width="11" height="8" rx="2" fill="#BFE3F5"/><circle cx="-20" cy="-6" r="8" fill="#3A3F47"/><circle cx="-20" cy="-6" r="3.4" fill="#9AA5B1"/><circle cx="22" cy="-6" r="8" fill="#3A3F47"/><circle cx="22" cy="-6" r="3.4" fill="#9AA5B1"/></g>`,
    bed: () => `<rect x="-50" y="-36" width="100" height="30" rx="6" fill="#D9A06B"/><rect x="-56" y="-52" width="10" height="48" rx="5" fill="#C68753"/><rect x="46" y="-44" width="10" height="40" rx="5" fill="#C68753"/><rect x="-46" y="-42" width="92" height="14" rx="7" fill="#B287B8"/><ellipse cx="-28" cy="-42" rx="14" ry="7" fill="#FDF6E9"/>`,
    messy: () => `<rect x="-36" y="-12" width="14" height="12" rx="3" fill="#E0785A" transform="rotate(-14 -29 -6)"/><circle cx="-8" cy="-6" r="7" fill="#F2B950"/><rect x="4" y="-10" width="12" height="10" rx="2" fill="#8FB573" transform="rotate(10 10 -5)"/><path d="M 22 -4 q 6 -10 14 -2" stroke="#8FBEDC" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="34" cy="-16" r="5" fill="#B287B8"/>`,
    penguin: () => `<g opacity="0.65" class="anim-idle"><ellipse cx="0" cy="-18" rx="16" ry="20" fill="#3D4A6B"/><ellipse cx="0" cy="-14" rx="10" ry="13" fill="#FDFDFB"/><circle cx="-5" cy="-30" r="2.2" fill="#FDFDFB"/><circle cx="5" cy="-30" r="2.2" fill="#FDFDFB"/><circle cx="-5" cy="-30" r="1.1" fill="#3A2C22"/><circle cx="5" cy="-30" r="1.1" fill="#3A2C22"/><path d="M -3 -26 L 0 -22 L 3 -26 Z" fill="#F2B950"/><path d="M -8 -2 h 5 M 3 -2 h 5" stroke="#F2B950" stroke-width="3" stroke-linecap="round"/></g><ellipse cx="22" cy="-4" rx="9" ry="3" fill="#FDFDFB"/><path d="M 18 -8 Q 22 -12 26 -8 Z" fill="#B287B8"/>`,
    scribble: () => `<g stroke-linecap="round" fill="none"><path d="M -30 -70 Q -18 -90 -4 -72 Q 8 -88 20 -70" stroke="#E0584A" stroke-width="4"/><path d="M -26 -60 Q -10 -50 6 -60 Q 18 -66 28 -56" stroke="#5E92B4" stroke-width="4"/><path d="M -18 -46 q 8 -8 16 0 q -8 8 -16 0" stroke="#8FB573" stroke-width="4"/></g><rect x="-4" y="-18" width="8" height="18" rx="3" fill="#E0785A"/><path d="M 0 -24 L -4 -18 H 4 Z" fill="#F2C4B4"/>`,
    closet: () => `<rect x="-30" y="-92" width="60" height="88" rx="5" fill="#C68753"/><rect x="-26" y="-88" width="24" height="80" rx="3" fill="#8C5E33"/><rect x="2" y="-88" width="24" height="80" rx="3" fill="#9C6B3D"/><circle cx="-8" cy="-46" r="2.6" fill="#F2B950"/><circle cx="8" cy="-46" r="2.6" fill="#F2B950"/><path d="M -26 -88 L -2 -48 V -8 L -26 -8 Z" fill="#3A2C22" opacity="0.35"/>`,
    slide: () => `<path d="M -40 -70 L -28 -70 L 16 -8 L 4 -8 Z" fill="#F2B950"/><path d="M -40 -70 L -44 0 M -28 -70 L -24 0" stroke="#E0785A" stroke-width="5" stroke-linecap="round"/><path d="M -52 -38 H -38 M -52 -22 H -36" stroke="#E0785A" stroke-width="4" stroke-linecap="round"/>`,
    bowl: () => `<rect x="-42" y="-36" width="84" height="8" rx="4" fill="#D9A06B"/><path d="M -36 -28 L -40 0 M 36 -28 L 40 0" stroke="#C68753" stroke-width="6" stroke-linecap="round"/><path d="M -20 -40 Q -20 -54 0 -54 Q 20 -54 20 -40 Q 20 -36 0 -36 Q -20 -36 -20 -40 Z" fill="#8FBEDC"/><ellipse cx="0" cy="-52" rx="14" ry="4" fill="#F2E3C0"/><path d="M 10 -58 l 14 -10" stroke="#C68753" stroke-width="4" stroke-linecap="round"/>`,
    cookiejar: () => `<rect x="-40" y="-34" width="80" height="8" rx="4" fill="#D9A06B"/><path d="M -34 -26 L -38 0 M 34 -26 L 38 0" stroke="#C68753" stroke-width="6" stroke-linecap="round"/><path d="M -16 -38 Q -18 -62 0 -62 Q 18 -62 16 -38 Z" fill="#A8CDE6"/><ellipse cx="0" cy="-62" rx="10" ry="4" fill="#8FBEDC"/><rect x="-4" y="-70" width="8" height="6" rx="3" fill="#8FBEDC"/><circle cx="-2" cy="-46" r="5" fill="#C98F4E"/><circle cx="-3.4" cy="-47.4" r="1" fill="#6B4226"/><circle cx="0.4" cy="-44.6" r="1" fill="#6B4226"/>`,
    bluecup: () => `<rect x="-40" y="-34" width="80" height="8" rx="4" fill="#D9A06B"/><path d="M -34 -26 L -38 0 M 34 -26 L 38 0" stroke="#C68753" stroke-width="6" stroke-linecap="round"/><path d="M -9 -56 L -7 -36 H 7 L 9 -56 Z" fill="#5E92B4"/><path d="M 9 -53 q 8 1 6 8 q -1 5 -7 4" stroke="#5E92B4" stroke-width="3" fill="none"/><ellipse cx="0" cy="-56" rx="9" ry="3" fill="#8FBEDC"/>`,
    puzzle: () => `<g transform="rotate(-4)"><rect x="-30" y="-26" width="60" height="24" rx="4" fill="#FDFDFB" stroke="#E4D5BC" stroke-width="2"/><path d="M -10 -26 V -2 M 10 -26 V -2 M -30 -14 H 30" stroke="#E4D5BC" stroke-width="2"/><rect x="-28" y="-24" width="16" height="9" rx="2" fill="#8FBEDC"/><rect x="-8" y="-24" width="16" height="9" rx="2" fill="#8FB573"/><rect x="12" y="-12" width="16" height="8" rx="2" fill="#F2B950"/></g><rect x="34" y="-14" width="11" height="9" rx="2" fill="#E0785A" transform="rotate(18 39 -10)"/>`,
    boardgame: () => `<g transform="rotate(-22)"><rect x="-26" y="-20" width="52" height="36" rx="4" fill="#8FB573"/><path d="M -18 -12 H 18 M -18 -2 H 18 M -18 8 H 18" stroke="#FDF6E9" stroke-width="3"/></g><circle cx="-34" cy="-6" r="5" fill="#E0584A"/><circle cx="30" cy="-26" r="5" fill="#F2B950"/><rect x="20" y="-8" width="9" height="9" rx="2" fill="#5E92B4" transform="rotate(24 24 -4)"/>`,
    sockshoe: () => `<path d="M -28 -22 Q -28 -34 -18 -34 L -16 -16 Q -16 -8 -24 -8 Q -32 -8 -28 -22 Z" fill="#F2B950"/><path d="M -18 -34 L -16 -16" stroke="#E0A030" stroke-width="2"/><path d="M 6 -6 Q 4 -22 16 -22 Q 24 -22 26 -14 L 38 -10 Q 42 -6 36 -4 Z" fill="#E0785A"/><path d="M 12 -18 l 6 4 M 16 -22 l 6 6" stroke="#FDF6E9" stroke-width="2.4" stroke-linecap="round"/>`,
    doorbag: () => `<rect x="-26" y="-92" width="52" height="90" rx="4" fill="#C68753"/><rect x="-20" y="-86" width="40" height="78" rx="3" fill="#D9A06B"/><circle cx="12" cy="-46" r="3.4" fill="#F2B950"/><path d="M 34 -34 Q 30 -50 44 -50 Q 58 -50 54 -34 Z" fill="#B287B8"/><rect x="32" y="-36" width="26" height="32" rx="5" fill="#C49BCB"/>`,
    cereal: () => `<g transform="rotate(-24)"><rect x="-12" y="-44" width="30" height="42" rx="4" fill="#E0785A"/><circle cx="3" cy="-28" r="8" fill="#F2B950"/><text x="3" y="-10" font-size="8" font-weight="900" fill="#FDF6E9" text-anchor="middle" font-family="Nunito,sans-serif">YUM</text></g>${[-30, -18, -4, 10, 22, 34, -24, 4, 28, -10].map((x, i) => `<circle cx="${x}" cy="${-4 - (i % 3) * 5}" r="3" fill="${i % 2 ? '#F2B950' : '#E0A030'}"/>`).join('')}`,
    deskpaper: () => `<rect x="-42" y="-38" width="84" height="8" rx="4" fill="#D9A06B"/><path d="M -36 -30 L -40 0 M 36 -30 L 40 0" stroke="#C68753" stroke-width="6" stroke-linecap="round"/><rect x="-24" y="-52" width="36" height="16" rx="2" fill="#FDFDFB" transform="rotate(-5 -6 -44)"/><path d="M -18 -48 q 4 -5 8 0 q 4 5 8 0" stroke="#5E92B4" stroke-width="2" fill="none"/><path d="M 18 -40 l 12 -14" stroke="#E0A030" stroke-width="4" stroke-linecap="round"/><path d="M 30 -54 l 4 -5 2 6 Z" fill="#3A2C22"/>`,
    bike: () => `<g class="anim-idle"><circle cx="-22" cy="-12" r="13" fill="none" stroke="#5E92B4" stroke-width="3.4"/><circle cx="24" cy="-12" r="13" fill="none" stroke="#5E92B4" stroke-width="3.4"/><path d="M -22 -12 L -8 -34 H 10 L 24 -12 M -8 -34 L 2 -12 H -22" stroke="#E0584A" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M -12 -38 H -2" stroke="#E0584A" stroke-width="3.4" stroke-linecap="round"/><path d="M 8 -37 q 7 -2 6 5" stroke="#3A2C22" stroke-width="2.6" fill="none"/></g>`,
    coinjar: () => `<rect x="-36" y="-34" width="72" height="8" rx="4" fill="#D9A06B"/><path d="M -30 -26 L -34 0 M 30 -26 L 34 0" stroke="#C68753" stroke-width="6" stroke-linecap="round"/><path d="M -14 -38 Q -16 -64 0 -64 Q 16 -64 14 -38 Z" fill="#BFE3F5" opacity="0.85"/><ellipse cx="0" cy="-64" rx="9" ry="3.4" fill="#8FBEDC"/><circle cx="-4" cy="-44" r="4.6" fill="#F2B950"/><circle cx="5" cy="-42" r="4.6" fill="#E0A030"/><circle cx="0" cy="-50" r="4.6" fill="#F2B950"/><circle cx="2" cy="-72" r="5" fill="#F2B950" class="anim-idle"/>`,
    dragonbubble: () => `<ellipse cx="0" cy="-58" rx="34" ry="22" fill="#FDFDFB" stroke="#E4D5BC" stroke-width="2.4"/><circle cx="-22" cy="-34" r="5" fill="#FDFDFB" stroke="#E4D5BC" stroke-width="2"/><circle cx="-30" cy="-24" r="3" fill="#FDFDFB" stroke="#E4D5BC" stroke-width="2"/><path d="M -14 -54 Q -8 -70 2 -60 Q 6 -72 14 -62 Q 22 -58 16 -50 Q 20 -46 12 -44 Q 0 -40 -10 -46 Q -18 -48 -14 -54 Z" fill="#8FB573"/><circle cx="9" cy="-59" r="1.8" fill="#3A2C22"/><path d="M 16 -50 l 7 3 M 14 -46 l 6 5" stroke="#E0785A" stroke-width="2" stroke-linecap="round"/>`,
    backpack: () => `<path d="M -18 -44 Q -22 -56 -8 -56 H 8 Q 22 -56 18 -44 Z" fill="#C5603F"/><rect x="-22" y="-46" width="44" height="44" rx="10" fill="#E0785A"/><rect x="-14" y="-30" width="28" height="20" rx="6" fill="#F2937B"/><rect x="-7" y="-24" width="14" height="8" rx="3" fill="#FDF6E9"/>`,
    slamdoor: () => `<rect x="-26" y="-92" width="52" height="90" rx="4" fill="#C68753"/><rect x="-20" y="-86" width="40" height="78" rx="3" fill="#D9A06B"/><circle cx="12" cy="-46" r="3.4" fill="#F2B950"/><g stroke="#A99A8D" stroke-width="3" stroke-linecap="round"><path d="M 32 -78 l 8 -6"/><path d="M 34 -66 l 10 -2"/><path d="M 32 -54 l 8 4"/></g>`,
    ball: () => `<g class="anim-idle"><circle cx="0" cy="-14" r="15" fill="#FDFDFB" stroke="#3A2C22" stroke-width="2"/><path d="M 0 -22 l 7 5 -2.6 8 H -4.4 L -7 -17 Z" fill="#3A2C22"/><path d="M 0 -22 V -29 M 7 -17 l 7 -3 M 4.4 -9 l 5 6 M -4.4 -9 l -5 6 M -7 -17 l -7 -3" stroke="#3A2C22" stroke-width="2"/></g>`,
    guitar: () => `<g transform="rotate(18)"><ellipse cx="0" cy="-16" rx="19" ry="16" fill="#C98F4E"/><ellipse cx="0" cy="-26" rx="13" ry="11" fill="#C98F4E"/><circle cx="0" cy="-20" r="6" fill="#6B4226"/><rect x="-3" y="-72" width="6" height="42" rx="3" fill="#8C5E33"/><rect x="-6" y="-78" width="12" height="9" rx="3" fill="#6B4226"/><path d="M -1.4 -68 V -12 M 1.4 -68 V -12" stroke="#F2E3C0" stroke-width="0.8"/></g>`
  };

  /* ════════ LOCATION BACKDROPS (700×260) ════════ */
  const WALLS = { 1: '#F7E8D8', 2: '#EFEADC', 3: '#E8EFDC', 4: '#DCE9EF', 5: '#EFE3DC', 6: '#E6E0F0' };
  const FLOORS = { 1: '#E3C9A8', 2: '#DEC4A2', 3: '#D9BE9C', 4: '#D4B996', 5: '#CFB390', 6: '#CAAE8A' };

  const TIMES = {
    Morning:   { sky: '#FFE9B8', sun: '<circle cx="0" cy="6" r="9" fill="#F2B950"/><g stroke="#F2B950" stroke-width="2" stroke-linecap="round"><path d="M 0 -8 v -4"/><path d="M 10 -4 l 3 -3"/><path d="M -10 -4 l -3 -3"/></g>', tint: 'rgba(255,225,150,0.10)' },
    Afternoon: { sky: '#BFE3F5', sun: '<circle cx="-4" cy="2" r="8" fill="#FFD66B"/><ellipse cx="6" cy="9" rx="9" ry="4" fill="#fff"/>', tint: 'rgba(160,210,245,0.06)' },
    Evening:   { sky: '#FFC998', sun: '<circle cx="0" cy="11" r="8" fill="#F28C5A"/><path d="M -14 13 H 14" stroke="#E8A06B" stroke-width="2"/>', tint: 'rgba(255,170,110,0.12)' },
    Night:     { sky: '#3D4A6B', sun: '<path d="M 4 -4 A 8 8 0 1 0 4 12 A 6.5 6.5 0 1 1 4 -4 Z" fill="#FFE9B8"/><circle cx="-8" cy="-2" r="1.3" fill="#fff"/><circle cx="10" cy="8" r="1" fill="#fff"/>', tint: 'rgba(40,55,100,0.22)' }
  };

  function windowSVG(t, x, y) {
    return `<g transform="translate(${x} ${y})">
      <rect x="0" y="0" width="80" height="62" rx="8" fill="${t.sky}" stroke="#FDFDFB" stroke-width="6"/>
      <g transform="translate(40 28)">${t.sun}</g>
      <path d="M 40 3 V 59 M 3 31 H 77" stroke="#FDFDFB" stroke-width="4"/>
    </g>`;
  }

  /* age-specific home props (left + right corners) */
  function homeProps(age) {
    switch (age) {
      case 1: return `
        <g transform="translate(600 70)"><path d="M 0 0 v 14" stroke="#A99A8D" stroke-width="2"/><path d="M -26 14 H 26" stroke="#A99A8D" stroke-width="2"/><path d="M -26 14 v 10 M 0 14 v 16 M 26 14 v 10" stroke="#A99A8D" stroke-width="1.5"/><circle cx="-26" cy="28" r="5" fill="#F2B950"/><path d="M 0 30 l 4 8 h -8 Z" fill="#8FBEDC"/><circle cx="26" cy="28" r="5" fill="#E0785A"/></g>
        <g transform="translate(80 165)"><circle cx="0" cy="0" r="17" fill="#C98F4E"/><circle cx="-12" cy="-13" r="7" fill="#C98F4E"/><circle cx="12" cy="-13" r="7" fill="#C98F4E"/><circle cx="-5" cy="-2" r="2" fill="#3A2C22"/><circle cx="5" cy="-2" r="2" fill="#3A2C22"/><path d="M -3 5 Q 0 7 3 5" stroke="#3A2C22" stroke-width="1.5" fill="none"/><ellipse cx="0" cy="22" rx="13" ry="9" fill="#B57F40"/></g>`;
      case 2: return `
        <g transform="translate(75 175)"><rect x="0" y="0" width="22" height="22" rx="3" fill="#E0785A"/><rect x="24" y="0" width="22" height="22" rx="3" fill="#8FB573"/><rect x="12" y="-24" width="22" height="22" rx="3" fill="#F2B950"/><text x="11" y="16" font-size="13" font-weight="900" fill="#fff" font-family="Nunito,sans-serif" text-anchor="middle">A</text><text x="35" y="16" font-size="13" font-weight="900" fill="#fff" font-family="Nunito,sans-serif" text-anchor="middle">B</text><text x="23" y="-8" font-size="13" font-weight="900" fill="#fff" font-family="Nunito,sans-serif" text-anchor="middle">C</text></g>`;
      case 3: return `
        <g transform="translate(70 130)"><path d="M 4 78 L 22 0 H 26 L 10 78 Z" fill="#C68753"/><path d="M 60 78 L 42 0 H 38 L 54 78 Z" fill="#C68753"/><rect x="10" y="2" width="44" height="54" rx="3" fill="#FDFDFB" stroke="#E4D5BC" stroke-width="2"/><path d="M 18 40 Q 26 22 33 34 Q 40 14 48 36" stroke="#8FB573" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="24" cy="16" r="6" fill="#F2B950"/></g>`;
      case 4: return `
        <g transform="translate(75 70)"><rect x="0" y="0" width="64" height="84" rx="4" fill="#fff" stroke="#E4D5BC" stroke-width="3"/><path d="M 14 58 Q 20 30 34 38 Q 30 20 44 24 Q 52 28 46 42 Q 56 48 44 58 Q 30 66 14 58 Z" fill="#8FB573"/><circle cx="40" cy="28" r="3.5" fill="#3A2C22"/><text x="32" y="78" font-size="9" font-weight="800" fill="#A99A8D" text-anchor="middle" font-family="Nunito,sans-serif">RAWR</text></g>`;
      case 5: return `
        <g transform="translate(580 135)"><rect x="0" y="30" width="60" height="8" rx="3" fill="#C68753"/><rect x="4" y="38" width="6" height="38" fill="#C68753"/><rect x="50" y="38" width="6" height="38" fill="#C68753"/><rect x="8" y="6" width="26" height="20" rx="2" fill="#FDFDFB" stroke="#E4D5BC" stroke-width="2"/><path d="M 12 20 L 18 12 L 23 17 L 29 10" stroke="#E0785A" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="40" y="14" width="12" height="16" rx="2" fill="#8FB573"/></g>`;
      default: return `
        <g transform="translate(575 120)"><rect x="0" y="0" width="74" height="90" rx="5" fill="#C68753"/><rect x="5" y="6" width="64" height="22" rx="3" fill="#FDF6E9"/><rect x="5" y="34" width="64" height="22" rx="3" fill="#FDF6E9"/><rect x="5" y="62" width="64" height="22" rx="3" fill="#FDF6E9"/>${[10, 20, 30, 44, 54].map((x, i) => `<rect x="${x}" y="9" width="${i === 2 ? 12 : 8}" height="17" rx="2" fill="${['#E0785A', '#8FB573', '#F2B950', '#8FBEDC', '#B287B8'][i]}"/>`).join('')}${[12, 26, 40, 54].map((x, i) => `<rect x="${x}" y="65" width="10" height="17" rx="2" fill="${['#5E92B4', '#F2B950', '#B287B8', '#E0785A'][i]}"/>`).join('')}</g>`;
    }
  }

  const BGS = {
    home: (age, t) => `
      <rect width="700" height="200" fill="${WALLS[age] || WALLS[1]}"/>
      <rect y="196" width="700" height="64" fill="${FLOORS[age] || FLOORS[1]}"/>
      <path d="M 0 196 H 700" stroke="rgba(74,59,50,0.15)" stroke-width="2"/>
      ${windowSVG(t, 100, 28)}
      ${homeProps(age)}
      <ellipse cx="370" cy="216" rx="130" ry="26" fill="rgba(255,253,247,0.5)"/>`,
    bedroom: (age, t) => `
      <rect width="700" height="200" fill="#E9E2F2"/>
      <rect y="196" width="700" height="64" fill="#CDBBA0"/>
      <path d="M 0 196 H 700" stroke="rgba(74,59,50,0.15)" stroke-width="2"/>
      ${windowSVG(t, 95, 26)}
      <g transform="translate(600 60)"><path d="M 0 0 v 30" stroke="#A99A8D" stroke-width="3"/><path d="M -16 30 Q 0 22 16 30 L 12 56 H -12 Z" fill="#F2D8A0"/></g>
      ${[160, 420, 560].map((x, i) => `<path d="M ${x} ${34 + i * 16} l 2.4 5.4 5.4 2.4 -5.4 2.4 -2.4 5.4 -2.4 -5.4 -5.4 -2.4 5.4 -2.4 Z" fill="#F2D8A0" opacity="0.8"/>`).join('')}
      <ellipse cx="360" cy="216" rx="140" ry="26" fill="#B287B8" opacity="0.25"/>`,
    kitchen: (age, t) => `
      <rect width="700" height="200" fill="#F5EDDC"/>
      <rect y="196" width="700" height="64" fill="#D9C8A8"/>
      <path d="M 0 196 H 700" stroke="rgba(74,59,50,0.15)" stroke-width="2"/>
      <rect x="40" y="30" width="170" height="56" rx="6" fill="#C68753"/>
      <path d="M 125 30 V 86 M 40 58 H 210" stroke="#B07440" stroke-width="3"/>
      ${windowSVG(t, 300, 26)}
      <g transform="translate(490 96)"><rect x="0" y="0" width="180" height="100" rx="6" fill="#C68753"/><rect x="0" y="0" width="180" height="14" rx="6" fill="#D9A06B"/><rect x="14" y="24" width="66" height="64" rx="4" fill="#B07440"/><rect x="98" y="24" width="66" height="64" rx="4" fill="#B07440"/><circle cx="72" cy="56" r="4" fill="#F2B950"/><circle cx="106" cy="56" r="4" fill="#F2B950"/><ellipse cx="40" cy="-4" rx="18" ry="6" fill="#9AA5B1"/></g>
      <ellipse cx="330" cy="216" rx="130" ry="26" fill="rgba(255,253,247,0.5)"/>`,
    park: (age, t) => `
      <rect width="700" height="200" fill="${t.sky === '#3D4A6B' ? '#3D4A6B' : '#CDE8F5'}"/>
      <g transform="translate(620 42)">${t.sun}</g>
      <ellipse cx="120" cy="50" rx="40" ry="14" fill="#fff" opacity="0.85"/>
      <ellipse cx="300" cy="32" rx="30" ry="11" fill="#fff" opacity="0.75"/>
      <rect y="170" width="700" height="90" fill="#A4C98A"/>
      <path d="M 0 170 Q 350 154 700 170" fill="#A4C98A"/>
      <g transform="translate(90 70)"><rect x="-7" y="60" width="14" height="44" rx="6" fill="#8C5E33"/><circle cx="0" cy="40" r="42" fill="#7CA05F"/><circle cx="-26" cy="58" r="24" fill="#8BB573"/><circle cx="28" cy="56" r="26" fill="#8BB573"/></g>
      <g transform="translate(620 110)"><rect x="-5" y="38" width="10" height="34" rx="5" fill="#8C5E33"/><circle cx="0" cy="24" r="30" fill="#7CA05F"/></g>
      <ellipse cx="260" cy="150" rx="20" ry="7" fill="#8BB573"/><ellipse cx="480" cy="158" rx="26" ry="8" fill="#8BB573"/>
      <ellipse cx="360" cy="220" rx="140" ry="24" fill="#93BD79"/>`,
    store: (age, t) => `
      <rect width="700" height="200" fill="#F2EBDD"/>
      <rect y="196" width="700" height="64" fill="#CFC6B8"/>
      <path d="M 0 196 H 700" stroke="rgba(74,59,50,0.12)" stroke-width="2"/>
      ${[40, 480].map(ox => `
        <g transform="translate(${ox} 40)">
          <rect width="180" height="150" rx="6" fill="#D9CDB8"/>
          ${[14, 62, 110].map(y => `<rect x="8" y="${y}" width="164" height="8" rx="3" fill="#B8AC96"/>`).join('')}
          ${[20, 56, 92, 128].map((x, i) => `<rect x="${x}" y="${30 - 16}" width="26" height="30" rx="3" fill="${['#E0785A', '#8FB573', '#F2B950', '#8FBEDC'][i % 4]}"/>`).join('')}
          ${[20, 56, 92, 128].map((x, i) => `<rect x="${x}" y="${62 - 30 + 16}" width="26" height="14" rx="3" fill="${['#B287B8', '#F2937B', '#5E92B4', '#E0A030'][i % 4]}"/>`).join('')}
          ${[20, 56, 92, 128].map((x, i) => `<circle cx="${x + 13}" cy="${100}" r="9" fill="${['#8FB573', '#E0785A', '#8FBEDC', '#F2B950'][i % 4]}"/>`).join('')}
        </g>`).join('')}
      <ellipse cx="350" cy="216" rx="140" ry="26" fill="rgba(255,253,247,0.45)"/>`,
    school: (age, t) => `
      <rect width="700" height="200" fill="${t.sky === '#3D4A6B' ? '#3D4A6B' : '#CDE8F5'}"/>
      <g transform="translate(70 36)">${t.sun}</g>
      <rect y="180" width="700" height="80" fill="#B8B0A0"/>
      <g transform="translate(400 36)">
        <rect width="260" height="148" rx="8" fill="#E8B56A"/>
        <path d="M -14 6 L 130 -30 L 274 6 Z" fill="#C5603F"/>
        <rect x="106" y="68" width="48" height="80" rx="5" fill="#8C5E33"/>
        <rect x="22" y="34" width="40" height="34" rx="4" fill="#BFE3F5" stroke="#FDFDFB" stroke-width="4"/>
        <rect x="196" y="34" width="40" height="34" rx="4" fill="#BFE3F5" stroke="#FDFDFB" stroke-width="4"/>
        <circle cx="130" cy="14" r="13" fill="#FDFDFB"/><path d="M 130 6 V 14 L 136 18" stroke="#5E7A93" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      </g>
      ${[0, 60, 120, 180, 240, 300].map(x => `<g transform="translate(${x + 20} 150)"><rect x="0" y="0" width="6" height="36" rx="3" fill="#8A95A1"/></g>`).join('')}
      <rect x="14" y="146" width="320" height="7" rx="3.5" fill="#8A95A1"/>
      <ellipse cx="330" cy="216" rx="140" ry="24" fill="#A8A090"/>`,
    pool: (age, t) => `
      <rect width="700" height="140" fill="#D8EFF5"/>
      <rect y="120" width="700" height="140" fill="#7FB8D9"/>
      <path d="M 0 120 Q 60 112 120 120 T 240 120 T 360 120 T 480 120 T 600 120 T 700 120" fill="#9CCBE6"/>
      ${[80, 230, 420, 580].map((x, i) => `<path d="M ${x} ${150 + (i % 2) * 26} q 16 -8 32 0" stroke="#C8E6F2" stroke-width="4" fill="none" stroke-linecap="round"/>`).join('')}
      <rect y="196" width="700" height="64" fill="#E6E0D2"/>
      ${[30, 110, 190, 270, 350, 430, 510, 590].map(x => `<rect x="${x}" y="206" width="56" height="20" rx="3" fill="#D8D0BE"/>`).join('')}
      <g transform="translate(640 96)"><path d="M 0 0 V 80 M 22 0 V 80" stroke="#9AA5B1" stroke-width="5" stroke-linecap="round"/><path d="M 0 18 H 22 M 0 38 H 22 M 0 58 H 22" stroke="#9AA5B1" stroke-width="4"/></g>
      <circle cx="180" cy="166" r="14" fill="none" stroke="#E0584A" stroke-width="7"/>`,
    street: (age, t) => `
      <rect width="700" height="170" fill="${t.sky === '#3D4A6B' ? '#3D4A6B' : '#D5E8F2'}"/>
      <g transform="translate(80 36)">${t.sun}</g>
      <g transform="translate(380 30)">
        <rect width="300" height="140" rx="6" fill="#E8D5B8"/>
        <rect x="20" y="84" width="120" height="56" rx="4" fill="#BFE3F5" stroke="#FDFDFB" stroke-width="5"/>
        <rect x="170" y="84" width="56" height="56" rx="4" fill="#8C5E33"/>
        <rect x="10" y="42" width="280" height="30" rx="6" fill="#C5603F"/>
        <text x="150" y="63" font-size="17" font-weight="900" fill="#FDF6E9" text-anchor="middle" font-family="Nunito,sans-serif">CORNER SHOP</text>
      </g>
      <rect y="166" width="700" height="40" fill="#C9C2B4"/>
      <rect y="204" width="700" height="56" fill="#8A8578"/>
      ${[20, 120, 220, 320, 420, 520, 620].map(x => `<rect x="${x}" y="224" width="50" height="9" rx="4" fill="#F2EBDD" opacity="0.85"/>`).join('')}
      <path d="M 0 166 H 700" stroke="rgba(74,59,50,0.18)" stroke-width="2"/>`
  };

  const BG_TONES = {
    home: age => WALLS[age] || WALLS[1],
    bedroom: () => '#E9E2F2',
    kitchen: () => '#F5EDDC',
    park: () => '#CDE8F5',
    store: () => '#F2EBDD',
    school: () => '#CDE8F5',
    pool: () => '#D8EFF5',
    street: () => '#D5E8F2'
  };

  /* ── full scene: backdrop + item + parent + child ── */
  function sceneSVG(state, mood, opts = {}) {
    const age = state.age;
    const t = TIMES[state.currentTime] || TIMES.Afternoon;
    const map = (DATA.sceneMap && DATA.sceneMap[opts.sceneId]) || {};
    const bgName = map.bg || 'home';
    const bg = (BGS[bgName] || BGS.home)(age, t);
    const item = map.item && ITEMS[map.item] ? ITEMS[map.item]() : '';
    const itemX = map.itemX || 470;
    const pose = opts.parentPose || 'stand';
    const parentX = pose === 'kneel' ? 262 : (pose === 'far' ? 185 : 235);
    const groundY = bgName === 'park' ? 196 : (bgName === 'pool' ? 200 : 212);
    const childY = groundY - 100;
    return `
    <svg viewBox="0 0 700 260" preserveAspectRatio="xMidYMax meet" role="img" aria-label="${esc(state.name)}, age ${age}, looking ${mood}">
      ${bg}
      ${item ? `<g transform="translate(${itemX} ${groundY})">${item}</g>` : ''}
      ${opts.hideParent ? '' : `<g transform="translate(${parentX} ${childY})">${parentSVG(state.look, pose)}</g>`}
      <g transform="translate(368 ${childY})">
        ${childSVG(state.look, mood, age, true)}
      </g>
      <rect width="700" height="260" fill="${t.tint}" pointer-events="none"/>
    </svg>`;
  }

  /* ── small portrait (title / slots / setup / birthday) ── */
  function portraitSVG(look, mood, age) {
    return `
    <svg viewBox="-60 -10 120 120" role="img" aria-label="child portrait">
      <circle cx="0" cy="50" r="56" fill="#FDF6E9"/>
      <g transform="translate(0 4) scale(0.92)">
        ${childSVG(look, mood, age || 1, false)}
      </g>
    </svg>`;
  }

  function stageColor(state, sceneId) {
    if ((TIMES[state.currentTime] || {}).sky === '#3D4A6B') return '#56608A';
    const map = (DATA.sceneMap && DATA.sceneMap[sceneId]) || {};
    const f = BG_TONES[map.bg || 'home'];
    return f ? f(state.age) : WALLS[state.age];
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  return { sceneSVG, portraitSVG, childSVG, face: faceSVG, hair: hairSVG, stageColor };
})();
