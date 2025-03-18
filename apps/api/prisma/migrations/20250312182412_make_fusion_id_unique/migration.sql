/*
  Warnings:

  - A unique constraint covering the columns `[fusion_id]` on the table `classification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fusion_id]` on the table `department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fusion_id]` on the table `location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fusion_id]` on the table `organization` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "classification_fusion_id_key" ON "classification"("fusion_id");

-- CreateIndex
CREATE UNIQUE INDEX "department_fusion_id_key" ON "department"("fusion_id");

-- CreateIndex
CREATE UNIQUE INDEX "location_fusion_id_key" ON "location"("fusion_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_fusion_id_key" ON "organization"("fusion_id");
