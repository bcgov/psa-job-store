-- CreateTable
CREATE TABLE "department_metadata" (
    "department_id" TEXT NOT NULL,
    "is_statutorily_excluded" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "department_metadata_pkey" PRIMARY KEY ("department_id")
);

-- AddForeignKey
ALTER TABLE "department_metadata" ADD CONSTRAINT "department_metadata_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add metadata entry for existing departments
INSERT INTO "department_metadata" (department_id)
    SELECT
        id
    FROM
        department;