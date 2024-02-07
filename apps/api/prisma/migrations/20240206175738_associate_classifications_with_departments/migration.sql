-- CreateTable
CREATE TABLE "classification_department" (
    "classification_id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,

    CONSTRAINT "classification_department_pkey" PRIMARY KEY ("classification_id","department_id")
);

-- AddForeignKey
ALTER TABLE "classification_department" ADD CONSTRAINT "classification_department_classification_id_fkey" FOREIGN KEY ("classification_id") REFERENCES "classification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classification_department" ADD CONSTRAINT "classification_department_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
