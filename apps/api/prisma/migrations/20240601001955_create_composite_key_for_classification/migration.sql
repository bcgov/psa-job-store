/*
  Warnings:

  - The primary key for the `classification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `job_profile_classification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `job_profile_reports_to` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "job_profile_classification" DROP CONSTRAINT "job_profile_classification_classification_id_fkey";

-- DropForeignKey
ALTER TABLE "job_profile_reports_to" DROP CONSTRAINT "job_profile_reports_to_classification_id_fkey";

-- AlterTable
ALTER TABLE "classification" DROP CONSTRAINT "classification_pkey",
ADD CONSTRAINT "classification_pkey" PRIMARY KEY ("id", "employee_group_id", "peoplesoft_id");

-- AlterTable
ALTER TABLE "job_profile_classification" DROP CONSTRAINT "job_profile_classification_pkey",
ADD COLUMN     "classification_employee_group_id" TEXT NOT NULL DEFAULT '-1',
ADD COLUMN     "classification_peoplesoft_id" TEXT NOT NULL DEFAULT '-1',
ADD CONSTRAINT "job_profile_classification_pkey" PRIMARY KEY ("job_profile_id", "classification_id", "classification_employee_group_id", "classification_peoplesoft_id");

UPDATE job_profile_classification
  SET
    classification_employee_group_id = employee_group_id,
    classification_peoplesoft_id = peoplesoft_id
  FROM
    classification
  WHERE
    classification_id = id;

-- AlterTable
ALTER TABLE "job_profile_reports_to" DROP CONSTRAINT "job_profile_reports_to_pkey",
ADD COLUMN     "classification_employee_group_id" TEXT NOT NULL DEFAULT '-1',
ADD COLUMN     "classification_peoplesoft_id" TEXT NOT NULL DEFAULT '-1',
ADD CONSTRAINT "job_profile_reports_to_pkey" PRIMARY KEY ("job_profile_id", "classification_id", "classification_employee_group_id", "classification_peoplesoft_id");

UPDATE job_profile_reports_to
  SET
    classification_employee_group_id = employee_group_id,
    classification_peoplesoft_id = peoplesoft_id
  FROM
    classification
  WHERE
    classification_id = id;

-- AlterTable
ALTER TABLE "position_request" ADD COLUMN     "classification_employee_group_id" TEXT,
ADD COLUMN     "classification_peoplesoft_id" TEXT;

-- AddForeignKey
ALTER TABLE "job_profile_classification" ADD CONSTRAINT "job_profile_classification_classification_id_classificatio_fkey" FOREIGN KEY ("classification_id", "classification_employee_group_id", "classification_peoplesoft_id") REFERENCES "classification"("id", "employee_group_id", "peoplesoft_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_reports_to" ADD CONSTRAINT "job_profile_reports_to_classification_id_classification_em_fkey" FOREIGN KEY ("classification_id", "classification_employee_group_id", "classification_peoplesoft_id") REFERENCES "classification"("id", "employee_group_id", "peoplesoft_id") ON DELETE RESTRICT ON UPDATE CASCADE;
