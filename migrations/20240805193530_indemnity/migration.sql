-- CreateTable
CREATE TABLE "Indemnity" (
    "id" UUID NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "indemnityPdfUrl" TEXT NOT NULL DEFAULT '',
    "date" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Indemnity_pkey" PRIMARY KEY ("id")
);
