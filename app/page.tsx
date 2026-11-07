import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";

const overviewCards = [
  {
    number: "01",
    title: "My Journey",
    description: "Explore your past experiences and future vision.",
    href: "/journey",
  },
  {
    number: "02",
    title: "My Goals",
    description: "Set personal goals and monitor your progress.",
    href: "/goals",
  },
  {
    number: "03",
    title: "My Skills",
    description: "Develop your abilities and track your growth.",
    href: "/skills",
  },
  {
    number: "04",
    title: "My Projects",
    description: "Organize your ideas and manage your projects.",
    href: "/projects",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#10110f] text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
     <section className="min-w-0 flex-1 px-6 pb-10 pt-20 md:p-10">

        {/* Top Bar */}
        <header className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Workspace / Dashboard</p>
            <h2 className="mt-2 text-2xl font-semibold">Dashboard</h2>
          </div>

          <Link
            href="/settings"
            className="rounded-xl border border-[#30332d] px-4 py-2 text-sm text-gray-300 transition hover:border-[#c5f467] hover:text-[#c5f467]"
          >
            Settings
          </Link>
        </header>

        {/* Welcome Section */}
        <section className="mb-10 rounded-2xl border border-[#30332d] bg-[#191b18] p-8 md:p-10">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-[#c5f467]">
            Your personal life dashboard
          </p>

          <h1 className="mb-4 text-3xl font-bold md:text-5xl">
            Design Your Life.
            <br />
            <span className="text-[#c5f467]">Build Your Future.</span>
          </h1>

          <p className="max-w-xl leading-7 text-gray-400">
            Your personal space to record achievements, develop skills,
            manage projects and turn your ambitions into reality.
          </p>
        </section>

        {/* Overview */}
        <section className="mb-10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Your Workspace</h2>
            <p className="mt-2 text-sm text-gray-500">
              Everything you need to manage your personal journey.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {overviewCards.map((card) => (
              <Link
                key={card.number}
                href={card.href}
                className="rounded-2xl border border-[#30332d] bg-[#191b18] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c5f467]"
              >
                <p className="mb-8 text-sm text-[#c5f467]">
                  {card.number}
                </p>

                <h3 className="mb-3 text-lg font-semibold">
                  {card.title}
                </h3>

                <p className="text-sm leading-6 text-gray-400">
                  {card.description}
                </p>

                <p className="mt-6 text-sm text-[#c5f467]">
                  Explore section →
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Empty State */}
        <section className="rounded-2xl border border-dashed border-[#41463a] bg-[#191b18]/50 p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#c5f467]/10 text-2xl text-[#c5f467]">
            +
          </div>

          <h3 className="text-lg font-semibold">
            Your journey starts here
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
            You have not added any personal information yet.
            Start by creating your goals, recording achievements
            or adding your skills.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-[#30332d] pt-6 text-xs text-gray-600">
          VISION STAR © 2026 — Your Life. Your Progress. Your Direction.
        </footer>

      </section>
    </main>
  );
}