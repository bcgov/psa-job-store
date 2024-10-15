-- Update existing null owner_id values
UPDATE job_profile
SET owner_id = (SELECT id FROM "user" WHERE name = 'SYSTEM USER')
WHERE owner_id IS NULL;

-- Alter the column to be NOT NULL
ALTER TABLE job_profile
ALTER COLUMN owner_id SET NOT NULL;