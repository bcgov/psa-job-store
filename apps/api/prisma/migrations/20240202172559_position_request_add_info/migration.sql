-- AlterTable
ALTER TABLE "position_request" ADD COLUMN     "additional_info_comments" TEXT,
ADD COLUMN     "additional_info_department_id" TEXT,
ADD COLUMN     "additional_info_excluded_mgr_position_number" TEXT,
ADD COLUMN     "additional_info_work_location_id" TEXT;

-- AddForeignKey
ALTER TABLE "position_request" ADD CONSTRAINT "position_request_additional_info_work_location_id_fkey" FOREIGN KEY ("additional_info_work_location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position_request" ADD CONSTRAINT "position_request_additional_info_department_id_fkey" FOREIGN KEY ("additional_info_department_id") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
