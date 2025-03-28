/*
  Warnings:

  - Added the required column `sixDigitCode` to the `TwoFactorToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TwoFactorToken" ADD COLUMN     "sixDigitCode" INTEGER NOT NULL;
