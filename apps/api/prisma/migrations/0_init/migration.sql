-- CreateEnum
CREATE TYPE "PositionRequestStatus" AS ENUM ('DRAFT', 'IN_REVIEW', 'COMPLETED', 'ESCALATED', 'ACTION_REQUIRED');

-- CreateEnum
CREATE TYPE "behavioural_competency_type" AS ENUM ('EXCLUDED', 'INCLUDED', 'INDIGENOUS');

-- CreateEnum
CREATE TYPE "behavioural_competency_category" AS ENUM ('ACHIEVING_BUSINESS_RESULTS', 'INTERPERSONAL_RELATIONSHIPS', 'LEADING_PEOPLE', 'PERSONAL_EFFECTIVENESS');

-- CreateEnum
CREATE TYPE "JobProfileState" AS ENUM ('DRAFT', 'PUBLISHED', 'UNPUBLISHED');

-- CreateEnum
CREATE TYPE "job_profile_type" AS ENUM ('CORPORATE', 'MINISTRY');

-- CreateTable
CREATE TABLE "position_request" (
    "id" SERIAL NOT NULL,
    "step" INTEGER NOT NULL,
    "reports_to_position_id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "parent_job_profile_id" INTEGER,
    "profile_json" JSONB,
    "orgchart_json" JSONB,
    "user_id" UUID,
    "classificationAssignedTo" UUID,
    "title" TEXT,
    "position_number" INTEGER,
    "classification_id" TEXT,
    "classification_code" TEXT,
    "user_name" TEXT,
    "email" TEXT,
    "submission_id" TEXT,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "PositionRequestStatus",
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "position_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "username" TEXT,
    "roles" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "behavioural_competency" (
    "id" SERIAL NOT NULL,
    "type" "behavioural_competency_type" NOT NULL,
    "category" "behavioural_competency_category" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "behavioural_competency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_profile" (
    "id" SERIAL NOT NULL,
    "all_organizations" BOOLEAN NOT NULL DEFAULT true,
    "all_reports_to" BOOLEAN NOT NULL DEFAULT false,
    "role_id" INTEGER,
    "role_type_id" INTEGER,
    "scope_id" INTEGER,
    "state" "JobProfileState" NOT NULL DEFAULT 'DRAFT',
    "type" "job_profile_type" NOT NULL,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "owner_id" UUID,
    "program_overview" TEXT,
    "review_required" BOOLEAN DEFAULT false,
    "title" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "overview" TEXT NOT NULL,
    "accountabilities" JSONB,
    "education" JSONB,
    "job_experience" JSONB,
    "professional_registration_requirements" TEXT[],
    "preferences" TEXT[],
    "knowledge_skills_abilities" TEXT[],
    "willingness_statements" TEXT[],
    "security_screenings" JSONB,
    "total_comp_create_form_misc" JSONB,

    CONSTRAINT "job_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_profile_job_family_link" (
    "jobProfileId" INTEGER NOT NULL,
    "jobFamilyId" INTEGER NOT NULL,

    CONSTRAINT "job_profile_job_family_link_pkey" PRIMARY KEY ("jobProfileId","jobFamilyId")
);

-- CreateTable
CREATE TABLE "job_profile_stream_link" (
    "jobProfileId" INTEGER NOT NULL,
    "streamId" INTEGER NOT NULL,

    CONSTRAINT "job_profile_stream_link_pkey" PRIMARY KEY ("jobProfileId","streamId")
);

-- CreateTable
CREATE TABLE "job_profile_behavioural_competency" (
    "behavioural_competency_id" INTEGER NOT NULL,
    "job_profile_id" INTEGER NOT NULL,

    CONSTRAINT "job_profile_behavioural_competency_pkey" PRIMARY KEY ("behavioural_competency_id","job_profile_id")
);

-- CreateTable
CREATE TABLE "job_profile_classification" (
    "classification_id" TEXT NOT NULL,
    "job_profile_id" INTEGER NOT NULL,

    CONSTRAINT "job_profile_classification_pkey" PRIMARY KEY ("classification_id","job_profile_id")
);

-- CreateTable
CREATE TABLE "job_profile_minimum_requirements" (
    "id" SERIAL NOT NULL,
    "requirement" TEXT NOT NULL,
    "grade" TEXT NOT NULL,

    CONSTRAINT "job_profile_minimum_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_profile_organization" (
    "organization_id" TEXT NOT NULL,
    "job_profile_id" INTEGER NOT NULL,

    CONSTRAINT "job_profile_organization_pkey" PRIMARY KEY ("organization_id","job_profile_id")
);

-- CreateTable
CREATE TABLE "job_profile_context" (
    "id" SERIAL NOT NULL,
    "job_profile_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "job_profile_context_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_profile_job_family" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "job_profile_job_family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_profile_reports_to" (
    "classification_id" TEXT NOT NULL,
    "job_profile_id" INTEGER NOT NULL,

    CONSTRAINT "job_profile_reports_to_pkey" PRIMARY KEY ("classification_id","job_profile_id")
);

-- CreateTable
CREATE TABLE "job_profile_scope" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "job_profile_scope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_profile_role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "job_profile_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_profile_role_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "job_profile_role_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_profile_stream" (
    "id" SERIAL NOT NULL,
    "job_family_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "job_profile_stream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_profile_history" (
    "id" SERIAL NOT NULL,
    "job_profile_id" INTEGER NOT NULL,
    "json" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" INTEGER NOT NULL,

    CONSTRAINT "job_profile_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "author_id" UUID NOT NULL,
    "record_id" INTEGER NOT NULL,
    "record_type" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "employee_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classification" (
    "id" TEXT NOT NULL,
    "peoplesoft_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "employee_group_id" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "effective_status" TEXT NOT NULL,
    "effective_date" DATE NOT NULL,

    CONSTRAINT "classification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department" (
    "id" TEXT NOT NULL,
    "location_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "peoplesoft_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "effective_status" TEXT NOT NULL,
    "effective_date" DATE NOT NULL,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL,
    "peoplesoft_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "effective_status" TEXT NOT NULL,
    "effective_date" DATE NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "peoplesoft_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "effective_status" TEXT NOT NULL,
    "effective_date" DATE NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "job_profile_number_key" ON "job_profile"("number");

-- CreateIndex
CREATE UNIQUE INDEX "job_profile_context_job_profile_id_key" ON "job_profile_context"("job_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_peoplesoft_id_key" ON "organization"("peoplesoft_id");

-- AddForeignKey
ALTER TABLE "position_request" ADD CONSTRAINT "position_request_parent_job_profile_id_fkey" FOREIGN KEY ("parent_job_profile_id") REFERENCES "job_profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position_request" ADD CONSTRAINT "position_request_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile" ADD CONSTRAINT "job_profile_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "job_profile_role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile" ADD CONSTRAINT "job_profile_role_type_id_fkey" FOREIGN KEY ("role_type_id") REFERENCES "job_profile_role_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile" ADD CONSTRAINT "job_profile_scope_id_fkey" FOREIGN KEY ("scope_id") REFERENCES "job_profile_scope"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile" ADD CONSTRAINT "job_profile_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_job_family_link" ADD CONSTRAINT "job_profile_job_family_link_jobProfileId_fkey" FOREIGN KEY ("jobProfileId") REFERENCES "job_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_job_family_link" ADD CONSTRAINT "job_profile_job_family_link_jobFamilyId_fkey" FOREIGN KEY ("jobFamilyId") REFERENCES "job_profile_job_family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_stream_link" ADD CONSTRAINT "job_profile_stream_link_jobProfileId_fkey" FOREIGN KEY ("jobProfileId") REFERENCES "job_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_stream_link" ADD CONSTRAINT "job_profile_stream_link_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "job_profile_stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_behavioural_competency" ADD CONSTRAINT "job_profile_behavioural_competency_behavioural_competency__fkey" FOREIGN KEY ("behavioural_competency_id") REFERENCES "behavioural_competency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_behavioural_competency" ADD CONSTRAINT "job_profile_behavioural_competency_job_profile_id_fkey" FOREIGN KEY ("job_profile_id") REFERENCES "job_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_classification" ADD CONSTRAINT "job_profile_classification_classification_id_fkey" FOREIGN KEY ("classification_id") REFERENCES "classification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_classification" ADD CONSTRAINT "job_profile_classification_job_profile_id_fkey" FOREIGN KEY ("job_profile_id") REFERENCES "job_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_organization" ADD CONSTRAINT "job_profile_organization_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_organization" ADD CONSTRAINT "job_profile_organization_job_profile_id_fkey" FOREIGN KEY ("job_profile_id") REFERENCES "job_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_context" ADD CONSTRAINT "job_profile_context_job_profile_id_fkey" FOREIGN KEY ("job_profile_id") REFERENCES "job_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_reports_to" ADD CONSTRAINT "job_profile_reports_to_classification_id_fkey" FOREIGN KEY ("classification_id") REFERENCES "classification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_reports_to" ADD CONSTRAINT "job_profile_reports_to_job_profile_id_fkey" FOREIGN KEY ("job_profile_id") REFERENCES "job_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_stream" ADD CONSTRAINT "job_profile_stream_job_family_id_fkey" FOREIGN KEY ("job_family_id") REFERENCES "job_profile_job_family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classification" ADD CONSTRAINT "classification_employee_group_id_fkey" FOREIGN KEY ("employee_group_id") REFERENCES "employee_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department" ADD CONSTRAINT "department_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department" ADD CONSTRAINT "department_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

