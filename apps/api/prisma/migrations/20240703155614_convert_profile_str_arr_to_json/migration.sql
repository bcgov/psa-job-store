-- AlterTable
ALTER TABLE "job_profile" 
  ALTER COLUMN "preferences" TYPE JSONB USING array_to_json("preferences")::JSONB;

-- Convert existing data
UPDATE "job_profile"
SET "preferences" = (
  SELECT jsonb_agg(jsonb_build_object('text', value))
  FROM jsonb_array_elements_text("job_profile"."preferences") AS value
);

-- AlterTable
ALTER TABLE "job_profile" 
  ALTER COLUMN "knowledge_skills_abilities" TYPE JSONB USING array_to_json("knowledge_skills_abilities")::JSONB;

-- Convert existing data
UPDATE "job_profile"
SET "knowledge_skills_abilities" = (
  SELECT jsonb_agg(jsonb_build_object('text', value))
  FROM jsonb_array_elements_text("job_profile"."knowledge_skills_abilities") AS value
);

-- AlterTable
ALTER TABLE "job_profile" 
  ALTER COLUMN "willingness_statements" TYPE JSONB USING array_to_json("willingness_statements")::JSONB;

-- Convert existing data
UPDATE "job_profile"
SET "willingness_statements" = (
  SELECT jsonb_agg(jsonb_build_object('text', value))
  FROM jsonb_array_elements_text("job_profile"."willingness_statements") AS value
);