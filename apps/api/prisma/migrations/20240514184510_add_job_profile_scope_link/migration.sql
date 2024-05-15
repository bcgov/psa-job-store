/*
  Warnings:

  - You are about to drop the column `scope_id` on the `job_profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "job_profile" DROP CONSTRAINT "job_profile_scope_id_fkey";

-- CreateTable
CREATE TABLE "job_profile_scope_link" (
    "id" SERIAL NOT NULL,
    "job_profile_id" INTEGER NOT NULL,
    "scope_id" INTEGER NOT NULL,

    CONSTRAINT "job_profile_scope_link_pkey" PRIMARY KEY ("id")
);

-- Migrate existing scope data to the new job_profile_scope_link table
INSERT INTO "job_profile_scope_link" ("job_profile_id", "scope_id")
SELECT "id", "scope_id"
FROM "job_profile"
WHERE "scope_id" IS NOT NULL;

-- AlterTable
ALTER TABLE "job_profile" DROP COLUMN "scope_id";

-- AddForeignKey
ALTER TABLE "job_profile_scope_link" ADD CONSTRAINT "job_profile_scope_link_job_profile_id_fkey" FOREIGN KEY ("job_profile_id") REFERENCES "job_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_scope_link" ADD CONSTRAINT "job_profile_scope_link_scope_id_fkey" FOREIGN KEY ("scope_id") REFERENCES "job_profile_scope"("id") ON DELETE RESTRICT ON UPDATE CASCADE;