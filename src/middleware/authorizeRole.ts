import { USER_ROLE } from "@/constants/Users";
import { NextFunction, Request, Response } from "express";

export const authorizeRole = (role: USER_ROLE) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user?.role !== role) {
            return res.status(403).json({ message: 'Forbidden: Role not allowed' });
        }
        next();
    };
};
