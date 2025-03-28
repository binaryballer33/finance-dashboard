/*
  Warnings:

  - Added the required column `sixDigitCode` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "VerificationToken" ADD COLUMN     "sixDigitCode" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;
