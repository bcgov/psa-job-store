/*
  Warnings:

  - The primary key for the `grade` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "grade" DROP CONSTRAINT "grade_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "grade_pkey" PRIMARY KEY ("id");
