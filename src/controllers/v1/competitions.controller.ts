import { HttpException } from "@/common";
import { cleanupFile } from "@/helpers/cleanupFile";
import { formatZodError } from "@/helpers/formatZodError";
import { jsonResponse } from "@/helpers/jsonResponse";
import { addNewCourt, getAllCourts } from "@/services/court.service";
import { createCompetitionSchema } from "@/validators/competition.schema";
import { Request, Response } from "express";

export const addCompetition = async (req: Request, res: Response) => {
    const parsedResult = createCompetitionSchema.safeParse(req.body);

    if (!parsedResult.success) {
        cleanupFile({ req, uploadFolder: "courts" });
        return res.status(400).json(formatZodError(parsedResult.error));
    }

    if (!req.user) throw new HttpException({ message: "Unauthorized", statusCode: 404 });
    const userId = req.user.id;

    try {
        // await addNewCourt({ location: data.location, name: data.courtName, ownerId: userId, image: data.image });

        return res.status(201).json(jsonResponse({ success: true, message: "Create court successfully" }))
    } catch (error) {
        cleanupFile({ req, uploadFolder: "courts" });
        if (error instanceof HttpException) {
            return res.status(error.statusCode).json(jsonResponse({ success: false, message: error.message }))
        }
        return res.status(500).json(jsonResponse({ success: false, message: "Something went wrong" }))
    }
};

export const getCourts = async (req: Request, res: Response) => {
    const data = await getAllCourts();
    return res.status(201).json(jsonResponse({ success: true, data: data }))
};
