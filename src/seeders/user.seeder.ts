import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function seedUsers() {
    const hashedPassword = await bcrypt.hash("asdf1234", 10);
    await prisma.user.createMany({
        data: [
            { name: 'Alice Player', email: 'alice@example.com', role: 'PLAYER', password: hashedPassword },
            { name: 'Bob Owner', email: 'bob@example.com', role: 'OWNER', password: hashedPassword },
        ]
    })
}
