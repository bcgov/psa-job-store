-- AlterTable
ALTER TABLE "job_profile" ADD COLUMN     "behavioural_competencies" JSONB;

UPDATE job_profile p
SET behavioural_competencies = sub.competencies
FROM (
    SELECT 
        jpbc.job_profile_id,
        jpbc.job_profile_version,
        jsonb_agg(
            jsonb_build_object(
                'id', bc.id,
                'name', bc.name,
                'description', bc.description,
                'category', bc.category,
                'type', bc.type
            )
        ) AS competencies
    FROM job_profile_behavioural_competency jpbc
    JOIN behavioural_competency bc 
      ON bc.id = jpbc.behavioural_competency_id
    GROUP BY jpbc.job_profile_id, jpbc.job_profile_version
) sub
WHERE p.id = sub.job_profile_id
  AND p.version = sub.job_profile_version;


--recreate the view
DROP VIEW current_job_profiles;
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