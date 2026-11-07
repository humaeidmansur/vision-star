
"use client";

import Link from "next/link";

export default function ValuesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12 text-white">
      <div className="vs-card w-full max-w-xl p-8 text-center md:p-12">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-[#c5f467]/20 bg-[#c5f467]/10 text-4xl text-[#c5f467]">
          ♡
        </div>

        {/* Label */}
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#c5f467]">
          Personal Values
        </p>

        {/* Heading */}
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">
          Something went wrong<span className="text-[#c5f467]">.</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-400">
          Your values are an important part of your journey. We couldn&apos;t
          load this section right now, but don&apos;t worry. Your journey
          doesn&apos;t stop here.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={reset} className="vs-button">
            Try Again ↻
          </button>

          <Link href="/" className="vs-button-secondary">
            Back to Dashboard
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-[#30332d] pt-6">
          <p className="text-xs tracking-widest text-gray-500">
            VISION STAR
          </p>
          <p className="mt-2 text-xs text-gray-600">
            Your Life · Your Progress · Your Direction
          </p>
        </div>
      </div>
    </main>
  );
}
