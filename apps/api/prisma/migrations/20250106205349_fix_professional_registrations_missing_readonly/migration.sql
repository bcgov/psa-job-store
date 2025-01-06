-- some professional registrations had is_significant flag, but no is_readonly flag, so set is_readonly to same value as is_significant

UPDATE job_profile
SET professional_registration_requirements = (
  SELECT jsonb_agg(
    CASE
      WHEN value->>'is_readonly' IS NULL AND value->>'is_significant' IS NOT NULL THEN
        jsonb_set(value, '{is_readonly}', to_jsonb((value->>'is_significant')::boolean))
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
    AND elem->>'is_significant' IS NOT NULL
  );