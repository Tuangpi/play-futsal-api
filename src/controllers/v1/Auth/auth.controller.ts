import { Request, Response } from 'express'
import { loginUser, registerUser } from '@/services/auth.service';
import { loginUserSchema, registerUserSchema } from '@/validators/auth.schema';
import { signToken, verifyToken } from '@/helpers/jwt';
import { HttpException } from '@/common';
import { jsonResponse } from '@/helpers/jsonResponse';
import { formatZodError } from '@/helpers/formatZodError';

export const register = async (req: Request, res: Response) => {
    const parsedResult = registerUserSchema.safeParse(req.body);

    if (!parsedResult.success) {
        return res.status(400).json(formatZodError(parsedResult.error));
    }

    try {
        await registerUser(parsedResult.data);

        return res.status(201).json(jsonResponse({ success: true, message: "User registered successfully" }))
    } catch (error) {
        if (error instanceof HttpException) {
            return res.status(error.statusCode).json(jsonResponse({ success: false, message: error.message }))
        }
        return res.status(500).json(jsonResponse({ success: false, message: "Something went wrong" }))
    }
};

export const login = async (req: Request, res: Response) => {
    const parsed = loginUserSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json(formatZodError(parsed.error));
    }

    try {
        const user = await loginUser(parsed.data);
        if (user) {
            const accessToken = signToken({ id: user.id, email: user.email, phone: user.phone, role: user.role }, process.env.JWT_SECRET!, '15m');
            const refreshToken = signToken({ id: user.id, email: user.email, phone: user.phone, role: user.role }, process.env.JWT_REFRESH_SECRET!, '7d');

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            return res.status(200).json({ accessToken });
        }
    } catch (error) {
        if (error instanceof HttpException) {
            return res.status(error.statusCode).json(jsonResponse({ success: false, message: error.message }))
        }
        return res.status(500).json(jsonResponse({ success: false, message: "Something went wrong" }))
    }
}

export const refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    try {
        const payload = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET!);
        const newAccessToken = signToken({ id: payload.id, role: payload.role, email: payload.email, phone: payload.phone }, process.env.JWT_SECRET!, '15m');
        res.json({ accessToken: newAccessToken });
    } catch {
        return res.status(403).json(jsonResponse({ success: false, message: "Invalid refresh token" }))
    }
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    return res.status(200).json({ message: "Logged out" });
}
