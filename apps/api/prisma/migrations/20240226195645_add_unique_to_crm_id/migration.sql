/*
  Warnings:

  - A unique constraint covering the columns `[crm_id]` on the table `position_request` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "position_request_crm_id_key" ON "position_request"("crm_id");
