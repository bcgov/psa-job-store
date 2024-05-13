-- AlterTable
ALTER TABLE "position_request" ADD COLUMN     "additional_info" JSONB;

-- Migrate data from old columns to the new JSON column
UPDATE "position_request"
SET "additional_info" = jsonb_build_object(
  'work_location_id', "additional_info_work_location_id",
  'department_id', "additional_info_department_id",
  'excluded_mgr_position_number', "additional_info_excluded_mgr_position_number", 
  'comments', "additional_info_comments"
);