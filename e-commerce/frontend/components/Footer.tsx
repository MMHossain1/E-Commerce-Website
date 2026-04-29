import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

const SOCIAL_ICONS = ["language", "hub", "public"] as const;

const PRODUCTS = ["Laptops", "Tablets", "Audio Gear", "Smart Devices"];
const SUPPORT  = ["Shipping", "Terms of Service", "Privacy Policy", "Returns"];

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 py-12 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="space-y-4">
          <span className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tighter block">
            TECHCORE
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Premium tech ecosystem for the modern professional. Engineered for reliability,
            designed for efficiency.
          </p>
          <div className="flex gap-4">
            {SOCIAL_ICONS.map((icon) => (
              <button
                key={icon}
                className="text-slate-400 hover:text-blue-600 transition-colors"
                aria-label={icon}
              >
                <span className="material-symbols-outlined">{icon}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="space-y-4">
          <h5 className="text-slate-900 dark:text-white font-semibold text-sm">Products</h5>
          <ul className="space-y-2">
            {PRODUCTS.map((item) => (
              <li key={item}>
                <Link
                  href={`/products/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h5 className="text-slate-900 dark:text-white font-semibold text-sm">Support</h5>
          <ul className="space-y-2">
            {SUPPORT.map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h5 className="text-slate-900 dark:text-white font-semibold text-sm">Newsletter</h5>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Join our engineering digest for the latest updates.
          </p>
          <NewsletterForm />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 dark:border-slate-800 px-8 py-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          © 2024 TECHCORE Engineering. All rights reserved.
        </span>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service", "Support", "Shipping"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
