import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedBookingStatus() {
    await prisma.bookingStatus.createMany({
        data: [
            { name: "PENDING" },
            { name: "CONFIRMED" },
            { name: "CANCELLED" }
        ]
    })
}
