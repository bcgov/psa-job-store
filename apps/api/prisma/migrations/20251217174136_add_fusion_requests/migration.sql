-- CreateTable
CREATE TABLE "fusion_request" (
    "id" SERIAL NOT NULL,
    "positionRequestRef" INTEGER,
    "positionRef" TEXT,
    "payload" JSONB,
    "response" JSONB,
    "date" DATE NOT NULL,

    CONSTRAINT "fusion_request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fusion_request" ADD CONSTRAINT "fusion_request_positionRequestRef_fkey" FOREIGN KEY ("positionRequestRef") REFERENCES "position_request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fusion_request" ADD CONSTRAINT "fusion_request_positionRef_fkey" FOREIGN KEY ("positionRef") REFERENCES "position"("positionCode") ON DELETE SET NULL ON UPDATE CASCADE;
