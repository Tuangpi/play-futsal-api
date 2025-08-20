import prisma from '@/prisma';
import { CourtAddInput } from '@/types/court';

export async function addNewCourt(data: CourtAddInput) {
    await prisma.court.create({ data });

}

export async function getAllCourts() {
    return await prisma.court.findMany({
        orderBy: { createdAt: "desc" },
    })
}
