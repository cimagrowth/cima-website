import { motion } from "framer-motion";

const SocialProof = () => {
  const verticals = [
    "Fertility",
    "IVF",
    "REI",
    "Regenerative",
    "Wellness",
  ];

  return (
    <section className="py-8 md:py-12 bg-primary relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-light/20 to-primary opacity-50" />
      
      <div className="container-wide relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8">
          <span className="text-sm text-primary-foreground/70 font-medium">
            Built for:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-6">
            {verticals.map((vertical, index) => (
              <span
                key={vertical}
                className="text-sm md:text-base font-medium text-primary-foreground"
              >
                {vertical}
                {index < verticals.length - 1 && (
                  <span className="ml-2 md:ml-6 text-primary-foreground/30">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
