"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";

interface EnterpriseInquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FORM_FIELDS = [
  { key: "first_name", type: "text", label: "First Name", required: true, placeholder: "Jane" },
  { key: "last_name", type: "text", label: "Last Name", required: true, placeholder: "Smith" },
  { key: "email", type: "email", label: "Work Email", required: true, placeholder: "jane@organization.com" },
  { key: "phone", type: "tel", label: "Phone Number", required: true, placeholder: "(555) 123-4567" },
  { key: "company_name", type: "text", label: "Organization Name", required: true, placeholder: "Your Organization" },
  { key: "company_website", type: "url", label: "Website", required: false, placeholder: "https://yourorganization.com" },
  { key: "number_of_locations", type: "select", label: "Number of Locations", required: true, options: ["1-5", "6-15", "16-30", "31-50", "50+"] },
  { key: "current_crm", type: "select", label: "Current CRM", required: true, options: ["Salesforce", "HubSpot", "GoHighLevel", "Other", "None"] },
  { key: "primary_interest", type: "select", label: "Primary Interest", required: true, options: ["AI Patient Engagement Agent", "AI-Powered Advertising", "Full Patient Acquisition Platform", "Custom Solution"] },
  { key: "additional_info", type: "textarea", label: "Tell us about your needs", required: false, placeholder: "Describe your organization, current challenges, and what you are looking to achieve..." },
] as const;

type FieldKey = (typeof FORM_FIELDS)[number]["key"];

const EnterpriseInquiryModal = ({ open, onOpenChange }: EnterpriseInquiryModalProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (key: FieldKey, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    for (const field of FORM_FIELDS) {
      if (field.required && !formData[field.key]?.trim()) {
        setError(`${field.label} is required.`);
        return;
      }
    }

    setSubmitting(true);

    try {
      const params = new URLSearchParams(window.location.search);
      const response = await fetch(
        "https://momssbzlofjodqodvvvk.supabase.co/functions/v1/form-submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            form_id: "ac1f2a60-102a-450b-9941-e31cbab298f5",
            org_id: "1372de10-066f-437e-941e-643deefebf2f",
            data: formData,
            source_url: window.location.href,
            utm_source: params.get("utm_source") || undefined,
            utm_medium: params.get("utm_medium") || undefined,
            utm_campaign: params.get("utm_campaign") || undefined,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Submission failed. Please try again.");
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      // Reset state when modal closes
      setTimeout(() => {
        setFormData({});
        setSubmitted(false);
        setError(null);
      }, 200);
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-body-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent-orange/40 focus:border-accent-orange transition-colors";

  const labelClasses = "block text-body-sm font-medium text-foreground mb-1.5";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-orange/10">
              <CheckCircle className="h-8 w-8 text-accent-orange" />
            </div>
            <DialogHeader className="items-center">
              <DialogTitle className="text-heading-sm text-foreground">
                Thank you!
              </DialogTitle>
              <DialogDescription className="text-body text-muted-foreground mt-2 max-w-md">
                A member of our enterprise team will reach out within 24 hours to schedule a discovery call.
              </DialogDescription>
            </DialogHeader>
            <Button
              variant="hero"
              className="mt-8 bg-accent-orange hover:brightness-110"
              onClick={() => handleOpenChange(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-heading-sm text-foreground">
                Enterprise Inquiry
              </DialogTitle>
              <DialogDescription className="text-body-sm text-muted-foreground">
                Tell us about your organization and we'll craft a tailored solution.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              {/* First Name + Last Name side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FORM_FIELDS.slice(0, 2).map((field) => (
                  <div key={field.key}>
                    <label htmlFor={field.key} className={labelClasses}>
                      {field.label} {field.required && <span className="text-accent-orange">*</span>}
                    </label>
                    <input
                      id={field.key}
                      type={field.type}
                      required={field.required}
                      placeholder={'placeholder' in field ? field.placeholder : undefined}
                      className={inputClasses}
                      value={formData[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              {/* Email, Phone, Org Name, Website – full width */}
              {FORM_FIELDS.slice(2, 6).map((field) => (
                <div key={field.key}>
                  <label htmlFor={field.key} className={labelClasses}>
                    {field.label} {field.required && <span className="text-accent-orange">*</span>}
                  </label>
                  <input
                    id={field.key}
                    type={field.type}
                    required={field.required}
                    placeholder={'placeholder' in field ? field.placeholder : undefined}
                    className={inputClasses}
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                </div>
              ))}

              {/* Number of Locations + Current CRM side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FORM_FIELDS.slice(6, 8).map((field) => (
                  <div key={field.key}>
                    <label htmlFor={field.key} className={labelClasses}>
                      {field.label} {field.required && <span className="text-accent-orange">*</span>}
                    </label>
                    <select
                      id={field.key}
                      required={field.required}
                      className={inputClasses}
                      value={formData[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                    >
                      <option value="">Select...</option>
                      {'options' in field && field.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* Primary Interest – full width select */}
              {FORM_FIELDS.slice(8, 9).map((field) => (
                <div key={field.key}>
                  <label htmlFor={field.key} className={labelClasses}>
                    {field.label} {field.required && <span className="text-accent-orange">*</span>}
                  </label>
                  <select
                    id={field.key}
                    required={field.required}
                    className={inputClasses}
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  >
                    <option value="">Select...</option>
                    {'options' in field && field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}

              {/* Additional Info – textarea */}
              {FORM_FIELDS.slice(9).map((field) => (
                <div key={field.key}>
                  <label htmlFor={field.key} className={labelClasses}>
                    {field.label}
                  </label>
                  <textarea
                    id={field.key}
                    rows={4}
                    placeholder={'placeholder' in field ? field.placeholder : undefined}
                    className={inputClasses + " resize-none"}
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                </div>
              ))}

              {error && (
                <p className="text-body-sm text-red-600 font-medium">{error}</p>
              )}

              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={submitting}
                className="w-full bg-accent-orange hover:brightness-110"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Request Enterprise Consultation"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EnterpriseInquiryModal;
