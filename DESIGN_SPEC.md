# Portfolio Site — Design Spec & Content Reference

Reference doc for a working-holiday-targeted portfolio site (Auckland, NZ — climbing gyms, cafés, service roles). Written in English throughout. Place this file in the project root so Claude Code can reference it across sessions.

---

## 1. Site Structure

- **Hero**: Fixed hub page (not a scroll section — everything else opens from here)
- **About, Contact**: Open as modal/overlay on top of the Hero when clicked in nav
- **Projects**: Triggered by a symbolic element (icon/photo) in the Hero — routes to a separate page (not a modal)
- Each Project page uses a **sidebar + scrolling content** layout (left: category list with scroll-spy highlighting; right: scrolling sections), inspired by nataliealmosa.ca/arc

### Modal styling note
Modals sit on top of the same white/grid Hero background, so they need visual separation. Decided approach: keep the white/coral system intact (no bold per-section colors like Natalie's site), and differentiate modals via background tone/shadow — e.g. a warm ivory tint (`#FDFAF7`) and/or shadow depth, or subtly varying the coral blob's intensity per section. Final treatment TBD at build time — flexible.

---

## 2. Design System

### Colors
- Background: `#FFFFFF`
- Grid lines: `#EEEEEE`, 1px, 32px spacing
- Accent blob: `rgba(216, 90, 48, 0.18)` radial gradient, positioned center–top-right (on Hero); reused at lower opacity (~0.10–0.12) on modal/project pages
- Accent color (solid): Coral `#D85A30`
- Body text: `#444` / `#555`
- Secondary/muted text: `#666` / `#888` / `#999`
- Borders/dividers: `#EEEEEE` (0.5px)

### Typography
Font: **Pretendard**, weights 400 / 600 / 700 only (no 500)

| Use | Desktop | Mobile | Weight | Line-height |
|---|---|---|---|---|
| Hero headline | 56px | 36px | 700 | 1.2 |
| Section title | 32px | 24px | 600 | 1.3 |
| Card/sub title | 20px | 18px | 600 | 1.4 |
| Body | 16px | 15px | 400 | 1.6–1.7 |
| Caption | 13px | 12px | 400 | 1.5 |

### Spacing
8px-based scale. Section padding ~48–64px. Card border-radius: 12px. Button border-radius: 8px.

---

## 3. Hero

**Headline**: "Climbing coach. Content creator. Vibe coder."

**Subtext**: "I teach climbing, grow our social presence, and build the tools that keep it all running."

**CTAs**: "View projects" (filled coral) / "Get in touch" (outline)

**Nav**: About / Projects / Contact

---

## 4. About (modal)

**Mission line**: "Things that make people's days a little better."

**Guiding principle**: "I care about the small details — the ones that make a first climb less white-knuckle, a caption stop the scroll, a tool just work — no duct tape required."

**Three people**: "I want a beginner hooked after one session, a follower reeled in instead of scrolling past, and a teammate with one less thing on their plate."

**Closing line**: "Simple things, made a little better."

### Story block ① — "Trained to adapt"
"Seven years as an intelligence operator taught me one thing above all: figure it out, fast, with whatever you've got. No one hands you a manual. When I left, that habit didn't — I just started pointing it at climbing walls, Instagram feeds, and code editors instead."

### Story block ② — "Coffee, the slow way"
"Five-plus years into home brewing, one pour-over at a time. I hold SCA certifications in Barista Skills and Brewing — not because I needed the paper, but because I wanted to know I wasn't just guessing anymore."

### Experience (timeline — company/org first, role second)

**2025 – 2026**
PEAKERS Climbing Sinchon
Climbing coach
Coaching, event planning, and social media for a bouldering gym.

**2026 – Now**
Independent practice
Vibe coder
Building web apps, games, and internal tools with Claude Code.

**2018 – 2025**
ROK Army
Intelligence Operator
Planned and coordinated intelligence operations, developing discipline, adaptability, and problem-solving under pressure.

---

## 5. Projects (3 pages, sidebar + scroll layout)

### Project 1 — Coaching
**Category label**: Coaching
**Title**: "Growing / PEAKERS Sinchon" (two lines)
**Sidebar categories**: Introduction / Coaching / Curriculum design / Event design

- **Introduction**: "I coach, run events, and manage social for a bouldering gym in Seoul — basically anything that gets people on the wall and keeps them coming back."
- **Coaching**: "Of the 19 students in their first month, most stayed on for a second." — Stat: **Over 80% stayed on** (16/19)
- **Curriculum design**: "Wrote two curricula — a 2–3 month program for beginners and a 3-month program for intermediate climbers — each built around adapting to where a student actually was, not a one-size-fits-all class. Also built an English version and taught sessions in English, since foreign visitors came through the gym daily."
- **Event design**: "Ran a bouldering party where members squared off on the same problems, half competition, half excuse to hang out longer than usual. Turns out cheering someone through a hard move is a pretty good way to make a gym feel like a community."

### Project 2 — Content
**Category label**: Content
**Title**: "Made for / @peakers_sinchon" (two lines)
**Sidebar categories**: Introduction / Growth / From shoot to post / Going local

- **Introduction**: "I handle content for @peakers_sinchon — planning, shooting, and posting the kind of content that gets people talking, and sometimes gets them onto the wall."
- **Growth**: "Reach had been declining before I took over. Within three weeks, weekly reach hit an all-time high — and one reel outperformed everything posted before or since." — Stats: **+50% Instagram growth**, **50K best-performing reel**
- **From shoot to post**: "Every reel starts as a phone clip and ends up cut, captioned, and color-graded in CapCut or Canva — usually the same day it's filmed. No outsourcing, no waiting on a designer."
- **Going local**: "Figured out who was actually around — turns out that's a lot of university students. So instead of casting a wide net, I built a student discount and pushed it through Reels aimed squarely at people walking past the gym every day."

### Project 3 — Vibe coder
**Category label**: Vibe coder
**Title**: "Small apps, / built with AI" (two lines)
**Sidebar categories**: Introduction / classnote / climbing-game / timerforme
Each app section includes a screenshot placeholder above its description.

- **Introduction**: "Work gave me problems worth solving, training gave me a reason to build something just for myself, and curiosity did the rest. I didn't know how to code — so I taught myself with AI, one small project at a time."
- **classnote**: "A PWA for managing climbing students — lesson notes, bouldering and endurance progress, all in one place. Still in daily use at the gym."
- **climbing-game**: "A browser game that reads your hand position through your webcam and turns it into a bouldering puzzle — built to make the sport feel more like play, less like a wall to be afraid of."
- **timerforme**: "An interval timer built for climbing training, because a phone stopwatch was never going to cut it." (Note: same project as `timerapp-zeta.vercel.app`, display name only differs)

---

## 6. Contact (modal)

**Section title**: "Get in touch"

**Contact links** (vertical stack, label + value):
- Email: —
- Instagram: —
- Mobile: —

(No LinkedIn/GitHub — GitHub links live inside each Vibe coder project instead; LinkedIn skipped as too formal for the target audience of gym/café employers.)

**Off duty block**
Subheading: "A few things I'd rather talk about:"
Displayed as an accordion — clicking each item reveals a photo (not text/list — decided to keep it visual).

1. **Swapping albums, start to finish**
   "Your daily listening albums — singles totally count too. K-pop recommendation requests also welcome."
2. **Comparing beta on the same crux**
   "Stuck on a problem? I promise I've got plenty of my own."
3. **Planning a route to nowhere**
   "Good routes with no real destination. Bonus points if there's decent coffee at the end."

---

## 7. Open / Not Yet Decided

- Exact modal background differentiation treatment (color/shadow/tone) per section
- Mobile responsive behavior (modals → likely full-screen; sidebar on project pages → likely top tabs or dropdown)
- Domain (candidate: malcolmis.fun — not yet purchased/verified available)
- Real photos/screenshots to replace placeholders throughout
- Accordion photo content for Off duty section
- Two-mode toggle (Natalie-style "widget mode" vs. scroll/carousel mode) — deferred; build one mode fully first, consider adding the toggle later

---

## 8. Build Notes

- Stack: Next.js + Tailwind + TypeScript, deployed on Vercel
- Font: Pretendard (self-hosted or via CDN)
- Reusable modal component for About/Contact
- Reusable sidebar-scroll-spy layout for the 3 Project pages
- All content is finalized in English — no localization needed for this phase
