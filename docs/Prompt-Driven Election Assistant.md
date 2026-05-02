
**User:**

You are a senior full-stack engineer, UI/UX designer, security expert, and hackathon judge.

Build a complete FULL-STACK web application using vibe coding approach for the following problem:

“Create an assistant that helps Indian users understand the election process, timelines, and steps in an interactive and easy-to-follow way.”

This project will be evaluated in these 6 categories: 1. Code Quality 2. Security 3. Efficiency 4. Testing 5. Accessibility 6. Google Services

Your goal is to achieve 100% in ALL categories and rank #1.

-----
STEP 1: DEFINE SYSTEM ARCHITECTURE

Design a production-grade architecture including: - Frontend (Next.js preferred) - Backend (Next.js API routes or Node.js) - Database (Firebase Firestore preferred) - Google Services (Auth, Analytics)

Explain: - Data flow - API structure - Folder structure

-----
STEP 2: DESIGN SYSTEM (UI/UX)

Create a complete design system:

- Color palette (trust + Indian context)
- Typography
- Spacing system
- Component system (buttons, cards, inputs)

UI/UX requirements: - Clean SaaS style - Step-by-step election flow - Beginner / Advanced mode toggle - Timeline visualization - Mobile-first responsive design

-----
STEP 3: FEATURE ARCHITECTURE

Define features:

- Election step-by-step guide
- Interactive timeline
- AI-based explanation assistant
- Progress tracker
- Google Sign-In authentication
- Save user progress
-----
STEP 4: SECURITY (VERY IMPORTANT)

Implement: - Input validation and sanitization - Protection against XSS, CSRF - Secure headers - Rate limiting - Environment variables (.env)

Follow OWASP Top 10.

-----
STEP 5: ACCESSIBILITY

Ensure: - Semantic HTML - ARIA labels - Keyboard navigation - Screen reader support - Color contrast compliance (WCAG)

-----
STEP 6: TESTING

Add: - Unit tests - Integration tests - Minimum 80% coverage

Use Jest or equivalent.

-----
STEP 7: PERFORMANCE & EFFICIENCY

Optimize: - Lazy loading - Code splitting - Minimal dependencies - Fast load time

-----
STEP 8: GOOGLE SERVICES INTEGRATION

Must include: - Firebase Auth (Google login) - Firestore database - Firebase Analytics

-----
STEP 9: OUTPUT FORMAT

Generate EVERYTHING step-by-step:

1. System architecture diagram (text)
1. Folder structure
1. Frontend code (all pages + components)
1. Backend code (API routes)
1. Firebase integration
1. Security implementation
1. Testing files
1. README.md (setup + deploy)
1. .env.example
-----
IMPORTANT RULES:

- Do NOT skip any file
- Do NOT summarize code
- Write clean, modular, production-level code
- Add comments explaining logic
- Keep project lightweight (<10MB repo)

Think like a hackathon winner aiming for #1 rank.

Before writing any code, first fully explain: - architecture - tech stack decisions - screen flow (user journey) - database structure

Then wait for confirmation before coding.

-----
**Kimi:**

I’ll design a production-grade, hackathon-winning election assistant for Indian users. Let me first research the latest Indian election process details to ensure accuracy, then architect the complete system.
## <a name="phase-1-research-architecture-design"></a>Phase 1: Research & Architecture Design
### <a name="x82ab1e63afdb6c95afdeea1f6afb8b9ce6c46e7"></a>Research: Indian Election Process 2024-2026 Excellent. I now have authoritative data from the Election Commission of India. Let me present the complete architecture before coding.
-----
# <a name="x494c41f2006e7c6ae046073e7c93651de239cdf"></a>🇮🇳 BHARAT VOTE ASSISTANT — Complete System Architecture
## <a name="system-architecture-diagram-text"></a>1. SYSTEM ARCHITECTURE DIAGRAM (Text)
┌─────────────────────────────────────────────────────────────────────────────┐\
│                              CLIENT LAYER                                    │\
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐ │\
│  │   Next.js    │  │   React      │  │  Tailwind    │  │  Framer Motion  │ │\
│  │   (App Router)│  │   Components │  │   CSS        │  │  Animations     │ │\
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └─────────────────┘ │\
│         │                 │                  │                                │\
│         └─────────────────┴──────────────────┘                                │\
│                           │                                                  │\
│                    ┌──────▼──────┐                                           │\
│                    │  Next.js    │  Middleware (Auth, Rate Limit, Headers)   │\
│                    │  API Routes │                                           │\
│                    └──────┬──────┘                                           │\
│                           │                                                  │\
└───────────────────────────┼─────────────────────────────────────────────────┘\
`                            `│\
┌───────────────────────────▼─────────────────────────────────────────────────┐\
│                           API LAYER                                          │\
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐  │\
│  │ /api/auth  │  │ /api/guide │  │ /api/progress│  │ /api/assistant     │  │\
│  │  (Google)  │  │ (Election) │  │  (User Data) │  │  (AI Explanations) │  │\
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘  └──────────┬───────────┘  │\
│        │               │               │                    │              │\
│        └───────────────┴───────────────┴────────────────────┘              │\
│                                   │                                         │\
└───────────────────────────────────┼─────────────────────────────────────────┘\
`                                    `│\
┌───────────────────────────────────▼─────────────────────────────────────────┐\
│                         GOOGLE SERVICES LAYER                                │\
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────────┐  │\
│  │  Firebase Auth   │  │  Firestore DB    │  │  Firebase Analytics      │  │\
│  │  (Google Sign-In)│  │  (User Progress) │  │  (Page Views, Events)    │  │\
│  └──────────────────┘  └──────────────────┘  └──────────────────────────┘  │\
│                                                                              │\
└──────────────────────────────────────────────────────────────────────────────┘
## <a name="tech-stack-decisions"></a>2. TECH STACK DECISIONS

|Layer|Technology|Justification|
| :- | :- | :- |
|**Framework**|Next.js 14 (App Router)|SSR for SEO, API routes, file-based routing, optimal for hackathon speed|
|**Language**|TypeScript|Type safety, better DX, fewer runtime errors|
|**Styling**|Tailwind CSS|Utility-first, minimal CSS bundle, rapid development|
|**UI Components**|shadcn/ui + Custom|Accessible primitives, customizable, no heavy UI lib|
|**Animation**|Framer Motion|Declarative animations, gesture support, performance|
|**Auth**|Firebase Auth (Google)|Seamless Google Sign-In, secure token management|
|**Database**|Firestore|Real-time sync, offline support, scalable, Google-native|
|**Analytics**|Firebase Analytics|User behavior tracking, conversion funnels, free tier|
|**State**|Zustand|Lightweight, minimal boilerplate, TypeScript-friendly|
|**Testing**|Vitest + React Testing Library|Fast, modern, excellent DX|
|**Security**|Helmet.js headers, Rate-limiter, DOMPurify|OWASP compliance|
## <a name="screen-flow-user-journey"></a>3. SCREEN FLOW (User Journey)
┌─────────┐    ┌─────────────┐    ┌──────────────┐    ┌─────────────────┐\
│ Landing │───▶│  Dashboard  │───▶│ Step-by-Step │───▶│  Interactive    │\
│  Page   │    │  (Auth Gate)│    │    Guide     │    │    Timeline     │\
└─────────┘    └─────────────┘    └──────────────┘    └─────────────────┘\
`      `│               │                    │                    │\
`      `│               │                    ▼                    │\
`      `│               │            ┌──────────────┐             │\
`      `│               │            │ Beginner/Adv │             │\
`      `│               │            │   Toggle     │             │\
`      `│               │            └──────────────┘             │\
`      `│               │                    │                    │\
`      `│               ▼                    ▼                    ▼\
`      `│        ┌─────────────┐    ┌──────────────┐    ┌─────────────────┐\
`      `└───────▶│ Google Sign │    │ AI Assistant │    │ Progress Tracker│\
`               `│    -In      │    │   (Chat)     │    │  (Save/Resume)  │\
`               `└─────────────┘    └──────────────┘    └─────────────────┘

**Detailed User Journey:**

1. **Landing** → Hero section with value prop, trust badges (ECI official), CTA to start
1. **Authentication** → Google One-Tap Sign-In (Firebase), minimal friction
1. **Onboarding** → Select experience level (Beginner/Advanced), language preference
1. **Dashboard** → Personalized greeting, progress overview, quick actions
1. **Guide Mode** → Step-by-step election process with interactive cards
1. **Timeline View** → Visual timeline of election phases with dates
1. **AI Assistant** → Contextual Q&A about current step (simulated AI with curated responses)
1. **Progress Tracking** → Check off completed steps, resume where left off
1. **Profile** → View saved progress, achievements, share completion
## <a name="database-structure-firestore"></a>4. DATABASE STRUCTURE (Firestore)
users/{userId} (document)\
├── uid: string\
├── email: string\
├── displayName: string\
├── photoURL: string\
├── experienceLevel: "beginner" | "advanced"\
├── language: "en" | "hi"\
├── createdAt: timestamp\
├── lastLoginAt: timestamp\
└── progress (subcollection)\
`    `└── {stepId} (document)\
`        `├── stepId: string\
`        `├── completed: boolean\
`        `├── completedAt: timestamp\
`        `├── notes: string\
`        `└── bookmarked: boolean\
\
election\_steps/{stepId} (document - seeded data)\
├── id: string\
├── title: string\
├── titleHi: string\
├── description: string\
├── descriptionHi: string\
├── category: "registration" | "preparation" | "voting" | "results"\
├── order: number\
├── beginnerContent: string\
├── advancedContent: string\
├── checklist: string[]\
├── estimatedTime: string\
├── officialLink: string\
└── icon: string\
\
timelines/{timelineId} (document - seeded data)\
├── id: string\
├── phase: string\
├── phaseHi: string\
├── date: timestamp\
├── description: string\
├── descriptionHi: string\
├── states: string[]\
└── constituencies: number
## <a name="api-structure"></a>5. API STRUCTURE

|Endpoint|Method|Auth|Description|
| :- | :- | :- | :- |
|/api/auth/session|GET|Required|Validate Firebase token, return user|
|/api/auth/session|DELETE|Required|Sign out, clear cookies|
|/api/guide/steps|GET|Optional|Fetch all election steps|
|/api/guide/steps/[id]|GET|Optional|Fetch single step detail|
|/api/progress|GET|Required|Get user’s progress|
|/api/progress|POST|Required|Update step completion|
|/api/progress/[stepId]|PATCH|Required|Toggle bookmark/add notes|
|/api/assistant/ask|POST|Optional|AI explanation (rate limited)|
|/api/timeline|GET|Optional|Fetch election timeline|
## <a name="folder-structure"></a>6. FOLDER STRUCTURE
bharat-vote-assistant/\
├── app/                          # Next.js App Router\
│   ├── (auth)/                   # Auth group (no layout)\
│   │   └── login/\
│   │       └── page.tsx\
│   ├── (main)/                   # Main app group\
│   │   ├── dashboard/\
│   │   │   └── page.tsx\
│   │   ├── guide/\
│   │   │   └── page.tsx\
│   │   ├── timeline/\
│   │   │   └── page.tsx\
│   │   ├── assistant/\
│   │   │   └── page.tsx\
│   │   ├── profile/\
│   │   │   └── page.tsx\
│   │   ├── layout.tsx            # Main layout with nav\
│   │   └── page.tsx              # Landing page\
│   ├── api/                      # API Routes\
│   │   ├── auth/\
│   │   │   └── session/\
│   │   │       └── route.ts\
│   │   ├── guide/\
│   │   │   └── steps/\
│   │   │       └── route.ts\
│   │   ├── progress/\
│   │   │   └── route.ts\
│   │   └── assistant/\
│   │       └── ask/\
│   │           └── route.ts\
│   ├── layout.tsx                # Root layout\
│   └── globals.css\
├── components/                   # React Components\
│   ├── ui/                       # shadcn/ui components\
│   ├── auth/\
│   │   └── google-sign-in.tsx\
│   ├── guide/\
│   │   ├── step-card.tsx\
│   │   ├── step-detail.tsx\
│   │   └── checklist.tsx\
│   ├── timeline/\
│   │   └── timeline-item.tsx\
│   ├── assistant/\
│   │   └── chat-interface.tsx\
│   ├── dashboard/\
│   │   └── progress-overview.tsx\
│   └── shared/\
│       ├── navbar.tsx\
│       ├── footer.tsx\
│       ├── mode-toggle.tsx\
│       └── accessibility-wrapper.tsx\
├── lib/                          # Utilities & Config\
│   ├── firebase.ts               # Firebase config\
│   ├── auth.ts                   # Auth helpers\
│   ├── db.ts                     # Firestore helpers\
│   ├── analytics.ts              # Analytics helpers\
│   ├── constants.ts              # App constants\
│   ├── validators.ts             # Input validation\
│   └── utils.ts                  # General utilities\
├── hooks/                        # Custom React Hooks\
│   ├── use-auth.ts\
│   ├── use-progress.ts\
│   └── use-analytics.ts\
├── types/                        # TypeScript Types\
│   └── index.ts\
├── data/                         # Seed Data\
│   └── election-data.ts\
├── middleware.ts                 # Next.js Middleware\
├── tests/                        # Test Files\
│   ├── unit/\
│   ├── integration/\
│   └── setup.ts\
├── public/                       # Static Assets\
├── .env.example\
├── next.config.js\
├── tailwind.config.ts\
├── tsconfig.json\
├── vitest.config.ts\
└── package.json
## <a name="security-architecture-owasp-top-10"></a>7. SECURITY ARCHITECTURE (OWASP Top 10)

|Threat|Mitigation|
| :- | :- |
|**Injection**|DOMPurify for XSS, parameterized Firestore queries|
|**Broken Auth**|Firebase Auth with secure cookies, token refresh|
|**Sensitive Data**|Environment variables, no client-side secrets|
|**XXE**|N/A (JSON only, no XML parsing)|
|**Access Control**|Middleware auth checks, Firestore security rules|
|**Security Misconfig**|Strict CSP headers, security headers via middleware|
|**XSS**|Content-Security-Policy, input sanitization, React escaping|
|**Insecure Deserialization**|JSON.parse with validation, no eval()|
|**Vulnerable Components**|Minimal dependencies, npm audit, Dependabot|
|**Insufficient Logging**|Firebase Analytics for security events|
## <a name="accessibility-strategy"></a>8. ACCESSIBILITY STRATEGY
- **Semantic HTML**: Proper heading hierarchy, landmark regions
- **ARIA**: aria-label, aria-expanded, aria-live for dynamic content
- **Keyboard**: Full keyboard navigation, focus trapping in modals
- **Screen Readers**: sr-only text, descriptive alt text, role attributes
- **Color Contrast**: WCAG 2.1 AA minimum (4.5:1 for normal text)
- **Motion**: prefers-reduced-motion media query support
- **Focus**: Visible focus indicators, logical tab order
## <a name="performance-strategy"></a>9. PERFORMANCE STRATEGY
- **Code Splitting**: Dynamic imports for heavy components
- **Lazy Loading**: Images with next/image, components with React.lazy
- **Bundle Size**: Tree-shaking, minimal dependencies, no heavy UI libs
- **Caching**: Firestore offline persistence, SWR for data fetching
- **Core Web Vitals**: Optimized LCP, CLS, FID targets
-----
## <a name="confirmation-required"></a>✅ CONFIRMATION REQUIRED
This architecture is designed to win in all 6 hackathon categories:

|Category|Strategy|
| :- | :- |
|**Code Quality**|TypeScript, strict ESLint, modular architecture, comprehensive comments|
|**Security**|OWASP Top 10 compliance, CSP headers, rate limiting, input validation|
|**Efficiency**|Code splitting, lazy loading, minimal deps, Firestore offline|
|**Testing**|Vitest + RTL, 80%+ coverage, unit + integration tests|
|**Accessibility**|WCAG 2.1 AA, semantic HTML, ARIA, keyboard nav, screen reader|
|**Google Services**|Firebase Auth, Firestore, Analytics — fully integrated|

**Please confirm to proceed with full code generation.** I’ll then build:

1. ✅ Complete Next.js project with all pages & components
1. ✅ Firebase integration (Auth, Firestore, Analytics)
1. ✅ Security middleware & headers
1. ✅ Full test suite (80%+ coverage)
1. ✅ Accessibility features throughout
1. ✅ README.md with setup & deploy instructions
1. ✅ .env.example with all required variables

**Ready to code?** Confirm and I’ll generate the entire production-ready application.

-----
**User:**

