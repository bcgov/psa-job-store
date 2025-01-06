-- some professional registration records didn't have the flags set at all, so set both to false
UPDATE job_profile
SET professional_registration_requirements = (
  SELECT jsonb_agg(
    CASE
      WHEN value->>'is_readonly' IS NULL AND value->>'is_significant' IS NULL THEN
        jsonb_set(
          jsonb_set(value, '{is_readonly}', 'false'),
          '{is_significant}', 'false'
        )
      ELSE
        value
    END
  )
  FROM jsonb_array_elements(professional_registration_requirements)
)
WHERE professional_registration_requirements IS NOT NULL
  AND EXISTS (
    SELECT 1
    FROM jsonb_array_elements(professional_registration_requirements) elem
    WHERE elem->>'is_readonly' IS NULL 
      AND elem->>'is_significant' IS NULL
  );
