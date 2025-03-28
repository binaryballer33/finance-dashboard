-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "encryptedPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YugiohCard" (
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

    CONSTRAINT "YugiohCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedCards" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "yugiohCardId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedCards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "yugiohCardId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "desc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_id_email_firstName_lastName_createdAt_updatedAt_idx" ON "User"("id", "email", "firstName", "lastName", "createdAt", "updatedAt");

-- AddForeignKey
ALTER TABLE "SavedCards" ADD CONSTRAINT "SavedCards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedCards" ADD CONSTRAINT "SavedCards_yugiohCardId_fkey" FOREIGN KEY ("yugiohCardId") REFERENCES "YugiohCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_yugiohCardId_fkey" FOREIGN KEY ("yugiohCardId") REFERENCES "YugiohCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
