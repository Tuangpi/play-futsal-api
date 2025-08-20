/*
  Warnings:

  - You are about to drop the column `status` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Competition` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Competition` table. All the data in the column will be lost.
  - You are about to drop the column `eventType` on the `MatchEvent` table. All the data in the column will be lost.
  - Added the required column `bookingStatusId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `competitionStatusId` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `competitionTypeId` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventTypeId` to the `MatchEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "status",
ADD COLUMN     "bookingStatusId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Competition" DROP COLUMN "status",
DROP COLUMN "type",
ADD COLUMN     "competitionStatusId" TEXT NOT NULL,
ADD COLUMN     "competitionTypeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MatchEvent" DROP COLUMN "eventType",
ADD COLUMN     "eventTypeId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "BookingStatus";

-- DropEnum
DROP TYPE "CompetitionStatus";

-- DropEnum
DROP TYPE "CompetitionType";

-- DropEnum
DROP TYPE "MatchEventType";

-- CreateTable
CREATE TABLE "CompetitionType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompetitionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompetitionStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchEventType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "points" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchEventType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompetitionType_name_key" ON "CompetitionType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CompetitionStatus_name_key" ON "CompetitionStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BookingStatus_name_key" ON "BookingStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MatchEventType_name_key" ON "MatchEventType"("name");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_bookingStatusId_fkey" FOREIGN KEY ("bookingStatusId") REFERENCES "BookingStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_competitionTypeId_fkey" FOREIGN KEY ("competitionTypeId") REFERENCES "CompetitionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_competitionStatusId_fkey" FOREIGN KEY ("competitionStatusId") REFERENCES "CompetitionStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchEvent" ADD CONSTRAINT "MatchEvent_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "MatchEventType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
