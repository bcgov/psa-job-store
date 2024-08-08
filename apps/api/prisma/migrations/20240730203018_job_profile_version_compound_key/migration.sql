/*
  Warnings:

  - The primary key for the `job_profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `current_version` on the `job_profile` table. All the data in the column will be lost.
  - The primary key for the `job_profile_behavioural_competency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `job_profile_classification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `job_profile_job_family_link` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `job_profile_organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `job_profile_reports_to` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `job_profile_stream_link` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[job_profile_id,job_profile_version]` on the table `job_profile_context` will be added. If there are existing duplicate values, this will fail.

*/


--Move context to job_profile table

-- DropForeignKey
ALTER TABLE "job_profile_context" DROP CONSTRAINT IF EXISTS "job_profile_context_job_profile_id_fkey";

-- AlterTable
ALTER TABLE "job_profile" ADD COLUMN     "context" TEXT;

-- DropTable
DROP TABLE "job_profile_context";

--make compound key

-- Drop Primary Keys
ALTER TABLE "job_profile_behavioural_competency" DROP CONSTRAINT "job_profile_behavioural_competency_pkey";
ALTER TABLE "job_profile_classification" DROP CONSTRAINT IF EXISTS "job_profile_classification_pkey";
ALTER TABLE "job_profile_job_family_link" DROP CONSTRAINT IF EXISTS "job_profile_job_family_link_pkey";
ALTER TABLE "job_profile_organization" DROP CONSTRAINT IF EXISTS "job_profile_organization_pkey";
ALTER TABLE "job_profile_reports_to" DROP CONSTRAINT IF EXISTS "job_profile_reports_to_pkey";
ALTER TABLE "job_profile_stream_link" DROP CONSTRAINT IF EXISTS "job_profile_stream_link_pkey";


-- DropForeignKey
ALTER TABLE "job_profile_behavioural_competency" DROP CONSTRAINT IF EXISTS "job_profile_behavioural_competency_job_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "job_profile_classification" DROP CONSTRAINT IF EXISTS "job_profile_classification_job_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "job_profile_job_family_link" DROP CONSTRAINT IF EXISTS "job_profile_job_family_link_jobProfileId_fkey";

-- DropForeignKey
ALTER TABLE "job_profile_organization" DROP CONSTRAINT IF EXISTS "job_profile_organization_job_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "job_profile_reports_to" DROP CONSTRAINT IF EXISTS "job_profile_reports_to_job_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "job_profile_scope_link" DROP CONSTRAINT IF EXISTS "job_profile_scope_link_job_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "job_profile_stream_link" DROP CONSTRAINT IF EXISTS "job_profile_stream_link_jobProfileId_fkey";

-- DropForeignKey
ALTER TABLE "position_request" DROP CONSTRAINT IF EXISTS "position_request_parent_job_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "saved_job_profile" DROP CONSTRAINT IF EXISTS "saved_job_profile_jobProfileId_fkey";

ALTER TABLE "job_profile" DROP CONSTRAINT IF EXISTS "job_profile_pkey",
DROP COLUMN "current_version",
ALTER COLUMN "id" DROP DEFAULT;
-- DropIndex
DROP INDEX IF EXISTS "job_profile_number_version_key";

-- DropIndex

-- Add version column to tables and update with values from referenced records in job_profile table
ALTER TABLE "job_profile_behavioural_competency" ADD COLUMN IF NOT EXISTS "job_profile_version" INTEGER;
UPDATE "job_profile_behavioural_competency" AS jbc
SET "job_profile_version" = jp."version"
FROM "job_profile" AS jp
WHERE jbc."job_profile_id" = jp."id";
ALTER TABLE "job_profile_behavioural_competency" ALTER COLUMN "job_profile_version"  SET NOT NULL;


ALTER TABLE "job_profile_classification" ADD COLUMN IF NOT EXISTS "job_profile_version" INTEGER;
UPDATE "job_profile_classification" AS jpc
SET "job_profile_version" = jp."version"
FROM "job_profile" AS jp
WHERE jpc."job_profile_id" = jp."id";
ALTER TABLE "job_profile_classification" ALTER COLUMN "job_profile_version" SET NOT NULL;



ALTER TABLE "job_profile_job_family_link" ADD COLUMN IF NOT EXISTS "jobProfileVersion" INTEGER;
UPDATE "job_profile_job_family_link" AS jpfl
SET "jobProfileVersion" = jp."version"
FROM "job_profile" AS jp
WHERE jpfl."jobProfileId" = jp."id";
ALTER TABLE "job_profile_job_family_link" ALTER COLUMN "jobProfileVersion" SET NOT NULL;


ALTER TABLE "job_profile_organization" ADD COLUMN IF NOT EXISTS "job_profile_version" INTEGER;
UPDATE "job_profile_organization" AS jpo
SET "job_profile_version" = jp."version"
FROM "job_profile" AS jp
WHERE jpo."job_profile_id" = jp."id";
ALTER TABLE "job_profile_organization" ALTER COLUMN "job_profile_version" SET NOT NULL;


