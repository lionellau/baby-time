/* ════════════════════════════════════════════════════════════
   Little Steps — game content
   Scenarios are inspired by widely-shared early-childhood
   guidance (responsive caregiving / "serve and return",
   emotion coaching, division of responsibility in feeding,
   growth-mindset praise, rupture & repair). It's a game,
   not medical advice.
   ════════════════════════════════════════════════════════════ */
'use strict';

const DATA = {};

DATA.names = ['Mio', 'Noa', 'Kai', 'Luna', 'Ari', 'Mila', 'Theo', 'Zoe', 'Remy', 'Nina', 'Omar', 'Suri', 'Leo', 'Maya', 'Finn', 'Aya', 'Iggy', 'Tilly'];

DATA.skins = [
  { id: 'porcelain', color: '#FCDCC4', cheek: '#F8B9A0' },
  { id: 'peach',     color: '#F5C9A4', cheek: '#EBA983' },
  { id: 'honey',     color: '#D9A06B', cheek: '#C68753' },
  { id: 'bronze',    color: '#A96E3F', cheek: '#92552B' },
  { id: 'cocoa',     color: '#7A4A26', cheek: '#643917' }
];

DATA.hairs = [
  { id: 'cocoa-h',  color: '#5B3A22' },
  { id: 'black-h',  color: '#2E2620' },
  { id: 'sandy-h',  color: '#C98F4E' },
  { id: 'ginger-h', color: '#C25E33' },
  { id: 'ash-h',    color: '#8C7B6B' }
];

/* ── temperaments ─────────────────────────────────────────── */
DATA.temperaments = {
  sunny: {
    name: 'Sunny', icon: '☀️',
    desc: 'Quick to smile, easy to soothe, rolls with changes.',
    flavor: [
      '{name} bounces back fast — that sunny temperament helps.',
      'Even on rough days, {name} finds something to giggle about.'
    ],
    insight: '{name} has a <strong>sunny temperament</strong> — adaptable and quick to smile. Easy babies still need just as much connection; it\'s simply quieter work.'
  },
  spirited: {
    name: 'Spirited', icon: '🔥',
    desc: 'Big feelings, big energy, full volume on everything.',
    flavor: [
      '{name} feels everything at full volume — joy and fury alike.',
      'With spirited {name}, there is no medium setting. Buckle up.'
    ],
    insight: '{name} is <strong>spirited</strong> — intense, energetic, persistent. Exhausting some days, but that same fire becomes passion and drive. Your calm is their anchor.'
  },
  cautious: {
    name: 'Cautious', icon: '🐢',
    desc: 'Watches first, warms up slowly, careful with new things.',
    flavor: [
      '{name} studies new things carefully before diving in.',
      'Given time to warm up, {name} gets there — at {name}\'s own pace.'
    ],
    insight: '{name} is <strong>cautious</strong> — a careful observer who warms up slowly. Don\'t mistake it for fear: with gentle, unhurried support, cautious kids become thorough, thoughtful ones.'
  },
  sensitive: {
    name: 'Sensitive', icon: '🌸',
    desc: 'Feels deeply, notices everything, needs gentle transitions.',
    flavor: [
      '{name} notices everything — the scratchy tag, the changed routine, your mood.',
      'Sensitive {name} borrows your calm when the world feels like too much.'
    ],
    insight: '{name} is <strong>sensitive</strong> — deeply feeling and perceptive. The same wiring that makes hard days harder also makes them empathetic and observant. Gentleness goes a long way.'
  }
};

/* ── stats ────────────────────────────────────────────────── */
DATA.statDefs = [
  { key: 'bond',    icon: '❤️', label: 'Bond',     css: 'bond' },
  { key: 'lang',    icon: '💬', label: 'Language', css: 'lang' },
  { key: 'motor',   icon: '🤸', label: 'Motor',    css: 'motor' },
  { key: 'emotion', icon: '🌈', label: 'Feelings', css: 'emotion' }
];

/* ── per-age intro cards ──────────────────────────────────── */
DATA.ageIntros = {
  1: { title: 'One year old', icon: '🍼', text: '{name} just turned one! This year is about <strong>trust and discovery</strong>: babbling turns into first words, crawling turns into wobbly steps, and every little back-and-forth with you literally builds their brain.' },
  2: { title: 'Two years old', icon: '🧸', text: 'Welcome to two! {name} has discovered the mighty word <strong>"NO"</strong>. Tantrums aren\'t bad behavior — they\'re a small brain overwhelmed by big feelings. Your calm presence teaches what no lecture can.' },
  3: { title: 'Three years old', icon: '🎨', text: '{name} is three: a tiny philosopher, artist, and lawyer. <strong>"Why?"</strong> is the soundtrack of this year. Imagination explodes — and so does the need to do things "all by myself".' },
  4: { title: 'Four years old', icon: '🦖', text: 'Four is the year of <strong>big feelings and big friendships</strong>. {name} is learning to lose, to share, to repair, and to ask enormous questions. So are you.' },
  5: { title: 'Five years old', icon: '🚲', text: '{name} is five — school is on the horizon. This year is about <strong>confidence</strong>: pencils, pedals, friendships, and learning that mistakes are how brains grow.' },
  6: { title: 'Six years old', icon: '🎒', text: 'Six! {name} heads to <strong>big school</strong>. They need you a little less by the hour — and just as much as ever. The last year of this journey is about roots and wings.' }
};

/* ════════════════════════════════════════════════════════════
   SCENARIOS — { id, age, time, icon, title, text, anchor?,
     choices: [{ label, q, fx:{bond,lang,motor,emotion,energy},
                 mood, react, tip:{head, body} }] }
   q: 'best' | 'ok' | 'poor'  (order shuffled at render)
   ════════════════════════════════════════════════════════════ */
