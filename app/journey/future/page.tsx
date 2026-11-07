"use client";

import Link from "next/link";
import { useState } from "react";

import type { Goal, GoalStatus } from "@/types";
import { usePersonalData } from "@/hooks/usePersonalData";

const categories = [
  "Career",
  "Education",
  "Business",
  "Personal Development",
  "Health",
  "Finance",
  "Other",
];

export default function FuturePage() {
  const { personalData, updatePersonalData, isLoaded } =
    usePersonalData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Personal Development",
    targetDate: "",
    progress: 0,
    status: "not-started" as GoalStatus,
  });

  const goals: Goal[] = personalData.goals ?? [];

  // Reset form
  function resetForm() {
    setForm({
      title: "",
      description: "",
      category: "Personal Development",
      targetDate: "",
      progress: 0,
      status: "not-started",
    });

    setEditingId(null);
    setIsFormOpen(false);
  }

  // Add or edit goal
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const goal: Goal = {
      id: editingId ?? crypto.randomUUID(),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      targetDate: form.targetDate,
      progress: form.progress,
      status: form.progress === 100
        ? "completed"
        : form.status,
    };

    const updatedGoals = editingId
      ? goals.map((item) =>
          item.id === editingId ? goal : item
        )
      : [...goals, goal];

    updatePersonalData({
      ...personalData,
      goals: updatedGoals,
    });

    resetForm();
  }

  // Edit goal
  function handleEdit(goal: Goal) {
    setForm({
      title: goal.title,
      description: goal.description,
      category: goal.category,
      targetDate: goal.targetDate,
      progress: goal.progress,
      status: goal.status,
    });

    setEditingId(goal.id);
    setIsFormOpen(true);
  }

  // Delete goal
  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this goal?"
    );

    if (!confirmed) return;

    updatePersonalData({
      ...personalData,
      goals: goals.filter((item) => item.id !== id),
    });
  }

  // Update progress
  function updateProgress(id: string, progress: number) {
    const updatedGoals = goals.map((goal) => {
      if (goal.id !== id) return goal;

      const newProgress = Math.max(0, Math.min(100, progress));

      return {
        ...goal,
        progress: newProgress,
        status: (
          newProgress === 100
            ? "completed"
            : newProgress > 0
              ? "in-progress"
              : "not-started"
        ) as GoalStatus,
      };
    });

    updatePersonalData({
      ...personalData,
      goals: updatedGoals,
    });
  }

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#10110f] p-10 text-white">
        Loading your future vision...
      </main>
    );
  }

  const completedGoals = goals.filter(
    (goal) => goal.status === "completed"
  ).length;

  const activeGoals = goals.filter(
    (goal) => goal.status === "in-progress"
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
              Future
            </p>

            <h1 className="text-3xl font-bold md:text-4xl">
              My Vision & Goals
            </h1>

            <p className="mt-3 text-gray-400">
              Define your ambitions and turn your vision into action.
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setIsFormOpen(true);
            }}
            className="rounded-xl bg-[#c5f467] px-5 py-3 font-semibold text-[#10110f] hover:bg-[#b2e653]"
          >
            + Add New Goal
          </button>
        </header>

        {/* Overview */}
        <section className="mb-10 grid gap-5 sm:grid-cols-3">

          <div className="rounded-2xl border border-[#30332d] bg-[#191b18] p-6">
            <p className="text-sm text-gray-400">Total Goals</p>
            <h2 className="mt-3 text-3xl font-bold">
              {goals.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-[#30332d] bg-[#191b18] p-6">
            <p className="text-sm text-gray-400">In Progress</p>
            <h2 className="mt-3 text-3xl font-bold text-[#c5f467]">
              {activeGoals}
            </h2>
          </div>

          <div className="rounded-2xl border border-[#30332d] bg-[#191b18] p-6">
            <p className="text-sm text-gray-400">Completed</p>
            <h2 className="mt-3 text-3xl font-bold">
              {completedGoals}
            </h2>
          </div>

        </section>

        {/* Goal Form */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmit}
            className="mb-10 rounded-2xl border border-[#41463a] bg-[#191b18] p-6"
          >
            <h2 className="mb-6 text-xl font-semibold">
              {editingId ? "Edit Goal" : "Create New Goal"}
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Title */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-gray-300">
                  Goal Title *
                </label>

                <input
                  required
                  maxLength={100}
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="What do you want to achieve?"
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
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe your goal and why it matters..."
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

              {/* Target Date */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Target Date *
                </label>

                <input
                  required
                  type="date"
                  value={form.targetDate}
                  onChange={(e) =>
                    setForm({ ...form, targetDate: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#30332d] bg-[#22251f] p-3 text-white outline-none focus:border-[#c5f467]"
                />
              </div>

              {/* Progress */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Progress: {form.progress}%
                </label>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={form.progress}
                  onChange={(e) => {
                    const progress = Number(e.target.value);

                    setForm({
                      ...form,
                      progress,
                      status:
                        progress === 100
                          ? "completed"
                          : progress > 0
                            ? "in-progress"
                            : "not-started",
                    });
                  }}
                  className="w-full accent-[#c5f467]"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as GoalStatus,
                      progress:
                        e.target.value === "completed"
                          ? 100
                          : form.progress,
                    })
                  }
                  className="w-full rounded-xl border border-[#30332d] bg-[#22251f] p-3 text-white outline-none focus:border-[#c5f467]"
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

            </div>

            {/* Form Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-xl bg-[#c5f467] px-6 py-3 font-semibold text-[#10110f] hover:bg-[#b2e653]"
              >
                {editingId ? "Save Changes" : "Create Goal"}
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

        {/* Goals List */}
        <section>

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Your Future Goals
            </h2>

            <span className="text-sm text-gray-500">
              {goals.length} total goals
            </span>
          </div>

          {goals.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#41463a] bg-[#191b18] p-12 text-center">

              <div className="mb-4 text-4xl text-[#c5f467]">
                ✧
              </div>

              <h3 className="text-lg font-semibold">
                Your vision starts here
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                You have not created any goals yet. Start defining
                what you want to achieve.
              </p>

              <button
                onClick={() => setIsFormOpen(true)}
                className="mt-6 rounded-xl bg-[#c5f467] px-5 py-3 font-semibold text-[#10110f]"
              >
                Create Your First Goal
              </button>

            </div>
          ) : (
            <div className="space-y-4">

              {goals.map((goal) => (
                <article
                  key={goal.id}
                  className="rounded-2xl border border-[#30332d] bg-[#191b18] p-6 transition hover:border-[#555d45]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">

                    <div className="min-w-0 flex-1">

                      <span className="rounded-full bg-[#c5f467]/10 px-3 py-1 text-xs text-[#c5f467]">
                        {goal.category}
                      </span>

                      <h3 className="mt-4 text-xl font-semibold">
                        {goal.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-400">
                        {goal.description}
                      </p>

                      <p className="mt-3 text-xs text-gray-500">
                        Target: {goal.targetDate}
                      </p>

                      {/* Progress Bar */}
                      <div className="mt-6 max-w-xl">
                        <div className="mb-2 flex justify-between text-xs">
                          <span className="text-gray-400">
                            Progress
                          </span>

                          <span className="text-[#c5f467]">
                            {goal.progress}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-[#30332d]">
                          <div
                            className="h-full rounded-full bg-[#c5f467] transition-all"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Status */}
                      <div className="mt-4">
                        <span className="text-xs text-gray-400">
                          Status: {goal.status.replace("-", " ")}
                        </span>
                      </div>

                      {/* Quick Progress Update */}
                      {goal.status !== "completed" && (
                        <button
                          onClick={() =>
                            updateProgress(
                              goal.id,
                              Math.min(100, goal.progress + 10)
                            )
                          }
                          className="mt-4 text-xs text-[#c5f467] hover:underline"
                        >
                          + Increase progress by 10%
                        </button>
                      )}

                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(goal)}
                        className="text-sm text-[#c5f467] hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(goal.id)}
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