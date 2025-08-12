declare global {
    namespace Express {
        interface Request {
            user: JwtPayload | null;
        }
    }
}

export interface JwtPayload {
    id: string;
    role: USER_ROLE;
    email: string | null;
    phone: string | null;
}