ALTER TABLE "job_profile_reports_to" ADD COLUMN IF NOT EXISTS "job_profile_version" INTEGER;
UPDATE "job_profile_reports_to" AS jprt
SET "job_profile_version" = jp."version"
FROM "job_profile" AS jp
WHERE jprt."job_profile_id" = jp."id";
ALTER TABLE "job_profile_reports_to" ALTER COLUMN "job_profile_version" SET NOT NULL;


ALTER TABLE "job_profile_scope_link" ADD COLUMN IF NOT EXISTS "job_profile_version" INTEGER;
UPDATE "job_profile_scope_link" AS jpsl
SET "job_profile_version" = jp."version"
FROM "job_profile" AS jp
WHERE jpsl."job_profile_id" = jp."id";
ALTER TABLE "job_profile_scope_link" ALTER COLUMN "job_profile_version" SET NOT NULL;


ALTER TABLE "job_profile_stream_link" ADD COLUMN IF NOT EXISTS "jobProfileVersion" INTEGER;
UPDATE "job_profile_stream_link" AS jpsl
SET "jobProfileVersion" = jp."version"
FROM "job_profile" AS jp
WHERE jpsl."jobProfileId" = jp."id";
ALTER TABLE "job_profile_stream_link" ALTER COLUMN "jobProfileVersion" SET NOT NULL;


ALTER TABLE "position_request" ADD COLUMN IF NOT EXISTS "parent_job_profile_version" INTEGER;
UPDATE "position_request" AS pr
SET "parent_job_profile_version" = jp."version"
FROM "job_profile" AS jp
WHERE pr."parent_job_profile_id" = jp."id";

-- Update job_profile_id to the record with the lowest version and same number
UPDATE "job_profile_behavioural_competency" AS jbc
SET "job_profile_id" = jp_low."id"
FROM "job_profile" AS jp
JOIN (
    SELECT "number", MIN("id") AS id
    FROM "job_profile"
    WHERE "version" = 1
    GROUP BY "number"
) AS jp_low
ON jp."number" = jp_low."number"
WHERE jbc."job_profile_id" = jp."id";

UPDATE "job_profile_classification" AS jpc
SET "job_profile_id" = jp_low."id"
FROM "job_profile" AS jp
JOIN (
    SELECT "number", MIN("id") AS id
    FROM "job_profile"
    WHERE "version" = 1
    GROUP BY "number"
) AS jp_low
ON jp."number" = jp_low."number"
WHERE jpc."job_profile_id" = jp."id";

UPDATE "job_profile_job_family_link" AS jpfl
SET "jobProfileId" = jp_low."id"
FROM "job_profile" AS jp
JOIN (
    SELECT "number", MIN("id") AS id
    FROM "job_profile"
    WHERE "version" = 1
    GROUP BY "number"
) AS jp_low
ON jp."number" = jp_low."number"
WHERE jpfl."jobProfileId" = jp."id";

UPDATE "job_profile_organization" AS jpo
SET "job_profile_id" = jp_low."id"
FROM "job_profile" AS jp
JOIN (
    SELECT "number", MIN("id") AS id
    FROM "job_profile"
    WHERE "version" = 1
    GROUP BY "number"
) AS jp_low
ON jp."number" = jp_low."number"
WHERE jpo."job_profile_id" = jp."id";

UPDATE "job_profile_reports_to" AS jprt
SET "job_profile_id" = jp_low."id"
FROM "job_profile" AS jp
JOIN (
    SELECT "number", MIN("id") AS id
    FROM "job_profile"
    WHERE "version" = 1
    GROUP BY "number"
) AS jp_low
ON jp."number" = jp_low."number"
WHERE jprt."job_profile_id" = jp."id";

UPDATE "job_profile_scope_link" AS jpsl
SET "job_profile_id" = jp_low."id"
FROM "job_profile" AS jp
JOIN (
    SELECT "number", MIN("id") AS id
    FROM "job_profile"
    WHERE "version" = 1
    GROUP BY "number"
) AS jp_low
ON jp."number" = jp_low."number"
WHERE jpsl."job_profile_id" = jp."id";

UPDATE "job_profile_stream_link" AS jpsl
SET "jobProfileId" = jp_low."id"
FROM "job_profile" AS jp
JOIN (
    SELECT "number", MIN("id") AS id
    FROM "job_profile"
    WHERE "version" = 1
    GROUP BY "number"
) AS jp_low
ON jp."number" = jp_low."number"
WHERE jpsl."jobProfileId" = jp."id";

-- UPDATE "position_request" AS pr
-- SET "parent_job_profile_id" = jp_low."id",
-- FROM "job_profile" AS jp
-- JOIN (
--     SELECT "number", MIN("id") AS id
--     FROM "job_profile"
--     WHERE "version" = 1
--     GROUP BY "number"
-- ) AS jp_low
-- ON jp."number" = jp_low."number"
-- WHERE pr."parent_job_profile_id" = jp."id";

