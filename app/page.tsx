
export default function Home() {
  return (
    <main className="min-h-screen bg-[#10110f] px-6 py-10 text-white md:px-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide">
            VISION<span className="text-[#c5f467]"> STAR.</span>
          </h1>

          <span className="rounded-full border border-[#30332d] px-4 py-2 text-sm text-gray-400">
            My Personal Space
          </span>
        </header>

        {/* Welcome Section */}
        <section className="mb-12">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c5f467]">
            My Journey Starts Here
          </p>

          <h2 className="mb-4 text-4xl font-bold md:text-6xl">
            Design Your Life.
            <br />
            <span className="text-[#c5f467]">Build Your Future.</span>
          </h2>

          <p className="max-w-xl text-gray-400">
            A personal space to organize your past achievements,
            track your present progress, and shape your future vision.
          </p>
        </section>

        {/* Journey Cards */}
        <section className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-[#30332d] bg-[#191b18] p-7">
            <p className="mb-4 text-sm text-gray-400">01 / PAST</p>
            <h3 className="mb-3 text-2xl font-semibold">My History</h3>
            <p className="mb-6 text-sm text-gray-400">
              Record your experiences, memories and achievements.
            </p>
            <span className="text-[#c5f467]">Explore History →</span>
          </div>

          <div className="rounded-2xl border border-[#c5f467] bg-[#191b18] p-7">
            <p className="mb-4 text-sm text-gray-400">02 / PRESENT</p>
            <h3 className="mb-3 text-2xl font-semibold">My Progress</h3>
            <p className="mb-6 text-sm text-gray-400">
              Manage your current goals, skills and daily activities.
            </p>
            <span className="text-[#c5f467]">Track Progress →</span>
          </div>

          <div className="rounded-2xl border border-[#30332d] bg-[#191b18] p-7">
            <p className="mb-4 text-sm text-gray-400">03 / FUTURE</p>
            <h3 className="mb-3 text-2xl font-semibold">My Vision</h3>
            <p className="mb-6 text-sm text-gray-400">
              Define your ambitions and plan the person you want to become.
            </p>
            <span className="text-[#c5f467]">Explore Vision →</span>
          </div>

        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-[#30332d] pt-6 text-sm text-gray-500">
          Vision Star — Your Life. Your Direction. Your Future.
        </footer>

      </div>
    </main>
  );
}
