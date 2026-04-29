"use client";

import { useState } from "react";
import Link from "next/link";

function NotifyButton() {
  const [notified, setNotified] = useState(false);
  return (
    <button
      onClick={() => setNotified(true)}
      className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-bold transition-colors"
    >
      {notified ? "✓ You're on the list" : "Notify Me"}
    </button>
  );
}

export default function NewArrivalsGrid() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary">New Arrivals</h2>
          <p className="text-on-surface-variant mt-2">
            The latest breakthroughs in personal technology.
          </p>
        </div>
        <Link
          href="/products"
          className="text-secondary font-button flex items-center gap-1 hover:gap-2 transition-all"
        >
          Browse All{" "}
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>

      {/* Bento grid: 4 cols × 2 rows, fixed height */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 md:h-[700px]">
        {/* Large card — headphones (col-span-2, row-span-2) */}
        <Link
          href="/products/soniccore-studio-max"
          className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 group"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdxyyceMN16MSUV7pMyfWrCCtJnSnmK8jYwBk9oComooG-HP9lViGYBj9YjjL9m4EDfl2npB1OCnk9IDTP5goUgZzbNqK9rAif2ZIQuI6IkZxdpChoVZZ5jEZIqijYIpA-Wy8Rd7BwtGyVTrZpjEqqpjTJINbLhq5WFgWGlhLsqELLT4QzcAOVZGy06YyIcF5Z7JPeUWJYYW9XrN1-c9o7scKhS0inw1QFIV68KW4UWdp7IV-XU-uAIpieEU-Ty0_X6UOFQgKxsVgm"
            alt="SonicCore Studio Max"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent p-8 flex flex-col justify-end">
            <span className="text-white/70 text-label-caps mb-2">AUDIO EXCELLENCE</span>
            <h3 className="text-white font-title-sm text-title-sm">SonicCore Studio Max</h3>
            <p className="text-white/80 text-sm mt-2 max-w-xs">
              Lossless audio meets industry-leading active noise cancellation.
            </p>
          </div>
        </Link>

        {/* HomeCore Hub */}
        <div className="md:col-span-2 relative overflow-hidden rounded-xl bg-surface-container-low shadow-sm hover:shadow-lg transition-all flex items-center p-8 group">
          <div className="flex-1 space-y-4">
            <span className="text-secondary text-label-caps">SMART HOME</span>
            <h3 className="font-title-sm text-title-sm">HomeCore Hub v4</h3>
            <Link
              href="/products/homecore-hub-v4"
              className="text-primary font-button border-b border-primary pb-1 inline-block"
            >
              Shop Now
            </Link>
          </div>
          <div className="w-1/2">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnHpXq9k5RXUXDpwrKt68DYur15DfMpM_pjMRrjeL3JBthAa_P1Gzuc9qNfQvg3jdU0KWfbLm-e_Ri8w9Ge2gaRSfgFaZhgaLyrSopNyd71AKAo1jJlpt_vgfg-34uX7hOE-oW6HdUKdiSxcjoEcxY_UE2OOpg6EcHtq8yvNQULJEplxrmdlfV0RM5jPsh9bWD-GhP1eMmqKolB848KLG8MJqGZLALUofCJBtS01XGpZoyrITmobvu_lIlsJSQmfX2xFwGI-UeG2KR"
              alt="HomeCore Hub v4"
              className="w-full h-auto drop-shadow-lg group-hover:translate-x-2 transition-transform duration-300"
            />
          </div>
        </div>

        {/* PixelPro 8 */}
        <Link
          href="/products/pixelpro-8"
          className="relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-all group flex flex-col"
        >
          <div className="p-6">
            <h3 className="font-title-sm text-title-sm">PixelPro 8</h3>
            <p className="text-on-surface-variant text-sm mt-1">$899.00</p>
          </div>
          <div className="mt-auto p-4 flex justify-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOhVAqD1k_hSiyyvXzfha9LBVzPrs9fQpQHojt0KVEp3CsPamF26ROi2JWQ4CtuvcDPDEhnUxM7ZmPyeHudR7ACSk8Yl90o6cXkrvW0pg49b5sOuwB-Pc-4HkGuSUe9UjN8c9rN3Py_mDtcpADGlfDrWsuHJaWtW4asnLb0alqiyEt1HqLWuexZH7Y2TyuFdP_OvPGeFBI0hd3ye7LEA1nDBQxYlmfrXU1NTa5ZL_a-AiOSj5UbGiSPZ4_PlMhr6q3TT_UTLJ8NhN7"
              alt="PixelPro 8"
              className="h-40 w-auto group-hover:-translate-y-4 transition-transform duration-500"
            />
          </div>
        </Link>

        {/* CoreWatch Ultra */}
        <div className="relative overflow-hidden rounded-xl bg-primary-container shadow-sm hover:shadow-lg transition-all group p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-white font-title-sm text-title-sm">CoreWatch Ultra</h3>
            <p className="text-white/60 text-sm">Titanium Edition</p>
          </div>
          <div className="flex justify-center py-4">
            <span
              className="material-symbols-outlined text-white opacity-20"
              style={{ fontSize: 80 }}
            >
              watch
            </span>
          </div>
          <NotifyButton />
        </div>
      </div>
    </section>
  );
}
