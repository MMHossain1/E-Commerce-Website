"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";

const navLinks = [
  { href: "/products/laptops", label: "Laptops", active: false },
  { href: "/products/tablets", label: "Tablets", active: false },
  { href: "/products/audio", label: "Audio", active: false },
  { href: "/products/components", label: "Components", active: false },
];

export default function Navbar() {
  const [search, setSearch] = useState("");
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
        {/* Left: Logo + nav links */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xl font-black tracking-tighter text-slate-900 dark:text-white"
          >
            TECHCORE
          </Link>
          <ul className="hidden md:flex gap-6 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-200 text-sm font-medium tracking-tight"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Search + icons */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]!">
              search
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search tech..."
              className="pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all w-64"
            />
          </div>

          <Link href="/cart" className="relative p-2 text-slate-600 hover:text-secondary transition-all active:scale-95">
            <span className="material-symbols-outlined">shopping_cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-secondary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          <Link href="/auth/login" className="p-2 text-slate-600 hover:text-secondary transition-all active:scale-95">
            <span className="material-symbols-outlined">person</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
