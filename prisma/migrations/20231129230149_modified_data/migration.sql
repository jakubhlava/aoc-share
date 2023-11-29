/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `fileType` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `day` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_eventId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("year");

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "fileType",
ADD COLUMN     "day" INTEGER NOT NULL,
ALTER COLUMN "content" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "preferredLanguage" TEXT NOT NULL DEFAULT 'python';

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("year") ON DELETE RESTRICT ON UPDATE CASCADE;
