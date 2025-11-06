/*
  Warnings:

  - Made the column `fusion_id` on table `employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "employee" ALTER COLUMN "fusion_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "position" (
    "positionCode" TEXT NOT NULL,
    "uniqId" TEXT NOT NULL,
    "effectiveStartDate" DATE NOT NULL,
    "effectiveEndDate" DATE NOT NULL,
    "name" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "activeStatus" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "hiringStatus" TEXT NOT NULL,
    "reportsTo" TEXT,
    "caseProfile" TEXT,
    "fusion_id" BIGINT NOT NULL,

    CONSTRAINT "position_pkey" PRIMARY KEY ("positionCode")
);