DATA.scenarios = [

/* ─────────────────────────── AGE 1 ─────────────────────────── */
{
  id: 'a1_babble', age: 1, time: 'Morning', icon: '🌅', title: 'Babble Back',
  text: '{name} looks up from the play mat and announces: <em>"Ba-ba-da! Ba?"</em> — then stares at you, waiting.',
  choices: [
    { label: 'Get down to their level, babble back — "Ba-ba? Da-ba!" — then wait for their reply', q: 'best',
      fx: { bond: 5, lang: 6, energy: -6 }, mood: 'joy',
      react: '{name} squeals with delight and fires back a whole paragraph of babble. You\'re having your first conversation!',
      tip: { head: 'Serve and return', body: 'Harvard\'s Center on the Developing Child calls these back-and-forth exchanges "serve and return" — the single most powerful builder of early brain architecture. Baby serves, you return, and wait for the next serve. It\'s a conversation before words.' } },
    { label: 'Smile and say "Yes, sweetie!" while you keep tidying up', q: 'ok',
      fx: { lang: 2, bond: 1, energy: -2 }, mood: 'happy',
      react: '{name} smiles back, babbles a little more quietly, then turns to a toy. Not bad — but the serve went mostly unreturned.',
      tip: { head: 'Little moments count', body: 'You can\'t catch every serve — no parent can. Aim for a few minutes of full-attention back-and-forth each day. Quality beats around-the-clock quantity.' } },
    { label: '"Uh-huh" — you\'re mid-scroll on your phone', q: 'poor',
      fx: { lang: 0, bond: -2, energy: 2 }, mood: 'sad',
      react: '{name} babbles again, louder... then gives up and goes quiet. Babies notice when our attention is elsewhere — researchers call the blank-face effect genuinely stressful for them.',
      tip: { head: 'The still face', body: 'In the famous "still face" experiment, babies became distressed within seconds when a parent\'s face stopped responding. Phones create accidental still faces. No guilt — just notice it, put the phone down sometimes, and reconnect. Repair always works.' } }
  ]
},
{
  id: 'a1_book', age: 1, time: 'Evening', icon: '🌇', title: 'The Book Eater',
  text: 'You open a picture book for story time. {name} grabs it, flips it upside down, and starts <em>chewing the corner</em>.',
  choices: [
    { label: 'Let them hold it — point at pictures, name things in a silly voice, follow their pace', q: 'best',
      fx: { lang: 6, bond: 4, energy: -5 }, mood: 'curious',
      react: '{name} pats the dog picture when you "woof". The book is damp, the pages are out of order, and this is exactly what reading with a one-year-old should look like.',
      tip: { head: 'Reading is interaction, not recitation', body: 'For babies, "reading" means pointing, naming, silly voices, and chewing the book. Pediatricians recommend daily book-sharing from infancy — it predicts language and later literacy. Board books exist precisely because they get eaten.' } },
    { label: 'Gently keep reading the whole story aloud while they wander off', q: 'ok',
      fx: { lang: 3, energy: -4 }, mood: 'neutral',
      react: '{name} cruises away mid-page but keeps glancing back as your voice continues. Hearing rich language still helps — though joining their attention helps more.',
      tip: { head: 'Follow the child\'s lead', body: 'With toddlers, follow their attention rather than the plot. Three engaged pages beat a whole ignored book. The story can wait years; the cuddle and chatter can\'t.' } },
    { label: 'Take the book away — "Books are for reading, not eating!"', q: 'poor',
      fx: { lang: 0, emotion: -1, energy: 0 }, mood: 'cry',
      react: '{name} wails. The book session is over, and book time just became a tiny battle instead of a treat.',
      tip: { head: 'Mouthing is learning', body: 'Babies explore with their mouths — it\'s how they gather information. Keep a chewable board book in rotation and save the paper ones for later. Protect the joy of books above the books themselves.' } }
  ]
},
{
  id: 'a1_food', age: 1, time: 'Afternoon', icon: '☀️', title: 'The Gravity Scientist',
  text: 'Lunch time. {name} holds a piece of banana over the edge of the high chair, looks you dead in the eye, and <em>drops it</em>. Again. For the fifth time.',
  choices: [
    { label: 'Stay calm — "All done?" Offer one calm retry, then end the meal without drama', q: 'best',
      fx: { emotion: 5, bond: 3, energy: -5 }, mood: 'neutral',
      react: '{name} drops one more piece, you calmly wrap up the meal. No tears, no battle — and tomorrow\'s lunch starts fresh.',
      tip: { head: 'Dropping IS the science', body: 'Around age one, dropping food is genuine research: object permanence, gravity, and "what does my caregiver do?" A calm, boring response plus ending the meal teaches more than any lecture. Small portions reduce ammunition.' } },
    { label: 'Make a hilarious game of catching every piece', q: 'ok',
      fx: { bond: 3, motor: 1, energy: -7 }, mood: 'joy',
      react: '{name} laughs so hard they hiccup. Adorable! You have also just founded the most popular dinner show in town — performances daily, forever.',
      tip: { head: 'Watch what you reward', body: 'Laughter is gold, but babies repeat whatever gets a big reaction. Save the comedy for play time, and keep mealtime reactions calm — or every meal becomes a throwing game.' } },
    { label: 'Scold them firmly — "NO. We do NOT throw food."', q: 'poor',
      fx: { emotion: -2, bond: -1, energy: -6 }, mood: 'cry',
      react: '{name} bursts into confused tears. At one, they genuinely can\'t connect the stern voice to the banana — they just learned mealtimes can feel scary.',
      tip: { head: 'Too young for lectures', body: 'One-year-olds can\'t yet link a scolding to an action. Discipline at this age is mostly environment design: small portions, calm endings, and patience. The word discipline means "to teach", not "to punish".' } }
  ]
},
{
  id: 'a1_steps', age: 1, time: 'Afternoon', icon: '☀️', title: 'Almost Walking',
  text: '{name} pulls up on the couch, wobbles like jelly, and eyes the gap to the coffee table. One brave little foot lifts...',
  choices: [
    { label: 'Clear a soft landing zone, crouch nearby with open arms, and cheer the attempt', q: 'best',
      fx: { motor: 6, bond: 3, emotion: 2, energy: -6 }, mood: 'proud',
      react: 'Two glorious wobbly steps, a soft plop onto a padded bottom, and a huge grin up at you. {name} pulls right back up to try again.',
      tip: { head: 'Falling is part of walking', body: 'Babies fall dozens of times a day while learning to walk — they\'re built for it (low center of gravity, padded landing gear). Your job is a safe-ish space and encouragement, not prevention. Your relaxed face after a tumble teaches them whether falling is a crisis.' } },
    { label: 'Hold both their hands and walk them everywhere, never letting go', q: 'ok',
      fx: { motor: 2, bond: 2, energy: -8 }, mood: 'happy',
      react: '{name} loves the supported strolling! Your back, less so. And those independent balance muscles get a little less practice.',
      tip: { head: 'Support, then step back', body: 'Hand-walking is sweet and fine in doses, but babies build balance by wobbling solo. Try "hover less, pad more": cushions down, hands off, eyes on.' } },
    { label: 'Pop them in the playpen — walking can wait until it\'s safer', q: 'poor',
      fx: { motor: 0, emotion: -1, energy: 3 }, mood: 'mad',
      react: '{name} rattles the playpen bars like a tiny protester. The drive to move is enormous right now — containing it all day frustrates them and delays practice.',
      tip: { head: 'Movement needs mileage', body: 'Motor skills need hours of free practice. Playpens are great for "I need two safe minutes", not for the whole afternoon. Baby-proof one room and let the wobbling commence.' } }
  ]
},
{
  id: 'a1_night', age: 1, time: 'Night', icon: '🌙', title: 'The 2 AM Cry',
  text: 'It\'s 2:17 AM. {name} is crying in the crib. You were asleep for... you don\'t even know. Everything hurts a little.',
  choices: [
    { label: 'Go in calm and boring: low light, soft voice, brief comfort, back to sleep', q: 'best',
      fx: { emotion: 5, bond: 3, energy: -8 }, mood: 'sleepy',
      react: 'A back rub, a quiet "shhh, you\'re safe", and {name} drifts off. You shuffle back to bed like a zombie hero. This is the unglamorous core of parenting.',
      tip: { head: 'Night parenting is real parenting', body: 'Responding calmly at night builds security — babies learn that comfort exists even in the dark. Keep nights dim and dull so they stay sleepy. And remember: this phase genuinely ends.' } },
    { label: 'Bring them straight into your bed — everyone sleeps, decision tomorrow', q: 'ok',
      fx: { bond: 2, emotion: 1, energy: 2 }, mood: 'sleepy',
      react: '{name} instantly conks out, starfished across 80% of the mattress. You sleep in the remaining sliver. It worked... and it will be expected again tomorrow.',
      tip: { head: 'Families differ — be intentional', body: 'Where babies sleep is a family choice with real trade-offs; follow safe-sleep guidance and pick a pattern you can sustain. The risk isn\'t the cuddle — it\'s deciding by exhaustion at 2 AM and resenting it by Friday.' } },
    { label: 'Put on a quiet cartoon — screens knock them out eventually', q: 'poor',
      fx: { emotion: -2, energy: 0 }, mood: 'surprised',
      react: '{name} stops crying and stares at the glow, wide awake now. Blue light at 2 AM tells a baby brain it\'s morning. You\'re both up until four.',
      tip: { head: 'Screens sabotage sleep', body: 'Light — especially screens — suppresses melatonin and signals "daytime!" to the brain. Pediatric guidance is consistent: keep nights dark, quiet, and gloriously boring.' } }
  ]
},
{
  id: 'a1_point', age: 1, time: 'Morning', icon: '🌅', title: 'The Pointing Machine',
  text: 'On a walk, {name} suddenly points a chubby finger at a passing dog and looks back at you with urgent eyes: <em>"Eh! EH!"</em>',
  choices: [
    { label: 'Follow the point — "Yes! A dog! A fluffy brown dog, walking fast!"', q: 'best',
      fx: { lang: 6, bond: 4, energy: -4 }, mood: 'joy',
      react: '{name} beams and points at three more things in a row — a leaf, a bus, your nose. Each point is them asking: "tell me about the world?"',
      tip: { head: 'Pointing is a milestone, not a demand', body: 'Joint attention — baby points, you both look, you name it — is one of the strongest predictors of vocabulary growth. Add detail beyond the label: color, sound, action. "Dog" is good; "a fluffy dog drinking water" is a feast.' } },
    { label: '"Yep, doggy!" — and keep up the walking pace', q: 'ok',
      fx: { lang: 3, energy: -2 }, mood: 'happy',
      react: '{name} got the label and seems satisfied. A solid return! Stopping for ten extra seconds would have turned a snack into a meal, but you got somewhere to be.',
      tip: { head: 'Narrate when you can', body: 'You don\'t have to stop for every squirrel. But a few times per walk, pause and feast on the moment together — those ten-second detours are language fertilizer.' } },
    { label: 'Keep walking — you\'re in a rush and it\'s just a dog', q: 'poor',
      fx: { lang: 0, bond: -1, energy: 2 }, mood: 'sad',
      react: 'The little finger slowly lowers. {name} goes quiet for the rest of the block. Unanswered serves, over and over, teach babies to stop serving.',
      tip: { head: 'The serve unreturned', body: 'No single missed moment matters — parents are humans with bus schedules. The pattern matters. If most points get a response most days, the language engine hums.' } }
  ]
},
{
  id: 'a1_pots', age: 1, time: 'Afternoon', icon: '☀️', title: 'The Kitchen Drummer',
  text: '{name} has discovered the pot cupboard and is performing a drum solo with two lids. It is <em>extremely</em> loud, and you have a headache brewing.',
  choices: [
    { label: 'Join the band for two songs, then trade the lids for a soft drum and start a quieter game', q: 'best',
      fx: { motor: 4, bond: 4, emotion: 2, energy: -8 }, mood: 'joy',
      react: 'Two minutes of glorious racket together, then a smooth handoff to the stuffed-animal orchestra. {name} got the joy AND you got your eardrums back.',
      tip: { head: 'Connect, then redirect', body: 'Joining a toddler\'s game for even two minutes fills their connection tank, which makes redirection ten times easier. Banging is real learning too — cause, effect, rhythm, and the smug joy of being loud.' } },
    { label: 'Let the concert continue and go take a painkiller in the next room', q: 'ok',
      fx: { motor: 3, energy: 4 }, mood: 'happy',
      react: 'The solo continues, fortissimo. {name} is happy and busy; you get five minutes of (relative) peace. Honestly? Sometimes this is the move.',
      tip: { head: 'Good-enough parenting is good', body: 'Independent play — even deafening independent play — is genuinely valuable. You don\'t need to curate every moment. Tag yourself out when you need to; presence later beats gritted teeth now.' } },
    { label: 'Take the pots away mid-bang and shut the cupboard', q: 'poor',
      fx: { emotion: -2, bond: -1, energy: -4 }, mood: 'cry',
      react: 'Instant meltdown. From {name}\'s side, the best activity ever just vanished without warning. The crying is somehow louder than the drumming was.',
      tip: { head: 'Transitions need warnings', body: 'Even one-year-olds do better with a bridge: "One more bang... now let\'s wave bye-bye to the pots!" Abrupt endings feel like theft to a baby. Warn, then swap, don\'t just subtract.' } }
  ]
},
{
  id: 'a1_screen', age: 1, time: 'Evening', icon: '🌇', title: 'The Tempting Tablet',
  text: 'You are <em>completely</em> wiped out. The tablet sits on the counter, promising 40 minutes of silence. {name} is fussy and clingy at your ankles.',
  choices: [
    { label: 'Set up a safe floor space with a basket of toys, lie on the couch nearby, and rest while they potter', q: 'best',
      fx: { motor: 3, emotion: 3, energy: 16 }, mood: 'curious',
      react: '{name} grumbles for a minute, then discovers the basket and gets absorbed in stacking cups. You lie there like a starfish, present but horizontal. Everyone wins.',
      tip: { head: 'Rest is a parenting skill', body: 'You don\'t have to choose between screens and performing constant entertainment. "Available but resting" is a legitimate mode — babies benefit from pottering independently with you nearby. Caring for your battery IS caring for your baby.' } },
    { label: 'Video-call Grandma and let them babble at her together with you', q: 'ok',
      fx: { lang: 3, bond: 2, energy: 4 }, mood: 'joy',
      react: 'Grandma sings the spider song twice and {name} is enchanted. Twenty minutes of joy, and you only had to hold the phone.',
      tip: { head: 'Video chat is the exception', body: 'Pediatric guidance discourages most screen time before 18–24 months — but live video chat with loved ones is the recognized exception, because it\'s a real back-and-forth interaction, not passive watching.' } },
    { label: 'Cartoons. Forty minutes. Door to sanity.', q: 'poor',
      fx: { lang: -1, energy: 12 }, mood: 'neutral',
      react: 'Silence. Blessed silence. {name} sits glassy-eyed at the screen while you breathe. It worked — and that\'s exactly why it\'s easy to reach for daily, then hourly.',
      tip: { head: 'No shame — just a habit warning', body: 'One desperate cartoon session harms no one — every real parent has been there. But pediatricians advise against routine solo screen time before ~18–24 months because it displaces the interaction that builds language. Keep it the exception; build a non-screen rescue plan for hard days.' } }
  ]
},

/* ─────────────────────────── AGE 2 ─────────────────────────── */
{
  id: 'a2_market', age: 2, time: 'Afternoon', icon: '☀️', title: 'Checkout Meltdown',
  text: 'Supermarket checkout. {name} spots the candy rack, you say "not today", and the universe ends: full floor-flop, screaming, an audience of strangers assembling.',
  choices: [
    { label: 'Crouch down, stay calm: "You really wanted that candy. It\'s so hard. I\'m here." Hold the limit', q: 'best',
      fx: { emotion: 6, bond: 4, energy: -10 }, mood: 'cry',
      react: 'The storm rages two more minutes while you breathe and ignore the spectators... then {name} collapses into your arms, hiccuping. The candy stays. The trust grows.',
      tip: { head: 'Co-regulation, not negotiation', body: 'A two-year-old mid-tantrum is neurologically flooded — reasoning is offline. They borrow calm from your body: low voice, steady presence. Validate the feeling, keep the limit. "Feelings are allowed; the answer is still no" is the whole curriculum.' } },
    { label: 'Whip out your phone — "Look! Puppies!" — distraction torpedo', q: 'ok',
      fx: { emotion: 1, energy: -3 }, mood: 'surprised',
      react: 'The wailing stops mid-breath. Crisis averted, groceries paid. Distraction is a legitimate toddler tool — though the feelings didn\'t get practiced, just postponed.',
      tip: { head: 'Distraction has a place', body: 'Redirecting attention is developmentally fair play for toddlers, especially in survival moments. Just don\'t let it be the only tool — kids also need supported practice actually feeling and recovering from disappointment.' } },
    { label: 'Buy the candy. You cannot do this today.', q: 'poor',
      fx: { emotion: -3, energy: 4 }, mood: 'joy',
      react: 'Instant sunshine! {name} munches happily. Today was easier. Next week\'s checkout, and the fifty after it, just got much, much harder — the floor-flop is now a proven purchasing strategy.',
      tip: { head: 'Tantrums that work get repeated', body: 'Every parent caves sometimes — no judgment. But consistently giving in teaches that meltdowns are currency. If you\'re going to say yes, say it BEFORE the tantrum, not because of it.' } }
  ]
},
{
  id: 'a2_no', age: 2, time: 'Morning', icon: '🌅', title: 'The "NO!" Olympics',
  text: 'Getting dressed. "{name}, shirt time!" — <em>"NO!"</em> Pants? <em>"NO!"</em> The shirt they loved yesterday? <em>"NOOO!"</em> You need to leave in ten minutes.',
  choices: [
    { label: 'Offer two choices: "Red shirt or dino shirt — you pick!" Then race the sleeves like a game', q: 'best',
      fx: { emotion: 5, bond: 3, lang: 2, energy: -7 }, mood: 'proud',
      react: '"DINO!" {name} grabs it triumphantly. The sleeves race each other on, and you\'re out the door with three minutes to spare. Power shared is power struck.',
      tip: { head: 'The power of tiny choices', body: '"No" at two isn\'t defiance — it\'s a brand-new sense of self flexing. Offering two acceptable choices gives them real power inside your boundary. You decide the menu; they pick the dish. Games beat battles every time.' } },
    { label: 'Dress them gently while they protest, narrating calmly: "I know, you didn\'t want this"', q: 'ok',
      fx: { emotion: 2, energy: -6 }, mood: 'mad',
      react: 'A wriggling, complaining, eventually-dressed toddler. Sometimes the bus won\'t wait and a calm, kind override is what\'s left. Not every morning can be a Montessori moment.',
      tip: { head: 'Kind override is sometimes necessary', body: 'When time\'s truly up, acting calmly while acknowledging feelings ("you wanted to choose — we have to go now") is far better than threats. Save choice-offering for mornings with slack.' } },
    { label: '"Fine — no breakfast until you\'re dressed!"', q: 'poor',
      fx: { emotion: -2, bond: -2, energy: -8 }, mood: 'cry',
      react: 'Now it\'s a war with two fronts: clothes AND food. {name} cries harder, you\'re later than ever, and breakfast became a weapon instead of a meal.',
      tip: { head: 'Avoid weaponizing needs', body: 'Threats tied to food, sleep, or affection teach kids those things are conditional. Keep consequences related and small, and never make basic needs the bargaining chip.' } }
  ]
},
{
  id: 'a2_share', age: 2, time: 'Afternoon', icon: '☀️', title: 'MINE! MINE!',
  text: 'Sandbox diplomacy crisis: another toddler reaches for {name}\'s shovel. <em>"MIIIINE!"</em> {name} clutches it like a dragon with gold. The other parent is watching you.',
  choices: [
    { label: 'Narrate calmly — "You\'re using it; Sam wants a turn when you\'re done" — and offer the bucket as a second prop', q: 'best',
      fx: { emotion: 5, lang: 3, energy: -6 }, mood: 'neutral',
      react: 'The bucket defuses the standoff. Two minutes later, the shovel changes hands on its own. No forced surrender, no meltdown — just two scientists working in parallel.',
      tip: { head: 'Sharing is a skill, not a virtue test', body: 'True sharing develops between 3 and 4. At two, "parallel play" — side by side, not together — is the norm. Narrating turns and protecting possession ("you can finish your turn") actually builds generosity faster than forced sharing does.' } },
    { label: 'Set a visible timer: "Two minutes, then it\'s Sam\'s turn"', q: 'ok',
      fx: { emotion: 3, energy: -5 }, mood: 'mad',
      react: 'When it beeps, {name} hands it over with a scowl worthy of an opera. Turns happened, with structure as the referee. Decent — though the impulse came from the timer, not from them.',
      tip: { head: 'Structure helps practice', body: 'Timers make turn-taking concrete for toddlers and remove you as the villain. It\'s a fine scaffold — fade it over time so the skill becomes theirs.' } },
    { label: 'Pry it loose and hand it over — "We SHARE in this family!"', q: 'poor',
      fx: { emotion: -2, bond: -2, energy: -7 }, mood: 'cry',
      react: 'Total devastation. From {name}\'s view, the person they trust most just confiscated their property for a stranger. Lesson absorbed: "grabbing works if you\'re big".',
      tip: { head: 'Forced sharing backfires', body: 'Making toddlers surrender toys teaches that whoever\'s strongest decides — the opposite of generosity. Protect both kids\' turns instead; real sharing grows from feeling secure about possession.' } }
  ]
},
{
  id: 'a2_eat', age: 2, time: 'Evening', icon: '🌇', title: 'The Broccoli Standoff',
  text: 'Dinner. {name} regards the broccoli on the plate like a personal insult, pushes it to the rim, and demands: <em>"Noodles ONLY."</em>',
  choices: [
    { label: 'No pressure: keep serving it alongside foods they like, eat yours happily, let them decide', q: 'best',
      fx: { emotion: 4, motor: 1, energy: -4 }, mood: 'neutral',
      react: '{name} eats noodles, ignores the broccoli completely... then, week three of this routine, absentmindedly gnaws a floret while watching you eat yours. Victory comes to the patient.',
      tip: { head: 'Division of responsibility', body: 'Feeding expert Ellyn Satter\'s gold-standard rule: parents decide WHAT, WHEN and WHERE food is served; kids decide WHETHER and HOW MUCH to eat. Foods often need 10–15 no-pressure exposures before acceptance. Pressure reliably backfires.' } },
    { label: 'The airplane game + "just one bite" rule', q: 'ok',
      fx: { emotion: 1, bond: 1, energy: -6 }, mood: 'happy',
      react: 'The airplane lands! Once. The second flight is denied boarding. One bite happened, but mealtime is sliding toward dinner theater with you as full-time entertainment.',
      tip: { head: 'Mild pressure is still pressure', body: '"One bite" rules and games are common and not catastrophic, but research finds even gentle pressure tends to reduce long-term liking of the food. The most powerful tool is boring: you, visibly enjoying vegetables, hundreds of times.' } },
    { label: '"Eat your broccoli or no dessert."', q: 'poor',
      fx: { emotion: -2, energy: -3 }, mood: 'mad',
      react: 'Negotiations collapse. And a subtle lesson lands: broccoli is the toll you pay; dessert is the treasure. You\'ve made the vegetable the villain of its own story.',
      tip: { head: 'Dessert bribes rank foods', body: 'Using dessert as a reward teaches kids that vegetables are bad (need bribes) and sweets are best (are bribes). If you serve dessert, many feeding experts suggest a small portion served WITH the meal, no strings attached. Wild, but it works.' } }
  ]
},
{
  id: 'a2_potty', age: 2, time: 'Morning', icon: '🌅', title: 'The Potty Pressure',
  text: 'Grandma, lovingly but firmly: "You were potty-trained at 18 months! {name} is TWO already. In my day..." {name}, meanwhile, shows zero interest in the potty.',
  choices: [
    { label: 'Thank Grandma warmly, but follow readiness signs: keep the potty around, read potty books, zero pressure', q: 'best',
      fx: { emotion: 4, bond: 2, energy: -4 }, mood: 'curious',
      react: '{name} uses the potty as a hat for a month. Then one day, unprompted, sits on it with a book like a tiny CEO. Readiness arrived on its own schedule — it always does.',
      tip: { head: 'Readiness beats the calendar', body: 'Pediatric guidance: most kids show readiness between 18 and 30+ months (staying dry longer, noticing, interest, able to pull pants). Training started on the child\'s signals goes faster with fewer setbacks than training started on the grandparents\' timeline.' } },
    { label: 'Start a strict potty schedule — every 30 minutes, all day', q: 'ok',
      fx: { emotion: 0, energy: -10 }, mood: 'mad',
      react: 'Day one: eleven potty sits, zero deliveries, two meltdowns (one was yours, internally). Some kids respond fine to boot camp; {name} clearly isn\'t one of them yet.',
      tip: { head: 'Intensive methods need a ready child', body: 'Fast-track methods can work — for children already showing readiness signs. Applied early, they mostly train the parent to watch a clock. Power struggles over the potty are battles a toddler can always win.' } },
    { label: 'Scold the accidents — embarrassment will speed things up', q: 'poor',
      fx: { emotion: -4, bond: -2, energy: -7 }, mood: 'sad',
      react: '{name} starts hiding behind the curtain to poop, and holding it in. Shame didn\'t speed anything up — it added fear to a body process. This often genuinely backfires into constipation and regression.',
      tip: { head: 'Never shame body stuff', body: 'Accidents are a guaranteed part of the process. Punishing them creates anxiety, withholding, and medical problems. The script is boring on purpose: "Oops, pee goes in the potty. Let\'s clean up." Calm, matter-of-fact, forever.' } }
  ]
},
{
  id: 'a2_climb', age: 2, time: 'Afternoon', icon: '☀️', title: 'The Little Mountaineer',
  text: 'You turn around for ten seconds and {name} is standing ON the sofa\'s armrest, knees bent, eyeing the cushion below like a tiny stunt double.',
  choices: [
    { label: 'Spot them: "Feet first, bend your knees!" — then build a legit cushion landing zone together', q: 'best',
      fx: { motor: 6, emotion: 3, energy: -8 }, mood: 'proud',
      react: 'THUMP. Perfect landing. "AGAIN!" Seventeen jumps later, {name} has learned more about their body than a month of being told "careful!" could teach.',
      tip: { head: 'Risky play builds safe kids', body: 'Child-development researchers consistently find that "risky" play — climbing, jumping, balancing — builds body awareness, judgment, and confidence, and is linked to FEWER injuries later. Make it safer instead of forbidding it: "feet first" beats "get down".' } },
    { label: 'Hover with arms out, gasping at every wobble — but allow it', q: 'ok',
      fx: { motor: 3, emotion: 0, energy: -9 }, mood: 'curious',
      react: '{name} jumps, you catch mid-air. They had fun — though they also absorbed your held breath and learned that this is Scary For Grown-ups. (Cautious kids may stop trying.)',
      tip: { head: 'Your face is their risk meter', body: 'Toddlers constantly read your expression to calibrate danger ("social referencing"). A calm, attentive face says "you can handle this". Constant gasping installs your anxiety in their body. Spot like a casual pro, not a panicked goalie.' } },
    { label: '"NO CLIMBING. Furniture is not a playground." Lift them down every time.', q: 'poor',
      fx: { motor: -1, emotion: -2, energy: -6 }, mood: 'mad',
      react: '{name} waits until you\'re in the kitchen and climbs the BOOKSHELF instead. The climbing urge doesn\'t disappear when forbidden — it just goes underground, unsupervised.',
      tip: { head: 'The urge will find a way', body: 'Two-year-olds NEED to climb like they need lunch. Forbid all of it and they\'ll practice in secret on worse furniture. Give the urge a legal outlet — a cushion mountain, a playground trip — and the bookshelf gets boring.' } }
  ]
},
{
  id: 'a2_words', age: 2, time: 'Morning', icon: '🌅', title: 'Narrate the World',
  text: 'A slow, errand-free walk to the park, just you and {name} in the stroller. Fifteen quiet minutes ahead. Your phone is in your pocket. The world rolls by.',
  choices: [
    { label: 'Be the sportscaster: "Big red truck! It\'s carrying sand. Where\'s it going?" — pause for replies', q: 'best',
      fx: { lang: 7, bond: 3, energy: -5 }, mood: 'joy',
      react: '"Tuck! Big tuck!" {name} adds commentary to everything now. By the park you\'ve had a full conversation about trucks, dogs, leaves, and a suspicious pigeon.',
      tip: { head: 'The 30-million-word garden', body: 'Children\'s vocabularies grow in proportion to the live, responsive talk they hear — narration, questions, expansions ("Truck!" → "Yes, a big GREEN truck!"). A stroller ride is a free language class. Pausing so they can answer is the secret ingredient.' } },
    { label: 'Comfortable silence, the occasional "look, a doggy"', q: 'ok',
      fx: { lang: 2, bond: 1, energy: 2 }, mood: 'neutral',
      react: 'A peaceful roll through the neighborhood. {name} points at things; you mostly enjoy the quiet. Restful — and a few serves went unreturned.',
      tip: { head: 'Quiet together counts too', body: 'Not every minute needs narration — shared calm is also connection, and parents need mental space. Just make sure narrated walks happen regularly too; toddler language grows on talk the way plants grow on water.' } },
    { label: 'Earbuds in, podcast on — you\'ve earned 15 minutes', q: 'poor',
      fx: { lang: 0, bond: -1, energy: 6 }, mood: 'sad',
      react: '{name} points at a cement mixer — the most exciting object in the known universe — and gets no response. The pointing stops by block three. The podcast was pretty good though.',
      tip: { head: 'Watch the default', body: 'A podcast walk now and then? Completely fine — your brain matters too. The risk is the default flipping, where most walks are tuned out. Try "first half podcast, second half sportscast" and you both get fed.' } }
  ]
},
{
  id: 'a2_bedtime', age: 2, time: 'Night', icon: '🌙', title: 'The Bedtime Curtain Calls',
  text: 'Bedtime ended 40 minutes ago. Current count: three waters, two potty trips, one urgent stuffed-animal rearrangement, and now — <em>"One more huuuug!"</em>',
  choices: [
    { label: 'Run a tight, loving routine: same steps nightly, then calm boring returns — "It\'s sleep time. I love you. Night."', q: 'best',
      fx: { emotion: 5, energy: -7 }, mood: 'sleepy',
      react: 'Night one: nine curtain calls. Night four: two. Night seven: you hear singing, then silence. Consistency is brutally boring and brutally effective.',
      tip: { head: 'Routines are sleep scaffolding', body: 'Toddler brains love predictability — a fixed sequence (bath, teeth, two books, song, lights) becomes a runway to sleep. The callback game ends when callbacks reliably get the same 10-second boring response. Boring is the strategy.' } },
    { label: 'Lie down next to them until they\'re fully asleep. Again.', q: 'ok',
      fx: { bond: 3, energy: -9 }, mood: 'sleepy',
      react: 'Warm, snuggly, genuinely lovely — and 50 minutes of your evening, every evening, with {name} now unable to fall asleep without your elbow as a pillow.',
      tip: { head: 'Sweet, but check the math', body: 'Lying with your child isn\'t wrong — many families treasure it. Just choose it deliberately: whatever conditions a child falls asleep in are what they\'ll need at 2 AM wakings too. If it stops working for YOU, gradual retreat (sitting nearby, then by the door) works gently.' } },
    { label: 'Give up — "Fine, come watch TV until you\'re sleepy"', q: 'poor',
      fx: { emotion: -3, energy: 1 }, mood: 'joy',
      react: '{name} is thrilled and wide awake until 10:40 PM, then feral by morning. Tomorrow\'s bedtime now comes with a documented precedent, cited confidently by the defense.',
      tip: { head: 'Sleep debt compounds', body: 'Toddlers short on sleep don\'t act tired — they act POSSESSED (wired, weepy, defiant). Most need 11–14 hours with naps. Protecting bedtime is protecting tomorrow\'s whole mood, theirs and yours.' } }
  ]
},
{
  id: 'a2_self', age: 2, time: 'Night', icon: '🌙', title: 'Running on Empty',
  text: '{name} is finally, FINALLY asleep. The living room looks looted. Dishes tower. You have roughly two usable hours and the personality of a damp towel.',
  choices: [
    { label: 'Leave the mess. Do one small thing that feels human — bath, book, call a friend — then sleep', q: 'best',
      fx: { energy: 22 }, mood: 'sleepy',
      react: 'The blocks stay scattered. You take an actual bath and go to bed early. Tomorrow-you, facing a 6 AM toddler with half a battery more, sends profound thanks.',
      tip: { head: 'You can\'t pour from an empty cup', body: 'Parental burnout is real and measurable — and a depleted parent has a shorter fuse, less patience, less play in them. Rest isn\'t stolen from your child; it\'s infrastructure for them. The mess will still be there. (It\'s always still there.)' } },
    { label: 'Power-clean everything — you can\'t relax in chaos anyway', q: 'ok',
      fx: { energy: 6 }, mood: 'neutral',
      react: 'By 10:30 the house is beautiful and you are a husk on the couch, too tired to enjoy it. The order does soothe you a little. A LITTLE.',
      tip: { head: 'The house is not the report card', body: 'If visible order genuinely recharges you, fair enough — know thyself. But check who you\'re cleaning for. A tidy house with a depleted parent is a worse deal for a toddler than cheerful chaos. Lower the bar; it\'s survival season.' } },
    { label: 'Collapse on the couch and doomscroll until 1 AM', q: 'poor',
      fx: { energy: -8 }, mood: 'sleepy',
      react: 'You surface at 12:54 AM from a 90-minute scroll you don\'t remember enjoying. Sleep: shortened. Brain: buzzing. The 6 AM toddler alarm has no snooze button, and it knows.',
      tip: { head: 'Revenge bedtime procrastination', body: 'Staying up to reclaim "me time" you didn\'t get all day is so common it has a name. The trap: it spends tomorrow\'s patience to feel free tonight. Try a planned, ENJOYABLE wind-down — chosen pleasure recharges; ambient scrolling mostly doesn\'t.' } }
  ]
},

/* ─────────────────────────── AGE 3 ─────────────────────────── */
{
  id: 'a3_why', age: 3, time: 'Morning', icon: '🌅', title: 'The Why Loop',
  text: 'Breakfast interrogation, question 47: "Why is the sky blue?" "Why does light scatter?" "Why are atoms?" "Why?" "But <em>why</em>?" Your coffee has gone cold.',
  choices: [
    { label: 'Answer a few honestly, then flip it: "Hmm, why do YOU think the sky is blue?"', q: 'best',
      fx: { lang: 6, bond: 3, energy: -6 }, mood: 'curious',
      react: '"Because... the sea painted it!" {name} spends ten minutes building a theory involving paintbrushes and seagulls. The why-loop became a wonder-loop.',
      tip: { head: 'Wonder beats Wikipedia', body: '"Why" at three is rarely a request for physics — it\'s "keep talking with me about the world". Flipping the question builds reasoning and language better than perfect answers. "What do you think?" and "Let\'s find out together" are the two most powerful phrases available.' } },
    { label: 'Patiently answer every single question with your best science', q: 'ok',
      fx: { lang: 4, energy: -10 }, mood: 'happy',
      react: 'You make it through 30 minutes of atmospheric optics for preschoolers before your brain blue-screens. {name} absorbed maybe 4% — but loved every second of your attention.',
      tip: { head: 'You\'re allowed to tap out', body: 'Marathon answering is generous but unsustainable, and the content matters less than the back-and-forth. "Great question — let\'s ask the library book later" is a legitimate, even excellent, answer. It models that not-knowing is fine.' } },
    { label: '"Because I said so. Eat your toast."', q: 'poor',
      fx: { lang: -1, bond: -1, energy: 1 }, mood: 'sad',
      react: 'The questions stop. {name} eats toast in silence. Somewhere, a tiny scientist files away the data point: questions annoy people.',
      tip: { head: 'Protect the asking', body: 'Question frequency at this age predicts later curiosity and learning. You don\'t have to ANSWER everything — but keep asking safe and welcome. "What a question! Tell me more" costs nothing and keeps the engine running.' } }
  ]
},
{
  id: 'a3_friend', age: 3, time: 'Evening', icon: '🌇', title: 'Mr. Pickles, Party of Three',
  text: '{name} announces that <em>Mr. Pickles</em> — an invisible penguin, apparently — is joining dinner and requires his own chair, plate, and "small fork".',
  choices: [
    { label: 'Set a place for Mr. Pickles and ask him about his day via {name}', q: 'best',
      fx: { lang: 5, emotion: 4, bond: 3, energy: -5 }, mood: 'joy',
      react: 'Mr. Pickles, it emerges, is afraid of thunder and doesn\'t like peas — which is fascinating, because so is {name}. You just got a window into their inner world, penguin-shaped.',
      tip: { head: 'Imaginary friends are healthy', body: 'Around two-thirds of children have an imaginary companion at some point — it\'s linked to STRONGER social understanding, not loneliness. Kids often route their own feelings through the friend. Listen to what Mr. Pickles is afraid of; it\'s usually the real briefing.' } },
    { label: 'Tolerate the penguin neutrally — no extra plate, no objection', q: 'ok',
      fx: { emotion: 2, energy: -1 }, mood: 'happy',
      react: 'Mr. Pickles dines invisibly without official recognition. {name} plays on happily. Fine — though a small invitation declined.',
      tip: { head: 'Play is an invitation', body: 'When a child brings you into their pretend world, they\'re offering a tour of their mind. You don\'t need to perform — even two questions to the penguin tells them their inner world is welcome at your table.' } },
    { label: '"There\'s no penguin, sweetie. You\'re too big for pretend friends."', q: 'poor',
      fx: { emotion: -2, bond: -2, energy: 0 }, mood: 'sad',
      react: '{name}\'s face falls. Mr. Pickles is never mentioned at dinner again — he goes underground, and so does that little window into {name}\'s feelings.',
      tip: { head: 'Don\'t evict the penguin', body: 'Imaginary friends aren\'t confusion about reality — kids this age mostly know it\'s pretend, and it\'s doing real developmental work (perspective-taking, emotional rehearsal). They retire on their own schedule, usually by 7–9.' } }
  ]
},
{
  id: 'a3_wall', age: 3, time: 'Afternoon', icon: '☀️', title: 'The Wall Mural',
  text: 'You find {name} beaming beside a six-foot crayon masterpiece... on the hallway wall. "I made a RAINBOW DOG!" Pride: maximal. Wall: ruined.',
  choices: [
    { label: 'Breathe. "Wow, a rainbow dog! AND — walls aren\'t for drawing. Let\'s clean together, then I\'ll hang big paper just for you."', q: 'best',
      fx: { emotion: 5, motor: 2, bond: 2, energy: -9 }, mood: 'neutral',
      react: 'You scrub side by side (their circles accomplish nothing, adorably), then tape up a giant paper "art wall". The artist is undimmed; the boundary is clear; the hallway... mostly recovers.',
      tip: { head: 'Limit the behavior, not the spirit', body: 'The gold-standard discipline shape: acknowledge the impulse (creativity!), state the limit (not walls), involve them in repair (cleaning), provide the legal outlet (paper). Natural, related consequences teach; anger just teaches kids to hide the evidence.' } },
    { label: 'Sigh, clean it yourself, and quietly move the crayons out of reach', q: 'ok',
      fx: { emotion: 0, energy: -7 }, mood: 'curious',
      react: 'The wall recovers; the crayons vanish; nothing was learned by anyone except you (lesson: hide crayons). {name} wonders where the crayons went — and the urge to make BIG art remains unhoused.',
      tip: { head: 'Avoided isn\'t taught', body: 'Removing temptation is fine triage, but it skips the lesson AND the outlet. Kids this age crave large-scale art (it\'s gross-motor + creativity). An easel, sidewalk chalk, or taped-up cardboard redirects the urge before it finds your walls again.' } },
    { label: '"BAD! Look what you DID!" — angry lecture, crayons confiscated, time-out', q: 'poor',
      fx: { emotion: -3, bond: -2, energy: -10 }, mood: 'cry',
      react: '{name} sobs in the corner, mostly absorbing: making things → people I love get scary. Next masterpiece will be behind the couch where you can\'t see it.',
      tip: { head: 'Shame hides; it doesn\'t teach', body: 'A three-year-old genuinely can\'t always preview "will this be bad?" — impulse control is years from finished. Harsh reactions don\'t install it faster; they install hiding, lying, and fear. Calm + repair + outlet installs the actual lesson.' } }
  ]
},
{
  id: 'a3_dark', age: 3, time: 'Night', icon: '🌙', title: 'Monsters in the Closet',
  text: 'Third night running: "{name} can\'t sleep — there\'s a <em>MONSTER</em> in the closet!" The fear in those eyes is 100% real, whatever the closet contains.',
  choices: [
    { label: 'Take the fear seriously: check the closet together, add a nightlight, leave a "brave buddy" stuffed animal on guard', q: 'best',
      fx: { emotion: 6, bond: 4, energy: -7 }, mood: 'shy',
      react: 'Closet inspected jointly. Nightlight glowing. Sir Hops appointed Night Guard. {name} sleeps — fear respected, fear shrunk. Three more nights and the closet is just a closet.',
      tip: { head: 'Validate the feeling, not the monster', body: 'The fear is real even though the monster isn\'t — and at three, imagination and reality still blur at night. "I can see you\'re scared; let\'s look together" treats them as credible while showing the evidence. Nightlights and comfort objects are legitimate tools, not crutches.' } },
    { label: 'Deploy "Monster Spray" (water bottle, official label) — spritz the closet nightly', q: 'ok',
      fx: { emotion: 3, energy: -4 }, mood: 'happy',
      react: 'The closet is ceremonially de-monstered. {name} sleeps soundly, clutching the spray bottle like a holy relic. Effective! Though officially, the household now confirms monsters exist and require pest control.',
      tip: { head: 'Charming, with a footnote', body: 'Monster spray works and many pediatricians shrug approvingly. The trade-off: it confirms monsters are real-but-manageable rather than not-real. Fine for most kids; if anxiety is high, the "let\'s check together + you are safe" route builds sturdier ground.' } },
    { label: '"Monsters aren\'t real. You\'re fine. Go to sleep." Close the door.', q: 'poor',
      fx: { emotion: -3, bond: -2, energy: 0 }, mood: 'cry',
      react: 'Crying through the door for forty minutes. {name} learned: when I\'m most scared, help doesn\'t come. The monster, meanwhile, remains (in their experience) fully real and now unsupervised.',
      tip: { head: 'Logic doesn\'t reach night fear', body: '"Not real" is true and useless — a three-year-old\'s fear lives below logic. Dismissed fears don\'t shrink; they grow teeth and go quiet. Two minutes of taking it seriously saves forty minutes of crying, tonight and for many nights.' } }
  ]
},
{
  id: 'a3_park', age: 3, time: 'Evening', icon: '🌇', title: 'Leaving the Playground',
  text: 'Dinner needs cooking. "Five more minutes, then home!" Five minutes pass. <em>"NO HOME! MORE SLIDE!"</em> — {name} welds themself to the ladder.',
  choices: [
    { label: 'Warnings + a job: "Two more slides! ... Last one! Now — can you carry the keys and race me to the gate?"', q: 'best',
      fx: { emotion: 5, motor: 2, energy: -7 }, mood: 'proud',
      react: 'Two ceremonial final slides, then {name} sprints for the gate jangling the keys like a tiny janitor, transition forgotten. Exits, it turns out, can be engineered.',
      tip: { head: 'Transitions are the boss fight', body: 'Three-year-olds don\'t resist leaving — they resist STOPPING. Countdown warnings let the brain prepare; a transition job (carry keys, push the button, race you) replaces the lost fun with new purpose. Hard exits become games with embarrassing reliability.' } },
    { label: '"One... two..." — the counting voice, with a consequence at three', q: 'ok',
      fx: { emotion: 1, energy: -5 }, mood: 'mad',
      react: '{name} stomps over at "two-and-three-quarters", scowling. It worked — through threat-shaped pressure. Compliance: achieved. Skill for next time: not really built.',
      tip: { head: 'Counting works until it doesn\'t', body: 'The countdown borrows obedience from suspense, which is fine occasionally — but it teaches "comply at 2.9" rather than how to end fun gracefully. Pair it with warnings and transition rituals so the skill, not just the fear, grows.' } },
    { label: 'Scoop them up mid-scream and carry them off under your arm, lecturing', q: 'poor',
      fx: { emotion: -2, bond: -1, energy: -11 }, mood: 'cry',
      react: 'The full airport-carry, screaming all the way past the other parents. Everyone\'s cortisol is maxed. Tomorrow\'s park exit is now pre-loaded with dread on both sides.',
      tip: { head: 'Sometimes unavoidable — never first', body: 'Every parent has done the firefighter carry; sometimes you genuinely must. But as the DEFAULT, it teaches that endings come as ambushes, making the clinging worse. Warnings cost 30 seconds and save the scene. (And skip the lecture; nobody can hear during a carry.)' } }
  ]
},
{
  id: 'a3_help', age: 3, time: 'Morning', icon: '🌅', title: 'The Tiny Helper',
  text: 'Pancake morning. {name} drags a chair to the counter: "I DO IT! I pour!" The batter bowl is full. The floor is clean. These facts are on a collision course.',
  choices: [
    { label: 'Give a real job, accept the mess: steady their hands on the cup, let them pour', q: 'best',
      fx: { motor: 6, emotion: 4, bond: 3, energy: -8 }, mood: 'proud',
      react: 'Forty percent of the batter reaches the pan, which is honestly above forecast. {name} glows like a lighthouse: "I MADE pancakes!" — and they will remember this longer than you\'ll remember the floor.',
      tip: { head: 'Competence is built from mess', body: 'Letting kids do real (small, safe) tasks — pouring, stirring, carrying — builds motor skills AND the deep belief "I am capable". Montessori\'s core insight: never routinely do for a child what they\'re burning to learn to do themselves. Budget the mess; it\'s tuition.' } },
    { label: 'Give a pretend job: stirring an empty bowl with great ceremony', q: 'ok',
      fx: { emotion: 1, energy: -3 }, mood: 'curious',
      react: '{name} stirs air importantly... for about ninety seconds, then narrows their eyes at the REAL bowl. Three-year-olds audit. The decoy is collapsing.',
      tip: { head: 'Kids detect fake jobs', body: 'Pretend tasks buy you minutes but kids quickly sense when their "help" doesn\'t matter, and the message lands as "you can\'t really do things". Real micro-jobs exist at every skill level: tearing lettuce, sprinkling flour, whisking (a nearly spill-proof crowd-pleaser).' } },
    { label: '"You\'re too little — go watch your show, I\'ll call you when it\'s ready."', q: 'poor',
      fx: { emotion: -2, motor: -1, energy: 4 }, mood: 'sad',
      react: 'Pancakes: efficient, uniform, on schedule. {name}: on the couch, learning that the kitchen is a no-kids zone. The eagerness to help has a shelf life, and it just got shorter.',
      tip: { head: 'The helping window', body: 'Toddlers BEG to do chores; teenagers famously don\'t. Research on household helping shows kids included early stay helpers for life — the window where they WANT to is when the habit installs. It\'s slower now; it pays compound interest for a decade.' } }
  ]
},
{
  id: 'a3_lie', age: 3, time: 'Afternoon', icon: '☀️', title: 'The Cookie Mystery',
  text: 'The cookie jar is open. A chair is suspiciously adjacent. {name}\'s entire lower face is chocolate. "Did you eat a cookie?" — <em>"...No."</em>',
  choices: [
    { label: 'Skip the trial: "I see chocolate and an open jar. Cookies are after dinner. Help me close it up — and you can tell me the truth, always."', q: 'best',
      fx: { emotion: 5, lang: 2, bond: 3, energy: -5 }, mood: 'shy',
      react: 'A long pause. "...I eated it." You thank them for the truth, restate the rule, and the chocolate face nods solemnly. Honesty just got cheaper than lying — which is the whole game.',
      tip: { head: 'Lying at 3 is a milestone (really)', body: 'First lies mean a child discovered other minds don\'t see their thoughts — a genuine cognitive leap. Don\'t set honesty traps ("did you...?" when you KNOW); state what you see, keep truth-telling safe and cheap. Kids lie less to parents who don\'t explode.' } },
    { label: 'Playful detective: "Hmm! A mystery! Let me examine these cheeks for evidence..."', q: 'ok',
      fx: { bond: 3, emotion: 1, energy: -4 }, mood: 'joy',
      react: 'Giggles erupt mid-investigation; confession achieved via tickle. Sweet and connected — though the rule about cookies got a bit lost in the comedy.',
      tip: { head: 'Light is right, plus the limit', body: 'Humor is a great de-escalator and keeps honesty unscary. Just land the plane: after the giggles, calmly restate the boundary ("cookies are an after-dinner thing"), or the lesson evaporates with the laughter.' } },
    { label: '"LYING is the worst thing you can do!" — punishment doubled for the lie', q: 'poor',
      fx: { emotion: -3, bond: -2, energy: -8 }, mood: 'cry',
      react: 'Tears, confusion — at three, the "lie" was barely more than a wish that it weren\'t true. Main lesson stored: telling the truth around here is dangerous. Next time the evidence will be hidden better.',
      tip: { head: 'Punishing lies creates better liars', body: 'Research is blunt: harsh punishment for lying doesn\'t reduce lying — it improves lying SKILL. Kids tell the truth to adults who keep it safe. Save the moral weight for later years; at three, build the runway: truth → calm response → repair.' } }
  ]
},
{
  id: 'a3_cup', age: 3, time: 'Morning', icon: '🌅', title: 'The Wrong Blue Cup',
  text: 'You served milk in the blue cup. Apparently it is the <em>WRONG</em> blue cup. The correct blue cup is dirty. The meltdown approaching is best measured in megatons.',
  choices: [
    { label: 'Empathize fully, hold reality: "You wanted THAT cup. It\'s in the wash. So frustrating! Wrong-cup milk or wait — you choose."', q: 'best',
      fx: { emotion: 6, energy: -8 }, mood: 'cry',
      react: 'Ninety seconds of genuine grief for the correct cup (do not laugh, do NOT laugh)... then a sniffle: "...wrong cup okay." {name} just survived a disappointment at full size. That\'s a rep.',
      tip: { head: 'Rigidity is a feature, not defiance', body: 'Three-year-olds cling to sameness because the world is huge and routines are handrails. The "wrong cup" meltdown is real grief at unmet expectation. Validating + holding reality teaches flexibility better than either caving or mocking. Each survived disappointment is a workout.' } },
    { label: 'Quick-wash the correct cup. It\'s 7 AM. Choose peace.', q: 'ok',
      fx: { bond: 1, energy: -2 }, mood: 'happy',
      react: 'Thirty seconds of scrubbing, milk transferred, crisis cancelled. Honestly? A reasonable trade some mornings. (Watch out if the cup rules start multiplying, though.)',
      tip: { head: 'Pick your battles — on purpose', body: 'Accommodating small preferences isn\'t spoiling; adults also have favorite mugs. The check: are YOU choosing flexibility, or being managed by escalation? If demands grow when met, it\'s time to practice some disappointments. If it\'s just a cup thing, wash the cup.' } },
    { label: '"You\'re crying about a CUP? It\'s the SAME COLOR. This is ridiculous."', q: 'poor',
      fx: { emotion: -3, bond: -1, energy: -6 }, mood: 'cry',
      react: 'The meltdown doubles — now it\'s about the cup AND about being laughed at while sad. Nothing about being three feels ridiculous from inside three.',
      tip: { head: 'Small to you, huge to them', body: 'Mocking a child\'s distress — even gently — teaches them their feelings are embarrassing, which later becomes "I won\'t tell my parents things". You can find it privately hilarious (and you will) while still offering a straight face and a hug.' } }
  ]
},

/* ─────────────────────────── AGE 4 ─────────────────────────── */
{
  id: 'a4_conflict', age: 4, time: 'Afternoon', icon: '☀️', title: 'The Preschool Shove',
  text: 'Pickup time. The teacher takes you aside: {name} <em>pushed</em> a classmate over a dump truck today. The classmate cried. {name} is currently studying their own shoes.',
  choices: [
    { label: 'Calm first, then coach: "You wanted the truck. Pushing isn\'t okay. What could you do instead? How can we help Leo feel better?"', q: 'best',
      fx: { emotion: 6, lang: 2, bond: 2, energy: -8 }, mood: 'shy',
      react: 'After some shoe-studying: "...ask for a turn?" Tomorrow {name} delivers Leo a drawing of (what may be) a truck. Repair made — by them, not just for them.',
      tip: { head: 'Coach the repair, not just the apology', body: 'Conflict is the curriculum at four — impulse control is still under construction. The sequence that builds skill: name the feeling, state the limit, problem-solve alternatives, support THEM making repair. A forced instant "sorry" skips every educational step.' } },
    { label: 'March over now: "Say sorry to Leo. SAY it."', q: 'ok',
      fx: { emotion: 1, energy: -6 }, mood: 'mad',
      react: 'A mumbled "...sorry" delivered to the floor. Box checked; social ritual observed; approximately nothing felt or learned. Leo seems unmoved by the transaction.',
      tip: { head: 'Empty sorries are empty', body: 'Forced apologies teach the WORD, not the empathy. Kids learn repair from doing it semi-voluntarily with support, and from watching you apologize sincerely. "What would help Leo feel better?" produces better sorries than "say sorry" ever has.' } },
    { label: 'Shame it: "I am SO disappointed. Everyone saw. You were the bad kid today."', q: 'poor',
      fx: { emotion: -4, bond: -2, energy: -7 }, mood: 'cry',
      react: '{name} dissolves. The lesson that lands isn\'t "pushing hurts people" — it\'s "I AM bad". Shame doesn\'t build empathy; it builds kids who hide what they did.',
      tip: { head: 'Guilt teaches, shame buries', body: 'There\'s a researched difference: guilt ("I DID a bad thing") motivates repair; shame ("I AM bad") motivates hiding and lying. Address the act, protect the identity: "You\'re a kind kid who made an unkind choice. Let\'s fix it."' } }
  ]
},
{
  id: 'a4_cant', age: 4, time: 'Morning', icon: '🌅', title: 'The Puzzle Wall',
  text: 'The new 24-piece puzzle was going GREAT until piece 19. "{name} — I CAN\'T DO IT!" Pieces scatter. Tears imminent. The puzzle has become the enemy.',
  choices: [
    { label: 'Sit close: "This part is hard. You did 18 pieces! Want to find all the edge pieces together first?"', q: 'best',
      fx: { emotion: 6, motor: 2, bond: 3, energy: -7 }, mood: 'proud',
      react: 'Edges first, then corners — and {name} slots the final piece personally, arms up like a gymnast sticking the landing. "I did it! It was HARD and I did it!" That sentence is gold. Frame it.',
      tip: { head: 'Praise the process', body: 'Carol Dweck\'s growth-mindset research: praising effort and strategy ("you tried three ways!") builds kids who seek challenges; praising smartness builds kids who avoid them. And breaking hard things into chunks is THE life skill — taught here, with cardboard.' } },
    { label: 'Slide the pieces into place yourself while narrating cheerfully', q: 'ok',
      fx: { emotion: 1, energy: -4 }, mood: 'neutral',
      react: 'Puzzle complete! By you. {name} watched the rescue with relief and absorbed the quiet lesson: when things get hard, someone else finishes them.',
      tip: { head: 'Rescue less, scaffold more', body: 'The sweet spot ("zone of proximal development") is help that keeps THEM working: hint at the edge pieces, rotate one piece meaningfully, ask "where might the sky go?" If your hands do the task, your hands get the learning.' } },
    { label: '"It\'s EASY, look — you\'re just not trying."', q: 'poor',
      fx: { emotion: -3, bond: -1, energy: -5 }, mood: 'mad',
      react: 'If it\'s easy and {name} can\'t do it, what does that make {name}? The puzzle gets abandoned — and quietly, so does trying hard at puzzles in front of you.',
      tip: { head: 'Never "it\'s easy"', body: '"Easy" is meant as encouragement but lands as verdict: failing at easy things means I\'m dumb. Say "this is TRICKY — tricky things take more tries" instead. It\'s more true and it keeps the kid in the game.' } }
  ]
},
{
  id: 'a4_nightmare', age: 4, time: 'Night', icon: '🌙', title: 'The 3 AM Dragon',
  text: 'A shriek at 3 AM. {name} is sitting up, sweaty and sobbing: "A dragon was chasing me and you were GONE!" Their little heart is hammering audibly.',
  choices: [
    { label: 'Hold them close, stay unhurried: "You\'re safe. I\'m here. I\'ve got you." Stay till breathing slows; retell the dream with a silly ending at breakfast', q: 'best',
      fx: { emotion: 6, bond: 4, energy: -9 }, mood: 'sad',
      react: 'The shaking slows against your chest. By morning, the dragon has been ceremonially rewritten — turns out he was chasing {name} to return a lost sock. Giggles defeat dragons reliably.',
      tip: { head: 'Co-regulation at 3 AM', body: 'Nightmares peak around 3–6 as imagination outpaces reality-testing. A child\'s panicked nervous system calms by syncing with yours — that\'s co-regulation, and it\'s physiology, not spoiling. The morning "silly rewrite" technique gives them authorship over the fear.' } },
    { label: 'Bring them into your bed for the rest of the night', q: 'ok',
      fx: { bond: 3, energy: -3 }, mood: 'sleepy',
      react: 'Instant calm; {name} sleeps starfished, you sleep clinging to the edge. Completely fine tonight — just notice if "nightmare" becomes a nightly password to the big bed.',
      tip: { head: 'Comfort first, patterns second', body: 'After a real nightmare, almost anything warm is right. Families differ on shared sleep — the only rule is choosing your pattern on purpose. If you\'d rather they re-settle in their own bed, comfort them there; it builds "my bed is safe" directly.' } },
    { label: '"It wasn\'t real. Dreams can\'t hurt you. Back to sleep." Exit.', q: 'poor',
      fx: { emotion: -3, bond: -2, energy: -2 }, mood: 'cry',
      react: 'Technically accurate; emotionally Antarctic. {name} lies awake in the dark with a still-pounding heart and new data: terror at 3 AM is handled alone here.',
      tip: { head: '"Not real" doesn\'t help', body: 'The dragon was fake; the adrenaline is completely real. Fear needs soothing before it can hear logic — at four or at forty. Two minutes of holding does what zero minutes of physiology lectures ever will.' } }
  ]
},
{
  id: 'a4_lose', age: 4, time: 'Evening', icon: '🌇', title: 'The Sore Loser',
  text: 'Family board game night. {name} draws the bad card, loses the lead, and ERUPTS — board flipped, pieces flying, "I\'m NEVER playing AGAIN!" Exit, stage left, wailing.',
  choices: [
    { label: 'Let the storm pass, then: "Losing feels AWFUL. I get grumpy too. Rematch? — and let\'s practice what winners AND losers say."', q: 'best',
      fx: { emotion: 6, bond: 3, energy: -7 }, mood: 'mad',
      react: 'The rematch happens. {name} loses AGAIN (brutal) — fists clench, jaw works... "good game" emerges through gritted teeth. The pieces stay on the board. Olympic-level progress.',
      tip: { head: 'Losing is a trainable skill', body: 'Four-year-olds equate losing the game with BEING a loser — ego and outcome aren\'t separate yet. It\'s built by reps: short games, visible modeling ("darn! oh well, fun game"), naming the feeling, celebrating recovery. Kids who practice losing small at 4 lose gracefully at 14.' } },
    { label: 'Quietly arrange to let them win most games. Peace restored.', q: 'ok',
      fx: { emotion: 0, bond: 1, energy: -3 }, mood: 'joy',
      react: 'Victory! Again! {name} is delighted and serene — and increasingly convinced winning is the natural order. The first real loss at a friend\'s house is going to be cinematic.',
      tip: { head: 'Rig less as they grow', body: 'Letting littles win sometimes is kind scaffolding. Rigging EVERYTHING builds glass confidence that shatters on contact with other children. Mix in losses at home — it\'s the world\'s safest place to practice being disappointed.' } },
    { label: '"If you can\'t lose nicely, we just won\'t play games anymore." Pack it up.', q: 'poor',
      fx: { emotion: -3, bond: -2, energy: -2 }, mood: 'sad',
      react: 'Game night: cancelled. The exact arena where losing could be practiced safely is now closed, with the kid who most needs the reps banned from the gym.',
      tip: { head: 'Don\'t cancel the practice field', body: 'Removing games removes the practice that builds the skill — like cancelling swim lessons because the kid can\'t swim. Shrink the stakes instead: shorter games, co-op games, "loser picks the snack". Keep the reps coming.' } }
  ]
},
{
  id: 'a4_death', age: 4, time: 'Afternoon', icon: '☀️', title: 'The Big Question',
  text: 'Quiet car ride, then from the back seat, conversationally: "Will Grandpa die? Will YOU die? Will <em>I</em> die?" — in exactly the tone of asking about lunch.',
  choices: [
    { label: 'Honest, simple, calm: "Everything alive dies someday — usually after a very long life. I plan to be here a long, long time, loving you."', q: 'best',
      fx: { emotion: 6, lang: 2, bond: 4, energy: -7 }, mood: 'curious',
      react: 'A thoughtful pause. "Okay. Can we get noodles?" The question wasn\'t morbid — it was an inventory check of the world, and you passed it without flinching.',
      tip: { head: 'Answer what\'s asked, calmly', body: 'Death questions at four are cognitive, not (usually) anxious — they\'re mapping how things work. Short, truthful, concrete answers beat both euphemism ("went to sleep" causes bedtime fear) and oversharing. Calm, askable parents get asked again — which is the goal.' } },
    { label: '"Ooh look — should we get ice cream?!" Subject: changed', q: 'ok',
      fx: { emotion: 0, energy: -1 }, mood: 'happy',
      react: 'Ice cream secured, question deferred. But it doesn\'t evaporate — it goes underground, to be processed alone or with whatever the kid at preschool thinks happens. (His theory involves zombies.)',
      tip: { head: 'Big questions return — be there', body: 'Deflection signals "this topic is unsafe with my parents". Kids fill the silence with playground folklore, which is consistently weirder and scarier than the truth. If you\'re caught off guard: "GREAT question — let me think and we\'ll talk at dinner" buys time without closing the door.' } },
    { label: '"Nobody\'s dying! Don\'t think about sad things, you\'re a kid!"', q: 'poor',
      fx: { emotion: -2, lang: -1, energy: -3 }, mood: 'neutral',
      react: 'Two problems shipped in one box: a falsehood they\'ll eventually catch, and a rule that big feelings are off-limits here. The questions will continue — just not addressed to you.',
      tip: { head: 'Don\'t promise the impossible', body: '"Nobody dies" is a lie with an expiry date, and kids remember who told it when a pet or grandparent eventually goes. Truth at kid-scale ("most people live very long") protects both their trust and their preparedness.' } }
  ]
},
{
  id: 'a4_dawdle', age: 4, time: 'Morning', icon: '🌅', title: 'The 40-Minute Sock',
  text: 'T-minus 10 minutes to leave. {name} has been putting on one sock for most of recorded history, pausing to narrate the sock\'s feelings. You can feel your eye twitching.',
  choices: [
    { label: 'Connect, then commission: kneel, hand on shoulder — "Hey. We leave when the big hand hits 6. Can you beat the timer? GO!"', q: 'best',
      fx: { emotion: 4, motor: 2, energy: -6 }, mood: 'joy',
      react: 'Sock two goes on in 9 seconds flat (a personal record by roughly 40 minutes). Connection plus a game outperforms volume plus despair, every single morning. Annoyingly.',
      tip: { head: 'Connect before you direct', body: 'A dawdling four-year-old isn\'t defying you — time literally isn\'t real to them yet. Instructions shouted across rooms bounce off; touch + eye contact + a game lands. Long-term fix: build slack into mornings and prep everything the night before. (Yes, it\'s you who has to change. Sorry.)' } },
    { label: 'Just do it all yourself — socks, shoes, coat — child as mannequin', q: 'ok',
      fx: { motor: -1, energy: -5 }, mood: 'neutral',
      react: 'Door achieved on time, child dressed by valet service. Multiply by 180 school mornings and you\'ve hired yourself as a full-time dresser for someone who can do it — slowly.',
      tip: { head: 'Crisis mode vs. every mode', body: 'On genuinely late days, dressing them yourself is fine triage — no medals lost. As the SYSTEM, it trades away their independence for your minutes, and the dawdling never improves because it never has to. Budget slow time; buy back skill.' } },
    { label: '"WE ARE LATE!! SOCKS!! NOW!!" — countdown threats at volume', q: 'poor',
      fx: { emotion: -3, bond: -1, energy: -10 }, mood: 'cry',
      react: 'Crying. The sock is now SOAKED in tears and entirely off. You leave latest of all possible timelines, with a sad kid and a sour stomach. Volume, science confirms, does not speed up socks.',
      tip: { head: 'Stress slows little brains', body: 'Yelling floods a child with cortisol, which IMPAIRS the exact executive function getting the sock on requires. It feels productive and is the opposite. The fix is structural (more time, fewer steps), not vocal. Every parent yells sometimes — repair after, adjust the morning, repeat less.' } }
  ]
},
{
  id: 'a4_self', age: 4, time: 'Night', icon: '🌙', title: 'The Village',
  text: 'Your friend offers, again, sincerely: "Drop {name} here Saturday — go DO something. You look exhausted." You can\'t remember your last unscheduled hour. Your reflex is to decline.',
  choices: [
    { label: 'Say yes. Actually rest — walk, nap, sit in a café like a mysterious stranger', q: 'best',
      fx: { energy: 24, bond: 2 }, mood: 'happy',
      react: 'You return three hours later weirdly taller. {name} had a blast, barely noticed your absence, and gets a parent at 80% battery instead of 15%. The village works when you let it.',
      tip: { head: 'Accepting help IS parenting', body: 'Humans never raised children solo — the "village" isn\'t a luxury, it\'s the design spec. Kids benefit directly from other safe adults, AND from a recharged parent. Declining all help teaches them that needing help is shameful. Model receiving it.' } },
    { label: 'Accept — then spend the entire window on errands and laundry', q: 'ok',
      fx: { energy: 8 }, mood: 'neutral',
      react: 'Three hours: groceries, pharmacy, oil change, fold-a-thon. Objectively useful! The to-do list is shorter. The soul remains... un-watered. You collect {name} marginally less tired.',
      tip: { head: 'Chores aren\'t rest', body: 'Productive isn\'t the same as restored — your nervous system knows the difference even when your calendar doesn\'t. If childcare windows are rare, spend at least part of one on something with zero output: rest, play, a friend. Efficiency is not a personality.' } },
    { label: 'Decline: "Thanks, but nobody does it like I do. We\'re fine."', q: 'poor',
      fx: { energy: -6 }, mood: 'neutral',
      react: 'Another week, zero breaks. Patience: thinning. Snappishness: rising. {name} doesn\'t get a better parent from your refusing help — they get a more depleted one, with a side lesson that asking for help is weakness.',
      tip: { head: 'Martyrdom isn\'t a virtue', body: 'Parental burnout research is unambiguous: chronic depletion degrades exactly what kids need most — warmth, patience, play. "Only I can do it right" is exhaustion talking. Children of parents who rest learn that rest is allowed.' } }
  ]
},
{
  id: 'a4_volcano', age: 4, time: 'Evening', icon: '🌇', title: 'The Volcano (Yours)',
  text: 'End of a brutal day. {name} dumps the FULL cereal box on the floor — on purpose, while smiling — and something in you snaps. You hear yourself YELL. Their face crumples. Silence.',
  anchor: true,
  choices: [
    { label: 'Repair: breathe, kneel down. "I yelled. That was scary, and it wasn\'t okay. I\'m sorry. You\'re safe. I love you. Now — let\'s clean up this cereal."', q: 'best',
      fx: { emotion: 7, bond: 5, energy: -8 }, mood: 'sad',
      react: '{name} folds into your arms. Thirty seconds later: "...it was a LOT of cereal." You both snort-laugh into the wreckage. The yell happened; the repair is what they\'ll remember.',
      tip: { head: 'Rupture and repair', body: 'Attachment research\'s most liberating finding: good parents don\'t avoid all ruptures — they REPAIR them. A sincere, specific apology teaches emotional responsibility better than a hundred calm days. Kids don\'t need perfect parents; they need ones who come back.' } },
    { label: 'Skip the words — extra dessert and extra-nice tonight, pretend it didn\'t happen', q: 'ok',
      fx: { bond: 1, energy: -4 }, mood: 'neutral',
      react: 'Ice cream is served; warmth resumes; nothing is named. {name} relaxes but files the event unprocessed: sometimes the people you love explode, and then there\'s ice cream. The flinch stays.',
      tip: { head: 'Niceness isn\'t repair', body: 'Compensating without acknowledging leaves the child to make sense of the scary moment alone — often concluding it was their fault. Repair needs words: what happened, that it wasn\'t okay, that it wasn\'t their fault, that they\'re safe. THEN ice cream, by all means.' } },
    { label: 'Justify it: "Well, if you\'d LISTENED, I wouldn\'t have to yell!"', q: 'poor',
      fx: { emotion: -4, bond: -3, energy: -6 }, mood: 'cry',
      react: 'The lesson, delivered and received: when big people lose control, it\'s the small person\'s fault. {name} will carry that grammar into every future relationship until someone unteaches it.',
      tip: { head: 'Own your weather', body: 'Blaming the child for your eruption teaches them responsibility for other people\'s emotions — a heavy backpack that takes decades to put down. The grown-up\'s reaction is always the grown-up\'s. (Yelling happens to every parent. Owning it is what separates a bad moment from a bad lesson.)' } }
  ]
},

/* ─────────────────────────── AGE 5 ─────────────────────────── */
{
  id: 'a5_name', age: 5, time: 'Morning', icon: '🌅', title: 'Wobbly Letters',
  text: 'Practicing name-writing. The letters wobble like newborn deer; the E has too many arms. {name} slams the pencil: "I can\'t DO it. I\'m <em>DUMB</em>."',
  choices: [
    { label: 'Catch the label: "Whoa — not dumb. LEARNING. Look at this E vs last week\'s. Brains grow exactly when it feels hard. One more, tiny goal: just the first letter, best one yet."', q: 'best',
      fx: { emotion: 6, lang: 3, motor: 2, energy: -7 }, mood: 'proud',
      react: 'One letter. Then, unprompted, the whole name — wobbly, multi-armed, MAGNIFICENT. {name} tapes it to the fridge personally. "I\'m a good writer when it\'s hard," they explain. Correct.',
      tip: { head: 'Intervene on the self-label', body: '"I\'m dumb" at five is a fork in the road — kids who internalize fixed labels start avoiding challenge to protect the label. Counter with evidence of growth (compare to THEIR earlier work, not other kids\') and normalize struggle: "hard means your brain is in the gym".' } },
    { label: 'Guide their hand through every letter, hand-over-hand, till the name is perfect', q: 'ok',
      fx: { motor: 2, energy: -5 }, mood: 'neutral',
      react: 'A beautiful name on the page — written by four hands. {name} regards it with mild detachment, the way you\'d view a trophy someone else won wearing your jersey.',
      tip: { head: 'Their wobble beats your perfect', body: 'Hand-over-hand has its place for brand-new skills, but past that point the pride transfers to the helper. An ugly letter they wrote is worth ten lovely ones you steered. Fade support fast: model one, then watch.' } },
    { label: 'Panic-buy workbooks: "Everyone in your class can write. Drill time, every night."', q: 'poor',
      fx: { emotion: -3, energy: -9 }, mood: 'sad',
      react: 'Nightly drills commence. Writing graduates from "hard" to "dreaded". The letters do improve — and {name} now hides drawings because "they\'re not good".',
      tip: { head: 'Pressure poisons the well', body: 'Fine-motor readiness varies by literal years among five-year-olds — most catch up regardless of drilling. What pressure reliably produces isn\'t skill but anxiety, perfectionism, and avoidance. Protect the wanting-to; the able-to follows.' } }
  ]
},
{
  id: 'a5_bike', age: 5, time: 'Afternoon', icon: '☀️', title: 'Two Wheels of Terror',
  text: 'Training wheels: off (their request, last Tuesday\'s confidence). Now {name} stands frozen beside the bike. "Put them back on. I\'ll crash. I KNOW I\'ll crash."',
  choices: [
    { label: 'Shrink the mountain: pedals off, seat down, "just scoot and glide — crashing not possible". Their pace, your jog alongside', q: 'best',
      fx: { motor: 7, emotion: 4, energy: -9 }, mood: 'proud',
      react: 'Scooting → gliding → "DON\'T LET GO" → you let go (you monster) → and {name} is RIDING, screaming with terrified joy, helmet slightly crooked, fully airborne in spirit. Core memory: minted.',
      tip: { head: 'Slice fear into steps', body: 'Courage isn\'t the absence of fear — it\'s fear cut into pieces small enough to swallow. The balance-bike method (pedals off, feet down) keeps the child in control of every increment, so confidence is BUILT rather than demanded. Works on bikes, pools, stages, everything.' } },
    { label: '"Ride to the mailbox and ice cream is yours."', q: 'ok',
      fx: { motor: 3, energy: -5 }, mood: 'curious',
      react: 'For ice cream, {name} mounts the bike, white-knuckled, and survives to the mailbox. Dessert: earned. Fear: bribed past, not actually visited. It\'ll be waiting at the next mailbox.',
      tip: { head: 'Bribes move feet, not feelings', body: 'External rewards can unstick a stuck moment — that\'s real. But they route AROUND the fear instead of through it, so nothing is learned about handling fear itself. Use a bribe to start; use small steps to actually finish.' } },
    { label: '"You\'re FINE, don\'t be a baby—" push the seat and let go', q: 'poor',
      fx: { motor: 1, emotion: -3, bond: -2, energy: -6 }, mood: 'cry',
      react: 'Eight wobbly feet, a slow-motion topple, skinned palm, tears — and a new certainty: "I TOLD you I\'d crash, and you MADE me." The bike enters the garage. It does not come out for months.',
      tip: { head: 'Flooding backfires', body: 'Pushing a panicked kid past their consent ("rip off the bandaid") usually confirms the fear and adds a betrayal to it. Pressure from behind creates resistance; an exit door creates progress. Their pace costs days; broken trust costs seasons.' } }
  ]
},
{
  id: 'a5_friend', age: 5, time: 'Afternoon', icon: '☀️', title: 'Friendship Earthquake',
  text: '{name} trudges out of kindergarten like a tiny defeated soldier: "Maya said she\'s not my friend anymore and she played with Zoe ALL day." Lip: trembling. World: ending.',
  choices: [
    { label: 'Just listen first. "Ouch. That really hurts." Let it all come out — THEN ask: "What do you want to try tomorrow?"', q: 'best',
      fx: { emotion: 6, lang: 3, bond: 4, energy: -6 }, mood: 'sad',
      react: 'The whole saga pours out (there is backstory; there is a stolen glitter crayon). Heard at last, {name} self-generates tomorrow\'s plan: "Maybe... me, Maya AND Zoe can play vets." Diplomat: born.',
      tip: { head: 'Listen past the urge to fix', body: 'Five-year-old friendships rupture and heal weekly — the skill being built is processing social pain, and it\'s built by being HEARD, not managed. Empathize fully before any problem-solving ("connect before you correct" applies to heartbreak too). Kids consulted, not rescued, become kids who cope.' } },
    { label: '"Oh sweetie, you\'ll be friends again by Friday — that\'s just how kids are."', q: 'ok',
      fx: { emotion: 1, energy: -2 }, mood: 'neutral',
      react: 'You\'re right, of course — Friday brings full reconciliation and a joint mud project. But today\'s very real ache was waved off, and {name} drops the subject... and maybe the habit of bringing it.',
      tip: { head: 'True isn\'t the same as helpful', body: 'Accurate predictions can still be dismissals. The pain is now even if the rift is temporary. Validate first ("that hurt today"), THEN offer perspective — order of operations is everything in comfort.' } },
    { label: '"WHAT? That\'s mean. I\'m messaging Maya\'s mother right now."', q: 'poor',
      fx: { emotion: -2, energy: -7 }, mood: 'surprised',
      react: 'The moms exchange strained texts. Tomorrow Maya announces "MY mom says YOUR mom is dramatic". The five-year-olds, naturally, are friends again by snack time — the mothers are not.',
      tip: { head: 'Don\'t play their season', body: 'Jumping in over-scales the problem ("this is so bad a grown-up must act") and steals the practice rep. Save intervention for patterns of real exclusion or cruelty; for weather-grade friendship drama, be the coach with snacks, not the player on the field.' } }
  ]
},
{
  id: 'a5_chores', age: 5, time: 'Morning', icon: '🌅', title: 'The Allowance Question',
  text: '{name}, eyeing a toy catalog with the focus of a hedge-fund analyst: "Can I have JOBS? Jobs that make MONEY? I need four-and-twenty dollars for the dino lab."',
  choices: [
    { label: 'Split it: some chores are "family jobs" everyone does free; extra jobs earn coins toward the lab — plus a savings jar with a goal chart', q: 'best',
      fx: { emotion: 5, motor: 2, lang: 2, energy: -6 }, mood: 'proud',
      react: 'Weeks of feeding the cat (family job, free) and matching socks (boutique rate: 50¢). The jar fills. The chart fills in. Purchase day arrives via {name}\'s OWN money — the dino lab has never been assembled more smugly.',
      tip: { head: 'Two buckets: belonging and earning', body: 'Research on chores favors a split: some tasks are unpaid "because we\'re a family" (builds belonging and lifelong helpfulness), while extra jobs can earn money (teaches work→money→goals). Saving toward a visible goal at five is financial education that sticks.' } },
    { label: 'Sure — pay per chore, everything has a price, full free market', q: 'ok',
      fx: { motor: 2, energy: -4 }, mood: 'happy',
      react: 'A robust economy emerges. Also emerging: "How much to put my OWN plate away?" The little capitalist now invoices for basic citizenship. Renegotiation looms.',
      tip: { head: 'Beware the full market model', body: 'When EVERYTHING pays, helping becomes a transaction — and unpaid kindness stops making sense ("what do I get?"). Keep a core of contribute-because-we\'re-family tasks; sell only the extras. (Also set rates now, or face a unionized six-year-old.)' } },
    { label: '"Kids don\'t need money. If you want the toy, ask for your birthday."', q: 'poor',
      fx: { emotion: -1, energy: 0 }, mood: 'sad',
      react: 'The catalog closes. The toy arrives by birthday magic months later — received happily, valued briefly, broken Wednesday. The chance to learn earn-save-spend waits for another year.',
      tip: { head: 'Money skills start absurdly early', body: 'Studies suggest core money habits form by around age seven. A five-year-old saving coins toward a goal learns delayed gratification, counting, and the floaty difference between wanting and affording — cheap lessons now, expensive ones later.' } }
  ]
},
{
  id: 'a5_tales', age: 5, time: 'Evening', icon: '🌇', title: 'The Dragon in the Garage',
  text: 'Dinner. {name}, casually: "Today a dragon landed at school and I rode it over the fence and the teacher said I\'m the best flyer she\'s EVER seen." Eye contact: unwavering.',
  choices: [
    { label: 'Lean in: "WHAT happened next?!" — then after the epic: "That\'s a SPECTACULAR story. Did the real Tuesday have any dragon-ish parts?"', q: 'best',
      fx: { lang: 6, bond: 3, emotion: 2, energy: -5 }, mood: 'joy',
      react: 'The saga grows three more chapters (the dragon\'s name is Greg; he is lactose intolerant). Then, glowing: "...REALLY we did obstacle course and I was FASTEST." Both stories true, in their ways.',
      tip: { head: 'Tall tales are language fireworks', body: 'At five, elaborate stories aren\'t lying — they\'re narrative skill, vocabulary, and imagination doing pull-ups. Celebrate the STORY while gently labeling it one ("what an amazing story!") and kids learn the fiction/fact border without the joy being policed.' } },
    { label: '"Mm, that\'s nice, honey." Continue serving pasta', q: 'ok',
      fx: { lang: 1, energy: 0 }, mood: 'neutral',
      react: 'Greg the dragon, unappreciated, flies once around the table and quietly retires. Dinner proceeds. A small showcase of {name}\'s wildest skill — storytelling — played to an empty house.',
      tip: { head: 'Stories need audiences', body: 'Narrative skill at five predicts later literacy better than knowing letters does — and it grows by being received with enthusiasm and questions ("and THEN what?"). Two minutes of rapt audience is cheap fertilizer for a future reader-writer.' } },
    { label: '"That\'s LYING. None of that happened. We tell the TRUTH at this table."', q: 'poor',
      fx: { lang: -2, emotion: -2, bond: -1, energy: -4 }, mood: 'sad',
      react: 'Greg is executed mid-flight by the truth tribunal. {name} finishes dinner in silence. The imagination doesn\'t stop, of course — it just stops being performed for you.',
      tip: { head: 'Don\'t prosecute fiction', body: 'A child who announces dragon rides at dinner knows you know it\'s pretend — it\'s a show, not a fraud. Treating imagination as dishonesty teaches kids to dim exactly the creative voltage that school, art, and life will later beg them for. Save "truth talks" for actual deception with stakes.' } }
  ]
},
{
  id: 'a5_awkward', age: 5, time: 'Afternoon', icon: '☀️', title: 'The Loud Question',
  text: 'Supermarket queue. {name}, at field-trip volume, pointing: "Why is that man SO BIG?" The man heard. The cashier heard. Aisle nine heard. Time has stopped.',
  choices: [
    { label: 'Calm and quick: a brief kind answer now — "People come in all sizes, and we don\'t comment on bodies" — short apology if needed, fuller chat in the car', q: 'best',
      fx: { emotion: 5, lang: 3, energy: -7 }, mood: 'curious',
      react: 'The moment passes with grace; the man nods at your handling. In the car, {name} processes: "ALL sizes... like dogs!" Sure. Like dogs. The kindness lesson lands where the embarrassment was.',
      tip: { head: 'Curiosity isn\'t cruelty', body: 'Five-year-olds notice differences LOUDLY because noticing is their job and volume control is in beta. Shaming the question teaches that differences are shameful; answering matter-of-factly ("bodies vary") plus a privacy norm ("we talk about bodies quietly, with me") raises kids who are curious AND kind.' } },
    { label: '"Shhh! Look, your favorite yogurt!" — redirect and never speak of it', q: 'ok',
      fx: { emotion: 0, energy: -2 }, mood: 'surprised',
      react: 'Yogurt acquired; crisis muffled. But the takeaway filed by {name} is "that question was BAD", with no idea why — so next time the curiosity will come out somewhere weirder. Possibly louder.',
      tip: { head: 'Shushing postpones, answers teach', body: 'Redirection saves the moment but wastes the lesson — unanswered curiosity doesn\'t evaporate, it ferments. Circle back within the hour ("remember your question? Let\'s talk about it") and the shush becomes merely a pause, not a verdict.' } },
    { label: 'Mortified theatrical scolding: "THAT IS SO RUDE! Say sorry RIGHT NOW! I am SO sorry, sir—"', q: 'poor',
      fx: { emotion: -3, bond: -1, energy: -8 }, mood: 'cry',
      react: 'Now there are TWO scenes: the question and the wailing child being publicly tried for it. The man, who\'d half-smiled at first, now mostly feels bad for everyone. Net kindness generated: negative.',
      tip: { head: 'Don\'t convert curiosity into shame', body: 'A public blow-up teaches that noticing differences is monstrous — but it can\'t un-ask the question, and it makes YOUR embarrassment the child\'s emergency. Quiet correction now + real conversation later beats theater every time. The audience\'s opinion is not the curriculum.' } }
  ]
},
{
  id: 'a5_swim', age: 5, time: 'Morning', icon: '🌅', title: 'The Swim Class Freeze',
  text: 'First swim lesson. Other kids: splashing. {name}: bolted to the bench, towel clutched like a shield, knuckles white. "I\'m not going in. Not today. Not EVER."',
  choices: [
    { label: 'No force, no flee: stay and watch today, feet-in-water as the only goal, teacher looped in — return next week one step bigger', q: 'best',
      fx: { emotion: 5, motor: 3, energy: -7 }, mood: 'shy',
      react: 'Week 1: feet. Week 2: knees, then a sudden voluntary sit-down splash. Week 4: {name} is IN, gripping the bar and grinning like a maniac. The mountain got climbed in pebbles.',
      tip: { head: 'Brave has a gradient', body: 'For a cautious or fearful kid, "watch first" isn\'t failure — it\'s data collection. Graded exposure (each step small enough to say yes to) is how clinicians treat fear, and it works poolside too. Quitting instantly teaches avoidance; forcing teaches drowning-adjacent panic. The middle path teaches swimming.' } },
    { label: '"Get in for ten minutes and we\'ll get the BIG ice cream after."', q: 'ok',
      fx: { motor: 2, emotion: 0, energy: -4 }, mood: 'neutral',
      react: 'Ten white-knuckle minutes are endured for sundae purposes. {name} survives but exits unconvinced; water remains the enemy, now an enemy that pays in dessert.',
      tip: { head: 'Rented courage expires', body: 'Bribes can break a stalemate, but courage bought by ice cream tends to last exactly one ice cream. If you use a sweetener, attach it to a STEP they control ("feet in = sundae") rather than the whole scary thing — autonomy is the active ingredient.' } },
    { label: 'Carry them in. "The only way past it is through it. You\'ll thank me."', q: 'poor',
      fx: { emotion: -4, bond: -2, energy: -8 }, mood: 'cry',
      react: 'Screaming. Clawing. A scene the lifeguard will remember. {name} is now afraid of the water AND of being carried places by you. Swim lessons are cancelled — by the child, with prejudice, indefinitely.',
      tip: { head: 'Trust is the flotation device', body: 'Forcing a terrified child "through it" floods their system and pairs the fear with betrayal — the opposite of the safety learning swimming requires. Real exposure therapy is ALWAYS consensual and stepped. You can\'t scare a kid into feeling safe.' } }
  ]
},
{
  id: 'a5_compare', age: 5, time: 'Evening', icon: '🌇', title: 'The Comparison Trap',
  text: 'Playdate debrief: their friend Theo is somehow reading CHAPTER BOOKS. You hear yourself thinking: <em>"Why isn\'t {name} reading yet?"</em> The thought is right there on your tongue.',
  choices: [
    { label: 'Swallow it. Compare {name} only to {name}: "Hey — remember when you couldn\'t write your name? Look at you now." Keep reading together, their pace', q: 'best',
      fx: { emotion: 5, bond: 4, lang: 2, energy: -4 }, mood: 'happy',
      react: 'Story time continues, pressure-free; {name} "reads" the pictures to YOU with total authority. Eight months later, something clicks — as it usually does — and the chapter books arrive on their own schedule.',
      tip: { head: 'Normal is a range, not a race', body: 'Reading readiness spans YEARS among normally-developing kids (some at 4, plenty at 7) and early start barely predicts later skill. What does predict it: enjoying books together, daily. Comparison is the thief of joy AND, via pressure, of reading itself. Genuinely concerned? Ask the teacher, not Theo\'s mom.' } },
    { label: 'Say nothing — but order phonics flashcards that night and start daily drills', q: 'ok',
      fx: { lang: 2, emotion: -1, energy: -8 }, mood: 'neutral',
      react: 'Operation Catch Up To Theo launches in secret. {name} tolerates the drills, decoding a bit more, beaming a bit less. The flashcards work, technically — minus the part where reading is supposed to be a treasure.',
      tip: { head: 'Check whose need is being fed', body: 'A little phonics play is harmless — IF the kid\'s enjoying it. The tell is the motive: are these flashcards for {name}, or for your nerves at the playdate? Anxiety-driven drilling tends to teach "reading = pressure". The highest-yield intervention remains scandalously simple: lap, book, fun, daily.' } },
    { label: 'Say it out loud: "Theo\'s reading chapter books already. Why aren\'t you? You need to try harder."', q: 'poor',
      fx: { emotion: -4, bond: -2, energy: -3 }, mood: 'sad',
      react: 'Direct hit. {name}\'s shoulders drop. Books quietly migrate to the bottom of the toy pile, where they can\'t lose races for you. "I\'m bad at reading" enters the self-talk vocabulary, years ahead of any actual verdict.',
      tip: { head: 'Comparison out loud is a curse', body: 'Spoken sibling/peer comparisons are among the most-remembered childhood wounds in adult surveys — kids convert "why aren\'t you like X" directly into "I\'m not enough". Each child gets their own race. Say the growth you see; bury the league table.' } }
  ]
},

/* ─────────────────────────── AGE 6 ─────────────────────────── */
{
  id: 'a6_school', age: 6, time: 'Morning', icon: '🌅', title: 'The First Day',
  text: 'First day of big school. Backpack: enormous. Child: suddenly small. At the gate, {name}\'s hand clamps yours like a vice. "What if nobody likes me? Don\'t GO."',
  choices: [
    { label: 'Validate + confident ritual: "First days are nervous days — AND you are ready. Two squeezes means I love you. I\'ll be RIGHT here at pickup. Always."', q: 'best',
      fx: { emotion: 6, bond: 4, energy: -7 }, mood: 'shy',
      react: 'Two squeezes, a wobbly breath, and {name} walks in — turning back once for a thumbs-up you deliver like it\'s the World Cup. At pickup: "I have a friend named Gus and we\'re drawing TOMORROW too."',
      tip: { head: 'Confident goodbyes transfer confidence', body: 'Kids read your face at handoffs: lingering, anxious farewells say "this place might not be safe". The formula that works — acknowledge the feeling, project certainty, fixed goodbye ritual, reliable pickup — and never sneak out (it relieves YOU, but teaches them you might vanish anytime).' } },
    { label: 'Wait till they\'re distracted by the sand table... and slip away quietly', q: 'ok',
      fx: { emotion: -1, energy: -2 }, mood: 'surprised',
      react: 'A clean, tear-free exit — chef\'s kiss... until {name} looks up, finds you GONE, and the teacher spends twenty minutes on damage control. Tomorrow the hand-clamp comes with a new feature: constant you-checking.',
      tip: { head: 'Sneaking out backfires', body: 'The vanish-while-distracted move avoids one hard goodbye and buys weeks of hypervigilance — a child who won\'t get absorbed in play because you might evaporate. Short, honest, ritualized goodbyes hurt for two minutes and build trust for years.' } },
    { label: '"Big kids don\'t cry about school. Look, everyone else is FINE. In you go."', q: 'poor',
      fx: { emotion: -3, bond: -2, energy: -4 }, mood: 'cry',
      react: '{name} swallows the tears — the lesson being that scary feelings are an embarrassment to hide. They walk in alone in every sense, and pickup features a child who says school was "fine" through a stiff little face.',
      tip: { head: 'Feelings dismissed go underground', body: '"Big kids don\'t cry" doesn\'t produce brave kids — it produces kids who stop showing you the dashboard. Anxiety unspoken doesn\'t shrink; it just loses its translator. You want the kid who tells you it\'s scary AT six, because that\'s the same kid who tells you what\'s scary at sixteen.' } }
  ]
},
{
  id: 'a6_homework', age: 6, time: 'Evening', icon: '🌇', title: 'The Homework Standoff',
  text: 'The reading worksheet has been "about to start" for 45 minutes. {name} has meanwhile needed water, a different chair, a band-aid (no injury), and is now under the table being a cat.',
  choices: [
    { label: 'Build the runway: snack + 20 min of wild play FIRST, then 10-minute chunks at a set spot, you nearby doing your own "homework"', q: 'best',
      fx: { lang: 4, emotion: 4, energy: -8 }, mood: 'neutral',
      react: 'Post-snack, post-zoomies, the cat re-becomes a child. Two focused 10-minute sprints (with you paying bills alongside) and it\'s DONE — with enough evening left to be six in.',
      tip: { head: 'After-school brains need a pit stop', body: 'Six-year-olds exit school with depleted attention and a body full of unspent wiggles — homework-immediately is a setup. The evidence-friendly recipe: food, movement, THEN short timed chunks, same time and place daily, parent nearby but not hovering. Routine kills the nightly war better than any lecture.' } },
    { label: 'Sit over them and push it through tonight: "No screens until every line is done."', q: 'ok',
      fx: { lang: 2, emotion: -1, energy: -9 }, mood: 'mad',
      react: 'Forty grinding minutes of sighs (both of you) and the sheet is complete. It worked, tonight, at retail price — and "reading" is quietly filing itself under "things that ruin evenings".',
      tip: { head: 'Won the sheet, check the war', body: 'Pressure finishes worksheets but teaches that schoolwork is a punishment to escape. At six, the actual academic content is trivial — the HABITS and feelings around it are the real curriculum. If every night is a siege, change the system, not the child.' } },
    { label: 'Just do it for them after bedtime — it\'s ONE worksheet and everyone\'s tired', q: 'poor',
      fx: { lang: -1, emotion: -1, energy: -3 }, mood: 'joy',
      react: 'The worksheet returns flawless, in suspiciously adult handwriting. {name} learns deadlines are weather — unpleasant but survivable if you wait indoors. The teacher, who has seen ten thousand worksheets, is not fooled.',
      tip: { head: 'Rescuing teaches helplessness', body: 'Doing kids\' work sends two messages: "you couldn\'t have" and "consequences are optional". Better an honest incomplete sheet (teachers WANT that data) than a perfect counterfeit. Struggle, at the right size, is the whole point of homework this age.' } }
  ]
},
{
  id: 'a6_worst', age: 6, time: 'Afternoon', icon: '☀️', title: '"I HATE You!"',
  text: 'You said no to extending the playdate. {name} wheels around, face thunderous: <em>"I HATE you! You\'re the WORST parent in the WHOLE WORLD!"</em> A door slams. The words hang there, smoking.',
  choices: [
    { label: 'Stay anchored: "You\'re REALLY angry. The answer\'s still no. And I love you — even when you hate me." Stay available, not hooked', q: 'best',
      fx: { emotion: 7, bond: 4, energy: -9 }, mood: 'mad',
      react: 'Ten minutes later a deflated {name} reappears, leans silently against your arm. "...I don\'t hate you." You know. Limits survived; love survived; nobody had to win.',
      tip: { head: 'Be the wall, not the weather', body: '"I hate you" at six is a pressure-test: is your love sturdier than my worst feelings? Taking the bait (hurt, rage, or caving) says no. The unshaken response — feelings allowed, limit intact, love unconditional — is how kids learn anger can be SURVIVED, which is the foundation of managing it.' } },
    { label: '"Go to your room until you can speak nicely to me."', q: 'ok',
      fx: { emotion: 1, energy: -5 }, mood: 'sad',
      react: 'Exile served; a quieter child emerges and mutters an apology. Functional — though the message received was "anger gets you removed", so next time the anger may just go underground instead of getting practiced.',
      tip: { head: 'Cool-downs yes, banishment maybe', body: 'Space to calm down is legitimate — some kids genuinely need it. The upgrade: offer it as regulation, not rejection ("want some quiet time or want me with you?"). "Time-in" keeps the relationship in the room while the storm passes; isolation teaches some kids to fear their own feelings.' } },
    { label: '"HATE me?! After everything I do?! Fine — playdates are CANCELLED this month!"', q: 'poor',
      fx: { emotion: -4, bond: -3, energy: -10 }, mood: 'cry',
      react: 'Escalation achieved: the child\'s storm now has a parent-sized storm on top, plus a month-long sentence neither of you will actually sustain. (You won\'t. You both know you won\'t.) Threat credibility: shredded.',
      tip: { head: 'Don\'t arm-wrestle a six-year-old\'s amygdala', body: 'Meeting a child\'s dysregulation with your own teaches that the biggest feelings win — the exact opposite lesson. Punishment sized in fury ("a MONTH") is unenforceable, and unenforced threats train kids that limits are bluffs. Boring, survivable consequences beat dramatic imaginary ones.' } }
  ]
},
{
  id: 'a6_read', age: 6, time: 'Night', icon: '🌙', title: 'Too Big for Stories?',
  text: '{name} can sound out easy books alone now — the school is thrilled. Tonight you wonder, mid-yawn: maybe read-aloud time has done its job? You could reclaim twenty minutes...',
  choices: [
    { label: 'Keep the ritual, upgrade the books: YOU read the juicy above-their-level chapter book; they read you one easy page. Trade-off, every night', q: 'best',
      fx: { lang: 6, bond: 4, energy: -6 }, mood: 'joy',
      react: 'You start a real chapter book — dragons, maps inside the cover — and {name} is electrified by stories bigger than their own decoding. "ONE more chapter" becomes the nightly war cry. The twenty minutes stay spent. Worth it.',
      tip: { head: 'Read aloud long past "they can"', body: 'A child\'s listening comprehension outpaces their reading level by YEARS — read-alouds feed vocabulary and story-hunger that easy readers can\'t reach yet. Kids read to through primary school read more, and better, for life. Stopping at "they can decode" is quitting the gym the day you can lift the bar.' } },
    { label: 'Alternate: audiobook nights and solo-practice nights — you fold laundry nearby', q: 'ok',
      fx: { lang: 3, energy: 2 }, mood: 'neutral',
      react: 'A decent system hums along: stories still flow, decoding still gets reps, laundry gets folded. Something\'s mildly missing though — the elbow-to-elbow, "wait, read that part AGAIN" thing. The story arrives; the snuggle doesn\'t.',
      tip: { head: 'Audiobooks are allies, not substitutes', body: 'Audiobooks genuinely build vocabulary and story sense — keep them. But the read-aloud\'s secret payload was never just words: it\'s the nightly proof that books mean warmth and you. Keep at least a few live-and-together nights; the association is the asset.' } },
    { label: '"You can read yourself now — that\'s the whole point! Lights out after one book. Goodnight!"', q: 'poor',
      fx: { lang: -1, bond: -2, energy: 4 }, mood: 'sad',
      react: 'Reading: promoted to homework. The nightly twenty minutes of you-and-them quietly dies, and with it the best advertising books ever had. {name} reads exactly as much as required, and not one page more.',
      tip: { head: 'Don\'t retire the best part', body: 'When read-aloud ends the moment decoding starts, the message is "books were training, and training\'s over". The kids who become readers are the ones for whom books stayed connected to pleasure and closeness. The ritual was never about literacy alone — that\'s just what the research happened to measure.' } }
  ]
},
{
  id: 'a6_media', age: 6, time: 'Evening', icon: '🌇', title: 'The Screen Treaty',
  text: '"Everyone in my class has a tablet and plays Blocky Builders. EVERYONE. I\'m the ONLY one—" The negotiation has begun. {name} has prepared arguments. There are bullet points.',
  choices: [
    { label: 'Negotiate a real family media plan TOGETHER: what, when, where (no bedrooms), how long — written, signed, fridge-posted. You co-play sometimes', q: 'best',
      fx: { emotion: 5, lang: 3, bond: 3, energy: -8 }, mood: 'proud',
      react: 'The Treaty of Living Room is drafted, illustrated and signed. Weekend mornings, 45 minutes, common areas, parent gets a tour of every new world built. {name} polices the timer THEMSELF (mostly) — it\'s their treaty too.',
      tip: { head: 'Co-author the rules', body: 'Pediatric guidance has converged on this: a written family media plan beats ad-hoc battles. Kids follow rules they helped write at startling rates, and co-playing keeps you inside their digital world rather than guarding its gate. Screens in bedrooms remain the one near-universal "don\'t".' } },
    { label: '"Educational apps only — but then unlimited. It\'s LEARNING."', q: 'ok',
      fx: { lang: 1, emotion: -1, energy: 1 }, mood: 'happy',
      react: 'Hours of "math game" later (the math content: four questions per hour of cosmetic-unlocking), {name} is glazed and crabby at dinner. "Educational" is carrying a lot of weight in this app store, you notice.',
      tip: { head: '"Educational" is mostly a marketing tag', body: 'App-store "educational" labels are unregulated and frequently decorative. Worse, UNLIMITED-but-virtuous misses the point: total duration and displaced activities (play, sleep, outside) matter more than content category. Time boundaries beat content theater.' } },
    { label: 'Peace at a price: a tablet of their own, in their room, no particular rules. Everyone else survived.', q: 'poor',
      fx: { emotion: -3, energy: 6 }, mood: 'joy',
      react: 'Joy! Gratitude! Silence! ...Then bedtime resistance, dawn gaming, a nightstand tablet glowing at 11 PM, and a kid increasingly elsewhere even when present. Re-imposing rules NOW will cost triple. The easy yes was a loan.',
      tip: { head: 'Bedroom screens are the one bright line', body: 'If guidance agrees on anything: screens in kids\' bedrooms predict worse sleep, more total use, and less parental awareness — and rules retrofitted after free access feel like theft, sparking the exact wars you avoided. Set terms BEFORE the device, while the leverage is yours.' } }
  ]
},
{
  id: 'a6_sport', age: 6, time: 'Afternoon', icon: '☀️', title: 'The Lost Match',
  text: 'Soccer season finale: a 0–5 demolition. {name} hurls the water bottle into the grass: "We ALWAYS lose. Soccer is STUPID. I QUIT." Cleats are already coming off, with prejudice.',
  choices: [
    { label: 'Feelings first, decisions later: "Losing 5–0 STINKS." Ride home in sympathetic silence. Days later: "What do you actually like about soccer? Let\'s finish the season, then decide fresh."', q: 'best',
      fx: { emotion: 6, motor: 2, energy: -6 }, mood: 'mad',
      react: 'The rage cools into Tuesday\'s practice, where it turns out the thing {name} likes is "my team and also snacks". Season finished, head high. Spring verdict: re-enroll, OWN choice — "but if we lose every game again I\'m doing karate."',
      tip: { head: 'Never decide during the feelings', body: 'Quitting mid-fury teaches that hard feelings are exit signs; forcing years of a hated sport teaches that preferences don\'t matter. The middle: finish the committed season (small, survivable), then choose freely. "We finish what we start, then we choose again" builds both grit AND self-knowledge.' } },
    { label: 'Pep talk, immediately: "Hey, you\'ll WIN next time! You\'re the BEST one out there! Champions never quit!"', q: 'ok',
      fx: { emotion: 1, energy: -3 }, mood: 'neutral',
      react: 'The motivational broadcast washes over a kid who just wants the loss to be ALLOWED to stink for a minute. Also — {name} is demonstrably not the best one out there, and they know you know. Trust in your scouting report: docked.',
      tip: { head: 'Cheerleading can\'t outrun a feeling', body: 'Instant positivity is well-meant emotional fast-forwarding — it skips the part where disappointment gets digested. And inflated praise ("the BEST!") quietly teaches kids your assessments are decorative. Sit IN the stink briefly; the pep talk lands a hundred times harder afterward.' } },
    { label: '"Fine, quit. It\'s your choice." Unenroll that evening.', q: 'poor',
      fx: { emotion: -2, motor: -2, energy: 2 }, mood: 'neutral',
      react: 'Soccer ends that night, decided by the worst twenty minutes of the season. By Saturday {name} mopes — turns out they miss the team and ALSO believes things you quit while crying stay quit. Useful data, expensively bought.',
      tip: { head: 'Instant exits teach exit-seeking', body: 'Honoring a rage-quit on the spot feels respectful of autonomy but installs a reflex: discomfort → door. Six-year-olds can\'t yet distinguish "this is wrong for me" from "this was a bad afternoon" — that\'s literally your job. Cool-down period before any quit decision, always.' } }
  ]
},
{
  id: 'a6_alone', age: 6, time: 'Afternoon', icon: '☀️', title: 'Walking Ahead',
  text: '"Can me and Gus walk to the corner shop OURSELVES? It\'s ONE street. I\'m SIX." The shop is, in fairness, visible from your window. Gus is already nodding. Two sets of eyes await your ruling.',
  choices: [
    { label: 'Build the ladder: practice the route together, set the rules (curb stop, straight there-and-back), then watch their first solo run from the window like mission control', q: 'best',
      fx: { emotion: 5, motor: 3, bond: 2, energy: -7 }, mood: 'proud',
      react: 'Rehearsals complete, rules recited, and the expedition launches — two small figures EXTREMELY responsibly stopping at the curb, visibly vibrating with importance. {name} returns with gum and roughly nine feet of new height.',
      tip: { head: 'Independence is built in rungs', body: 'Developmental psychologists note kids today get unsupervised freedom YEARS later than their parents did — with measurable costs to confidence and risk-judgment. The fix isn\'t recklessness; it\'s laddered autonomy: practice together → supervised solo → real solo. Each rung earned, each rung visible from a window if possible.' } },
    { label: 'Warm but flat: "When you\'re ten. Not before. It\'s just the rule."', q: 'ok',
      fx: { emotion: -1, energy: 0 }, mood: 'sad',
      react: 'The expedition dissolves; Gus goes home. {name} accepts the verdict but files the reasoning ("you\'re small") next to the counter-evidence (was trusted to do exactly nothing). The asking will stop before the wanting does.',
      tip: { head: '"Not yet" needs a path', body: 'A flat age-gate is at least honest — but autonomy denied without a ladder ("here\'s what you CAN do, and here\'s how you earn the next step") just outsources the practicing to ages and places you won\'t see. Saying no to the street is fine; pair it with a yes to something stretching.' } },
    { label: 'Say yes — then secretly tail them at fifty meters in sunglasses', q: 'poor',
      fx: { emotion: -1, bond: -2, energy: -5 }, mood: 'surprised',
      react: 'Operation Sunglasses is blown in ninety seconds ("...is that your PARENT behind the bins?" — Gus). {name} is humiliated in front of the one audience that matters. Trust extended, then visibly retracted: somehow worse than no.',
      tip: { head: 'Fake autonomy is worse than none', body: 'Covert surveillance converts a trust-building exercise into a trust-breaking one — the child learns your "yes" has hidden asterisks. If you\'re not ready for unsupervised, say so honestly and supervise OPENLY (watch from the window, by agreement). Kids can work with honest limits; they can\'t work with theater.' } }
  ]
},
{
  id: 'a6_self', age: 6, time: 'Night', icon: '🌙', title: 'Your Own Garden',
  text: 'Sorting old photos, you find pre-parent you: guitar, hiking boots, a book club that read actual books. You feel a weird pang. {name} is asleep; the evening is, technically, yours. The guitar is RIGHT there.',
  choices: [
    { label: 'Pick one small thing back up — guitar, twenty minutes, badly — and let {name} SEE you practicing this week, struggling included', q: 'best',
      fx: { energy: 18, bond: 2, emotion: 2 }, mood: 'happy',
      react: 'Your fingers remember three chords; the fourth has filed a complaint. Days later {name} catches you mid-practice: "you\'re kind of bad at THAT part" — yes — "but it sounds NICE." Soon they\'re drumming on a box alongside. The house has hobbies again.',
      tip: { head: 'You\'re the picture of adulthood', body: 'Kids learn what adulthood IS from watching yours — all duty and no delight teaches that growing up means giving up. Parents with even one tended interest report lower burnout AND model the thing we claim to want for kids: lifelong learning, frustration tolerance, joy. Mediocre guitar is excellent parenting.' } },
    { label: 'Add it to the someday list: "When {name}\'s older. There\'s just no time yet." Photos away, dishes calling', q: 'ok',
      fx: { energy: 2 }, mood: 'neutral',
      react: 'The photos go back in the box, the box goes back on the shelf, and "someday" stays exactly where it lives. Nothing is lost tonight — except the only evening anyone actually offered you, which was this one.',
      tip: { head: '"Someday" has no calendar date', body: 'The no-time math rarely improves on its own — schedules fill to capacity at every life stage. The trick practitioners suggest is shrinking the unit: not "hobbies again someday" but "twenty minutes Tuesday". A self postponed for years gets genuinely hard to find again.' } },
    { label: 'Feel the pang, then file it under guilt: "What kind of parent plays guitar while there\'s laundry? That life\'s over."', q: 'poor',
      fx: { energy: -5 }, mood: 'sad',
      react: 'The guitar stays cased; the resentment doesn\'t. It leaks out sideways over the weeks — a sigh here, a "MUST you" there. {name} can\'t name what changed, but kids always feel the weather. Martyrdom turns out to be loud.',
      tip: { head: 'Self-erasure isn\'t devotion', body: 'Burnout researchers find parents who abandon all identity outside parenting score HIGHER on exhaustion and resentment — which children sense and often internalize as their fault. The kindest thing in this scenario isn\'t more laundry; it\'s a parent with something that lights them up. The life isn\'t over; it\'s just unscheduled.' } }
  ]
},
{
  id: 'a6_quiet', age: 6, time: 'Night', icon: '🌙', title: 'The Quiet Question',
  text: 'Lights out, covers tucked, you\'re halfway to the door when a small voice stops you: <em>"...Will you still love me when I\'m big? Like, even when I\'m a grown-up and I do everything wrong?"</em>',
  anchor: true, last: true,
  choices: [
    { label: 'Come back. Sit down. Full attention: "Always. When you\'re big, when you\'re old, when you mess up — ALWAYS. Nothing you could ever do would stop it." Then stay a minute, and share your favorite memory of them', q: 'best',
      fx: { bond: 8, emotion: 4, energy: -4 }, mood: 'happy',
      react: 'You trade favorite memories in the dark — theirs is the cereal-floor day, hilariously. A long quiet. Then, already half-asleep: "...I\'m gonna love you when you\'re old, too." The door stays open a crack, the way they like it.',
      tip: { head: 'The whole curriculum, one question', body: 'Every scenario in this game was secretly this question: is the love conditional? Children who KNOW the answer is "no matter what" take healthier risks, recover from failure faster, and tell their parents the hard things later. It costs one minute at a doorway. It\'s the best deal in parenting.' } },
    { label: '"Of course, sweetheart. Forever. Now sleep tight!" — warm, quick, lights out, door closed', q: 'ok',
      fx: { bond: 3, energy: 0 }, mood: 'neutral',
      react: 'A true answer, warmly delivered, technically complete. {name} accepts it and rolls over. The question, though — the question had a second half hiding inside it, and the second half goes to sleep unasked.',
      tip: { head: 'Doorway questions are icebergs', body: 'The big questions come at bedtime because the dark makes brave — and a quick true answer can still close a door. When a question has that certain weight, the move is sitting back down: the first answer is for them, the next quiet minute is where they tell you what prompted it.' } },
    { label: '"What a silly question — ask me tomorrow, it\'s WAY past bedtime." Lights out', q: 'poor',
      fx: { bond: -3, emotion: -2, energy: 2 }, mood: 'sad',
      react: 'The question retreats back under the covers, labeled "silly". Tomorrow it isn\'t asked again — that kind never is, twice. It will look for its answer sideways, for years, in how you slam doors and forgive mistakes.',
      tip: { head: 'There\'s no good time but now', body: 'Children ask the load-bearing questions at maximally inconvenient times — that\'s not bad timing, that\'s trust choosing its moment. "Ask me tomorrow" teaches the moment to stop offering itself. Almost nothing on tonight\'s schedule outranks a six-year-old asking if love runs out.' } }
  ]
}
];

