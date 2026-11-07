
"use client";

import Link from "next/link";
import { useState } from "react";

import type { Achievement } from "@/types";
import { usePersonalData } from "@/hooks/usePersonalData";

const categories = [
  "Education",
  "Career",
  "Personal",
  "Travel",
  "Other",
];

export default function PastAchievementsPage() {
  const { personalData, updatePersonalData, isLoaded } =
    usePersonalData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Personal",
    date: "",
  });

  const achievements: Achievement[] =
    personalData.achievements ?? [];

  // Reset form
  function resetForm() {
    setForm({
      title: "",
      description: "",
      category: "Personal",
      date: "",
    });

    setEditingId(null);
    setIsFormOpen(false);
  }

  // Add or update achievement
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const achievement: Achievement = {
      id: editingId ?? crypto.randomUUID(),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      date: form.date,
    };

    const updatedAchievements: Achievement[] = editingId
      ? achievements.map((item: Achievement) =>
          item.id === editingId ? achievement : item
        )
      : [...achievements, achievement];

    updatePersonalData({
      ...personalData,
      achievements: updatedAchievements,
    });

    resetForm();
  }

  // Edit achievement
  function handleEdit(achievement: Achievement) {
    setForm({
      title: achievement.title,
      description: achievement.description,
      category: achievement.category,
      date: achievement.date,
    });

    setEditingId(achievement.id);
    setIsFormOpen(true);
  }

  // Delete achievement
  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this achievement?"
    );

    if (!confirmed) return;

    updatePersonalData({
      ...personalData,
      achievements: achievements.filter(
        (item: Achievement) => item.id !== id
      ),
    });
  }

  // Loading state
  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#10110f] p-10 text-white">
        Loading your achievements...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#10110f] px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-5xl">

        {/* Back Navigation */}
        <Link
          href="/journey"
          className="mb-8 inline-block text-sm text-gray-400 transition hover:text-[#c5f467]"
        >
          ← Back to My Journey
        </Link>

        {/* Header */}
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c5f467]">
              01 / Past
            </p>

            <h1 className="text-3xl font-bold md:text-4xl">
              My Achievements
            </h1>

            <p className="mt-3 text-gray-400">
              Record the milestones that have shaped your journey.
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setIsFormOpen(true);
            }}
            className="rounded-xl bg-[#c5f467] px-5 py-3 font-semibold text-[#10110f] transition hover:bg-[#b2e653]"
          >
            + Add Achievement
          </button>
        </header>

        {/* Achievement Form */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmit}
            className="mb-10 rounded-2xl border border-[#41463a] bg-[#191b18] p-6"
          >
            <h2 className="mb-6 text-xl font-semibold">
              {editingId ? "Edit Achievement" : "New Achievement"}
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Title */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-gray-300">
                  Achievement Title *
                </label>

                <input
                  required
                  maxLength={100}
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter achievement title"
                  className="w-full rounded-xl border border-[#30332d] bg-[#22251f] p-3 text-white outline-none focus:border-[#c5f467]"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-gray-300">
                  Description
                </label>

                <textarea
                  rows={4}
                  maxLength={1000}
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe this achievement..."
                  className="w-full rounded-xl border border-[#30332d] bg-[#22251f] p-3 text-white outline-none focus:border-[#c5f467]"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value,
                    })
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

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Date *
                </label>

                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      date: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[#30332d] bg-[#22251f] p-3 text-white outline-none focus:border-[#c5f467]"
                />
              </div>

            </div>

            {/* Form Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-xl bg-[#c5f467] px-6 py-3 font-semibold text-[#10110f] hover:bg-[#b2e653]"
              >
                {editingId ? "Save Changes" : "Add Achievement"}
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

        {/* Achievement List */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Your History
            </h2>

            <span className="text-sm text-gray-500">
              {achievements.length} achievements
            </span>
          </div>

          {/* Empty State */}
          {achievements.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#41463a] bg-[#191b18] p-12 text-center">
              <div className="mb-4 text-4xl text-[#c5f467]">
                ✦
              </div>

              <h3 className="text-lg font-semibold">
                No achievements yet
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Start recording your important life moments.
              </p>

              <button
                onClick={() => setIsFormOpen(true)}
                className="mt-6 rounded-xl bg-[#c5f467] px-5 py-3 font-semibold text-[#10110f]"
              >
                Add Your First Achievement
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {achievements.map((achievement: Achievement) => (
                <article
                  key={achievement.id}
                  className="rounded-2xl border border-[#30332d] bg-[#191b18] p-6 transition hover:border-[#555d45]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">

                    <div className="min-w-0 flex-1">
                      <span className="rounded-full bg-[#c5f467]/10 px-3 py-1 text-xs text-[#c5f467]">
                        {achievement.category}
                      </span>

                      <h3 className="mt-4 text-xl font-semibold">
                        {achievement.title}
                      </h3>

                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-400">
                        {achievement.description}
                      </p>

                      <p className="mt-4 text-xs text-gray-500">
                        {achievement.date}
                      </p>
                    </div>

                    {/* Edit and Delete */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(achievement)}
                        className="text-sm text-[#c5f467] hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(achievement.id)}
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
