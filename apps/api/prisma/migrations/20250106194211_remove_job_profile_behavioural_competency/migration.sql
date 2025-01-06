/*
  Warnings:

  - You are about to drop the `job_profile_behavioural_competency` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "job_profile_behavioural_competency" DROP CONSTRAINT "job_profile_behavioural_competency_behavioural_competency__fkey";

-- DropForeignKey
ALTER TABLE "job_profile_behavioural_competency" DROP CONSTRAINT "job_profile_behavioural_competency_job_profile_id_job_prof_fkey";

-- DropTable
DROP TABLE "job_profile_behavioural_competency";
