-- CreateTable
CREATE TABLE "cron_locks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "locked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cron_locks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cron_locks_name_key" ON "cron_locks"("name");
