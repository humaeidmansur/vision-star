"use client";

import Link from "next/link";
import { useState } from "react";
import type { Goal, GoalStatus } from "@/types";
import { usePersonalData } from "@/hooks/usePersonalData";

const emptyForm = {
  title: "",
  description: "",
  category: "Personal",
  targetDate: "",
  progress: 0,
  status: "not-started" as GoalStatus,
};

const categories = [
  "Personal",
  "Education",
  "Career",
  "Health",
  "Financial",
  "Other",
];

export default function GoalsPage() {
  const { personalData, updatePersonalData } = usePersonalData();

  const goals = personalData.goals ?? [];

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const completed = goals.filter(
    (goal) => goal.status === "completed"
  ).length;

  const inProgress = goals.filter(
    (goal) => goal.status === "in-progress"
  ).length;

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.title.trim()) return;

    const newGoal: Goal = {
      id: editingId ?? crypto.randomUUID(),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      targetDate: form.targetDate,
      progress: Math.min(100, Math.max(0, Number(form.progress))),
      status:
        Number(form.progress) === 100
          ? "completed"
          : form.status,
    };

    const updatedGoals = editingId
      ? goals.map((goal) =>
          goal.id === editingId ? newGoal : goal
        )
      : [...goals, newGoal];

    updatePersonalData({
      ...personalData,
      goals: updatedGoals,
    });

    closeForm();
  }

  function editGoal(goal: Goal) {
    setEditingId(goal.id);

    setForm({
      title: goal.title,
      description: goal.description,
      category: goal.category,
      targetDate: goal.targetDate,
      progress: goal.progress,
      status: goal.status,
    });

    setShowForm(true);
  }

  function deleteGoal(id: string) {
    if (!window.confirm("Are you sure you want to delete this goal?")) {
      return;
    }

    updatePersonalData({
      ...personalData,
      goals: goals.filter((goal) => goal.id !== id),
    });
  }

  function updateProgress(id: string, progress: number) {
    const safeProgress = Math.min(100, Math.max(0, progress));

    updatePersonalData({
      ...personalData,
      goals: goals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              progress: safeProgress,
              status:
                safeProgress === 100
                  ? "completed"
                  : safeProgress > 0
                    ? "in-progress"
                    : "not-started",
            }
          : goal
      ),
    });
  }

  function statusLabel(status: GoalStatus) {
    if (status === "completed") return "Completed";
    if (status === "in-progress") return "In Progress";
    return "Not Started";
  }

  return (
    <main className="min-h-screen p-5 text-white md:p-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-[#c5f467]"
        >
          Back to Dashboard
        </Link>

        <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#c5f467]">
              Future Planning
            </p>

            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
              My Goals
            </h1>

            <p className="mt-2 text-gray-400">
              Set meaningful goals and turn your vision into action.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="vs-button"
          >
            + Add New Goal
          </button>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="vs-card p-6">
            <p className="text-sm text-gray-400">Total Goals</p>
            <h2 className="mt-2 text-3xl font-bold">{goals.length}</h2>
          </div>

          <div className="vs-card p-6">
            <p className="text-sm text-gray-400">In Progress</p>
            <h2 className="mt-2 text-3xl font-bold text-[#c5f467]">
              {inProgress}
            </h2>
          </div>

          <div className="vs-card p-6">
            <p className="text-sm text-gray-400">Completed</p>
            <h2 className="mt-2 text-3xl font-bold">{completed}</h2>
          </div>
        </div>

        {/* Goal Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="vs-card mt-8 space-y-5 p-6"
          >
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Goal" : "Create a New Goal"}
            </h2>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Goal Title
              </label>

              <input
                className="vs-input"
                placeholder="What do you want to achieve?"
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Description
              </label>

              <textarea
                className="vs-input min-h-24"
                placeholder="Describe your goal..."
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Category
                </label>

                <select
                  className="vs-input"
                  value={form.category}
                  onChange={(event) =>
                    setForm({ ...form, category: event.target.value })
                  }
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
                  Target Date
                </label>

                <input
                  type="date"
                  className="vs-input"
                  value={form.targetDate}
                  onChange={(event) =>
                    setForm({ ...form, targetDate: event.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Progress: {form.progress}%
              </label>

              <input
                type="range"
                min="0"
                max="100"
                value={form.progress}
                onChange={(event) =>
                  setForm({
                    ...form,
                    progress: Number(event.target.value),
                    status:
                      Number(event.target.value) === 100
                        ? "completed"
                        : Number(event.target.value) > 0
                          ? "in-progress"
                          : "not-started",
                  })
                }
                className="w-full accent-[#c5f467]"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="submit" className="vs-button">
                {editingId ? "Save Changes" : "Create Goal"}
              </button>

              <button
                type="button"
                onClick={closeForm}
                className="vs-button-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Goals List */}
        <section className="mt-8">
          <h2 className="mb-5 text-xl font-semibold">
            Your Goals
          </h2>

          {goals.length === 0 ? (
            <div className="vs-card px-6 py-16 text-center">
              <div className="text-4xl text-[#c5f467]">✦</div>

              <h3 className="mt-4 text-xl font-semibold">
                Your future starts with a goal
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
                You have not added any goals yet. Create your first goal
                and start tracking your progress.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="vs-button mt-6"
              >
                + Create Your First Goal
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {goals.map((goal) => (
                <article key={goal.id} className="vs-card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {goal.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-400">
                        {goal.category}
                      </p>
                    </div>

                    <span className="rounded-full bg-[#c5f467]/10 px-3 py-1 text-xs text-[#c5f467]">
                      {statusLabel(goal.status)}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-gray-400">
                    {goal.description || "No description added."}
                  </p>

                  {goal.targetDate && (
                    <p className="mt-3 text-xs text-gray-500">
                      Target: {goal.targetDate}
                    </p>
                  )}

                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-xs text-gray-400">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#30332d]">
                      <div
                        className="h-full rounded-full bg-[#c5f467] transition-all"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="mb-2 block text-xs text-gray-400">
                      Update progress
                    </label>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={goal.progress}
                      onChange={(event) =>
                        updateProgress(
                          goal.id,
                          Number(event.target.value)
                        )
                      }
                      className="w-full accent-[#c5f467]"
                    />
                  </div>

                  <div className="mt-5 flex gap-2 border-t border-[#30332d] pt-4">
                    <button
                      onClick={() => editGoal(goal)}
                      className="vs-button-secondary text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="vs-button-secondary text-sm"
                    >
                      Delete
                    </button>
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
