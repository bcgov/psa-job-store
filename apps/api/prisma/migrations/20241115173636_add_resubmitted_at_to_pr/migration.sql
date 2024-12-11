-- AlterTable
ALTER TABLE "position_request" ADD COLUMN "resubmitted_at" TIMESTAMP(3);

-- Update existing records
UPDATE "position_request" SET "resubmitted_at" = "updated_at";