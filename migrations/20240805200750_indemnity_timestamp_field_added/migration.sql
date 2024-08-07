/*
  Warnings:

  - You are about to drop the column `date` on the `Indemnity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[datetimestamp]` on the table `Indemnity` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Indemnity" DROP COLUMN "date",
ADD COLUMN     "datetimestamp" TIMESTAMP(3) NOT NULL DEFAULT '1970-01-01 00:00:00 +00:00';

-- CreateIndex
CREATE UNIQUE INDEX "Indemnity_datetimestamp_key" ON "Indemnity"("datetimestamp");
