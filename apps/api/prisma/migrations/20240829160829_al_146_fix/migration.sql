/*
  Warnings:

  - You are about to drop the column `classification_code` on the `position_request` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `position_request` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `position_request` table. All the data in the column will be lost.
  - Made the column `user_id` on table `position_request` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "position_request" DROP COLUMN "classification_code",
DROP COLUMN "email",
DROP COLUMN "user_name",
ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "position_request" ADD CONSTRAINT "position_request_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position_request" ADD CONSTRAINT "position_request_classification_id_classification_employee_fkey" FOREIGN KEY ("classification_id", "classification_employee_group_id", "classification_peoplesoft_id") REFERENCES "classification"("id", "employee_group_id", "peoplesoft_id") ON DELETE SET NULL ON UPDATE CASCADE;
