"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";

export interface ColorOption {
  name: string;
  bgClass: string;
}

export interface StorageOption {
  label: string;
  price: number;
}

interface Props {
  productId: string;
  productName: string;
  compareAtPrice: number;
  specs: string[];
  colors: ColorOption[];
  storageOptions: StorageOption[];
}

export default function ProductConfig({
  productId,
  productName,
  compareAtPrice,
  specs,
  colors,
  storageOptions,
}: Props) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  const price = storageOptions[selectedStorage].price;

  const handleAddToCart = () => {
    addItem({
      id: productId as unknown as number,
      name: `${productName} — ${storageOptions[selectedStorage].label} / ${colors[selectedColor].name}`,
      price,
      quantity: 1,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Price */}
      <div className="flex items-baseline gap-4">
        <span className="text-3xl font-black text-secondary">
          ${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
        <span className="text-on-surface-variant line-through text-sm">
          ${compareAtPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Spec chips */}
      <div className="flex flex-wrap gap-2">
        {specs.map((spec) => (
          <span
            key={spec}
            className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-xs font-semibold"
          >
            {spec}
          </span>
        ))}
      </div>

      <div className="space-y-6">
        {/* Color */}
        <div>
          <span className="text-label-caps text-on-surface-variant block mb-3">
            Color Selection
          </span>
          <div className="flex gap-3">
            {colors.map((color, i) => (
              <button
                key={color.name}
                title={color.name}
                onClick={() => setSelectedColor(i)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${color.bgClass} ${
                  selectedColor === i
                    ? "border-secondary ring-2 ring-offset-2 ring-secondary/40"
                    : "border-transparent hover:border-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Storage */}
        <div>
          <span className="text-label-caps text-on-surface-variant block mb-3">
            Storage Capacity
          </span>
          <div className="grid grid-cols-3 gap-3">
            {storageOptions.map((opt, i) => (
              <button
                key={opt.label}
                onClick={() => setSelectedStorage(i)}
                className={`py-3 px-4 rounded-lg border-2 font-semibold text-center text-sm transition-colors ${
                  selectedStorage === i
                    ? "border-secondary bg-surface-container-low text-secondary"
                    : "border-outline-variant hover:border-secondary text-on-surface"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="space-y-3 pt-2">
        <button
          onClick={handleAddToCart}
          className="w-full py-4 bg-secondary text-white font-button text-button rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-secondary/20"
        >
          Add to Cart
        </button>
        <button className="w-full py-4 bg-transparent border-2 border-primary text-primary font-button text-button rounded-xl hover:bg-primary hover:text-white active:scale-[0.98] transition-all">
          Build Your Custom Spec
        </button>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100">
          <span className="material-symbols-outlined text-secondary">local_shipping</span>
          <span className="text-xs font-medium text-on-surface-variant">Free 2-Day Shipping</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100">
          <span className="material-symbols-outlined text-secondary">verified</span>
          <span className="text-xs font-medium text-on-surface-variant">3 Year Warranty</span>
        </div>
      </div>
    </div>
  );
}
