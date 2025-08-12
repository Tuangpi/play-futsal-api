import { USER_ROLE } from "@/constants/Users";

export interface RegisterUserInput {
    email?: string;
    phone?: string;
    password: string;
    role: USER_ROLE;
}

export interface LoginUserInput {
    email?: string;
    phone?: string;
    password: string;
}
