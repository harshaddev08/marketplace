"use client";

import { useState } from "react";
import {
  Star,
  MapPin,
  ShieldCheck,
  Clock,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
} from "lucide-react";
import {
  Button,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Separator,
} from "@/components/ui";
import { Provider } from "@/components/ProviderCard";
import { BookingModal, MessageModal } from "@/components";

interface ProviderDetailsProps {
  provider: Provider;
}

export const ProviderDetails = ({ provider }: ProviderDetailsProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const primaryService = provider.services?.find((s) => s.isPrimary);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Profile Info */}
      <div className="lg:col-span-2 space-y-8">
        <section className="glass-card p-8 rounded-2xl">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="w-24 h-24 border-2 border-coral/20">
              <AvatarImage src={provider.avatar} alt={provider.name} />
              <AvatarFallback className="text-3xl bg-muted/30 text-muted-foreground/40 font-bold">
                {provider.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="grow">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">
                  {provider.name}
                </h1>
                {provider.isVerified && (
                  <Badge
                    variant="secondary"
                    className="bg-success-light text-success border-success/20 gap-1 py-1"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Verified Pro
                  </Badge>
                )}
              </div>

              <p className="text-xl font-medium text-coral mb-4">
                {provider.category}
              </p>

              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-coral text-coral" />
                  <span className="font-bold text-foreground">
                    {provider.rating}
                  </span>
                  <span>({provider.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {provider.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {provider.experience} years experience
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div>
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p className="text-muted-foreground leading-relaxed">
              {provider?.bio}
            </p>
          </div>
        </section>

        <section className="glass-card p-8 rounded-2xl">
          <h2 className="text-xl font-bold mb-6">Services & Pricing</h2>
          <div className="space-y-4">
            {provider.services && provider.services.length > 0 ? (
              provider.services.map((service) => (
                <div
                  key={service._id}
                  className={`flex justify-between items-center p-4 rounded-xl border transition-colors ${
                    service.isPrimary
                      ? "bg-coral/5 border-coral/30 hover:bg-coral/10"
                      : "bg-muted/20 border-border/50 hover:bg-muted/30"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{service.name}</h3>
                      {service.isPrimary && (
                        <Badge
                          variant="secondary"
                          className="bg-coral text-white hover:bg-coral/90 text-[10px] h-5 px-1.5"
                        >
                          Primary
                        </Badge>
                      )}
                    </div>
                    {service.description && (
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    )}
                    {service.duration && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{service.duration} mins</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-coral">
                      ${service.price}
                    </span>
                    {/* <span className="text-sm text-muted-foreground">/hr</span> */}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-between items-center p-4 bg-muted/20 rounded-xl border border-border/50">
                <div>
                  <h3 className="font-bold">Standard Consultation</h3>
                  <p className="text-sm text-muted-foreground">
                    Initial assessment and minor repairs
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-coral">
                    ${provider.hourlyRate}
                  </span>
                  <span className="text-sm text-muted-foreground">/hr</span>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Right Column: Booking Sidebar */}
      <div className="space-y-6">
        <Card className="glass-card border-none shadow-xl sticky top-24">
          <CardHeader>
            <CardTitle>Book Professional</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-coral/5 rounded-xl border border-coral/10">
              <p className="text-sm text-muted-foreground mb-1">
                {primaryService ? "Primary Service" : "Starting from"}
              </p>
              <p className="text-3xl font-bold text-foreground">
                ${primaryService ? primaryService.price : provider.hourlyRate}
                {!primaryService && (
                  <span className="text-base font-normal text-muted-foreground ml-1">
                    /hour
                  </span>
                )}
              </p>
            </div>

            <div className="space-y-3">
              <Button
                variant="coral"
                className="w-full h-12 text-lg font-bold rounded-xl shadow-lg shadow-coral/20"
                onClick={() => setIsBookingOpen(true)}
              >
                <Calendar className="mr-2 w-5 h-5" />
                Book Now
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 text-lg font-medium rounded-xl border-coral/20 text-coral hover:bg-coral/5"
                onClick={() => setIsMessageOpen(true)}
              >
                <MessageSquare className="mr-2 w-5 h-5" />
                Send Message
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Safe & Secure Payments</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Star className="w-4 h-4" />
                </div>
                <span>Service Satisfaction Guarantee</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>
                contact@{provider.name.toLowerCase().replace(" ", "")}.com
              </span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 000-0000</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <BookingModal
        provider={provider}
        isOpen={isBookingOpen}
        onOpenChange={setIsBookingOpen}
      />
      <MessageModal
        provider={provider}
        isOpen={isMessageOpen}
        onOpenChange={setIsMessageOpen}
      />
    </div>
  );
};
