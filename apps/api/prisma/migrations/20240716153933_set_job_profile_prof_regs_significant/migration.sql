-- for job profiles that have professional_registration_requirements that are readonly and not significant, set them to significant
-- regression happenned due to a UI bug and created some wrong entries

UPDATE job_profile
    SET professional_registration_requirements = (
      SELECT jsonb_agg(
        CASE
          WHEN (value->>'is_readonly')::boolean = true THEN
            jsonb_set(value, '{is_significant}', 'true')
          ELSE
            value
        END
      )
      FROM jsonb_array_elements(professional_registration_requirements)
    )
    WHERE professional_registration_requirements IS NOT NULL
      AND professional_registration_requirements @> '[{"is_readonly": true}]'
      AND (
        professional_registration_requirements @> '[{"is_significant": false}]'
        OR NOT professional_registration_requirements @> '[{"is_significant": true}]'
      );