import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../../../../context/app.context";
import {
  setProfileToLocalStorage,
  setTokenToLocalStorage,
} from "../../../utils/auth";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema, RegisterSchema } from "../../../utils/rules";
import { useForm } from "react-hook-form";
import { isAxiosUnprocessableEntityError } from "../../../utils/format";
import {
  ErrorResponse,
  ValidationErrorResponse,
} from "../../../types/response.types";

import usersApi from "../../../apis/auth.api";
import path from "../../../constants/path";
import Input from "../../../components/Input/Input";

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterSchema>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(registerSchema) as any,
  });

  const registerAccountMutation = useMutation({
    mutationFn: (body: RegisterSchema) => {
      return usersApi.registerAccount(body);
    },
  });

  const onSubmit = handleSubmit((data) => {
    registerAccountMutation.mutate(data, {
      onSuccess: async (data) => {
        setIsAuthenticated(true);
        setTokenToLocalStorage(data.data.result.token);
        const getMeResponse = await usersApi.getMe();
        setProfile(getMeResponse.data.result);
        setProfileToLocalStorage(getMeResponse.data.result);
        navigate(path.home);
      },
      onError: (error) => {
        if (
          isAxiosUnprocessableEntityError<
            ErrorResponse<ValidationErrorResponse>
          >(error)
        ) {
          const formError = error.response?.data.errors;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof RegisterSchema, {
                message: formError[key].msg,
                type: "Server",
              });
            });
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
              <UserPlus className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Tạo tài khoản
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Chọn vai trò để đồng bộ trải nghiệm
            </p>
          </div>

          {/* Card */}
          <div className="rounded-3xl bg-white/90 p-6 shadow-xl ring-1 ring-slate-100 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:bg-slate-900/60 dark:ring-white/10">
            <form className="space-y-4" onSubmit={onSubmit} noValidate>
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                  Họ và tên
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>

                  <Input<RegisterSchema>
                    id="name"
                    name="name"
                    type="name"
                    placeholder="Nguyễn Văn A"
                    register={register}
                    className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2.5 text-sm shadow-sm outline-none ring-sky-100 transition focus:border-sky-300 focus:ring-4 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder-slate-500"
                    errorMessages={errors.name?.message}
                  />
                </div>
              </div>

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

                  <Input<RegisterSchema>
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    register={register}
                    className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2.5 text-sm shadow-sm outline-none ring-sky-100 transition focus:border-sky-300 focus:ring-4 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder-slate-500"
                    errorMessages={errors.name?.message}
                  />

                  {/* <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2.5 text-sm shadow-sm outline-none ring-sky-100 transition focus:border-sky-300 focus:ring-4 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder-slate-500"
                  /> */}
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <Input<RegisterSchema>
                    id="password"
                    name="email"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    register={register}
                    className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2.5 text-sm shadow-sm outline-none ring-sky-100 transition focus:border-sky-300 focus:ring-4 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder-slate-500"
                    errorMessages={errors.name?.message}
                  />
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  {/* <input
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2.5 text-sm shadow-sm outline-none ring-sky-100 transition focus:border-sky-300 focus:ring-4 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder-slate-500"
                  /> */}
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Đăng ký với vai trò
                </label>
                <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:ring-sky-900">
                  <option value="mentee">Mentee</option>
                  <option value="mentor">Mentor</option>
                </select>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-100 dark:focus:ring-sky-900"
              >
                Tạo tài khoản
              </button>
            </form>

            {/* Footer */}
            <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
              Đã có tài khoản?{" "}
              <Link
                className="font-semibold text-sky-700 hover:underline dark:text-sky-400"
                to={path.login}
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
