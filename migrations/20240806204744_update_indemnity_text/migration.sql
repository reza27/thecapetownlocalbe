/*
  Warnings:

  - You are about to drop the column `indemnityText` on the `IndemnityText` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IndemnityText" DROP COLUMN "indemnityText",
ADD COLUMN     "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';
