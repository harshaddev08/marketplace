import { Button } from "@/components/ui/button";

export const FooterCTA = () => {
  return (
    <section className="py-16 gradient-coral">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Earning?
        </h2>
        <p className="text-white/90 mb-8 max-w-xl mx-auto">
          Join thousands of service providers who are growing their business
          with LocalPro
        </p>
        <Button
          variant="outline"
          size="xl"
          className="bg-white text-primary hover:bg-white/90 border-white"
          onClick={() =>
            document
              .querySelector("form")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Apply Now
        </Button>
      </div>
    </section>
  );
};