/* ── milestone rules per birthday (reaching age N) ────────── */
DATA.milestoneRules = {
  2: [
    { stat: 'lang', min: 32, icon: '🗣️', title: 'Fifty words and counting!', sub: 'All that babble-returning paid off — words are arriving daily.', miss: { icon: '🌱', title: 'Words are brewing', sub: 'Every child\'s timeline differs. Keep narrating — the words are coming.' } },
    { stat: 'motor', min: 32, icon: '🏃', title: 'Run, toddle, climb!', sub: 'Confident on those little feet — falls and all.', miss: { icon: '👣', title: 'Finding those feet', sub: 'Steadier every week. Wobbles are practice, not setbacks.' } },
    { stat: 'bond', min: 34, icon: '🤝', title: 'Secure home base', sub: 'They explore, then check back for you — the signature of trust.', miss: null },
    { stat: 'emotion', min: 30, icon: '🌤️', title: 'Easier to soothe', sub: 'Your calm is becoming their calm. Co-regulation is working.', miss: null }
  ],
  3: [
    { stat: 'lang', min: 45, icon: '💬', title: 'Little sentences!', sub: '"Me do it self!" — grammar wobbly, meaning unmistakable.', miss: { icon: '🌱', title: 'Sentences sprouting', sub: 'Two words, then three. The engine is warming up.' } },
    { stat: 'emotion', min: 42, icon: '⛈️', title: 'Weathering the storms', sub: 'Tantrums shrinking — big feelings finding smaller exits.', miss: { icon: '🌧️', title: 'Storms still rolling', sub: 'Twos and threes are stormy by design. Your steadiness counts double.' } },
    { stat: 'motor', min: 42, icon: '🧗', title: 'Tiny mountaineer', sub: 'Jumping, climbing, almost-pedaling. The body is catching up to the ambition.', miss: null },
    { stat: 'bond', min: 45, icon: '🫂', title: 'Comes to you with the hard stuff', sub: 'Scraped knees and scary dreams get brought to you first. That\'s the prize.', miss: null }
  ],
  4: [
    { stat: 'lang', min: 55, icon: '❓', title: 'Champion question-asker', sub: 'Why, how, what-if — a curiosity engine at full steam.', miss: { icon: '🌱', title: 'Curiosity warming up', sub: 'Questions are starting to bubble. Keep welcoming them.' } },
    { stat: 'emotion', min: 52, icon: '🎭', title: 'Names the feelings', sub: '"I\'m FRUSTRATED!" — naming it is half of taming it.', miss: { icon: '🌊', title: 'Feelings still bigger than words', sub: 'The vocabulary of emotions takes years. You\'re building it daily.' } },
    { stat: 'motor', min: 52, icon: '✂️', title: 'Scissors, pedals, monkey bars', sub: 'Small hands and big muscles both finding their power.', miss: null },
    { stat: 'bond', min: 55, icon: '💞', title: 'Repairs after ruptures', sub: 'Hard moments end in hugs. They\'ve learned love survives anger.', miss: null }
  ],
  5: [
    { stat: 'lang', min: 65, icon: '📖', title: 'Story-hungry', sub: 'Tells tales, demands chapters, plays with words. A reader is forming.', miss: { icon: '🌱', title: 'Stories taking root', sub: 'Keep the read-alouds coming — the hunger builds before the skill.' } },
    { stat: 'emotion', min: 62, icon: '🤝', title: 'Friendship navigator', sub: 'Falls out, makes up, takes turns — the social deep end, swum.', miss: { icon: '🛶', title: 'Learning the social waters', sub: 'Friendship skills come in waves. Every conflict survived is a lesson.' } },
    { stat: 'motor', min: 62, icon: '🚴', title: 'Big-kid body skills', sub: 'Bikes, balance beams, monkey bars — fear negotiated, mostly conquered.', miss: null },
    { stat: 'bond', min: 65, icon: '🏠', title: 'Secure enough to be brave', sub: 'New things get tried because home base is certain.', miss: null }
  ],
  6: [
    { stat: 'lang', min: 75, icon: '✏️', title: 'Reading and writing for real', sub: 'Wobbly letters and sounded-out words — the code is cracking.', miss: { icon: '🌱', title: 'The code is cracking slowly', sub: 'Reading clicks anywhere from 4 to 7. Theirs is coming.' } },
    { stat: 'emotion', min: 72, icon: '🧘', title: 'Big feelings, real tools', sub: 'Breathes, names it, asks for help. Emotional toolbox: stocked.', miss: { icon: '🧰', title: 'Toolbox under construction', sub: 'Regulation grows for decades. The foundation you built is real.' } },
    { stat: 'motor', min: 72, icon: '⚽', title: 'Playground athlete', sub: 'Confident, coordinated, mostly aimed in the right direction.', miss: null },
    { stat: 'bond', min: 75, icon: '🕊️', title: 'Roots and wings', sub: 'Walks into school alone — and still runs back for the hug.', miss: null }
  ]
};

