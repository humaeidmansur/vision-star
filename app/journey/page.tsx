import Link from "next/link";

const journeySections = [
  {
    number: "01",
    period: "PAST",
    title: "My History",
    description:
      "Remember your experiences, achievements, challenges and important life moments.",
    items: ["Achievements", "Life Experiences", "Important Milestones"],
    href: "/journey/past",
    available: true,
  },
  {
    number: "02",
    period: "PRESENT",
    title: "My Current Life",
    description:
      "Understand where you are today and keep track of your personal development.",
    items: ["Current Activities", "Skills Development", "Personal Progress"],
    href: "/journey/present",
    available: true,
  },
  {
    number: "03",
    period: "FUTURE",
    title: "My Vision",
    description:
      "Define your ambitions and create a clear direction for your future.",
    items: ["Long-term Vision", "Personal Ambitions", "Future Milestones"],
    href: "/journey/future",
    available: true,
  },
];

export default function JourneyPage() {
  return (
    <main className="min-h-screen bg-[#10110f] px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-gray-400 hover:text-[#c5f467]"
        >
          ← Back to Dashboard
        </Link>

        {/* Header */}
        <header className="mb-12">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c5f467]">
            My Personal Journey
          </p>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Every Journey Has a Story.
          </h1>

          <p className="max-w-2xl leading-7 text-gray-400">
            Your past explains where you came from. Your present shows where you
            are. Your future represents where you want to go.
          </p>
        </header>

        {/* Journey Cards */}
        <section className="grid gap-6 lg:grid-cols-3">
          {journeySections.map((section) => (
            <article
              key={section.number}
              className="rounded-2xl border border-[#30332d] bg-[#191b18] p-7 transition hover:-translate-y-1 hover:border-[#c5f467]"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-medium text-[#c5f467]">
                  {section.number} / {section.period}
                </span>

                <span className="h-2 w-2 rounded-full bg-[#c5f467]" />
              </div>

              <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>

              <p className="mb-8 min-h-20 text-sm leading-7 text-gray-400">
                {section.description}
              </p>

              <div className="border-t border-[#30332d] pt-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Explore
                </p>

                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-gray-300"
                    >
                      <span className="text-[#c5f467]">✦</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Button */}
              {section.available ? (
                <Link
                  href={section.href}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#c5f467] px-5 py-3 font-semibold text-[#10110f] transition hover:bg-[#b2e653]"
                >
                  Explore Past →
                </Link>
              ) : (
                <button
                  disabled
                  className="mt-8 w-full cursor-not-allowed rounded-xl border border-[#30332d] px-5 py-3 text-gray-500"
                >
                  Coming Soon
                </button>
              )}
            </article>
          ))}
        </section>

        {/* Bottom Section */}
        <section className="mt-10 rounded-2xl border border-dashed border-[#41463a] bg-[#191b18]/50 p-8 text-center">
          <h2 className="text-xl font-semibold">
            Your story is yours to write.
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-400">
            Start documenting your journey. Add your own experiences,
            achievements and ambitions as you grow.
          </p>
        </section>
      </div>
    </main>
  );
}
