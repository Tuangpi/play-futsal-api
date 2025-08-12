import { USER_ROLES } from "@/constants/Users";
import { z } from "zod";

export const registerUserSchema = z.object({
    email: z.string().email("Invalid email").or(z.literal("")).optional(),
    phone: z.string().min(6, "Phone is too short").or(z.literal("")).optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(USER_ROLES),
}).refine((data) => (data.email?.length ?? 0) > 0 || (data.phone?.length ?? 0) > 0, {
    message: "Either email or phone is required",
    path: ["email"],
});

export const loginUserSchema = z.object({
    email: z.string().email("Invalid email").or(z.literal("")).optional(),
    phone: z.string().min(6, "Phone is too short").or(z.literal("")).optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => (data.email?.length ?? 0) > 0 || (data.phone?.length ?? 0) > 0, {
    message: "Either email or phone is required",
    path: ["email"],
});
