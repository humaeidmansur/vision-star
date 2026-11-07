
"use client";

import Link from "next/link";
import { useState } from "react";

import type { Skill } from "@/types";
import { usePersonalData } from "@/hooks/usePersonalData";

const categories = [
  "Technical",
  "Business",
  "Communication",
  "Language",
  "Leadership",
  "Creative",
  "Other",
];

export default function SkillsPage() {
  const { personalData, updatePersonalData, isLoaded } =
    usePersonalData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    category: "Technical",
    level: 0,
    targetLevel: 100,
  });

  const skills: Skill[] = personalData.skills ?? [];

  // Reset form
  function resetForm() {
    setForm({
      name: "",
      category: "Technical",
      level: 0,
      targetLevel: 100,
    });

    setEditingId(null);
    setIsFormOpen(false);
  }

  // Add or update skill
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const skill: Skill = {
      id: editingId ?? crypto.randomUUID(),
      name: form.name.trim(),
      category: form.category,
      level: form.level,
      targetLevel: form.targetLevel,
    };

    const updatedSkills = editingId
      ? skills.map((item: Skill) =>
          item.id === editingId ? skill : item
        )
      : [...skills, skill];

    updatePersonalData({
      ...personalData,
      skills: updatedSkills,
    });

    resetForm();
  }

  // Edit skill
  function handleEdit(skill: Skill) {
    setForm({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      targetLevel: skill.targetLevel,
    });

    setEditingId(skill.id);
    setIsFormOpen(true);
  }

  // Delete skill
  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmed) return;

    updatePersonalData({
      ...personalData,
      skills: skills.filter((item: Skill) => item.id !== id),
    });
  }

  // Update skill level
  function updateSkillLevel(id: string, level: number) {
    const updatedSkills = skills.map((skill: Skill) =>
      skill.id === id
        ? { ...skill, level }
        : skill
    );

    updatePersonalData({
      ...personalData,
      skills: updatedSkills,
    });
  }

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#10110f] p-10 text-white">
        Loading your skills...
      </main>
    );
  }

  const averageLevel =
    skills.length > 0
      ? Math.round(
          skills.reduce((total, skill) => total + skill.level, 0) /
            skills.length
        )
      : 0;

  return (
    <main className="min-h-screen bg-[#10110f] px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-5xl">

        {/* Back Navigation */}
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-gray-400 hover:text-[#c5f467]"
        >
          ← Back to Dashboard
        </Link>

        {/* Header */}
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c5f467]">
              Personal Development
            </p>

            <h1 className="text-3xl font-bold md:text-4xl">
              My Skills
            </h1>

            <p className="mt-3 text-gray-400">
              Develop your abilities and measure your growth.
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setIsFormOpen(true);
            }}
            className="rounded-xl bg-[#c5f467] px-5 py-3 font-semibold text-[#10110f] hover:bg-[#b2e653]"
          >
            + Add Skill
          </button>
        </header>

        {/* Overview */}
        <section className="mb-10 grid gap-5 sm:grid-cols-2">

          <div className="rounded-2xl border border-[#30332d] bg-[#191b18] p-6">
            <p className="text-sm text-gray-400">
              Total Skills
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              {skills.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-[#30332d] bg-[#191b18] p-6">
            <p className="text-sm text-gray-400">
              Average Skill Level
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#c5f467]">
              {averageLevel}%
            </h2>
          </div>

        </section>

        {/* Skill Form */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmit}
            className="mb-10 rounded-2xl border border-[#41463a] bg-[#191b18] p-6"
          >
            <h2 className="mb-6 text-xl font-semibold">
              {editingId ? "Edit Skill" : "Add New Skill"}
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Skill Name */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-gray-300">
                  Skill Name *
                </label>

                <input
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter a skill name"
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

              {/* Current Level */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Current Level: {form.level}%
                </label>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={form.level}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      level: Number(e.target.value),
                    })
                  }
                  className="w-full accent-[#c5f467]"
                />
              </div>

              {/* Target Level */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Target Level: {form.targetLevel}%
                </label>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={form.targetLevel}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      targetLevel: Number(e.target.value),
                    })
                  }
                  className="w-full accent-[#c5f467]"
                />
              </div>

            </div>

            {/* Form Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-xl bg-[#c5f467] px-6 py-3 font-semibold text-[#10110f] hover:bg-[#b2e653]"
              >
                {editingId ? "Save Changes" : "Add Skill"}
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

        {/* Skills List */}
        <section>

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Your Skills
            </h2>

            <span className="text-sm text-gray-500">
              {skills.length} skills
            </span>
          </div>

          {skills.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#41463a] bg-[#191b18] p-12 text-center">

              <div className="mb-4 text-4xl text-[#c5f467]">
                ◇
              </div>

              <h3 className="text-lg font-semibold">
                No skills added yet
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Start documenting your abilities and development goals.
              </p>

              <button
                onClick={() => setIsFormOpen(true)}
                className="mt-6 rounded-xl bg-[#c5f467] px-5 py-3 font-semibold text-[#10110f]"
              >
                Add Your First Skill
              </button>

            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">

              {skills.map((skill: Skill) => (
                <article
                  key={skill.id}
                  className="rounded-2xl border border-[#30332d] bg-[#191b18] p-6 transition hover:border-[#555d45]"
                >
                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <span className="rounded-full bg-[#c5f467]/10 px-3 py-1 text-xs text-[#c5f467]">
                        {skill.category}
                      </span>

                      <h3 className="mt-4 text-xl font-semibold">
                        {skill.name}
                      </h3>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="text-sm text-[#c5f467] hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="text-sm text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </div>

                  </div>

                  {/* Current Progress */}
                  <div className="mt-7">

                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-gray-400">
                        Current Level
                      </span>

                      <span className="text-[#c5f467]">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#30332d]">
                      <div
                        className="h-full rounded-full bg-[#c5f467] transition-all"
                        style={{
                          width: `${skill.level}%`,
                        }}
                      />
                    </div>

                  </div>

                  {/* Target Level */}
                  <div className="mt-5">

                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-gray-400">
                        Target Level
                      </span>

                      <span className="text-gray-300">
                        {skill.targetLevel}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#30332d]">
                      <div
                        className="h-full rounded-full bg-gray-500"
                        style={{
                          width: `${skill.targetLevel}%`,
                        }}
                      />
                    </div>

                  </div>

                  {/* Quick Update */}
                  <div className="mt-6 border-t border-[#30332d] pt-5">

                    <label className="mb-3 block text-xs text-gray-400">
                      Update current skill level
                    </label>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={skill.level}
                      onChange={(e) =>
                        updateSkillLevel(
                          skill.id,
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-[#c5f467]"
                    />

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
