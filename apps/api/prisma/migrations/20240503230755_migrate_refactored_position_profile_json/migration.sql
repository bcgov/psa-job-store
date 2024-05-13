-- Add a new column to store the updated JSON data
ALTER TABLE "position_request" ADD COLUMN profile_json_updated JSONB;

-- Update the new column with the transformed JSON data
UPDATE "position_request"
SET profile_json_updated = CASE
    WHEN profile_json IS NULL THEN NULL
    WHEN profile_json = 'null'::jsonb THEN NULL
    ELSE profile_json
      || jsonb_build_object('title', jsonb_build_object(
           'text', profile_json->'title'->>'value',
           'disabled', (profile_json->'title'->>'disabled')::boolean,
           'isCustom', (profile_json->'title'->>'isCustom')::boolean
         ))
      || jsonb_build_object('overview', jsonb_build_object(
           'text', profile_json->'overview'->>'value',
           'disabled', (profile_json->'overview'->>'disabled')::boolean,
           'isCustom', (profile_json->'overview'->>'isCustom')::boolean
         ))
      || jsonb_build_object('program_overview', jsonb_build_object(
           'text', profile_json->'program_overview'->>'value',
           'disabled', (profile_json->'program_overview'->>'disabled')::boolean,
           'isCustom', (profile_json->'program_overview'->>'isCustom')::boolean
         ))
      || jsonb_build_object('knowledge_skills_abilities', (
           SELECT CASE WHEN jsonb_array_length(profile_json->'knowledge_skills_abilities') > 0
                       THEN jsonb_agg(jsonb_build_object(
                              'text', elem->>'value',
                              'disabled', (elem->>'disabled')::boolean,
                              'isCustom', (elem->>'isCustom')::boolean
                            ))
                       ELSE '[]'::jsonb
                  END
           FROM jsonb_array_elements(profile_json->'knowledge_skills_abilities') AS elem
         ))
      || jsonb_build_object('professional_registration_requirements', (
           SELECT CASE WHEN jsonb_array_length(profile_json->'professional_registration_requirements') > 0
                       THEN jsonb_agg(jsonb_build_object(
                              'text', elem->>'value',
                              'disabled', (elem->>'disabled')::boolean,
                              'isCustom', (elem->>'isCustom')::boolean
                            ))
                       ELSE '[]'::jsonb
                  END
           FROM jsonb_array_elements(profile_json->'professional_registration_requirements') AS elem
         ))
      || jsonb_build_object('willingness_statements', (
           SELECT CASE WHEN jsonb_array_length(profile_json->'willingness_statements') > 0
                       THEN jsonb_agg(jsonb_build_object(
                              'text', elem->>'value',
                              'disabled', (elem->>'disabled')::boolean,
                              'isCustom', (elem->>'isCustom')::boolean
                            ))
                       ELSE '[]'::jsonb
                  END
           FROM jsonb_array_elements(profile_json->'willingness_statements') AS elem
         ))
      || jsonb_build_object('optional_requirements', (
           SELECT CASE WHEN jsonb_array_length(profile_json->'optional_requirements') > 0
                       THEN jsonb_agg(jsonb_build_object(
                              'text', elem->>'value',
                              'disabled', (elem->>'disabled')::boolean,
                              'isCustom', (elem->>'isCustom')::boolean
                            ))
                       ELSE '[]'::jsonb
                  END
           FROM jsonb_array_elements(profile_json->'optional_requirements') AS elem
         ))
      || jsonb_build_object('preferences', (
           SELECT CASE WHEN jsonb_array_length(profile_json->'preferences') > 0
                       THEN jsonb_agg(jsonb_build_object(
                              'text', elem->>'value',
                              'disabled', (elem->>'disabled')::boolean,
                              'isCustom', (elem->>'isCustom')::boolean
                            ))
                       ELSE '[]'::jsonb
                  END
           FROM jsonb_array_elements(profile_json->'preferences') AS elem
         ))
  END;