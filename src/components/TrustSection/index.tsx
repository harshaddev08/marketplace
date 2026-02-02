import { Zap, Clock, Shield, DollarSign } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Smart Matching",
    description:
      "AI-powered algorithm finds the perfect provider based on your needs, location, and preferences.",
    color: "coral",
  },
  {
    icon: Clock,
    title: "Real-Time Availability",
    description:
      "See live availability and book instantly. No more waiting for callbacks or quotes.",
    color: "teal",
  },
  {
    icon: Shield,
    title: "Verified Providers",
    description:
      "Every professional is background-checked, licensed, and rated by real customers.",
    color: "mint",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description:
      "Upfront pricing with no hidden fees. Know exactly what you'll pay before booking.",
    color: "sky",
  },
];

const colorStyles: Record<string, { bg: string; icon: string }> = {
  coral: { bg: "bg-coral-light", icon: "text-coral" },
  teal: { bg: "bg-teal-light", icon: "text-teal" },
  mint: { bg: "bg-mint-light", icon: "text-mint" },
  sky: { bg: "bg-sky-light", icon: "text-sky" },
};

export const TrustSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-up">
            Why Customers Trust Us
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-up stagger-1">
            Built for speed, reliability, and peace of mind
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const styles = colorStyles[feature.color];

            return (
              <div
                key={feature.title}
                className={`glass-card p-6 rounded-2xl hover-lift group animate-fade-up stagger-${index + 1}`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${styles.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-7 h-7 ${styles.icon}`} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

