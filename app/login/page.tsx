"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { usePersonalData } from "@/hooks/usePersonalData";
import LoginContent from "@/components/auth/LoginPopup";

export default function LoginPopup() {
  const pathname = usePathname();
  const { activeUserId, isLoaded } = usePersonalData();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isLoaded || activeUserId) return;

    if (pathname === "/login" || pathname === "/register") return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [isLoaded, activeUserId, pathname]);

  const closePopup = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-md sm:p-6"
      onClick={closePopup}
    >
      <div
        className="relative my-auto w-full max-w-6xl animate-[popup_0.35s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close login popup"
          className="absolute -right-2 -top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#252820] text-xl text-gray-300 transition hover:bg-[#c5f467] hover:text-[#10110f] sm:-right-3 sm:-top-3"
        >
          ×
        </button>
{/* Login Popup Content */}
<div className="max-h-[92vh] overflow-y-auto rounded-3xl">
  <div className="relative rounded-3xl border border-[#30332d] bg-[#191b18] p-8 text-center shadow-2xl">
    <h2 className="text-3xl font-extrabold text-white">
      Welcome to Vision Star.
    </h2>

    <p className="mt-3 text-sm text-gray-400">
      Your journey, your goals, your future.
    </p>

    <button
      onClick={() => setIsOpen(false)}
      className="mt-6 rounded-xl bg-[#c5f467] px-6 py-3 font-bold text-[#10110f]"
    >
      Continue as Guest
    </button>
  </div>
</div>
      </div>
    </div>
  );
}