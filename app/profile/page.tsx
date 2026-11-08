"use client";

import { useState } from "react";
import { usePersonalData } from "@/hooks/usePersonalData";

export default function ProfilePage() {
  const { personalData, updatePersonalData } = usePersonalData();

  const profile = personalData.profile;

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: profile.name,
    title: profile.title,
    location: profile.location,
    bio: profile.bio,
    email: profile.email,
  });

  const handleSave = () => {
    updatePersonalData({
      ...personalData,
      profile: {
        ...personalData.profile,
        ...formData,
      },
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name,
      title: profile.title,
      location: profile.location,
      bio: profile.bio,
      email: profile.email,
    });

    setIsEditing(false);
  };

  const initials = profile.name
    ? profile.name.charAt(0).toUpperCase()
    : "?";

  return (
    <main className="min-h-screen bg-[#10110f] px-5 py-10 text-white sm:px-8 lg:px-12">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-bold tracking-[0.2em] text-[#c5f467]">
            PERSONAL SPACE
          </span>

          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-3xl border border-[#30332d] bg-[#191b18] p-6 sm:p-9">

          <div className="flex flex-col items-center gap-5 border-b border-[#30332d] pb-8 sm:flex-row">

            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#c5f467]/40 bg-[#c5f467]/10 text-4xl font-bold text-[#c5f467]">
              {initials}
            </div>

            {/* User Details */}
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold">
                {profile.name || "Your Name"}
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                {profile.title || "Add your professional title"}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                {profile.location || "Add your location"}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="rounded-xl border border-[#c5f467]/30 px-5 py-2.5 text-sm font-semibold text-[#c5f467] transition hover:bg-[#c5f467] hover:text-[#10110f] sm:ml-auto"
            >
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </button>

          </div>

          {/* Personal Information */}
          <div className="mt-8">

            <h3 className="mb-6 text-lg font-bold">
              Personal Information
            </h3>

            <div className="grid gap-6 sm:grid-cols-2">

              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Full Name
                </label>

                <input
                  type="text"
                  value={formData.name}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="vs-input w-full disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Email Address
                </label>

                <input
                  type="email"
                  value={formData.email}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="vs-input w-full disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="Your email"
                />
              </div>

              {/* Professional Title */}
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Professional Title
                </label>

                <input
                  type="text"
                  value={formData.title}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="vs-input w-full disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="e.g. Student, Developer"
                />
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Location
                </label>

                <input
                  type="text"
                  value={formData.location}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="vs-input w-full disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="Your location"
                />
              </div>

            </div>

            {/* Bio */}
            <div className="mt-6">
              <label className="mb-2 block text-sm text-gray-400">
                About Me
              </label>

              <textarea
                rows={4}
                value={formData.bio}
                disabled={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="vs-input w-full resize-none disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="Write something about yourself..."
              />
            </div>

            {/* Save / Cancel */}
            {isEditing && (
              <div className="mt-8 flex flex-wrap justify-end gap-3">

                <button
                  onClick={handleCancel}
                  className="rounded-xl border border-[#30332d] px-6 py-3 text-sm font-semibold text-gray-300 transition hover:bg-[#252820]"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="vs-button rounded-xl px-7 py-3 text-sm font-bold"
                >
                  Save Changes
                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </main>
  );
}