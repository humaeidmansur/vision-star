"use client";

import Link from "next/link";
import { usePersonalData } from "@/hooks/usePersonalData";

export default function Dashboard() {
  const { personalData, isLoaded } = usePersonalData();

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center text-[#c5f467]">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
        <span className="loading loading-bars loading-xl"></span>
      </main>
    );
  }

  const { achievements, goals, skills, projects, tasks, values } = personalData;

  const today = new Date().toISOString().split("T")[0];

  const todayTasks = tasks.filter((task) => task.date === today);

  const completedTasks = todayTasks.filter(
    (task) => task.status === "completed",
  );

  const taskProgress =
    todayTasks.length > 0
      ? Math.round((completedTasks.length / todayTasks.length) * 100)
      : 0;

  const activeGoals = goals.filter((goal) => goal.status === "in-progress");

  const completedGoals = goals.filter((goal) => goal.status === "completed");

  const overview = [
    {
      title: "Achievements",
      value: achievements.length,
      icon: "✦",
      color: "text-[#c5f467]",
      href: "/journey/past",
    },
    {
      title: "Active Goals",
      value: activeGoals.length,
      icon: "◎",
      color: "text-blue-400",
      href: "/goals",
    },
    {
      title: "Skills",
      value: skills.length,
      icon: "◇",
      color: "text-purple-400",
      href: "/skills",
    },
    {
      title: "Projects",
      value: projects.length,
      icon: "▣",
      color: "text-orange-400",
      href: "/projects",
    },
  ];

  const sections = [
    {
      title: "My Journey",
      description: "Explore your past, present and future.",
      icon: "◈",
      href: "/journey",
    },
    {
      title: "My Goals",
      description: "Set targets and track your progress.",
      icon: "◎",
      href: "/goals",
    },
    {
      title: "My Skills",
      description: "Develop your abilities.",
      icon: "✦",
      href: "/skills",
    },
    {
      title: "My Projects",
      description: "Manage your ideas and projects.",
      icon: "▣",
      href: "/projects",
    },
    {
      title: "Daily Tasks",
      description: "Organise your daily activities.",
      icon: "☑",
      href: "/tasks",
    },
    {
      title: "Personal Values",
      description: "Define what matters most to you.",
      icon: "♡",
      href: "/values",
    },
  ];

  const dateLabel = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen p-5 text-white md:p-8 lg:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-gray-500">{dateLabel}</p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Dashboard<span className="text-[#c5f467]">.</span>
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Your personal space for growth and progress.
            </p>
          </div>
        </header>

        {/* Welcome Banner */}
        <section className="relative overflow-hidden rounded-3xl border border-[#343a2b] bg-gradient-to-br from-[#22291c] via-[#191d17] to-[#191b18] p-7 md:p-10">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#c5f467]/10 blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <span className="rounded-full border border-[#c5f467]/30 bg-[#c5f467]/10 px-4 py-2 text-xs font-medium tracking-wider text-[#c5f467]">
              YOUR PERSONAL PLAN SYSTEM
            </span>

<h2 className="mt-7 text-4xl font-extrabold leading-[1.15] tracking-tight md:text-6xl">
  Learn from the Past,
  <br />
  <span className="text-[#c5f467]">Control Your Present,</span>
  <br />
  Build for the Future.
</h2>

<p className="mt-6 max-w-xl text-sm leading-8 text-gray-400 md:text-base">
              Your personal space to record achievements, develop skills, manage
              projects and turn your ambitions into reality.
</p>


            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/journey" className="vs-button">
                Explore My Journey
              </Link>

              <Link href="/goals" className="vs-button-secondary">
                View My Goals
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 right-10 hidden text-[150px] font-bold leading-none text-[#c5f467]/5 lg:block">
            VS
          </div>
        </section>

        {/* Overview Cards */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-1 text-sm text-gray-500">
                Your personal development at a glance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {overview.map((item) => (
              <Link
                href={item.href}
                key={item.title}
                className="vs-card group p-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">{item.title}</p>

                  <span className={`text-2xl ${item.color}`}>{item.icon}</span>
                </div>

                <div className="mt-5 flex items-end justify-between">
                  <h3 className="text-4xl font-bold">{item.value}</h3>

                  <span className="text-sm text-gray-500 transition group-hover:text-[#c5f467]">
                    View
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Progress and Goals */}
        <section className="grid gap-5 lg:grid-cols-2">
          {/* Daily Progress */}
          <div className="vs-card p-6 md:p-7">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Daily Progress</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Your productivity today.
                </p>
              </div>

              <span className="text-2xl text-[#c5f467]">◷</span>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-[7px] border-[#30352a]">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#c5f467]">
                    {taskProgress}%
                  </p>
                  <p className="text-[10px] text-gray-500">COMPLETED</p>
                </div>
              </div>

              <div>
                <p className="text-2xl font-semibold">
                  {completedTasks.length}/{todayTasks.length}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Tasks completed today
                </p>

                <Link
                  href="/tasks"
                  className="mt-4 inline-block text-sm text-[#c5f467] hover:underline"
                >
                  Manage Tasks
                </Link>
              </div>
            </div>

            <div className="mt-7 h-2 overflow-hidden rounded-full bg-[#30332d]">
              <div
                className="h-full rounded-full bg-[#c5f467] transition-all duration-500"
                style={{ width: `${taskProgress}%` }}
              />
            </div>
          </div>

          {/* Goals Progress */}
          <div className="vs-card p-6 md:p-7">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Goal Overview</h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your future ambitions.
                </p>
              </div>

              <span className="text-2xl text-[#c5f467]">◎</span>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-[#22251f] p-5">
                <p className="text-sm text-gray-400">In Progress</p>
                <h3 className="mt-3 text-3xl font-bold text-[#c5f467]">
                  {activeGoals.length}
                </h3>
              </div>

              <div className="rounded-xl bg-[#22251f] p-5">
                <p className="text-sm text-gray-400">Completed</p>
                <h3 className="mt-3 text-3xl font-bold">
                  {completedGoals.length}
                </h3>
              </div>
            </div>

            <Link
              href="/goals"
              className="mt-5 inline-block text-sm text-[#c5f467] hover:underline"
            >
              Manage My Goals
            </Link>
          </div>
        </section>

        {/* Quick Access */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Quick Access</h2>

            <p className="mt-1 text-sm text-gray-500">
              Navigate through your personal workspace.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sections.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="vs-card group flex items-center gap-5 p-5"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#c5f467]/10 text-2xl text-[#c5f467] transition group-hover:bg-[#c5f467] group-hover:text-[#10110f]">
                  {item.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold transition group-hover:text-[#c5f467]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {item.description}
                  </p>
                </div>

                <span className="text-gray-500 transition group-hover:translate-x-1 group-hover:text-[#c5f467]">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Personal Values */}
        <section className="vs-card p-6 md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Personal Values</h2>

              <p className="mt-1 text-sm text-gray-500">
                The principles that guide your direction.
              </p>
            </div>

            <Link
              href="/values"
              className="text-sm text-[#c5f467] hover:underline"
            >
              Manage Values
            </Link>
          </div>

          {values.length === 0 ? (
            <p className="mt-6 text-sm text-gray-500">
              Your personal values will appear here when you add them.
            </p>
          ) : (
            <div className="mt-6 flex flex-wrap gap-3">
              {values.map((value) => (
                <div
                  key={value.id}
                  className="flex items-center gap-3 rounded-xl border border-[#30332d] bg-[#22251f] px-4 py-3"
                >
                  <span className="text-xl text-[#c5f467]">{value.icon}</span>

                  <span className="text-sm font-medium">{value.title}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-[#30332d] py-7 text-center">
          <p className="text-xs tracking-[0.2em] text-gray-500">VISION STAR</p>

          <p className="mt-2 text-xs text-gray-600">
            Your Life · Your Progress · Your Direction
          </p>
        </footer>
      </div>
    </main>
  );
}