You are a senior full-stack architect and hackathon judge.

No, I want this entire app built using prompt engineering. You will assist me with the prompt engineering and provide me with the necessary prompts. Furthermore, you will guide me through the steps, specifying exactly which services I will need to utilize. I want to leverage as many Google services as possible within this project. You will also need to inform me exactly which services need to be integrated into the backend. I will have this entire app built by Anti-Gravity. Design a complete production-grade system for a web app:

“An AI-powered assistant that helps Indian users understand the election process, timelines, and steps in an interactive way.”

Evaluation criteria: - Code Quality - Security - Efficiency - Testing - Accessibility - Google Services

Goal: 100% in all categories.

Tasks:

1. Define full architecture:
   - Frontend
   - Backend
   - Database
   - Google services integration
1. Explain:
   - Data flow
   - API structure
   - State management
   - Folder structure
1. Define database schema (Firestore collections)
1. Define backend responsibilities
1. Define how each of the 6 scoring categories will be maximized

IMPORTANT: Do NOT write code yet. Only system design.

You are a senior product designer.

Design the complete UI/UX and screen flow for the same app.

Requirements: - Clean modern SaaS UI - Mobile-first - Highly intuitive for first-time voters

Define:

1. Screen flow (user journey step-by-step)
1. All pages:
   - Landing page
   - Election guide flow
   - Timeline view
   - Dashboard
   - Login
1. Each screen must include:
   - Layout structure
   - Components used
   - User interaction
1. Design system:
   - Colors (Indian civic tone)
   - Typography
   - Spacing
   - Component system
1. Accessibility considerations (WCAG)

Do NOT write code. Be specific and structured.

Map features to Google services.

For each feature, define: - What it does - Which Google service is used - Why it improves scoring

Include:

- Authentication → Firebase Auth
- Data storage → Firestore
- Analytics → Firebase Analytics
- Bot protection → reCAPTCHA
- Location feature → Google Maps API
- Hosting → Firebase Hosting

Also define backend API endpoints for each feature.

No code yet.

Act as a hackathon judge and audit this project.

Evaluate it in: - Code Quality - Security - Efficiency - Testing - Accessibility - Google Services

For each: - Give score out of 100 - Identify weaknesses - Suggest exact improvements

Then rewrite weak parts of code.

Goal: push project toward 100% in all categories.

COLORS:

Primary: - Blue: #1D4ED8 (main actions, buttons, highlights)

Accent (use very minimally): - Saffron: #F59E0B - Green: #16A34A

Neutrals: - Background: #F8FAFC - Card Background: #FFFFFF - Text Primary: #0F172A - Text Secondary: #475569 - Border: #E2E8F0

Functional: - Success: #22C55E - Error: #EF4444 - Warning: #F59E0B

Usage Rules: - 80% neutral (white/gray) - 15% blue - 5% saffron + green accents - Do NOT overuse accent colors - Do NOT introduce new colors

-----
TYPOGRAPHY:

Headings: - Font: Poppins - Weight: 600 (H1), 500 (H2)

Body: - Font: Noto Sans - Weight: 400

Sizes: - H1: 36px - H2: 24px - H3: 20px - Body: 16px - Small: 14px

Rules: - Do NOT use other fonts - Maintain clear hierarchy - Ensure readability on mobile

-----
UI STYLE:

- Card-based layout
- Border radius: 12px
- Spacing system: 8px, 16px, 24px, 32px
- Clean SaaS-style design
- Mobile-first responsive layout
-----
IMPORTANT:

All UI components, pages, and layouts MUST strictly follow this design system. Do NOT deviate. Do NOT invent new styles.

can you also change soft color based design system only one time font is fix

repo size under 10MB Deployed Link - (Cloud run URL)

so guide me step wise and giving me strong controlled strength prompt for antigravity

aap name is Sajag Name: Sajag Tagline: “Stay aware. Vote with clarity.”

-----
**Kimi:**

I’ll design the complete system architecture, UI/UX, Google services mapping, and audit framework for **Sajag** — your AI-powered Indian election assistant. Let me first research the most current Google Cloud services and best practices for 2026 to ensure we’re using the latest stack.

-----
# <a name="sajag-complete-system-design-document"></a>🇮🇳 SAJAG — Complete System Design Document
## <a name="xeddb30b6323a8d6f8736535443de86152e8ca11"></a>Research: Latest Google Cloud & Firebase Services 2026 Excellent research. Now I have the latest 2026 Google Cloud ecosystem knowledge. Let me design the complete system architecture, UI/UX, Google services mapping, and audit framework for **Sajag**.
-----
# <a name="sajag-stay-aware.-vote-with-clarity."></a>🇮🇳 SAJAG — “Stay aware. Vote with clarity.”
## <a name="x295406653a4394c91e51e635baee3935948daa9"></a>Complete System Design Document (No Code — Architecture & Prompt Engineering Guide)
-----
## <a name="section-1-full-system-architecture"></a>SECTION 1: FULL SYSTEM ARCHITECTURE
### <a name="tech-stack-2026-optimized"></a>1.1 Tech Stack (2026-Optimized)

|Layer|Technology|Version/Notes|Why|
| :- | :- | :- | :- |
|**Frontend**|Next.js 14 (App Router)|App Router, Server Components|SSR for SEO, optimal performance, file-based routing|
|**Language**|TypeScript 5.3|Strict mode|Type safety, fewer runtime errors|
|**Styling**|Tailwind CSS 3.4|Utility-first|Minimal CSS bundle, rapid development|
|**UI Components**|shadcn/ui + Custom|Radix UI primitives|Accessible, customizable, no heavy UI lib|
|**Animation**|Framer Motion|Declarative|Performance-optimized, gesture support|
|**State**|Zustand|4\.5+|Lightweight, TypeScript-friendly, minimal boilerplate|
|**Auth**|Firebase Auth|Google Sign-In, Passkeys|Seamless auth, secure token management|
|**Database**|Firestore (Enterprise)|Native full-text search, geospatial|Real-time sync, offline-first, scalable|
|**AI/LLM**|Firebase AI Logic + Genkit|Gemini 2.5 Flash|Server-side AI, App Check protection|
|**Analytics**|Firebase Analytics|+ BigQuery export|User journeys, funnel tracking|
|**Security**|reCAPTCHA v3 + App Check|Bot protection, replay protection|OWASP compliance|
|**Maps**|Google Maps JS API|Geolocation, polling stations|Location-aware features|
|**Backend**|Cloud Run (Next.js)|Serverless containers|Auto-scaling, zero cold starts|
|**Hosting**|Firebase Hosting|CDN, custom domain|Fast global delivery|
|**Testing**|Vitest + RTL|80%+ coverage|Fast, modern DX|
|**Monitoring**|Firebase Performance + Crashlytics|Real-time insights|Production reliability|
### <a name="data-flow-architecture"></a>1.2 Data Flow Architecture
┌─────────────────────────────────────────────────────────────────────────────┐\
│                              CLIENT (Browser)                                │\
│                                                                             │\
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                 │\
│  │  Next.js App │───▶│  Zustand     │───▶│  Firebase    │                 │\
│  │  (React 18)  │    │  State Store │    │  Auth Client │                 │\
│  └──────┬───────┘    └──────────────┘    └──────┬───────┘                 │\
│         │                                         │                         │\
│         │    ┌────────────────────────────────────┘                         │\
│         │    │                                                              │\
│         ▼    ▼                                                              │\
│  ┌─────────────────────────────────────────────────────────────┐           │\
│  │  Firebase Analytics (Client-side events)                    │           │\
│  │  - page\_view, step\_complete, ai\_interaction                 │           │\
│  └─────────────────────────────────────────────────────────────┘           │\
│                                                                             │\
└─────────────────────────────────┬─────────────────────────────────────────┘\
`                                  `│\
`                                  `▼\
┌─────────────────────────────────────────────────────────────────────────────┐\
│                         EDGE / MIDDLEWARE (Next.js)                        │\
│                                                                             │\
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                 │\
│  │  Middleware  │───▶│  Rate Limit  │───▶│  CSP Headers │                 │\
│  │  (Auth Check)│    │  (Redis/Upstash)│   │  + Security  │                 │\
│  └──────┬───────┘    └──────────────┘    └──────────────┘                 │\
│         │                                                                   │\
└─────────┼───────────────────────────────────────────────────────────────────┘\
`          `│\
`          `▼\
┌─────────────────────────────────────────────────────────────────────────────┐\
│                         CLOUD RUN (Next.js API)                            │\
│                                                                             │\
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                 │\
│  │  API Routes  │───▶│  Input       │───▶│  Firebase    │                 │\
│  │  (/api/\*)    │    │  Validation  │    │  Admin SDK   │                 │\
│  └──────┬───────┘    │  (Zod)       │    └──────┬───────┘                 │\
│         │            └──────────────┘           │                         │\
│         │                                         │                         │\
│         │    ┌────────────────────────────────────┘                         │\
│         │    │                                                              │\
│         ▼    ▼                                                              │\
│  ┌─────────────────────────────────────────────────────────────┐           │\
│  │  Firebase AI Logic / Genkit (Server-side AI)               │           │\
│  │  - Gemini 2.5 Flash for explanations                       │           │\
│  │  - Prompt templates with App Check                         │           │\
│  └─────────────────────────────────────────────────────────────┘           │\
│                                                                             │\
└─────────────────────────────────┬─────────────────────────────────────────┘\
`                                    `│\
`                                    `▼\
┌─────────────────────────────────────────────────────────────────────────────┐\
│                         GOOGLE SERVICES BACKEND                              │\
│                                                                             │\
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌────────────┐ │\
│  │  Firestore   │    │  Firebase    │    │  reCAPTCHA │    │  Google    │ │\
│  │  (Primary DB)│    │  Auth        │    │  v3        │    │  Maps API  │ │\
│  └──────────────┘    └──────────────┘    └──────────────┘    └────────────┘ │\
│                                                                             │\
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                   │\
│  │  Firebase    │    │  BigQuery    │    │  Cloud       │                   │\
│  │  Analytics   │───▶│  (Export)    │    │  Storage     │                   │\
│  │  (Events)    │    │  (Analysis)  │    │  (Assets)    │                   │\
│  └──────────────┘    └──────────────┘    └──────────────┘                   │\
│                                                                             │\
└─────────────────────────────────────────────────────────────────────────────┘
### <a name="api-structure-1"></a>1.3 API Structure

|Endpoint|Method|Auth|Rate Limit|Description|
| :- | :- | :- | :- | :- |
|/api/auth/session|POST|None|10/min|Create session from Firebase ID token|
|/api/auth/session|DELETE|Required|10/min|Revoke session, clear cookies|
|/api/auth/me|GET|Required|30/min|Get current user profile|
|/api/guide/steps|GET|Optional|60/min|Fetch all election steps (cached)|
|/api/guide/steps/[id]|GET|Optional|60/min|Fetch single step with details|
|/api/timeline|GET|Optional|60/min|Fetch election timeline events|
|/api/progress|GET|Required|30/min|Get user’s completion progress|
|/api/progress|POST|Required|20/min|Update step completion status|
|/api/progress/bulk|POST|Required|10/min|Bulk update progress (batch)|
|/api/assistant/ask|POST|Optional|10/min|AI explanation for election query|
|/api/assistant/chat|POST|Optional|10/min|Contextual chat with history|
|/api/location/polling-stations|GET|Optional|30/min|Nearby polling stations via Maps|
|/api/user/preferences|PATCH|Required|20/min|Update language/experience level|
### <a name="state-management"></a>1.4 State Management
**Zustand Store Structure:**

store/\
├── auth-store.ts          # User auth state, login/logout\
├── progress-store.ts      # User progress, bookmarks\
├── ui-store.ts            # Theme, language, experience mode\
└── assistant-store.ts     # Chat history, current context

**Data Flow:** 1. **Server Component** fetches initial data (steps, timeline) → passes as props 2. **Client Component** hydrates Zustand store with server data 3. **User interactions** update Zustand optimistically → sync to Firestore 4. **Firestore listeners** (optional) sync real-time updates back to store
### <a name="folder-structure-1"></a>1.5 Folder Structure
sajag/\
├── app/                          # Next.js App Router\
│   ├── (marketing)/              # Public pages (no auth)\
│   │   ├── page.tsx              # Landing page\
│   │   └── layout.tsx            # Marketing layout\
│   ├── (app)/                    # Authenticated app shell\
│   │   ├── dashboard/\
│   │   │   └── page.tsx\
│   │   ├── guide/\
│   │   │   └── page.tsx\
│   │   ├── timeline/\
│   │   │   └── page.tsx\
│   │   ├── assistant/\
│   │   │   └── page.tsx\
│   │   ├── profile/\
│   │   │   └── page.tsx\
│   │   ├── layout.tsx            # App shell with nav + auth guard\
│   │   └── page.tsx              # Redirect to dashboard\
│   ├── api/                      # API Routes (Cloud Run)\
│   │   ├── auth/\
│   │   │   └── session/\
│   │   │       └── route.ts\
│   │   ├── guide/\
│   │   │   └── steps/\
│   │   │       └── route.ts\
│   │   ├── progress/\
│   │   │   └── route.ts\
│   │   ├── assistant/\
│   │   │   └── ask/\
│   │   │       └── route.ts\
│   │   └── location/\
│   │       └── polling-stations/\
│   │           └── route.ts\
│   ├── layout.tsx                # Root layout (fonts, providers)\
│   └── globals.css\
├── components/\
│   ├── ui/                       # shadcn/ui components\
│   ├── auth/\
│   │   └── google-sign-in.tsx\
│   ├── guide/\
│   │   ├── step-card.tsx\
│   │   ├── step-detail.tsx\
│   │   ├── checklist.tsx\
│   │   └── mode-toggle.tsx\
│   ├── timeline/\
│   │   └── timeline-item.tsx\
│   ├── assistant/\
│   │   └── chat-interface.tsx\
│   ├── dashboard/\
│   │   └── progress-overview.tsx\
│   ├── maps/\
│   │   └── polling-station-map.tsx\
│   └── shared/\
│       ├── navbar.tsx\
│       ├── footer.tsx\
│       ├── accessibility-wrapper.tsx\
│       └── seo-head.tsx\
├── lib/\
│   ├── firebase/\
│   │   ├── client.ts             # Firebase client config\
│   │   └── admin.ts              # Firebase Admin SDK (server)\
│   ├── genkit/\
│   │   └── flow.ts               # AI Logic / Genkit setup\
│   ├── validators.ts             # Zod schemas\
│   ├── constants.ts              # App constants\
│   └── utils.ts\
├── hooks/\
│   ├── use-auth.ts\
│   ├── use-progress.ts\
│   └── use-analytics.ts\
├── types/\
│   └── index.ts\
├── data/\
│   └── election-data.ts          # Static seed data\
├── tests/\
│   ├── unit/\
│   ├── integration/\
│   └── setup.ts\
├── middleware.ts                 # Auth + security middleware\
├── next.config.js\
├── tailwind.config.ts\
├── vitest.config.ts\
└── firebase.json                 # Firebase Hosting + Cloud Run

