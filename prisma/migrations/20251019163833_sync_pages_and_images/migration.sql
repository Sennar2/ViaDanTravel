/*
  Warnings:

  - A unique constraint covering the columns `[heroImageId]` on the table `Package` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `bullets` on the `Itinerary` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `highlights` on the `Itinerary` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `features` on the `Package` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "bullets",
ADD COLUMN     "bullets" JSONB NOT NULL,
DROP COLUMN "highlights",
ADD COLUMN     "highlights" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "heroImageId" TEXT,
DROP COLUMN "features",
ADD COLUMN     "features" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Package_heroImageId_key" ON "Package"("heroImageId");

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_heroImageId_fkey" FOREIGN KEY ("heroImageId") REFERENCES "NewsImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
