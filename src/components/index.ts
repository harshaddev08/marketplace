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

// Page-Specific Components
export * from "./Earnings";
export * from "./Settings";
export { JobsTabs } from "./Jobs";
export type { Job as JobsPageJob } from "./Jobs"; // Aliased to avoid conflict with provider Job

// Provider Components (re-export from provider subfolder)
export * from "./provider";
export * from "./ui";
