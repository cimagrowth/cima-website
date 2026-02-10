import { Link } from "react-router-dom";
import type { CheckoutCustomerInfo } from "@/hooks/useCheckout";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  clinicName: z.string().trim().min(2, "Clinic name is required").max(150),
  address: z.string().trim().min(5, "Address is required").max(300),
  phone: z.string().trim().min(7, "Phone number is required").max(20),
  email: z.string().trim().email("Valid email is required").max(255),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms to continue" }),
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface PreCheckoutFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CheckoutCustomerInfo) => void;
  planName: string;
  isLoading: boolean;
}

const PreCheckoutForm = ({ open, onClose, onSubmit, planName, isLoading }: PreCheckoutFormProps) => {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      clinicName: "",
      address: "",
      phone: "",
      email: "",
      acceptTerms: undefined as unknown as true,
    },
  });

  const handleSubmit = (values: SignupFormValues) => {
    const { acceptTerms, ...data } = values;
    onSubmit(data as CheckoutCustomerInfo);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Complete Your Sign Up</DialogTitle>
          <DialogDescription>
            Fill in your details below to continue to payment for the {planName} plan.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clinicName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clinic Name</FormLabel>
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
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, City, State ZIP" {...field} />
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(555) 123-4567" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jane@clinic.com" {...field} />
                  </FormControl>
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
                      onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal text-muted-foreground">
                      I agree to the{" "}
                      <Link to="/terms" target="_blank" className="underline text-foreground hover:text-accent-orange">
                        Terms of Service
                      </Link>
                      ,{" "}
                      <Link to="/privacy" target="_blank" className="underline text-foreground hover:text-accent-orange">
                        Privacy Policy
                      </Link>
                      , and{" "}
                      <Link to="/refund-policy" target="_blank" className="underline text-foreground hover:text-accent-orange">
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
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Continue to Payment
              {!isLoading && (
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PreCheckoutForm;
