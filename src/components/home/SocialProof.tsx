const SocialProof = () => {
  const verticals = [
    "Fertility",
    "IVF",
    "REI",
    "Regenerative",
    "Functional Medicine",
  ];

  return (
    <section className="py-12 bg-background-soft border-y border-border">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <span className="text-body-sm text-muted-foreground font-medium">
            Trusted by clinics in:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            {verticals.map((vertical, index) => (
              <span
                key={vertical}
                className="text-body font-medium text-foreground/80"
              >
                {vertical}
                {index < verticals.length - 1 && (
                  <span className="ml-3 md:ml-6 text-border">•</span>
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
