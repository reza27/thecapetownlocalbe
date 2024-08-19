/*
  Warnings:

  - The `answer` column on the `Faq` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Faq" DROP COLUMN "answer",
ADD COLUMN     "answer" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]';
