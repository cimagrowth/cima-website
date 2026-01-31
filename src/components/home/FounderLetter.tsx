const FounderLetter = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-body-sm font-medium text-muted-foreground uppercase tracking-wide mb-8">
            From the Founder
          </h3>
          
          <div className="space-y-6 text-body-lg text-foreground">
            <p>I didn't build GrowthOS to be another piece of software.</p>
            
            <p>
              I built it after watching too many clinics lose patients for reasons 
              that had nothing to do with care quality.
            </p>
            
            <p>
              Over the last decade, I've worked inside fertility and regenerative clinics 
              around the world. The pattern was always the same. Great doctors. Great teams. 
              But leads were missed. Follow-up was inconsistent. Systems didn't talk to each other.
            </p>
            
            <p className="font-medium">
              GrowthOS is the system I wish clinics had years ago.
            </p>
            
            <p>
              It's intentionally simple. Every feature exists to help clinics respond faster, 
              follow up longer, and convert more patients without burning out their teams.
            </p>
            
            <p className="text-muted-foreground">
              If GrowthOS feels calm and focused, that's not accidental. It's what clinics need.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="font-semibold text-foreground">— Brandon Hensinger</p>
            <p className="text-body-sm text-muted-foreground mt-1">
              Founder, Cima Growth Solutions
            </p>
            <p className="text-body-sm text-muted-foreground">
              Helping clinics grow since 2013
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderLetter;
