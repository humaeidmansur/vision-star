
"use client";

import Link from "next/link";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: "⌂" },
  { name: "My Journey", href: "/journey", icon: "◷" },
  { name: "Goals", href: "/goals", icon: "◎" },
  { name: "Skills", href: "/skills", icon: "◇" },
  { name: "Projects", href: "/projects", icon: "▣" },
  { name: "Daily Tasks", href: "/tasks", icon: "✓" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        className="fixed left-5 top-5 z-[60] rounded-lg border border-[#30332d] bg-[#191b18] px-3 py-2 text-xl text-[#c5f467] md:hidden"
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

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex min-h-screen w-64 flex-col border-r border-[#30332d] bg-[#191b18] p-6 transition-transform duration-300 md:sticky md:top-0 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold tracking-wide">
            VISION<span className="text-[#c5f467]"> STAR.</span>
          </h1>
          <p className="mt-2 text-xs text-gray-500">
            Your life management space
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
          <Link
            href="/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-[#292d24] hover:text-[#c5f467]"
          >
            <span className="text-lg">⚙</span>
            Settings
          </Link>

          <p className="mt-6 text-xs text-gray-600">
            VISION STAR © 2026
          </p>
        </div>
      </aside>
    </>
  );
}
