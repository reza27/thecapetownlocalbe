/*
  Warnings:

  - You are about to drop the column `featureImage_extension` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `featureImage_filesize` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `featureImage_height` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `featureImage_id` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `featureImage_width` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `image_extension` on the `Guide` table. All the data in the column will be lost.
  - You are about to drop the column `image_filesize` on the `Guide` table. All the data in the column will be lost.
  - You are about to drop the column `image_height` on the `Guide` table. All the data in the column will be lost.
  - You are about to drop the column `image_id` on the `Guide` table. All the data in the column will be lost.
  - You are about to drop the column `image_width` on the `Guide` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "About" DROP COLUMN "featureImage_extension",
DROP COLUMN "featureImage_filesize",
DROP COLUMN "featureImage_height",
DROP COLUMN "featureImage_id",
DROP COLUMN "featureImage_width";

-- AlterTable
ALTER TABLE "Guide" DROP COLUMN "image_extension",
DROP COLUMN "image_filesize",
DROP COLUMN "image_height",
DROP COLUMN "image_id",
DROP COLUMN "image_width",
ADD COLUMN     "image" JSONB;
