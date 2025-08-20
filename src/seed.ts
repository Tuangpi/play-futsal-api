import { PrismaClient } from '@prisma/client'
import { seedUsers } from './seeders/user.seeder'
import { seedCourts } from './seeders/court.seeder'
import { seedCompetitionType } from './seeders/competitionType.seeder'
import { seedCompetitionStatus } from './seeders/competitionStatus.seeder'
import { seedBookingStatus } from './seeders/bookingStatus'
import { seedMatchEventType } from './seeders/matchEventType'
// import more seeders...

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding started...')
    await seedCompetitionType()
    await seedCompetitionStatus()
    await seedBookingStatus()
    await seedMatchEventType()
    // await seedUsers()
    // await seedCourts()
    // await otherSeeder()
    console.log('✅ Seeding finished.')
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
