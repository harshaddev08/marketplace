// Main Components Barrel Export
// This file exports all custom components for convenient importing

// Landing Page Components
export * from "./CTASection";
export * from "./Footer";
export * from "./Header";
export * from "./HeroSection";
export * from "./HowItWorksSection";
export * from "./NavLink";
export * from "./ServicesSection";
export * from "./TrustSection";
export * from "./WhyChooseUsSection";
export * from "./UserMenu";
export * from "./ProviderSearch";
export * from "./ProviderFilters";
export * from "./ProviderCard";
export * from "./ProviderDetails";
export * from "./BookingModal";
export * from "./BookingSuccessView";
export * from "./BookingForm";
export * from "./MessageModal";
export * from "./MessageSuccessView";
export * from "./MessageForm";

// Page-Specific Components
export * from "./Earnings";
export * from "./Settings";
export { JobsTabs } from "./Jobs";
export type { Job as JobsPageJob } from "./Jobs"; // Aliased to avoid conflict with provider Job

// Provider Components (re-export from provider subfolder)
export * from "./provider";
export * from "./ui";
