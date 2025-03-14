-- Set default values for section significance flags for all job profiles (true by default)
-- This query updates the "total_comp_create_form_misc" JSONB column in the "job_profile" table
UPDATE "job_profile" jp
SET "total_comp_create_form_misc" = 
  -- The '||' operator merges the existing JSONB object with the new JSONB object
  jp."total_comp_create_form_misc" || 
  -- Create a new JSONB object with 5 boolean properties
  jsonb_build_object(
    -- For each property, check if it already exists in the current JSONB
    -- If it exists, keep its current value
    -- If it doesn't exist or is null, set it to 'true'
    
    -- Check/set the 'isAccountabilitiesSectionSignificant' property
    'isAccountabilitiesSectionSignificant', 
      COALESCE((jp."total_comp_create_form_misc"->>'isAccountabilitiesSectionSignificant')::boolean, true),
    
    -- Check/set the 'isEducationSectionSignificant' property
    'isEducationSectionSignificant', 
      COALESCE((jp."total_comp_create_form_misc"->>'isEducationSectionSignificant')::boolean, true),
    
    -- Check/set the 'isRelatedExperienceSectionSignificant' property
    'isRelatedExperienceSectionSignificant', 
      COALESCE((jp."total_comp_create_form_misc"->>'isRelatedExperienceSectionSignificant')::boolean, true),
    
    -- Check/set the 'isProfessionalRegistrationSectionSignificant' property
    'isProfessionalRegistrationSectionSignificant', 
      COALESCE((jp."total_comp_create_form_misc"->>'isProfessionalRegistrationSectionSignificant')::boolean, true),
    
    -- Check/set the 'isSecurityScreeningsSectionSignificant' property
    'isSecurityScreeningsSectionSignificant', 
      COALESCE((jp."total_comp_create_form_misc"->>'isSecurityScreeningsSectionSignificant')::boolean, true)
  );


-- Preview query showing before and after values for above query
-- SELECT 
--   jp.id,
--   -- Before values
--   jp."total_comp_create_form_misc" AS "before",
  
--   -- After values (simulating the update)
--   jp."total_comp_create_form_misc" || 
--   jsonb_build_object(
--     'isAccountabilitiesSectionSignificant', 
--       COALESCE((jp."total_comp_create_form_misc"->>'isAccountabilitiesSectionSignificant')::boolean, true),
--     'isEducationSectionSignificant', 
--       COALESCE((jp."total_comp_create_form_misc"->>'isEducationSectionSignificant')::boolean, true),
--     'isRelatedExperienceSectionSignificant', 
--       COALESCE((jp."total_comp_create_form_misc"->>'isRelatedExperienceSectionSignificant')::boolean, true),
--     'isProfessionalRegistrationSectionSignificant', 
--       COALESCE((jp."total_comp_create_form_misc"->>'isProfessionalRegistrationSectionSignificant')::boolean, true),
--     'isSecurityScreeningsSectionSignificant', 
--       COALESCE((jp."total_comp_create_form_misc"->>'isSecurityScreeningsSectionSignificant')::boolean, true)
--   ) AS "after",
  
--   -- Show which fields will be added or changed
--   (jp."total_comp_create_form_misc"->>'isAccountabilitiesSectionSignificant') IS NULL AS "isAccountabilitiesSectionSignificant_added",
--   (jp."total_comp_create_form_misc"->>'isEducationSectionSignificant') IS NULL AS "isEducationSectionSignificant_added",
--   (jp."total_comp_create_form_misc"->>'isRelatedExperienceSectionSignificant') IS NULL AS "isRelatedExperienceSectionSignificant_added",
--   (jp."total_comp_create_form_misc"->>'isProfessionalRegistrationSectionSignificant') IS NULL AS "isProfessionalRegistrationSectionSignificant_added",
--   (jp."total_comp_create_form_misc"->>'isSecurityScreeningsSectionSignificant') IS NULL AS "isSecurityScreeningsSectionSignificant_added"
  
-- FROM "job_profile" jp
-- -- Optional: Limit to a few records for easier viewing
-- LIMIT 10;

