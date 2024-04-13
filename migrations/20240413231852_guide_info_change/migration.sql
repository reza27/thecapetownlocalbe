/*
  Warnings:

  - You are about to drop the column `guidesInfo` on the `About` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "About" DROP COLUMN "guidesInfo",
ADD COLUMN     "guidesInfo1" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]';
