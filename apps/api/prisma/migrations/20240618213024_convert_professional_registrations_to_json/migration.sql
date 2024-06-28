-- AlterTable
ALTER TABLE "job_profile" 
  ALTER COLUMN "professional_registration_requirements" TYPE JSONB USING array_to_json("professional_registration_requirements")::JSONB;

-- Convert existing data
UPDATE "job_profile"
SET "professional_registration_requirements" = (
  SELECT jsonb_agg(jsonb_build_object('text', value))
  FROM jsonb_array_elements_text("job_profile"."professional_registration_requirements") AS value
);