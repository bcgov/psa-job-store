WITH mapping AS (
    SELECT '351052' AS old_id, '361052' AS new_id
    UNION ALL SELECT '351103', '361103'
    UNION ALL SELECT '351104', '361104'
    UNION ALL SELECT '351105', '361105'
    UNION ALL SELECT '351501', '361501'
    UNION ALL SELECT '351503', '361503'
    UNION ALL SELECT '351533', '361533'
    UNION ALL SELECT '353103', '363103'
    UNION ALL SELECT '353104', '363104'
    UNION ALL SELECT '353105', '363105'
)
UPDATE job_profile_classification jpc
SET
  classification_id                = cnew.id,
  classification_employee_group_id = cnew.employee_group_id,
  classification_peoplesoft_id     = cnew.peoplesoft_id
FROM mapping
JOIN classification cnew ON cnew.id = mapping.new_id
WHERE jpc.classification_id = mapping.old_id
  AND jpc.classification_employee_group_id = (
    SELECT employee_group_id
    FROM classification
    WHERE id = mapping.old_id
  )
  AND jpc.classification_peoplesoft_id = (
    SELECT peoplesoft_id
    FROM classification
    WHERE id = mapping.old_id
  );

WITH mapping AS (
    SELECT '351052' AS old_id, '361052' AS new_id
    UNION ALL SELECT '351103', '361103'
    UNION ALL SELECT '351104', '361104'
    UNION ALL SELECT '351105', '361105'
    UNION ALL SELECT '351501', '361501'
    UNION ALL SELECT '351503', '361503'
    UNION ALL SELECT '351533', '361533'
    UNION ALL SELECT '353103', '363103'
    UNION ALL SELECT '353104', '363104'
    UNION ALL SELECT '353105', '363105'
)
UPDATE job_profile_reports_to jpr
SET
  classification_id                = cnew.id,
  classification_employee_group_id = cnew.employee_group_id,
  classification_peoplesoft_id     = cnew.peoplesoft_id
FROM mapping
JOIN classification cnew 
  ON cnew.id = mapping.new_id
-- match only rows referencing the old classification:
WHERE jpr.classification_id = mapping.old_id
  AND jpr.classification_employee_group_id = (
      SELECT employee_group_id
      FROM classification
      WHERE id = mapping.old_id
    )
  AND jpr.classification_peoplesoft_id = (
      SELECT peoplesoft_id
      FROM classification
      WHERE id = mapping.old_id
    )
-- and ensure the new classification row doesn't already exist:
  AND NOT EXISTS (
      SELECT 1
      FROM job_profile_reports_to jpr2
      WHERE jpr2.job_profile_id      = jpr.job_profile_id
        AND jpr2.job_profile_version = jpr.job_profile_version
        AND jpr2.classification_id   = cnew.id
        AND jpr2.classification_employee_group_id = cnew.employee_group_id
        AND jpr2.classification_peoplesoft_id     = cnew.peoplesoft_id
    );

-- 2) DELETE any leftover rows that are still referencing the old IDs
--    (i.e. they couldn't be updated because a duplicate row already existed)
WITH mapping AS (
    SELECT '351052' AS old_id
    UNION ALL SELECT '351103'
    UNION ALL SELECT '351104'
    UNION ALL SELECT '351105'
    UNION ALL SELECT '351501'
    UNION ALL SELECT '351503'
    UNION ALL SELECT '351533'
    UNION ALL SELECT '353103'
    UNION ALL SELECT '353104'
    UNION ALL SELECT '353105'
)
DELETE FROM job_profile_reports_to jpr
USING mapping
WHERE jpr.classification_id = mapping.old_id
  AND jpr.classification_employee_group_id = (
      SELECT employee_group_id
      FROM classification
      WHERE id = mapping.old_id
    )
  AND jpr.classification_peoplesoft_id = (
      SELECT peoplesoft_id
      FROM classification
      WHERE id = mapping.old_id
    );