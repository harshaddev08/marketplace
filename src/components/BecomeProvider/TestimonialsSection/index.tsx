import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  rating: number;
  text: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection = ({
  testimonials,
}: TestimonialsSectionProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Hear from Our Providers
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-soft border border-border"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">{testimonial.text}</p>
              <div>
                <div className="font-semibold text-foreground">
                  {testimonial.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
