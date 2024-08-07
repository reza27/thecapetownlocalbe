-- CreateTable
CREATE TABLE "IndemnityMessage" (
    "id" INTEGER NOT NULL,
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',

    CONSTRAINT "IndemnityMessage_pkey" PRIMARY KEY ("id")
);
