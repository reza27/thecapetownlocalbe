-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "passwordResetToken" TEXT,
    "passwordResetIssuedAt" TIMESTAMP(3),
    "passwordResetRedeemedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "featureImage_filesize" INTEGER,
    "featureImage_extension" TEXT,
    "featureImage_width" INTEGER,
    "featureImage_height" INTEGER,
    "featureImage_id" TEXT,
    "tag" UUID,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityItemHeading" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ActivityItemHeading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityItem" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',

    CONSTRAINT "ActivityItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "altText" TEXT NOT NULL DEFAULT '',
    "image_filesize" INTEGER,
    "image_extension" TEXT,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_id" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "About" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "featureImage_filesize" INTEGER,
    "featureImage_extension" TEXT,
    "featureImage_width" INTEGER,
    "featureImage_height" INTEGER,
    "featureImage_id" TEXT,
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guide" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "altText" TEXT NOT NULL DEFAULT '',
    "image_filesize" INTEGER,
    "image_extension" TEXT,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_id" TEXT,
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Activity_activityItemHeading" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_ActivityItem_images" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_ActivityItemHeading_activityItems" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_About_guides" (
    "A" INTEGER NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_tag_key" ON "Activity"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "_Activity_activityItemHeading_AB_unique" ON "_Activity_activityItemHeading"("A", "B");

-- CreateIndex
CREATE INDEX "_Activity_activityItemHeading_B_index" ON "_Activity_activityItemHeading"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityItem_images_AB_unique" ON "_ActivityItem_images"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityItem_images_B_index" ON "_ActivityItem_images"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityItemHeading_activityItems_AB_unique" ON "_ActivityItemHeading_activityItems"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityItemHeading_activityItems_B_index" ON "_ActivityItemHeading_activityItems"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_About_guides_AB_unique" ON "_About_guides"("A", "B");

-- CreateIndex
CREATE INDEX "_About_guides_B_index" ON "_About_guides"("B");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_tag_fkey" FOREIGN KEY ("tag") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Activity_activityItemHeading" ADD CONSTRAINT "_Activity_activityItemHeading_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Activity_activityItemHeading" ADD CONSTRAINT "_Activity_activityItemHeading_B_fkey" FOREIGN KEY ("B") REFERENCES "ActivityItemHeading"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityItem_images" ADD CONSTRAINT "_ActivityItem_images_A_fkey" FOREIGN KEY ("A") REFERENCES "ActivityItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityItem_images" ADD CONSTRAINT "_ActivityItem_images_B_fkey" FOREIGN KEY ("B") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityItemHeading_activityItems" ADD CONSTRAINT "_ActivityItemHeading_activityItems_A_fkey" FOREIGN KEY ("A") REFERENCES "ActivityItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityItemHeading_activityItems" ADD CONSTRAINT "_ActivityItemHeading_activityItems_B_fkey" FOREIGN KEY ("B") REFERENCES "ActivityItemHeading"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_About_guides" ADD CONSTRAINT "_About_guides_A_fkey" FOREIGN KEY ("A") REFERENCES "About"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_About_guides" ADD CONSTRAINT "_About_guides_B_fkey" FOREIGN KEY ("B") REFERENCES "Guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;
