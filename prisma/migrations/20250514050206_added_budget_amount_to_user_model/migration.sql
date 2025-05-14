-- AlterEnum
ALTER TYPE "TransactionType" ADD VALUE 'RECURRING';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "budgetAmount" DOUBLE PRECISION;
