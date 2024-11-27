/*
  Warnings:

  - You are about to drop the `job_profile_history` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "job_profile" ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "published_at" TIMESTAMP(3);

-- DropTable
DROP TABLE "job_profile_history";
