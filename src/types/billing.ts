export interface ServicePackage {
  id: string;
  name: string;
  description: string | null;
  package_price: number;
  is_active: boolean;
  created_at: string | null;
}

export interface ServicePackageCategory {
  id: string;
  package_id: string;
  name: string;
  sort_order: number;
  altura_bundle_price: number;
  created_at: string | null;
}

export interface ServicePackageItem {
  id: string;
  category_id: string;
  package_id: string;
  cpt_code: string | null;
  item_name: string;
  unit_price: number;
  quantity: number;
  sort_order: number;
  created_at: string | null;
}

export interface PatientCartItem {
  id: string;
  patient_id: string;
  item_type: string;
  item_name: string;
  cpt_code: string | null;
  unit_price: number;
  quantity: number;
  total_price: number;
  is_bundle: boolean;
  package_id: string | null;
  category_id: string | null;
  discount_percent: number | null;
  created_at: string | null;
}

export interface InvoiceLineItem {
  id: string;
  invoice_id: string;
  item_type: string;
  item_name: string;
  cpt_code: string | null;
  unit_price: number;
  quantity: number;
  total_price: number;
  is_bundle: boolean;
  package_id: string | null;
  category_id: string | null;
  created_at: string | null;
}

export interface Invoice {
  id: string;
  patient_id: string;
  invoice_number: string;
  status: string;
  subtotal: number;
  discount_percent: number | null;
  discount_amount: number | null;
  total: number;
  created_at: string | null;
  line_items?: InvoiceLineItem[];
}

/** A bundle group: one visual row representing all items sharing a package_id */
export interface BundleGroup {
  packageId: string;
  packageName: string;
  packagePrice: number;
  discountPercent: number | null;
  finalPrice: number;
  items: PatientCartItem[] | InvoiceLineItem[];
  categories: Map<string, { name: string; items: (PatientCartItem | InvoiceLineItem)[] }>;
}

/** Result of grouping raw items into bundles + standalone items */
export interface GroupedItems<T> {
  bundles: BundleGroup[];
  standalone: T[];
}
