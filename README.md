export const formatMoney = (value: string | number | null | undefined): string => {
  if (!value && value !== 0) {
    return '';
  }

  // Convert to string and remove any existing commas (defensive)
  const cleanValue = String(value).replace(/,/g, '');

  // Remove non-digits (except decimal point for future use)
  const digits = cleanValue.replace(/[^\d.]/g, '');

  if (!digits || digits === '.') {
    return '';
  }

  // Split on decimal if present (for future decimal support)
  const parts = digits.split('.');
  const wholePart = parts[0];
  const decimalPart = parts[1];

  // Add commas to whole number part - regex-free implementation
  // Prevents ReDoS vulnerability from nested quantifiers in lookaheads
  let formatted = '';
  const len = wholePart.length;

  for (let i = 0; i < len; i++) {
    // Add comma before groups of 3 digits from the right
    if (i > 0 && (len - i) % 3 === 0) {
      formatted += ',';
    }
    formatted += wholePart[i];
  }

  // Add decimal back if it existed
  const result = decimalPart !== undefined ? `${formatted}.${decimalPart}` : formatted;
  return result;
};


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
