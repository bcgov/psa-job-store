/*
  Warnings:

  - Added the required column `updated_by_id` to the `job_profile` table without a default value. This is not possible if the table is not empty.

*/
-- Add the new columns to the job_profile table
ALTER TABLE "job_profile" 
ADD COLUMN "updated_by_id" UUID,
ADD COLUMN "published_by_id" UUID;

-- Initially set updated_by_id to the value of owner_id where it is currently NULL
UPDATE job_profile
SET updated_by_id = owner_id
WHERE updated_by_id IS NULL;

-- Add foreign key constraints
ALTER TABLE "job_profile" ADD CONSTRAINT "job_profile_updated_by_id_fkey" 
FOREIGN KEY ("updated_by_id") REFERENCES "user"("id") 
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "job_profile" ADD CONSTRAINT "job_profile_published_by_id_fkey" 
FOREIGN KEY ("published_by_id") REFERENCES "user"("id") 
ON DELETE SET NULL ON UPDATE CASCADE;
