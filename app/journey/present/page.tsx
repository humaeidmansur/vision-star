"use client";

import Link from "next/link";
import { useState } from "react";

import type { DailyTask } from "@/types";
import { usePersonalData } from "@/hooks/usePersonalData";

const categories = [
  "Education",
  "Career",
  "Personal Development",
  "Health",
  "Other",
];

export default function PresentPage() {
  const { personalData, updatePersonalData, isLoaded } =
    usePersonalData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    category: "Personal Development",
    date: "",
  });

  const activities: DailyTask[] = personalData.tasks ?? [];

  // Reset form
  function resetForm() {
    setForm({
      title: "",
      category: "Personal Development",
      date: "",
    });

    setEditingId(null);
    setIsFormOpen(false);
  }

  // Add or edit activity
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const activity: DailyTask = {
      id: editingId ?? crypto.randomUUID(),
      title: form.title.trim(),
      category: form.category,
      date: form.date,
      status: editingId
        ? activities.find((item) => item.id === editingId)?.status ?? "pending"
        : "pending",
    };

    const updatedActivities = editingId
      ? activities.map((item) =>
          item.id === editingId ? activity : item
        )
      : [...activities, activity];

    updatePersonalData({
      ...personalData,
      tasks: updatedActivities,
    });

    resetForm();
  }

  // Edit activity
  function handleEdit(activity: DailyTask) {
    setForm({
      title: activity.title,
      category: activity.category,
      date: activity.date,
    });

    setEditingId(activity.id);
    setIsFormOpen(true);
  }

  // Delete activity
  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this activity?"
    );

    if (!confirmed) return;

    updatePersonalData({
      ...personalData,
      tasks: activities.filter((item) => item.id !== id),
    });
  }

  // Toggle completion
  function toggleStatus(id: string) {
    const updatedActivities = activities.map((item) =>
      item.id === id
        ? {
            ...item,
            status:
              item.status === "completed"
                ? ("pending" as const)
                : ("completed" as const),
          }
        : item
    );

    updatePersonalData({
      ...personalData,
      tasks: updatedActivities,
    });
  }

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#10110f] p-10 text-white">
        Loading your activities...
      </main>
    );
  }

  const completedCount = activities.filter(
    (item) => item.status === "completed"
  ).length;

  return (
    <main className="min-h-screen bg-[#10110f] px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-5xl">

        <Link
          href="/journey"
          className="mb-8 inline-block text-sm text-gray-400 hover:text-[#c5f467]"
        >
          Back to My Journey
        </Link>

        {/* Header */}
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c5f467]">
              Present
            </p>

            <h1 className="text-3xl font-bold md:text-4xl">
              My Current Activities
            </h1>

            <p className="mt-3 text-gray-400">
              Organize your current activities and monitor your progress.
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setIsFormOpen(true);
            }}
            className="rounded-xl bg-[#c5f467] px-5 py-3 font-semibold text-[#10110f] hover:bg-[#b2e653]"
          >
            + Add Activity
          </button>
        </header>

        {/* Progress Overview */}
        <section className="mb-10 grid gap-5 sm:grid-cols-3">

          <div className="rounded-2xl border border-[#30332d] bg-[#191b18] p-6">
            <p className="text-sm text-gray-400">Total Activities</p>
            <h2 className="mt-3 text-3xl font-bold">
              {activities.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-[#30332d] bg-[#191b18] p-6">
            <p className="text-sm text-gray-400">In Progress</p>
            <h2 className="mt-3 text-3xl font-bold text-[#c5f467]">
              {activities.length - completedCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-[#30332d] bg-[#191b18] p-6">
            <p className="text-sm text-gray-400">Completed</p>
            <h2 className="mt-3 text-3xl font-bold">
              {completedCount}
            </h2>
          </div>

        </section>

        {/* Activity Form */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmit}
            className="mb-10 rounded-2xl border border-[#41463a] bg-[#191b18] p-6"
          >
            <h2 className="mb-6 text-xl font-semibold">
              {editingId ? "Edit Activity" : "Add New Activity"}
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-gray-300">
                  Activity Title *
                </label>

                <input
                  required
                  maxLength={100}
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="What are you currently working on?"
                  className="w-full rounded-xl border border-[#30332d] bg-[#22251f] p-3 text-white outline-none focus:border-[#c5f467]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#30332d] bg-[#22251f] p-3 text-white outline-none focus:border-[#c5f467]"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Date *
                </label>

                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#30332d] bg-[#22251f] p-3 text-white outline-none focus:border-[#c5f467]"
                />
              </div>

            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-xl bg-[#c5f467] px-6 py-3 font-semibold text-[#10110f] hover:bg-[#b2e653]"
              >
                {editingId ? "Save Changes" : "Add Activity"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-[#41463a] px-6 py-3 text-gray-300 hover:border-[#c5f467]"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Activities List */}
        <section>

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Your Activities
            </h2>

            <span className="text-sm text-gray-500">
              {activities.length} total
            </span>
          </div>

          {activities.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#41463a] bg-[#191b18] p-12 text-center">
              <div className="mb-4 text-4xl text-[#c5f467]">
                ◷
              </div>

              <h3 className="text-lg font-semibold">
                No activities yet
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Start adding the things you are currently working on.
              </p>

              <button
                onClick={() => setIsFormOpen(true)}
                className="mt-6 rounded-xl bg-[#c5f467] px-5 py-3 font-semibold text-[#10110f]"
              >
                Add Your First Activity
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <article
                  key={activity.id}
                  className="rounded-2xl border border-[#30332d] bg-[#191b18] p-6 transition hover:border-[#555d45]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">

                    <div className="flex min-w-0 flex-1 items-start gap-4">
                      <button
                        onClick={() => toggleStatus(activity.id)}
                        aria-label={
                          activity.status === "completed"
                            ? "Mark as pending"
                            : "Mark as completed"
                        }
                        className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
                          activity.status === "completed"
                            ? "border-[#c5f467] bg-[#c5f467] text-[#10110f]"
                            : "border-gray-500"
                        }`}
                      >
                        {activity.status === "completed" ? "✓" : ""}
                      </button>

                      <div className="min-w-0">
                        <h3
                          className={`text-lg font-semibold ${
                            activity.status === "completed"
                              ? "text-gray-500 line-through"
                              : "text-white"
                          }`}
                        >
                          {activity.title}
                        </h3>

                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-[#c5f467]/10 px-3 py-1 text-xs text-[#c5f467]">
                            {activity.category}
                          </span>

                          <span className="text-xs text-gray-500">
                            {activity.date}
                          </span>

                          <span className="text-xs text-gray-500">
                            {activity.status === "completed"
                              ? "Completed"
                              : "In Progress"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(activity)}
                        className="text-sm text-[#c5f467] hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(activity.id)}
                        className="text-sm text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          )}

        </section>

      </div>
    </main>
  );
}