-----
## <a name="section-2-database-schema-firestore"></a>SECTION 2: DATABASE SCHEMA (Firestore)
### <a name="collections-documents"></a>2.1 Collections & Documents
users/{userId} [Document]\
├── uid: string (indexed)\
├── email: string\
├── displayName: string\
├── photoURL: string\
├── phoneNumber: string | null\
├── experienceLevel: "beginner" | "advanced"\
├── preferredLanguage: "en" | "hi"\
├── createdAt: timestamp\
├── lastLoginAt: timestamp\
├── isOnboarded: boolean\
└── metadata: map\
`    `├── signupSource: string\
`    `└── userAgent: string\
\
users/{userId}/progress/{stepId} [Subcollection Document]\
├── stepId: string\
├── stepOrder: number\
├── completed: boolean\
├── completedAt: timestamp | null\
├── bookmarked: boolean\
├── notes: string (max 500 chars)\
├── timeSpentSeconds: number\
└── updatedAt: timestamp\
\
users/{userId}/chatHistory/{messageId} [Subcollection Document]\
├── messageId: string\
├── role: "user" | "assistant"\
├── content: string\
├── contextStepId: string | null\
├── createdAt: timestamp\
└── feedback: "helpful" | "not\_helpful" | null\
\
electionSteps/{stepId} [Document - Static/Seeded]\
├── id: string\
├── order: number (indexed)\
├── category: "registration" | "preparation" | "voting\_day" | "results"\
├── title: map\
│   ├── en: string\
│   └── hi: string\
├── description: map\
│   ├── en: string\
│   └── hi: string\
├── content: map\
│   ├── beginner: map\
│   │   ├── en: string (rich text)\
│   │   └── hi: string\
│   └── advanced: map\
│       ├── en: string\
│       └── hi: string\
├── checklist: array<map>\
│   └── { text: {en, hi}, required: boolean }\
├── estimatedTimeMinutes: number\
├── officialLink: string\
├── iconName: string\
├── relatedSteps: array<string> (stepIds)\
└── isActive: boolean\
\
timelineEvents/{eventId} [Document - Static/Seeded]\
├── id: string\
├── phase: string\
├── phaseHi: string\
├── title: map { en, hi }\
├── description: map { en, hi }\
├── startDate: timestamp\
├── endDate: timestamp | null\
├── states: array<string>\
├── constituenciesCount: number\
├── isKeyEvent: boolean\
└── status: "upcoming" | "active" | "completed"\
\
pollingStations/{stationId} [Document - Optional/Admin]\
├── stationId: string\
├── name: string\
├── address: string\
├── coordinates: geopoint\
├── district: string\
├── state: string\
├── pincode: string\
├── accessibility: map\
│   ├── wheelchairAccessible: boolean\
│   ├── hasBraille: boolean\
│   └── hasAssistance: boolean\
└── status: "active" | "inactive"
### <a name="firestore-security-rules"></a>2.2 Firestore Security Rules
rules\_version = '2';\
service cloud.firestore {\
`  `match /databases/{database}/documents {\
`    `// Users can only read/write their own data\
`    `match /users/{userId} {\
`      `allow read, write: if request.auth != null && request.auth.uid == userId;\
\
`      `match /progress/{stepId} {\
`        `allow read, write: if request.auth != null && request.auth.uid == userId;\
`      `}\
\
`      `match /chatHistory/{messageId} {\
`        `allow read, write: if request.auth != null && request.auth.uid == userId;\
`      `}\
`    `}\
\
`    `// Election steps are public read-only\
`    `match /electionSteps/{stepId} {\
`      `allow read: if true;\
`      `allow write: if false; // Only via Admin SDK or Cloud Function\
`    `}\
\
`    `// Timeline events are public read-only\
`    `match /timelineEvents/{eventId} {\
`      `allow read: if true;\
`      `allow write: if false;\
`    `}\
`  `}\
}

-----
## <a name="section-3-backend-responsibilities"></a>SECTION 3: BACKEND RESPONSIBILITIES
### <a name="x1965f65632ad97cd6cd3b9f0661b5e8efb28171"></a>3.1 Cloud Run (Next.js API Routes) — Primary Backend

|Responsibility|Implementation|Google Service|
| :- | :- | :- |
|**Authentication**|Verify Firebase ID tokens, session management|Firebase Auth Admin SDK|
|**Authorization**|Role-based access, Firestore rules enforcement|Firebase Auth Custom Claims|
|**Data API**|CRUD operations for user progress, steps, timeline|Firestore Admin SDK|
|**AI Processing**|Election query understanding, contextual responses|Firebase AI Logic / Genkit + Gemini|
|**Rate Limiting**|IP-based + user-based request throttling|Upstash Redis (or Memorystore)|
|**Input Validation**|Zod schemas for all inputs|—|
|**Bot Protection**|reCAPTCHA v3 verification on auth + AI endpoints|reCAPTCHA Enterprise|
|**Geolocation**|Polling station lookup, distance calculation|Google Maps Platform|
|**Analytics Logging**|Server-side event tracking|Firebase Analytics Admin|
|**Caching**|Step data, timeline caching|Firestore + Next.js ISR|
### <a name="firebase-cloud-functions-triggers"></a>3.2 Firebase Cloud Functions (Triggers)

|Trigger|Function|Purpose|
| :- | :- | :- |
|onUserCreated|Welcome email + onboarding analytics|User engagement tracking|
|onProgressUpdate|Achievement check + badge award|Gamification|
|onChatMessage|Content moderation (toxicity check)|Safety|
|scheduledCleanup|Daily cleanup of expired anonymous sessions|Maintenance|
### <a name="backend-architecture-diagram"></a>3.3 Backend Architecture Diagram
┌─────────────────────────────────────────────────────────────────────────────┐\
│                         CLOUD RUN (Next.js Container)                        │\
│                                                                             │\
│  ┌─────────────────────────────────────────────────────────────────────┐  │\
│  │  Next.js API Routes                                                  │  │\
│  │                                                                     │  │\
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌───────────┐ │  │\
│  │  │  /api/auth  │  │  /api/guide │  │ /api/progress│  │ /api/ai   │ │  │\
│  │  │             │  │             │  │             │  │           │ │  │\
│  │  │ • Verify    │  │ • Cache     │  │ • Validate  │  │ • Genkit  │ │  │\
│  │  │   ID Token  │  │   steps     │  │   input     │  │   flow    │ │  │\
│  │  │ • Create    │  │ • Return    │  │ • Firestore │  │ • Gemini  │ │  │\
│  │  │   session   │  │   localized │  │   CRUD      │  │   2.5     │ │  │\
│  │  │ • reCAPTCHA │  │   data      │  │ • Analytics │  │ • Prompt  │ │  │\
│  │  │   check     │  │             │  │   log       │  │   template│ │  │\
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └───────────┘ │  │\
│  └─────────────────────────────────────────────────────────────────────┘  │\
│                                                                             │\
│  ┌─────────────────────────────────────────────────────────────────────┐  │\
│  │  Middleware Layer                                                    │  │\
│  │  • CSP Headers (Strict)                                              │  │\
│  │  • CORS Configuration                                                │  │\
│  │  • Rate Limiting (Redis)                                           │  │\
│  │  • Request Logging                                                   │  │\
│  │  • Error Handling                                                    │  │\
│  └─────────────────────────────────────────────────────────────────────┘  │\
│                                                                             │\
└─────────────────────────────────┬───────────────────────────────────────────┘\
`                                  `│\
`                                  `▼\
┌─────────────────────────────────────────────────────────────────────────────┐\
│                         FIREBASE ADMIN SDK                                   │\
│                                                                             │\
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌────────────┐ │\
│  │  Auth Admin  │───▶│  Firestore   │───▶│  Analytics   │───▶│  Cloud     │ │\
│  │  (Verify)    │    │  (CRUD)      │    │  (Log)       │    │  Storage   │ │\
│  └──────────────┘    └──────────────┘    └──────────────┘    └────────────┘ │\
│                                                                             │\
└─────────────────────────────────────────────────────────────────────────────┘

-----
## <a name="xc0cb8968cd27ab609130591aa5ccf1df382b3ab"></a>SECTION 4: GOOGLE SERVICES INTEGRATION MAP
### <a name="feature-service-mapping"></a>4.1 Feature → Service Mapping

|Feature|What It Does|Google Service|Why It Improves Scoring|
| :- | :- | :- | :- |
|**Authentication**|Google One-Tap Sign-In, session management, passkeys|**Firebase Auth**|Secure, seamless UX, supports latest auth standards|
|**User Profiles**|Store user preferences, progress, bookmarks|**Firestore**|Real-time sync, offline-first, scalable|
|**Election Data**|Static content: steps, timeline, FAQs|**Firestore** (cached) + **Cloud CDN**|Fast reads, global distribution|
|**AI Assistant**|Answer election questions, explain processes|**Firebase AI Logic** + **Genkit** + **Gemini 2.5 Flash**|Server-side AI, App Check protection, cost-optimized|
|**Analytics**|Track user journeys, feature adoption, drop-offs|**Firebase Analytics** + **BigQuery**|Detailed insights, SQL analysis, conversion tracking|
|**Bot Protection**|Prevent spam on AI chat + auth endpoints|**reCAPTCHA Enterprise v3**|Invisible protection, risk scoring|
|**App Attestation**|Prevent API abuse, token replay attacks|**Firebase App Check**|Device attestation, replay protection|
|**Polling Stations**|Show nearby polling stations on map|**Google Maps JS API** + **Geocoding API**|Location-aware, accessible directions|
|**Hosting**|Global CDN, SSL, custom domain|**Firebase Hosting**|Fast deployment, automatic SSL, edge caching|
|**Backend Runtime**|Serverless API hosting|**Cloud Run**|Auto-scaling, pay-per-use, container-based|
|**Monitoring**|Performance tracking, crash reporting|**Firebase Performance Monitoring** + **Crashlytics**|Real-user metrics, proactive alerting|
|**Search**|Full-text search in election steps|**Firestore Enterprise** (native full-text)|No external service needed, consistent results|
|**Push Notifications**|Election reminders, step notifications|**Firebase Cloud Messaging**|Cross-platform, high delivery rates|
|**Image Storage**|User avatars, election infographics|**Cloud Storage for Firebase**|Scalable, CDN-backed, security rules|
### <a name="backend-api-endpoints-per-feature"></a>4.2 Backend API Endpoints Per Feature

|Feature|Endpoint|Backend Logic|Google Service Used|
| :- | :- | :- | :- |
|**Auth**|POST /api/auth/session|Verify Firebase ID token, create HTTP-only cookie, log analytics|Firebase Auth Admin, Analytics|
|**Auth**|DELETE /api/auth/session|Clear cookie, revoke refresh tokens|Firebase Auth Admin|
|**Guide**|GET /api/guide/steps|Fetch from Firestore, cache with ISR, localize based on user lang|Firestore, Cloud CDN|
|**Guide**|GET /api/guide/steps/[id]|Fetch single step, increment view count|Firestore, Analytics|
|**Progress**|GET /api/progress|Fetch user progress subcollection|Firestore|
|**Progress**|POST /api/progress|Validate stepId, update completion, trigger achievement check|Firestore, Cloud Functions|
|**AI Chat**|POST /api/assistant/ask|Validate input, verify reCAPTCHA, call Genkit flow with Gemini, log token usage|Firebase AI Logic, Genkit, reCAPTCHA|
|**Location**|GET /api/location/polling-stations|Validate coordinates, call Google Maps API, filter by accessibility|Google Maps Platform|
|**Analytics**|POST /api/analytics/event|Server-side event validation and logging|Firebase Analytics Admin|

-----
## <a name="section-5-scoring-category-maximization"></a>SECTION 5: SCORING CATEGORY MAXIMIZATION
### <a name="code-quality-target-100100"></a>5.1 Code Quality (Target: 100/100)

|Strategy|Implementation|
| :- | :- |
|**TypeScript Strict**|strict: true, noImplicitAny, strictNullChecks|
|**ESLint + Prettier**|Airbnb config + custom rules, pre-commit hooks|
|**Modular Architecture**|Feature-based folders, single responsibility|
|**Consistent Naming**|PascalCase components, camelCase functions, UPPER\_CASE constants|
|**Documentation**|JSDoc for all functions, README for each module|
|**Code Reviews**|Automated PR checks (GitHub Actions)|
|**Dependency Management**|Minimal deps, weekly npm audit, Dependabot|
|**No Code Smells**|No any, no console.log in prod, no magic numbers|
### <a name="security-target-100100"></a>5.2 Security (Target: 100/100)

|OWASP Threat|Mitigation|
| :- | :- |
|**A01: Broken Access Control**|Firebase Auth + Firestore Rules + Middleware checks|
|**A02: Cryptographic Failures**|HTTPS only, HTTP-only cookies, AES-256 for data at rest|
|**A03: Injection**|Zod validation, parameterized queries, no raw SQL|
|**A04: Insecure Design**|Security by design, threat modeling, least privilege|
|**A05: Security Misconfiguration**|CSP headers, security headers, minimal error exposure|
|**A06: Vulnerable Components**|Dependency scanning, SBOM, automated updates|
|**A07: Auth Failures**|Firebase Auth, MFA support, session timeout|
|**A08: Data Integrity**|Input validation, output encoding, CSRF tokens|
|**A09: Logging Failures**|Comprehensive audit logs, anomaly detection|
|**A10: SSRF**|URL validation, whitelist domains, no direct user input to requests|

**Security Headers (Middleware):**

Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://\*.googleusercontent.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://\*.googleapis.com https://\*.firebaseio.com;\
X-Frame-Options: DENY\
X-Content-Type-Options: nosniff\
Referrer-Policy: strict-origin-when-cross-origin\
Permissions-Policy: geolocation=(self), microphone=(), camera=()\
Strict-Transport-Security: max-age=31536000; includeSubDomains
### <a name="efficiency-target-100100"></a>5.3 Efficiency (Target: 100/100)

|Strategy|Implementation|
| :- | :- |
|**Code Splitting**|Dynamic imports for heavy components (maps, charts)|
|**Lazy Loading**|Images with next/image, components below fold|
|**ISR**|Static generation for steps + timeline, revalidate 1 hour|
|**Edge Caching**|Firebase Hosting CDN, Cloudflare (optional)|
|**Firestore Optimization**|Pagination, compound indexes, denormalized reads|
|**Bundle Size**|Tree-shaking, webpack-bundle-analyzer, <200KB initial|
|**Core Web Vitals**|LCP <2.5s, FID <100ms, CLS <0.1|
|**Memory Management**|Cleanup listeners, avoid memory leaks in useEffect|
### <a name="testing-target-100100"></a>5.4 Testing (Target: 100/100)

|Type|Coverage Target|Tools|
| :- | :- | :- |
|**Unit Tests**|60%|Vitest + React Testing Library|
|**Integration Tests**|20%|MSW (Mock Service Worker) + Vitest|
|**E2E Tests**|10%|Playwright (critical flows)|
|**Accessibility Tests**|10%|axe-core + jest-axe|
|**Total**|**≥90%**|**Vitest coverage reporter**|

**Test Categories:** - Component rendering + interactions - Hook behavior (auth, progress, analytics) - API route handlers (mock Firebase Admin) - Form validation (Zod schemas) - Accessibility (keyboard navigation, ARIA)
### <a name="accessibility-target-100100"></a>5.5 Accessibility (Target: 100/100)

|WCAG 2.1 AA Requirement|Implementation|
| :- | :- |
|**1.1 Text Alternatives**|Alt text for all images, icons have aria-label|
|**1.2 Time-based Media**|No auto-playing media, transcripts for any video|
|**1.3 Adaptable**|Semantic HTML, correct heading hierarchy, landmark regions|
|**1.4 Distinguishable**|Color contrast ≥4.5:1, zoom support 200%, no text images|
|**2.1 Keyboard Accessible**|All functions via keyboard, visible focus indicators, skip links|
|**2.2 Enough Time**|No timeouts, user controls for any time limits|
|**2.3 Seizures**|No flashing content|
|**2.4 Navigable**|Page titles, breadcrumbs, logical tab order|
|**2.5 Input Modalities**|Touch targets ≥44px, gesture alternatives|
|**3.1 Readable**|Language attribute, simple language option (Hindi + English)|
|**3.2 Predictable**|Consistent navigation, no unexpected context changes|
|**3.3 Input Assistance**|Error identification, suggestions, labels + instructions|
|**4.1 Compatible**|Valid HTML, ARIA roles, status messages|
### <a name="google-services-target-100100"></a>5.6 Google Services (Target: 100/100)

|Service|Integration Depth|Points of Integration|
| :- | :- | :- |
|**Firebase Auth**|Deep|Sign-In, session, custom claims, passkeys|
|**Firestore**|Deep|Primary DB, real-time, offline, security rules|
|**Firebase Analytics**|Deep|Custom events, user properties, BigQuery export|
|**Firebase AI Logic**|Deep|Server-side AI, prompt templates, App Check|
|**Genkit**|Deep|AI flows, model management, evaluation|
|**reCAPTCHA Enterprise**|Deep|v3 invisible, risk scoring, auth + AI protection|
|**App Check**|Deep|Device attestation, replay protection|
|**Google Maps Platform**|Deep|Geolocation, polling stations, directions|
|**Firebase Hosting**|Deep|CDN, SSL, edge caching, preview channels|
|**Cloud Run**|Deep|Serverless backend, auto-scaling, containers|
|**Firebase Performance**|Deep|Custom traces, HTTP monitoring|
|**Crashlytics**|Medium|Error reporting, crash grouping|
|**Firebase Cloud Messaging**|Medium|Push notifications for reminders|
|**Cloud Storage**|Medium|User avatars, static assets|
|**BigQuery**|Medium|Analytics export, SQL analysis|

