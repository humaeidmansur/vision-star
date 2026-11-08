"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import { getUsers } from "@/lib/storage";
import { usePersonalData } from "@/hooks/usePersonalData";

export default function LoginPopup() {
  const router = useRouter();
  const pathname = usePathname();

  const { activeUserId, isLoaded, setCurrentUser } = usePersonalData();

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show popup after 5 seconds
  useEffect(() => {
    if (!isLoaded || activeUserId) return;

    if (pathname === "/login" || pathname === "/register") return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [isLoaded, activeUserId, pathname]);

  const closePopup = () => {
    setIsOpen(false);
  };

  // Login functionality
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const users = getUsers();

      const user = users.find(
        (item) =>
          item.email.toLowerCase() === email.trim().toLowerCase() &&
          item.password === password
      );

      if (!user) {
        setError("Incorrect email or password. Please try again.");
        return;
      }

      setCurrentUser(user.id);
      setIsOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't display popup
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-md sm:p-6">

      {/* Popup Container */}
      <div className="relative my-auto w-full max-w-6xl">

        {/* Close Button */}
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close popup"
          className="absolute -right-2 -top-2 z-[10000] flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#252820] text-2xl text-gray-300 transition hover:bg-[#c5f467] hover:text-[#10110f] sm:-right-3 sm:-top-3"
        >
          ×
        </button>

        {/* Original Two-Column Design */}
        <div className="max-h-[92vh] overflow-y-auto rounded-3xl border border-[#30332d] bg-[#191b18] shadow-2xl">

          <div className="grid w-full lg:grid-cols-2">

            {/* LEFT SECTION - GUEST */}
            <section className="relative flex min-h-[420px] flex-col justify-between overflow-hidden border-b border-[#30332d] bg-[#1d2119] p-7 sm:p-10 lg:min-h-[650px] lg:border-b-0 lg:border-r lg:p-12">

              {/* Decoration */}
              <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full border border-[#c5f467]/10" />
              <div className="pointer-events-none absolute -right-10 top-32 h-52 w-52 rounded-full border border-[#c5f467]/10" />

              {/* Brand */}
              <div className="relative z-10">
                <h1 className="text-3xl font-extrabold tracking-tight text-white">
                  Vision <span className="text-[#c5f467]">Star.</span>
                </h1>

                <p className="mt-2 text-xs tracking-[0.3em] text-gray-500">
                  YOUR PERSONAL LIFE SYSTEM
                </p>
              </div>

              {/* Welcome */}
              <div className="relative z-10 my-12 lg:my-0">

                <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#c5f467]/20 bg-[#c5f467]/10 text-3xl text-[#c5f467]">
                  ✦
                </div>

                <h2 className="max-w-md text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                  Welcome to
                  <br />
                  Vision Star.
                  <br />
                  <span className="text-[#c5f467]">
                    Your future starts here.
                  </span>
                </h2>

                <p className="mt-6 max-w-sm text-sm leading-7 text-gray-400 sm:text-base">
                  Your journey, your goals, your future.
                  Start exploring and turn your vision into reality.
                </p>

                <button
                  type="button"
                  onClick={closePopup}
                  className="mt-8 inline-flex items-center gap-3 rounded-xl border border-[#c5f467]/40 bg-[#c5f467]/10 px-7 py-3.5 text-sm font-bold text-[#c5f467] transition-all duration-300 hover:bg-[#c5f467] hover:text-[#10110f]"
                >
                  Explore as Guest 
                </button>

              </div>

              {/* Footer */}
              <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-5 text-xs text-gray-500">
                <span>One life. Endless possibilities.</span>
                <span>EST. 2026</span>
              </div>

            </section>

            {/* RIGHT SECTION - LOGIN */}
            <section className="flex items-center justify-center bg-[#191b18] px-6 py-12 sm:px-10 lg:px-12">

              <div className="w-full max-w-md">

                {/* Heading */}
                <div className="mb-9">

                  <span className="text-xs font-bold tracking-[0.2em] text-[#c5f467]">
                    WELCOME BACK
                  </span>

                  <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Sign in to your
                    <br />
                    <span className="text-[#c5f467]">
                      personal space.
                    </span>
                  </h2>

                  <p className="mt-4 text-sm leading-6 text-gray-400">
                    Pick up where you left off.
                    Your progress is waiting for you.
                  </p>

                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="popup-email"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Email Address
                    </label>

                    <input
                      id="popup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      autoComplete="email"
                      className="vs-input w-full rounded-xl py-3.5"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="popup-password"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <input
                        id="popup-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className="vs-input w-full rounded-xl py-3.5 pr-20"
                        required
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#c5f467] hover:text-white"
                      >
                        {showPassword ? "HIDE" : "SHOW"}
                      </button>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
                    >
                      {error}
                    </div>
                  )}

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="vs-button flex w-full items-center justify-center gap-3 rounded-xl py-4 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Signing in..." : "Access My Dashboard"}
                    {!isSubmitting }
                  </button>

                </form>

                {/* Registration */}
                <div className="mt-9 border-t border-[#30332d] pt-7 text-center">

                  <p className="text-sm text-gray-400">
                    New to Vision Star?
                  </p>

                  <Link
                    href="/register"
                    onClick={closePopup}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#c5f467] transition hover:text-white"
                  >
                    Create Your Profile <span>↗</span>
                  </Link>

                </div>

                {/* Footer */}
                <p className="mt-10 text-center text-xs text-gray-600">
                  © 2026 Vision Star. Your life, your direction.
                </p>

              </div>

            </section>

          </div>
        </div>

      </div>
    </div>
  );
}