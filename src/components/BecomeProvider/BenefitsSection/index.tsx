import { LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  benefits: Benefit[];
}

export const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Become a Provider?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our platform and unlock new opportunities to grow your service
            business
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
  );
};