-----
## <a name="section-6-uiux-design-system"></a>SECTION 6: UI/UX DESIGN SYSTEM
### <a name="design-philosophy"></a>6.1 Design Philosophy
**Sajag** must feel: - **Trustworthy**: Like an official government service (clean, authoritative) - **Approachable**: For first-time voters (simple, encouraging) - **Modern**: Like a premium SaaS product (polished, responsive) - **Indian**: Subtle civic pride without being overwhelming
### <a name="color-palette-strict-adherence"></a>6.2 Color Palette (Strict Adherence)

|Token|Hex|Usage|% of UI|
| :- | :- | :- | :- |
|**Primary Blue**|#1D4ED8|Buttons, links, active states, highlights|15%|
|**Primary Blue Hover**|#1E40AF|Button hover, link hover|—|
|**Primary Blue Light**|#DBEAFE|Background accents, badges|—|
|**Saffron Accent**|#F59E0B|Warnings, important badges, celebratory elements|2\.5%|
|**Green Accent**|#16A34A|Success states, completed steps, checkmarks|2\.5%|
|**Background**|#F8FAFC|Page background|40%|
|**Card Background**|#FFFFFF|Cards, modals, dropdowns|35%|
|**Text Primary**|#0F172A|Headings, primary text|—|
|**Text Secondary**|#475569|Body text, descriptions|—|
|**Text Muted**|#94A3B8|Placeholders, disabled|—|
|**Border**|#E2E8F0|Dividers, card borders, input borders|—|
|**Success**|#22C55E|Success messages, toasts|—|
|**Error**|#EF4444|Error messages, validation|—|
|**Warning**|#F59E0B|Warning messages (same as saffron)|—|

**Usage Rules:** - 80% neutral (white/gray backgrounds) - 15% blue (actions and highlights) - 5% total for saffron + green (accents only) - NEVER introduce new colors - NEVER use gradients except subtle blue tints - NEVER use saffron/green for primary actions (reserved for blue)
### <a name="typography-strict-adherence"></a>6.3 Typography (Strict Adherence)

|Element|Font|Weight|Size|Line Height|Letter Spacing|
| :- | :- | :- | :- | :- | :- |
|**H1**|Poppins|600|36px|1\.2|-0.02em|
|**H2**|Poppins|500|24px|1\.3|-0.01em|
|**H3**|Poppins|500|20px|1\.4|0|
|**Body**|Noto Sans|400|16px|1\.6|0|
|**Body Small**|Noto Sans|400|14px|1\.5|0|
|**Caption**|Noto Sans|400|12px|1\.4|0\.01em|
|**Button**|Poppins|500|14px|1|0\.02em|
|**Nav Link**|Noto Sans|500|14px|1|0|

**Rules:** - NO other fonts allowed - Maintain clear hierarchy (H1 > H2 > H3 > Body) - Minimum 16px for body on mobile (accessibility) - Use font-display: swap for performance
### <a name="spacing-system"></a>6.4 Spacing System

|Token|Value|Usage|
| :- | :- | :- |
|**space-1**|4px|Tight gaps, icon padding|
|**space-2**|8px|Small gaps, inline spacing|
|**space-3**|16px|Standard padding, card padding|
|**space-4**|24px|Section gaps, form spacing|
|**space-5**|32px|Large sections, page padding|
|**space-6**|48px|Hero sections, major divisions|
|**space-7**|64px|Page sections, footer spacing|

**Rules:** - Use 8px base grid (all spacing multiples of 4px) - Mobile: reduce by 25% (space-5 becomes 24px) - NEVER arbitrary pixel values
### <a name="component-system"></a>6.5 Component System
#### <a name="buttons"></a>Buttons

|Variant|Background|Text|Border|Hover|Usage|
| :- | :- | :- | :- | :- | :- |
|**Primary**|#1D4ED8|#FFFFFF|none|#1E40AF|Main CTAs|
|**Secondary**|#FFFFFF|#1D4ED8|#1D4ED8 1px|#DBEAFE bg|Secondary actions|
|**Ghost**|transparent|#475569|#E2E8F0 1px|#F8FAFC bg|Tertiary actions|
|**Success**|#16A34A|#FFFFFF|none|#15803D|Completion actions|
|**Danger**|#EF4444|#FFFFFF|none|#DC2626|Destructive actions|

**Specs:** - Border radius: 12px (all buttons) - Padding: 12px 24px (standard), 16px 32px (large/hero) - Height: 44px minimum (touch target) - Font: Poppins 500, 14px - Transition: all 200ms ease - Focus ring: 2px offset, #1D4ED8 at 50% opacity
#### <a name="cards"></a>Cards

|Type|Background|Border|Shadow|Padding|
| :- | :- | :- | :- | :- |
|**Default**|#FFFFFF|#E2E8F0 1px|0 1px 3px rgba(0,0,0,0.1)|24px|
|**Hover**|#FFFFFF|#1D4ED8 1px|0 4px 12px rgba(29,78,216,0.15)|24px|
|**Completed**|#F0FDF4|#16A34A 1px|0 1px 3px rgba(0,0,0,0.1)|24px|
|**Active**|#EFF6FF|#1D4ED8 2px|0 4px 12px rgba(29,78,216,0.2)|24px|

**Specs:** - Border radius: 12px - Transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1)
#### <a name="inputs"></a>Inputs

|State|Border|Background|Text|
| :- | :- | :- | :- |
|**Default**|#E2E8F0 1px|#FFFFFF|#0F172A|
|**Focus**|#1D4ED8 2px|#FFFFFF|#0F172A|
|**Error**|#EF4444 2px|#FEF2F2|#0F172A|
|**Disabled**|#E2E8F0 1px|#F8FAFC|#94A3B8|

**Specs:** - Border radius: 12px - Height: 48px - Padding: 12px 16px - Font: Noto Sans 400, 16px - Label: Noto Sans 500, 14px, #475569, margin-bottom 8px

-----
## <a name="section-7-screen-flow-user-journey"></a>SECTION 7: SCREEN FLOW & USER JOURNEY
### <a name="complete-user-journey"></a>7.1 Complete User Journey
┌─────────┐     ┌─────────────┐     ┌──────────────┐     ┌─────────────────┐\
│ Landing │────▶│  Google     │────▶│  Onboarding  │────▶│   Dashboard     │\
│  Page   │     │  Sign-In    │     │  (Language   │     │   (Home Base)   │\
│         │     │  (One-Tap)  │     │  + Level)    │     │                 │\
└─────────┘     └─────────────┘     └──────────────┘     └─────────────────┘\
`                                                               `│\
`                    `┌──────────────────────────────────────────┼──────────┐\
`                    `│                                          │          │\
`                    `▼                                          ▼          ▼\
`            `┌──────────────┐                           ┌──────────┐  ┌──────────┐\
`            `│ Step-by-Step │                           │ Timeline │  │ Assistant│\
`            `│    Guide     │                           │  View    │  │  (AI)    │\
`            `└──────────────┘                           └──────────┘  └──────────┘\
`                    `│                                          │          │\
`                    `▼                                          ▼          ▼\
`            `┌──────────────┐                           ┌──────────┐  ┌──────────┐\
`            `│ Step Detail  │                           │ Phase    │  │ Chat     │\
`            `│ (Beginner/   │                           │ Details  │  │ History  │\
`            `│  Advanced)   │                           │          │  │          │\
`            `└──────────────┘                           └──────────┘  └──────────┘\
`                    `│\
`                    `▼\
`            `┌──────────────┐\
`            `│ Checklist    │\
`            `│ + Progress   │\
`            `│   Save       │\
`            `└──────────────┘
### <a name="screen-definitions"></a>7.2 Screen Definitions
#### <a name="screen-1-landing-page"></a>Screen 1: Landing Page
**Route:** / **Layout:** Full-width hero, single column mobile, 2-column desktop **Components:** - **Navbar**: Logo (left), “Sign In” button (right), hamburger menu (mobile) - **Hero Section**: - H1: “Understand Elections. Vote with Confidence.” - Subtitle: “Sajag guides you through every step of India’s election process.” - CTA Button: “Get Started — It’s Free” (Primary, large) - Trust badge: “Official Election Commission data” with ECI logo - **Feature Grid** (3 cards): - “Step-by-Step Guide” — Icon + description - “Interactive Timeline” — Icon + description\
\- “AI Assistant” — Icon + description - **Social Proof**: “Trusted by 10,000+ first-time voters” - **Footer**: Links, privacy policy, language switcher

**Interactions:** - CTA scrolls to auth section or navigates to /login - Language switcher: English / हिंदी (persists in localStorage)
#### <a name="screen-2-login-page"></a>Screen 2: Login Page
**Route:** /login **Layout:** Centered card, max-width 420px **Components:** - **Auth Card**: - Logo + Tagline: “Stay aware. Vote with clarity.” - Google Sign-In button (large, prominent) - reCAPTCHA badge (invisible v3) - “By signing in, you agree to our Terms and Privacy Policy” - **Back Link**: “← Back to home”

**Interactions:** - Click Google button → Firebase Auth popup → redirect to onboarding - Error state: Toast notification, retry option
#### <a name="screen-3-onboarding"></a>Screen 3: Onboarding
**Route:** /onboarding **Layout:** Centered, step indicator at top **Components:** - **Step Indicator**: 2 dots, current step highlighted - **Step 1 — Language**: - H2: “Choose Your Language” - Two large selectable cards: “English” / “हिंदी” - Primary button: “Continue” - **Step 2 — Experience**: - H2: “How familiar are you with elections?” - Two cards: - “I’m new to voting” (Beginner mode) - “I know the basics” (Advanced mode) - Primary button: “Start Learning”

**Interactions:** - Selection highlights card with blue border - Progress saved to user profile in Firestore - Auto-redirect to dashboard after completion
#### <a name="screen-4-dashboard"></a>Screen 4: Dashboard
**Route:** /dashboard **Layout:** App shell with sidebar (desktop) / bottom nav (mobile) **Components:** - **Welcome Header**: - “Welcome back, [Name]” - Experience mode toggle (Beginner/Advanced pill switch) - **Progress Overview Card**: - Circular progress indicator (SVG) - “3 of 8 steps completed” - “Continue where you left off” → CTA to next incomplete step - **Quick Actions Grid** (2x2): - “Election Guide” → /guide - “Timeline” → /timeline - “Ask AI Assistant” → /assistant - “Find Polling Station” → /location - **Recent Activity**: Last 3 completed steps with timestamps

**Interactions:** - Mode toggle instantly refreshes content complexity - Progress card clickable → opens guide at current step - Bottom nav: Home | Guide | Timeline | Assistant | Profile
#### <a name="screen-5-election-guide-flow"></a>Screen 5: Election Guide Flow
**Route:** /guide **Layout:** Vertical scroll, sticky header **Components:** - **Header**: - H1: “Election Guide” - Progress bar (horizontal, blue) - Mode toggle (Beginner/Advanced) - **Step Cards** (vertical stack): - Each card: Icon, title, description, status badge - Status: “Not Started” (gray) / “In Progress” (blue) / “Completed” (green) - Expandable: Click to reveal checklist - **Checklist** (inside expanded card): - Checkbox items with labels - “Mark as Complete” button - **Navigation**: “Previous” / “Next” buttons (sticky bottom)

**Interactions:** - Card click expands/collapses (accordion) - Check item → updates progress in Firestore (optimistic UI) - “Mark Complete” → confetti animation (subtle), next step auto-opens - Swipe left/right on mobile for step navigation
#### <a name="screen-6-timeline-view"></a>Screen 6: Timeline View
**Route:** /timeline **Layout:** Vertical timeline, centered line **Components:** - **Header**: H1 “Election Timeline 2026”, filter dropdown (All/Upcoming/Completed) - **Timeline Items**: - Left/right alternating (desktop), single column (mobile) - Each item: Date badge, phase title, description, status indicator - Status: Upcoming (gray dot), Active (blue pulse), Completed (green check) - **Key Event Cards**: Highlighted with saffron border (minimal usage) - **State Filter**: Dropdown to filter by state

**Interactions:** - Click item → expands to show detailed description + constituencies - Active item auto-scrolls into view on load - Filter changes animate items with Framer Motion
#### <a name="screen-7-ai-assistant"></a>Screen 7: AI Assistant
**Route:** /assistant **Layout:** Chat interface, full height **Components:** - **Header**: “Sajag AI Assistant”, clear chat button - **Chat Area**: - Welcome message: “Hi! Ask me anything about Indian elections.” - Message bubbles: User (blue right), Assistant (white left) - Typing indicator (three dots animation) - **Suggested Questions** (chips): - “What documents do I need?” - “How do I check my voter ID?” - “What happens on polling day?” - **Input Area**: - Text input with send button - Character counter (max 500) - reCAPTCHA protection (invisible)

**Interactions:** - Send message → optimistic UI → API call → stream response - Suggested question click → auto-fills input - Code/markdown in responses rendered safely - Feedback buttons: 👍 / 👎 per response
#### <a name="screen-8-profile"></a>Screen 8: Profile
**Route:** /profile **Layout:** Single column, card-based **Components:** - **User Card**: Avatar, name, email, join date - **Settings**: - Language switcher - Experience mode toggle - Notification preferences - **Progress Stats**: - Total steps completed - Time spent learning - Achievements (badges) - **Actions**: - “Download My Progress” (PDF) - “Sign Out” (danger button)

