-- ensure that step is never greater than max_step_completed
-- check that there no records that fit this criteria first:
-- select * from position_request where step > max_step_completed;
ALTER TABLE position_request
ADD CONSTRAINT check_current_step 
CHECK (step <= max_step_completed);

-- Ensure additional_info is present for steps greater than 1:
-- check that there no records that fit this criteria first:
-- select * from position_request where step > 1 and additional_info is null;
ALTER TABLE position_request
ADD CONSTRAINT check_additional_info
CHECK (
  (step = 0) OR (step = 1) OR 
  (step > 1 AND additional_info IS NOT NULL)
);

-- set 'null' additional_info to actual db null
-- todo: check code for instances where this happens

UPDATE position_request
SET additional_info = NULL
WHERE additional_info = 'null';

-- add missing branch and division to additional_info (likely older records before we asked for this info)

WITH nullify_fields AS (
  SELECT id, 
         CASE 
           WHEN additional_info::text = '"null"' THEN NULL
           ELSE additional_info
         END AS updated_additional_info
  FROM position_request
  WHERE additional_info IS NOT NULL
),
ensure_object AS (
  SELECT 
    id,
    CASE 
      WHEN jsonb_typeof(updated_additional_info) = 'object' THEN updated_additional_info
      ELSE '{}'::jsonb
    END AS additional_info
  FROM nullify_fields
  WHERE updated_additional_info IS NOT NULL
),
missing_fields AS (
  SELECT 
    id,
    additional_info,
    jsonb_set(
      jsonb_set(
        jsonb_set(
          additional_info,
          '{branch}', COALESCE(additional_info->'branch', '""'::jsonb),
          true
        ),
        '{division}', COALESCE(additional_info->'division', '""'::jsonb),
        true
      ),
      '{excluded_mgr_position_number}', COALESCE(additional_info->'excluded_mgr_position_number', '""'::jsonb),
      true
    ) AS updated_additional_info
  FROM ensure_object
),
update_data AS (
  SELECT 
    pr.id,
    pr.additional_info AS original_additional_info,
    COALESCE(mf.updated_additional_info, nf.updated_additional_info) AS updated_additional_info
  FROM position_request pr
  LEFT JOIN missing_fields mf ON pr.id = mf.id
  LEFT JOIN nullify_fields nf ON pr.id = nf.id
  WHERE pr.additional_info IS NOT NULL
    AND (pr.additional_info <> COALESCE(mf.updated_additional_info, nf.updated_additional_info) 
         OR (pr.additional_info IS NOT NULL AND nf.updated_additional_info IS NULL))
)
UPDATE position_request
SET additional_info = ud.updated_additional_info
FROM update_data ud
WHERE position_request.id = ud.id
RETURNING 
  position_request.id,
  ud.original_additional_info AS old_value,
  position_request.additional_info AS new_value;

--  ensure the structure of additional_info or additional_info can be null
-- check that there no records that fit this criteria first:
-- SELECT *
-- FROM position_request
-- WHERE additional_info IS NOT NULL
--   AND (
--     NOT (additional_info ? 'branch') OR
--     NOT (additional_info ? 'division') OR
--     NOT (additional_info ? 'department_id') OR
--     NOT (additional_info ? 'work_location_id') OR
--     NOT (additional_info ? 'work_location_name') OR
--     NOT (additional_info ? 'excluded_mgr_position_number')
--   );

ALTER TABLE position_request
ADD CONSTRAINT check_additional_info_structure
CHECK (
  additional_info IS NULL OR
  (
    additional_info ? 'branch' AND
    additional_info ? 'division' AND
    additional_info ? 'department_id' AND
    additional_info ? 'work_location_id' AND
    additional_info ? 'work_location_name' AND
    additional_info ? 'excluded_mgr_position_number'
  )
);