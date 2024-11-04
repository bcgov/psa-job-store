-- DropForeignKey
ALTER TABLE "job_profile" DROP CONSTRAINT "job_profile_owner_id_fkey";

-- AddForeignKey
ALTER TABLE "job_profile" ADD CONSTRAINT "job_profile_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
