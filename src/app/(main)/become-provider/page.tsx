"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Users, Calendar, Shield } from "lucide-react";
import {
  HeroSection,
  BenefitsSection,
  HowItWorksSection,
  ApplicationForm,
  TestimonialsSection,
  FooterCTA,
} from "@/components/BecomeProvider";
// Note: I need to verify the import. The barrel file exports named exports.
// ApplicationForm is exported as 'ApplicationForm'.

const BecomeProvider = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.roles?.includes("provider")) {
      router.push("/provider/dashboard");
    }
  }, [user, router]);

  const benefits = [
    {
      icon: DollarSign,
      title: "Earn More",
      description: "Set your own rates and earn up to $50/hour or more",
    },
    {
      icon: Calendar,
      title: "Flexible Schedule",
      description: "Work when you want, accept jobs that fit your availability",
    },
    {
      icon: Users,
      title: "Grow Your Business",
      description: "Access thousands of customers looking for your services",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Get paid quickly and securely after every job",
    },
  ];

  const stats = [
    { value: "10k+", label: "Active Providers" },
    { value: "$2.5M+", label: "Earned by Providers" },
    { value: "4.8★", label: "Average Rating" },
    { value: "50k+", label: "Jobs Completed" },
  ];

  const steps = [
    {
      step: "1",
      title: "Apply Online",
      description:
        "Fill out the application form with your details and service expertise",
    },
    {
      step: "2",
      title: "Get Verified",
      description:
        "Complete our verification process to build trust with customers",
    },
    {
      step: "3",
      title: "Start Earning",
      description:
        "Receive job requests, set your schedule, and start growing your income",
    },
  ];

  const testimonials = [
    {
      name: "Michael Chen",
      role: "Electrician",
      rating: 5,
      text: "LocalPro has transformed my business. I've doubled my client base and now have a steady stream of quality jobs.",
    },
    {
      name: "Sarah Johnson",
      role: "House Cleaner",
      rating: 5,
      text: "The flexibility is amazing. I can work around my family schedule while earning a great income.",
    },
    {
      name: "David Rodriguez",
      role: "Plumber",
      rating: 5,
      text: "The payment system is seamless and I love how easy it is to manage my bookings through the app.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeroSection stats={stats} />
      <BenefitsSection benefits={benefits} />
      <HowItWorksSection steps={steps} />
      <ApplicationForm />
      <TestimonialsSection testimonials={testimonials} />
      <FooterCTA />
    </div>
  );
};

export default BecomeProvider;
