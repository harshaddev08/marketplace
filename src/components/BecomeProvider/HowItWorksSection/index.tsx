interface Step {
  step: string;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  steps: Step[];
}

export const HowItWorksSection = ({ steps }: HowItWorksSectionProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Getting started as a provider is quick and easy
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((item, index) => (
            <div key={index} className="text-center relative">
              <div className="w-16 h-16 rounded-2xl gradient-coral flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
              {index < 2 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-linear-to-r from-primary/20 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
