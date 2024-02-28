-- CreateTable
CREATE TABLE "scheduled_task_metadata" (
    "task" TEXT NOT NULL,
    "frequency" INTEGER,
    "last_run_at" TIMESTAMP(3),

    CONSTRAINT "scheduled_task_metadata_pkey" PRIMARY KEY ("task")
);
