import Link from "next/link";

const CATEGORIES = [
  { label: "Laptops",    icon: "laptop_mac",             href: "/products/laptops" },
  { label: "Audio",      icon: "headphones",             href: "/products/audio" },
  { label: "Smart Home", icon: "home_app_logo",          href: "/products/smart-home" },
  { label: "Components", icon: "settings_input_component", href: "/products/components" },
];

export default function CategoriesGrid() {
  return (
    <section className="bg-slate-50 py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-md text-headline-md text-primary tracking-tight">
            Shop by Category
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {CATEGORIES.map(({ label, icon, href }) => (
            <Link key={label} href={href} className="group text-center">
              <div className="aspect-square bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all mb-6">
                <span className="material-symbols-outlined text-4xl! text-slate-400 group-hover:text-secondary transition-colors">
                  {icon}
                </span>
              </div>
              <h4 className="font-button text-primary">{label}</h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