UPDATE "saved_job_profile" AS sjp
SET "jobProfileId" = jp_low."id"
FROM "job_profile" AS jp
JOIN (
    SELECT "number", MIN("id") AS id
    FROM "job_profile"
    WHERE "version" = 1
    GROUP BY "number"
) AS jp_low
ON jp."number" = jp_low."number"
WHERE sjp."jobProfileId" = jp."id";


-- update job_profiles to have the same id where version = 1 and they have the same job number

UPDATE "job_profile" AS jp1
SET "id" = jp_low."id"
FROM "job_profile" AS jp
JOIN (
    SELECT "number", MIN("id") AS id
    FROM "job_profile"
    WHERE "version" = 1
    GROUP BY "number"
) AS jp_low
ON jp."number" = jp_low."number"
WHERE jp1."number" = jp_low."number";


-- -- Continue with your original migration steps

ALTER TABLE "job_profile"  ADD CONSTRAINT "job_profile_pkey" PRIMARY KEY ("id", "version");
DROP SEQUENCE "job_profile_id_seq";

-- -- Add constraints and primary keys back

ALTER TABLE "job_profile_behavioural_competency"ADD CONSTRAINT "job_profile_behavioural_competency_pkey" PRIMARY KEY ("behavioural_competency_id", "job_profile_id", "job_profile_version");



ALTER TABLE "job_profile_classification" ADD CONSTRAINT "job_profile_classification_pkey" PRIMARY KEY ("job_profile_id", "job_profile_version", "classification_id", "classification_employee_group_id", "classification_peoplesoft_id");


ALTER TABLE "job_profile_job_family_link" ADD CONSTRAINT "job_profile_job_family_link_pkey" PRIMARY KEY ("jobProfileId", "jobProfileVersion", "jobFamilyId");


ALTER TABLE "job_profile_organization" ADD CONSTRAINT "job_profile_organization_pkey" PRIMARY KEY ("organization_id", "job_profile_id", "job_profile_version");


ALTER TABLE "job_profile_reports_to" ADD CONSTRAINT "job_profile_reports_to_pkey" PRIMARY KEY ("job_profile_id", "job_profile_version", "classification_id", "classification_employee_group_id", "classification_peoplesoft_id");


ALTER TABLE "job_profile_stream_link" ADD CONSTRAINT "job_profile_stream_link_pkey" PRIMARY KEY ("jobProfileId", "jobProfileVersion", "streamId");

-- -- Add foreign key constraints back
ALTER TABLE "position_request" ADD CONSTRAINT "position_request_parent_job_profile_id_parent_job_profile__fkey" FOREIGN KEY ("parent_job_profile_id", "parent_job_profile_version") REFERENCES "job_profile"("id", "version") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "job_profile_scope_link" ADD CONSTRAINT "job_profile_scope_link_job_profile_id_job_profile_version_fkey" FOREIGN KEY ("job_profile_id", "job_profile_version") REFERENCES "job_profile"("id", "version") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "job_profile_job_family_link" ADD CONSTRAINT "job_profile_job_family_link_jobProfileId_jobProfileVersion_fkey" FOREIGN KEY ("jobProfileId", "jobProfileVersion") REFERENCES "job_profile"("id", "version") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "job_profile_stream_link" ADD CONSTRAINT "job_profile_stream_link_jobProfileId_jobProfileVersion_fkey" FOREIGN KEY ("jobProfileId", "jobProfileVersion") REFERENCES "job_profile"("id", "version") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "job_profile_behavioural_competency" ADD CONSTRAINT "job_profile_behavioural_competency_job_profile_id_job_prof_fkey" FOREIGN KEY ("job_profile_id", "job_profile_version") REFERENCES "job_profile"("id", "version") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "job_profile_classification" ADD CONSTRAINT "job_profile_classification_job_profile_id_job_profile_vers_fkey" FOREIGN KEY ("job_profile_id", "job_profile_version") REFERENCES "job_profile"("id", "version") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "job_profile_organization" ADD CONSTRAINT "job_profile_organization_job_profile_id_job_profile_versio_fkey" FOREIGN KEY ("job_profile_id", "job_profile_version") REFERENCES "job_profile"("id", "version") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "job_profile_reports_to" ADD CONSTRAINT "job_profile_reports_to_job_profile_id_job_profile_version_fkey" FOREIGN KEY ("job_profile_id", "job_profile_version") REFERENCES "job_profile"("id", "version") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Create View

CREATE VIEW current_job_profiles AS
SELECT jp.*
FROM job_profile jp
INNER JOIN (
    SELECT id, MAX(version) AS max_version
    FROM job_profile
    GROUP BY id
) AS current_table
ON jp.id = current_table.id
AND jp.version = current_table.max_version;
