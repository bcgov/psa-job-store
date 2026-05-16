-- CreateTable
CREATE TABLE "grade" (
    "id" INTEGER NOT NULL,
    "employee_group_id" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "effective_status" TEXT NOT NULL,
    "effective_date" DATE NOT NULL,

    CONSTRAINT "grade_pkey" PRIMARY KEY ("id")
);
