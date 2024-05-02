/*
  Warnings:

  - The `guidesInfo` column on the `About` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "About" DROP COLUMN "guidesInfo"
