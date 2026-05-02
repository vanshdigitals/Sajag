# SAJAG — Design Specification + Wireframe Document
## Civic-Tech Election Assistant for Indian Voters
**Version:** 1.0  
**Date:** 2026-05-02  
**Status:** Production-Ready Design Spec  
**Author:** Product Design & UX Architecture Team

---

## SECTION 1: PRODUCT OVERVIEW

### 1.1 Product Identity
| Attribute | Detail |
|-----------|--------|
| **Product Name** | Sajag |
| **Tagline** | "Stay aware. Vote with clarity." |
| **One-Line Description** | An interactive, step-by-step digital assistant that demystifies the Indian election process for first-time and everyday voters through guided flows, visual timelines, and contextual AI explanations. |
| **Category** | Civic Technology / Voter Education |
| **Platform** | Responsive Web Application (Mobile-first) |

### 1.2 Target Users
| User Segment | Profile | Needs |
|-------------|---------|-------|
| **First-Time Voters** | Age 18–22, students, young professionals | Understand eligibility, registration, and what to expect on polling day |
| **General Citizens** | Age 25–55, semi-familiar with elections | Clarify procedural changes, timelines, and documentation requirements |
| **NRI / Migrants** | Indian citizens living outside home state | Understand constituency rules, postal ballots, and transfer procedures |
| **Senior Citizens** | Age 60+, may need simplified explanations | Large text, clear language, minimal cognitive load |

### 1.3 Core User Goals
1. **Understand** — Learn the complete election process without information overload
2. **Verify** — Confirm personal eligibility and registration status
3. **Locate** — Find assigned polling booth with directions and accessibility info
4. **Prepare** — Know exactly what documents to carry and what to expect
5. **Track** — Monitor election phases and key dates relevant to their state

### 1.4 Success Metrics
- User completes all 5 election steps
- Time spent per step < 3 minutes
- Return rate to reference specific steps
- Polling booth lookup completion rate

---

## SECTION 2: USER JOURNEY (END-TO-END FLOW)

### 2.1 Journey Map

```
START
  │
  ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. LANDING PAGE                                             │
│    • User discovers Sajag via search, social, or referral   │
│    • Sees value proposition and trust indicators            │
│                                                             │
│    ACTION: Clicks "Start Learning" or "Find Your Booth"     │
└─────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. INTENT SELECTION (Optional Gate)                         │
│    • User chooses primary goal                              │
│      — "I want to learn the election process"               │
│      — "I want to find my polling booth"                    │
│      — "I want to check election dates"                     │
│                                                             │
│    ACTION: Selects intent card                              │
└─────────────────────────────────────────────────────────────┘
  │
  ├─────────────────────┬─────────────────────┬───────────────┘
  ▼                     ▼                     ▼
┌──────────┐      ┌──────────┐      ┌──────────────┐
│ 3A. GUIDE│      │ 3B. MAP  │      │ 3C. TIMELINE │
│   FLOW   │      │  LOCATOR │      │    VIEW      │
│          │      │          │      │              │
│ ACTION:  │      │ ACTION:  │      │ ACTION:      │
│ Begin    │      │ Allow    │      │ Filter by    │
│ Step 1   │      │ location │      │ state        │
└────┬─────┘      └────┬─────┘      └──────┬───────┘
     │                 │                    │
     │                 │                    │
     ▼                 ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. OPTIONAL LOGIN (Google One-Tap)                          │
│    • Triggered when user wants to save progress             │
│    • Skippable — anonymous browsing allowed                 │
│    • Value prop: "Save your progress and get reminders"     │
│                                                             │
│    ACTION: Signs in with Google OR clicks "Skip for now"    │
└─────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. ELECTION STEP FLOW (Core Experience)                     │
│    • User progresses through 5 interactive steps            │
│    • Each step: explanation → checklist → completion        │
│    • AI "Explain Simply" available on every step            │
│                                                             │
│    ACTION: Clicks "Mark Complete" → advances to next step   │
└─────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. TIMELINE VIEW (Contextual Reference)                     │
│    • User views election phases and key dates               │
│    • Can cross-reference with current step                  │
│                                                             │
│    ACTION: Clicks phase card for details                    │
└─────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. DASHBOARD (Home Base)                                    │
│    • Overview of progress, next steps, and quick actions    │
│    • Accessible from bottom navigation                      │
│                                                             │
│    ACTION: Reviews progress OR jumps to incomplete step     │
└─────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────┐
│ 8. COMPLETION STATE                                         │
│    • All 5 steps marked complete                            │
│    • Celebration + shareable certificate                    │
│    • Reminder to vote on polling day                        │
│                                                             │
│    ACTION: Shares certificate OR sets polling day reminder  │
└─────────────────────────────────────────────────────────────┘
  │
  ▼
 END (User is informed, prepared, and confident)
```

### 2.2 Decision Points
| Point | Condition | Path A | Path B |
|-------|-----------|--------|--------|
| Intent Gate | User selects goal | Guide Flow | Map / Timeline |
| Login Gate | After Step 2 completion | Prompt login | Allow anonymous continuation |
| Mode Toggle | User preference | Beginner (simple) | Advanced (detailed) |
| Language | User selection | English | Hindi |

### 2.3 Emotional Journey
| Stage | User Feeling | Design Response |
|-------|-------------|-----------------|
| Landing | Curious, slightly overwhelmed | Clean layout, trust badges, clear CTA |
| Intent Selection | Directed, in control | Three clear choices, no ambiguity |
| Step Flow | Learning, building confidence | Progress indicator, bite-sized content |
| AI Explanation | Confused → Clear | Friendly tone, simple analogies |
| Dashboard | Accomplished, organized | Visual progress, completion badges |
| Completion | Proud, empowered | Celebration animation, shareable outcome |

---

## SECTION 3: SCREEN LIST

### 3.1 Complete Screen Inventory

| # | Screen Name | Route | Auth Required | Purpose |
|---|-------------|-------|---------------|---------|
| 1 | **Landing Page** | `/` | No | Acquisition, value proposition, trust building |
| 2 | **Login / Auth Gate** | `/login` | No (entry point) | Google Sign-In, progress saving |
| 3 | **Intent Selection** | `/intent` | No | Route user to correct flow |
| 4 | **Election Flow — Step 1: Eligibility** | `/guide/eligibility` | No | Check voter eligibility criteria |
| 5 | **Election Flow — Step 2: Registration** | `/guide/registration` | No | Voter ID registration process |
| 6 | **Election Flow — Step 3: Booth Location** | `/guide/booth` | No | Find assigned polling station |
| 7 | **Election Flow — Step 4: Voting Process** | `/guide/voting` | No | What happens on polling day |
| 8 | **Election Flow — Step 5: After Voting** | `/guide/after` | No | Results, complaints, future duties |
| 9 | **Timeline View** | `/timeline` | No | Election phases and key dates |
| 10 | **Dashboard** | `/dashboard` | Optional | Progress overview, quick actions |
| 11 | **Booth Locator (Map View)** | `/locator` | No | Interactive map with polling stations |
| 12 | **Completion Screen** | `/complete` | Optional | Celebration, certificate, share |
| 13 | **AI Assistant Overlay** | `/assistant` (modal) | No | Contextual help across all screens |
| 14 | **Profile / Settings** | `/profile` | Yes | Language, mode, notifications |

