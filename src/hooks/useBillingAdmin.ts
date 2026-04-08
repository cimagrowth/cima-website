"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type {
  AdminRole,
  InvoiceLineItem,
  PatientCartItem,
  AuditEvent,
} from "@/types/billing";
import { EDIT_ROLES } from "@/types/billing";

// ── Role check ──────────────────────────────────────────────

export function useBillingAdminRole() {
  const [role, setRole] = useState<AdminRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setLoading(false); return; }

        const { data } = await supabase
          .from("agency_admins" as any)
          .select("role")
          .eq("id", user.id)
          .single();

        const r = (data as any)?.role as string | null;
        if (r && EDIT_ROLES.includes(r as AdminRole)) {
          setRole(r as AdminRole);
        }
      } catch {
        // not an admin
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const canEdit = role !== null;
  return { role, canEdit, loading };
}

// ── Audit helper ────────────────────────────────────────────

async function logAudit(event: Omit<AuditEvent, "id" | "created_at">) {
  await supabase.from("audit_events" as any).insert(event);
}

async function getCurrentUserId(): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? "unknown";
}

// ── Invoice recalculation ───────────────────────────────────

export async function recalculateInvoiceTotals(invoiceId: string) {
  // Fetch current invoice for paid_amount
  const { data: inv } = await supabase
    .from("invoices" as any)
    .select("paid_amount")
    .eq("id", invoiceId)
    .single();
  const paidAmount = (inv as any)?.paid_amount ?? 0;

  // Sum line items
  const { data: items } = await supabase
    .from("invoice_line_items" as any)
    .select("total_price")
    .eq("invoice_id", invoiceId);
  const totalAmount = (items as any[] ?? []).reduce(
    (sum: number, i: any) => sum + (i.total_price ?? 0),
    0
  );

  await supabase
    .from("invoices" as any)
    .update({
      total_amount: totalAmount,
      subtotal: totalAmount,
      total: totalAmount,
      balance: totalAmount - paidAmount,
      updated_at: new Date().toISOString(),
    })
    .eq("id", invoiceId);

  return { totalAmount, balance: totalAmount - paidAmount };
}

// ── Invoice line item CRUD ──────────────────────────────────

export async function deleteInvoiceLineItem(itemId: string, invoiceId: string) {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("invoice_line_items" as any)
    .delete()
    .eq("id", itemId);
  if (error) throw error;

  await recalculateInvoiceTotals(invoiceId);

  await logAudit({
    event_type: "invoice_edited",
    entity_type: "invoice_line_item",
    entity_id: itemId,
    user_id: userId,
    changes: { action: "delete", invoice_id: invoiceId },
  });
}

export async function updateInvoiceLineItem(
  itemId: string,
  invoiceId: string,
  updates: { quantity?: number; unit_price?: number; description?: string }
) {
  const userId = await getCurrentUserId();

  const patch: Record<string, any> = { ...updates };
  if (updates.quantity != null || updates.unit_price != null) {
    // We need current values for the ones not being updated
    const { data: current } = await supabase
      .from("invoice_line_items" as any)
      .select("quantity, unit_price")
      .eq("id", itemId)
      .single();
    const qty = updates.quantity ?? (current as any)?.quantity ?? 1;
    const price = updates.unit_price ?? (current as any)?.unit_price ?? 0;
    patch.total_price = qty * price;
    patch.quantity = qty;
    patch.unit_price = price;
  }

  const { error } = await supabase
    .from("invoice_line_items" as any)
    .update(patch)
    .eq("id", itemId);
  if (error) throw error;

  await recalculateInvoiceTotals(invoiceId);

  await logAudit({
    event_type: "invoice_edited",
    entity_type: "invoice_line_item",
    entity_id: itemId,
    user_id: userId,
    changes: { action: "update", invoice_id: invoiceId, updates },
  });
}

