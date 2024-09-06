/*
  Warnings:

  - You are about to drop the column `reports_to_position_id` on the `position_request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "position_request" ADD COLUMN     "excluded_manager_position" JSONB,
ADD COLUMN     "reports_to_position" JSONB;
