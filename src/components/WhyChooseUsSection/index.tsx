import { Star, CheckCircle, Clock, Users } from "lucide-react";

const stats = [
  {
    icon: CheckCircle,
    value: "10,000+",
    label: "Completed Jobs",
    color: "mint",
  },
  {
    icon: Star,
    value: "4.8★",
    label: "Average Rating",
    color: "amber",
  },
  {
    icon: Clock,
    value: "<30 min",
    label: "Avg. Response Time",
    color: "teal",
  },
  {
    icon: Users,
    value: "2,500+",
    label: "Verified Providers",
    color: "coral",
  },
];

const colorStyles: Record<string, { bg: string; icon: string }> = {
  coral: { bg: "bg-coral-light", icon: "text-coral" },
  teal: { bg: "bg-teal-light", icon: "text-teal" },
  mint: { bg: "bg-mint-light", icon: "text-mint" },
  amber: { bg: "bg-amber-light", icon: "text-amber" },
};

export const WhyChooseUsSection = () => {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-mint-light text-mint text-sm font-semibold mb-4">
            Our Track Record
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose LocalPro
          </h2>
          <p className="text-lg text-muted-foreground">
            Numbers that speak for themselves
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const styles = colorStyles[stat.color];

            return (
              <div
                key={stat.label}
                className={`glass-card p-8 rounded-3xl text-center hover-lift animate-fade-up stagger-${index + 1}`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${styles.bg} flex items-center justify-center mx-auto mb-5`}
                >
                  <Icon className={`w-8 h-8 ${styles.icon}`} />
                </div>
                <p className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

