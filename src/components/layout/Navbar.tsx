import Link from "next/link";
import Image from "next/image";

const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Fleet", href: "#fleet" },
  { label: "Tours", href: "#tours" },
  { label: "Contact", href: "#contact" },
];

const contactItems = [
  {
    label: "contact@quickpickapp.com",
    href: "mailto:contact@quickpickapp.com",
  },
  {
    label: "No 230A, Palagathura, Negombo",
    href: "#contact",
  },
];

const socialLinks = ["f", "ig", "t"]; 

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-slate-200 bg-white text-slate-700">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {contactItems.map((item) => (
              <a key={item.label} href={item.href} className="inline-flex items-center gap-2 transition hover:text-slate-900">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-blue-500/20 text-[10px] font-semibold text-blue-600">
                  {item.href.startsWith("mailto") ? "Γ£ë" : "Γîû"}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 text-slate-500 sm:flex">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              Follow us:
            </span>
            {socialLinks.map((social) => (
              <span
                key={social}
                className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-[10px] font-semibold text-slate-500"
                aria-hidden="true"
              >
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>

      <nav aria-label="Primary" className="border-b border-slate-200 bg-white/95 text-slate-700 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
          <Link href="/" aria-label="Q Pick home" className="flex items-center">
            <Image
              src="/images/logo/qpick-logo.webp"
              alt="Q Pick logo"
              width={180}
              height={48}
              priority
              className="h-12 w-auto"
            />
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <ul className="flex items-center gap-2">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${item.label === "Home" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:text-slate-950"}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="ml-4 hidden items-center gap-3 xl:flex">
              <div className="text-right">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Talk to an expert
                </p>
                <a href="tel:+94114334334" className="text-lg font-bold text-slate-950 transition hover:text-blue-600">
                  +94 11 433 4334
                </a>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
              >
                Book Tour
              </a>
            </div>
          </div>

          <details className="group relative lg:hidden">
            <summary className="list-none rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
              Menu
            </summary>

            <div className="absolute left-3 right-3 top-full mt-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-black/10 sm:left-6 sm:right-6">
              <ul className="space-y-1">
                {navigationItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition ${item.label === "Home" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Book Tour
              </a>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
