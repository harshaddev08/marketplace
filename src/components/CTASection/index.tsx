import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="gradient-cta rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          {/* Inner decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-coral/20 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-teal/20 to-transparent rounded-full blur-2xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Book a Trusted Local Expert in Minutes
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join thousands of satisfied customers who found their perfect
              service provider through LocalPro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="coral" size="xl">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline-light"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Become a Provider
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
