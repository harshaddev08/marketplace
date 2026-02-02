import { Search, Users, CalendarCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Choose Service & Time",
    description:
      "Tell us what you need and when. Our smart system suggests the best available slots.",
    color: "coral",
  },
  {
    icon: Users,
    step: "02",
    title: "Get Best-Matched Provider",
    description:
      "We match you with verified professionals based on skills, ratings, and proximity.",
    color: "teal",
  },
  {
    icon: CalendarCheck,
    step: "03",
    title: "Book & Track in Real Time",
    description:
      "Confirm your booking and track your provider's arrival with live updates.",
    color: "sky",
  },
];

const colorStyles: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  coral: {
    bg: "bg-coral-light",
    text: "text-coral",
    border: "border-coral/30",
  },
  teal: { bg: "bg-teal-light", text: "text-teal", border: "border-teal/30" },
  sky: { bg: "bg-sky-light", text: "text-sky", border: "border-sky/30" },
};

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-teal-light text-teal text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Book your perfect service provider in three easy steps
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-coral/50 via-teal/50 to-sky/50" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const styles = colorStyles[step.color];

              return (
                <div
                  key={step.step}
                  className={`relative group animate-fade-up stagger-${index + 1}`}
                >
                  <div className="glass-card p-8 rounded-3xl hover-lift text-center">
                    {/* Step number */}
                    <div
                      className={`absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full ${styles.bg} border-4 border-background flex items-center justify-center`}
                    >
                      <span className={`text-sm font-bold ${styles.text}`}>
                        {step.step}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-20 h-20 rounded-3xl ${styles.bg} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-10 h-10 ${styles.text}`} />
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-6 w-12 h-12 -translate-y-1/2 items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

