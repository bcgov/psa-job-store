-- DropIndex
DROP INDEX "job_profile_number_key";

-- AlterTable
ALTER TABLE "job_profile" ADD COLUMN     "currentVersion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "valid_from" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "valid_to" TIMESTAMP(3),
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "position_request" ADD COLUMN     "parent_job_profile_version" INTEGER;
