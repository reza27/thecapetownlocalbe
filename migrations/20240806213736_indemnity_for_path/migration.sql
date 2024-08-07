/*
  Warnings:

  - You are about to drop the `IndFormText` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "IndFormText";

-- CreateTable
CREATE TABLE "IndemnityFormText" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',

    CONSTRAINT "IndemnityFormText_pkey" PRIMARY KEY ("id")
);
