import prisma from "@/prisma";

export async function getAllBookingStatus() {
    return await prisma.bookingStatus.findMany({
        orderBy: { createdAt: "desc" },
    })
}

export async function getAllCompetitionStatus() {
    return await prisma.competitionStatus.findMany({
        orderBy: { createdAt: "desc" },
    })
}

export async function getAllCompetitionType() {
    return await prisma.competitionType.findMany({
        orderBy: { createdAt: "desc" },
    })
}

export async function getAllMatchEventType() {
    return await prisma.matchEventType.findMany({
        orderBy: { createdAt: "desc" },
    })
}
