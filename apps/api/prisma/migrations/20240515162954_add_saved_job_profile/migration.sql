-- CreateTable
CREATE TABLE "saved_job_profile" (
    "userId" UUID NOT NULL,
    "jobProfileId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_job_profile_pkey" PRIMARY KEY ("userId","jobProfileId")
);

-- AddForeignKey
ALTER TABLE "saved_job_profile" ADD CONSTRAINT "saved_job_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_job_profile" ADD CONSTRAINT "saved_job_profile_jobProfileId_fkey" FOREIGN KEY ("jobProfileId") REFERENCES "job_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
