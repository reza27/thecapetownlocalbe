/*
  Warnings:

  - A unique constraint covering the columns `[display_index]` on the table `Guide` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Guide" ADD COLUMN     "display_index" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
-- CREATE UNIQUE INDEX "Guide_display_index_key" ON "Guide"("display_index");
