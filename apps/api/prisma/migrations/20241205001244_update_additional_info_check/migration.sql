-- First update existing records to include excluded_mgr_name
UPDATE position_request
SET additional_info = additional_info || '{"excluded_mgr_name": null}'::jsonb
WHERE additional_info IS NOT NULL 
AND NOT (additional_info ? 'excluded_mgr_name');

-- Drop the existing constraint
ALTER TABLE position_request
DROP CONSTRAINT check_additional_info_structure;

-- Add the new constraint with the additional field
ALTER TABLE position_request
ADD CONSTRAINT check_additional_info_structure
CHECK (
  additional_info IS NULL OR
  (
    additional_info ? 'branch' AND
    additional_info ? 'division' AND
    additional_info ? 'department_id' AND
    additional_info ? 'work_location_id' AND
    additional_info ? 'work_location_name' AND
    additional_info ? 'excluded_mgr_position_number' AND
    additional_info ? 'excluded_mgr_name'
  )
);