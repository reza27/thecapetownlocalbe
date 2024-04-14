-- AlterTable
ALTER TABLE "About" ADD COLUMN     "guidesInfo" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]';

-- AlterTable
ALTER TABLE "Guide" ADD COLUMN     "display_index" INTEGER NOT NULL DEFAULT 0;
