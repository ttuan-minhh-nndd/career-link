import { Link } from "react-router-dom";
import { Mail, Lock, CheckCircle2 } from "lucide-react";
import path from "../../constants/path";

export default function Login() {
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-sky-50 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto grid min-h-screen max-w-7xl place-items-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-900/40 dark:text-sky-300 dark:ring-sky-800">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Đăng nhập</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Tiếp tục trải nghiệm CareerLink</p>
          </div>

          {/* Card */}
          <div className="rounded-3xl bg-white/90 p-6 shadow-xl ring-1 ring-slate-100 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:bg-slate-900/60 dark:ring-white/10">
            <form className="space-y-4" noValidate>
              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2.5 text-sm shadow-sm outline-none ring-sky-100 transition focus:border-sky-300 focus:ring-4 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Mật khẩu
                  </label>
                  <a href="#" className="text-xs font-medium text-sky-700 hover:underline dark:text-sky-400">
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Mật khẩu (≥ 6 ký tự)"
                    className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2.5 text-sm shadow-sm outline-none ring-sky-100 transition focus:border-sky-300 focus:ring-4 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Remember me */}
              <label className="flex cursor-pointer select-none items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 dark:border-slate-600"
                />
                Ghi nhớ đăng nhập
              </label>

              {/* Primary Button (non-submit to keep UI-only) */}
              <button
                type="button"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-100 dark:focus:ring-sky-900"
              >
                Đăng nhập
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
              <span className="text-xs text-slate-500 dark:text-slate-400">hoặc</span>
              <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Social (UI only) */}
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-900"
              aria-label="Đăng nhập với Google"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-4 w-4" aria-hidden="true"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303C33.673,32.91,29.245,36,24,36c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.756,6.053,29.644,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.756,6.053,29.644,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.197l-6.19-5.238C29.246,35.955,26.715,37,24,37c-5.202,0-9.611-3.058-11.298-7.402l-6.548,5.036C9.56,40.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-1.025,2.911-3.158,5.223-5.794,6.565c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C35.403,40.026,44,35,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
              Đăng nhập với Google
            </button>

            {/* Footer */}
            <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
              Chưa có tài khoản?{" "}
              <Link className="font-semibold text-sky-700 hover:underline dark:text-sky-400" to={path.register}>
                Đăng ký
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
