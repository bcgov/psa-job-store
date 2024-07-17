/*
  Warnings:

  - A unique constraint covering the columns `[number,version]` on the table `job_profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "position_request" ADD COLUMN     "orgchart_svg" TEXT;
