"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type {
  PatientCartItem,
  ServicePackage,
  ServicePackageCategory,
  BundleGroup,
  GroupedItems,
} from "@/types/billing";

function groupCartItems(
  items: PatientCartItem[],
  packages: ServicePackage[],
  categories: ServicePackageCategory[]
): GroupedItems<PatientCartItem> {
  const pkgMap = new Map(packages.map((p) => [p.id, p]));
  const catMap = new Map(categories.map((c) => [c.id, c]));

  const bundleMap = new Map<string, PatientCartItem[]>();
  const standalone: PatientCartItem[] = [];

  for (const item of items) {
    if (item.package_id) {
      const list = bundleMap.get(item.package_id) || [];
      list.push(item);
      bundleMap.set(item.package_id, list);
    } else {
      standalone.push(item);
    }
  }

  const bundles: BundleGroup[] = [];

  for (const [packageId, bundleItems] of bundleMap) {
    const pkg = pkgMap.get(packageId);
    const packageName = pkg?.name ?? "Altura Service";

    // Use package_price if available, otherwise sum category bundle prices
    let packagePrice = pkg?.package_price ?? 0;
    if (!packagePrice) {
      const pkgCategories = categories.filter((c) => c.package_id === packageId);
      packagePrice = pkgCategories.reduce((sum, c) => sum + c.altura_bundle_price, 0);
    }

    // Check for discount on any of the bundle items
    const discountPercent = bundleItems.find((i) => i.discount_percent)?.discount_percent ?? null;
    const finalPrice = discountPercent
      ? packagePrice * (1 - discountPercent / 100)
      : packagePrice;

    // Group items by category
    const catGroups = new Map<string, { name: string; items: PatientCartItem[] }>();
    for (const item of bundleItems) {
      const catId = item.category_id ?? "uncategorized";
      const cat = item.category_id ? catMap.get(item.category_id) : null;
      if (!catGroups.has(catId)) {
        catGroups.set(catId, { name: cat?.name ?? "Other", items: [] });
      }
      catGroups.get(catId)!.items.push(item);
    }

    bundles.push({
      packageId,
      packageName,
      packagePrice,
      discountPercent,
      finalPrice,
      items: bundleItems,
      categories: catGroups,
    });
  }

  return { bundles, standalone };
}

export function usePatientCart(patientId: string | null) {
  const [items, setItems] = useState<PatientCartItem[]>([]);
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [categories, setCategories] = useState<ServicePackageCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    if (!patientId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const [cartRes, pkgRes, catRes] = await Promise.all([
        supabase
          .from("patient_cart_items" as any)
          .select("*")
          .eq("patient_id", patientId)
          .order("created_at", { ascending: true }),
        supabase
          .from("service_packages" as any)
          .select("*")
          .eq("is_active", true),
        supabase
          .from("service_package_categories" as any)
          .select("*")
          .order("sort_order", { ascending: true }),
      ]);

      if (cartRes.error) throw cartRes.error;
      if (pkgRes.error) throw pkgRes.error;
      if (catRes.error) throw catRes.error;

      setItems((cartRes.data as unknown as PatientCartItem[]) ?? []);
      setPackages((pkgRes.data as unknown as ServicePackage[]) ?? []);
      setCategories((catRes.data as unknown as ServicePackageCategory[]) ?? []);
    } catch (err: any) {
      setError(err.message ?? "Failed to load cart");
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const grouped = groupCartItems(items, packages, categories);

  return { items, grouped, loading, error, refetch: fetchCart };
}
