import {
  Wrench,
  Zap,
  Droplets,
  SprayCan,
  Paintbrush,
  Car,
  TreePine,
  Wind,
} from "lucide-react";

const services = [
  { icon: Wrench, name: "Plumber", color: "sky", jobs: "2.4k+ jobs" },
  { icon: Zap, name: "Electrician", color: "amber", jobs: "1.8k+ jobs" },
  { icon: SprayCan, name: "Cleaner", color: "mint", jobs: "3.1k+ jobs" },
  { icon: Wind, name: "AC Repair", color: "teal", jobs: "1.2k+ jobs" },
  { icon: Paintbrush, name: "Painter", color: "coral", jobs: "980+ jobs" },
  { icon: Car, name: "Auto Care", color: "lavender", jobs: "1.5k+ jobs" },
  { icon: TreePine, name: "Gardener", color: "mint", jobs: "720+ jobs" },
  { icon: Droplets, name: "Pest Control", color: "amber", jobs: "890+ jobs" },
];

const colorStyles: Record<string, { bg: string; icon: string; hover: string }> =
  {
    coral: {
      bg: "bg-coral-light",
      icon: "text-coral",
      hover: "hover:border-coral/30",
    },
    teal: {
      bg: "bg-teal-light",
      icon: "text-teal",
      hover: "hover:border-teal/30",
    },
    mint: {
      bg: "bg-mint-light",
      icon: "text-mint",
      hover: "hover:border-mint/30",
    },
    sky: { bg: "bg-sky-light", icon: "text-sky", hover: "hover:border-sky/30" },
    amber: {
      bg: "bg-amber-light",
      icon: "text-amber",
      hover: "hover:border-amber/30",
    },
    lavender: {
      bg: "bg-lavender-light",
      icon: "text-lavender",
      hover: "hover:border-lavender/30",
    },
  };

export const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-coral-light text-coral text-sm font-semibold mb-4">
            Browse Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Popular Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our most booked service categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const styles = colorStyles[service.color];

            return (
              <button
                key={service.name}
                className={`glass-card p-6 rounded-2xl border-2 border-transparent ${styles.hover} hover-lift group text-left transition-all animate-fade-up stagger-${(index % 4) + 1}`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${styles.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-7 h-7 ${styles.icon}`} />
                </div>
                <h3 className="text-base font-bold text-foreground mb-1">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground">{service.jobs}</p>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 text-coral font-semibold hover:underline underline-offset-4">
            View All Services
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

