"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLogin } from "../hooks/useLogin";

type FormState = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {mutate, isPending, error} = useLogin()

  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    remember: true,
  });

  const isValid = useMemo(() => {
    const emailOk = /^\S+@\S+\.\S+$/.test(form.email.trim());
    const passOk = form.password.trim().length >= 6;
    return emailOk && passOk;
  }, [form.email, form.password]);

  const onChange =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = key === "remember" ? e.target.checked : e.target.value;
      setForm((p) => ({ ...p, [key]: value }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

     mutate({
      email: form.email,
      password: form.password,
    });
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
            <p className="mt-1 text-sm text-white/70">
              Login to continue swiping and matching.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
            DevTinder
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm text-white/80">Email</label>
            <input
              value={form.email}
              onChange={onChange("email")}
              type="email"
              placeholder="you@company.com"
              className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/20 focus:bg-white/10"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm text-white/80">Password</label>
            <div className="relative">
              <input
                value={form.password}
                onChange={onChange("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 pr-12 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/20 focus:bg-white/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75 hover:bg-white/10"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={onChange("remember")}
                className="h-4 w-4 rounded border-white/20 bg-transparent"
              />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-sm text-white/70 hover:text-white"
            >
              Forgot password?
            </Link>
          </div>

         {error && (
  <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">
    {(error as any)?.response?.data || (error as any)?.message || "Login failed"}
  </div>
)}


<button
  type="submit"
  disabled={isPending}
  className="h-14 w-full rounded-2xl
             bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-cyan-600
             text-white font-semibold text-lg
             hover:brightness-110 hover:shadow-xl
             active:scale-95
             disabled:opacity-50"
>
  {isPending ? "Logging in..." : "Login"}
</button>



       

          {/* Footer */}
          <p className="pt-2 text-center text-sm text-white/70">
            New here?{" "}
            <Link href="/signup" className="text-white hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </div>

      <p className="mt-4 text-center text-xs text-white/40">
        By continuing, you agree to DevTinder’s Terms & Privacy.
      </p>
    </div>
  );
};

export default LoginCard;
