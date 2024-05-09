-- Start transaction
BEGIN;

-- Create new enum type with new values
CREATE TYPE "PositionRequestStatus_new" AS ENUM ('DRAFT', 'VERIFICATION', 'COMPLETED', 'REVIEW', 'ACTION_REQUIRED');

-- Add a temporary column with the new enum type
ALTER TABLE "position_request" ADD COLUMN "temp_status" "PositionRequestStatus_new";

-- Migrate values from old to new enum via the temporary column
UPDATE "position_request"
SET "temp_status" = CASE
  WHEN "status" = 'IN_REVIEW' THEN 'VERIFICATION'
  WHEN "status" = 'ESCALATED' THEN 'REVIEW'
  ELSE "status"::text::"PositionRequestStatus_new"
END;

-- Drop the original column
ALTER TABLE "position_request" DROP COLUMN "status";

-- Rename the temporary column to the original name
ALTER TABLE "position_request" RENAME COLUMN "temp_status" TO "status";

-- Rename the old enum type to keep it as a backup temporarily
ALTER TYPE "PositionRequestStatus" RENAME TO "PositionRequestStatus_old";

-- Rename the new enum type to the original name
ALTER TYPE "PositionRequestStatus_new" RENAME TO "PositionRequestStatus";

-- Drop the old enum type
DROP TYPE "PositionRequestStatus_old";

-- Commit transaction
COMMIT;
