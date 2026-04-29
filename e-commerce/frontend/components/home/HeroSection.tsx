import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[870px] flex items-center overflow-hidden bg-surface-container-lowest pt-16">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10 w-full">
        {/* Text */}
        <div className="space-y-6">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-caps tracking-widest font-bold">
            New Release
          </span>
          <h1 className="text-display-lg text-primary tracking-tighter">
            ENGINEERED FOR{" "}
            <span className="text-secondary">EXTREMES.</span>
          </h1>
          <p className="text-body-md text-on-surface-variant max-w-md leading-relaxed">
            Introducing the CoreBook Pro Ultra. Equipped with the new M3X Chip and a 160Hz
            Liquid Retina display. Performance that transcends boundaries.
          </p>
          <div className="flex gap-4 pt-4">
            <Link
              href="/products/laptops"
              className="px-8 py-4 bg-primary text-white rounded-lg font-button active:scale-95 transition-all shadow-lg hover:shadow-xl"
            >
              Shop CoreBook
            </Link>
            <Link
              href="/products/corebook-pro-x16"
              className="px-8 py-4 border border-outline text-primary rounded-lg font-button active:scale-95 transition-all hover:bg-slate-50"
            >
              View Specs
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-all duration-500" />
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8dZzvt6G8ARUz5_uuTZ9PLIxgduXMUsLLVPdRB9Mk0ErRNadahz_Q44Gle8PH7jg1lXe5DtOCFOFyFVsbQBLly42fg5xOSWrTkRq-dWsvhHZkw8vu3DchND6DCp3YBWJj526OoOiVLCzbRz1ydY0ft21WDtq4_kfG8TocM8kAD3ij8HYaEB8FiISz6XTfScKJW64fcJncBluQsJUbxRGoHwEz1alI_SI-wTwj0b17SxVhFNoK6-_0aP63XkLLYFFQmVQhIJOZgtKd"
            alt="Flagship Laptop"
            className="relative z-10 w-full h-auto drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
