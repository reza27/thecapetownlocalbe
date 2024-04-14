/*
  Warnings:

  - You are about to drop the column `guidesInfo1` on the `About` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "About" DROP COLUMN "guidesInfo1",
ADD COLUMN     "guidesInfo" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]';
