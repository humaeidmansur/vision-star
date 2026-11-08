"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePersonalData } from "@/hooks/usePersonalData";

const navigation = [
  { name: "Dashboard", href: "/", icon: "⌂" },
  { name: "My Journey", href: "/journey", icon: "◷" },
  { name: "Goals", href: "/goals", icon: "◎" },
  { name: "Skills", href: "/skills", icon: "◇" },
  { name: "Projects", href: "/projects", icon: "▣" },
  { name: "Daily Tasks", href: "/tasks", icon: "✓" },
  { name: "Personal Values", href: "/values", icon: "♡" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { logout, activeUserId } = usePersonalData();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push("/");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        className="absolute left-5 top-5 z-[60] rounded-lg border border-[#30332d] bg-[#191b18] px-3 py-2 text-xl text-[#c5f467] md:hidden"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 md:hidden"
        />
      )}

      {/* Fixed Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col overflow-y-auto border-r border-[#30332d] bg-[#191b18] px-6 pb-6 pt-20 transition-transform duration-300 md:pt-6 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold tracking-wide">
            VISION<span className="text-[#c5f467]"> STAR</span>
          </h1>

          <p className="mt-2 text-xs text-gray-400">
            Your life management system
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Workspace
          </p>

          <div className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-[#292d24] hover:text-[#c5f467]"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-[#30332d] pt-5">

          {/* Profile */}
          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="mb-2 flex items-center gap-4 rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-[#292d24] hover:text-[#c5f467]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M5 21a7 7 0 0 1 14 0" />
            </svg>

            Profile
          </Link>

          {/* Settings */}
          <Link
            href="/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-[#292d24] hover:text-[#c5f467]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
              <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.9 1.9-.06-.06A1.7 1.7 0 0 0 16 18.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-2.7v-.9A1.7 1.7 0 0 0 10.2 18.4a1.7 1.7 0 0 0-1.9.34l-.06.06-1.9-1.9.06-.06A1.7 1.7 0 0 0 6 15a1.7 1.7 0 0 0-1.6-1H3v-2.7h1.4A1.7 1.7 0 0 0 6 9.6a1.7 1.7 0 0 0-.34-1.9L5.6 7.64l1.9-1.9.06.06A1.7 1.7 0 0 0 9.4 6a1.7 1.7 0 0 0 1-1.6V3h2.7v1.4A1.7 1.7 0 0 0 14.8 6a1.7 1.7 0 0 0 1.9-.34l.06-.06 1.9 1.9-.06.06A1.7 1.7 0 0 0 18.4 9.4a1.7 1.7 0 0 0 1.6 1H21v2.7h-1A1.7 1.7 0 0 0 19.4 15Z" />
            </svg>

            Settings
          </Link>

          {/* Logout - Only for logged-in users */}
          {activeUserId && (
            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="m16 17 5-5-5-5" />
                <path d="M21 12H9" />
              </svg>

              Logout
            </button>
          )}

          {/* Copyright */}
          <p className="mt-6 text-xs text-gray-600">
            VISION STAR © 2026
          </p>
        </div>
      </aside>
    </>
  );
}