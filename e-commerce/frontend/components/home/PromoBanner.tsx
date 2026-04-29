import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-secondary h-[400px] flex items-center px-12">
        {/* Skew decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-black/10 -skew-x-12 translate-x-1/4" />
        </div>

        {/* Text */}
        <div className="relative z-10 max-w-xl space-y-6">
          <span className="text-white/80 font-label-caps tracking-[0.2em]">
            Limited Time Offer
          </span>
          <h2 className="text-display-lg text-white">WINTER COMPONENT BLITZ.</h2>
          <p className="text-white/90 text-body-md">
            Get up to{" "}
            <span className="font-bold text-2xl">40% OFF</span> on all high-performance GPU
            and Cooling units. Upgrade your workstation today.
          </p>
          <Link
            href="/products/components"
            className="inline-block px-10 py-4 bg-white text-secondary rounded-full font-button active:scale-95 transition-all hover:bg-slate-100 shadow-xl"
          >
            Explore Deals
          </Link>
        </div>

        {/* GPU image */}
        <div className="absolute right-12 hidden md:block w-1/3 pointer-events-none">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS42tiyqCe0PUZVt4CSCoFBrM4S1V-3ZLkSsOEHru_7bITlXHwF0oPr8QwlAaDkRVyQ4P2FMLrbdBk9DY_Fo9HPGSWpSAlqTTTgXG2-PylOZqqQ9sVyJB_OmPO4tYWyNSjQQ5iHmQmkHbVwa_zLbz4ND_363xF3d0tKamiK3wyj52HgdNCnBcO6iCbJfJs-o-AJrHvjvF9dRD-ji4nn1ZxQ8KCLyz4cd1HQVMAA5X4edP9yQDw8d2I1oVNISyaUwHCmUwzHcw85ZpJ"
            alt="GPU Component"
            className="w-full h-auto rotate-12 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </section>
  );
}
