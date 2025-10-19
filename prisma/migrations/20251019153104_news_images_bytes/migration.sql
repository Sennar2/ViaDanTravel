/*
  Warnings:

  - You are about to drop the `Itinerary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Package` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Testimonial` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "News" ADD COLUMN     "heroImageId" TEXT;

-- DropTable
DROP TABLE "Itinerary";

-- DropTable
DROP TABLE "Package";

-- DropTable
DROP TABLE "Testimonial";

-- CreateTable
CREATE TABLE "NewsImage" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "bytes" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_heroImageId_fkey" FOREIGN KEY ("heroImageId") REFERENCES "NewsImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
