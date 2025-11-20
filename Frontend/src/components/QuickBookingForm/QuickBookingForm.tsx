import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Calendar, Target } from "lucide-react";
import { toast } from "react-toastify";

import { quickBookingSchema, QuickBookingSchema } from "@/utils/rules";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export default function QuickBookingForm() {
  const form = useForm<QuickBookingSchema>({
    resolver: zodResolver(quickBookingSchema),
    defaultValues: {
      name: "",
      email: "",
      datetime: "",
      goal: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    // TODO: Implement actual booking API call
    toast.success(`Đặt lịch thành công! Chúng tôi sẽ gửi xác nhận đến ${data.email}`);
    form.reset();
  });

  return (
    <div className="relative">
      <div className="absolute -inset-x-6 -top-6 -z-10 h-24 rounded-3xl bg-gradient-to-r from-sky-200/60 to-indigo-200/60 blur-2xl" />
      <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-2xl backdrop-blur">
        <div className="h-12 bg-gradient-to-r from-sky-500 to-indigo-500" />
        <div className="p-6">
          <div className="mb-4">
            <div className="text-lg font-bold text-slate-900">
              Đăng ký phiên tư vấn nhanh
            </div>
            <div className="text-sm text-slate-600">
              Miễn phí huỷ trước 12h
            </div>
          </div>

          <form
            id="quick-booking-form"
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
                    <FieldLabel htmlFor="quick-booking-name">
                      Họ và tên
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id="quick-booking-name"
                        type="text"
                        placeholder="VD: Nguyễn Văn A"
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
                    <FieldLabel htmlFor="quick-booking-email">
                      Email
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id="quick-booking-email"
                        type="email"
                        placeholder="name@email.com"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon>
                        <Mail />
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>
                      Dùng email để nhận xác nhận & lịch hẹn.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* DateTime */}
              <Controller
                name="datetime"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="quick-booking-datetime">
                      Ngày & giờ mong muốn
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id="quick-booking-datetime"
                        type="date"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon>
                        <Calendar />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Goal (Optional) */}
              <Controller
                name="goal"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="quick-booking-goal">
                      Mục tiêu buổi tư vấn (tuỳ chọn)
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="quick-booking-goal"
                        placeholder="VD: Review CV, định hướng học Data, luyện phỏng vấn React..."
                        rows={4}
                        className="resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <Target className="size-4" />
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
                Xác nhận đặt lịch
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <svg viewBox="0 0 20 20" className="h-4 w-4 fill-sky-600">
                  <path d="M10 1.67a8.33 8.33 0 1 0 0 16.66A8.33 8.33 0 0 0 10 1.67Zm.83 12.5H9.17v-1.66h1.66v1.66Zm0-3.34H9.17V5.83h1.66v5Z" />
                </svg>
                Thời lượng mặc định: 30 phút/buổi. Có thể thay đổi sau khi ghép
                lịch.
              </div>
            </FieldGroup>
          </form>
        </div>
      </div>
    </div>
  );
}