### 3.2 Navigation Structure

**Bottom Tab Bar (Mobile) — Persistent in App Shell:**
```
┌─────────┬─────────┬─────────┬─────────┬─────────┐
│  Home   │  Guide  │ Timeline│  Booth  │ Profile │
│ (House) │ (Steps) │ (Clock) │ (Pin)   │ (User)  │
└─────────┴─────────┴─────────┴─────────┴─────────┘
```

**Top Navigation (Desktop):**
- Logo (left)
- Links: Guide | Timeline | Booth Locator | Assistant
- User avatar / Login button (right)

---

## SECTION 4: LOW-FIDELITY WIREFRAMES (TEXT FORMAT)

### 4.1 Landing Page

```
┌─────────────────────────────────────────────┐
│  [SAJAG Logo]              [Sign In]        │  ← Header (sticky)
├─────────────────────────────────────────────┤
│                                             │
│     ┌─────────────────────────────────┐     │
│     │  H1: Understand Elections.      │     │
│     │      Vote with Confidence.      │     │
│     │                                 │     │
│     │  Subtitle: Your simple, step-   │     │
│     │  by-step guide to the Indian    │     │
│     │  election process.              │     │
│     │                                 │     │
│     │  [  Start Learning  ]           │     │  ← Primary CTA (full-width mobile)
│     │                                 │     │
│     │  [  Find Your Booth  ]          │     │  ← Secondary CTA
│     └─────────────────────────────────┘     │
│                                             │
│  ─────── Trust Indicators ───────           │
│  ✓ Official Election Commission data        │
│  ✓ Free & Secure                            │
│  ✓ Available in English & Hindi             │
│                                             │
│  ─────── How It Works (3 Cards) ───────     │
│                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐     │
│  │  📋     │  │  📅     │  │  🤖     │     │
│  │  Learn  │  │  Track  │  │  Ask AI │     │
│  │  Steps  │  │  Dates  │  │  Helper │     │
│  └─────────┘  └─────────┘  └─────────┘     │
│                                             │
│  ─────── Social Proof ───────               │
│  "Trusted by 50,000+ first-time voters"     │
│                                             │
│  ─────── Footer ───────                     │
│  About | Privacy | Terms | Language: EN/HI  │
│  © 2026 Sajag. Not an official gov site.    │
│                                             │
└─────────────────────────────────────────────┘
```

