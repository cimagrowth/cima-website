import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Zap, MessageCircle, UserCheck, BarChart3, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import SEO from "@/components/seo/SEO";
import JsonLd from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/components/seo/schemas";

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
    { icon: Zap, text: "See the AI respond across channels in real time" },
    { icon: MessageCircle, text: "Watch lead nurturing and stage progression" },
    { icon: UserCheck, text: "Explore the unified inbox and staff alerts" },
    { icon: BarChart3, text: "Review pipelines, automations, and reporting" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const schemas = [
    generateBreadcrumbSchema({
      items: [
        { name: "Home", url: "https://inquiry-to-consult.lovable.app" },
        { name: "Book a Demo", url: "https://inquiry-to-consult.lovable.app/demo" },
      ],
    }),
    generateServiceSchema({
      name: "GrowthOS Demo & Consultation",
      description: "Book a 30-minute walkthrough to see GrowthOS handle real patient inquiries with AI-powered engagement and follow-up automation.",
    }),
  ];

  return (
    <Layout>
      <SEO
        title="Book a Demo – See GrowthOS AI Patient Engagement in Action"
        description="Schedule a 30-minute walkthrough of GrowthOS. Watch AI respond to patient inquiries in real-time across web, phone, text & social. See pipelines, automations & unified inbox. Free consultation for fertility clinics, med spas & regenerative medicine."
        keywords={[
          "GrowthOS demo",
          "healthcare CRM demo",
          "patient engagement demo",
          "AI healthcare software trial",
          "clinic software consultation",
          "med spa CRM demo",
          "fertility clinic software demo",
          "patient follow-up automation demo",
        ]}
        canonical="https://inquiry-to-consult.lovable.app/demo"
      />
      <JsonLd schema={schemas} />
      
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl animate-float delay-300" />
        
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-display-lg md:text-display-xl text-foreground mb-6">
                See GrowthOS handle real patient inquiries{" "}
                <span className="text-gradient-accent">in real time.</span>
              </h1>
              <p className="text-body-lg text-muted-foreground mb-10">
                Book a 30-minute walkthrough with our team. We'll learn about your clinic, 
                then show you the platform, the AI, and how leads move from first touch to booked consult.
              </p>

              <h3 className="text-heading-sm text-foreground mb-6">What you'll see:</h3>
              <div className="space-y-4 mb-10">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary-light flex items-center justify-center flex-shrink-0 shadow-card">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-body text-foreground font-medium">{benefit.text}</span>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="p-6 rounded-xl bg-accent/50 border border-border"
              >
                <p className="text-body text-muted-foreground mb-3">
                  <span className="font-medium text-foreground">What happens next:</span> You'll speak with a GrowthOS specialist 
                  (not a salesperson). We'll learn about your clinic setup, then walk you through 
                  the tools, workflows, and AI so you can see exactly how it functions.
                </p>
                <p className="text-body-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Onboarding:</span> 24–48 hours with a real person guiding you.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Form */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-orange via-secondary to-primary rounded-2xl blur-sm opacity-20" />
              <div className="relative card-elevated p-8 md:p-10">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-orange to-secondary flex items-center justify-center mx-auto mb-6 shadow-glow">
                      <Check className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-heading-sm text-foreground mb-4">Demo request received</h3>
                    <p className="text-body text-muted-foreground">
                      We'll be in touch within one business day to schedule your walkthrough.
                    </p>
                  </motion.div>
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
                          className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
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
                          className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
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
                          className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
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
                          className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
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
                          className="border-border focus:border-accent-orange focus:ring-accent-orange"
                        />
                      </div>

                      <Button variant="hero" size="xl" type="submit" className="w-full group">
                        Submit Request
                        <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>

                      <p className="text-body-sm text-muted-foreground text-center">
                        See the AI + platform together. No pressure.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Demo;