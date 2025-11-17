import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, CheckCircle2 } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../../../../context/app.context";
import { loginSchema, LoginSchema } from "../../../utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  setProfileToLocalStorage,
  setTokenToLocalStorage,
} from "../../../utils/auth";
import { isAxiosUnprocessableEntityError } from "../../../utils/format";
import {
  ErrorResponse,
  ValidationErrorList,
} from "../../../types/response.types";
import { HttpStatusCode } from "axios";

import usersApi from "../../../apis/auth.api";
import path from "../../../constants/path";
import Input from "../../../components/Input/Input";

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchema>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(loginSchema) as any,
  });

  const loginAccountMutation = useMutation({
    mutationFn: (body: LoginSchema) => {
      return usersApi.loginAccount(body);
    },
  });

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: async (data) => {
        setIsAuthenticated(true);
        setTokenToLocalStorage(data.data.token);
        const getMeResponse = await usersApi.getMe();
        setProfile(getMeResponse.data);
        setProfileToLocalStorage(getMeResponse.data);
        navigate(path.mentor_profile);
      },
      onError: (error) => {
        if (
          isAxiosUnprocessableEntityError<ErrorResponse<ValidationErrorList>>(
            error
          )
        ) {
          const status = error.response?.status;
          const data = error.response
            ?.data as ErrorResponse<ValidationErrorList>;

          switch (status) {
            // 422 → field errors
            case HttpStatusCode.UnprocessableEntity:
              if (Array.isArray(data.errors)) {
                data.errors.forEach((err) => {
                  setError(err.field as keyof LoginSchema, {
                    type: "Server",
                    message: err.message,
                  });
                });
              }
              break;

            case HttpStatusCode.Unauthorized:
              setError("email", {
                type: "Server",
                message: data.message,
              });
              setError("password", {
                type: "Server",
                message: data.message,
              });
              break;

            // fallback → unknown
            default:
              console.error("Unexpected error", data);
          }
        }
      },
    });
  });
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-sky-50 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto grid min-h-screen max-w-7xl place-items-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-900/40 dark:text-sky-300 dark:ring-sky-800">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Đăng nhập
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Tiếp tục trải nghiệm CareerLink
            </p>
          </div>

          {/* Card */}
          <div className="rounded-3xl bg-white/90 p-6 shadow-xl ring-1 ring-slate-100 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:bg-slate-900/60 dark:ring-white/10">
            <form className="space-y-4" onSubmit={onSubmit} noValidate>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    register={register}
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2.5 text-sm shadow-sm outline-none ring-sky-100 transition focus:border-sky-300 focus:ring-4 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder-slate-500"
                    errorMessages={errors.email?.message}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
                  >
                    Mật khẩu
                  </label>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>

                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Mật khẩu (≥ 6 ký tự)"
                    register={register}
                    autoComplete="password"
                    className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2.5 text-sm shadow-sm outline-none ring-sky-100 transition focus:border-sky-300 focus:ring-4 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder-slate-500"
                    errorMessages={errors.password?.message}
                  />
                </div>
              </div>

              {/* Primary Button (non-submit to keep UI-only) */}
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-100 dark:focus:ring-sky-900"
              >
                Đăng nhập
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                hoặc
              </span>
              <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Footer */}
            <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
              Chưa có tài khoản?{" "}
              <Link
                className="font-semibold text-sky-700 hover:underline dark:text-sky-400"
                to={path.register}
              >
                Đăng ký
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
