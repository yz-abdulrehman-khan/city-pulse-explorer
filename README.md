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
src/
├── components/
│   ├── atoms/
│   │   ├── buttons/
│   │   │   ├── PrimaryButton.tsx
│   │   │   ├── SecondaryButton.tsx
│   │   │   └── CTAButton.tsx
│   │   ├── inputs/
│   │   │   ├── TextInput.tsx
│   │   │   ├── NumberInput.tsx
│   │   │   ├── EmailInput.tsx
│   │   │   ├── PhoneInput.tsx
│   │   ├── labels/
│   │   │   ├── FormLabel.tsx
│   │   │   ├── RequiredLabel.tsx
│   │   │   ├── HelpText.tsx
│   │   │   ├── ErrorText.tsx
│   │   │   ├── SuccessText.tsx
│   │   │   └── WarningText.tsx
│   │   ├── icons/
│   │   │   ├── ChevronIcon.tsx
│   │   │   ├── CheckIcon.tsx
│   │   ├── typography/
│   │   │   ├── Heading.tsx
│   │   │   ├── Subheading.tsx
│   │   │   ├── BodyText.tsx
│   │   │   ├── Caption.tsx
│   │   │   ├── Link.tsx
│   │   │   └── Code.tsx
│   │   ├── badges/
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── PriorityBadge.tsx
│   │   │   ├── CategoryBadge.tsx
│   │   │   └── CountBadge.tsx
│   │   └── dividers/
│   │       ├── HorizontalDivider.tsx
│   │       └── VerticalDivider.tsx
│   ├── molecules/
│   │   ├── form-groups/
│   │   │   ├── InputGroup.tsx
│   │   │   ├── PropertyDetailsGroup.tsx
│   │   │   ├── PersonalInfoGroup.tsx
│   │   │   ├── VehicleDetailsGroup.tsx
│   │   ├── cards/
│   │   │   ├── BaseCard.tsx
│   │   │   ├── InfoCard.tsx
│   │   │   ├── PriceCard.tsx
│   │   │   ├── FeatureCard.tsx
│   │   │   └── NewsCard.tsx
│   │   ├── navigation/
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── Pagination.tsx
│   │   ├── feedback/
│   │   │   ├── Toast.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── data-display/
│   │   │   ├── Table.tsx
│   │   │   ├── DataGrid.tsx
│   │   ├── search/
│   │   │   ├── SearchBar.tsx
│   │   └── media/
│   │       ├── ImageGallery.tsx
│   │       ├── VideoPlayer.tsx
│   ├── organisms/
│   │   ├── forms/
│   │   │   ├── home-insurance/
│   │   │   │   ├── PropertyDetailsForm.tsx
│   │   │   │   ├── CoverageSelectionForm.tsx
│   │   │   │   ├── PersonalInfoForm.tsx
│   │   │   │   ├── QuoteReviewForm.tsx
│   │   │   │   └── PaymentForm.tsx
│   │   │   ├── auto-insurance/
│   │   │   │   ├── VehicleDetailsForm.tsx
│   │   │   ├── travel-insurance/
│   │   │   │   ├── TripDetailsForm.tsx
│   │   │   ├── shared/
│   │   │   │   ├── CustomerInfoForm.tsx
│   │   │   │   ├── ContactDetailsForm.tsx
│   │   │   │   ├── DocumentUploadForm.tsx
│   │   │   │   ├── ReviewAndConfirmForm.tsx
│   │   │   │   ├── PaymentMethodForm.tsx
│   │   │   │   ├── OTPVerificationForm.tsx
│   │   │   │   └── AuthenticationForm.tsx
│   │   │   └── FormWizard.tsx
│   │   ├── headers/
│   │   │   ├── MainHeader.tsx
│   │   │   ├── DashboardHeader.tsx
│   │   │   └── AuthHeader.tsx
│   │   ├── footers/
│   │   │   ├── MainFooter.tsx
│   │   │   ├── MobileFooter.tsx
│   │   ├── navigation/
│   │   │   ├── MainNavigation.tsx
│   │   │   ├── SideNavigation.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   ├── dashboards/
│   │   │   ├── CustomerDashboard.tsx
│   │   │   ├── PolicyDashboard.tsx
│   │   ├── calculators/
│   │   │   ├── PremiumCalculator.tsx
│   │   │   ├── CoverageCalculator.tsx
│   │   └── widgets/
│   │       ├── WeatherWidget.tsx
│   │       ├── NewsWidget.tsx
│   └── templates/
│       ├── layouts/
│       │   ├── MainLayout.tsx
│       │   ├── AuthLayout.tsx
│       │   ├── DashboardLayout.tsx
│       ├── pages/
│       │   ├── LandingPageTemplate.tsx
│       │   ├── ProductPageTemplate.tsx
│       └── patterns/
│           ├── MasterDetailPattern.tsx
│           ├── WizardPattern.tsx
├── features/
│   ├── home-insurance/
│   │   ├── components/
│   │   │   ├── PropertySelector.tsx
│   │   │   ├── CoverageComparison.tsx
│   │   │   ├── RiskAssessment.tsx
│   │   │   ├── PropertyValueEstimator.tsx
│   │   ├── hooks/
│   │   │   ├── useHomeQuote.ts
│   │   │   ├── usePropertyDetails.ts
│   │   │   ├── useCoverageOptions.ts
│   │   ├── services/
│   │   │   ├── homeQuoteAPI.ts
│   │   │   ├── propertyAPI.ts
│   │   ├── store/
│   │   │   ├── homeInsuranceSlice.ts
│   │   │   ├── propertySlice.ts
│   │   ├── utils/
│   │   │   ├── homeCalculations.ts
│   │   ├── types/
│   │   │   ├── property.types.ts
│   │   └── pages/
│   │       ├── HomeInsuranceLanding.tsx
│   │       ├── PropertyDetails.tsx
│   ├── auto-insurance/
│   │   ├── components/
│   │   │   ├── VehicleSelector.tsx
│   │   ├── hooks/
│   │   │   ├── useAutoQuote.ts
│   │   ├── services/
│   │   │   ├── autoQuoteAPI.ts
│   │   │   ├── vehicleAPI.ts
│   │   ├── store/
│   │   │   ├── autoInsuranceSlice.ts
│   │   ├── utils/
│   │   │   ├── autoCalculations.ts
│   │   ├── types/
│   │   │   ├── vehicle.types.ts
│   │   └── pages/
│   │       ├── AutoInsuranceLanding.tsx
│   ├── travel-insurance/
│   │   ├── components/
│   │   │   ├── TripPlanner.tsx
│   │   │   ├── DestinationSelector.tsx
│   │   ├── hooks/
│   │   │   ├── useTravelQuote.ts
│   │   ├── services/
│   │   │   ├── travelQuoteAPI.ts
│   │   ├── store/
│   │   │   ├── travelInsuranceSlice.ts
│   │   ├── utils/
│   │   │   ├── travelCalculations.ts
│   │   ├── types/
│   │   │   ├── trip.types.ts
│   │   └── pages/
│   │       ├── TravelInsuranceLanding.tsx
│   ├── shared/
│   │   ├── components/
│   │   │   ├── authentication/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   ├── ForgotPasswordForm.tsx
│   │   │   │   ├── ResetPasswordForm.tsx
│   │   │   │   ├── OTPVerification.tsx
│   │   │   │   ├── TwoFactorAuth.tsx
│   │   │   ├── payment/
│   │   │   │   ├── PaymentMethods.tsx
│   │   │   │   ├── CreditCardForm.tsx
│   │   │   │   ├── BankTransferForm.tsx
│   │   │   ├── documents/
│   │   │   │   ├── DocumentUploader.tsx
│   │   │   │   ├── DocumentViewer.tsx
│   │   │   ├── policies/
│   │   │   │   ├── PolicyViewer.tsx
│   │   │   │   ├── PolicySummary.tsx
│   │   │   ├── claims/
│   │   │   │   ├── ClaimForm.tsx
│   │   │   │   ├── ClaimTracker.tsx
│   │   │   ├── customer/
│   │   │   │   ├── ProfileEditor.tsx
│   │   │   │   ├── ContactPreferences.tsx
│   │   │   ├── communication/
│   │   │   │   ├── ChatInterface.tsx
│   │   │   │   ├── VideoCall.tsx
│   │   │   └── analytics/
│   │   │       ├── EventTracker.tsx
│   │   │       ├── PerformanceMonitor.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── usePermissions.ts
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── tokenService.ts
│   │   │   ├── userService.ts
│   │   ├── store/
│   │   │   ├── authSlice.ts
│   │   │   ├── userSlice.ts
│   │   ├── utils/
│   │   │   ├── sharedCalculations.ts
│   │   │   ├── commonValidators.ts
│   │   │   ├── sharedFormatters.ts
│   │   │   ├── commonConstants.ts
│   │   ├── types/
│   │   │   ├── auth.types.ts
│   │   │   ├── user.types.ts
│   │   └── constants/
│   │       ├── routes.ts
│   │       ├── apiEndpoints.ts
│   │       ├── errorMessages.ts
│   │       ├── successMessages.ts
│   ├── admin/
│   │   ├── components/
│   │   │   ├── UserManagement.tsx
│   │   ├── hooks/
│   │   │   ├── useAdminAuth.ts
│   │   │   ├── useUserManagement.ts
│   │
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
