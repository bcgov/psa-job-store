-- CreateTable
CREATE TABLE "security_screenings_base" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "security_screenings_base_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security_screening" (
    "id" SERIAL NOT NULL,
    "screening_id" INTEGER NOT NULL,
    "job_family_id" INTEGER,
    "organization_id" TEXT,

    CONSTRAINT "security_screening_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "security_screenings_base_text_key" ON "security_screenings_base"("text");

-- CreateIndex
CREATE UNIQUE INDEX "security_screening_screening_id_job_family_id_organization__key" ON "security_screening"("screening_id", "job_family_id", "organization_id");

-- AddForeignKey
ALTER TABLE "security_screening" ADD CONSTRAINT "security_screening_screening_id_fkey" FOREIGN KEY ("screening_id") REFERENCES "security_screenings_base"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_screening" ADD CONSTRAINT "security_screening_job_family_id_fkey" FOREIGN KEY ("job_family_id") REFERENCES "job_profile_job_family"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_screening" ADD CONSTRAINT "security_screening_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
