"use client";

import { useState } from "react";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export interface LineItemData {
  id: string;
  item_name: string;
  cpt_code: string | null;
  description?: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface EditableLineItemProps {
  item: LineItemData;
  canEdit: boolean;
  onSave: (id: string, updates: { quantity: number; unit_price: number; description?: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function EditableLineItem({ item, canEdit, onSave, onDelete }: EditableLineItemProps) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [qty, setQty] = useState(item.quantity);
  const [price, setPrice] = useState(item.unit_price);
  const [desc, setDesc] = useState(item.description ?? item.item_name);

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(item.id, { quantity: qty, unit_price: price, description: desc });
      setEditing(false);
    } catch {
      // parent should handle error display
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Remove this line item?")) return;
    setDeleting(true);
    try {
      await onDelete(item.id);
    } catch {
      setDeleting(false);
    }
  }

  function handleCancel() {
    setQty(item.quantity);
    setPrice(item.unit_price);
    setDesc(item.description ?? item.item_name);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="py-3 px-4 bg-blue-50/50 border-b border-gray-100 space-y-2">
        <div className="grid grid-cols-[1fr_80px_100px] gap-2 items-end">
          <div>
            <label className="text-xs text-gray-500">Description</label>
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Qty</label>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400 tabular-nums"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Unit Price</label>
            <input
              type="number"
              min={0}
              step={0.01}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400 tabular-nums"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Total: {formatCurrency(qty * price)}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-3 px-4 group">
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-medium text-gray-900 truncate">
          {item.item_name}
        </span>
        {item.cpt_code && (
          <span className="text-xs text-gray-400 font-mono">{item.cpt_code}</span>
        )}
        {item.quantity > 1 && (
          <span className="text-xs text-gray-400">
            {item.quantity} x {formatCurrency(item.unit_price)}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-900 tabular-nums">
          {formatCurrency(item.total_price)}
        </span>
        {canEdit && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setEditing(true)}
              className="p-1 text-gray-400 hover:text-blue-600 rounded"
              title="Edit"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="p-1 text-gray-400 hover:text-red-600 rounded disabled:opacity-50"
              title="Delete"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
