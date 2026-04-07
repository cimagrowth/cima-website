"use client";

const FounderLetter = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background relative">
      {/* Subtle side accent - hidden on mobile */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-accent-orange to-transparent hidden md:block" />

      <div className="container-tight relative z-10">
        <div className="max-w-3xl lg:max-w-4xl mx-auto">
          <h3 className="text-xs md:text-sm font-semibold text-accent-orange uppercase tracking-widest mb-6 md:mb-8">
            Why I Built This
          </h3>

          <div className="space-y-4 md:space-y-6 text-base md:text-lg text-foreground">
            <p>
              AI transformed the lab side of fertility medicine. Nobody modernized the front end.
            </p>

            <p>
              I've worked with 100+ healthcare businesses across 6 countries over 15 years — running campaigns, managing real ad budgets, building funnels. I watched clinics spend $10K/month on marketing, then lose half those patients because the front desk was overwhelmed and the follow-up was manual.
            </p>

            <p>
              GrowthOS closes that gap. It's the system I wish existed when I was running campaigns for fertility clinics and watching leads die in spreadsheets.
            </p>
          </div>

          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
            <p className="font-semibold text-foreground text-base md:text-lg">— Brandon Hensinger</p>
            <p className="text-sm text-muted-foreground mt-1">
              Founder, Cima Growth Solutions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderLetter;
