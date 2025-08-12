import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function seedCourts() {
    const owner = await prisma.user.findFirst({ where: { role: 'OWNER' } })
    if (!owner) return

    await prisma.court.create({
        data: {
            name: 'Downtown Arena',
            location: 'Main Street',
            ownerId: owner.id,
        }
    })
}
