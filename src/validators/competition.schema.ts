import z from "zod";

export const createCompetitionSchema = z.object({
    name: z.string().min(1, "Competition name is required"),
    type: z.enum(["FOOTBALL", "FUTSAL", "BASKETBALL"]), // adjust to your CompetitionType
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
});
