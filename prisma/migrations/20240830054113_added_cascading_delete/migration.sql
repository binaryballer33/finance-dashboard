-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_yugiohCardId_fkey";

-- DropForeignKey
ALTER TABLE "SavedCards" DROP CONSTRAINT "SavedCards_userId_fkey";

-- DropForeignKey
ALTER TABLE "SavedCards" DROP CONSTRAINT "SavedCards_yugiohCardId_fkey";

-- AddForeignKey
ALTER TABLE "SavedCards" ADD CONSTRAINT "SavedCards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedCards" ADD CONSTRAINT "SavedCards_yugiohCardId_fkey" FOREIGN KEY ("yugiohCardId") REFERENCES "YugiohCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_yugiohCardId_fkey" FOREIGN KEY ("yugiohCardId") REFERENCES "YugiohCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