/* ── memories (album) ─────────────────────────────────────── */
DATA.memories = [
  { id: 'm1a', age: 1, emoji: '👣', title: 'First wobbly steps', caption: 'Two steps, a soft landing, a giant grin. The world just got bigger.' },
  { id: 'm1b', age: 1, emoji: '🙈', bonus: true, title: 'Peekaboo champion', caption: 'That shrieking giggle when you reappeared. Every single time.' },
  { id: 'm2a', age: 2, emoji: '🗣️', title: 'The word explosion', caption: 'From "ba" to "NO MINE TRUCK GO" in one astonishing year.' },
  { id: 'm2b', age: 2, emoji: '🧱', bonus: true, title: 'The great tower', caption: 'Six blocks high — then demolished with the joy of a tiny godzilla.' },
  { id: 'm3a', age: 3, emoji: '❓', title: 'The year of Why', caption: 'Why is the sky? Why are atoms? Why is why? (Why though?)' },
  { id: 'm3b', age: 3, emoji: '🫖', bonus: true, title: 'Tea with Mr. Pickles', caption: 'An invisible penguin attended 34 dinners this year. He hates peas.' },
  { id: 'm4a', age: 4, emoji: '🤗', title: 'Big feelings, bigger hugs', caption: 'The year you both learned that storms pass and love stays.' },
  { id: 'm4b', age: 4, emoji: '🌟', bonus: true, title: '"I did it MYSELF!"', caption: 'The puzzle. The pride. The sentence that pays for everything.' },
  { id: 'm5a', age: 5, emoji: '✏️', title: 'Wrote their own name', caption: 'Wobbly letters, too many arms on the E, taped to the fridge forever.' },
  { id: 'm5b', age: 5, emoji: '🚲', bonus: true, title: 'Two wheels, no hands (yours)', caption: 'You let go. They flew. Somebody cried (it was you).' },
  { id: 'm6a', age: 6, emoji: '🎒', title: 'First day of big school', caption: 'Two hand-squeezes at the gate. They walked in. You watched until the door closed.' },
  { id: 'm6b', age: 6, emoji: '📚', bonus: true, title: 'Still reading together', caption: '"ONE more chapter." Always one more chapter.' }
];

