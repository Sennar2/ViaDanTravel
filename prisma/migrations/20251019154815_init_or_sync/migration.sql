/*
  Warnings:

  - A unique constraint covering the columns `[heroImageId]` on the table `News` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Itinerary" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "nights" INTEGER NOT NULL,
    "priceFromGBP" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "bullets" TEXT[],
    "highlights" TEXT[],
    "heroEmoji" TEXT,
    "region" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "nights" INTEGER,
    "priceFromGBP" INTEGER,
    "region" TEXT,
    "features" TEXT[],
    "body" TEXT,
    "heroEmoji" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" SERIAL NOT NULL,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Itinerary_slug_key" ON "Itinerary"("slug");

-- CreateIndex
CREATE INDEX "Itinerary_region_idx" ON "Itinerary"("region");

-- CreateIndex
CREATE INDEX "Itinerary_createdAt_idx" ON "Itinerary"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Package_slug_key" ON "Package"("slug");

-- CreateIndex
CREATE INDEX "Package_isFeatured_createdAt_idx" ON "Package"("isFeatured", "createdAt");

-- CreateIndex
CREATE INDEX "Package_region_idx" ON "Package"("region");

-- CreateIndex
CREATE UNIQUE INDEX "News_heroImageId_key" ON "News"("heroImageId");
