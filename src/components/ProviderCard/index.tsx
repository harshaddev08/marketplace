"use client";

import Link from "next/link";
import { Star, MapPin, ShieldCheck, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Button,
  Badge,
} from "@/components/ui";

export interface ServiceItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  duration?: number;
  category: string;
  isPrimary?: boolean;
}

export interface Provider {
  id: string;
  bio: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  experience: number;
  location: string;
  isVerified: boolean;
  avatar?: string;
  services?: ServiceItem[];
}

interface ProviderCardProps {
  provider: Provider;
}

export const ProviderCard = ({ provider }: ProviderCardProps) => {
  const primaryService = provider.services?.find((s) => s.isPrimary);
  const displayPrice = primaryService
    ? primaryService.price
    : provider.hourlyRate;

  return (
    <Card className="glass-card hover:border-coral/50 transition-all hover-lift overflow-hidden flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative h-40 bg-muted/30">
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-muted-foreground/20">
            {provider.name.charAt(0)}
          </div>
          {provider.isVerified && (
            <div className="absolute top-3 right-3">
              <Badge
                variant="secondary"
                className="bg-success-light text-success border-success/20 gap-1"
              >
                <ShieldCheck className="w-3 h-3" />
                Verified
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-5 grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {provider.name}
            </h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {provider.services && provider.services.length > 0 ? (
                provider.services.slice(0, 3).map((service) => (
                  <Badge
                    key={service._id}
                    variant="secondary"
                    className="font-normal bg-coral/10 text-coral hover:bg-coral/20 border-none px-2 py-0.5 text-xs"
                  >
                    {service.name}
                  </Badge>
                ))
              ) : (
                <Badge
                  variant="secondary"
                  className="font-normal bg-coral/10 text-coral hover:bg-coral/20 border-none px-2 py-0.5 text-xs"
                >
                  {provider.category}
                </Badge>
              )}
              {provider.services && provider.services.length > 3 && (
                <span className="text-xs text-muted-foreground self-center">
                  +{provider.services.length - 3}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 bg-coral/10 px-2 py-1 rounded text-coral font-bold text-sm">
            <Star className="w-4 h-4 fill-coral" />
            {provider.rating}
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-muted-foreground/60" />
            {provider.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-muted-foreground/60" />
            {provider.experience} years experience
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex items-center justify-between">
        <div>
          <span className="text-xl font-bold text-foreground">
            ${displayPrice}
          </span>
          {!primaryService && (
            <span className="text-sm text-muted-foreground">/hr</span>
          )}
          {primaryService && (
            <span className="text-xs text-muted-foreground ml-1">starting</span>
          )}
        </div>
        <Link href={`/providers/${provider.id}`}>
          <Button variant="coral" size="sm" className="rounded-full px-6">
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