/* ── ending parenting styles ──────────────────────────────── */
DATA.endingStyles = [
  { id: 'gardener', minBestRatio: 0.62,
    name: '🌳 The Attuned Gardener',
    desc: 'You met big feelings with calm, returned every serve you could, and let growth happen at its own pace. Research has a word for the result: secure. Your child knows, deep in their bones, that home is where you bring the hard stuff.' },
  { id: 'companion', minBestRatio: 0.38,
    name: '🧭 The Steady Companion',
    desc: 'You mixed warmth with realism — some moments handled beautifully, some survived on coffee and hope. That\'s not a compromise; that\'s what good parenting actually looks like from the inside. Your child got something better than perfect: someone real who kept showing up.' },
  { id: 'learner', minBestRatio: 0,
    name: '🌱 The Honest Learner',
    desc: 'Plenty of rough moments — and here\'s the secret the research keeps confirming: that\'s recoverable, every time, through repair. Children don\'t need flawless parents. They need ones who notice, apologize, and try again. You\'re still in the game, and the game is long.' }
];

DATA.endingChildLines = {
  bond:    { high: 'runs back for one more hug — then sprints to their friends without looking back. Both of those are your doing.', low: 'is still figuring out the world with you — and the door between you is open. It always will be, if you keep it open.' },
  lang:    { high: 'narrates the entire walk to school, reads the shop signs aloud, and has OPINIONS about which chapter book is next.', low: 'is still finding the words — and they come a little faster every week, fed by every story you didn\'t skip.' },
  motor:   { high: 'climbs the school fence railing like a gibbon while you pretend not to be impressed.', low: 'moves at their own careful pace — and gets there, every time.' },
  emotion: { high: 'told you yesterday, unprompted: "I\'m nervous AND excited. That\'s allowed, right?" It\'s allowed. You taught them that.', low: 'still has storms — and now has a lighthouse. Keep being it.' }
};

