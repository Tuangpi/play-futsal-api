import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedCompetitionStatus() {
    await prisma.competitionStatus.createMany({
        data: [
            { name: "UPCOMING" },
            { name: "ACTIVE" },
            { name: "COMPLETED" }
        ]
    })
}
