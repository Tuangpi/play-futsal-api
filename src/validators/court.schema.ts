import z from "zod";

export const courtSchema = z.object({
    courtName: z.string().min(1, "Court name is required"),
    location: z.string().min(1, "Location is required"),
    hourlyRate: z
        .number()
        .positive("Rate must be greater than 0")
        .refine((val) => !isNaN(val), { message: "Hourly rate must be a number" }),

});
