import { jsonResponse } from "@/helpers/jsonResponse";
import { getAllBookingStatus, getAllCompetitionStatus, getAllCompetitionType, getAllMatchEventType } from "@/services/shared.service";
import { Request, Response } from "express";

export const getBookingStatus = async (req: Request, res: Response) => {
    const data = await getAllBookingStatus();
    return res.status(201).json(jsonResponse({ success: true, data: data }))
};

export const getCompetitionStatus = async (req: Request, res: Response) => {
    const data = await getAllCompetitionStatus();
    return res.status(201).json(jsonResponse({ success: true, data: data }))
};

export const getCompetitionType = async (req: Request, res: Response) => {
    const data = await getAllCompetitionType();
    return res.status(201).json(jsonResponse({ success: true, data: data }))
};

export const getMatchEventType = async (req: Request, res: Response) => {
    const data = await getAllMatchEventType();
    return res.status(201).json(jsonResponse({ success: true, data: data }))
};
