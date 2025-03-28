/*
  Warnings:

  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavedCards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `YugiohCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationtokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_yugiohCardId_fkey";

-- DropForeignKey
ALTER TABLE "SavedCards" DROP CONSTRAINT "SavedCards_userId_fkey";

-- DropForeignKey
ALTER TABLE "SavedCards" DROP CONSTRAINT "SavedCards_yugiohCardId_fkey";

-- DropIndex
DROP INDEX "users_id_email_firstName_lastName_createdAt_updatedAt_idx";

-- DropTable
DROP TABLE "CartItem";

-- DropTable
DROP TABLE "SavedCards";

-- DropTable
DROP TABLE "YugiohCard";

-- DropTable
DROP TABLE "verificationtokens";

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "yugioh_cards" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "frameType" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "atk" INTEGER,
    "def" INTEGER,
    "level" INTEGER,
    "race" TEXT NOT NULL,
    "attribute" TEXT,
    "archetype" TEXT,
    "ygoprodeck_url" TEXT NOT NULL,
    "pend_desc" TEXT,
    "monster_desc" TEXT,
    "scale" INTEGER,
    "linkval" INTEGER,

    CONSTRAINT "yugioh_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_cards" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "yugiohCardId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "saved_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_items" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "yugiohCardId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "desc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- AddForeignKey
ALTER TABLE "saved_cards" ADD CONSTRAINT "saved_cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_cards" ADD CONSTRAINT "saved_cards_yugiohCardId_fkey" FOREIGN KEY ("yugiohCardId") REFERENCES "yugioh_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_yugiohCardId_fkey" FOREIGN KEY ("yugiohCardId") REFERENCES "yugioh_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
