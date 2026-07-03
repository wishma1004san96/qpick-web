import Image from "next/image";

const featureCards = [
  {
    title: "Professional Chauffeurs",
    description:
      "Experienced local drivers focused on safety, courtesy, and reliable service across Sri Lanka.",
  },
  {
    title: "Curated Travel Experiences",
    description:
      "Flexible rides, destination trips, and tour-ready journeys shaped around real traveler needs.",
  },
  {
    title: "Responsive Booking Support",
    description:
      "Fast communication, trusted coordination, and support that helps guests book with confidence.",
  },
  {
    title: "Premium Fleet Standards",
    description:
      "Well-kept vehicles and a polished service experience designed for comfort from pickup to drop-off.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#07111f] py-20 text-white sm:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-sky-400/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100 backdrop-blur-xl sm:text-sm">
              About Q Pick by ATCCA
            </span>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              A premium travel partner built for comfort, trust, and confidence.
            </h2>

            <p className="mt-6 text-base leading-7 text-slate-300 sm:text-lg">
              Q Pick is an ATCCA travel and chauffeur platform created to make Sri Lanka travel
              simple, polished, and reliable. We combine verified drivers, quality vehicles, and
              thoughtful trip planning so every booking feels professional from the first click.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/10 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">
                  Our Mission
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                  To deliver dependable airport transfers, private rides, and curated tours with
                  a premium service standard that makes travelers feel safe, supported, and well
                  looked after.
                </p>
              </article>

              <article className="rounded-3xl border border-white/10 bg-slate-950/40 p-6 shadow-xl shadow-black/10 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">
                  Our Vision
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                  To become Sri Lanka's most trusted premium ride and travel brand, known for
                  service quality, responsive support, and memorable journeys across the island.
                </p>
              </article>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-slate-900/80">
                <Image
                  src="/images/hero/wda11.webp"
                  alt="Q Pick chauffeur travel experience"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/90 via-transparent to-transparent" />

                <div className="absolute left-4 top-4 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Built on trust</p>
                  <p className="mt-1 text-base font-semibold text-white">ATCCA travel excellence</p>
                </div>

                <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 backdrop-blur-xl">
                    <p className="text-2xl font-semibold text-white">2019</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">Established</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 backdrop-blur-xl">
                    <p className="text-2xl font-semibold text-white">24/7</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">Support</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 backdrop-blur-xl">
                    <p className="text-2xl font-semibold text-white">100+</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">Trip options</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {featureCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-3xl border border-white/10 bg-slate-950/40 p-5 shadow-xl shadow-black/10 backdrop-blur-xl"
                >
                  <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}