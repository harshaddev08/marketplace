import { ArrowLeft, TrendingUp } from "lucide-react";
import Link from "next/link";
import { StatsSection } from "@/components/BecomeProvider/StatsSection";

interface Stat {
  value: string;
  label: string;
}

interface HeroSectionProps {
  stats: Stat[];
}

export const HeroSection = ({ stats }: HeroSectionProps) => {
  return (
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
            Connect with customers in your area, set your own schedule, and earn
            more doing what you love. Join our network of trusted service
            professionals.
          </p>
        </div>

        {/* Stats */}
        <StatsSection stats={stats} />
      </div>
    </section>
  );
};
