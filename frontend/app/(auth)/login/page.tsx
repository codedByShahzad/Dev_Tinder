import LoginCard from "../../components/LoginCard";

const LoginPage = () => {
  return (
    <main className="min-h-screen bg-[#070A12] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="absolute -bottom-44 left-16 h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute top-20 right-10 h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-12">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2">
          {/* Left - Brand */}
          <div className="hidden lg:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Find your next dev match
            </div>

            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight">
              DevTinder
              <span className="block bg-gradient-to-r from-fuchsia-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Pair. Chat. Build.
              </span>
            </h1>

            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              Swipe talented developers, connect instantly, and collaborate on projects.
              Clean UI, fast matches, and a smooth experience.
            </p>

            <div className="mt-8 grid max-w-md gap-3">
              {[
                { title: "Quick onboarding", desc: "Sign in and start swiping in seconds." },
                { title: "Secure auth", desc: "Token-based login ready for production." },
                { title: "Modern design", desc: "Sleek glass UI + responsive layout." },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <div className="text-sm font-medium">{f.title}</div>
                  <div className="mt-1 text-sm text-white/70">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Card */}
          <LoginCard />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
