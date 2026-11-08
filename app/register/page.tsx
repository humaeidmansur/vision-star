"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PersonalData } from "@/types";

import {
  saveUser,
  canRegister,
  setActiveUser,
  savePersonalData,
} from "@/lib/storage";

import { initialPersonalData } from "@/data/initial-data";
import { usePersonalData } from "@/hooks/usePersonalData";

export default function RegisterPage() {
  const router = useRouter();
  const { setCurrentUser } = usePersonalData();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please complete all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (!canRegister()) {
        setError(
          "Only 3 people can register. All registration slots are occupied. Please try again after 3 days."
        );
        return;
      }

      const userId = crypto.randomUUID();

      const newUser = {
        id: userId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
      };

      const userSaved = saveUser(newUser);

      if (!userSaved) {
        setError(
          "This email is already registered or registration is unavailable."
        );
        return;
      }

      const newPersonalData: PersonalData =
        structuredClone(initialPersonalData);

      newPersonalData.profile.name = name.trim();
      newPersonalData.profile.email = email.trim().toLowerCase();

      savePersonalData(userId, newPersonalData);

      setActiveUser(userId);
      setCurrentUser(userId);

      router.push("/");
    } catch (error) {
      console.error("Registration error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#10110f] px-5 py-12">

      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Vision <span className="text-[#c5f467]">Star</span>
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Create your personal space. Build your future.
          </p>
        </div>

        {/* Registration Card */}
        <div className="relative rounded-3xl border border-[#30332d] bg-[#191b18] p-7 shadow-xl md:p-9">

          {/* Close Button */}
          <button
            type="button"
            onClick={() => router.push("/")}
            aria-label="Close registration"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#30332d] text-xl text-gray-400 transition hover:border-[#c5f467] hover:bg-[#c5f467] hover:text-[#10110f]"
          >
            ×
          </button>

          {/* Heading */}
          <h2 className="pr-10 text-2xl font-bold text-white">
            Create Your Profile
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Start your personal journey with Vision Star.
          </p>

          {/* Form */}
          <form onSubmit={handleRegister} className="mt-7 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="vs-input w-full"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="vs-input w-full"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="vs-input w-full"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="vs-input w-full"
                required
              />
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm leading-6 text-red-400"
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="vs-button w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Creating Profile..." : "Create My Profile"}
            </button>

          </form>

          <p className="mt-6 text-center text-xs text-gray-200">
            Maximum 3 registered profiles at a time.
          </p>

        </div>
      </div>
    </main>
  );
}
