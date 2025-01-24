-- CreateEnum
CREATE TYPE "DocumentCategory" AS ENUM ('CAREER_MAP', 'REFERENCE_GUIDE', 'RESOURCES');

-- CreateTable
CREATE TABLE "document" (
    "id" TEXT NOT NULL,
    "file_extension" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "category" "DocumentCategory" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_job_family_link" (
    "documentId" TEXT NOT NULL,
    "jobFamilyId" INTEGER NOT NULL,

    CONSTRAINT "document_job_family_link_pkey" PRIMARY KEY ("documentId","jobFamilyId")
);

-- CreateTable
CREATE TABLE "document_job_stream_link" (
    "documentId" TEXT NOT NULL,
    "jobStreamId" INTEGER NOT NULL,

    CONSTRAINT "document_job_stream_link_pkey" PRIMARY KEY ("documentId","jobStreamId")
);

-- CreateIndex
CREATE UNIQUE INDEX "document_url_key" ON "document"("url");

-- AddForeignKey
ALTER TABLE "document_job_family_link" ADD CONSTRAINT "document_job_family_link_jobFamilyId_fkey" FOREIGN KEY ("jobFamilyId") REFERENCES "job_profile_job_family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_job_family_link" ADD CONSTRAINT "document_job_family_link_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_job_stream_link" ADD CONSTRAINT "document_job_stream_link_jobStreamId_fkey" FOREIGN KEY ("jobStreamId") REFERENCES "job_profile_stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_job_stream_link" ADD CONSTRAINT "document_job_stream_link_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
