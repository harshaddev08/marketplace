import { Search, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden pt-20 md:pt-24">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-coral/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-teal/10 rounded-full blur-3xl animate-float stagger-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-12 md:py-20">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-light text-coral text-sm font-medium mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse-soft" />
            Trusted by 10,000+ customers
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6 animate-fade-up stagger-1">
            Find the Best{" "}
            <span className="text-gradient">Service Provider</span> Near You
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up stagger-2">
            Connect instantly with verified local experts. Book trusted
            professionals for your home & business needs in minutes.
          </p>

          {/* Search Card */}
          <div className="glass-card p-4 md:p-6 max-w-2xl mx-auto lg:mx-0 animate-fade-up stagger-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Service Input */}
              <div className="relative md:col-span-2 lg:col-span-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="What do you need?"
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-coral/30 transition-all"
                />
              </div>

              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-coral/30 transition-all"
                />
              </div>

              {/* Date/Time */}
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Date & Time"
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-coral/30 transition-all"
                />
              </div>

              {/* Search Button */}
              <Button variant="hero" className="h-12 w-full">
                Find Provider
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Quick suggestions */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
              <span className="text-xs text-muted-foreground">Popular:</span>
              {["Plumber", "Electrician", "Cleaner", "AC Repair"].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-foreground hover:bg-coral-light hover:text-coral transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="flex-1 relative hidden lg:block">
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Main illustration container */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-coral/20 via-teal/10 to-sky/20 blur-2xl" />

            {/* Floating cards */}
            <div className="absolute top-[10%] left-[5%] glass-card p-4 rounded-2xl animate-float shadow-lifted">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-mint-light flex items-center justify-center">
                  <span className="text-lg">✓</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Verified Provider
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Background checked
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute top-[30%] right-[5%] glass-card p-4 rounded-2xl animate-float stagger-2 shadow-lifted">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-light flex items-center justify-center">
                  <span className="text-lg">⭐</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    4.9 Rating
                  </p>
                  <p className="text-xs text-muted-foreground">2,847 reviews</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[20%] left-[10%] glass-card p-4 rounded-2xl animate-float stagger-3 shadow-lifted">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-light flex items-center justify-center">
                  <span className="text-lg">📍</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    2.3 km away
                  </p>
                  <p className="text-xs text-muted-foreground">Available now</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[5%] right-[15%] glass-card p-4 rounded-2xl animate-float stagger-4 shadow-lifted">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-coral-light flex items-center justify-center">
                  <span className="text-lg">🔥</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Fast Booking
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Under 2 minutes
                  </p>
                </div>
              </div>
            </div>

            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full gradient-coral opacity-20 animate-pulse-soft" />
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

