"use client";

import { useState } from "react";

export interface TechSpec {
  label: string;
  value: string;
}

interface Props {
  techSpecs: TechSpec[];
}

const TABS = ["Specifications", "Reviews", "Sustainability"] as const;
type Tab = (typeof TABS)[number];

export default function ProductTabs({ techSpecs }: Props) {
  const [active, setActive] = useState<Tab>("Specifications");

  return (
    <section className="mt-24">
      {/* Tab bar */}
      <div className="flex border-b border-outline-variant mb-12">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-8 py-4 text-sm font-medium transition-colors ${
              active === tab
                ? "border-b-2 border-secondary text-secondary font-bold"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Specifications */}
      {active === "Specifications" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 className="font-title-sm text-title-sm mb-6">Technical Architecture</h3>
            <dl className="space-y-0">
              {techSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex justify-between py-3 border-b border-slate-100"
                >
                  <dt className="text-on-surface-variant text-sm">{spec.label}</dt>
                  <dd className="text-on-surface font-semibold text-sm text-right max-w-[55%]">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-surface-container p-8 rounded-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-title-sm text-title-sm mb-4">The Cooling Edge</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Our patented vapor chamber cooling system allows the X16 to maintain peak
                performance for 40% longer than competing professional workstations.
                Whisper-quiet fans ensure focus isn't broken during intensive rendering sessions.
              </p>
            </div>
            <div className="absolute bottom-[-20px] right-[-20px] opacity-10">
              <span className="material-symbols-outlined" style={{ fontSize: 120 }}>
                ac_unit
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Reviews */}
      {active === "Reviews" && (
        <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant gap-3">
          <span className="material-symbols-outlined text-4xl">rate_review</span>
          <p className="text-sm">Reviews coming soon. Be the first to review this product.</p>
        </div>
      )}

      {/* Sustainability */}
      {active === "Sustainability" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "eco",
              title: "Carbon Neutral",
              body: "Every CoreBook is manufactured using 100% renewable energy at our certified facilities.",
            },
            {
              icon: "recycling",
              title: "Recycled Packaging",
              body: "All packaging is made from 95% post-consumer recycled materials, fully biodegradable.",
            },
            {
              icon: "battery_charging_full",
              title: "Long-Lasting Design",
              body: "Engineered for repairability — user-replaceable battery, modular internals.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-6 border border-slate-100">
              <span className="material-symbols-outlined text-secondary mb-3 block">{item.icon}</span>
              <h4 className="font-semibold text-on-surface mb-2">{item.title}</h4>
              <p className="text-sm text-on-surface-variant">{item.body}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
