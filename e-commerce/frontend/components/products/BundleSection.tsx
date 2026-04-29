"use client";

import { useCartStore } from "@/lib/store";

export interface BundleItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface Props {
  items: BundleItem[];
  bundlePrice: number;
  savings: number;
}

export default function BundleSection({ items, bundlePrice, savings }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddBundle = () => {
    items.forEach((item) =>
      addItem({ id: item.id as unknown as number, name: item.name, price: item.price, quantity: 1 })
    );
  };

  return (
    <section className="mt-24">
      <h2 className="font-headline-md text-headline-md mb-8">Frequently Bought Together</h2>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Product thumbnails */}
          <div className="flex items-center gap-4">
            {items.map((item, i) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-24 h-24 bg-slate-50 rounded-lg p-2 border border-slate-100 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                {i < items.length - 1 && (
                  <span className="material-symbols-outlined text-slate-300">add</span>
                )}
              </div>
            ))}
          </div>

          {/* Bundle CTA */}
          <div className="flex-1 border-t lg:border-t-0 lg:border-l pt-6 lg:pt-0 lg:pl-12 border-slate-100">
            <p className="text-on-surface-variant text-sm mb-1">Bundle Total</p>
            <p className="text-2xl font-black text-on-surface mb-1">
              ${bundlePrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-secondary font-bold mb-5">
              Save ${savings} on this bundle
            </p>
            <button
              onClick={handleAddBundle}
              className="w-full lg:w-auto px-12 py-3 bg-primary text-white font-button text-button rounded-xl hover:opacity-90 transition-all active:scale-[0.98]"
            >
              Add {items.length} Items to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
