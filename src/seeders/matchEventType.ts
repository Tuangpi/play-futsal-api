import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedMatchEventType() {
    await prisma.matchEventType.createMany({
        data: [
            { name: "GOAL" },
            { name: "ASSIST" },
            { name: "YELLOW_CARD" },
            { name: "RED_CARD" }
        ]
    })
}
