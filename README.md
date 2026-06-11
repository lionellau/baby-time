# 🍼 Little Steps — A Parenting Journey

**[▶ Play it now →](https://lionellau.github.io/baby-time)**

---

## The story behind this game

My son turned two recently.

I remember the day he was born — the overwhelming joy, and right behind it, a quiet panic: *I have no idea what I'm doing.* Nobody hands you a manual. Everyone says "trust your instincts," but what if your instincts have never raised a human before?

The first year, I was just surviving. The second year, I started *watching* — really watching — how he responds to the way I talk to him, the way I react when he cries, the face I make when he knocks the cereal off the table (again). And I started reading. Books, research papers, pediatrician blogs at 11pm while feeding him. I found out about "serve and return" — that every time a baby babbles and you babble back, you are literally wiring their brain. I learned that how you respond to a tantrum shapes their emotional vocabulary for the rest of their childhood. I learned that "good job!" is less powerful than "you worked really hard on that."

None of this is secret knowledge. Child development researchers have known it for decades. But it's buried in academic papers and $40 hardcovers, and when your toddler is melting down in a grocery store, none of that reading is available to you in the moment.

That gap — between what science knows and what parents feel in real time — is why I built this game.

**Little Steps** is what I wished existed when my son was born: a playful, visual way to *feel* what different parenting responses look like, before the real moment arrives. Not a lecture. Not a checklist. A game, where you inhabit the scene, make the call, and see how your child reacts — and then, gently, learn why.

---

## What the game is

A cozy browser game where you raise a child from their **1st birthday to age 6**, one small everyday moment at a time — tantrums, bedtimes, first words, broccoli standoffs, big questions from little mouths.

Every scene is drawn live: your child reacts with real expressions, the parent figure leans in or steps back based on your choice, and each moment plays out in its actual setting — the high chair, the park, the bedroom at 2am.

You're not just reading. You're *playing*.

![Little Steps screenshot](screenshot.png)

---

## Why the early years matter so much

The science is humbling: **90% of brain development happens before age 5.** The neural connections formed in response to a caregiver's warmth, words, and reactions become the architecture a child uses to manage emotions, form relationships, and learn for the rest of their life.

This doesn't mean parents need to be perfect. It means the small, ordinary moments — how you respond when they spill something, whether you name their feelings, how often you get down on the floor and play — accumulate into something profound.

Little Steps puts you inside those moments and shows you, gently, what the research says.

---

## What you'll learn while playing

The tips in this game are drawn from widely-shared early childhood guidance:

- **Serve and return** (Harvard Center on the Developing Child) — the back-and-forth of responsive caregiving that builds brains
- **Emotion coaching** — naming feelings before redirecting behavior
- **Growth mindset praise** (Carol Dweck) — praising effort, not outcome
- **Ellyn Satter's division of responsibility** — who decides what gets eaten, and who decides how much
- **Rupture and repair** — the research finding that *how* you recover from a bad moment matters more than avoiding bad moments
- **Graded exposure** — the gentle way to help fearful children, not by pushing, but by going at their pace
- **Responsive screen habits** — co-viewing vs. solo screen time, and why it matters before 18 months

None of this is medical advice. Real children write their own rules — including mine. But every parent who plays this and handles one moment a little better makes a real difference in a real small person's life.

---

## How to play

No install, no account, no app store. Just open a browser.

**[▶ Play at lionellau.github.io/baby-time](https://lionellau.github.io/baby-time)**

Or run it locally:

```bash
git clone https://github.com/lionellau/baby-time.git
cd baby-time
python3 -m http.server 8741
# open http://localhost:8741
```

### Controls
- Click or tap the **action tiles** to make a choice (or press **1 / 2 / 3** on keyboard)
- Press **Enter** to continue
- **Tap your child any time** — they giggle, they blink, they have moods
- Your child has a hidden **temperament** (sunny / spirited / cautious / sensitive) that colors every reaction — just like real life

### What you're building
Each choice nurtures four things:

| | |
|---|---|
| ❤️ **Bond** | How safe and loved your child feels with you |
| 💬 **Language** | Their world of words, built conversation by conversation |
| 🤸 **Motor** | Movement, coordination, the confidence of a body that can do things |
| 🌈 **Feelings** | Emotional vocabulary and the ability to manage big emotions |

Your own **⚡ Energy** matters too — run yourself ragged and even the right responses land softer. The game's quiet nudge that self-care *is* parenting.

---

## Features

- **50 scenarios** across ages 1–6, drawn from real early-childhood situations
- **6 mini-games** (Peekaboo, Block Tower, Shape Sorter, Feeling Faces, Copy-Cat, Word Builder)
- **SVG-rendered scenes** — every character, backdrop, and prop drawn in code, no image files
- **3 save slots**, auto-saved after every moment
- **Hidden temperament system** — every new game rolls a different child personality
- **Memory Album** — warm moments unlock photos you keep
- **Parenting style ending** — at age 6, a reflection on the journey
- **Fully keyboard accessible**, reduce-motion support, large-text mode
- **Zero dependencies** — plain HTML, CSS, JavaScript. Works offline.

---

## For the parents

If you play this and it makes you think of your own child — good.

If it makes you want to get off your phone and go sit on the floor with them — even better.

The research is clear that you don't have to be a perfect parent. You just have to be a *present* one. Little Steps is my small attempt to make that a little easier to practice.

*— Lionel, dad to a very energetic two-year-old*

---

## Project layout

```
index.html        screens & layout
css/style.css     warm design system, animations, responsive rules
js/data.js        50 scenarios, tips, milestones, memories, endings
js/baby.js        SVG renderer: child, parent, expressions, items, backdrops
js/minigames.js   6 mini-games, one per age
js/game.js        state machine, save slots, HUD, flow
js/audio.js       WebAudio sound effects (no audio files)
```

---

*Made with 💛 for everyone trying to grow a small human while staying one too.*
