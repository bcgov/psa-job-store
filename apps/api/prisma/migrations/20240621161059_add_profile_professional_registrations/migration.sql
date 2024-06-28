-- CreateTable
CREATE TABLE "professional_registration_requirement_base" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "professional_registration_requirement_base_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professional_registration_requirement" (
    "id" SERIAL NOT NULL,
    "requirement_id" INTEGER NOT NULL,
    "classification_id" TEXT,
    "classification_employee_group_id" TEXT,
    "job_family_id" INTEGER,

    CONSTRAINT "professional_registration_requirement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "professional_registration_requirement_base_text_key" ON "professional_registration_requirement_base"("text");

-- CreateIndex
CREATE UNIQUE INDEX "professional_registration_requirement_requirement_id_classi_key" ON "professional_registration_requirement"("requirement_id", "classification_id", "classification_employee_group_id", "job_family_id");

-- AddForeignKey
ALTER TABLE "professional_registration_requirement" ADD CONSTRAINT "professional_registration_requirement_requirement_id_fkey" FOREIGN KEY ("requirement_id") REFERENCES "professional_registration_requirement_base"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professional_registration_requirement" ADD CONSTRAINT "professional_registration_requirement_job_family_id_fkey" FOREIGN KEY ("job_family_id") REFERENCES "job_profile_job_family"("id") ON DELETE SET NULL ON UPDATE CASCADE;