-- Update job profiles with "Administrative Services" job family to set isEducationSectionSignificant to false
-- This query updates the 'total_comp_create_form_misc' JSONB column in the 'job_profile' table
-- but only for job profiles linked to the 'Administrative Services' job family
UPDATE "job_profile" jp
SET "total_comp_create_form_misc" = 
  -- Merge the existing JSONB object with a new object that sets 'isEducationSectionSignificant' to false
  -- This will either add the property if it doesn't exist or override its current value
  jp."total_comp_create_form_misc" || jsonb_build_object('isEducationSectionSignificant', false)
-- Join to the link table to connect job profiles with job families
FROM "job_profile_job_family_link" jpjfl
-- Join to the job family table to filter by job family name
JOIN "job_profile_job_family" jf ON jpjfl."jobFamilyId" = jf."id"
-- Only update job profiles that match these conditions:
WHERE jp."id" = jpjfl."jobProfileId"  -- Match the job profile ID with the link table
  AND jp."version" = jpjfl."jobProfileVersion"  -- Match the job profile version with the link table
  AND jf."name" = 'Administrative Services';  -- Only for the 'Administrative Services' job family


-- Preview query showing before and after values for above query
-- SELECT 
--   jp.id,
--   jp.version,
--   -- Before values
--   jp."total_comp_create_form_misc" AS "before",
  
--   -- After values (simulating the update)
--   jp."total_comp_create_form_misc" || jsonb_build_object('isEducationSectionSignificant', false) AS "after",
  
--   -- Show if the field will be added or changed
--   (jp."total_comp_create_form_misc"->>'isEducationSectionSignificant') IS NULL AS "isEducationSectionSignificant_added",
--   (jp."total_comp_create_form_misc"->>'isEducationSectionSignificant')::boolean AS "current_value"
  
-- FROM "job_profile" jp
-- JOIN "job_profile_job_family_link" jpjfl ON jp."id" = jpjfl."jobProfileId" AND jp."version" = jpjfl."jobProfileVersion"
-- JOIN "job_profile_job_family" jf ON jpjfl."jobFamilyId" = jf."id"
-- WHERE jf."name" = 'Administrative Services';



-- set is_significant to false for education items that have is_readonly: false and is_significant: true
-- in job profiles with the Administrative Services job family:

-- This query updates the "education" JSONB array in the "job_profile" table
-- for job profiles in the 'Administrative Services' job family
UPDATE "job_profile" jp
SET "education" = (
  -- Create a new JSONB array by processing each element of the existing array
  SELECT jsonb_agg(
    CASE
      -- For each item in the array, if it's not readonly AND is marked as significant,
      -- then set its "is_significant" property to "false"
      WHEN item->>'is_readonly' = 'false' AND item->>'is_significant' = 'true' 
      THEN jsonb_set(item, '{is_significant}', 'false')
      -- Otherwise, leave the item unchanged
      ELSE item
    END
  )
  -- Extract each element from the education JSONB array
  FROM jsonb_array_elements(jp."education"::jsonb) AS item
)
-- Join to the link table to connect job profiles with job families
FROM "job_profile_job_family_link" jpjfl
-- Join to the job family table to filter by job family name
JOIN "job_profile_job_family" jf ON jpjfl."jobFamilyId" = jf."id"
-- Only update job profiles that match these conditions:
WHERE jp."id" = jpjfl."jobProfileId"  -- Match the job profile ID with the link table
  AND jp."version" = jpjfl."jobProfileVersion"  -- Match the job profile version with the link table
  AND jf."name" = 'Administrative Services'  -- Only for the 'Administrative Services' job family
  AND jp."education" IS NOT NULL  -- Only update records where education is not null
  -- Only update records that have at least one non-readonly, significant education item
  AND jp."education"::jsonb @> '[{"is_readonly": false, "is_significant": true}]';


-- Preview query showing before and after values for above query
-- SELECT 
--   jp.id,
--   jp.version,
--   -- Before values (current education array)
--   jp."education" AS "before",
  
