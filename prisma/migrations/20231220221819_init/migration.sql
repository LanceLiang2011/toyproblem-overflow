/*
  Warnings:

  - Added the required column `expectedInput` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expectedOutput` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "expectedInput" TEXT NOT NULL,
ADD COLUMN     "expectedOutput" TEXT NOT NULL;
