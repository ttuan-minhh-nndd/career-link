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
          <Card className="p-6">
            <form
              id="register-form"
              className="space-y-4"
              onSubmit={onSubmit}
              noValidate
            >
              <FieldGroup>
                {/* Name */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="register-name">Họ và tên</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="register-name"
                          type="text"
                          placeholder="Nguyễn Văn A"
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon>
                          <User />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Email */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="register-email">Email</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="register-email"
                          type="email"
                          placeholder="you@example.com"
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
                      <FieldLabel htmlFor="register-password">
                        Mật khẩu
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="register-password"
                          type="password"
                          placeholder="Nhập mật khẩu (≥ 6 ký tự)"
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon>
                          <Lock />
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldDescription>
                        Mật khẩu phải có ít nhất 6 ký tự
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Role */}
                <Controller
                  name="role"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="register-role">
                        Đăng ký với vai trò
                      </FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id="register-role"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Chọn vai trò" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mentee">Mentee</SelectItem>
                          <SelectItem value="mentor">Mentor</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Button */}
                <Button type="submit" className="w-full cursor-pointer">
                  Tạo tài khoản
                </Button>
              </FieldGroup>
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
