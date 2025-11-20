import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, CheckCircle2 } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../../../../context/app.context";
import { loginSchema, LoginSchema } from "@/utils/rules";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { setProfileToLocalStorage } from "@/utils/auth";
import { isAxiosUnprocessableEntityError } from "@/utils/format";
import { ErrorResponse, ValidationErrorList } from "@/types/response";
import { HttpStatusCode } from "axios";

import usersApi from "@/apis/auth.api";
import path from "@/constants/path";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Card } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginAccountMutation = useMutation({
    mutationFn: (body: LoginSchema) => {
      return usersApi.loginAccount(body);
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: async (data) => {
        setIsAuthenticated(true);
        setProfileToLocalStorage(data.data.user);
        setProfile(data.data.user);
        if (data.data.user.role == "mentee") {
          navigate(path.mentee_home);
        } else {
          navigate(path.mentor_home);
        }
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
                  form.setError(err.field as keyof LoginSchema, {
                    type: "Server",
                    message: err.message,
                  });
                });
              }
              break;

            case HttpStatusCode.Unauthorized:
              form.setError("email", {
                type: "Server",
                message: data.message,
              });
              form.setError("password", {
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
          <Card className="p-6">
            <form
              id="login-form"
              className="space-y-4"
              onSubmit={onSubmit}
              noValidate
            >
              <FieldGroup>
                {/* Email */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="login-email">Email</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="login-email"
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon>
                          <Mail />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Password */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="login-password">Mật khẩu</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="login-password"
                          type="password"
                          placeholder="Mật khẩu (≥ 6 ký tự)"
                          autoComplete="current-password"
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon>
                          <Lock />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full cursor-pointer">
                  Đăng nhập
                </Button>
              </FieldGroup>
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
          </Card>
        </div>
      </div>
    </section>
  );
}
