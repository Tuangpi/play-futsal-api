import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function seedUsers() {
    await prisma.user.createMany({
        data: [
            { name: 'Alice Player', email: 'alice@example.com', role: 'PLAYER', password: "asdf1234" },
            { name: 'Bob Owner', email: 'bob@example.com', role: 'OWNER', password: "asdf1234" },
        ]
    })
}