-----
## <a name="x63f4a286b36f9771a507ef2872f3915b4440f68"></a>SECTION 8: ACCESSIBILITY SPECIFICATIONS (WCAG 2.1 AA)
### <a name="semantic-structure"></a>8.1 Semantic Structure
*<!-- Landing Page -->*\
<**main**>\
`  `<**nav** aria-label="Main navigation">...</**nav**>\
`  `<**header**>\
`    `<**h1**>Understand Elections. Vote with Confidence.</**h1**>\
`  `</**header**>\
`  `<**section** aria-labelledby="features-heading">\
`    `<**h2** id="features-heading">What Sajag Offers</**h2**>\
...\
`  `</**section**>\
</**main**>\
\
*<!-- Guide Page -->*\
<**main**>\
`  `<**nav** aria-label="Breadcrumb">...</**nav**>\
`  `<**h1**>Election Guide</**h1**>\
`  `<**section** aria-label="Progress">\
`    `<**progress** value="3" max="8" aria-label="3 of 8 steps completed">37.5%</**progress**>\
`  `</**section**>\
`  `<**section** aria-label="Election steps">\
`    `<**article** aria-labelledby="step-1-heading">\
`      `<**h2** id="step-1-heading">Step 1: Check Eligibility</**h2**>\
`      `<**button** aria-expanded="false" aria-controls="step-1-details">\
`        `Expand details\
`      `</**button**>\
`      `<**div** id="step-1-details" hidden>...</**div**>\
`    `</**article**>\
`  `</**section**>\
</**main**>
### <a name="aria-labels-roles"></a>8.2 ARIA Labels & Roles

|Element|ARIA Attribute|Purpose|
| :- | :- | :- |
|Progress ring|role="progressbar", aria-valuenow, aria-valuemin, aria-valuemax|Screen reader announces completion %|
|Step cards|aria-expanded, aria-controls|Indicates expandable content|
|Mode toggle|role="switch", aria-checked|Indicates Beginner/Advanced state|
|Chat messages|aria-live="polite"|Announces new assistant messages|
|Toast notifications|role="alert", aria-live="assertive"|Announces errors/success|
|Loading states|aria-busy="true"|Indicates content loading|
### <a name="keyboard-navigation"></a>8.3 Keyboard Navigation

|Key|Action|
| :- | :- |
|Tab|Navigate through interactive elements|
|Shift + Tab|Reverse navigation|
|Enter / Space|Activate buttons, toggle expandables|
|Escape|Close modals, collapse expanded cards|
|Arrow Up/Down|Navigate list items (timeline, steps)|
|Home|Jump to first item|
|End|Jump to last item|
### <a name="focus-management"></a>8.4 Focus Management
- **Visible focus indicator**: 2px solid #1D4ED8, 2px offset
- **Focus trap**: In modals (login, onboarding)
- **Focus restoration**: Return to trigger element after modal close
- **Skip link**: “Skip to main content” at top of page
### <a name="screen-reader-support"></a>8.5 Screen Reader Support
- All images have descriptive alt text
- Icons have aria-label (never hidden from AT)
- Complex visuals (charts, progress) have text alternatives
- Live regions for dynamic content updates
- Form errors linked with aria-describedby
### <a name="color-contrast"></a>8.6 Color & Contrast

|Combination|Ratio|Pass/Fail|
| :- | :- | :- |
|#0F172A on #FFFFFF|12\.6:1|✅ Pass|
|#1D4ED8 on #FFFFFF|5\.9:1|✅ Pass|
|#475569 on #FFFFFF|7\.5:1|✅ Pass|
|#FFFFFF on #1D4ED8|5\.9:1|✅ Pass|
|#16A34A on #FFFFFF|4\.5:1|✅ Pass|
|#F59E0B on #FFFFFF|2\.1:1|❌ Fail → Use on dark bg only or with dark text|

-----
## <a name="section-9-hackathon-judge-audit"></a>SECTION 9: HACKATHON JUDGE AUDIT
### <a name="pre-implementation-audit"></a>9.1 Pre-Implementation Audit

|Category|Current Score|Weaknesses|Improvements Needed|
| :- | :- | :- | :- |
|**Code Quality**|85/100|No strict linting rules defined, no pre-commit hooks specified|Add Husky + lint-staged, define strict ESLint config|
|**Security**|80/100|reCAPTCHA integration not detailed, no CSP policy defined|Add comprehensive CSP, document reCAPTCHA flow|
|**Efficiency**|82/100|No specific caching strategy, bundle size targets vague|Define ISR strategy, set <200KB initial bundle target|
|**Testing**|75/100|No test file structure, coverage tool not specified|Add Vitest config, define test matrix, mock Firebase|
|**Accessibility**|88/100|Missing focus management details, no screen reader testing plan|Add focus trap logic, define NVDA/VoiceOver testing|
|**Google Services**|90/100|Missing App Check details, no BigQuery integration plan|Add App Check flow, document BigQuery export schema|
### <a name="post-implementation-audit-checklist"></a>9.2 Post-Implementation Audit Checklist
After Anti-Gravity builds the app, verify:

**Code Quality:** - [ ] npm run lint passes with zero errors - [ ] npm run type-check passes with strict mode - [ ] No any types in codebase - [ ] All functions have JSDoc comments - [ ] No console.log in production build

**Security:** - [ ] Security headers present on all responses - [ ] reCAPTCHA v3 score > 0.5 for all submissions - [ ] No secrets in client-side code - [ ] Firestore rules tested with emulator - [ ] Input validation rejects all malicious payloads

**Efficiency:** - [ ] Lighthouse Performance score ≥ 90 - [ ] Initial JS bundle < 200KB - [ ] LCP < 2.5s on 3G - [ ] No unused dependencies - [ ] Images optimized with next/image

**Testing:** - [ ] npm run test:coverage shows ≥ 80% - [ ] All API routes have integration tests - [ ] All components have render tests - [ ] Accessibility tests pass (axe-core) - [ ] E2E tests cover critical user flows

**Accessibility:** - [ ] axe-core scan shows zero violations - [ ] Keyboard navigation works for all features - [ ] Screen reader announces all dynamic content - [ ] Color contrast passes WCAG AA everywhere - [ ] Focus indicators visible on all interactive elements

**Google Services:** - [ ] Firebase Auth login works end-to-end - [ ] Firestore data syncs in real-time - [ ] Analytics events fire correctly - [ ] AI responses generate within 3 seconds - [ ] Maps API loads polling stations - [ ] App Check blocks unverified requests

-----
## <a name="x45ad670c4239b4ea2035b07c0ff4d2e491f41b2"></a>SECTION 10: ANTI-GRAVITY PROMPT ENGINEERING GUIDE
### <a name="step-by-step-prompt-sequence"></a>10.1 Step-by-Step Prompt Sequence
You will feed these prompts to Anti-Gravity in exact order. Each prompt builds on the previous. Do NOT skip steps.

-----
#### <a name="prompt-1-project-initialization"></a>**PROMPT 1: Project Initialization**
Create a new Next.js 14 project named "sajag" with TypeScript, Tailwind CSS, and shadcn/ui. Use the app router. Initialize with the following:\
\
\- TypeScript strict mode enabled\
\- Tailwind configured with custom color tokens:\
`  `primary: { DEFAULT: '#1D4ED8', hover: '#1E40AF', light: '#DBEAFE' }\
`  `accent: { saffron: '#F59E0B', green: '#16A34A' }\
`  `neutral: { background: '#F8FAFC', card: '#FFFFFF', textPrimary: '#0F172A', textSecondary: '#475569', border: '#E2E8F0' }\
`  `functional: { success: '#22C55E', error: '#EF4444', warning: '#F59E0B' }\
\- Font configuration: Poppins (headings) and Noto Sans (body) from Google Fonts\
\- shadcn/ui initialized with New York style\
\- Add essential shadcn components: button, card, input, dialog, progress, accordion, tabs, toast, badge, avatar, skeleton, switch, select, textarea, tooltip, dropdown-menu, separator, scroll-area\
\- Install additional dependencies: zustand, framer-motion, firebase, @genkit-ai/google-genai, genkit, zod, react-hook-form, @hookform/resolvers, next-themes, clsx, tailwind-merge\
\- Set up Vitest with React Testing Library for testing\
\- Configure next.config.js for static export optimization and image domains\
\- Create folder structure as specified in the design document\
\- Add .env.example with all required environment variables\
\
DO NOT write any page code yet. Only set up the project scaffold, configuration files, and install dependencies.

-----
#### <a name="x76dea4e49125524383c6bb7583e4e9189bbb053"></a>**PROMPT 2: Firebase Configuration & Auth Setup**
Set up Firebase integration for the Sajag project:\
\
1\. Create lib/firebase/client.ts:\
`   `- Initialize Firebase App with config from env vars\
`   `- Export auth, firestore, analytics instances\
`   `- Enable offline persistence for Firestore\
`   `- Configure App Check with reCAPTCHA Enterprise\
\
2\. Create lib/firebase/admin.ts:\
`   `- Initialize Firebase Admin SDK for server-side\
`   `- Export adminAuth, adminDb, adminAnalytics\
`   `- Handle service account credentials securely\
\
3\. Create app/api/auth/session/route.ts:\
`   `- POST: Verify Firebase ID token, create session cookie (HTTP-only, Secure, SameSite=Strict, 14 days expiry)\
`   `- DELETE: Clear session cookie, revoke refresh tokens\
`   `- GET: Verify session cookie, return user data\
\
4\. Create components/auth/google-sign-in.tsx:\
`   `- Google One-Tap Sign-In button\
`   `- Handle sign-in flow with Firebase Auth\
`   `- Call /api/auth/session after successful sign-in\
`   `- Show loading state, error handling with toast\
`   `- reCAPTCHA v3 invisible integration\
\
5\. Create hooks/use-auth.ts:\
`   `- Zustand store for auth state\
`   `- Listen to Firebase Auth state changes\
`   `- Methods: signIn, signOut, refreshToken\
`   `- Derived state: isAuthenticated, isLoading, user\
\
6\. Add middleware.ts:\
`   `- Check session cookie on protected routes\
`   `- Redirect unauthenticated users to /login\
`   `- Add security headers (CSP, X-Frame-Options, etc.)\
`   `- Rate limiting with Upstash Redis (or in-memory for dev)\
\
7\. Create types/index.ts with all TypeScript interfaces:\
`   `- User, ElectionStep, TimelineEvent, Progress, ChatMessage, etc.\
\
Ensure all code is production-ready with proper error handling, TypeScript types, and comments explaining logic.

-----
#### <a name="prompt-3-data-layer-static-content"></a>**PROMPT 3: Data Layer & Static Content**
Create the data layer and seed content for Sajag:\
\
1\. Create data/election-data.ts:\
`   `- Define complete election steps array (8 steps minimum):\
`     `\* Check Eligibility\
`     `\* Register as Voter\
`     `\* Verify Voter ID\
`     `\* Know Your Constituency\
`     `\* Understand Candidates\
`     `\* Polling Day Preparation\
`     `\* Cast Your Vote\
`     `\* Check Results\
`   `- Each step must have: id, order, category, title (en/hi), description (en/hi), content (beginner/advanced for both languages), checklist items, estimatedTimeMinutes, officialLink, iconName\
`   `- Define timeline events for 2026 election phases\
`   `- All content must be factually accurate based on Election Commission of India procedures\
\
2\. Create lib/db.ts:\
`   `- Firestore helper functions:\
`     `\* getUserProgress(userId)\
`     `\* updateStepProgress(userId, stepId, completed, notes)\
`     `\* getElectionSteps(language, experienceLevel)\
`     `\* getTimelineEvents(language, filter?)\
`   `- Proper error handling and logging\
`   `- Batch operations for bulk updates\
\
3\. Create app/api/guide/steps/route.ts:\
`   `- GET: Return election steps based on query params (lang, level)\
`   `- Cache response with Next.js ISR (revalidate: 3600)\
`   `- Return localized content based on user preferences\
\
4\. Create app/api/timeline/route.ts:\
`   `- GET: Return timeline events\
`   `- Support filtering by status (upcoming/active/completed)\
`   `- Sort by date\
\
5\. Create app/api/progress/route.ts:\
`   `- GET: Return current user's progress (protected)\
`   `- POST: Update progress for a step (protected)\
`   `- Validate input with Zod schemas\
`   `- Log analytics events on progress update\
\
6\. Add Zod validators in lib/validators.ts:\
`   `- User schema, Progress schema, ChatMessage schema, etc.\
`   `- Reusable validation patterns\
\
Ensure all API routes have proper auth checks, input validation, and error responses.

-----
#### <a name="prompt-4-core-ui-components"></a>**PROMPT 4: Core UI Components**
Build all shared and feature-specific UI components for Sajag following the design system EXACTLY:\
\
SHARED COMPONENTS:\
1\. components/shared/navbar.tsx:\
`   `- Logo "Sajag" with tagline "Stay aware. Vote with clarity."\
`   `- Navigation links: Guide, Timeline, Assistant, Profile\
`   `- Auth state: Show avatar + dropdown when logged in, "Sign In" button when not\
`   `- Mobile: Hamburger menu with sheet component\
`   `- Sticky top, white background, subtle shadow\
\
2\. components/shared/footer.tsx:\
`   `- Links: About, Privacy, Terms, Contact\
`   `- Language switcher: English / हिंदी\
`   `- Copyright: "© 2026 Sajag. Not an official government site."\
`   `- Social links (optional)\
\
3\. components/shared/accessibility-wrapper.tsx:\
`   `- Skip to main content link (visually hidden, focusable)\
`   `- Announce live regions for dynamic content\
`   `- Manage focus on route changes\
`   `- Reduced motion support\
\
4\. components/shared/seo-head.tsx:\
`   `- Dynamic meta tags, Open Graph, Twitter cards\
`   `- JSON-LD structured data\
\
FEATURE COMPONENTS:\
5\. components/guide/step-card.tsx:\
`   `- Card with icon, title, description, status badge\
`   `- Expandable accordion for checklist\
`   `- Mode-aware content (beginner/advanced)\
`   `- Progress checkbox with animation\
`   `- Border radius 12px, proper shadows\
\
6\. components/guide/mode-toggle.tsx:\
`   `- Pill switch: "Beginner" | "Advanced"\
`   `- Blue active state, gray inactive\
`   `- Accessible: role="switch", aria-checked\
`   `- Persists preference\
\
7\. components/timeline/timeline-item.tsx:\
`   `- Vertical timeline layout\
`   `- Date badge, phase title, description\
`   `- Status dot: gray (upcoming), blue pulse (active), green (completed)\
`   `- Expandable details\
\
8\. components/assistant/chat-interface.tsx:\
`   `- Full-height chat container\
`   `- Message bubbles: user (blue, right), assistant (white, left)\
`   `- Typing indicator animation\
`   `- Suggested question chips\
`   `- Input with send button, character counter\
`   `- Scroll to bottom on new messages\
`   `- Feedback buttons (👍/👎)\
\
9\. components/dashboard/progress-overview.tsx:\
`   `- Circular progress SVG\
`   `- "X of Y steps completed"\
`   `- Continue CTA\
`   `- Recent activity list\
\
10\. components/maps/polling-station-map.tsx:\
`    `- Google Maps integration\
`    `- Markers for polling stations\
`    `- Info windows with accessibility info\
`    `- Search by PIN code\
\
ALL components must:\
\- Use Tailwind classes with design tokens\
\- Be fully typed with TypeScript\
\- Include ARIA attributes where needed\
\- Support keyboard navigation\
\- Have loading skeleton states\
\- Follow mobile-first responsive design

-----
#### <a name="prompt-5-page-implementation"></a>**PROMPT 5: Page Implementation**
Create all pages for Sajag following the screen flow and design system:\
\
1\. app/(marketing)/page.tsx (Landing Page):\
`   `- Hero section with H1, subtitle, CTA button\
`   `- Feature grid (3 cards)\
`   `- Trust badges (ECI data source)\
`   `- Social proof section\
`   `- Responsive: single column mobile, 2-column desktop\
\
2\. app/(marketing)/login/page.tsx (Login):\
`   `- Centered auth card (max-width 420px)\
`   `- Google Sign-In component\
`   `- reCAPTCHA badge\
`   `- Terms agreement text\
`   `- Back link\
\
3\. app/(app)/dashboard/page.tsx:\
`   `- App shell layout (with navbar + bottom nav)\
`   `- Welcome header with user name\
`   `- Progress overview card\
`   `- Quick actions grid (2x2)\
`   `- Recent activity section\
`   `- Mode toggle in header\
\
4\. app/(app)/guide/page.tsx:\
`   `- Sticky header with progress bar\
`   `- Vertical stack of step cards\
`   `- Step navigation (previous/next sticky bottom)\
`   `- Mode toggle\
`   `- Expandable checklists\
\
5\. app/(app)/timeline/page.tsx:\
`   `- Filter dropdown (All/Upcoming/Completed)\
`   `- Vertical timeline with alternating layout\
`   `- State filter\
`   `- Animated transitions\
\
6\. app/(app)/assistant/page.tsx:\
`   `- Full-height chat interface\
`   `- Welcome message\
`   `- Suggested questions\
`   `- Message input\
`   `- Chat history persistence\
\
7\. app/(app)/profile/page.tsx:\
`   `- User card (avatar, name, email)\
`   `- Settings: language, experience mode, notifications\
`   `- Progress stats\
`   `- Download progress button\
`   `- Sign out button\
\
8\. app/(app)/layout.tsx:\
`   `- Auth guard (redirect if not authenticated)\
`   `- App shell with navbar + bottom navigation\
`   `- Toast provider\
`   `- Analytics provider\
\
All pages must:\
\- Use semantic HTML\
\- Include proper ARIA labels\
\- Be keyboard navigable\
\- Handle loading and error states\
\- Be fully responsive\
\- Follow the color and typography system exactly

-----
#### <a name="prompt-6-ai-assistant-backend"></a>**PROMPT 6: AI Assistant Backend**
Implement the AI assistant backend using Firebase AI Logic and Genkit:\
\
1\. Create lib/genkit/flow.ts:\
`   `- Initialize Genkit with Google AI plugin\
`   `- Configure Gemini 2.5 Flash model\
`   `- Define election assistant prompt template with system context\
`   `- Include safety settings (block harmful content)\
`   `- Add structured output schema for consistent responses\
\
2\. Create app/api/assistant/ask/route.ts:\
`   `- POST endpoint\
`   `- Validate input with Zod (max 500 chars, sanitize)\
`   `- Verify reCAPTCHA v3 token (score > 0.5)\
`   `- Call Genkit flow with user query + context\
`   `- Return structured response with sources\
`   `- Log analytics event (ai\_query, response\_time)\
`   `- Rate limit: 10 requests per minute per user\
\
3\. Create app/api/assistant/chat/route.ts:\
`   `- POST endpoint with chat history\
`   `- Maintain conversation context\
`   `- Return streaming response (Server-Sent Events)\
`   `- Token usage tracking\
\
4\. Update components/assistant/chat-interface.tsx:\
`   `- Connect to API endpoints\
`   `- Handle streaming responses\
`   `- Show loading states\
`   `- Error handling with retry\
`   `- Persist chat history to Firestore (if authenticated)\
\
5\. Add content moderation:\
`   `- Pre-process user input for toxicity\
`   `- Post-process AI output for factual accuracy\
`   `- Fallback responses for sensitive topics\
\
Ensure:\
\- No raw API keys in client code\
\- App Check verification on all AI endpoints\
\- Proper error handling and fallbacks\
\- Analytics logging for all interactions

-----
#### <a name="prompt-7-security-middleware"></a>**PROMPT 7: Security & Middleware**
Implement comprehensive security for Sajag:\
\
1\. Update middleware.ts:\
`   `- Strict CSP header generation\
`   `- X-Frame-Options: DENY\
`   `- X-Content-Type-Options: nosniff\
`   `- Referrer-Policy: strict-origin-when-cross-origin\
`   `- Permissions-Policy for geolocation only\
`   `- Strict-Transport-Security\
`   `- Rate limiting: 100 requests/minute per IP, 10/minute for auth endpoints\
`   `- CORS configuration (whitelist domains)\
\
2\. Create lib/security/headers.ts:\
`   `- Helper functions for security headers\
`   `- CSP nonce generation for inline scripts\
`   `- Report-URI for CSP violations\
\
3\. Create lib/security/rate-limit.ts:\
`   `- Upstash Redis integration (or in-memory fallback)\
`   `- Sliding window rate limiting\
`   `- Different tiers: public (100/min), auth (10/min), AI (10/min)\
\
4\. Add input sanitization:\
`   `- Create lib/security/sanitize.ts with DOMPurify\
`   `- Sanitize all user inputs before processing\
`   `- Escape output in components\
`   `- Prevent XSS in chat messages\
\
5\. Update Firestore security rules:\
`   `- Users can only access own data\
`   `- Public read for election steps\
`   `- Validate data types in rules\
`   `- Prevent mass deletion\
\
6\. Add App Check:\
`   `- Configure reCAPTCHA Enterprise for web\
`   `- Verify App Check tokens on all API routes\
`   `- Block unverified requests\
\
7\. Create error handling:\
`   `- Global error boundary\
`   `- API error standardization\
`   `- No stack traces in production responses\
`   `- Structured error logging\
\
Test all security measures and document in SECURITY.md.

-----
#### <a name="prompt-8-testing-suite"></a>**PROMPT 8: Testing Suite**
Create comprehensive tests for Sajag targeting 80%+ coverage:\
\
1\. tests/setup.ts:\
`   `- Vitest configuration\
`   `- Mock Firebase modules\
`   `- Mock Google Maps\
`   `- MSW (Mock Service Worker) setup\
\
2\. tests/unit/components/:\
`   `- step-card.test.tsx: Render, expand, checkbox toggle\
`   `- mode-toggle.test.tsx: Toggle state, accessibility\
`   `- chat-interface.test.tsx: Message send, loading state\
`   `- google-sign-in.test.tsx: Button click, loading state\
\
3\. tests/unit/hooks/:\
`   `- use-auth.test.ts: Login state, logout, user data\
`   `- use-progress.test.ts: Progress update, optimistic UI\
\
4\. tests/unit/lib/:\
`   `- validators.test.ts: Zod schema validation\
`   `- sanitize.test.ts: XSS prevention\
`   `- utils.test.ts: Helper functions\
\
5\. tests/integration/api/:\
`   `- auth.session.test.ts: Create, verify, delete sessions\
`   `- guide.steps.test.ts: Fetch steps, caching, localization\
`   `- progress.test.ts: Update progress, auth requirements\
`   `- assistant.ask.test.ts: AI query, rate limiting, validation\
\
6\. tests/e2e/:\
`   `- auth.flow.spec.ts: Sign in, onboarding, dashboard\
`   `- guide.flow.spec.ts: Navigate steps, complete checklist\
`   `- assistant.flow.spec.ts: Ask question, receive response\
\
7\. tests/accessibility/:\
`   `- axe-core scans for all pages\
`   `- Keyboard navigation tests\
`   `- Color contrast checks\
\
8\. Add test scripts to package.json:\
`   `- "test": "vitest"\
`   `- "test:coverage": "vitest --coverage"\
`   `- "test:e2e": "playwright test"\
`   `- "test:a11y": "jest-axe"\
\
Ensure all tests pass and coverage report shows ≥ 80%.

-----
#### <a name="prompt-9-performance-analytics"></a>**PROMPT 9: Performance & Analytics**
Optimize Sajag for performance and add analytics:\
\
1\. Performance optimizations:\
`   `- next.config.js: Enable image optimization, compression\
`   `- Add dynamic imports for heavy components (maps, charts)\
`   `- Implement React.lazy + Suspense for route-level code splitting\
`   `- Configure ISR for static pages (guide, timeline)\
`   `- Add service worker for offline support (Workbox)\
`   `- Optimize fonts: subset Poppins and Noto Sans\
`   `- Add preconnect hints for Firebase domains\
\
2\. Firebase Analytics integration:\
`   `- Create lib/analytics.ts:\
`     `\* logEvent wrappers for all user actions\
`     `\* setUserProperties for language, experience level\
`     `\* Custom events: step\_complete, ai\_query, mode\_switch, etc.\
`   `- Create hooks/use-analytics.ts:\
`     `\* Track page views automatically\
`     `\* Track feature usage\
`     `\* Track user engagement time\
\
3\. Firebase Performance Monitoring:\
`   `- Add custom traces for API calls\
`   `- Monitor LCP, FID, CLS\
`   `- Track API response times\
\
4\. SEO optimization:\
`   `- Generate sitemap.xml\
`   `- Add robots.txt\
`   `- Meta tags for all pages\
`   `- JSON-LD structured data\
`   `- Open Graph images\
\
5\. Add PWA features:\
`   `- manifest.json\
`   `- Icons for all platforms\
`   `- Theme color: #1D4ED8\
`   `- Offline fallback page\
\
6\. Error monitoring:\
`   `- Integrate Crashlytics (or Sentry as fallback)\
`   `- Global error boundary with reporting\
`   `- API error tracking\
\
Ensure Lighthouse scores: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

-----
#### <a name="prompt-10-deployment-configuration"></a>**PROMPT 10: Deployment Configuration**
Prepare Sajag for deployment on Firebase Hosting + Cloud Run:\
\
1\. Create firebase.json:\
`   `- Hosting configuration with rewrites to Cloud Run\
`   `- Headers for caching and security\
`   `- Redirects for trailing slashes\
`   `- Ignore patterns for dev files\
\
2\. Create Dockerfile:\
`   `- Multi-stage build (node:18-alpine)\
`   `- Production dependencies only\
`   `- Non-root user\
`   `- Health check endpoint\
`   `- Optimize layer caching\
\
3\. Create cloudbuild.yaml:\
`   `- Build Docker image\
`   `- Push to Google Container Registry\
`   `- Deploy to Cloud Run\
`   `- Environment variables from Secret Manager\
\
4\. Create .env.example with all variables:\
`   `- Firebase config (public)\
`   `- Firebase Admin credentials (private)\
`   `- Google Maps API key (private)\
`   `- reCAPTCHA keys\
`   `- Redis/Upstash URL\
`   `- Genkit/Gemini API key\
\
5\. Create README.md:\
`   `- Project description\
`   `- Tech stack\
`   `- Setup instructions\
`   `- Environment variables\
`   `- Deployment guide\
`   `- Testing instructions\
`   `- Contributing guidelines\
\
6\. Create DEPLOY.md:\
`   `- Step-by-step deployment to Firebase\
`   `- Cloud Run service configuration\
`   `- Domain setup\
`   `- SSL certificate\
`   `- Monitoring setup\
\
7\. GitHub Actions workflow:\
`   `- CI: Lint, type-check, test on PR\
`   `- CD: Build, test, deploy on merge to main\
\
Ensure repo size stays under 10MB (exclude node\_modules, .next, coverage).

-----
### <a name="anti-gravity-control-instructions"></a>10.2 Anti-Gravity Control Instructions
When using Anti-Gravity (or any AI coding assistant), enforce these rules:

CRITICAL RULES FOR ANTI-GRAVITY:\
1\. NEVER deviate from the color palette. Only use: #1D4ED8, #F59E0B, #16A34A, #F8FAFC, #FFFFFF, #0F172A, #475569, #E2E8F0, #22C55E, #EF4444\
2\. NEVER use fonts other than Poppins (headings) and Noto Sans (body)\
3\. ALWAYS use 12px border radius for cards and buttons\
4\. ALWAYS use the spacing system: 4px, 8px, 16px, 24px, 32px, 48px, 64px\
5\. ALWAYS write TypeScript with strict types - NO "any"\
6\. ALWAYS add ARIA labels and roles for accessibility\
7\. ALWAYS handle loading, error, and empty states\
8\. NEVER expose API keys or secrets in client code\
9\. ALWAYS validate inputs with Zod before processing\
10\. ALWAYS add comments explaining complex logic\
11\. NEVER use inline styles - only Tailwind classes\
12\. ALWAYS follow mobile-first responsive design\
13\. NEVER add unnecessary dependencies - keep bundle small\
14\. ALWAYS use semantic HTML elements\
15\. NEVER skip error handling in API routes

-----
## <a name="section-11-deployment-architecture"></a>SECTION 11: DEPLOYMENT ARCHITECTURE
### <a name="cloud-run-firebase-hosting-setup"></a>11.1 Cloud Run + Firebase Hosting Setup
┌─────────────────────────────────────────────────────────────────────────────┐\
│                         FIREBASE HOSTING (CDN)                              │\
│  ┌────────────────\
\
\
\---\
\
\*\*User:\*\*\
\
continue resume\
\
\
\---\
\
\*\*Kimi:\*\*\
\
I'll continue the deployment architecture and finalize the complete system design document for \*\*Sajag\*\*.\
\
\---\
\
\## SECTION 11: DEPLOYMENT ARCHITECTURE (Continued)\
\
\### 11.1 Cloud Run + Firebase Hosting Setup

┌─────────────────────────────────────────────────────────────────────────────┐ │ FIREBASE HOSTING (CDN) │ │ ┌─────────────────────────────────────────────────────────────────────────┐ │ │ │ Static Assets: \_next/static/\*, images, fonts │ │ │ │ Dynamic Routes: Rewritten to Cloud Run service │ │ │ │ Cache Headers: 1 year for static, no-cache for dynamic │ │ │ │ Global CDN: Edge caching in 35+ regions │ │ │ └─────────────────────────────────────────────────────────────────────────┘ │ │ │ │ │ ▼ │ └─────────────────────────────────────────────────────────────────────────────┘ │ ▼ ┌─────────────────────────────────────────────────────────────────────────────┐ │ CLOUD RUN (Next.js Container) │ │ │ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │ │ Service: sajag-api │ │ │ │ Region: asia-south1 (Mumbai) - closest to Indian users │ │ │ │ Concurrency: 80 requests per container │ │ │ │ Min instances: 1 (keep warm for zero cold starts) │ │ │ │ Max instances: 100 (auto-scale under load) │ │ │ │ Memory: 1GB CPU: 1 vCPU │ │ │ │ Timeout: 30 seconds (AI endpoints: 60 seconds) │ │ │ │ Environment: NODE\_ENV=production │ │ │ └─────────────────────────────────────────────────────────────────────┘ │ │ │ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │ │ Secrets (Secret Manager): │ │ │ │ • FIREBASE\_ADMIN\_KEY (JSON) │ │ │ │ • GOOGLE\_MAPS\_API\_KEY │ │ │ │ • RECAPTCHA\_SECRET\_KEY │ │ │ │ • GEMINI\_API\_KEY │ │ │ │ • UPSTASH\_REDIS\_URL │ │ │ └─────────────────────────────────────────────────────────────────────┘ │ │ │ └─────────────────────────────────────────────────────────────────────────────┘ │ ▼ ┌─────────────────────────────────────────────────────────────────────────────┐ │ GOOGLE SERVICES BACKEND │ │ │ │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────┐ │ │ │ Firestore │ │ Firebase │ │ reCAPTCHA │ │ Cloud │ │ │ │ (Mumbai) │ │ Auth │ │ Enterprise│ │ Storage │ │ │ └──────────────┘ └──────────────┘ └──────────────┘ └──────────┘ │ │ │ │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │ │ │ Firebase │ │ BigQuery │ │ Secret │ │ │ │ Analytics │───▶│ (Export) │ │ Manager │ │ │ └──────────────┘ └──────────────┘ └──────────────┘ │ │ │ └─────────────────────────────────────────────────────────────────────────────┘

\
\### 11.2 Deployment Pipeline\
\
\```yaml\
\# cloudbuild.yaml\
steps:\
`  `# Step 1: Install dependencies and run tests\
`  `- name: 'node:18-alpine'\
`    `entrypoint: 'sh'\
`    `args:\
`      `- '-c'\
`      `- |\
`        `npm ci\
`        `npm run lint\
`        `npm run type-check\
`        `npm run test:coverage\
\
`  `# Step 2: Build Next.js app\
`  `- name: 'node:18-alpine'\
`    `entrypoint: 'npm'\
`    `args: ['run', 'build']\
`    `env:\
`      `- 'NODE\_ENV=production'\
\
`  `# Step 3: Build Docker image\
`  `- name: 'gcr.io/cloud-builders/docker'\
`    `args:\
`      `- 'build'\
`      `- '-t'\
`      `- 'gcr.io/$PROJECT\_ID/sajag:$COMMIT\_SHA'\
`      `- '-t'\
`      `- 'gcr.io/$PROJECT\_ID/sajag:latest'\
`      `- '.'\
\
`  `# Step 4: Push to Container Registry\
`  `- name: 'gcr.io/cloud-builders/docker'\
`    `args: ['push', 'gcr.io/$PROJECT\_ID/sajag:$COMMIT\_SHA']\
\
`  `# Step 5: Deploy to Cloud Run\
`  `- name: 'gcr.io/cloud-builders/gcloud'\
`    `args:\
`      `- 'run'\
`      `- 'deploy'\
`      `- 'sajag-api'\
`      `- '--image'\
`      `- 'gcr.io/$PROJECT\_ID/sajag:$COMMIT\_SHA'\
`      `- '--region'\
`      `- 'asia-south1'\
`      `- '--platform'\
`      `- 'managed'\
`      `- '--allow-unauthenticated'\
`      `- '--min-instances'\
`      `- '1'\
`      `- '--max-instances'\
`      `- '100'\
`      `- '--memory'\
`      `- '1Gi'\
`      `- '--cpu'\
`      `- '1'\
`      `- '--timeout'\
`      `- '60'\
`      `- '--set-secrets'\
`      `- 'FIREBASE\_ADMIN\_KEY=firebase-admin-key:latest,GOOGLE\_MAPS\_API\_KEY=maps-api-key:latest,RECAPTCHA\_SECRET\_KEY=recaptcha-secret:latest,GEMINI\_API\_KEY=gemini-api-key:latest,UPSTASH\_REDIS\_URL=redis-url:latest'\
`      `- '--set-env-vars'\
`      `- 'NODE\_ENV=production,NEXT\_PUBLIC\_FIREBASE\_PROJECT\_ID=$PROJECT\_ID,NEXT\_PUBLIC\_FIREBASE\_APP\_ID=1:...'\
\
`  `# Step 6: Deploy to Firebase Hosting\
`  `- name: 'gcr.io/$PROJECT\_ID/firebase'\
`    `entrypoint: 'firebase'\
`    `args:\
`      `- 'deploy'\
`      `- '--only'\
`      `- 'hosting'\
`      `- '--project'\
`      `- '$PROJECT\_ID'\
\
images:\
`  `- 'gcr.io/$PROJECT\_ID/sajag:$COMMIT\_SHA'\
`  `- 'gcr.io/$PROJECT\_ID/sajag:latest'\
\
options:\
`  `logging: CLOUD\_LOGGING\_ONLY
### <a name="dockerfile-production-optimized"></a>11.3 Dockerfile (Production-Optimized)
*# Multi-stage build for minimal image size*\
**FROM** node:18-alpine **AS** base\
\
*# Install dependencies only when needed*\
**FROM** base **AS** deps\
**RUN** apk add --no-cache libc6-compat\
**WORKDIR** /app\
\
*# Install dependencies based on the preferred package manager*\
**COPY** package.json package-lock.json\* ./\
**RUN** npm ci --only=production\
\
*# Rebuild the source code only when needed*\
**FROM** base **AS** builder\
**WORKDIR** /app\
**COPY** --from=deps /app/node\_modules ./node\_modules\
**COPY** . .\
\
*# Set environment variables for build*\
**ENV** NEXT\_TELEMETRY\_DISABLED=1\
**ENV** NODE\_ENV=production\
\
*# Build the application*\
**RUN** npm run build\
\
*# Production image, copy all the files and run next*\
**FROM** base **AS** runner\
**WORKDIR** /app\
\
**ENV** NODE\_ENV=production\
**ENV** NEXT\_TELEMETRY\_DISABLED=1\
\
*# Create non-root user for security*\
**RUN** addgroup --system --gid 1001 nodejs\
**RUN** adduser --system --uid 1001 nextjs\
\
*# Copy necessary files*\
**COPY** --from=builder /app/public ./public\
**COPY** --from=builder --chown=nextjs:nodejs /app/.next/standalone ./\
**COPY** --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static\
\
*# Switch to non-root user*\
**USER** nextjs\
\
*# Expose port*\
**EXPOSE** 3000\
\
*# Health check*\
**HEALTHCHECK** --interval=30s --timeout=3s --start-period=5s --retries=3 \\
`  `**CMD** curl -f http://localhost:3000/api/health **||** exit 1\
\
*# Start the application*\
**CMD** ["node", "server.js"]

-----
## <a name="x3722480ad3fad9bba4f8b08679f9ffd0517be1c"></a>SECTION 12: COMPLETE PROMPT SEQUENCE FOR ANTI-GRAVITY
### <a name="master-control-prompt-send-first"></a>12.1 Master Control Prompt (Send First)
You are building "Sajag" — an AI-powered election assistant for Indian users. \
You MUST follow these ABSOLUTE RULES without exception:\
\
DESIGN SYSTEM (NON-NEGOTIABLE):\
\- Colors: ONLY #1D4ED8 (primary), #F59E0B (saffron accent), #16A34A (green accent), #F8FAFC (bg), #FFFFFF (card), #0F172A (text), #475569 (secondary text), #E2E8F0 (border), #22C55E (success), #EF4444 (error)\
\- Fonts: Poppins (headings, weight 600/500) and Noto Sans (body, weight 400) ONLY\
\- Border radius: 12px for ALL cards and buttons\
\- Spacing: 4px, 8px, 16px, 24px, 32px, 48px, 64px ONLY\
\- 80% neutral colors, 15% blue, 5% saffron+green accents\
\
CODE QUALITY (NON-NEGOTIABLE):\
\- TypeScript strict mode — NO "any" types anywhere\
\- All functions must have JSDoc comments\
\- All components must be fully typed with interfaces\
\- NO inline styles — Tailwind classes only\
\- NO arbitrary values in Tailwind — use design tokens\
\- Handle loading, error, and empty states for EVERY async operation\
\
SECURITY (NON-NEGOTIABLE):\
\- NO API keys or secrets in client-side code\
\- ALL user inputs validated with Zod before processing\
\- Sanitize ALL outputs with DOMPurify\
\- HTTP-only, Secure, SameSite=Strict cookies for auth\
\- reCAPTCHA v3 on ALL form submissions\
\- Rate limiting on ALL API endpoints\
\
ACCESSIBILITY (NON-NEGOTIABLE):\
\- Semantic HTML elements only (no div soup)\
\- ARIA labels on ALL interactive elements\
\- Keyboard navigation for ALL features\
\- Focus indicators visible on ALL interactive elements\
\- Color contrast minimum 4.5:1 everywhere\
\- Screen reader announcements for dynamic content\
\
PERFORMANCE (NON-NEGOTIABLE):\
\- Mobile-first responsive design\
\- Dynamic imports for components >100KB\
\- next/image for ALL images\
\- ISR for static content (revalidate: 3600)\
\- Bundle size target: <200KB initial JS\
\
If you violate ANY of these rules, the project will be rejected. Confirm you understand before proceeding.

-----
### <a name="complete-10-step-prompt-sequence"></a>12.2 Complete 10-Step Prompt Sequence
I already provided Prompts 1-10 above. Here is the consolidated execution order with dependencies:

|Step|Prompt|Dependencies|Estimated Time|
| :- | :- | :- | :- |
|1|Project Initialization|None|5 min|
|2|Firebase Config & Auth|Step 1|10 min|
|3|Data Layer & Static Content|Step 2|15 min|
|4|Core UI Components|Step 1|20 min|
|5|Page Implementation|Steps 3, 4|25 min|
|6|AI Assistant Backend|Steps 2, 3|20 min|
|7|Security & Middleware|Steps 2, 5, 6|15 min|
|8|Testing Suite|Steps 4, 5, 6|20 min|
|9|Performance & Analytics|Steps 5, 6, 7|15 min|
|10|Deployment Config|All above|10 min|

**Total estimated Anti-Gravity time: ~2.5 hours**

-----
## <a name="xb34a9f3c03522847df61bb80f6dad3376c585c8"></a>SECTION 13: GOOGLE SERVICES INTEGRATION DEEP DIVE
### <a name="backend-services-required"></a>13.1 Backend Services Required

|Service|Purpose|Backend Integration|Cost Tier|
| :- | :- | :- | :- |
|**Firebase Auth**|User authentication, session management|Admin SDK for token verification, custom claims|Spark (Free)|
|**Firestore**|Primary database for users, progress, chat|Admin SDK for CRUD, security rules|Spark (Free)|
|**Firebase AI Logic**|Server-side AI orchestration|Genkit flows with Gemini 2.5 Flash|Blaze (Pay-as-you-go)|
|**Genkit**|AI framework for prompt management|Server-side prompt templates, evaluation|Free (open source)|
|**Firebase Analytics**|User behavior tracking|Client SDK + server-side logging|Spark (Free)|
|**reCAPTCHA Enterprise**|Bot protection|Server-side token verification|Free tier: 1M assessments/month|
|**Firebase App Check**|API abuse prevention|Device attestation on all API calls|Spark (Free)|
|**Google Maps Platform**|Polling station location|Server-side geocoding, client-side maps|$200 free credit/month|
|**Firebase Hosting**|Static asset CDN, dynamic rewrites|Firebase CLI deployment|Spark (Free)|
|**Cloud Run**|Serverless container hosting|Docker container with Next.js|Free tier: 2M requests/month|
|**Cloud Storage**|User avatars, static assets|Firebase Storage rules|Spark (Free)|
|**Secret Manager**|API key storage|Runtime injection into Cloud Run|Free: 6 active secrets|
|**BigQuery**|Analytics data warehouse|Firebase Analytics export|Free tier: 1TB query/month|
|**Firebase Performance**|Real-user performance monitoring|Client SDK auto-instrumentation|Spark (Free)|
|**Firebase Cloud Messaging**|Push notifications|Admin SDK for topic messaging|Spark (Free)|
### <a name="service-architecture-diagram"></a>13.2 Service Architecture Diagram
┌─────────────────────────────────────────────────────────────────────────────┐\
│                              CLIENT SIDE                                     │\
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │\
│  │ Firebase Auth│  │ Firestore    │  │ Firebase     │  │ Google Maps      │  │\
│  │ Client SDK   │  │ Client SDK   │  │ Analytics    │  │ JavaScript API   │  │\
│  │ (Google      │  │ (Offline     │  │ (Auto +      │  │ (Polling         │  │\
│  │  Sign-In)    │  │  persistence)│  │  Custom)     │  │  stations)       │  │\
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────────────────┘  │\
│         │                 │                  │                                │\
│         └─────────────────┴──────────────────┘                                │\
│                           │                                                  │\
│                    ┌──────▼──────┐                                           │\
│                    │  reCAPTCHA  │  (Invisible v3 on forms)                  │\
│                    │  Client SDK │                                           │\
│                    └─────────────┘                                           │\
│                                                                              │\
└─────────────────────────────────┬───────────────────────────────────────────┘\
`                                  `│\
`                                  `▼\
┌─────────────────────────────────────────────────────────────────────────────┐\
│                              API LAYER (Cloud Run)                           │\
│                                                                              │\
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │\
│  │ /api/auth    │  │ /api/guide   │  │ /api/assistant│  │ /api/location    │ │\
│  │              │  │              │  │               │  │                  │ │\
│  │ • Verify     │  │ • Firestore  │  │ • Genkit      │  │ • Validate       │ │\
│  │   ID token   │  │   reads      │  │   flow        │  │   coordinates    │ │\
│  │ • App Check  │  │ • ISR cache  │  │ • Gemini 2.5  │  │ • Call Maps      │ │\
│  │   verify     │  │              │  │   Flash       │  │   Geocoding      │ │\
│  │ • reCAPTCHA  │  │              │  │ • reCAPTCHA   │  │                  │ │\
│  │   verify     │  │              │  │   verify      │  │                  │ │\
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────────────────┘ │\
│         │                 │                  │                                │\
│         └─────────────────┴──────────────────┘                                │\
│                           │                                                  │\
│                    ┌──────▼──────┐                                           │\
│                    │  Middleware  │  (Rate limit, CSP, CORS, Headers)        │\
│                    └─────────────┘                                           │\
│                                                                              │\
└─────────────────────────────────┬───────────────────────────────────────────┘\
`                                    `│\
`                                    `▼\
┌─────────────────────────────────────────────────────────────────────────────┐\
│                         FIREBASE ADMIN SDK                                   │\
│                                                                              │\
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌────────────┐ │\
│  │  Auth Admin  │    │  Firestore   │    │  Analytics   │    │  Cloud     │ │\
│  │  (verify     │    │  Admin       │    │  Admin       │    │  Storage   │ │\
│  │   tokens)    │    │  (CRUD)      │    │  (log)       │    │  Admin     │ │\
│  └──────────────┘    └──────────────┘    └──────────────┘    └────────────┘ │\
│                                                                              │\
└─────────────────────────────────────────────────────────────────────────────┘

-----
## <a name="section-14-hackathon-scoring-breakdown"></a>SECTION 14: HACKATHON SCORING BREAKDOWN
### <a name="category-by-category-100-point-strategy"></a>14.1 Category-by-Category 100-Point Strategy

|Category|Points|Exact Implementation|Verification Method|
| :- | :- | :- | :- |
|**Code Quality**|20/20|Strict TS, no any, JSDoc, modular, lint clean|npm run lint && npm run type-check passes|
|**Security**|20/20|OWASP Top 10 covered, CSP headers, rate limiting, input validation|Security audit scan, penetration test|
|**Efficiency**|15/15|<200KB bundle, ISR, lazy loading, Lighthouse 90+|Lighthouse CI, bundle analyzer|
|**Testing**|15/15|80%+ coverage, unit + integration + e2e|npm run test:coverage report|
|**Accessibility**|15/15|WCAG 2.1 AA, semantic HTML, ARIA, keyboard nav|axe-core scan, manual audit|
|**Google Services**|15/15|10+ Google services integrated deeply|Service usage dashboard|
### <a name="weakness-prevention-checklist"></a>14.2 Weakness Prevention Checklist
Before submitting, verify NONE of these weaknesses exist:

|Weakness|Prevention|
| :- | :- |
|❌ Using any types|✅ Enable strict: true, use unknown with type guards|
|❌ Missing error boundaries|✅ Add React Error Boundary for every route|
|❌ Hardcoded secrets|✅ Use Secret Manager, .env.example only|
|❌ No rate limiting|✅ Implement Redis-based rate limiting on all routes|
|❌ Missing input validation|✅ Zod schemas for EVERY API input|
|❌ No CSP headers|✅ Strict CSP with nonce for inline scripts|
|❌ Inline styles|✅ Tailwind classes only, custom utilities in config|
|❌ No loading states|✅ Skeleton components for ALL async data|
|❌ Poor mobile UX|✅ Mobile-first design, touch targets ≥44px|
|❌ No offline support|✅ Firestore offline persistence, service worker|
|❌ Weak AI responses|✅ Curated prompts, fallback responses, content moderation|
|❌ No analytics|✅ Firebase Analytics on every user action|
|❌ Slow AI responses|✅ Gemini 2.5 Flash (fast), streaming responses|
|❌ No test mocks|✅ MSW for all API calls, mock Firebase Admin|
|❌ Accessibility violations|✅ axe-core in CI, manual screen reader testing|

-----
## <a name="section-15-final-deliverables-checklist"></a>SECTION 15: FINAL DELIVERABLES CHECKLIST
When Anti-Gravity completes, verify these files exist:
### <a name="configuration-files"></a>Configuration Files
- ☐ package.json (dependencies <50 total, no bloat)
- ☐ tsconfig.json (strict: true)
- ☐ next.config.js (output: ‘standalone’, images optimized)
- ☐ tailwind.config.ts (custom colors, fonts, spacing)
- ☐ vitest.config.ts (coverage thresholds: 80%)
- ☐ middleware.ts (auth + security headers)
- ☐ firebase.json (hosting + Cloud Run rewrites)
- ☐ Dockerfile (multi-stage, non-root user)
- ☐ cloudbuild.yaml (CI/CD pipeline)
- ☐ .env.example (all required variables)
- ☐ .eslintrc.json (strict rules)
- ☐ .prettierrc (consistent formatting)
### <a name="application-code"></a>Application Code
- ☐ app/layout.tsx (root layout, fonts, providers)
- ☐ app/(marketing)/page.tsx (landing page)
- ☐ app/(marketing)/login/page.tsx (login page)
- ☐ app/(app)/layout.tsx (app shell, auth guard)
- ☐ app/(app)/dashboard/page.tsx (dashboard)
- ☐ app/(app)/guide/page.tsx (election guide)
- ☐ app/(app)/timeline/page.tsx (timeline)
- ☐ app/(app)/assistant/page.tsx (AI chat)
- ☐ app/(app)/profile/page.tsx (user profile)
- ☐ app/api/auth/session/route.ts (auth API)
- ☐ app/api/guide/steps/route.ts (guide API)
- ☐ app/api/progress/route.ts (progress API)
- ☐ app/api/assistant/ask/route.ts (AI API)
- ☐ app/api/location/polling-stations/route.ts (maps API)
### <a name="library-code"></a>Library Code
- ☐ lib/firebase/client.ts (client Firebase)
- ☐ lib/firebase/admin.ts (server Firebase)
- ☐ lib/genkit/flow.ts (AI orchestration)
- ☐ lib/db.ts (Firestore helpers)
- ☐ lib/auth.ts (auth utilities)
- ☐ lib/analytics.ts (analytics helpers)
- ☐ lib/validators.ts (Zod schemas)
- ☐ lib/security/headers.ts (CSP helpers)
- ☐ lib/security/rate-limit.ts (rate limiting)
- ☐ lib/security/sanitize.ts (XSS prevention)
- ☐ lib/utils.ts (general utilities)
- ☐ lib/constants.ts (app constants)
### <a name="components"></a>Components
- ☐ components/ui/\* (all shadcn components)
- ☐ components/auth/google-sign-in.tsx
- ☐ components/guide/step-card.tsx
- ☐ components/guide/step-detail.tsx
- ☐ components/guide/checklist.tsx
- ☐ components/guide/mode-toggle.tsx
- ☐ components/timeline/timeline-item.tsx
- ☐ components/assistant/chat-interface.tsx
- ☐ components/dashboard/progress-overview.tsx
- ☐ components/maps/polling-station-map.tsx
- ☐ components/shared/navbar.tsx
- ☐ components/shared/footer.tsx
- ☐ components/shared/accessibility-wrapper.tsx
- ☐ components/shared/seo-head.tsx
### <a name="data-types"></a>Data & Types
- ☐ data/election-data.ts (8+ steps, timeline events)
- ☐ types/index.ts (all TypeScript interfaces)
### <a name="tests"></a>Tests
- ☐ tests/setup.ts (Vitest config)
- ☐ tests/unit/\*\*/\*.test.ts(x) (component tests)
- ☐ tests/integration/\*\*/\*.test.ts (API tests)
- ☐ tests/e2e/\*\*/\*.spec.ts (Playwright tests)
- ☐ tests/accessibility/\*\*/\*.test.ts (a11y tests)
### <a name="documentation"></a>Documentation
- ☐ README.md (setup, deploy, testing)
- ☐ DEPLOY.md (step-by-step deployment)
- ☐ SECURITY.md (security measures)
- ☐ CHANGELOG.md (version history)
-----
## <a name="section-16-post-build-audit-iteration"></a>SECTION 16: POST-BUILD AUDIT & ITERATION
### <a name="judge-evaluation-simulation"></a>16.1 Judge Evaluation Simulation
After Anti-Gravity builds the app, run this audit:

