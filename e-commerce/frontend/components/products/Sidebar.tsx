"use client";

import { useState } from "react";

const BRANDS = ["CoreTech Pro", "Zenith Systems", "Nexus Labs"];
const SPECS = ["16GB RAM", "32GB RAM", "M3 Ultra", "1TB SSD"];

export interface SidebarFilters {
  brands: string[];
  priceMax: number;
  specs: string[];
  minRating: number;
}

interface Props {
  onChange: (filters: SidebarFilters) => void;
}

export default function Sidebar({ onChange }: Props) {
  const [brands, setBrands] = useState<string[]>(["CoreTech Pro"]);
  const [priceMax, setPriceMax] = useState(4500);
  const [specs, setSpecs] = useState<string[]>(["M3 Ultra"]);
  const [minRating, setMinRating] = useState(0);

  const toggle = <T,>(list: T[], item: T): T[] =>
    list.includes(item) ? list.filter((x) => x !== item) : [...list, item];

  const emit = (patch: Partial<SidebarFilters>) => {
    const next = { brands, priceMax, specs, minRating, ...patch };
    onChange(next);
    if ("brands" in patch) setBrands(next.brands);
    if ("priceMax" in patch) setPriceMax(next.priceMax);
    if ("specs" in patch) setSpecs(next.specs);
    if ("minRating" in patch) setMinRating(next.minRating);
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
      <h3 className="font-title-sm text-title-sm">Filters</h3>

      {/* Brand */}
      <div>
        <p className="text-label-caps text-on-surface-variant mb-3">Brand</p>
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={brands.includes(brand)}
                onChange={() => emit({ brands: toggle(brands, brand) })}
                className="rounded border-outline-variant text-secondary focus:ring-secondary"
              />
              <span className="text-sm text-on-surface group-hover:text-secondary transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-200" />

      {/* Price range */}
      <div>
        <p className="text-label-caps text-on-surface-variant mb-3">Price Range</p>
        <div className="space-y-3">
          <input
            type="range"
            min={800}
            max={4500}
            step={100}
            value={priceMax}
            onChange={(e) => emit({ priceMax: Number(e.target.value) })}
            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary"
          />
          <div className="flex justify-between text-xs font-semibold text-slate-500">
            <span>$800</span>
            <span>${priceMax.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-200" />

      {/* Specs */}
      <div>
        <p className="text-label-caps text-on-surface-variant mb-3">Specifications</p>
        <div className="flex flex-wrap gap-2">
          {SPECS.map((spec) => (
            <button
              key={spec}
              onClick={() => emit({ specs: toggle(specs, spec) })}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                specs.includes(spec)
                  ? "bg-secondary text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-on-surface"
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-200" />

      {/* Rating */}
      <div>
        <p className="text-label-caps text-on-surface-variant mb-3">Minimum Rating</p>
        <div className="space-y-2">
          {[4, 3, 2].map((r) => (
            <label key={r} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={minRating === r}
                onChange={() => emit({ minRating: r })}
                className="text-secondary focus:ring-secondary"
              />
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400">
                  {Array.from({ length: r }, (_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-xs text-slate-500">& Up</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
