import { HttpException } from "@/common";
import { cleanupFile } from "@/helpers/cleanupFile";
import { formatZodError } from "@/helpers/formatZodError";
import { jsonResponse } from "@/helpers/jsonResponse";
import { addNewCourt } from "@/services/court.service";
import { courtSchema } from "@/validators/court.schema";
import { Request, Response } from "express";

export const addCourt = async (req: Request, res: Response) => {
    const body = { ...req.body, hourlyRate: Number(req.body.hourlyRate), };
    const parsedResult = courtSchema.safeParse(body);

    const imageUrl = req.file
        ? `/public/uploads/courts/${req.file.filename}`
        : null;

    if (!parsedResult.success) {
        cleanupFile({ req, uploadFolder: "courts" });
        return res.status(400).json(formatZodError(parsedResult.error));
    }

    const data = { ...parsedResult.data, image: imageUrl };
    if (!req.user) throw new HttpException({ message: "Unauthorized", statusCode: 404 });
    const userId = req.user.id;

    try {
        await addNewCourt({ location: data.location, name: data.courtName, ownerId: userId });

        return res.status(201).json(jsonResponse({ success: true, message: "Create court successfully" }))
    } catch (error) {
        cleanupFile({ req, uploadFolder: "courts" });
        if (error instanceof HttpException) {
            return res.status(error.statusCode).json(jsonResponse({ success: false, message: error.message }))
        }
        return res.status(500).json(jsonResponse({ success: false, message: "Something went wrong" }))
    }
};
