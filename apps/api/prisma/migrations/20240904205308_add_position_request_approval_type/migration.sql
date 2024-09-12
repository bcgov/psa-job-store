-- CreateEnum
CREATE TYPE "ApprovalType" AS ENUM ('AUTOMATIC', 'VERIFIED');

-- AlterTable
ALTER TABLE "position_request" 
ADD COLUMN "approval_type" "ApprovalType" DEFAULT NULL,
ADD COLUMN "time_to_approve" INTEGER DEFAULT NULL,
ALTER COLUMN "approved_at" DROP NOT NULL,
ALTER COLUMN "approved_at" DROP DEFAULT;

-- Update existing records with calculated values
UPDATE "position_request"
SET 
  time_to_approve = CASE 
    WHEN approved_at IS NOT NULL THEN EXTRACT(EPOCH FROM (approved_at - submitted_at))::INTEGER
    ELSE NULL
  END;

-- Update approval_type separately
UPDATE "position_request"
SET approval_type = 'VERIFIED'
WHERE approved_at IS NOT NULL AND EXTRACT(EPOCH FROM (approved_at - submitted_at)) >= 10;

UPDATE "position_request"
SET approval_type = 'AUTOMATIC'
WHERE approved_at IS NOT NULL AND EXTRACT(EPOCH FROM (approved_at - submitted_at)) < 10;

-- Set time_to_approve to NULL for AUTOMATIC approvals
UPDATE "position_request"
SET time_to_approve = NULL
WHERE approval_type = 'AUTOMATIC';

-- Set approved_at to null for requests where status is not "COMPLETED"
UPDATE "position_request"
SET 
  approved_at = NULL,
  time_to_approve = NULL,
  approval_type = NULL
WHERE status != 'COMPLETED';