"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { ProviderService } from "@/services/providerService";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  ArrowLeft,
  DollarSign,
  Users,
  Clock,
  Shield,
  CheckCircle,
  Star,
  TrendingUp,
  Calendar,
} from "lucide-react";

const services = [
  "Plumber",
  "Electrician",
  "House Cleaner",
  "Carpenter",
  "Painter",
  "AC Technician",
  "Appliance Repair",
  "Pest Control",
  "Gardener",
  "Other",
];

const BecomeProvider = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    experience: "",
    city: "",
    about: "",
  });

  useEffect(() => {
    if (user?.roles?.includes("provider")) {
      router.push("/provider/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await ProviderService.applyToBecomeProvider(formData);
      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        service: "",
        experience: "",
        city: "",
        about: "",
      });
      // Optional: Redirect after a delay or show success message
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error(error);
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-coral flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">LocalPro</span>
          </Link>
          <Link href="/auth">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              Join 10,000+ service providers
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Grow Your Business with{" "}
              <span className="text-gradient">LocalPro</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Connect with customers in your area, set your own schedule, and
              earn more doing what you love. Join our network of trusted service
              professionals.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 text-center shadow-soft border border-border"
              >
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Become a Provider?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our platform and unlock new opportunities to grow your
              service business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-lifted transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl gradient-coral flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Getting started as a provider is quick and easy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
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
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl gradient-coral flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/20 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Apply to Become a Provider
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you within 24
                hours
              </p>
              {success && (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg mt-4 mb-4">
                  Application submitted successfully! Redirecting to home...
                </div>
              )}
              {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-4 mb-4">
                  {error}
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Primary Service</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) =>
                      setFormData({ ...formData, service: value })
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service.toLowerCase()}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    placeholder="5"
                    min="0"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="about">Tell Us About Yourself</Label>
                <Textarea
                  id="about"
                  name="about"
                  placeholder="Describe your experience, skills, and what makes you a great service provider..."
                  value={formData.about}
                  onChange={handleInputChange}
                  className="min-h-[120px] resize-none"
                  required
                />
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    By submitting this form, you agree to our Terms of Service
                    and Privacy Policy
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="coral"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Hear from Our Providers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
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
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-soft border border-border"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{testimonial.text}</p>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 gradient-coral">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Join thousands of service providers who are growing their business
            with LocalPro
          </p>
          <Button
            variant="outline"
            size="xl"
            className="bg-white text-primary hover:bg-white/90 border-white"
            onClick={() =>
              document
                .querySelector("form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Apply Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BecomeProvider;
