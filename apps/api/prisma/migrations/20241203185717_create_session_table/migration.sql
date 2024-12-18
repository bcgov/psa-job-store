-- CreateTable
CREATE TABLE "_session" (
    "sid" TEXT NOT NULL,
    "sess" JSONB NOT NULL,
    "expire" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "_session_pkey" PRIMARY KEY ("sid")
);

-- CreateIndex
CREATE INDEX "_session_expire_idx" ON "_session"("expire");
