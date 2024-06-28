/*
  Warnings:

  - A unique constraint covering the columns `[requirement_id,classification_id,classification_employee_group_id,job_family_id,organization_id]` on the table `professional_registration_requirement` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "professional_registration_requirement_requirement_id_classi_key";

-- AlterTable
ALTER TABLE "professional_registration_requirement" ADD COLUMN     "organization_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "professional_registration_requirement_requirement_id_classi_key" ON "professional_registration_requirement"("requirement_id", "classification_id", "classification_employee_group_id", "job_family_id", "organization_id");

-- AddForeignKey
ALTER TABLE "professional_registration_requirement" ADD CONSTRAINT "professional_registration_requirement_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
