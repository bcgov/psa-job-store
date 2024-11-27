/*
  Warnings:

  - You are about to drop the column `currentVersion` on the `job_profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number,version]` on the table `job_profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "job_profile" DROP COLUMN "currentVersion",
ADD COLUMN     "current_version" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "job_profile_number_version_key" ON "job_profile"("number", "version");
