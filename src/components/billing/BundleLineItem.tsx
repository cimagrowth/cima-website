"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { BundleGroup, PatientCartItem, InvoiceLineItem } from "@/types/billing";

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents);
}

interface BundleLineItemProps {
  bundle: BundleGroup;
  /** Patient mode keeps the bundle permanently collapsed with no toggle */
  patientMode?: boolean;
  /** Print mode renders expanded without interactive toggle */
  printExpanded?: boolean;
}

export function BundleLineItem({
  bundle,
  patientMode = false,
  printExpanded = false,
}: BundleLineItemProps) {
  const hasDiscount =
    bundle.discountPercent != null && bundle.discountPercent > 0;

  // Patient-facing: single line, no toggle
  if (patientMode) {
    return (
      <div className="flex items-center justify-between py-3 px-4 border-b border-gray-100">
        <span className="font-medium text-gray-900">{bundle.packageName}</span>
        <PriceDisplay
          original={bundle.packagePrice}
          final={bundle.finalPrice}
          discountPercent={bundle.discountPercent}
          hasDiscount={hasDiscount}
        />
      </div>
    );
  }

  // Print mode: render flat (no accordion interaction)
  if (printExpanded) {
    return (
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-t-md">
          <span className="font-semibold text-gray-900">
            {bundle.packageName}
          </span>
          <PriceDisplay
            original={bundle.packagePrice}
            final={bundle.finalPrice}
            discountPercent={bundle.discountPercent}
            hasDiscount={hasDiscount}
          />
        </div>
        <ItemizedBreakdown bundle={bundle} />
      </div>
    );
  }

  // Staff interactive mode: accordion toggle
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={bundle.packageId} className="border-b border-gray-100">
        <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 hover:no-underline">
          <div className="flex items-center justify-between w-full pr-2">
            <div className="flex flex-col items-start gap-0.5">
              <span className="font-semibold text-gray-900">
                {bundle.packageName}
              </span>
              <span className="text-xs text-gray-500">
                {bundle.items.length} items &middot; View Itemized Breakdown
              </span>
            </div>
            <PriceDisplay
              original={bundle.packagePrice}
              final={bundle.finalPrice}
              discountPercent={bundle.discountPercent}
              hasDiscount={hasDiscount}
            />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <ItemizedBreakdown bundle={bundle} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function PriceDisplay({
  original,
  final: finalPrice,
  discountPercent,
  hasDiscount,
}: {
  original: number;
  final: number;
  discountPercent: number | null;
  hasDiscount: boolean;
}) {
  if (!hasDiscount) {
    return (
      <span className="font-semibold text-gray-900 tabular-nums">
        {formatCurrency(original)}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2 text-right">
      <span className="text-sm text-gray-400 line-through tabular-nums">
        {formatCurrency(original)}
      </span>
      <span className="text-xs font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
        -{discountPercent}%
      </span>
      <span className="font-semibold text-gray-900 tabular-nums">
        {formatCurrency(finalPrice)}
      </span>
    </div>
  );
}

function ItemizedBreakdown({ bundle }: { bundle: BundleGroup }) {
  return (
    <div className="bg-gray-50 rounded-md divide-y divide-gray-100">
      {Array.from(bundle.categories.entries()).map(
        ([catId, { name, items }]) => (
          <div key={catId} className="py-2 px-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              {name}
            </div>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-1 text-sm"
              >
                <span className="text-gray-700">
                  {(item as PatientCartItem | InvoiceLineItem).cpt_code && (
                    <span className="text-gray-400 mr-1.5 font-mono text-xs">
                      {(item as PatientCartItem | InvoiceLineItem).cpt_code}
                    </span>
                  )}
                  {item.item_name}
                </span>
                <span className="text-gray-500 tabular-nums">
                  {formatCurrency(
                    (item as PatientCartItem | InvoiceLineItem).unit_price *
                      (item as PatientCartItem | InvoiceLineItem).quantity
                  )}
                </span>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
