-- CreateEnum
CREATE TYPE "TradeRealized" AS ENUM ('GAIN', 'LOSS');

-- CreateEnum
CREATE TYPE "TradeType" AS ENUM ('SELL_CALL', 'SELL_PUT');

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "contracts" INTEGER NOT NULL,
    "profitLoss" DOUBLE PRECISION NOT NULL,
    "profitLossPercentage" DOUBLE PRECISION NOT NULL,
    "buyToClose" DOUBLE PRECISION NOT NULL,
    "sellToOpen" DOUBLE PRECISION NOT NULL,
    "strike" DOUBLE PRECISION NOT NULL,
    "ticker" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "TradeType" NOT NULL,
    "realized" "TradeRealized" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
