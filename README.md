# City Pulse Explorer 🌆


Discover local events effortlessly with City Pulse Explorer — your ultimate companion for concerts, sports, theater, and more. Built with modern web technologies and designed for seamless exploration.

---

## Key Features ✨

- 🔍 **Intelligent Event Discovery:** Find events by keyword, artist, or venue
- 📍 **Location-Based Suggestions:** Automatically detects your city
- ❤️ **Personalized Experience:** Save favorite events to your profile
- 🌐 **Multilingual Support:** English and Arabic interfaces
- 📱 **Mobile-First Design:** Optimized for all screen sizes

---

## Tech Stack ⚙️

**Frontend:**
- Next.js 15 (App Router)
- React 19
- Tailwind CSS with Shadcn UI components
- Next International (i18n)

**Backend:**
- Ticketmaster API integration
- Client-side authentication
- Local storage persistence

**Utilities:**
- Axios for API requests
- React Hook Form with Zod validation
- Leaflet for interactive maps

---

## Getting Started 🚀

### Prerequisites

- Node.js v18+
- Ticketmaster API key

### Installation

```bash
git clone https://github.com/yourusername/city-pulse-explorer.git
cd city-pulse-explorer
npm install
```

### Configuration

Create a `.env.local` file in the project root with your API keys:

```env
TICKETMASTER_API_KEY=your_api_key_here
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure 📂

```
city-pulse-explorer/
├── app/
│   ├── [locale]/
│   │   ├── events/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── actions.ts
│   └── globals.css
├── components/
│   ├── events/
│   ├── home/
│   ├── layout/
│   ├── profile/
│   └── ui/
├── context/
│   └── auth-context.tsx
├── hooks/
│   ├── use-auth.ts
│   ├── use-favorites.ts
│   ├── use-profile.ts
│   └── use-toast.ts
├── i18n/
│   ├── navigation.ts
│   ├── request.ts
│   └── routing.ts
├── lib/
│   ├── cities.ts
│   ├── ticketmaster.ts
│   └── utils.ts
├── messages/
│   ├── ar.json
│   └── en.json
└── public/
```


```

insurance-platform/
├── src/
│   ├── app/                     # App configuration
│   │   ├── providers/           # Auth, Theme, Query providers
│   │   ├── router/              # Route configuration
│   │   └── store/               # Global state setup
│   │
│   ├── domains/                 # Business domains (DDD)
│   │   ├── insurance-core/      # Shared insurance logic
│   │   │   ├── types/           # Policy, Coverage, Customer types
│   │   │   ├── services/        # PricingEngine, PolicyValidator
│   │   │   └── hooks/           # useQuoteCalculation, usePolicyRules
│   │   │
│   │   └── home-insurance/      # Home insurance specific
│   │       ├── components/      # PropertyForm, CoverageSelector
│   │       ├── pages/           # QuoteJourney, PolicyDashboard
│   │       ├── services/        # HomeInsuranceAPI, PropertyValuation
│   │       └── types/           # HomeProperty, HomeCoverage
│   │
│   └── shared/                  # Shared across all domains
│       ├── components/          # UI library
│       │   ├── ui/              # Button, Input, Modal, Card
│       │   ├── forms/           # FormField, FormWizard, FileUpload
│       │   └── layout/          # Header, Footer, PageLayout
│       │
│       ├── services/            # Common services
│       │   ├── api/             # HTTP client, interceptors
│       │   ├── auth/            # Authentication
│       │   ├── payment/         # Payment gateway
│       │   └── validation/      # Form validation schemas
│       │
│       ├── hooks/               # Shared hooks
│       ├── utils/               # Formatters, helpers, constants
│       └── types/               # Global TypeScript types

```

---

## Screenshots 📸

### Home Page
![Home Page](https://github.com/user-attachments/assets/adc2afb8-38d9-4a7d-a3c2-d23d676deddf)

### Event Search
![Event Search](https://github.com/user-attachments/assets/fbeba5d6-9d0a-4e3b-b6ba-4afc539fa3c4)

### Event Details
![Event Details](https://github.com/user-attachments/assets/25b58491-b016-4fa1-a394-6c0ff571c5c5)

### User Profile
![User Profile](https://github.com/user-attachments/assets/4e145856-f5c3-4148-84ac-eb3675dbfd84)



Built with ❤️ by ArK | [Live Demo](https://city-pulse-explorer.vercel.app/)
