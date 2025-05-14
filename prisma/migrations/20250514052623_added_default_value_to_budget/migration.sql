/*
  Warnings:

  - Made the column `budgetAmount` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "budgetAmount" SET NOT NULL,
ALTER COLUMN "budgetAmount" SET DEFAULT 3000;
