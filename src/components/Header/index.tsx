"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "@/components/UserMenu";

export const Header = () => {
  const { user } = useAuth();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 mx-auto">
      <div className="container mx-auto flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl gradient-coral flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow">
            <MapPin className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Local<span className="text-coral">Pro</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#services"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Services
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/#why-us"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Why Us
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          {user?.roles?.includes("provider") ? (
            <Link
              href="/provider/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
          ) : user ? (
            <Link
              href="/customer/jobs"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              My Bookings
            </Link>
          ) : (
            <Link
              href="/become-provider"
              className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Become a Provider
            </Link>
          )}

          {user ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth">
                <Button variant="coral" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
