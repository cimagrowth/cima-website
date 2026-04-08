"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type {
  Invoice,
  InvoiceLineItem,
  ServicePackage,
  ServicePackageCategory,
  BundleGroup,
  GroupedItems,
} from "@/types/billing";

function groupLineItems(
  items: InvoiceLineItem[],
  packages: ServicePackage[],
  categories: ServicePackageCategory[],
  invoiceDiscount: number | null
): GroupedItems<InvoiceLineItem> {
  const pkgMap = new Map(packages.map((p) => [p.id, p]));
  const catMap = new Map(categories.map((c) => [c.id, c]));

  const bundleMap = new Map<string, InvoiceLineItem[]>();
  const standalone: InvoiceLineItem[] = [];

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

    let packagePrice = pkg?.package_price ?? 0;
    if (!packagePrice) {
      const pkgCategories = categories.filter((c) => c.package_id === packageId);
      packagePrice = pkgCategories.reduce((sum, c) => sum + c.altura_bundle_price, 0);
    }

    const discountPercent = invoiceDiscount ?? null;
    const finalPrice = discountPercent
      ? packagePrice * (1 - discountPercent / 100)
      : packagePrice;

    const catGroups = new Map<string, { name: string; items: InvoiceLineItem[] }>();
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

export function useInvoice(invoiceId: string | null) {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([]);
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [categories, setCategories] = useState<ServicePackageCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoice = useCallback(async () => {
    if (!invoiceId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const [invRes, itemsRes, pkgRes, catRes] = await Promise.all([
        supabase
          .from("invoices" as any)
          .select("*")
          .eq("id", invoiceId)
          .single(),
        supabase
          .from("invoice_line_items" as any)
          .select("*")
          .eq("invoice_id", invoiceId)
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

      if (invRes.error) throw invRes.error;
      if (itemsRes.error) throw itemsRes.error;
      if (pkgRes.error) throw pkgRes.error;
      if (catRes.error) throw catRes.error;

      setInvoice((invRes.data as Invoice) ?? null);
      setLineItems((itemsRes.data as InvoiceLineItem[]) ?? []);
      setPackages((pkgRes.data as ServicePackage[]) ?? []);
      setCategories((catRes.data as ServicePackageCategory[]) ?? []);
    } catch (err: any) {
      setError(err.message ?? "Failed to load invoice");
    } finally {
      setLoading(false);
    }
  }, [invoiceId]);

  useEffect(() => {
    fetchInvoice();
  }, [fetchInvoice]);

  const grouped = groupLineItems(
    lineItems,
    packages,
    categories,
    invoice?.discount_percent ?? null
  );

  return { invoice, lineItems, grouped, loading, error, refetch: fetchInvoice };
}