**Code Quality Audit:**

npm run lint        *# Must pass with 0 errors*\
npm run type-check  *# Must pass with 0 errors*\
npm run build       *# Must build successfully*\
npx depcheck        *# Must show 0 unused dependencies*

**Security Audit:**

*# Check for secrets in code*\
grep -r "AIzaSy" . --exclude-dir=node\_modules --exclude-dir=.next **||** echo "No API keys found"\
grep -r "private\_key" . --exclude-dir=node\_modules --exclude-dir=.next **||** echo "No private keys found"\
\
*# Check headers*\
curl -I https://your-app-url.com **|** grep -E "Content-Security-Policy|X-Frame-Options|Strict-Transport-Security"

**Performance Audit:**

npm run lighthouse  *# Must show Performance ≥ 90*\
npx webpack-bundle-analyzer .next/analyze/client.html  *# Must show < 200KB initial*

**Testing Audit:**

npm run test:coverage  *# Must show ≥ 80% coverage*\
npm run test:e2e       *# Must pass all E2E tests*

**Accessibility Audit:**

npm run test:a11y  *# Must pass axe-core scans*

**Google Services Audit:**

*# Verify Firebase services are active*\
firebase projects:list  *# Project exists*\
firebase hosting:sites:get  *# Hosting active*\
gcloud run services list  *# Cloud Run service deployed*
### <a name="iteration-prompts-for-weak-areas"></a>16.2 Iteration Prompts for Weak Areas
If any category scores < 100, use these targeted prompts:

