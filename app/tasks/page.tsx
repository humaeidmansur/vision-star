
"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import type { DailyTask } from "@/types";
import { usePersonalData } from "@/hooks/usePersonalData";

const categories = [
  "Study",
  "Work",
  "Personal",
  "Health",
  "Learning",
  "Other",
];

// Get the local date in YYYY-MM-DD format.
function getLocalDate() {
  const now = new Date();

  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}

// Subscribe to the date without setting state inside useEffect.
function subscribeToDate() {
  return () => {};
}

function getTodaySnapshot() {
  return getLocalDate();
}

function getServerDateSnapshot() {
  return "";
}

export default function TasksPage() {
  const { personalData, updatePersonalData } = usePersonalData();

  const tasks = personalData.tasks ?? [];

  const today = useSyncExternalStore(
    subscribeToDate,
    getTodaySnapshot,
    getServerDateSnapshot
  );

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    category: "Personal",
    date: "",
  });

  const todayTasks = tasks.filter((task) => task.date === today);

  const completedTasks = todayTasks.filter(
    (task) => task.status === "completed"
  );

  const taskProgress =
    todayTasks.length > 0
      ? Math.round((completedTasks.length / todayTasks.length) * 100)
      : 0;

  function openNewTaskForm() {
    setEditingId(null);
    setForm({
      title: "",
      category: "Personal",
      date: today || getLocalDate(),
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);

    setForm({
      title: "",
      category: "Personal",
      date: today || getLocalDate(),
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.title.trim() || !form.date) return;

    const newTask: DailyTask = {
      id: editingId ?? crypto.randomUUID(),
      title: form.title.trim(),
      category: form.category,
      date: form.date,
      status: editingId
        ? tasks.find((task) => task.id === editingId)?.status ?? "pending"
        : "pending",
    };

    const updatedTasks = editingId
      ? tasks.map((task) =>
          task.id === editingId ? newTask : task
        )
      : [...tasks, newTask];

    updatePersonalData({
      ...personalData,
      tasks: updatedTasks,
    });

    closeForm();
  }

  function editTask(task: DailyTask) {
    setEditingId(task.id);

    setForm({
      title: task.title,
      category: task.category,
      date: task.date,
    });

    setShowForm(true);
  }

  function deleteTask(id: string) {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    updatePersonalData({
      ...personalData,
      tasks: tasks.filter((task) => task.id !== id),
    });
  }

  function toggleTask(id: string) {
    updatePersonalData({
      ...personalData,
      tasks: tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "completed" ? "pending" : "completed",
            }
          : task
      ),
    });
  }

  function formatTaskDate(date: string) {
    const [year, month, day] = date.split("-").map(Number);

    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(year, month - 1, day));
  }

  const groupedTasks = [...tasks]
    .sort((a, b) => a.date.localeCompare(b.date))
    .reduce<Record<string, DailyTask[]>>((groups, task) => {
      if (!groups[task.date]) {
        groups[task.date] = [];
      }

      groups[task.date].push(task);

      return groups;
    }, {});

  return (
    <main className="min-h-screen p-5 text-white md:p-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-[#c5f467]"
        >
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#c5f467]">
              Productivity
            </p>

            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
              Daily Tasks
            </h1>

            <p className="mt-2 text-gray-400">
              Plan your day, complete your tasks and track your consistency.
            </p>
          </div>

          <button onClick={openNewTaskForm} className="vs-button">
            + Add New Task
          </button>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="vs-card p-6">
            <p className="text-sm text-gray-400">Today &apos;s Tasks</p>
            <h2 className="mt-2 text-3xl font-bold">
              {todayTasks.length}
            </h2>
          </div>

          <div className="vs-card p-6">
            <p className="text-sm text-gray-400">Completed Today</p>
            <h2 className="mt-2 text-3xl font-bold text-[#c5f467]">
              {completedTasks.length}
            </h2>
          </div>

          <div className="vs-card p-6">
            <p className="text-sm text-gray-400">Today &apos;s Progress</p>
            <h2 className="mt-2 text-3xl font-bold">
              {taskProgress}%
            </h2>
          </div>
        </div>

        {/* Task Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="vs-card mt-8 space-y-5 p-6"
          >
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Task" : "Create a New Task"}
            </h2>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Task Title
              </label>

              <input
                className="vs-input"
                placeholder="What do you want to accomplish?"
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                required
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
                  Date
                </label>

                <input
                  type="date"
                  className="vs-input"
                  value={form.date}
                  onChange={(event) =>
                    setForm({ ...form, date: event.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="submit" className="vs-button">
                {editingId ? "Save Changes" : "Create Task"}
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

        {/* Task List */}
        <section className="mt-8">
          <h2 className="mb-5 text-xl font-semibold">
            Your Schedule
          </h2>

          {tasks.length === 0 ? (
            <div className="vs-card px-6 py-16 text-center">
              <div className="text-4xl">✦</div>

              <h3 className="mt-4 text-xl font-semibold">
                A fresh start
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
                You have no tasks yet. Add your first task and start
                organising your day.
              </p>

              <button
                onClick={openNewTaskForm}
                className="vs-button mt-6"
              >
                + Create Your First Task
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedTasks).map(([date, dateTasks]) => (
                <div key={date} className="vs-card p-5 md:p-6">
                  <h3 className="mb-4 font-semibold text-[#c5f467]">
                    {date === today ? "Today" : formatTaskDate(date)}
                  </h3>

                  <div className="space-y-3">
                    {dateTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex flex-col justify-between gap-3 rounded-xl border border-[#30332d] bg-[#22251f] p-4 sm:flex-row sm:items-center"
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={task.status === "completed"}
                            onChange={() => toggleTask(task.id)}
                            className="mt-1 h-4 w-4 accent-[#c5f467]"
                            aria-label={`Mark ${task.title} as ${
                              task.status === "completed"
                                ? "pending"
                                : "completed"
                            }`}
                          />

                          <div>
                            <p
                              className={`font-medium ${
                                task.status === "completed"
                                  ? "text-gray-500 line-through"
                                  : "text-white"
                              }`}
                            >
                              {task.title}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {task.category}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => editTask(task)}
                            className="vs-button-secondary text-sm"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deleteTask(task.id)}
                            className="vs-button-secondary text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