/* ── misc UI text ─────────────────────────────────────────── */
DATA.lowEnergyNotes = [
  'Running on fumes, everything lands harder. The choice still helped — but a rested you helps more. (Stat gains were reduced.)',
  'You did the right thing on an empty tank — that\'s the hardest version. Find some rest soon. (Stat gains were reduced.)'
];

DATA.qualityLabels = {
  best: { label: 'Lovely moment', icon: '🌟', css: 'good' },
  ok:   { label: 'Fair enough',  icon: '🙂', css: 'okay' },
  poor: { label: 'Rough patch',  icon: '🌧️', css: 'rough' }
};

/* ── action-tile meta: icon + short verb label per choice ───
   arrays align with each scenario's choice order [best, ok, poor] */
DATA.choiceMeta = {
  a1_babble:   [{ icon: '🗣️', act: 'Babble back & wait' }, { icon: '🙂', act: 'Smile, keep tidying' }, { icon: '📱', act: '"Uh-huh…" keep scrolling' }],
  a1_book:     [{ icon: '👉', act: 'Point & name together' }, { icon: '📖', act: 'Read on as they roam' }, { icon: '🚫', act: 'Take the book away' }],
  a1_food:     [{ icon: '😌', act: 'Stay calm — "all done?"' }, { icon: '🤹', act: 'Catch it — make a game!' }, { icon: '😠', act: 'Scold firmly' }],
  a1_steps:    [{ icon: '🙌', act: 'Cheer with arms out' }, { icon: '🤝', act: 'Hold hands the whole way' }, { icon: '🚧', act: 'Into the playpen' }],
  a1_night:    [{ icon: '🌙', act: 'Calm, boring comfort' }, { icon: '🛌', act: 'Bring them to your bed' }, { icon: '📺', act: 'Quiet cartoon' }],
  a1_point:    [{ icon: '🐕', act: '"Yes! A fluffy dog!"' }, { icon: '👍', act: '"Yep, doggy" — walk on' }, { icon: '🚶', act: 'Keep walking' }],
  a1_pots:     [{ icon: '🥁', act: 'Join the band, then swap' }, { icon: '🎧', act: 'Let the concert continue' }, { icon: '🙅', act: 'Take the pots away' }],
  a1_screen:   [{ icon: '🧺', act: 'Toy basket; rest nearby' }, { icon: '📞', act: 'Video-call Grandma' }, { icon: '📺', act: 'Cartoons. 40 minutes.' }],
  a2_market:   [{ icon: '🫂', act: 'Kneel; name the feeling' }, { icon: '📱', act: 'Distract with puppies' }, { icon: '🍬', act: 'Buy the candy' }],
  a2_no:       [{ icon: '✌️', act: 'Offer two choices' }, { icon: '👕', act: 'Dress them gently anyway' }, { icon: '🚫', act: '"No breakfast then!"' }],
  a2_share:    [{ icon: '🪣', act: 'Narrate; offer the bucket' }, { icon: '⏲️', act: 'Set a turns timer' }, { icon: '😤', act: 'Make them hand it over' }],
  a2_eat:      [{ icon: '🥦', act: 'Serve it, zero pressure' }, { icon: '✈️', act: 'Airplane game, one bite' }, { icon: '🍰', act: '"No broccoli, no dessert"' }],
  a2_potty:    [{ icon: '🌱', act: 'Wait for readiness' }, { icon: '📅', act: 'Strict potty schedule' }, { icon: '😳', act: 'Scold the accidents' }],
  a2_climb:    [{ icon: '🧗', act: 'Spot them; cushion zone' }, { icon: '😰', act: 'Hover and gasp' }, { icon: '⛔', act: '"NO climbing!"' }],
  a2_words:    [{ icon: '📣', act: 'Sportscast the walk' }, { icon: '🤫', act: 'Comfortable quiet' }, { icon: '🎧', act: 'Earbuds in, podcast on' }],
  a2_bedtime:  [{ icon: '🛁', act: 'Routine + boring returns' }, { icon: '🛏️', act: 'Lie down till asleep' }, { icon: '📺', act: 'Give up — TV time' }],
  a2_self:     [{ icon: '🛀', act: 'Rest; leave the mess' }, { icon: '🧹', act: 'Power-clean everything' }, { icon: '📱', act: 'Doomscroll till 1 AM' }],
  a3_why:      [{ icon: '💭', act: '"What do YOU think?"' }, { icon: '📚', act: 'Answer every single why' }, { icon: '😑', act: '"Because I said so"' }],
  a3_friend:   [{ icon: '🍽️', act: 'Set a place for Mr. Pickles' }, { icon: '😐', act: 'Tolerate the penguin' }, { icon: '🚫', act: '"Penguins aren\'t real"' }],
  a3_wall:     [{ icon: '🖼️', act: 'Calm limit + big paper' }, { icon: '🧽', act: 'Just clean it yourself' }, { icon: '😡', act: 'Yell; confiscate crayons' }],
  a3_dark:     [{ icon: '🔦', act: 'Check the closet together' }, { icon: '💨', act: 'Monster spray!' }, { icon: '🚪', act: '"Not real. Sleep." Door shut' }],
  a3_park:     [{ icon: '⏳', act: 'Warnings + a fun job' }, { icon: '🔢', act: 'Count to three…' }, { icon: '🏃', act: 'Carry them off mid-scream' }],
  a3_help:     [{ icon: '🥄', act: 'Real job — let them pour' }, { icon: '🎭', act: 'Pretend job, empty bowl' }, { icon: '📺', act: '"Too little — watch TV"' }],
  a3_lie:      [{ icon: '🪞', act: 'Say what you see, gently' }, { icon: '🕵️', act: 'Playful cheek detective' }, { icon: '⚖️', act: 'Punish the lie, doubled' }],
  a3_cup:      [{ icon: '💙', act: 'Empathize; offer a choice' }, { icon: '🚿', act: 'Quick-wash the right cup' }, { icon: '🙄', act: '"It\'s the SAME cup!"' }],
  a4_conflict: [{ icon: '🛠️', act: 'Coach feelings & repair' }, { icon: '😶', act: 'Force a "sorry" right now' }, { icon: '😞', act: 'Shame them publicly' }],
  a4_cant:     [{ icon: '🧩', act: '"18 pieces! Edges first?"' }, { icon: '🤲', act: 'Finish it for them' }, { icon: '🙃', act: '"It\'s easy, look"' }],
  a4_nightmare:[{ icon: '🤗', act: 'Hold them till calm' }, { icon: '🛌', act: 'Into your bed tonight' }, { icon: '🚪', act: '"Wasn\'t real." Walk out' }],
  a4_lose:     [{ icon: '🎲', act: 'Feel it, then rematch' }, { icon: '🏆', act: 'Let them always win' }, { icon: '📦', act: 'Pack the games away' }],
  a4_death:    [{ icon: '💬', act: 'Answer simply & honestly' }, { icon: '🍦', act: '"Look — ice cream!"' }, { icon: '🤥', act: '"Nobody dies, don\'t worry"' }],
  a4_dawdle:   [{ icon: '🏁', act: 'Connect, then race the clock' }, { icon: '🧦', act: 'Dress them yourself' }, { icon: '📢', act: 'Yell the countdown' }],
  a4_self:     [{ icon: '✅', act: 'Say YES; actually rest' }, { icon: '🧺', act: 'Accept — then do errands' }, { icon: '🙅', act: 'Decline. "We\'re fine."' }],
  a4_volcano:  [{ icon: '🫂', act: 'Kneel; apologize; repair' }, { icon: '🍨', act: 'Extra dessert, no words' }, { icon: '🗯️', act: '"You MADE me yell!"' }],
  a5_name:     [{ icon: '🌱', act: '"Not dumb — LEARNING"' }, { icon: '✍️', act: 'Guide their hand through' }, { icon: '📋', act: 'Nightly drill worksheets' }],
  a5_bike:     [{ icon: '🚲', act: 'Pedals off; tiny steps' }, { icon: '🍦', act: 'Ice cream if you ride' }, { icon: '💨', act: 'Push and let go' }],
  a5_friend:   [{ icon: '👂', act: 'Listen first, fully' }, { icon: '🤷', act: '"You\'ll be friends Friday"' }, { icon: '📵', act: 'Text Maya\'s mother' }],
  a5_chores:   [{ icon: '🏦', act: 'Family jobs + savings jar' }, { icon: '💰', act: 'Pay per chore, everything' }, { icon: '🚫', act: '"Kids don\'t need money"' }],
  a5_tales:    [{ icon: '🐉', act: '"What happened NEXT?!"' }, { icon: '😶', act: '"Mm, that\'s nice"' }, { icon: '❌', act: '"That\'s LYING."' }],
  a5_awkward:  [{ icon: '🤝', act: 'Calm, kind answer now' }, { icon: '🤫', act: 'Shush + yogurt distraction' }, { icon: '😤', act: 'Loud public scolding' }],
  a5_swim:     [{ icon: '👣', act: 'Watch today; feet next week' }, { icon: '🍨', act: 'Sundae for ten minutes' }, { icon: '🏊', act: 'Carry them in' }],
  a5_compare:  [{ icon: '📖', act: 'Their pace; keep books fun' }, { icon: '🃏', act: 'Secret flashcard drills' }, { icon: '🗣️', act: '"Why aren\'t you like Theo?"' }],
  a6_school:   [{ icon: '🤞', act: 'Squeeze ritual, brave bye' }, { icon: '🥷', act: 'Slip away unseen' }, { icon: '😠', act: '"Big kids don\'t cry"' }],
  a6_homework: [{ icon: '🍎', act: 'Snack, play, then chunks' }, { icon: '👮', act: 'Sit over them; no screens' }, { icon: '🖊️', act: 'Do it for them' }],
  a6_worst:    [{ icon: '⚓', act: 'Stay anchored; love + limit' }, { icon: '🚪', act: 'Room until you\'re nice' }, { icon: '🌋', act: '"Playdates CANCELLED!"' }],
  a6_read:     [{ icon: '📚', act: 'Keep reading — bigger books' }, { icon: '🎧', act: 'Alternate audiobook nights' }, { icon: '🛑', act: '"You can read yourself now"' }],
  a6_media:    [{ icon: '📜', act: 'Write a media plan together' }, { icon: '🎓', act: '"Educational only, unlimited"' }, { icon: '🎁', act: 'Tablet, no rules, peace' }],
  a6_sport:    [{ icon: '⚽', act: 'Feel it; finish the season' }, { icon: '📣', act: '"You\'ll WIN next time!"' }, { icon: '🏳️', act: 'Let them quit tonight' }],
  a6_alone:    [{ icon: '🪜', act: 'Practice the route together' }, { icon: '🔟', act: '"When you\'re ten."' }, { icon: '🕶️', act: 'Yes — then tail them' }],
  a6_self:     [{ icon: '🎸', act: 'Play again — badly, proudly' }, { icon: '🗓️', act: '"Someday, when they\'re older"' }, { icon: '😔', act: 'Guilt; the case stays shut' }],
  a6_quiet:    [{ icon: '💛', act: 'Sit back down. "Always."' }, { icon: '😘', act: '"Of course! Night night"' }, { icon: '🥱', act: '"Ask me tomorrow"' }]
};

