import * as yup from "yup";

// --- SCHEMAS ---
// These rules was taken from users.middlewaress's registerValidator
export const registerSchema = yup.object({
  name: yup.string().required("Name is required").trim(),
  email: yup
    .string()
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  role: yup
    .string()
    .required("Role is required")
    .oneOf(["mentee", "mentor"], "Role must be mentee or mentor"),
});


// --- TYPES ---
export type RegisterSchema = Required<yup.InferType<typeof registerSchema>>;

