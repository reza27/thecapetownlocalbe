/*
  Warnings:

  - You are about to drop the `IndemnityText` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "IndemnityText";

-- CreateTable
CREATE TABLE "IndFormText" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',

    CONSTRAINT "IndFormText_pkey" PRIMARY KEY ("id")
);
