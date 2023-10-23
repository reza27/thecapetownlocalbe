/*
  Warnings:

  - You are about to drop the column `featureImage_extension` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `featureImage_filesize` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `featureImage_height` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `featureImage_id` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `featureImage_width` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Guide` table. All the data in the column will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_tag_fkey";

-- DropIndex
DROP INDEX "Activity_tag_key";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "featureImage_extension",
DROP COLUMN "featureImage_filesize",
DROP COLUMN "featureImage_height",
DROP COLUMN "featureImage_id",
DROP COLUMN "featureImage_width",
DROP COLUMN "tag";

-- AlterTable
ALTER TABLE "ActivityItem" ADD COLUMN     "anchor" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "duration" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "price" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "tab" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Guide" DROP COLUMN "content",
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "ServiceItem" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "price" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ServiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Home" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "Home_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeTour" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "homeTour" UUID,

    CONSTRAINT "HomeTour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" UUID NOT NULL,
    "question" TEXT NOT NULL DEFAULT '',
    "answer" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Activity_faq" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_ServiceItem_images" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_Service_serviceItems" (
    "A" INTEGER NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_Home_homeTours" (
    "A" INTEGER NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_About_affiliations" (
    "A" INTEGER NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE INDEX "HomeTour_homeTour_idx" ON "HomeTour"("homeTour");

-- CreateIndex
CREATE UNIQUE INDEX "_Activity_faq_AB_unique" ON "_Activity_faq"("A", "B");

-- CreateIndex
CREATE INDEX "_Activity_faq_B_index" ON "_Activity_faq"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ServiceItem_images_AB_unique" ON "_ServiceItem_images"("A", "B");

-- CreateIndex
CREATE INDEX "_ServiceItem_images_B_index" ON "_ServiceItem_images"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Service_serviceItems_AB_unique" ON "_Service_serviceItems"("A", "B");

-- CreateIndex
CREATE INDEX "_Service_serviceItems_B_index" ON "_Service_serviceItems"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Home_homeTours_AB_unique" ON "_Home_homeTours"("A", "B");

-- CreateIndex
CREATE INDEX "_Home_homeTours_B_index" ON "_Home_homeTours"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_About_affiliations_AB_unique" ON "_About_affiliations"("A", "B");

-- CreateIndex
CREATE INDEX "_About_affiliations_B_index" ON "_About_affiliations"("B");

-- AddForeignKey
ALTER TABLE "HomeTour" ADD CONSTRAINT "HomeTour_homeTour_fkey" FOREIGN KEY ("homeTour") REFERENCES "ActivityItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Activity_faq" ADD CONSTRAINT "_Activity_faq_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Activity_faq" ADD CONSTRAINT "_Activity_faq_B_fkey" FOREIGN KEY ("B") REFERENCES "Faq"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceItem_images" ADD CONSTRAINT "_ServiceItem_images_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceItem_images" ADD CONSTRAINT "_ServiceItem_images_B_fkey" FOREIGN KEY ("B") REFERENCES "ServiceItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Service_serviceItems" ADD CONSTRAINT "_Service_serviceItems_A_fkey" FOREIGN KEY ("A") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Service_serviceItems" ADD CONSTRAINT "_Service_serviceItems_B_fkey" FOREIGN KEY ("B") REFERENCES "ServiceItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Home_homeTours" ADD CONSTRAINT "_Home_homeTours_A_fkey" FOREIGN KEY ("A") REFERENCES "Home"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Home_homeTours" ADD CONSTRAINT "_Home_homeTours_B_fkey" FOREIGN KEY ("B") REFERENCES "HomeTour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_About_affiliations" ADD CONSTRAINT "_About_affiliations_A_fkey" FOREIGN KEY ("A") REFERENCES "About"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_About_affiliations" ADD CONSTRAINT "_About_affiliations_B_fkey" FOREIGN KEY ("B") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
