"use client";

import { useCartStore } from "@/lib/store";
import StarRating from "./StarRating";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: { label: string; variant: "primary" | "secondary" };
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id as unknown as number,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden product-card-shadow transition-all group relative">
      {/* Image */}
      <div className="h-64 overflow-hidden bg-slate-50 flex items-center justify-center p-8">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-title-sm text-title-sm text-on-surface">{product.name}</h3>
          <span className="text-secondary font-bold text-lg">${product.price.toLocaleString()}</span>
        </div>

        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{product.description}</p>

        <div className="mb-6">
          <StarRating rating={product.rating} reviews={product.reviews} />
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-secondary text-white py-3 rounded-lg font-button text-button hover:bg-on-secondary-fixed-variant transition-colors active:scale-[0.98] duration-150 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
          Quick Add
        </button>
      </div>

      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4">
          <span
            className={`${
              product.badge.variant === "secondary" ? "bg-secondary" : "bg-primary"
            } text-white text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase`}
          >
            {product.badge.label}
          </span>
        </div>
      )}
    </div>
  );
}
