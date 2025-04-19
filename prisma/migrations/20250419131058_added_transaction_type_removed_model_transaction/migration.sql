/*
  Warnings:

  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('RECURRING', 'ONE_TIME');

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "type" "TransactionType" NOT NULL;

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "type" "TransactionType" NOT NULL;

-- DropTable
DROP TABLE "Transaction";
