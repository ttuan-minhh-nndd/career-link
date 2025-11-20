import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../../../../context/app.context";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/utils/rules";
import { Controller, useForm } from "react-hook-form";
import { isAxiosUnprocessableEntityError } from "@/utils/format";
import { ErrorResponse, ValidationErrorList } from "@/types/response";
import { HttpStatusCode } from "axios";

import usersApi from "@/apis/auth.api";
import path from "@/constants/path";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navigate = useNavigate();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
    },
  });

  const registerAccountMutation = useMutation({
    mutationFn: (body: RegisterSchema) => {
      return usersApi.registerAccount(body);
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    registerAccountMutation.mutate(data, {
      onSuccess: async (data) => {
        setIsAuthenticated(true);
        setProfile(data.data.user);
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
                  form.setError(err.field as keyof RegisterSchema, {
                    type: "Server",
                    message: err.message,
                  });
                });
              }
              break;

            // 409 → "User already exists"
            case HttpStatusCode.Conflict:
              form.setError("email", {
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
            <form className="space-y-3" onSubmit={onSubmit} noValidate>
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
                    type="text"
                    placeholder="Nguyễn Văn A"
                    register={register}
                    className={`
                      w-full rounded-xl border bg-white px-9 py-2.5 text-sm shadow-sm outline-none transition
                      ${
                        errors.name
                          ? "border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                          : "border-slate-200 ring-sky-100 focus:border-sky-300 focus:ring-4"
                      }
                      dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder-slate-500
                    `}
                    errorMessages={undefined}
                  />
                </div>

                {/* chừa sẵn chỗ cho lỗi để không giật layout */}
                <div className="h-3">
                  {errors.name && (
                    <p className="text-[11px] text-red-500">{errors.name.message}</p>
                  )}
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
                    className={`
                      w-full rounded-xl border bg-white px-9 py-2.5 text-sm shadow-sm outline-none transition
                      ${
                        errors.email
                          ? "border-red-400 focus:border-red-400 focus:ring-red-200 focus:ring-4"
                          : "border-slate-200 ring-sky-100 focus:border-sky-300 focus:ring-4"
                      }
                      dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder-slate-500
                    `}
                    errorMessages={undefined}
                  />
                </div>

                <div className="h-3">
                  {errors.email && (
                    <p className="text-[11px] text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                  Mật khẩu
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>

                  <Input<RegisterSchema>
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    register={register}
                    className={`
                      w-full rounded-xl border bg-white px-9 py-2.5 text-sm shadow-sm outline-none transition
                      ${
                        errors.password
                          ? "border-red-400 focus:border-red-400 focus:ring-red-200 focus:ring-4"
                          : "border-slate-200 ring-sky-100 focus:border-sky-300 focus:ring-4"
                      }
                      dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder-slate-500
                    `}
                    errorMessages={undefined}
                  />
                </div>

                <div className="h-3">
                  {errors.password && (
                    <p className="text-[11px] text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>

              {/* Role */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Đăng ký với vai trò
                </label>

                <select
                  {...register("role")}
                  defaultValue=""
                  className={`
                    rounded-lg border px-3 py-2 text-sm shadow-sm outline-none transition
                    ${
                      errors.role
                        ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                        : "border-slate-200 bg-white focus:border-sky-300 focus:ring-sky-100"
                    }
                    dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:ring-sky-900
                  `}
                >
                  <option value="" disabled>
                    Chọn vai trò
                  </option>
                  <option value="mentee">Mentee</option>
                  <option value="mentor">Mentor</option>
                </select>

                <div className="h-3">
                  {errors.role && (
                    <p className="text-[11px] text-red-500">{errors.role.message}</p>
                  )}
                </div>
              </div>

              {/* Button giữ nguyên */}
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
          </Card>
        </div>
      </div>
    </section>
  );
}
