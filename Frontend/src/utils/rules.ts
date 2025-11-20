import * as z from "zod";

// --- SCHEMAS ---
// These rules was taken from users.middlewaress's registerValidator
export const registerSchema = z.object({
  name: z.string().min(1, "Họ và tên là bắt buộc").trim(),
  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email không hợp lệ"),
  password: z
    .string()
    .min(1, "Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  role: z
    .enum(["mentee", "mentor"], {
      message: "Vui lòng chọn vai trò",
    }),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Email là bắt buộc"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

export const quickBookingSchema = z.object({
  name: z.string().min(1, "Họ và tên là bắt buộc").trim(),
  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email không hợp lệ"),
  datetime: z.string().min(1, "Vui lòng chọn ngày và giờ"),
  goal: z.string().optional(),
});

// --- TYPES ---
export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type QuickBookingSchema = z.infer<typeof quickBookingSchema>;

