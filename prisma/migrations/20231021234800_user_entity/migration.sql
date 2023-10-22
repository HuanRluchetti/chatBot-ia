/*
  Warnings:

  - You are about to drop the column `professorId` on the `Classroom` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Professor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `TeacherId` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TeacherId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Classroom" DROP CONSTRAINT "Classroom_professorId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_professorId_fkey";

-- AlterTable
ALTER TABLE "Classroom" DROP COLUMN "professorId",
ADD COLUMN     "TeacherId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "professorId",
ADD COLUMN     "TeacherId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Professor";

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_TeacherId_fkey" FOREIGN KEY ("TeacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_TeacherId_fkey" FOREIGN KEY ("TeacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