**Layout Structure:**
- **Header:** Logo left, Sign In button right, height 64px, white background, subtle bottom border (#E2E8F0)
- **Hero:** Centered text, max-width 640px, padding 48px 24px, background #F8FAFC
- **Trust Bar:** Horizontal row of 3 badges, icon + text, padding 24px
- **Feature Grid:** 3 equal cards, horizontal scroll on mobile, grid on desktop
- **Footer:** Centered links, small text (#475569), padding 32px

---

### 4.2 Login / Auth Gate

```
┌─────────────────────────────────────────────┐
│  [← Back]                                   │  ← Header
├─────────────────────────────────────────────┤
│                                             │
│          ┌─────────────────────┐            │
│          │                     │            │
│          │   [SAJAG Logo]      │            │
│          │                     │            │
│          │   Stay aware.       │            │
│          │   Vote with clarity.│            │
│          │                     │            │
│          │  ─────────────────  │            │
│          │                     │            │
│          │   Sign in to save   │            │
│          │   your progress     │            │
│          │                     │            │
│          │  [ G  Sign in with ]│            │  ← Google button
│          │  [    Google       ]│            │
│          │                     │            │
│          │  [ Continue as Guest ]│           │  ← Ghost button
│          │                     │            │
│          │  By signing in, you │            │
│          │  agree to our Terms │            │
│          │  and Privacy Policy │            │
│          │                     │            │
│          └─────────────────────┘            │
│                                             │
│          (reCAPTCHA badge)                  │
│                                             │
└─────────────────────────────────────────────┘
```

**Layout Structure:**
- **Card:** Centered, max-width 420px, white background, border-radius 12px, padding 32px
- **Logo:** 48px height, centered, margin-bottom 24px
- **Google Button:** Full width, white background, Google "G" icon left, border 1px #E2E8F0
- **Guest Button:** Full width, transparent background, text #475569
- **Trust Text:** 12px, #94A3B8, centered, margin-top 16px

---

### 4.3 Intent Selection

```
┌─────────────────────────────────────────────┐
│  [SAJAG Logo]              [Close X]        │  ← Header
├─────────────────────────────────────────────┤
│                                             │
│     H2: What would you like to do?          │
│     Subtitle: Choose your starting point    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  📋                                 │    │
│  │  Learn the Election Process         │    │  ← Card 1
│  │  Step-by-step guide for first-time  │    │
│  │  voters and citizens.               │    │
│  │                             [ → ]   │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  📍                                 │    │
│  │  Find My Polling Booth              │    │  ← Card 2
│  │  Locate your assigned station and   │    │
│  │  check accessibility options.       │    │
│  │                             [ → ]   │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  📅                                 │    │
│  │  Check Election Dates               │    │  ← Card 3
│  │  View the complete election         │    │
│  │  timeline for your state.           │    │
│  │                             [ → ]   │    │
│  └─────────────────────────────────────┘    │
│                                             │
│     [ Skip — Take me to the dashboard ]     │  ← Text link
│                                             │
└─────────────────────────────────────────────┘
```

**Layout Structure:**
- **Header:** Minimal, close button right
- **Cards:** Full width, stacked vertically, 16px gap, padding 24px each
- **Card Interior:** Icon (32px) top-left, H3 title, body text, arrow icon bottom-right
- **Hover State:** Border color transitions to #1D4ED8, subtle shadow increase
- **Skip Link:** Centered, #475569, underline on hover

---

### 4.4 Election Flow — Step Screen (Template for All 5 Steps)

```
┌─────────────────────────────────────────────┐
│  [← Back]  Step X of 5        [Language]    │  ← Header
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  Progress Bar: [████░░░░░░] 40%     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  H1: Step X: [Step Title]                   │
│  Subtitle: [One-line context]               │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │                                     │    │
│  │  [Illustration / Icon]              │    │
│  │                                     │    │
│  │  Body content explaining the step   │    │
│  │  in 2-3 short paragraphs.           │    │
│  │                                     │    │
│  │  • Bullet point 1                   │    │
│  │  • Bullet point 2                   │    │
│  │  • Bullet point 3                   │    │
│  │                                     │    │
│  │  [ 🤖 Explain Simply ]              │    │  ← AI Button
│  │                                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ─────── Checklist ───────                  │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  ☐ Checklist item 1                 │    │
│  │  ☐ Checklist item 2                 │    │
│  │  ☐ Checklist item 3                 │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  [      Mark Step as Complete      ]        │  ← Primary CTA
│                                             │
│  [ ← Previous ]        [ Next → ]           │  ← Navigation
│                                             │
└─────────────────────────────────────────────┘
```

**Layout Structure:**
- **Header:** Back button left, step counter center, language toggle right
- **Progress Bar:** Full width, height 8px, border-radius 4px, filled portion #1D4ED8, background #E2E8F0
- **Content Card:** White background, border-radius 12px, padding 24px, 16px margin-top
- **AI Button:** Secondary style, icon left, full width on mobile, auto width on desktop
- **Checklist:** Each item is a checkbox + label row, 12px vertical padding
- **CTA:** Fixed to bottom on mobile (safe area), static on desktop, height 56px

---

### 4.5 Timeline View

```
┌─────────────────────────────────────────────┐
│  [SAJAG Logo]              [Filter ▼]       │  ← Header
├─────────────────────────────────────────────┤
│                                             │
│  H1: Election Timeline 2026                 │
│  Subtitle: Key dates and phases             │
│                                             │
│  [ All ] [ Upcoming ] [ Completed ]         │  ← Filter Pills
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  ●───────                            │    │
│  │  │  Jan 15                            │    │
│  │  │  Phase 1: Notification            │    │  ← Timeline Item
│  │  │  Election dates announced         │    │
│  │  │  [View Details →]                 │    │
│  │  │                                    │    │
│  │  ●───────                            │    │
│  │  │  Feb 1–7                           │    │
│  │  │  Phase 2: Nomination Filing       │    │
│  │  │  Candidates file nominations      │    │
│  │  │  [View Details →]                 │    │
│  │  │                                    │    │
│  │  ○───────                            │    │
│  │     Mar 10                           │    │
│  │     Phase 3: Polling Day             │    │
│  │     Voting begins                   │    │
│  │     [View Details →]                 │    │
│  └─────────────────────────────────────┘    │
│                                             │
└─────────────────────────────────────────────┘
```

**Layout Structure:**
- **Filter Pills:** Horizontal scroll, 8px gap, active pill has #1D4ED8 background
- **Timeline:** Vertical line 2px wide, #E2E8F0, positioned left 24px
- **Node:** 12px circle, completed = #16A34A, active = #1D4ED8 with pulse animation, upcoming = #E2E8F0
- **Card:** Left margin 48px, white background, padding 16px, border-radius 12px
- **Date Badge:** Small pill above title, #DBEAFE background, #1D4ED8 text

---

### 4.6 Dashboard

```
┌─────────────────────────────────────────────┐
│  Good morning, [Name] ▼                     │  ← Header (greeting)
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │                                     │    │
│  │    ╭──────────────╮                 │    │
│  │    │              │                 │    │
│  │    │     60%      │                 │    │  ← Circular Progress
│  │    │   Complete   │                 │    │
│  │    │              │                 │    │
│  │    ╰──────────────╯                 │    │
│  │                                     │    │
│  │   3 of 5 steps completed            │    │
│  │                                     │    │
│  │   [ Continue Learning ]             │    │
│  │                                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ─────── Quick Actions ───────              │
│                                             │
│  ┌─────────────┐  ┌─────────────┐           │
│  │    📋       │  │    📍       │           │
│  │  Guide      │  │  Booth      │           │
│  └─────────────┘  └─────────────┘           │
│                                             │
│  ┌─────────────┐  ┌─────────────┐           │
│  │    📅       │  │    🤖       │           │
│  │  Timeline   │  │  Assistant  │           │
│  └─────────────┘  └─────────────┘           │
│                                             │
│  ─────── Recent Activity ───────            │
│                                             │
│  ✓ Completed: Check Eligibility      2h ago │
│  ✓ Completed: Register as Voter      1d ago │
│  ⏳ In Progress: Find Polling Booth          │
│                                             │
├─────────────────────────────────────────────┤
│  [🏠]  [📋]  [📅]  [📍]  [👤]              │  ← Bottom Nav
└─────────────────────────────────────────────┘
```

**Layout Structure:**
- **Greeting:** H2, #0F172A, padding 24px
- **Progress Card:** White background, centered content, padding 32px
- **Circular Progress:** 120px diameter, stroke 8px, #1D4ED8 fill, #E2E8F0 track
- **Quick Actions:** 2x2 grid, icon + label centered, 16px gap
- **Activity List:** Full width rows, icon left, text center, timestamp right
- **Bottom Nav:** Fixed, height 64px + safe area, white background, top border #E2E8F0

---

### 4.7 Booth Locator (Map View)

```
┌─────────────────────────────────────────────┐
│  [← Back]  Find Your Booth     [List View]  │  ← Header
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │                                     │    │
│  │                                     │    │
│  │         [  MAP VIEW  ]              │    │
│  │                                     │    │
│  │      📍  You are here               │    │
│  │                                     │    │
│  │      📍  Polling Station            │    │
│  │                                     │    │
│  │                                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  📍 Government School, Sector 4     │    │
│  │  1.2 km away • Walking: 15 min      │    │
│  │                                     │    │
│  │  ♿ Wheelchair accessible           │    │
│  │  🅿️ Parking available               │    │
│  │                                     │    │
│  │  [ Get Directions ]  [ Save ]       │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  [ 🔍 Search by PIN Code ]                  │
│                                             │
└─────────────────────────────────────────────┘
```

**Layout Structure:**
- **Map Container:** 60% viewport height on mobile, 400px fixed on desktop
- **Station Card:** Overlaps bottom of map, draggable sheet on mobile
- **Info Rows:** Icon (16px) + text, 8px vertical padding
- **Action Buttons:** Side by side, equal width, 12px gap
- **Search Bar:** Floating above map, centered, max-width 400px

---

### 4.8 Completion Screen

```
┌─────────────────────────────────────────────┐
│  [SAJAG Logo]                               │  ← Minimal Header
├─────────────────────────────────────────────┤
│                                             │
│          ┌─────────────────────┐            │
│          │                     │            │
│          │    🎉               │            │
│          │                     │            │
│          │   Congratulations!  │            │
│          │                     │            │
│          │   You have completed│            │
│          │   all 5 steps.      │            │
│          │                     │            │
│          │   You are now ready │            │
│          │   to vote with      │            │
│          │   confidence.       │            │
│          │                     │            │
│          │  ┌───────────────┐  │            │
│          │  │  🏆           │  │            │
│          │  │  Sajag        │  │            │  ← Certificate Card
│          │  │  Champion     │  │            │
│          │  │               │  │            │
│          │  │  [Name]       │  │            │
│          │  │  Completed    │  │            │
│          │  │  [Date]       │  │            │
│          │  └───────────────┘  │            │
│          │                     │            │
│          │  [ Share Certificate ]│          │
│          │                     │            │
│          │  [ Set Voting Reminder ]│        │
│          │                     │            │
│          │  [ Return to Dashboard ]│        │
│          │                     │            │
│          └─────────────────────┘            │
│                                             │
└─────────────────────────────────────────────┘
```

**Layout Structure:**
- **Background:** Gradient from #F8FAFC to #DBEAFE (subtle)
- **Certificate Card:** White background, border-radius 12px, border 2px #1D4ED8, padding 24px
- **Badge Icon:** 64px, centered, #F59E0B (saffron accent — minimal use)
- **Buttons:** Stacked vertically, 12px gap, full width on mobile

---

### 4.9 AI Assistant Overlay

```
┌─────────────────────────────────────────────┐
│  [← Back]  Sajag Assistant    [Clear]       │  ← Header
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  🤖 Hello! I'm your election        │    │  ← AI Message
│  │  assistant. Ask me anything about   │    │
│  │  the voting process.                │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  What documents do I need?          │    │  ← User Message
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  🤖 You need:                       │    │  ← AI Response
│  │  1. Voter ID (EPIC) card            │    │
│  │  2. Aadhaar (backup ID)             │    │
│  │  3. Phone for OTP verification      │    │
│  │                                     │    │
│  │  Was this helpful? [👍] [👎]        │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ─────── Suggested Questions ───────        │
│  [ How do I check my voter ID? ]            │
│  [ What happens on polling day? ]           │
│  [ Can I vote without EPIC? ]               │
│                                             │
├─────────────────────────────────────────────┤
│  [ Type your question...        ] [Send]    │  ← Input Area
│                                             │
│  0/500 characters                           │
└─────────────────────────────────────────────┘
```

**Layout Structure:**
- **Header:** Fixed, height 56px, white background
- **Chat Area:** Scrollable, flex-grow, padding 16px, 12px gap between messages
- **AI Bubble:** White background, #0F172A text, border-radius 12px 12px 12px 4px
- **User Bubble:** #1D4ED8 background, #FFFFFF text, border-radius 12px 12px 4px 12px
- **Suggested Chips:** Horizontal scroll, 8px gap, pill shape
- **Input Area:** Fixed bottom, white background, top border #E2E8F0, padding 12px 16px

---

## SECTION 5: MAIN FEATURE — ELECTION STEP FLOW DESIGN

### 5.1 Core Screen: Election Step Flow

The Election Step Flow is the **primary user experience** of Sajag. It transforms complex election procedures into 5 manageable, interactive steps.

### 5.2 Screen Layout (Detailed)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER (Fixed, 56px height)                                                 │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [←]  Step 2 of 5                    [EN ▼]  [👤]                      │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ PROGRESS BAR (Sticky below header)                                          │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [████████████████████░░░░░░░░░░]  40% Complete                        │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ MAIN CONTENT (Scrollable)                                                   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ STEP INDICATOR                                                          │ │
│ │ ●────●────○────○────○                                                   │ │
│ │  1    2    3    4    5                                                  │ │
│ │ Elig. Reg.  Booth Vote After                                            │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ CONTENT CARD (White, 12px radius, 24px padding)                         │ │
│ │                                                                         │ │
│ │ H1: Step 2: Register as a Voter                                         │ │
│ │ Subtitle: Get your Voter ID (EPIC) card before the election             │ │
│ │                                                                         │ │
│ │ ┌─────────────────────────────────────────────────────────────────┐     │ │
│ │ │                                                                 │     │ │
│ │ │                    [Illustration]                               │     │ │
│ │ │              (Person filling a form)                            │     │ │
│ │ │                                                                 │     │ │
│ │ └─────────────────────────────────────────────────────────────────┘     │ │
│ │                                                                         │ │
│ │ Body Text:                                                              │ │
│ │ To vote in India, you must be registered as a voter with the           │ │
│ │ Election Commission. This process is called enrollment, and it         │ │
│ │ gives you a Voter ID card (also called EPIC).                          │ │
│ │                                                                         │ │
│ │ Key Points:                                                             │ │
│ │ • You can apply online through the NVSP portal                         │ │
│ │ • Or visit your nearest Electoral Registration Office                  │ │
│ │ • Processing time is typically 2–4 weeks                               │ │
│ │                                                                         │ │
│ │ [ 🤖 Explain Simply — Ask AI ]                                         │ │
│ │                                                                         │ │
│ │ ┌─────────────────────────────────────────────────────────────────┐     │ │
│ │ │ 🤖 AI Explanation:                                              │     │ │
│ │ │ Think of voter registration like getting a library card.        │     │ │
│ │ │ Just as a library card lets you borrow books, a Voter ID        │     │ │
│ │ │ lets you cast your vote. Without it, you cannot participate.    │     │ │
│ │ │                                                                 │     │ │
│ │ │ [ 👍 Helpful ]  [ 👎 Not Helpful ]                              │     │ │
│ │ └─────────────────────────────────────────────────────────────────┘     │ │
│ │                                                                         │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ CHECKLIST CARD                                                          │ │
│ │                                                                         │ │
│ │ □ Visit nvsp.in and fill Form 6                                        │ │
│ │ □ Upload identity proof (Aadhaar / Passport / Driving License)         │ │
│ │ □ Upload address proof (Utility Bill / Bank Statement)                 │ │
│ │ □ Submit and note the reference number                                 │ │
│ │ □ Track application status online                                      │ │
│ │                                                                         │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ OFFICIAL LINK                                                           │ │
│ │ 🔗 Visit Official NVSP Portal →                                         │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ BOTTOM ACTION BAR (Fixed, 80px height, safe area)                           │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [ ← Previous ]          [ Mark Complete & Continue → ]                  │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 The Five Steps

| Step | ID | Title | Subtitle | Estimated Time | Key Actions |
|------|-----|-------|----------|----------------|-------------|
| **1** | `eligibility` | Check Your Eligibility | Are you qualified to vote in India? | 2 min | Age check, citizenship check, criminal record disclaimer |
| **2** | `registration` | Register as a Voter | Get your Voter ID (EPIC) card | 3 min | Form 6, documents needed, online vs offline |
| **3** | `booth` | Find Your Polling Booth | Know where to go on election day | 2 min | Booth lookup, EPIC number search, accessibility info |
| **4** | `voting` | Understand Voting Day | What to expect and how to vote | 4 min | EVM operation, VVPAT verification, do's and don'ts |
| **5** | `after` | After You Vote | Results, complaints, and future duties | 2 min | Result dates, EVM counting, grievance redressal |

### 5.4 Step Flow State Machine

```
[Step 1: Eligibility]
    │
    ├── All checklist items checked
    │       │
    │       ▼
    │   [Mark Complete]
    │       │
    │       ▼
    │   Confetti animation (subtle)
    │       │
    │       ▼
[Step 2: Registration]
    │
    ├── (User can go back to Step 1 anytime)
    │
    ├── All checklist items checked
    │       │
    │       ▼
    │   [Mark Complete]
    │       │
    │       ▼
[Step 3: Booth]
    │
    ├── All checklist items checked
    │       │
    │       ▼
    │   [Mark Complete]
    │       │
    │       ▼
[Step 4: Voting]
    │
    ├── All checklist items checked
    │       │
    │       ▼
    │   [Mark Complete]
    │       │
    │       ▼
[Step 5: After]
    │
    ├── All checklist items checked
    │       │
    │       ▼
    │   [Mark Complete]
    │       │
    │       ▼
[Completion Screen]
```

### 5.5 AI "Explain Simply" Interaction

| Trigger | User clicks "Explain Simply" button |
|---------|-------------------------------------|
| **Loading State** | Button text changes to "Thinking..." with spinner |
| **Response** | AI card slides down with simple analogy-based explanation |
| **Tone** | Friendly, conversational, no jargon |
| **Length** | 2-3 sentences maximum |
| **Feedback** | 👍 / 👎 buttons below explanation |
| **Error** | "Sorry, I couldn't generate an explanation. Please try again." |

**Example AI Explanations:**
- **Registration:** "Think of voter registration like getting a library card. Just as a library card lets you borrow books, a Voter ID lets you cast your vote."
- **EVM:** "An EVM is like an ATM for voting. You press a button next to your candidate's name, just like you press buttons on an ATM."
- **VVPAT:** "VVPAT is like a printed receipt. After you vote, it shows you a slip confirming your choice, just like a shopping receipt."

---

## SECTION 6: DESIGN SYSTEM (STRICT)

### 6.1 Color Palette

| Token Name | Hex Value | Usage | Usage Rule |
|------------|-----------|-------|------------|
| **Primary** | `#1D4ED8` | Buttons, links, active states, progress bars, focus rings | 15% of UI surface |
| **Primary Hover** | `#1E40AF` | Button hover states, link hover | Derived from Primary |
| **Primary Light** | `#DBEAFE` | Badges, light backgrounds, hover tints | Derived from Primary |
| **Accent Saffron** | `#F59E0B` | Warnings, celebratory elements, minimal highlights | < 2.5% of UI surface |
| **Accent Green** | `#16A34A` | Success states, completed steps, checkmarks | < 2.5% of UI surface |
| **Background** | `#F8FAFC` | Page backgrounds, sections | 40% of UI surface |
| **Card Background** | `#FFFFFF` | Cards, modals, dropdowns, input backgrounds | 35% of UI surface |
| **Text Primary** | `#0F172A` | Headings, primary text, labels | All main text |
| **Text Secondary** | `#475569` | Body text, descriptions, placeholders | Supporting text |
| **Text Muted** | `#94A3B8` | Disabled text, timestamps, captions | Rare use |
| **Border** | `#E2E8F0` | Dividers, card borders, input borders | Structural elements |
| **Success** | `#22C55E` | Success toasts, confirmation messages | Functional states |
| **Error** | `#EF4444` | Error messages, validation errors | Functional states |
| **Warning** | `#F59E0B` | Warning messages (same as saffron accent) | Functional states |

**Color Usage Rules:**
- 80% of UI must be neutral (Background + Card + Text)
- 15% of UI may use Primary blue
- 5% total for Accent Saffron + Green combined
- NEVER introduce new colors outside this palette
- NEVER use gradients except subtle blue tints on hero backgrounds
- NEVER use Saffron or Green for primary CTAs (reserved for Blue)

### 6.2 Typography

| Element | Font Family | Weight | Size | Line Height | Letter Spacing |
|---------|-------------|--------|------|-------------|----------------|
| **H1 (Hero)** | Poppins | 600 | 36px / 2.25rem | 1.2 | -0.02em |
| **H2 (Section)** | Poppins | 500 | 24px / 1.5rem | 1.3 | -0.01em |
| **H3 (Card Title)** | Poppins | 500 | 20px / 1.25rem | 1.4 | 0 |
| **H4 (Subtitle)** | Poppins | 500 | 18px / 1.125rem | 1.4 | 0 |
| **Body** | Noto Sans | 400 | 16px / 1rem | 1.6 | 0 |
| **Body Small** | Noto Sans | 400 | 14px / 0.875rem | 1.5 | 0 |
| **Caption** | Noto Sans | 400 | 12px / 0.75rem | 1.4 | 0.01em |
| **Button** | Poppins | 500 | 14px / 0.875rem | 1 | 0.02em |
| **Nav Link** | Noto Sans | 500 | 14px / 0.875rem | 1 | 0 |
| **Label** | Noto Sans | 500 | 14px / 0.875rem | 1.4 | 0 |

**Typography Rules:**
- NO other fonts allowed
- Minimum 16px for body text on mobile (accessibility)
- Maintain strict hierarchy: H1 > H2 > H3 > Body > Caption
- Use `font-display: swap` for web font loading
- Maximum 3 font sizes per screen

### 6.3 Spacing System

| Token | Value | Common Usage |
|-------|-------|-------------|
| **space-1** | 4px | Tight gaps, icon padding, inline spacing |
| **space-2** | 8px | Small gaps, compact padding, icon-text gap |
| **space-3** | 16px | Standard padding, card internal padding, form field gap |
| **space-4** | 24px | Section gaps, page horizontal padding, card margin |
| **space-5** | 32px | Large sections, hero padding, modal padding |
| **space-6** | 48px | Major divisions, footer padding, section separators |
| **space-7** | 64px | Page-level spacing, hero sections |

**Spacing Rules:**
- Base grid: 4px (all spacing values are multiples of 4)
- Mobile reduction: Reduce section padding by 25% (32px → 24px)
- NEVER use arbitrary pixel values (e.g., 13px, 27px)
- Consistent vertical rhythm: 24px between sections

### 6.4 Elevation & Shadows

| Token | Value | Usage |
|-------|-------|-------|
| **shadow-sm** | `0 1px 2px rgba(15, 23, 42, 0.05)` | Buttons, inputs |
| **shadow-md** | `0 4px 6px -1px rgba(15, 23, 42, 0.1)` | Cards, dropdowns |
| **shadow-lg** | `0 10px 15px -3px rgba(15, 23, 42, 0.1)` | Modals, overlays |
| **shadow-focus** | `0 0 0 3px rgba(29, 78, 216, 0.3)` | Focus rings |

### 6.5 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| **radius-sm** | 8px | Small buttons, badges, tags |
| **radius-md** | 12px | Cards, modals, primary buttons, inputs |
| **radius-lg** | 16px | Large cards, feature sections |
| **radius-full** | 9999px | Pills, avatars, circular buttons |

**Border Radius Rule:**
- Default card and button radius: **12px** (strict)
- NEVER mix radius values arbitrarily on the same component level

---

## SECTION 7: COMPONENT SYSTEM

### 7.1 Buttons

#### Primary Button
```
┌─────────────────────────────────────────┐
│  Background: #1D4ED8                    │
│  Text: #FFFFFF, Poppins 500, 14px       │
│  Border-radius: 12px                    │
│  Padding: 12px 24px (standard)          │
│  Padding: 16px 32px (large/hero)        │
│  Height: 44px minimum                   │
│  Shadow: shadow-sm                      │
│                                         │
│  Hover:                                 │
│    Background: #1E40AF                  │
│    Shadow: shadow-md                    │
│                                         │
│  Active:                                │
│    Transform: scale(0.98)               │
│                                         │
│  Focus:                                 │
│    Ring: 2px offset, #1D4ED8 @ 50%      │
│                                         │
│  Disabled:                              │
│    Background: #94A3B8                  │
│    Cursor: not-allowed                  │
│    Opacity: 0.6                         │
└─────────────────────────────────────────┘
```

#### Secondary Button
```
┌─────────────────────────────────────────┐
│  Background: #FFFFFF                    │
│  Text: #1D4ED8, Poppins 500, 14px       │
│  Border: 1px solid #1D4ED8              │
│  Border-radius: 12px                    │
│  Padding: 12px 24px                     │
│  Height: 44px minimum                   │
│                                         │
│  Hover:                                 │
│    Background: #DBEAFE                  │
│    Border: 1px solid #1E40AF            │
└─────────────────────────────────────────┘
```

#### Ghost Button
```
┌─────────────────────────────────────────┐
│  Background: transparent                │
│  Text: #475569, Noto Sans 500, 14px     │
│  Border: 1px solid #E2E8F0              │
│  Border-radius: 12px                    │
│  Padding: 12px 24px                     │
│                                         │
│  Hover:                                 │
│    Background: #F8FAFC                  │
│    Border: 1px solid #94A3B8            │
└─────────────────────────────────────────┘
```

#### Icon Button
```
┌─────────────────────────────────────────┐
│  Size: 44px x 44px                      │
│  Background: transparent or #FFFFFF     │
│  Icon: 20px, #0F172A or #475569         │
│  Border-radius: 12px                    │
│                                         │
│  Hover:                                 │
│    Background: #F8FAFC                  │
│    Icon: #1D4ED8                        │
└─────────────────────────────────────────┘
```

### 7.2 Cards

#### Standard Card
```
┌─────────────────────────────────────────┐
│  Background: #FFFFFF                    │
│  Border: 1px solid #E2E8F0             │
│  Border-radius: 12px                    │
│  Padding: 24px                          │
│  Shadow: shadow-md                      │
│                                         │
│  Hover (interactive):                   │
│    Border: 1px solid #1D4ED8           │
│    Shadow: 0 4px 12px rgba(29,78,216,0.15)│
│    Transform: translateY(-2px)          │
│                                         │
│  Transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) │
└─────────────────────────────────────────┘
```

#### Completed Card
```
┌─────────────────────────────────────────┐
│  Background: #F0FDF4                    │
│  Border: 1px solid #16A34A             │
│  Border-radius: 12px                    │
│  Padding: 24px                          │
│  Shadow: shadow-sm                      │
│                                         │
│  Status Badge:                          │
│    Background: #16A34A                  │
│    Text: #FFFFFF                        │
│    Border-radius: 9999px                │
│    Padding: 4px 12px                    │
└─────────────────────────────────────────┘
```

#### Active Card
```
┌─────────────────────────────────────────┐
│  Background: #EFF6FF                    │
│  Border: 2px solid #1D4ED8             │
│  Border-radius: 12px                    │
│  Padding: 24px                          │
│  Shadow: 0 4px 12px rgba(29,78,216,0.2) │
└─────────────────────────────────────────┘
```

### 7.3 Input Fields

#### Text Input
```
┌─────────────────────────────────────────┐
│  Background: #FFFFFF                    │
│  Border: 1px solid #E2E8F0             │
│  Border-radius: 12px                    │
│  Height: 48px                           │
│  Padding: 12px 16px                     │
│  Font: Noto Sans 400, 16px              │
│  Color: #0F172A                         │
│  Placeholder: #94A3B8                   │
│                                         │
│  Focus:                                 │
│    Border: 2px solid #1D4ED8           │
│    Ring: shadow-focus                   │
│                                         │
│  Error:                                 │
│    Border: 2px solid #EF4444           │
│    Background: #FEF2F2                  │
│                                         │
│  Disabled:                              │
│    Background: #F8FAFC                  │
│    Color: #94A3B8                       │
│    Border: 1px solid #E2E8F0           │
└─────────────────────────────────────────┘
```

#### Label
```
┌─────────────────────────────────────────┐
│  Font: Noto Sans 500, 14px              │
│  Color: #475569                         │
│  Margin-bottom: 8px                     │
│                                         │
│  Required indicator:                    │
│    Color: #EF4444                       │
│    Content: " *"                        │
└─────────────────────────────────────────┘
```

### 7.4 Progress Bar

#### Linear Progress Bar
```
┌─────────────────────────────────────────┐
│  Container:                             │
│    Height: 8px                          │
│    Background: #E2E8F0                  │
│    Border-radius: 4px                   │
│    Full width                           │
│                                         │
│  Fill:                                  │
│    Height: 8px                          │
│    Background: #1D4ED8                  │
│    Border-radius: 4px                   │
│    Transition: width 500ms ease         │
│                                         │
│  Label (optional):                      │
│    Text: "60% Complete"                 │
│    Font: Noto Sans 500, 12px            │
│    Color: #475569                       │
│    Position: right of bar               │
└─────────────────────────────────────────┘
```

#### Circular Progress
```
┌─────────────────────────────────────────┐
│  Size: 120px diameter                   │
│  Stroke width: 8px                      │
│  Track color: #E2E8F0                   │
│  Fill color: #1D4ED8                    │
│  Border-radius: full circle             │
│                                         │
│  Center text:                           │
│    Percentage: Poppins 600, 28px        │
│    Label: Noto Sans 400, 12px           │
│    Color: #0F172A                       │
│                                         │
│  Animation: stroke-dashoffset 800ms ease│
└─────────────────────────────────────────┘
```

### 7.5 Step Cards

```
┌─────────────────────────────────────────┐
│  Layout: Horizontal flex row            │
│  Background: #FFFFFF                    │
│  Border: 1px solid #E2E8F0             │
│  Border-radius: 12px                    │
│  Padding: 16px                          │
│  Gap: 16px                              │
│                                         │
│  Left: Status Icon (32px)               │
│    Not started: ○ gray                  │
│    In progress: ◐ blue                  │
│    Completed: ● green                   │
│                                         │
│  Center: Content                        │
│    Title: Poppins 500, 16px             │
│    Description: Noto Sans 400, 14px     │
│                                         │
│  Right: Chevron →                       │
│    Color: #94A3B8                       │
│                                         │
│  Hover:                                 │
│    Border: #1D4ED8                      │
│    Shadow: shadow-md                    │
└─────────────────────────────────────────┘
```

### 7.6 Timeline Component

```
┌─────────────────────────────────────────┐
│  Layout: Vertical, single column        │
│                                         │
│  Timeline Line:                         │
│    Width: 2px                           │
│    Color: #E2E8F0                       │
│    Position: left 24px                  │
│                                         │
│  Node:                                  │
│    Size: 12px circle                    │
│    Completed: #16A34A, filled           │
│    Active: #1D4ED8, filled + pulse      │
│    Upcoming: #E2E8F0, filled           │
│                                         │
│  Content Card:                          │
│    Margin-left: 48px                    │
│    Background: #FFFFFF                  │
│    Border-radius: 12px                  │
│    Padding: 16px                        │
│                                         │
│  Date Badge:                            │
│    Background: #DBEAFE                  │
│    Text: #1D4ED8, 12px, 500             │
│    Border-radius: 9999px                │
│    Padding: 4px 12px                    │
└─────────────────────────────────────────┘
```

### 7.7 Map Container

```
┌─────────────────────────────────────────┐
│  Container:                             │
│    Width: 100%                          │
│    Height: 60vh (mobile)                │
│    Height: 400px (desktop)              │
│    Background: #E2E8F0 (loading)        │
│    Border-radius: 12px                  │
│                                         │
│  Map Controls:                          │
│    Zoom: + / - buttons (bottom-right)   │
│    Recenter: target icon (bottom-right) │
│    Layer toggle: map / satellite        │
│                                         │
│  Marker:                                │
│    Polling station: 📍 #1D4ED8          │
│    User location: ● #1D4ED8 with pulse  │
│                                         │
│  Info Window:                           │
│    Background: #FFFFFF                  │
│    Border-radius: 12px                  │
│    Shadow: shadow-lg                    │
│    Padding: 16px                        │
│    Max-width: 280px                     │
└─────────────────────────────────────────┘
```

---

## SECTION 8: INTERACTIONS

### 8.1 Hover States

| Element | Default | Hover | Active | Disabled |
|---------|---------|-------|--------|----------|
| **Primary Button** | bg #1D4ED8, shadow-sm | bg #1E40AF, shadow-md, translateY(-1px) | scale(0.98) | bg #94A3B8, opacity 0.6 |
| **Secondary Button** | bg #FFF, border #1D4ED8 | bg #DBEAFE, border #1E40AF | scale(0.98) | opacity 0.5 |
| **Card (interactive)** | border #E2E8F0, shadow-md | border #1D4ED8, shadow-lg, translateY(-2px) | scale(0.99) | — |
| **Nav Link** | color #475569 | color #1D4ED8 | color #1E40AF | opacity 0.4 |
| **Icon Button** | bg transparent | bg #F8FAFC, icon #1D4ED8 | bg #E2E8F0 | opacity 0.4 |
| **Text Link** | color #1D4ED8, no underline | color #1E40AF, underline | color #1E40AF | opacity 0.5 |

**Hover Transition:** `all 200ms cubic-bezier(0.4, 0, 0.2, 1)`

### 8.2 Click Behavior

| Element | Click Action | Feedback |
|---------|-------------|----------|
| **Primary CTA** | Navigate to next step / submit form | Scale down 0.98, loading spinner if async |
| **Step Card** | Expand accordion / navigate to detail | Chevron rotates 90°, content slides down |
| **Checkbox** | Toggle checked state | Checkmark animates in (scale 0 → 1) |
| **AI Button** | Request simplified explanation | Button shows spinner, AI card slides down |
| **Timeline Node** | Expand phase details | Card expands, smooth scroll to content |
| **Map Marker** | Open info window | Info window fades in, marker bounces once |
| **Bottom Nav Item** | Navigate to section | Icon color changes to #1D4ED8, label boldens |
| **Language Toggle** | Switch language (EN/HI) | Content cross-fades, flag icon updates |

### 8.3 Loading States

| Context | Visual Treatment | Duration |
|---------|-----------------|----------|
| **Page Load** | Skeleton screens matching card shapes | Until data fetched |
| **Button Action** | Spinner icon replaces text, disabled state | Until API response |
| **AI Response** | Three-dot typing animation in chat bubble | Until response streams |
| **Map Load** | Gray placeholder with pulsing center dot | Until tiles load |
| **Form Submit** | Button loading + field disabled overlay | Until validation complete |
| **Image Load** | Blur hash placeholder → sharp image | Progressive |

**Skeleton Spec:**
- Background: linear-gradient(90deg, #F8FAFC 25%, #E2E8F0 50%, #F8FAFC 75%)
- Animation: shimmer left-to-right, 1.5s infinite
- Border-radius: matches final content (12px for cards)

### 8.4 Empty States

| Context | Message | Visual | CTA |
|---------|---------|--------|-----|
| **No Progress** | "You haven't started your election journey yet." | Empty state illustration | "Start Learning" |
| **No Booth Found** | "We couldn't find a polling station for this PIN code." | Map with search icon | "Try Another PIN" |
| **No Timeline Events** | "No upcoming events for your selected state." | Calendar icon | "View All States" |
| **No Chat History** | "Ask me anything about Indian elections!" | AI assistant icon | "Suggested Questions" |
| **Network Error** | "Something went wrong. Please check your connection." | Warning icon | "Retry" |

**Empty State Spec:**
- Icon: 64px, #94A3B8
- Title: Poppins 500, 18px, #0F172A
- Description: Noto Sans 400, 14px, #475569
- CTA: Secondary button style
- Vertical centering in container

### 8.5 Error States

| Context | Treatment | Recovery |
|---------|-----------|----------|
| **Form Validation** | Red border (#EF4444), error text below field, shake animation | User corrects input |
| **API Failure** | Toast notification (top-center), red left border, auto-dismiss 5s | "Retry" button in toast |
| **Auth Failure** | Inline error below button, "Unable to sign in. Please try again." | Retry sign-in |
| **Location Denied** | Inline message with manual PIN input option | Enter PIN manually |
| **AI Error** | "Sorry, I couldn't answer that. Please try rephrasing." in chat | Retry button |

**Toast Spec:**
- Background: #FFFFFF
- Border-left: 4px solid #EF4444 (error) or #16A34A (success)
- Border-radius: 12px
- Shadow: shadow-lg
- Padding: 16px
- Position: top-center, 16px from top
- Animation: slide down + fade in, 300ms

---

## SECTION 9: ACCESSIBILITY

### 9.1 Semantic Structure

Every page must follow this landmark structure:

```html
<body>
  <a href="#main-content" class="sr-only">Skip to main content</a>

  <header role="banner">
    <nav role="navigation" aria-label="Main navigation">...</nav>
  </header>

  <main id="main-content" role="main">
    <section aria-labelledby="section-heading">...</section>
  </main>

  <footer role="contentinfo">...</footer>
</body>
```

**Heading Hierarchy (Strict):**
- Each page has exactly one `<h1>`
- Section headings use `<h2>`
- Card titles use `<h3>`
- Subtitles use `<h4>` or `<p class="subtitle">`
- NEVER skip levels (e.g., h1 → h3)

### 9.2 Keyboard Navigation

| Key | Action | Target |
|-----|--------|--------|
| `Tab` | Move focus to next interactive element | All buttons, links, inputs, checkboxes |
| `Shift + Tab` | Move focus to previous interactive element | Reverse tab order |
| `Enter` | Activate button or link | Buttons, links, cards |
| `Space` | Toggle checkbox, expand accordion | Checkboxes, step cards |
| `Escape` | Close modal, collapse expanded card, close menu | Modals, cards, dropdowns |
| `Arrow Up/Down` | Navigate list items | Timeline, checklist, dropdown |
| `Home` | Jump to first item in list | Lists, tabs |
| `End` | Jump to last item in list | Lists, tabs |
| `Ctrl + /` | Open AI Assistant | Global shortcut |

**Focus Order:**
1. Skip link
2. Logo / Home link
3. Navigation links (left to right)
4. Main content (headings first, then interactive elements)
5. Footer links

### 9.3 ARIA Labels & Roles

| Element | ARIA Attribute | Value / Purpose |
|---------|---------------|-----------------|
| Progress ring | `role="progressbar"` | Indicates completion percentage |
| Progress ring | `aria-valuenow` | Current step number |
| Progress ring | `aria-valuemin` | 0 |
| Progress ring | `aria-valuemax` | 5 (total steps) |
| Progress ring | `aria-label` | "Election guide progress, 3 of 5 steps completed" |
| Step card | `aria-expanded` | "true" or "false" |
| Step card | `aria-controls` | ID of expandable content |
| Step card | `role="button"` | If entire card is clickable |
| Mode toggle | `role="switch"` | Indicates toggle behavior |
| Mode toggle | `aria-checked` | "true" for Advanced, "false" for Beginner |
| Chat messages | `aria-live="polite"` | Announces new assistant messages |
| Toast notification | `role="alert"` | Announces errors immediately |
| Toast notification | `aria-live="assertive"` | Interrupts for critical errors |
| Loading spinner | `role="status"` | Indicates loading state |
| Loading spinner | `aria-label` | "Loading content, please wait" |
| Map container | `role="application"` | Indicates interactive widget |
| Map container | `aria-label` | "Map showing polling stations near you" |
| Search input | `role="searchbox"` | Indicates search functionality |
| Bottom nav | `role="navigation"` | Indicates navigation region |
| Bottom nav | `aria-label="Mobile navigation"` | Distinguishes from header nav |

### 9.4 Color Contrast Compliance

All color combinations must meet WCAG 2.1 Level AA (4.5:1 for normal text, 3:1 for large text).

| Combination | Foreground | Background | Ratio | Pass |
|-------------|-----------|------------|-------|------|
| Primary text | #0F172A | #FFFFFF | 12.6:1 | ✅ |
| Primary text | #0F172A | #F8FAFC | 11.8:1 | ✅ |
| Secondary text | #475569 | #FFFFFF | 7.5:1 | ✅ |
| Primary button text | #FFFFFF | #1D4ED8 | 5.9:1 | ✅ |
| Primary button hover | #FFFFFF | #1E40AF | 7.2:1 | ✅ |
| Success text | #FFFFFF | #16A34A | 4.5:1 | ✅ |
| Error text | #FFFFFF | #EF4444 | 4.6:1 | ✅ |
| Placeholder | #94A3B8 | #FFFFFF | 2.8:1 | ⚠️ Use only for placeholders |
| Saffron on white | #F59E0B | #FFFFFF | 2.1:1 | ❌ Never use for text |
| Saffron on dark | #F59E0B | #0F172A | 5.4:1 | ✅ |

**Contrast Rule:**
- Saffron (#F59E0B) must NEVER be used as text color on white backgrounds
- Saffron is reserved for icons, borders, and dark-background badges only

### 9.5 Screen Reader Support

| Content Type | Treatment |
|-------------|-----------|
| **Images** | Descriptive `alt` text (max 150 chars). Decorative images: `alt=""` |
| **Icons** | `aria-label` describing action (e.g., `aria-label="Mark as complete"`) |
| **Charts/Progress** | Text alternative describing value (e.g., "60 percent complete") |
| **Dynamic Updates** | `aria-live` regions for chat messages, progress updates, toasts |
| **Form Errors** | `aria-describedby` linking input to error message |
| **Required Fields** | `aria-required="true"` + visual asterisk |
| **Loading Content** | `aria-busy="true"` on container until content loads |
| **Modal Dialogs** | `aria-modal="true"`, focus trap, focus restoration on close |

### 9.6 Motion & Animation

| Animation | Default | Reduced Motion (`prefers-reduced-motion`) |
|-----------|---------|------------------------------------------|
| Page transitions | Fade + slide, 300ms | Instant (opacity only) |
| Card hover lift | translateY(-2px), 200ms | No transform, border color change only |
| Progress bar fill | width transition, 500ms | Instant |
| Confetti celebration | Particle physics, 2s | Static "Completed" badge appears |
| Chat message enter | Slide up + fade, 200ms | Instant |
| Map marker bounce | CSS bounce, 500ms | No animation |
| Button press | scale(0.98), 100ms | No transform |
| Toast enter | Slide down + fade, 300ms | Instant |
| Skeleton shimmer | Gradient translate, 1.5s | Static gray background |

**Reduced Motion Implementation:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 9.7 Touch & Mobile Accessibility

| Requirement | Implementation |
|-------------|---------------|
| **Touch targets** | Minimum 44px x 44px for all interactive elements |
| **Spacing** | 8px minimum between adjacent touch targets |
| **Zoom** | Support up to 200% zoom without horizontal scroll |
| **Orientation** | Support both portrait and landscape |
| **Text sizing** | Respect system font size settings (use rem units) |
| **Haptic feedback** | Light vibration on step completion (optional, respect system settings) |

---

## SECTION 10: FINAL NOTES

### 10.1 Design Principles

1. **Clarity Over Decoration**
   - Every element must serve a functional purpose
   - No decorative illustrations that don't aid understanding
   - No drop shadows used purely for aesthetic — only for hierarchy

2. **Progressive Disclosure**
   - Show only what the user needs at each moment
   - Advanced details hidden behind "Learn More" or mode toggle
   - AI explanation available but not intrusive

3. **Trust Through Transparency**
   - Always cite official sources (Election Commission of India)
   - Display "Last updated" timestamps on procedural content
   - Clear disclaimer: "Not an official government website"

4. **Cultural Sensitivity**
   - Use saffron and green sparingly and respectfully
   - Avoid political symbols, party colors, or partisan language
   - Maintain strict neutrality in all content

5. **Performance is Design**
   - Loading states are part of the experience
   - Empty states guide users forward
   - Error states provide clear recovery paths

### 10.2 Content Guidelines

| Principle | Rule |
|-----------|------|
| **Tone** | Helpful, encouraging, authoritative but not bureaucratic |
| **Language** | Simple English / Standard Hindi. Flesch Reading Ease: 60+ |
| **Jargon** | Explain all acronyms on first use (EPIC, EVM, VVPAT, NVSP) |
| **Urgency** | No fear-based messaging. Use empowering language. |
| **Length** | Step content: max 150 words. AI explanation: max 50 words. |
| **CTAs** | Action-oriented, specific ("Check Eligibility" not "Click Here") |

### 10.3 Responsive Breakpoints

| Name | Width | Layout Changes |
|------|-------|---------------|
| **Mobile** | < 640px | Single column, bottom nav, full-width cards, stacked CTAs |
| **Tablet** | 640px – 1024px | 2-column grids, side nav optional, larger touch targets |
| **Desktop** | > 1024px | Max-width container (1200px), sidebar nav, 3-column grids |

### 10.4 Quality Checklist

Before any screen is marked complete, verify:

- [ ] All colors are from the approved palette (Section 6.1)
- [ ] Only Poppins and Noto Sans are used (Section 6.2)
- [ ] Spacing follows the 4px grid system (Section 6.3)
- [ ] All interactive elements have hover, active, and focus states (Section 8)
- [ ] All images have alt text (Section 9.5)
- [ ] Keyboard navigation works for all features (Section 9.2)
- [ ] Color contrast passes WCAG AA everywhere (Section 9.4)
- [ ] Mobile touch targets are ≥ 44px (Section 9.7)
- [ ] Loading, empty, and error states are designed (Section 8.3–8.5)
- [ ] Content follows tone and length guidelines (Section 10.2)

### 10.5 File Delivery Standards

When handing off to engineering:
- All wireframes exported at 1x and 2x
- Color tokens provided as hex values
- Typography specs include font, weight, size, line-height
- Spacing annotated with redlines
- Interaction specs include timing and easing curves
- Accessibility notes included per component

---

**Document End**

*Sajag Design Specification v1.0*  
*For engineering handoff and implementation reference*  
*Questions: Contact Product Design Team*
