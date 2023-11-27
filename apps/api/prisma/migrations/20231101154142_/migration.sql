-- CreateEnum
CREATE TYPE "BehaviouralCompetencyMembership" AS ENUM ('EXCLUDED', 'INCLUDED', 'INDIGENOUS');

-- CreateEnum
CREATE TYPE "BehaviouralCompetencyGroup" AS ENUM ('ACHIEVING_BUSINESS_RESULTS', 'INTERPERSONAL_RELATIONSHIPS', 'LEADING_PEOPLE', 'PERSONAL_EFFECTIVENESS');

-- CreateEnum
CREATE TYPE "JobProfileState" AS ENUM ('SUBMITTED', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "JobStream" AS ENUM ('CORPORATE', 'MINISTRY', 'USER');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "roles" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "identity" (
    "sub" TEXT NOT NULL,
    "identity_provider" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "identity_pkey" PRIMARY KEY ("sub","identity_provider")
);

-- CreateTable
CREATE TABLE "behavioural_competency" (
    "id" SERIAL NOT NULL,
    "ministry_id" INTEGER,
    "membership" "BehaviouralCompetencyMembership" NOT NULL,
    "group" "BehaviouralCompetencyGroup" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "behavioural_competency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ministry" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ministry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classification" (
    "id" SERIAL NOT NULL,
    "grid_id" INTEGER NOT NULL,
    "occupation_group_id" INTEGER NOT NULL,

    CONSTRAINT "classification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grid" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "steps" INTEGER[],

    CONSTRAINT "grid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "occupation_group" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "occupation_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "career_group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "career_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_family" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "job_family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "job_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_profile" (
    "id" SERIAL NOT NULL,
    "career_group_id" INTEGER,
    "classification_id" INTEGER NOT NULL,
    "family_id" INTEGER,
    "ministry_id" INTEGER,
    "owner_id" UUID,
    "parent_id" INTEGER,
    "role_id" INTEGER,
    "state" "JobProfileState" NOT NULL,
    "stream" "JobStream" NOT NULL,
    "title" TEXT NOT NULL,
    "number" INTEGER,
    "context" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "accountabilities" JSONB NOT NULL DEFAULT '{"optional": [], "required": []}',
    "requirements" TEXT[],

    CONSTRAINT "job_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_profile_behavioural_competency" (
    "behavioural_competency_id" INTEGER NOT NULL,
    "job_profile_id" INTEGER NOT NULL,

    CONSTRAINT "job_profile_behavioural_competency_pkey" PRIMARY KEY ("behavioural_competency_id","job_profile_id")
);

-- CreateTable
CREATE TABLE "job_profile_reports_to" (
    "classification_id" INTEGER NOT NULL,
    "job_profile_id" INTEGER NOT NULL,

    CONSTRAINT "job_profile_reports_to_pkey" PRIMARY KEY ("classification_id","job_profile_id")
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

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "identity" ADD CONSTRAINT "identity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "behavioural_competency" ADD CONSTRAINT "behavioural_competency_ministry_id_fkey" FOREIGN KEY ("ministry_id") REFERENCES "ministry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classification" ADD CONSTRAINT "classification_grid_id_fkey" FOREIGN KEY ("grid_id") REFERENCES "grid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classification" ADD CONSTRAINT "classification_occupation_group_id_fkey" FOREIGN KEY ("occupation_group_id") REFERENCES "occupation_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile" ADD CONSTRAINT "job_profile_career_group_id_fkey" FOREIGN KEY ("career_group_id") REFERENCES "career_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile" ADD CONSTRAINT "job_profile_classification_id_fkey" FOREIGN KEY ("classification_id") REFERENCES "classification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile" ADD CONSTRAINT "job_profile_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "job_family"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile" ADD CONSTRAINT "job_profile_ministry_id_fkey" FOREIGN KEY ("ministry_id") REFERENCES "ministry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile" ADD CONSTRAINT "job_profile_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile" ADD CONSTRAINT "job_profile_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "job_profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile" ADD CONSTRAINT "job_profile_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "job_role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_behavioural_competency" ADD CONSTRAINT "job_profile_behavioural_competency_behavioural_competency__fkey" FOREIGN KEY ("behavioural_competency_id") REFERENCES "behavioural_competency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_behavioural_competency" ADD CONSTRAINT "job_profile_behavioural_competency_job_profile_id_fkey" FOREIGN KEY ("job_profile_id") REFERENCES "job_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_reports_to" ADD CONSTRAINT "job_profile_reports_to_classification_id_fkey" FOREIGN KEY ("classification_id") REFERENCES "classification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_profile_reports_to" ADD CONSTRAINT "job_profile_reports_to_job_profile_id_fkey" FOREIGN KEY ("job_profile_id") REFERENCES "job_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
