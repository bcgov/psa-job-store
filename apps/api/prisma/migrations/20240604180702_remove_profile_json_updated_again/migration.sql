/*
  Warnings:

  - You are about to drop the column `profile_json_updated` on the `position_request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "position_request" DROP COLUMN "profile_json_updated";
