/*
  Warnings:

  - You are about to drop the column `title` on the `IndemnityFormText` table. All the data in the column will be lost.
  - You are about to drop the `Test1` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "IndemnityFormText" DROP COLUMN "title";

-- DropTable
DROP TABLE "Test1";
