import ProductGallery from "@/components/products/ProductGallery";
import ProductConfig from "@/components/products/ProductConfig";
import ProductTabs from "@/components/products/ProductTabs";
import BundleSection from "@/components/products/BundleSection";

// Static product catalog — swap for a DB call keyed on `slug` in production
const CATALOG: Record<string, React.ComponentProps<typeof ProductConfig> & {
  name: string;
  tagline: string;
  images: { src: string; alt: string }[];
  techSpecs: React.ComponentProps<typeof ProductTabs>["techSpecs"];
  bundle: React.ComponentProps<typeof BundleSection>;
}> = {
  "corebook-pro-x16": {
    productId: "corebook-pro-x16",
    productName: "CoreBook Pro X16",
    name: "CoreBook Pro X16",
    tagline:
      "Master every workflow with the pinnacle of mobile engineering. Powered by the M3 Ultra equivalent architecture for professionals.",
    compareAtPrice: 2799,
    specs: ["M3 Pro Chip", "32GB RAM", "1TB SSD", "XDR Display"],
    colors: [
      { name: "Space Graphite", bgClass: "bg-slate-800" },
      { name: "Silver", bgClass: "bg-slate-300" },
      { name: "Midnight Blue", bgClass: "bg-blue-900" },
    ],
    storageOptions: [
      { label: "512 GB", price: 2499 },
      { label: "1 TB",   price: 2699 },
      { label: "2 TB",   price: 2999 },
    ],
    images: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaa4tp3LX_HGNk0jI_uLeIFi47zyN3mecFksr2rMcvZSpmJi0VSxqQzmW7iWu8hSVeY5-LO0eMJ6OKHWddOl09QfABrAo8rstLLMSIUGD5z3fiGp7fiR1rmg0w3gC4bis5GbitvjRzMNp_MW3fx4mig5A1b1r07irGIjfyBtDhL2_gFVUR3ji-EPxzaIBHh46D3XlUm5LIvFLvG5keIrfZEwIUukjChXoi48tHT6ob1uwSvXD2gEMiINgyRxBAG6vjX7KHhfq7zNUv",
        alt: "CoreBook Pro X16 — front view",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCWgJi8l5nMVETlJm9ph01tqIelNmRslByIniarvmlAA9A0OmP2l3lr8kS7kb5wnXcF1aVBsrsBdDUmBk95KX6S6rBtpl9ednjWcGAoiHJ00clnDUiOn-3HX7BwNqX9IArXrOb8Iw39eXTWzNzvAF6lM7OjxjO0eY8cHsWcBmIZiMe-TH7qzBOJyRW5vvViCBNsA0B2ODSGvwuMho9_QnoHgp-voUfJLNJ6XY9ljMI_fV5vDbIHCUL6YVq9fuF7FC0qvTsP716f_FL",
        alt: "CoreBook Pro X16 — keyboard close-up",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgSegNSurX3tRDSKP10LEKELYlqAsdUKq1_3qQNRz7tLvtBYQ-jigjkUhds1GbQ3GLJrNPcYr1W56BSJCUb_34NYGp9t5a1oEuMxTqqFtI9pdlNc6CCBMuo3GNg7v4c1MHXAjnZI76Qqhy2AzlxGz8wOxI3DmMXZhl_KvpNMm4oqv3TGUmLZB9SmEcIezutkQ2_gfUFxiu8nFn3IGkca8R3FAMo-tnCAHNArWR4IwkmrMrUdxrXwapWT-bJaxW6BWs--Sj03hNrBow",
        alt: "CoreBook Pro X16 — side profile",
      },
    ],
    techSpecs: [
      { label: "Processor",  value: "CoreTech Ultra v4 (12-Core)" },
      { label: "Graphics",   value: "RayTrack Pro 64-Core GPU" },
      { label: "Memory",     value: "32GB Unified LPDDR5x" },
      { label: "Display",    value: '16.2" Liquid Retina XDR (3456 × 2234)' },
      { label: "Battery",    value: "100Wh — up to 22 hours" },
      { label: "Ports",      value: "3× Thunderbolt 4, 1× HDMI, 1× SD" },
    ],
    bundle: {
      items: [
        {
          id: "corebook-pro-x16",
          name: "CoreBook Pro X16",
          price: 2499,
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBBodiTZzKWgISslZseY9009NSCykFVdqWujKHGIrYhPntAo-t-4kW1qS47-uDTeqvMA6kWkHmLyHGSBds3j9HkDkidmc-Z8bmCdo8vF4DqnAoEzs1ZdLDqJ71nYiX5LZDuOdKLqNMC18L3o9OEeSY5UgL1Uobq-KQuQdISPRFQivM2tRO8LXdE5qvaqp9WFZhOHAP20uGhw5oWywLwvyhcPRvpjBp7bBvcSlv1016i9eu5VGn0mtr-X8jqn_CrZD2z7nYoCiq12fXa",
        },
        {
          id: "precision-mouse",
          name: "Precision Wireless Mouse",
          price: 199,
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD2dN1Jm1vzMRfjGdxZZ5P2I8ITGOoYcFF4ipwtK8MunGny-D2R7ar0x43E7o2rsfPWSWf7bfBmMF6jFdXoJPZCPRasx6_eANP2b80VWi6eyWc7irTm6NMNqU5BxmDZbE1B8oOHrfFsuCCgm6hsMXlCmr0iig31-5GyJZNgXEzkF4495Anx80gVZA7eLVyPeebnRHCz_i0yWZZlVL_5rArK8kV1ze_TFBzA9tZVgSLr8iJ0goPmYlkGb1c1OMN5uKiU-zb0QH6t434P",
        },
        {
          id: "core-headphones",
          name: "Core Noise-Canceling Headphones",
          price: 349,
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBkPwgKs96OR7s52NlprZ6ufZngpysdfZL4Lt1e2DDnWTY_uFQNW9ACM8msd74aUhy_mGCFGgYX5fqBCT3NntCHevrDyp9ZoRFxX-e9MxaPCVW-xqizUKFu4-LI3aXhNvPEX2E_i7hsSrAD4cIinbmKymr8hH1DnYY-FiQZNordaqr__jv3Jt_1gq3SWcNucBxyia3wV68qL-jXYN2KYu32MvXWxjCRrKDjltTqka-WkQ1lvYEbUjA3aDG3upcUlrwDbMzL3GzS_QS5",
        },
      ],
      bundlePrice: 2897,
      savings: 150,
    },
  },
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = CATALOG[params.slug] ?? CATALOG["corebook-pro-x16"];

  return (
    <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
      {/* Hero: gallery + config */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <h1 className="font-headline-md text-headline-md text-on-background mb-2">
              {product.name}
            </h1>
            <p className="text-on-surface-variant text-body-md mb-6">{product.tagline}</p>
          </div>

          <ProductConfig
            productId={product.productId}
            productName={product.productName}
            compareAtPrice={product.compareAtPrice}
            specs={product.specs}
            colors={product.colors}
            storageOptions={product.storageOptions}
          />
        </div>
      </div>

      {/* Tabbed specs */}
      <ProductTabs techSpecs={product.techSpecs} />

      {/* Bundle */}
      <BundleSection
        items={product.bundle.items}
        bundlePrice={product.bundle.bundlePrice}
        savings={product.bundle.savings}
      />
    </div>
  );
}
