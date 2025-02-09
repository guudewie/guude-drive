-- AlterTable
ALTER TABLE "File" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'file';

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'folder';
