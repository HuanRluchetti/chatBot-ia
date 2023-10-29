/*
  Warnings:

  - You are about to drop the column `curseId` on the `Interaction` table. All the data in the column will be lost.
  - Added the required column `chatId` to the `Interaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_curseId_fkey";

-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "curseId",
ADD COLUMN     "chatId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
