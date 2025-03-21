-- CreateTable
CREATE TABLE "Share" (
    "folderId" TEXT NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Share_pkey" PRIMARY KEY ("folderId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Share_folderId_key" ON "Share"("folderId");

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
