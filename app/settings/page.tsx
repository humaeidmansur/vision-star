export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#10110f] p-8 text-white">

      <div className="mx-auto max-w-4xl">

        <p className="mb-3 text-sm uppercase tracking-widest text-[#c5f467]">
          Workspace / Settings
        </p>

        <h1 className="mb-3 text-3xl font-bold">
          Settings
        </h1>

        <p className="mb-10 text-gray-400">
          Manage your Vision Star application preferences.
        </p>

        <div className="rounded-2xl border border-[#30332d] bg-[#191b18] p-6">

          <h2 className="mb-3 text-xl font-semibold">
            Application Information
          </h2>

          <p className="text-sm text-gray-400">
            Welcome to Vision Star. Your personal life management
            workspace is ready to be configured.
          </p>

          <div className="mt-6 border-t border-[#30332d] pt-5">
            <p className="text-sm text-gray-500">
              Application Version
            </p>
            <p className="mt-1 font-medium">1.0.0</p>
          </div>

        </div>

      </div>

    </main>
  );
}