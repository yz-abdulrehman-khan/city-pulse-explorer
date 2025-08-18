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
│   │   │   ├── DangerButton.tsx
│   │   │   ├── IconButton.tsx
│   │   │   ├── LoadingButton.tsx
│   │   │   └── CTAButton.tsx
│   │   ├── inputs/
│   │   │   ├── TextInput.tsx
│   │   │   ├── NumberInput.tsx
│   │   │   ├── EmailInput.tsx
│   │   │   ├── PhoneInput.tsx
│   │   │   ├── CurrencyInput.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   ├── TimePicker.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── ImageUpload.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── RadioButton.tsx
│   │   │   ├── Switch.tsx
│   │   │   ├── Slider.tsx
│   │   │   ├── OTPInput.tsx
│   │   │   └── SearchInput.tsx
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
│   │   │   ├── ErrorIcon.tsx
│   │   │   ├── InfoIcon.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── UploadIcon.tsx
│   │   │   ├── DownloadIcon.tsx
│   │   │   ├── EditIcon.tsx
│   │   │   ├── DeleteIcon.tsx
│   │   │   ├── SearchIcon.tsx
│   │   │   ├── FilterIcon.tsx
│   │   │   ├── SortIcon.tsx
│   │   │   ├── HomeIcon.tsx
│   │   │   ├── CarIcon.tsx
│   │   │   ├── TravelIcon.tsx
│   │   │   ├── ProtectionIcon.tsx
│   │   │   └── PolicyIcon.tsx
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
│   │   │   ├── RadioGroup.tsx
│   │   │   ├── CheckboxGroup.tsx
│   │   │   ├── FieldSet.tsx
│   │   │   ├── FormSection.tsx
│   │   │   ├── AddressGroup.tsx
│   │   │   ├── ContactGroup.tsx
│   │   │   ├── PropertyDetailsGroup.tsx
│   │   │   ├── PersonalInfoGroup.tsx
│   │   │   ├── VehicleDetailsGroup.tsx
│   │   │   ├── TravelDetailsGroup.tsx
│   │   │   └── PaymentDetailsGroup.tsx
│   │   ├── cards/
│   │   │   ├── BaseCard.tsx
│   │   │   ├── InfoCard.tsx
│   │   │   ├── PriceCard.tsx
│   │   │   ├── FeatureCard.tsx
│   │   │   ├── PolicyCard.tsx
│   │   │   ├── QuoteCard.tsx
│   │   │   ├── DocumentCard.tsx
│   │   │   ├── ProgressCard.tsx
│   │   │   ├── SummaryCard.tsx
│   │   │   ├── ComparisonCard.tsx
│   │   │   ├── TestimonialCard.tsx
│   │   │   └── NewsCard.tsx
│   │   ├── navigation/
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── StepIndicator.tsx
│   │   │   ├── TabNavigation.tsx
│   │   │   ├── SideNavItem.tsx
│   │   │   └── MenuDropdown.tsx
│   │   ├── feedback/
│   │   │   ├── Toast.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   ├── Popover.tsx
│   │   │   ├── ConfirmDialog.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── data-display/
│   │   │   ├── Table.tsx
│   │   │   ├── DataGrid.tsx
│   │   │   ├── KeyValuePair.tsx
│   │   │   ├── Timeline.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── StatusIndicator.tsx
│   │   │   ├── MetricDisplay.tsx
│   │   │   ├── ChartWidget.tsx
│   │   │   └── EmptyState.tsx
│   │   ├── search/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── FilterGroup.tsx
│   │   │   ├── SortSelector.tsx
│   │   │   └── SearchResults.tsx
│   │   └── media/
│   │       ├── ImageGallery.tsx
│   │       ├── VideoPlayer.tsx
│   │       ├── DocumentViewer.tsx
│   │       └── Avatar.tsx
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
│   │   │   │   ├── DriverInfoForm.tsx
│   │   │   │   ├── CoverageOptionsForm.tsx
│   │   │   │   ├── PreviousClaimsForm.tsx
│   │   │   │   └── PaymentForm.tsx
│   │   │   ├── travel-insurance/
│   │   │   │   ├── TripDetailsForm.tsx
│   │   │   │   ├── TravelerInfoForm.tsx
│   │   │   │   ├── CoverageTypeForm.tsx
│   │   │   │   ├── MedicalHistoryForm.tsx
│   │   │   │   └── PaymentForm.tsx
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
│   │   │   ├── MobileHeader.tsx
│   │   │   ├── ProductHeader.tsx
│   │   │   ├── DashboardHeader.tsx
│   │   │   └── AuthHeader.tsx
│   │   ├── footers/
│   │   │   ├── MainFooter.tsx
│   │   │   ├── MobileFooter.tsx
│   │   │   ├── SimpleFooter.tsx
│   │   │   └── LegalFooter.tsx
│   │   ├── navigation/
│   │   │   ├── MainNavigation.tsx
│   │   │   ├── SideNavigation.tsx
│   │   │   ├── MobileNavigation.tsx
│   │   │   ├── BreadcrumbNavigation.tsx
│   │   │   └── ProductNavigation.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── CTASection.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── ComparisonSection.tsx
│   │   │   ├── BenefitsSection.tsx
│   │   │   └── ProcessSection.tsx
│   │   ├── dashboards/
│   │   │   ├── CustomerDashboard.tsx
│   │   │   ├── PolicyDashboard.tsx
│   │   │   ├── ClaimsDashboard.tsx
│   │   │   ├── AnalyticsDashboard.tsx
│   │   │   └── AdminDashboard.tsx
│   │   ├── calculators/
│   │   │   ├── PremiumCalculator.tsx
│   │   │   ├── CoverageCalculator.tsx
│   │   │   ├── SavingsCalculator.tsx
│   │   │   └── RiskAssessment.tsx
│   │   └── widgets/
│   │       ├── WeatherWidget.tsx
│   │       ├── NewsWidget.tsx
│   │       ├── QuickQuoteWidget.tsx
│   │       ├── ChatWidget.tsx
│   │       ├── NotificationWidget.tsx
│   │       └── HelpWidget.tsx
│   └── templates/
│       ├── layouts/
│       │   ├── MainLayout.tsx
│       │   ├── AuthLayout.tsx
│       │   ├── DashboardLayout.tsx
│       │   ├── ProductLayout.tsx
│       │   ├── MobileLayout.tsx
│       │   ├── PrintLayout.tsx
│       │   └── ErrorLayout.tsx
│       ├── pages/
│       │   ├── LandingPageTemplate.tsx
│       │   ├── ProductPageTemplate.tsx
│       │   ├── ApplicationPageTemplate.tsx
│       │   ├── DashboardPageTemplate.tsx
│       │   ├── ProfilePageTemplate.tsx
│       │   ├── DocumentPageTemplate.tsx
│       │   └── ReportPageTemplate.tsx
│       └── patterns/
│           ├── MasterDetailPattern.tsx
│           ├── WizardPattern.tsx
│           ├── ListDetailPattern.tsx
│           └── FilterListPattern.tsx
├── features/
│   ├── home-insurance/
│   │   ├── components/
│   │   │   ├── PropertySelector.tsx
│   │   │   ├── CoverageComparison.tsx
│   │   │   ├── RiskAssessment.tsx
│   │   │   ├── PropertyValueEstimator.tsx
│   │   │   ├── LocationVerifier.tsx
│   │   │   ├── FloodZoneChecker.tsx
│   │   │   ├── PropertyImages.tsx
│   │   │   └── DocumentsRequired.tsx
│   │   ├── hooks/
│   │   │   ├── useHomeQuote.ts
│   │   │   ├── usePropertyDetails.ts
│   │   │   ├── useCoverageOptions.ts
│   │   │   ├── useRiskCalculation.ts
│   │   │   ├── usePropertyValidation.ts
│   │   │   └── useHomePolicy.ts
│   │   ├── services/
│   │   │   ├── homeQuoteAPI.ts
│   │   │   ├── propertyAPI.ts
│   │   │   ├── coverageAPI.ts
│   │   │   ├── riskAssessmentAPI.ts
│   │   │   ├── policyAPI.ts
│   │   │   └── documentAPI.ts
│   │   ├── store/
│   │   │   ├── homeInsuranceSlice.ts
│   │   │   ├── propertySlice.ts
│   │   │   ├── coverageSlice.ts
│   │   │   └── homeQuoteSlice.ts
│   │   ├── utils/
│   │   │   ├── homeCalculations.ts
│   │   │   ├── propertyValidators.ts
│   │   │   ├── coverageFormatters.ts
│   │   │   └── homeConstants.ts
│   │   ├── types/
│   │   │   ├── property.types.ts
│   │   │   ├── coverage.types.ts
│   │   │   ├── quote.types.ts
│   │   │   └── policy.types.ts
│   │   └── pages/
│   │       ├── HomeInsuranceLanding.tsx
│   │       ├── PropertyDetails.tsx
│   │       ├── CoverageSelection.tsx
│   │       ├── QuoteReview.tsx
│   │       └── PolicyConfirmation.tsx
│   ├── auto-insurance/
│   │   ├── components/
│   │   │   ├── VehicleSelector.tsx
│   │   │   ├── DriverProfile.tsx
│   │   │   ├── UsagePatterns.tsx
│   │   │   ├── SafetyFeatures.tsx
│   │   │   ├── DrivingHistory.tsx
│   │   │   ├── VehicleInspection.tsx
│   │   │   ├── Telematics.tsx
│   │   │   └── FleetManagement.tsx
│   │   ├── hooks/
│   │   │   ├── useAutoQuote.ts
│   │   │   ├── useVehicleDetails.ts
│   │   │   ├── useDriverProfile.ts
│   │   │   ├── useDrivingHistory.ts
│   │   │   ├── useAutoPolicy.ts
│   │   │   └── useTelematics.ts
│   │   ├── services/
│   │   │   ├── autoQuoteAPI.ts
│   │   │   ├── vehicleAPI.ts
│   │   │   ├── driverAPI.ts
│   │   │   ├── historyAPI.ts
│   │   │   ├── telematicsAPI.ts
│   │   │   └── autoPolicyAPI.ts
│   │   ├── store/
│   │   │   ├── autoInsuranceSlice.ts
│   │   │   ├── vehicleSlice.ts
│   │   │   ├── driverSlice.ts
│   │   │   └── autoQuoteSlice.ts
│   │   ├── utils/
│   │   │   ├── autoCalculations.ts
│   │   │   ├── vehicleValidators.ts
│   │   │   ├── driverFormatters.ts
│   │   │   └── autoConstants.ts
│   │   ├── types/
│   │   │   ├── vehicle.types.ts
│   │   │   ├── driver.types.ts
│   │   │   ├── autoQuote.types.ts
│   │   │   └── autoPolicy.types.ts
│   │   └── pages/
│   │       ├── AutoInsuranceLanding.tsx
│   │       ├── VehicleDetails.tsx
│   │       ├── DriverInformation.tsx
│   │       ├── CoverageOptions.tsx
│   │       └── AutoPolicyConfirmation.tsx
│   ├── travel-insurance/
│   │   ├── components/
│   │   │   ├── TripPlanner.tsx
│   │   │   ├── DestinationSelector.tsx
│   │   │   ├── TravelerProfiles.tsx
│   │   │   ├── ActivityCoverage.tsx
│   │   │   ├── MedicalCoverage.tsx
│   │   │   ├── EmergencyServices.tsx
│   │   │   ├── CancellationProtection.tsx
│   │   │   └── TravelDocuments.tsx
│   │   ├── hooks/
│   │   │   ├── useTravelQuote.ts
│   │   │   ├── useTripDetails.ts
│   │   │   ├── useTravelerInfo.ts
│   │   │   ├── useDestinationRisk.ts
│   │   │   ├── useTravelPolicy.ts
│   │   │   └── useEmergencyServices.ts
│   │   ├── services/
│   │   │   ├── travelQuoteAPI.ts
│   │   │   ├── tripAPI.ts
│   │   │   ├── travelerAPI.ts
│   │   │   ├── destinationAPI.ts
│   │   │   ├── riskAPI.ts
│   │   │   └── travelPolicyAPI.ts
│   │   ├── store/
│   │   │   ├── travelInsuranceSlice.ts
│   │   │   ├── tripSlice.ts
│   │   │   ├── travelerSlice.ts
│   │   │   └── travelQuoteSlice.ts
│   │   ├── utils/
│   │   │   ├── travelCalculations.ts
│   │   │   ├── tripValidators.ts
│   │   │   ├── destinationFormatters.ts
│   │   │   └── travelConstants.ts
│   │   ├── types/
│   │   │   ├── trip.types.ts
│   │   │   ├── traveler.types.ts
│   │   │   ├── destination.types.ts
│   │   │   ├── travelQuote.types.ts
│   │   │   └── travelPolicy.types.ts
│   │   └── pages/
│   │       ├── TravelInsuranceLanding.tsx
│   │       ├── TripDetails.tsx
│   │       ├── TravelerInformation.tsx
│   │       ├── CoverageSelection.tsx
│   │       └── TravelPolicyConfirmation.tsx
│   ├── shared/
│   │   ├── components/
│   │   │   ├── authentication/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   ├── ForgotPasswordForm.tsx
│   │   │   │   ├── ResetPasswordForm.tsx
│   │   │   │   ├── OTPVerification.tsx
│   │   │   │   ├── BiometricAuth.tsx
│   │   │   │   ├── TwoFactorAuth.tsx
│   │   │   │   └── SocialLogin.tsx
│   │   │   ├── payment/
│   │   │   │   ├── PaymentMethods.tsx
│   │   │   │   ├── CreditCardForm.tsx
│   │   │   │   ├── BankTransferForm.tsx
│   │   │   │   ├── PaymentSummary.tsx
│   │   │   │   ├── PaymentStatus.tsx
│   │   │   │   ├── RecurringPayment.tsx
│   │   │   │   ├── PaymentHistory.tsx
│   │   │   │   └── RefundProcessor.tsx
│   │   │   ├── documents/
│   │   │   │   ├── DocumentUploader.tsx
│   │   │   │   ├── DocumentViewer.tsx
│   │   │   │   ├── DocumentScanner.tsx
│   │   │   │   ├── DocumentValidator.tsx
│   │   │   │   ├── DocumentStatus.tsx
│   │   │   │   ├── DocumentLibrary.tsx
│   │   │   │   └── DocumentSignature.tsx
│   │   │   ├── policies/
│   │   │   │   ├── PolicyViewer.tsx
│   │   │   │   ├── PolicySummary.tsx
│   │   │   │   ├── PolicyComparison.tsx
│   │   │   │   ├── PolicyModification.tsx
│   │   │   │   ├── PolicyRenewal.tsx
│   │   │   │   ├── PolicyCancellation.tsx
│   │   │   │   └── PolicyHistory.tsx
│   │   │   ├── claims/
│   │   │   │   ├── ClaimForm.tsx
│   │   │   │   ├── ClaimTracker.tsx
│   │   │   │   ├── ClaimDocuments.tsx
│   │   │   │   ├── ClaimHistory.tsx
│   │   │   │   ├── ClaimStatus.tsx
│   │   │   │   ├── ClaimPhotos.tsx
│   │   │   │   └── ClaimEstimator.tsx
│   │   │   ├── customer/
│   │   │   │   ├── ProfileEditor.tsx
│   │   │   │   ├── ContactPreferences.tsx
│   │   │   │   ├── SecuritySettings.tsx
│   │   │   │   ├── PrivacySettings.tsx
│   │   │   │   ├── NotificationSettings.tsx
│   │   │   │   ├── AccountSettings.tsx
│   │   │   │   └── DataExport.tsx
│   │   │   ├── communication/
│   │   │   │   ├── ChatInterface.tsx
│   │   │   │   ├── VideoCall.tsx
│   │   │   │   ├── EmailComposer.tsx
│   │   │   │   ├── SMSInterface.tsx
│   │   │   │   ├── NotificationCenter.tsx
│   │   │   │   ├── AnnouncementBar.tsx
│   │   │   │   └── FeedbackForm.tsx
│   │   │   └── analytics/
│   │   │       ├── EventTracker.tsx
│   │   │       ├── PerformanceMonitor.tsx
│   │   │       ├── ErrorReporter.tsx
│   │   │       ├── UserBehaviorTracker.tsx
│   │   │       ├── ConversionTracker.tsx
│   │   │       └── ABTestingWrapper.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── usePermissions.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useSessionStorage.ts
│   │   │   ├── useAPI.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── useThrottle.ts
│   │   │   ├── useModal.ts
│   │   │   ├── useToast.ts
│   │   │   ├── usePagination.ts
│   │   │   ├── useSort.ts
│   │   │   ├── useFilter.ts
│   │   │   ├── useSearch.ts
│   │   │   ├── useForm.ts
│   │   │   ├── useValidation.ts
│   │   │   ├── useUpload.ts
│   │   │   ├── useDownload.ts
│   │   │   ├── useGeolocation.ts
│   │   │   ├── useDevice.ts
│   │   │   ├── useOnline.ts
│   │   │   ├── useIdle.ts
│   │   │   ├── useTimeout.ts
│   │   │   ├── useInterval.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   ├── useKeyboard.ts
│   │   │   ├── useClipboard.ts
│   │   │   ├── useWebSocket.ts
│   │   │   ├── useEventSource.ts
│   │   │   ├── useNotification.ts
│   │   │   ├── useAnalytics.ts
│   │   │   ├── useErrorHandler.ts
│   │   │   └── useRetry.ts
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── tokenService.ts
│   │   │   ├── userService.ts
│   │   │   ├── profileService.ts
│   │   │   ├── permissionService.ts
│   │   │   ├── sessionService.ts
│   │   │   ├── storageService.ts
│   │   │   ├── cacheService.ts
│   │   │   ├── syncService.ts
│   │   │   ├── offlineService.ts
│   │   │   ├── analyticsService.ts
│   │   │   ├── errorService.ts
│   │   │   ├── logService.ts
│   │   │   ├── notificationService.ts
│   │   │   ├── websocketService.ts
│   │   │   ├── cryptoService.ts
│   │   │   ├── deviceService.ts
│   │   │   ├── geolocationService.ts
│   │   │   └── biometricService.ts
│   │   ├── store/
│   │   │   ├── authSlice.ts
│   │   │   ├── userSlice.ts
│   │   │   ├── uiSlice.ts
│   │   │   ├── settingsSlice.ts
│   │   │   ├── notificationSlice.ts
│   │   │   ├── cacheSlice.ts
│   │   │   ├── errorSlice.ts
│   │   │   ├── loadingSlice.ts
│   │   │   ├── modalSlice.ts
│   │   │   ├── toastSlice.ts
│   │   │   ├── routerSlice.ts
│   │   │   ├── analyticsSlice.ts
│   │   │   └── globalSlice.ts
│   │   ├── utils/
│   │   │   ├── sharedCalculations.ts
│   │   │   ├── commonValidators.ts
│   │   │   ├── sharedFormatters.ts
│   │   │   ├── commonConstants.ts
│   │   │   ├── dateUtils.ts
│   │   │   ├── currencyUtils.ts
│   │   │   ├── stringUtils.ts
│   │   │   ├── numberUtils.ts
│   │   │   ├── arrayUtils.ts
│   │   │   ├── objectUtils.ts
│   │   │   ├── urlUtils.ts
│   │   │   ├── deviceUtils.ts
│   │   │   ├── browserUtils.ts
│   │   │   ├── securityUtils.ts
│   │   │   ├── performanceUtils.ts
│   │   │   ├── debugUtils.ts
│   │   │   └── testUtils.ts
│   │   ├── types/
│   │   │   ├── auth.types.ts
│   │   │   ├── user.types.ts
│   │   │   ├── common.types.ts
│   │   │   ├── shared.types.ts
│   │   │   ├── ui.types.ts
│   │   │   ├── settings.types.ts
│   │   │   ├── notification.types.ts
│   │   │   ├── error.types.ts
│   │   │   ├── analytics.types.ts
│   │   │   ├── event.types.ts
│   │   │   ├── device.types.ts
│   │   │   └── global.types.ts
│   │   └── constants/
│   │       ├── routes.ts
│   │       ├── apiEndpoints.ts
│   │       ├── errorMessages.ts
│   │       ├── successMessages.ts
│   │       ├── validationRules.ts
│   │       ├── permissions.ts
│   │       ├── roles.ts
│   │       ├── statuses.ts
│   │       ├── countries.ts
│   │       ├── currencies.ts
│   │       ├── languages.ts
│   │       ├── timezones.ts
│   │       ├── themes.ts
│   │       ├── breakpoints.ts
│   │       ├── animations.ts
│   │       └── configuration.ts
│   ├── admin/
│   │   ├── components/
│   │   │   ├── UserManagement.tsx
│   │   │   ├── PolicyManagement.tsx
│   │   │   ├── ClaimsManagement.tsx
│   │   │   ├── ReportsManagement.tsx
│   │   │   ├── SystemSettings.tsx
│   │   │   ├── AuditLogs.tsx
│   │   │   ├── ContentManagement.tsx
│   │   │   └── SecurityManagement.tsx
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
