"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { CheckCircle } from "lucide-react";
import { ProviderService } from "@/services/providerService";
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

export const ApplicationForm = () => {
  const router = useRouter();
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

  return (
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
                  By submitting this form, you agree to our Terms of Service and
                  Privacy Policy
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
  );
};
