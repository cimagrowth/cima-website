import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Calendar, Users, BarChart3, ArrowRight } from "lucide-react";
import { useState } from "react";

const Demo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    clinicName: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const benefits = [
    { icon: Calendar, text: "Live walkthrough of GrowthOS" },
    { icon: Users, text: "Pipeline recommendations for your clinic" },
    { icon: BarChart3, text: "Follow-up framework tailored to your workflow" },
    { icon: ArrowRight, text: "Clear next steps — no pressure" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would submit to a backend
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Content */}
            <div>
              <h1 className="text-display-lg md:text-display-xl text-foreground mb-6">
                See GrowthOS in action.
              </h1>
              <p className="text-body-lg text-muted-foreground mb-10">
                Book a 30-minute demo with our team. We'll show you exactly how GrowthOS 
                can help your clinic convert more inquiries into booked patients.
              </p>

              <h3 className="text-heading-sm text-foreground mb-6">What you'll get:</h3>
              <div className="space-y-4 mb-10">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-body text-foreground">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="p-6 rounded-lg bg-accent/50 border border-border">
                <p className="text-body text-muted-foreground">
                  You'll speak with a GrowthOS specialist, not a commission-based salesperson. 
                  We'll send a short prep email so this is actually useful.
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="card-elevated p-8 md:p-10">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-heading-sm text-foreground mb-4">Demo request received</h3>
                  <p className="text-body text-muted-foreground">
                    We'll be in touch within one business day to schedule your walkthrough.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-heading text-foreground mb-6">Book My Demo</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-body-sm font-medium text-foreground mb-2">
                        Your name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-body-sm font-medium text-foreground mb-2">
                        Email address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label htmlFor="clinicName" className="block text-body-sm font-medium text-foreground mb-2">
                        Clinic name
                      </label>
                      <Input
                        id="clinicName"
                        name="clinicName"
                        type="text"
                        required
                        value={formData.clinicName}
                        onChange={handleChange}
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-body-sm font-medium text-foreground mb-2">
                        Phone number <span className="text-muted-foreground">(optional)</span>
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-body-sm font-medium text-foreground mb-2">
                        Anything specific you'd like to discuss? <span className="text-muted-foreground">(optional)</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    <Button variant="hero" size="xl" type="submit" className="w-full">
                      Submit Request
                    </Button>

                    <p className="text-body-sm text-muted-foreground text-center">
                      We'll only use this to follow up about GrowthOS.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Demo;
