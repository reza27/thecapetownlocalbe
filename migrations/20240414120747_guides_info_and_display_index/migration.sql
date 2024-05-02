-- AlterTable
ALTER TABLE "About" ADD COLUMN     "guidesInfo" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]';
