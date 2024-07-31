-- Add or update is_significant flag for each item in security_screenings array
UPDATE "job_profile"
SET "security_screenings" = (
  SELECT jsonb_agg(
    CASE
      -- If is_readonly is true, set is_significant to true regardless of its current value
      WHEN (item->>'is_readonly')::boolean IS TRUE THEN 
        item || '{"is_significant": true}'::jsonb
      -- If is_significant is explicitly false and is_readonly is not true, keep it false
      WHEN (item->>'is_significant')::boolean IS FALSE THEN 
        item
      -- Otherwise, set or update is_significant to true
      ELSE 
        item || '{"is_significant": true}'::jsonb
    END
  )
  FROM jsonb_array_elements("security_screenings") AS item
)
WHERE 
  -- Ensure security_screenings is not null
  "security_screenings" IS NOT NULL 
  AND 
  -- Ensure security_screenings is not an empty array
  jsonb_array_length("security_screenings") > 0;