export async function addInvoiceLineItem(
  invoiceId: string,
  item: {
    item_name: string;
    cpt_code?: string;
    description?: string;
    quantity: number;
    unit_price: number;
  }
) {
  const userId = await getCurrentUserId();

  const row = {
    invoice_id: invoiceId,
    item_type: "custom",
    item_name: item.item_name,
    cpt_code: item.cpt_code || null,
    description: item.description || null,
    quantity: item.quantity,
    unit_price: item.unit_price,
    total_price: item.quantity * item.unit_price,
    is_bundle: false,
    package_id: null,
    category_id: null,
  };

  const { data, error } = await supabase
    .from("invoice_line_items" as any)
    .insert(row)
    .select()
    .single();
  if (error) throw error;

  await recalculateInvoiceTotals(invoiceId);

  await logAudit({
    event_type: "invoice_edited",
    entity_type: "invoice_line_item",
    entity_id: (data as any)?.id ?? "",
    user_id: userId,
    changes: { action: "add", invoice_id: invoiceId, item: row },
  });

  return data;
}

export async function updateInvoiceFields(
  invoiceId: string,
  updates: { notes?: string; status?: string; discount_percent?: number | null }
) {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("invoices" as any)
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", invoiceId);
  if (error) throw error;

  await logAudit({
    event_type: "invoice_edited",
    entity_type: "invoice",
    entity_id: invoiceId,
    user_id: userId,
    changes: { action: "update_fields", updates },
  });
}

// ── Cart item CRUD ──────────────────────────────────────────

export async function deleteCartItem(itemId: string, cartId: string) {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("patient_cart_items" as any)
    .delete()
    .eq("id", itemId);
  if (error) throw error;

  await logAudit({
    event_type: "cart_edited",
    entity_type: "patient_cart_item",
    entity_id: itemId,
    user_id: userId,
    changes: { action: "delete", cart_id: cartId },
  });
}

export async function updateCartItem(
  itemId: string,
  updates: { quantity?: number; unit_price?: number; item_name?: string }
) {
  const userId = await getCurrentUserId();

  const patch: Record<string, any> = { ...updates };
  if (updates.quantity != null || updates.unit_price != null) {
    const { data: current } = await supabase
      .from("patient_cart_items" as any)
      .select("quantity, unit_price")
      .eq("id", itemId)
      .single();
    const qty = updates.quantity ?? (current as any)?.quantity ?? 1;
    const price = updates.unit_price ?? (current as any)?.unit_price ?? 0;
    patch.total_price = qty * price;
    patch.quantity = qty;
    patch.unit_price = price;
  }

  const { error } = await supabase
    .from("patient_cart_items" as any)
    .update(patch)
    .eq("id", itemId);
  if (error) throw error;

  await logAudit({
    event_type: "cart_edited",
    entity_type: "patient_cart_item",
    entity_id: itemId,
    user_id: userId,
    changes: { action: "update", updates },
  });
}

export async function addCartItem(
  cartId: string,
  patientId: string,
  item: {
    item_name: string;
    cpt_code?: string;
    quantity: number;
    unit_price: number;
  }
) {
  const userId = await getCurrentUserId();

  const row = {
    cart_id: cartId,
    patient_id: patientId,
    item_type: "custom",
    item_name: item.item_name,
    cpt_code: item.cpt_code || null,
    quantity: item.quantity,
    unit_price: item.unit_price,
    total_price: item.quantity * item.unit_price,
    is_bundle: false,
    package_id: null,
    category_id: null,
    catalog_item_id: null,
  };

  const { data, error } = await supabase
    .from("patient_cart_items" as any)
    .insert(row)
    .select()
    .single();
  if (error) throw error;

  await logAudit({
    event_type: "cart_edited",
    entity_type: "patient_cart_item",
    entity_id: (data as any)?.id ?? "",
    user_id: userId,
    changes: { action: "add", cart_id: cartId, item: row },
  });

  return data;
}

export async function updateCartFields(
  cartId: string,
  updates: {
    discount_percent?: number | null;
    discount_note?: string;
    notes?: string;
    status?: string;
  }
) {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("patient_shopping_carts" as any)
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", cartId);
  if (error) throw error;

  await logAudit({
    event_type: "cart_edited",
    entity_type: "patient_shopping_cart",
    entity_id: cartId,
    user_id: userId,
    changes: { action: "update_fields", updates },
  });
}
