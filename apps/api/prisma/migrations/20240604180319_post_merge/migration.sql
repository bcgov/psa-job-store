-- DropForeignKey
ALTER TABLE "job_profile" DROP CONSTRAINT "job_profile_updated_by_id_fkey";

-- AlterTable
ALTER TABLE "position_request" ADD COLUMN     "profile_json_updated" JSONB;

-- AddForeignKey
ALTER TABLE "job_profile" ADD CONSTRAINT "job_profile_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
