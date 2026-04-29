"use client";

import { useState, useMemo } from "react";
import ProductCard, { Product } from "@/components/products/ProductCard";
import Sidebar, { SidebarFilters } from "@/components/products/Sidebar";

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Vanguard Pro X1",
    price: 1899,
    description:
      "M3 Pro Chip, 18GB Unified Memory, 512GB SSD Storage. The benchmark for mobile workstations.",
    rating: 5,
    reviews: 128,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBS3WFfS5vyZl0kNosUJofzD__YfeYh0fLFvEXNdVBe_x7hzP2yFMx_tNZbNp0Si9qSpNHA4pIP-yVEy6UwWkuC4WWPFniBf6q4xK7F0Xzk2hC4o7I082Kce42Rdppszcz7jyNQxJaojXf0A79GqnmpDxgA7Bh3EzMIn694n_FW9dZlIYK-jLEYSaA17SJQgih6T5r-yMXFA58G6lpRFkSnPt77yEO3By15vth-JV2AyUfO3u20-AUZvFDgi1WirsqLiv3fSCLekPp4",
    badge: { label: "Bestseller", variant: "primary" },
  },
  {
    id: "2",
    name: "Titan Stealth 16",
    price: 2499,
    description:
      "RTX 4080, 32GB RAM, 1TB NVMe. Maximum cooling efficiency in a slim chassis.",
    rating: 4,
    reviews: 84,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATlt28M7e-jBE8YJJZsWbQKzLAwIzho93hRrTm2UDAHjlzU8gmM7xKaMA1jZpl5NVcrAI-L5_iJpey-NRTlAHvgNsBp_W2rvtZNMTkhVAWCu6v6fWiHUYdPjHUny-5kEj3Uq_pVfW51WNVFK5TagRbggHpvDBRENiAhkCxuVBrr8kBNlraeyIRxbXJsB-uEZzO7rI1aX4B2kTlCV6AeexpB5FS9LxPLtibGaWlGn2kXerOIjgeZo8K_2ZhmUc4bwPm2nYXSwCt9xvz",
  },
  {
    id: "3",
    name: "Aura Air 13",
    price: 1199,
    description:
      "Fanless design, 18-hour battery, Liquid Retina Display. Perfect for creators on the move.",
    rating: 5,
    reviews: 215,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJWssPaZdnpGSQbFwKKfjA15exFqBU-XGoHQiRo4QO3Mc4Ccfn2huJVl-XTp62S_p2324DhOKw3MdJ6C2hmcudvtisrClrdDJz8e2llGAjp85VWn7fPGyxT_QudByOR7U_6j1NDFmffHvw3V4ZVYyA-ReJVCY7kbce-89SRxB_CorZk0g0pb0MxAQNM-E-RPDvJvjK-NWLDd5SBnAUbo51mSmNXlpeVKMMCczUdfrffIiIEuzvXZnZfQc3ZTZZ9WukrnSZMBNllY-l",
    badge: { label: "New Arrival", variant: "secondary" },
  },
  {
    id: "4",
    name: "Apex Workstation",
    price: 3299,
    description:
      "64GB RAM, 4TB SSD, Liquid Cooling System. For data scientists and heavy rendering.",
    rating: 4.5,
    reviews: 42,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfeV5PqRV8FODB3YJ8D7m9m_ZhCTAihdskfPuEPrDkuDRBgl8SDGK_BuqQ3LlmCPci-a4hz0zYrb25K5CKnfbiQSYZie5kpJ6Q_2V1VX7P8WPxvHo-hSmBI7rPqJaVJK4EajVTS24U96Q1sq_semKNiFmZ6nM0SJFNv4vYBV4BoK3IIMDL8NoQmB6CeMsLhGC3cYVWk04KkBLF4lgSq1rHiV-XKq_D6yiufd4cT2GR2n4A5vcgAwa47qZEUkZv7rpbOJUkgsorYnhF",
  },
  {
    id: "5",
    name: "Nexus Slim G4",
    price: 1549,
    description:
      "Ultra-bright OLED display, 100% DCI-P3 color gamut. The choice for visual designers.",
    rating: 4,
    reviews: 67,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBeAf39A0AtYqtmG3541k5M3uvV3iK3tjtdIGwePeOn9Ec-uxTMHo8Aapu0YqOveKBake9ursjwtodwSUP__fAjotyF9zYZ-IuvJvMsue3ooVRhXOVnvFtb4Uehe03LKXqVgW8b9lONnY9YlVdzEN06EIzJ4IgBehPGOw5WJTiFU_cpDJLgVO39zXKQFdCiESyT2vTNj18DMZR9FW-5P42RWTLLw-KHkQDsGUiMwV-orIG30JXp9plsz62lgLC5JScHybTrFBPhuaWf",
  },
  {
    id: "6",
    name: "DuoView Pro",
    price: 2199,
    description:
      "Dual OLED touchscreens, pressure-sensitive stylus included. Revolutionary multitasking capability.",
    rating: 5,
    reviews: 31,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOxuRFUDWclddwcQ6h1Mk1QhGF91gGqPOZubsmiZ1ICaNhVJ607PeDip8-CiFGt1oTzSmUmCT_T_mqmLwyz6FqtkRMWMyj_HagQpacmB9B_iJjJZ2toae0JVkhTxwIqD1oM8QPhWnjIn1qZI6cNbgtT4_ny97bY_frZ4XC3w22iULIORXib5vw7gk-Vp_pa3ondBxeh0ZpQiiN9xJIYo2Z-X8zqbfvROorC19T-biudOX6wXXpl1uV4cSPPXTraaGdi6hgfQHVlsH",
  },
];

type SortOption = "popular" | "newest" | "price-asc" | "price-desc";

export default function LaptopsPage() {
  const [sort, setSort] = useState<SortOption>("popular");
  const [filters, setFilters] = useState<SidebarFilters>({
    brands: ["CoreTech Pro"],
    priceMax: 4500,
    specs: ["M3 Ultra"],
    minRating: 0,
  });
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    const list = PRODUCTS.filter((p) => p.price <= filters.priceMax && p.rating >= filters.minRating);
    switch (sort) {
      case "price-asc":   return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":  return [...list].sort((a, b) => b.price - a.price);
      case "newest":      return [...list].reverse();
      default:            return list;
    }
  }, [sort, filters]);

  const PER_PAGE = 6;
  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const visible = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-6">
      {/* Page header */}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-display-lg text-primary mb-2">High-Performance Laptops</h1>
            <p className="text-on-surface-variant text-body-md">
              Engineered for professionals who demand absolute reliability and speed.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-label-caps text-on-surface-variant">Sort By</span>
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value as SortOption); setPage(1); }}
              className="bg-white border border-outline-variant rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <Sidebar onChange={(f) => { setFilters(f); setPage(1); }} />

        <section className="flex-grow">
          {visible.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-on-surface-variant">
              No products match your filters.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center">
              <nav className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-slate-50 transition-colors disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                      page === n
                        ? "bg-primary text-white"
                        : "border border-outline-variant hover:bg-slate-50"
                    }`}
                  >
                    {n}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-slate-50 transition-colors disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </nav>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
