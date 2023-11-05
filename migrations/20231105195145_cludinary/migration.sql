/*
  Warnings:

  - You are about to drop the column `image_extension` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `image_filesize` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `image_height` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `image_id` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `image_width` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "image_extension",
DROP COLUMN "image_filesize",
DROP COLUMN "image_height",
DROP COLUMN "image_id",
DROP COLUMN "image_width",
ADD COLUMN     "image" JSONB;