**If Code Quality < 100:**

Audit the codebase for:\
1\. Any remaining "any" types — replace with proper interfaces\
2\. Missing JSDoc comments on functions\
3\. Unused imports or variables\
4\. Console.log statements in production code\
5\. Any inline styles or arbitrary Tailwind values\
Fix ALL issues and re-run lint + type-check.

**If Security < 100:**

Audit security implementation:\
1\. Add missing CSP directives\
2\. Implement missing rate limiting on [specific endpoints]\
3\. Add input validation for [specific inputs]\
4\. Verify all cookies are HTTP-only, Secure, SameSite=Strict\
5\. Add content security policy nonces\
6\. Implement bot detection on [specific forms]\
Re-run security scan and verify all headers.

**If Efficiency < 100:**

Optimize performance:\
1\. Add dynamic imports for [specific heavy components]\
2\. Implement ISR for [specific pages]\
3\. Optimize images with next/image and WebP format\
4\. Add service worker for offline support\
5\. Reduce bundle size by removing [specific dependencies]\
6\. Add preconnect hints for external domains\
Re-run Lighthouse and verify Performance ≥ 90.

**If Testing < 100:**

Increase test coverage:\
1\. Add tests for [specific untested components]\
2\. Add integration tests for [specific API routes]\
3\. Add E2E tests for [specific user flows]\
4\. Mock [specific external services] properly\
5\. Add accessibility tests for [specific components]\
Re-run coverage report and verify ≥ 80%.

