/*
  Warnings:

  - You are about to drop the `classification_department` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "classification_department" DROP CONSTRAINT "classification_department_classification_id_fkey";

-- DropForeignKey
ALTER TABLE "classification_department" DROP CONSTRAINT "classification_department_department_id_fkey";

-- DropTable
DROP TABLE "classification_department";
