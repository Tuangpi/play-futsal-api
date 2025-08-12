import { PrismaClient } from '@prisma/client'
import { seedUsers } from './seeders/user.seeder'
import { seedCourts } from './seeders/court.seeder'
// import more seeders...

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding started...')
    await seedUsers()
    await seedCourts()
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
