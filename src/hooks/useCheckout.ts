import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

type PlanType = "monthly" | "annual";

export function useCheckout() {
  const [isLoading, setIsLoading] = useState<PlanType | null>(null);
  const { session, subscription } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async (plan: PlanType) => {
    if (!session) {
      // Redirect to login/signup if not authenticated
      toast({
        title: "Sign in required",
        description: "Please sign in or create an account to subscribe.",
        variant: "default",
      });
      navigate("/admin/login?redirect=/pricing");
      return;
    }

    if (subscription.subscribed) {
      toast({
        title: "Already subscribed",
        description: "You already have an active subscription. Manage it from the customer portal.",
        variant: "default",
      });
      return;
    }

    setIsLoading(plan);

    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { plan },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, "_blank");
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast({
        title: "Checkout failed",
        description: err instanceof Error ? err.message : "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to manage your subscription.",
        variant: "default",
      });
      navigate("/admin/login?redirect=/pricing");
      return;
    }

    setIsLoading("monthly"); // Just to show loading state

    try {
      const { data, error } = await supabase.functions.invoke("customer-portal", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, "_blank");
      } else {
        throw new Error("No portal URL returned");
      }
    } catch (err) {
      console.error("Portal error:", err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to open subscription management.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  return {
    isLoading,
    handleCheckout,
    handleManageSubscription,
  };
}