--   -- After values (simulated update)
--   (
--     SELECT jsonb_agg(
--       CASE
--         WHEN item->>'is_readonly' = 'false' AND item->>'is_significant' = 'true' 
--         THEN jsonb_set(item, '{is_significant}', 'false')
--         ELSE item
--       END
--     )
--     FROM jsonb_array_elements(jp."education"::jsonb) AS item
--   ) AS "after",
  
--   -- Count how many items will be changed
--   (
--     SELECT COUNT(*)
--     FROM jsonb_array_elements(jp."education"::jsonb) AS item
--     WHERE item->>'is_readonly' = 'false' AND item->>'is_significant' = 'true'
--   ) AS "items_changed"
  
-- FROM "job_profile" jp
-- JOIN "job_profile_job_family_link" jpjfl ON jp."id" = jpjfl."jobProfileId" AND jp."version" = jpjfl."jobProfileVersion"
-- JOIN "job_profile_job_family" jf ON jpjfl."jobFamilyId" = jf."id"
-- WHERE jf."name" = 'Administrative Services'
--   AND jp."education" IS NOT NULL
--   AND jp."education"::jsonb @> '[{"is_readonly": false, "is_significant": true}]';



-- set markAllSignificantEdu to false only when it's currently true AND 
-- if any of the individual education items have is_significant set to false (not true).

-- This query updates the "total_comp_create_form_misc" JSONB field in the "job_profile" table
-- specifically setting 'markAllSignificantEdu' to 'false' for job profiles in the 'Administrative Services' job family
UPDATE "job_profile" jp
SET "total_comp_create_form_misc" = jsonb_set(
  -- Ensure we have a valid JSONB object even if total_comp_create_form_misc is NULL
  COALESCE(jp."total_comp_create_form_misc", '{}'::jsonb),
  -- Path to the property we want to set
  '{markAllSignificantEdu}',
  -- New value for the property (false)
  'false'
)
-- Join to the link table to connect job profiles with job families
FROM "job_profile_job_family_link" jpjfl
-- Join to the job family table to filter by job family name
JOIN "job_profile_job_family" jf ON jpjfl."jobFamilyId" = jf."id"
-- Only update job profiles that match these conditions:
WHERE jp."id" = jpjfl."jobProfileId"  -- Match the job profile ID with the link table
  AND jp."version" = jpjfl."jobProfileVersion"  -- Match the job profile version with the link table
  AND jf."name" = 'Administrative Services'  -- Only for the 'Administrative Services' job family
  AND (jp."total_comp_create_form_misc"->>'markAllSignificantEdu')::boolean = true  -- Only where markAllSignificantEdu is currently true
  AND jp."education" IS NOT NULL  -- Only where education is not null
  -- Only where at least one education item is marked as not significant
  AND jp."education"::jsonb @> '[{"is_significant": false}]';



-- Preview query showing before and after values for total_comp_create_form_misc updates
-- SELECT 
--   jp.id,
--   jp.version,
--   -- Before values (current total_comp_create_form_misc)
--   jp."total_comp_create_form_misc" AS "before",
  
--   -- After values (simulated update)
--   jsonb_set(
--     COALESCE(jp."total_comp_create_form_misc", '{}'::jsonb),
--     '{markAllSignificantEdu}',
--     'false'
--   ) AS "after",
  
--   -- Current value of markAllSignificantEdu
--   (jp."total_comp_create_form_misc"->>'markAllSignificantEdu')::boolean AS "current_markAllSignificantEdu",
  
--   -- Count of education items marked as not significant
--   (
--     SELECT COUNT(*)
--     FROM jsonb_array_elements(jp."education"::jsonb) AS item
--     WHERE item->>'is_significant' = 'false'
--   ) AS "non_significant_edu_items"
  
-- FROM "job_profile" jp
-- JOIN "job_profile_job_family_link" jpjfl ON jp."id" = jpjfl."jobProfileId" AND jp."version" = jpjfl."jobProfileVersion"
-- JOIN "job_profile_job_family" jf ON jpjfl."jobFamilyId" = jf."id"
-- WHERE jf."name" = 'Administrative Services'
--   AND (jp."total_comp_create_form_misc"->>'markAllSignificantEdu')::boolean = true
--   AND jp."education" IS NOT NULL
--   AND jp."education"::jsonb @> '[{"is_significant": false}]';
