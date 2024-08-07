/*
  Warnings:

  - You are about to drop the `IndemnityMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "IndemnityMessage";

-- CreateTable
CREATE TABLE "IndemnityText" (
    "id" INTEGER NOT NULL,
    "indemnityText" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',

    CONSTRAINT "IndemnityText_pkey" PRIMARY KEY ("id")
);
