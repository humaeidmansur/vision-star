
"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project, ProjectStatus } from "@/types";
import { usePersonalData } from "@/hooks/usePersonalData";

const emptyForm = {
  name: "",
  description: "",
  technologies: "",
  status: "planning" as ProjectStatus,
  liveUrl: "",
  githubUrl: "",
};

export default function ProjectsPage() {
  const { personalData, updatePersonalData } = usePersonalData();

  const projects = personalData.projects ?? [];

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim()) return;

    const newProject: Project = {
      id: editingId ?? crypto.randomUUID(),
      name: form.name.trim(),
      description: form.description.trim(),
      technologies: form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      status: form.status,
      liveUrl: form.liveUrl.trim(),
      githubUrl: form.githubUrl.trim(),
    };

    const updatedProjects = editingId
      ? projects.map((project) =>
          project.id === editingId ? newProject : project
        )
      : [...projects, newProject];

    updatePersonalData({
      ...personalData,
      projects: updatedProjects,
    });

    closeForm();
  }

  function editProject(project: Project) {
    setEditingId(project.id);
    setForm({
      name: project.name,
      description: project.description,
      technologies: project.technologies.join(", "),
      status: project.status,
      liveUrl: project.liveUrl ?? "",
      githubUrl: project.githubUrl ?? "",
    });
    setShowForm(true);
  }

  function deleteProject(id: string) {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    updatePersonalData({
      ...personalData,
      projects: projects.filter((project) => project.id !== id),
    });
  }

  const completed = projects.filter(
    (project) => project.status === "completed"
  ).length;

  const inProgress = projects.filter(
    (project) => project.status === "in-progress"
  ).length;

  function statusLabel(status: ProjectStatus) {
    if (status === "completed") return "Completed";
    if (status === "in-progress") return "In Progress";
    return "Planning";
  }

  return (
    <main className="min-h-screen p-5 text-white md:p-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm text-gray-400 transition hover:text-[#c5f467]"
        >
          Back to Dashboard
        </Link>

        <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#c5f467]">
              Building & Creating
            </p>

            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
              My Projects
            </h1>

            <p className="mt-2 text-gray-400">
              Organise your ideas, track your work and showcase your projects.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="vs-button"
          >
            + Add New Project
          </button>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="vs-card p-6">
            <p className="text-sm text-gray-400">Total Projects</p>
            <h2 className="mt-2 text-3xl font-bold">{projects.length}</h2>
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

        {/* Add / Edit Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="vs-card mt-8 space-y-5 p-6"
          >
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Project" : "Add a New Project"}
            </h2>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Project Name
              </label>
              <input
                className="vs-input"
                placeholder="Enter project name"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
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
                placeholder="Describe your project..."
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Technologies
              </label>
              <input
                className="vs-input"
                placeholder="React, Next.js, TypeScript"
                value={form.technologies}
                onChange={(event) =>
                  setForm({ ...form, technologies: event.target.value })
                }
              />
              <p className="mt-2 text-xs text-gray-500">
                Separate technologies with commas.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Project Status
              </label>
              <select
                className="vs-input"
                value={form.status}
                onChange={(event) =>
                  setForm({
                    ...form,
                    status: event.target.value as ProjectStatus,
                  })
                }
              >
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  className="vs-input"
                  placeholder="https://example.com"
                  value={form.liveUrl}
                  onChange={(event) =>
                    setForm({ ...form, liveUrl: event.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  GitHub URL
                </label>
                <input
                  type="url"
                  className="vs-input"
                  placeholder="https://github.com/username/project"
                  value={form.githubUrl}
                  onChange={(event) =>
                    setForm({ ...form, githubUrl: event.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="submit" className="vs-button">
                {editingId ? "Save Changes" : "Add Project"}
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

        {/* Projects List */}
        <section className="mt-8">
          <h2 className="mb-5 text-xl font-semibold">Your Projects</h2>

          {projects.length === 0 ? (
            <div className="vs-card px-6 py-16 text-center">
              <div className="text-4xl">✦</div>

              <h3 className="mt-4 text-xl font-semibold">
                Your ideas start here
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
                You have not added any projects yet. Create your first project
                to start tracking your work.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="vs-button mt-6"
              >
                + Create Your First Project
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <article key={project.id} className="vs-card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold">
                      {project.name}
                    </h3>

                    <span className="rounded-full bg-[#c5f467]/10 px-3 py-1 text-xs text-[#c5f467]">
                      {statusLabel(project.status)}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {project.description || "No description added."}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-lg border border-[#30332d] bg-[#22251f] px-3 py-1 text-xs text-gray-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#c5f467] hover:underline"
                      >
                        Live Demo ↗
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#c5f467] hover:underline"
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>

                  <div className="mt-6 flex gap-2 border-t border-[#30332d] pt-4">
                    <button
                      onClick={() => editProject(project)}
                      className="vs-button-secondary text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProject(project.id)}
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
