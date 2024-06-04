-- Drop the profile_json column
ALTER TABLE "position_request"
DROP COLUMN "profile_json";

-- Rename the profile_json_updated column to profile_json
ALTER TABLE "position_request"
RENAME COLUMN "profile_json_updated" TO "profile_json";


-- Drop the foreign key constraint for additional_info_work_location_id
ALTER TABLE "position_request"
DROP CONSTRAINT "position_request_additional_info_work_location_id_fkey";

-- Drop the foreign key constraint for additional_info_department_id
ALTER TABLE "position_request"
DROP CONSTRAINT "position_request_additional_info_department_id_fkey";

-- Drop the additional_info_work_location_id column
ALTER TABLE "position_request"
DROP COLUMN "additional_info_work_location_id";

-- Drop the additional_info_department_id column
ALTER TABLE "position_request"
DROP COLUMN "additional_info_department_id";

-- Drop the additional_info_excluded_mgr_position_number column
ALTER TABLE "position_request"
DROP COLUMN "additional_info_excluded_mgr_position_number";

-- Drop the additional_info_comments column
ALTER TABLE "position_request"
DROP COLUMN "additional_info_comments";