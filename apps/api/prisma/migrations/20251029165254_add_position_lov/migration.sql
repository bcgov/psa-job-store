-- CreateTable
CREATE TABLE "position_lov" (
    "positionId" TEXT NOT NULL,
    "positionsLovV2UniqId" TEXT NOT NULL,
    "positionCode" TEXT NOT NULL,
    "parentPositionCode" TEXT NOT NULL,

    CONSTRAINT "position_lov_pkey" PRIMARY KEY ("positionId")
);
