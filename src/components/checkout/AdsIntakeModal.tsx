import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const SUPABASE_URL = "https://momssbzlofjodqodvvvk.supabase.co";

const SPECIALTY_OPTIONS = [
  "Fertility/IVF",
  "Aesthetics/Med Spa",
  "Wellness",
  "Regenerative Medicine",
  "Hormone Therapy",
  "Other",
] as const;

const intakeSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email is required").max(255),
  phone: z.string().trim().min(7, "Phone number is required").max(20),
  practiceName: z.string().trim().min(2, "Practice name is required").max(150),
  address: z.string().trim().max(300).optional().or(z.literal("")),
  specialty: z.string().optional().or(z.literal("")),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms to continue" }),
  }),
});

type IntakeFormValues = z.infer<typeof intakeSchema>;

export type AdsPlanType = "ads_monthly" | "ads_annual";

interface AdsIntakeModalProps {
  open: boolean;
  onClose: () => void;
  selectedPlan: AdsPlanType;
}

const planLabels: Record<AdsPlanType, string> = {
  ads_monthly: "Ads Monthly — $399/mo",
  ads_annual: "Ads Annual — $3,999/yr",
};

const AdsIntakeModal = ({ open, onClose, selectedPlan }: AdsIntakeModalProps) => {
  const form = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      practiceName: "",
      address: "",
      specialty: "",
      acceptTerms: undefined as unknown as true,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const apiError = form.formState.errors.root?.message;

  const handleSubmit = async (values: IntakeFormValues) => {
    const params = new URLSearchParams(window.location.search);

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/growthos-signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: values.fullName,
            email: values.email,
            phone: values.phone,
            clinic_name: values.practiceName,
            clinic_address: values.address || "",
            specialty: values.specialty || "",
            plan_type: selectedPlan,
            source_url: window.location.href,
            utm_source: params.get("utm_source") || "",
            utm_medium: params.get("utm_medium") || "",
            utm_campaign: params.get("utm_campaign") || "",
            utm_content: params.get("utm_content") || "",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    } catch (error) {
      form.setError("root", {
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Complete Your Sign Up</DialogTitle>
          <DialogDescription>
            Fill in your details below to continue to payment for the{" "}
            {planLabels[selectedPlan]} plan.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-2">
            {apiError && (
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
                {apiError}
              </div>
            )}

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. Jane Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jane@yourclinic.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone *</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="practiceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Practice Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Bright Fertility Clinic" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Practice Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, City, State ZIP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialty</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your specialty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SPECIALTY_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value === true}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true ? true : undefined)
                      }
                      className="border-white data-[state=checked]:bg-accent-orange data-[state=checked]:border-accent-orange"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal text-muted-foreground">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        target="_blank"
                        className="underline text-foreground hover:text-accent-orange"
                      >
                        Terms of Service
                      </Link>
                      ,{" "}
                      <Link
                        href="/privacy"
                        target="_blank"
                        className="underline text-foreground hover:text-accent-orange"
                      >
                        Privacy Policy
                      </Link>
                      , and{" "}
                      <Link
                        href="/refund-policy"
                        target="_blank"
                        className="underline text-foreground hover:text-accent-orange"
                      >
                        Refund Policy
                      </Link>
                      .
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full bg-accent-orange hover:brightness-110 mt-4 group"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Setting up your account...
                </>
              ) : (
                <>
                  Continue to Payment
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdsIntakeModal;
