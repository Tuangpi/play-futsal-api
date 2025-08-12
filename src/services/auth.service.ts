import { HttpException } from '@/common';
import prisma from '@/prisma';
import { LoginUserInput, RegisterUserInput } from '@/types/user';
import bcrypt from 'bcrypt'

export async function registerUser(data: RegisterUserInput) {
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                data.email ? { email: data.email } : undefined,
                data.phone ? { phone: data.phone } : undefined,
            ].filter(Boolean) as any
        }
    });

    if (existingUser) {
        throw new HttpException({ message: "User with this email or phone already exists", statusCode: 409 });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            name: "hi",
            email: data.email,
            phone: data.phone,
            password: hashedPassword,
            role: data.role,
        }
    });

    return user;
}

export async function loginUser(data: LoginUserInput) {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                data.email ? { email: data.email } : undefined,
                data.phone ? { phone: data.phone } : undefined,
            ].filter(Boolean) as any
        }
    });

    if (!user) {
        throw new HttpException({ message: "User not found", statusCode: 404 });
    }

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) {
        throw new HttpException({ message: "Invalid credentials", statusCode: 401 });
    }

    return user;
}
