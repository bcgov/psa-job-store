/*
  Warnings:

  - You are about to drop the column `all_organizations` on the `job_profile` table. All the data in the column will be lost.

*/
-- Drop current_job_profiles view as it depends on the `all_organizations` column
DROP VIEW current_job_profiles;

-- AlterTable
ALTER TABLE "job_profile" DROP COLUMN "all_organizations";

--recreate the current_job_profiles view
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