/* ── which backdrop + item each scenario shows ────────────── */
DATA.sceneMap = {
  a1_babble:   { bg: 'home',    item: 'rattle' },
  a1_book:     { bg: 'home',    item: 'book' },
  a1_food:     { bg: 'kitchen', item: 'highchair', itemX: 425 },
  a1_steps:    { bg: 'home',    item: 'cushions' },
  a1_night:    { bg: 'bedroom', item: 'crib' },
  a1_point:    { bg: 'park',    item: 'dog' },
  a1_pots:     { bg: 'kitchen', item: 'pots', itemX: 430 },
  a1_screen:   { bg: 'home',    item: 'tabletBasket' },
  a2_market:   { bg: 'store',   item: 'cart' },
  a2_no:       { bg: 'bedroom', item: 'shirts' },
  a2_share:    { bg: 'park',    item: 'sandbox' },
  a2_eat:      { bg: 'kitchen', item: 'plate', itemX: 425 },
  a2_potty:    { bg: 'home',    item: 'potty' },
  a2_climb:    { bg: 'home',    item: 'sofa', itemX: 500 },
  a2_words:    { bg: 'street',  item: 'truck', itemX: 150 },
  a2_bedtime:  { bg: 'bedroom', item: 'bed', itemX: 500 },
  a2_self:     { bg: 'home',    item: 'messy', itemX: 480 },
  a3_why:      { bg: 'kitchen', item: 'plate', itemX: 425 },
  a3_friend:   { bg: 'kitchen', item: 'penguin', itemX: 430 },
  a3_wall:     { bg: 'home',    item: 'scribble', itemX: 490 },
  a3_dark:     { bg: 'bedroom', item: 'closet', itemX: 510 },
  a3_park:     { bg: 'park',    item: 'slide', itemX: 500 },
  a3_help:     { bg: 'kitchen', item: 'bowl', itemX: 425 },
  a3_lie:      { bg: 'kitchen', item: 'cookiejar', itemX: 425 },
  a3_cup:      { bg: 'kitchen', item: 'bluecup', itemX: 425 },
  a4_conflict: { bg: 'school',  item: 'truck', itemX: 150 },
  a4_cant:     { bg: 'home',    item: 'puzzle' },
  a4_nightmare:{ bg: 'bedroom', item: 'bed', itemX: 500 },
  a4_lose:     { bg: 'home',    item: 'boardgame' },
  a4_death:    { bg: 'street',  item: null },
  a4_dawdle:   { bg: 'home',    item: 'sockshoe' },
  a4_self:     { bg: 'home',    item: 'doorbag', itemX: 510 },
  a4_volcano:  { bg: 'kitchen', item: 'cereal', itemX: 440 },
  a5_name:     { bg: 'home',    item: 'deskpaper' },
  a5_bike:     { bg: 'park',    item: 'bike' },
  a5_friend:   { bg: 'school',  item: 'backpack', itemX: 150 },
  a5_chores:   { bg: 'home',    item: 'coinjar' },
  a5_tales:    { bg: 'kitchen', item: 'dragonbubble', itemX: 150 },
  a5_awkward:  { bg: 'store',   item: 'cart' },
  a5_swim:     { bg: 'pool',    item: null },
  a5_compare:  { bg: 'home',    item: 'book' },
  a6_school:   { bg: 'school',  item: 'backpack', itemX: 150 },
  a6_homework: { bg: 'home',    item: 'deskpaper' },
  a6_worst:    { bg: 'home',    item: 'slamdoor', itemX: 510 },
  a6_read:     { bg: 'bedroom', item: 'book' },
  a6_media:    { bg: 'home',    item: 'tablet' },
  a6_sport:    { bg: 'park',    item: 'ball' },
  a6_alone:    { bg: 'street',  item: null },
  a6_self:     { bg: 'home',    item: 'guitar' },
  a6_quiet:    { bg: 'bedroom', item: 'bed', itemX: 500 }
};
