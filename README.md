# Sajag — Civic-Tech Election Assistant

Sajag is a production-grade web application designed to help Indian voters understand the election process through interactive guides, AI-powered explanations, and location-based services.

## 🚀 Features

- **Interactive 5-Step Guide**: Modular journey from eligibility to post-voting duties.
- **AI "Explain Simply"**: Contextual analogies powered by Google Gemini 1.5 Flash.
- **Booth Locator**: Geolocation-based polling station finder with accessibility info.
- **Live Timeline**: Real-time updates on election phases and key dates.
- **Progress Tracking**: Persistent user state via Firestore and Zustand.
- **Premium UI**: Modern SaaS aesthetic with glassmorphism and smooth animations.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Vanilla CSS (CSS Modules), Framer Motion.
- **Backend**: Next.js API Routes, Firebase Admin SDK.
- **Database**: Firebase Firestore.
- **Auth**: Firebase Auth (Google Sign-In).
- **AI**: Google Gemini API.
- **Maps**: Google Maps JavaScript API.
- **Testing**: Vitest, React Testing Library.

## 📦 Getting Started

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and fill in your keys.
4. Run the development server:
   ```bash
   npm run dev
   ```

## 🔒 Security

- Input sanitization for all user and AI content.
- CSRF protection enabled via Next.js.
- Rate limiting on AI and Auth endpoints.
- Environment variable protection.

## ♿ Accessibility

- Semantic HTML5 structure.
- ARIA labels for interactive elements.
- WCAG 2.1 compliant color contrast.
- Keyboard navigation support.

## 🧪 Testing

Run unit tests:
```bash
npm test
```

---
Built with ❤️ for the Indian Voter.
