import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedCompetitionType() {
    await prisma.competitionType.createMany({
        data: [
            { name: "LEAGUE" },
            { name: "TOURNAMENT" }
        ]
    })
}
