'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

type PlanType = "monthly" | "annual";

export interface CheckoutCustomerInfo {
  fullName: string;
  clinicName: string;
  address: string;
  phone: string;
  email: string;
}

export function useCheckout() {
  const [isLoading, setIsLoading] = useState<PlanType | null>(null);
  const [pendingPlan, setPendingPlan] = useState<PlanType | null>(null);
  const { session } = useAuth();
  const subscription = { subscribed: false };
  const router = useRouter();

  const initiateCheckout = (plan: PlanType) => {
    if (subscription.subscribed) {
      toast({
        title: "Already subscribed",
        description: "You already have an active subscription. Manage it from the customer portal.",
        variant: "default",
      });
      return;
    }
    setPendingPlan(plan);
  };

  const cancelCheckout = () => {
    setPendingPlan(null);
  };

  const handleCheckout = async (plan: PlanType, customerInfo: CheckoutCustomerInfo) => {
    setIsLoading(plan);

    try {
      const headers: Record<string, string> = {};
      
      if (session?.access_token) {
        headers.Authorization = `Bearer ${session.access_token}`;
      }

      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { plan, customerInfo },
        headers,
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
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
      setPendingPlan(null);
    }
  };

  const handleManageSubscription = async () => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to manage your subscription.",
        variant: "default",
      });
      router.push("/admin/login?redirect=/sign-up");
      return;
    }

    setIsLoading("monthly");

    try {
      const { data, error } = await supabase.functions.invoke("customer-portal", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
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
    pendingPlan,
    initiateCheckout,
    cancelCheckout,
    handleCheckout,
    handleManageSubscription,
  };
}