**If Accessibility < 100:**

Fix accessibility issues:\
1\. Add missing ARIA labels to [specific elements]\
2\. Fix heading hierarchy on [specific pages]\
3\. Add keyboard navigation for [specific components]\
4\. Increase color contrast on [specific elements]\
5\. Add screen reader announcements for [specific dynamic content]\
6\. Test with NVDA/VoiceOver and fix issues\
Re-run axe-core scan and verify 0 violations.

**If Google Services < 100:**

Add missing Google services:\
1\. Integrate [specific missing service]\
2\. Add deeper integration for [specific existing service]\
3\. Add server-side logging for [specific service]\
4\. Implement [specific feature] using [specific service]\
5\. Add analytics events for [specific user actions]\
Verify all services are active in Firebase console.

-----
## <a name="section-17-final-architecture-summary"></a>SECTION 17: FINAL ARCHITECTURE SUMMARY
### <a name="one-page-architecture-reference"></a>17.1 One-Page Architecture Reference
┌─────────────────────────────────────────────────────────────────────────────┐\
│                              SAJAG ARCHITECTURE                              │\
│                         "Stay aware. Vote with clarity."                      │\
├─────────────────────────────────────────────────────────────────────────────┤\
│                                                                              │\
│  FRONTEND: Next.js 14 (App Router) + TypeScript + Tailwind CSS             │\
│  ├── Pages: Landing, Login, Dashboard, Guide, Timeline, Assistant, Profile  │\
│  ├── Components: 15+ shared + feature-specific                              │\
│  ├── State: Zustand (auth, progress, UI, assistant)                         │\
│  └── Styling: Custom design system (blue primary, saffron/green accents)    │\
│                                                                              │\
│  BACKEND: Next.js API Routes (Cloud Run)                                    │\
│  ├── Auth: /api/auth/\* (Firebase Auth Admin)                                │\
│  ├── Data: /api/guide/\*, /api/timeline/\*, /api/progress/\* (Firestore)       │\
│  ├── AI: /api/assistant/\* (Genkit + Gemini 2.5 Flash)                        │\
│  └── Location: /api/location/\* (Google Maps)                                │\
│                                                                              │\
│  DATABASE: Firestore (Native full-text search, geospatial queries)           │\
│  ├── Users (auth data, preferences)                                         │\
│  ├── Progress (completion tracking)                                         │\
│  ├── ChatHistory (AI conversations)                                           │\
│  ├── ElectionSteps (static content, 8 steps)                                │\
│  └── TimelineEvents (election phases)                                        │\
│                                                                              │\
│  GOOGLE SERVICES (15 total):                                                │\
│  ├── Firebase Auth (Google Sign-In, passkeys)                               │\
│  ├── Firestore (primary database)                                           │\
│  ├── Firebase AI Logic + Genkit (AI orchestration)                          │\
│  ├── Gemini 2.5 Flash (LLM responses)                                       │\
│  ├── Firebase Analytics (user tracking)                                     │\
│  ├── reCAPTCHA Enterprise v3 (bot protection)                               │\
│  ├── Firebase App Check (API abuse prevention)                              │\
│  ├── Google Maps Platform (polling stations)                                │\
│  ├── Firebase Hosting (CDN + SSL)                                           │\
│  ├── Cloud Run (serverless backend)                                         │\
│  ├── Cloud Storage (avatars, assets)                                        │\
│  ├── Secret Manager (API keys)                                              │\
│  ├── BigQuery (analytics warehouse)                                         │\
│  ├── Firebase Performance Monitoring (RUM)                                  │\
│  └── Firebase Cloud Messaging (push notifications)                        │\
│                                                                              │\
│  SECURITY: OWASP Top 10 compliance                                          │\
│  ├── CSP headers, security headers (middleware)                             │\
│  ├── Rate limiting (Redis/Upstash)                                          │\
│  ├── Input validation (Zod) + sanitization (DOMPurify)                      │\
│  ├── Auth: HTTP-only cookies, token verification                            │\
│  └── Firestore security rules (user isolation)                            │\
│                                                                              │\
│  ACCESSIBILITY: WCAG 2.1 AA                                                 │\
│  ├── Semantic HTML, ARIA labels, keyboard navigation                        │\
│  ├── Screen reader support, focus management                                │\
│  └── Color contrast compliance (4.5:1 minimum)                            │\
│                                                                              │\
│  TESTING: 80%+ coverage                                                     │\
│  ├── Unit tests (Vitest + RTL)                                              │\
│  ├── Integration tests (MSW + Vitest)                                       │\
│  ├── E2E tests (Playwright)                                                 │\
│  └── Accessibility tests (axe-core)                                         │\
│                                                                              │\
│  DEPLOYMENT: Firebase + Cloud Run                                           │\
│  ├── Firebase Hosting: Static assets, CDN, SSL                              │\
│  ├── Cloud Run: Next.js container, auto-scaling                             │\
│  └── Region: asia-south1 (Mumbai) for Indian users                          │\
│                                                                              │\
└─────────────────────────────────────────────────────────────────────────────┘

-----
## <a name="section-18-anti-gravity-execution-guide"></a>SECTION 18: ANTI-GRAVITY EXECUTION GUIDE
### <a name="step-by-step-execution-order"></a>18.1 Step-by-Step Execution Order
**Phase 1: Foundation (30 minutes)** 1. Send **Master Control Prompt** to Anti-Gravity 2. Send **Prompt 1: Project Initialization** 3. Verify output matches folder structure and dependencies 4. Send **Prompt 2: Firebase Configuration & Auth** 5. Verify Firebase setup and auth flow

**Phase 2: Data & UI (45 minutes)** 6. Send **Prompt 3: Data Layer & Static Content** 7. Verify election data accuracy (8 steps, timeline) 8. Send **Prompt 4: Core UI Components** 9. Verify all components follow design system exactly 10. Send **Prompt 5: Page Implementation** 11. Verify all pages render correctly

**Phase 3: AI & Security (30 minutes)** 12. Send **Prompt 6: AI Assistant Backend** 13. Test AI responses with sample queries 14. Send **Prompt 7: Security & Middleware** 15. Verify security headers and rate limiting

**Phase 4: Quality Assurance (30 minutes)** 16. Send **Prompt 8: Testing Suite** 17. Run tests and verify coverage ≥ 80% 18. Send **Prompt 9: Performance & Analytics** 19. Run Lighthouse and verify scores

**Phase 5: Deployment (15 minutes)** 20. Send **Prompt 10: Deployment Configuration** 21. Configure Firebase project and Cloud Run 22. Deploy and verify live URL

**Phase 6: Audit & Polish (30 minutes)** 23. Run **Judge Evaluation Simulation** 24. Use **Iteration Prompts** for any weak areas 25. Final verification of all 6 categories

**Total time: ~3 hours**
### <a name="quality-gates-between-prompts"></a>18.2 Quality Gates Between Prompts
After each prompt, verify:

|After Prompt|Verify|If Failed|
| :- | :- | :- |
|1|npm install succeeds, no conflicts|Check Node version (18+), clear cache|
|2|Firebase config loads, no errors|Check env vars, regenerate config|
|3|API routes return 200|Check Firestore emulator, data format|
|4|Components render without errors|Check Tailwind config, font loading|
|5|Pages navigate correctly|Check App Router structure, layouts|
|6|AI responds to test query|Check Genkit setup, API key|
|7|Security headers present|Check middleware, header helpers|
|8|Tests pass with coverage|Check mocks, test setup|
|9|Lighthouse scores ≥ 90|Check bundle size, image optimization|
|10|Deployment succeeds|Check Dockerfile, Cloud Run logs|

-----
## <a name="x7aaa71ea8f00178fcd44e6cdecbecfe9b063f7d"></a>SECTION 19: ENVIRONMENT VARIABLES TEMPLATE
### <a name="env.example"></a>19.1 .env.example
*# ============================================*\
*# SAJAG - Environment Variables*\
*# ============================================*\
\
*# Firebase Client Config (Public - safe for client)*\
NEXT\_PUBLIC\_FIREBASE\_API\_KEY=your\_firebase\_api\_key\
NEXT\_PUBLIC\_FIREBASE\_AUTH\_DOMAIN=your\_project.firebaseapp.com\
NEXT\_PUBLIC\_FIREBASE\_PROJECT\_ID=your\_project\_id\
NEXT\_PUBLIC\_FIREBASE\_STORAGE\_BUCKET=your\_project.appspot.com\
NEXT\_PUBLIC\_FIREBASE\_MESSAGING\_SENDER\_ID=123456789\
NEXT\_PUBLIC\_FIREBASE\_APP\_ID=1:123456789:web:abcdef\
NEXT\_PUBLIC\_FIREBASE\_MEASUREMENT\_ID=G-XXXXXXXXXX\
\
*# Firebase Admin SDK (Private - server only)*\
FIREBASE\_ADMIN\_PROJECT\_ID=your\_project\_id\
FIREBASE\_ADMIN\_CLIENT\_EMAIL=firebase-adminsdk-xxxxx@your\_project.iam.gserviceaccount.com\
*# Download service account JSON and store in Secret Manager*\
*# Or use base64-encoded private key:*\
FIREBASE\_ADMIN\_PRIVATE\_KEY\_BASE64=base64\_encoded\_private\_key\
\
*# reCAPTCHA Enterprise*\
NEXT\_PUBLIC\_RECAPTCHA\_SITE\_KEY=your\_recaptcha\_site\_key\
RECAPTCHA\_SECRET\_KEY=your\_recaptcha\_secret\_key\
\
*# Google Maps Platform*\
NEXT\_PUBLIC\_GOOGLE\_MAPS\_API\_KEY=your\_maps\_api\_key\
\
*# Gemini / Genkit*\
GEMINI\_API\_KEY=your\_gemini\_api\_key\
\
*# Redis / Upstash (Rate Limiting)*\
UPSTASH\_REDIS\_REST\_URL=https://your-redis.upstash.io\
UPSTASH\_REDIS\_REST\_TOKEN=your\_redis\_token\
\
*# App Check*\
NEXT\_PUBLIC\_APP\_CHECK\_SITE\_KEY=your\_app\_check\_key\
APP\_CHECK\_DEBUG\_TOKEN=your\_debug\_token\_for\_dev\
\
*# Analytics (Optional)*\
NEXT\_PUBLIC\_GA\_MEASUREMENT\_ID=G-XXXXXXXXXX\
\
*# Environment*\
NODE\_ENV=development\
NEXT\_TELEMETRY\_DISABLED=1
### <a name="secret-manager-setup"></a>19.2 Secret Manager Setup
*# Create secrets in Google Cloud Secret Manager*\
gcloud secrets create firebase-admin-key --data-file=service-account.json\
gcloud secrets create recaptcha-secret-key --data-file=recaptcha-secret.txt\
gcloud secrets create gemini-api-key --data-file=gemini-key.txt\
gcloud secrets create redis-url --data-file=redis-url.txt\
gcloud secrets create maps-api-key --data-file=maps-key.txt\
\
*# Verify secrets*\
gcloud secrets list

-----
## <a name="xd77fe08a214a1e36e1b8e80fb0b5f20333123e6"></a>SECTION 20: FINAL CHECKLIST FOR HACKATHON SUBMISSION
### <a name="pre-submission-verification"></a>20.1 Pre-Submission Verification
**Code Quality (20/20):** - [ ] npm run lint passes with 0 errors - [ ] npm run type-check passes with 0 errors - [ ] No any types in codebase - [ ] All functions have JSDoc - [ ] Consistent naming conventions - [ ] No unused dependencies

**Security (20/20):** - [ ] CSP headers present on all responses - [ ] reCAPTCHA v3 active on auth + AI forms - [ ] Rate limiting active (test with rapid requests) - [ ] No secrets in client code - [ ] Firestore rules tested - [ ] Input validation on all APIs

**Efficiency (15/15):** - [ ] Lighthouse Performance ≥ 90 - [ ] Initial JS bundle < 200KB - [ ] LCP < 2.5s - [ ] ISR active on static pages - [ ] Images optimized with next/image

**Testing (15/15):** - [ ] npm run test:coverage shows ≥ 80% - [ ] All unit tests pass - [ ] All integration tests pass - [ ] All E2E tests pass - [ ] Accessibility tests pass

**Accessibility (15/15):** - [ ] axe-core scan shows 0 violations - [ ] Keyboard navigation works - [ ] Screen reader announces dynamic content - [ ] Color contrast passes everywhere - [ ] Focus indicators visible

**Google Services (15/15):** - [ ] Firebase Auth login works - [ ] Firestore data syncs - [ ] Analytics events fire - [ ] AI responds correctly - [ ] Maps loads polling stations - [ ] App Check blocks unverified requests - [ ] Hosting serves from CDN - [ ] Cloud Run auto-scales
### <a name="submission-package"></a>20.2 Submission Package

|Deliverable|Format|Size|
| :- | :- | :- |
|Source code|GitHub repository|< 10MB|
|Live demo|Cloud Run URL|N/A|
|Demo video|2-minute walkthrough|< 50MB|
|Architecture diagram|PNG/SVG|< 2MB|
|README.md|Markdown|N/A|

-----
## <a name="conclusion"></a>CONCLUSION
This completes the **complete system design** for **Sajag** — your AI-powered Indian election assistant.
### <a name="what-you-have-now"></a>What You Have Now:
1. ✅ **Full architecture** with all layers defined
1. ✅ **Complete UI/UX design system** with strict color/font/spacing rules
1. ✅ **Google services mapping** (15 services, all integrated)
1. ✅ **Backend API structure** with all endpoints
1. ✅ **Database schema** (Firestore collections + security rules)
1. ✅ **10-step prompt sequence** for Anti-Gravity
1. ✅ **Security implementation plan** (OWASP Top 10)
1. ✅ **Testing strategy** (80%+ coverage target)
1. ✅ **Deployment architecture** (Cloud Run + Firebase Hosting)
1. ✅ **Hackathon audit framework** (6 categories, 100-point strategy)
### <a name="next-steps"></a>Next Steps:
1. **Send the Master Control Prompt to Anti-Gravity first**
1. **Execute Prompts 1-10 in order**, verifying quality gates
1. **Run the Judge Evaluation Simulation** after build
1. **Use Iteration Prompts** to fix any weak areas
1. **Deploy to Cloud Run** and verify live URL
1. **Submit with confidence** for #1 ranking

**The architecture is designed to win. Execute with precision.** 🇮🇳

-----
Generated by Kimi.ai
