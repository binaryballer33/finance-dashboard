import type { SavedItemWithoutId } from "@/types/saved-item"
import type { YuGiOhCard } from "@/types/yu-gi-oh/yu-gi-oh"

import { randomInt, randomUUID } from "crypto"
import fs from "fs"

import { Prisma } from "@prisma/client"
import { hash } from "bcryptjs"

import prisma from "@/lib/database/prisma"

import { trades } from "./trades"

import CartItemUncheckedCreateInput = Prisma.CartItemUncheckedCreateInput

const cardsFilePath = "prisma/seed-db/yugioh-cards.json"
const cards = JSON.parse(fs.readFileSync(cardsFilePath, "utf-8"))
const outlookUserId = randomUUID()
const gmailUserId = randomUUID()

async function dropTables() {
    // delete in proper order
    console.warn("Attempting To Drop Tables")

    await prisma.savedCards.deleteMany({})
    await prisma.cartItem.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.yugiohCard.deleteMany({})
    await prisma.account.deleteMany({})
    await prisma.verificationToken.deleteMany({})
    await prisma.passwordResetToken.deleteMany({})
    await prisma.trade.deleteMany({})

    console.log("Dropped Tables Successfully\n")
}

async function batchCreateTrades() {
    console.log("Attempting To Create Trades")

    try {
        const result = await prisma.trade.createMany({
            data: trades,
            skipDuplicates: true,
        })
        console.log(`Successfully Inserted ${result.count} Records To Trades Table\n`)
    } catch (error) {
        console.error("Error inserting records to trades table", error)
    }
}

async function batchCreateYuGiOhCards(yugiohCards: YuGiOhCard[]) {
    console.log("Attempting To Create Yugioh Cards")

    yugiohCards.forEach((card) => {
        // delete the data that is not needed for the yugiohCard table, these related tables have inconsistent data in my yu-gi-oh-cards.json file and I don't have time to fix and put into a relational database
        delete card?.card_sets
        delete card?.card_images
        delete card?.card_prices
        // @ts-ignore
        delete card?.linkmarkers // TODO: figure out how to get typescript to see that this field could exist on this card
        delete card?.banlist_info
        delete card?.misc_info
    })

    const cardsBatch1 = yugiohCards.slice(0, 9999) // 9999 is the max number of records that can be inserted at once with Prisma
    const cardsBatch2 = yugiohCards.slice(9999, 14000)
    const batches = [cardsBatch1, cardsBatch2]

    batches.map(async (batch, index) => {
        try {
            const result = await prisma.yugiohCard.createMany({
                data: batch,
                skipDuplicates: true, // Optional: skips inserting records that would cause a unique constraint violation
            })
            console.log(`Successfully Inserted ${result.count} Records To YugiohCard Table\n`)
        } catch (error) {
            console.error(`Error While Inserting Records To YugiohCard Table, Failed On Batch ${index}`, error)
        }
    })
}

async function createUsers() {
    console.log("Attempting To Create Users")
    const hashedPasswordForGmailUser = await hash("password", 10)
    const hashedPasswordForOutlookUser = await hash("password", 10)
    const placeholderImage = ""

    try {
        await prisma.user.create({
            data: {
                email: "rashadmandy@gmail.com",
                emailVerified: new Date(), // can only log in with email verification
                encryptedPassword: hashedPasswordForGmailUser, // password to login will be password
                firstName: "Rashad",
                id: gmailUserId,
                image: placeholderImage,
                imageUrl: placeholderImage,
                lastName: "Mandy",
            },
        })

        await prisma.user.create({
            data: {
                email: "rashadmandy@outlook.com",
                encryptedPassword: hashedPasswordForOutlookUser, // password to login will be password
                firstName: "Rashad",
                id: outlookUserId,
                image: placeholderImage,
                imageUrl: placeholderImage,
                lastName: "Mandy",
            },
        })
        console.log("Successfully Created User with Gmail ID: ", gmailUserId)
    } catch (error) {
        console.error(`Error Creating Gmail User With ID: ${gmailUserId}`, error)
    }
}

async function createRandomSavedCards(userId: string, amountOfRandomSavedCards = 10) {
    console.log("Attempting To Create Random Saved Cards")

    const randomCards: SavedItemWithoutId[] = Array(amountOfRandomSavedCards)
        .fill({})
        .map(() => {
            const randomCard = cards[randomInt(cards.length)]

            return {
                userId,
                yugiohCardId: randomCard.id,
            }
        })

    try {
        const result = await prisma.savedCards.createMany({
            data: randomCards,
            skipDuplicates: true,
        })
        console.log(`Successfully Inserted ${result.count} Records To SavedCards Table For User: ${userId}\n`)
    } catch (error) {
        console.error("Error inserting records to savedCardsTable", error)
    }
}

async function createRandomCartItems(userId: string, amountOfRandomCartItems: number = 10) {
    console.log("Attempting To Create Random Cart Items")

    const randomCards: CartItemUncheckedCreateInput[] = Array(amountOfRandomCartItems)
        .fill({})
        .map(() => {
            const randomCard = cards[randomInt(cards.length)]
            const { frameType, id, name, price } = randomCard
            const randomQuantity = randomInt(1, 10) / 10.0

            return {
                desc: frameType,
                name,
                price,
                quantity: randomQuantity,
                userId,
                yugiohCardId: id,
            }
        })

    try {
        const result = await prisma.cartItem.createMany({
            data: randomCards,
            skipDuplicates: true,
        })
        console.log(`Successfully Inserted ${result.count} Records To CartItems Table For User: ${userId}\n`)
    } catch (error) {
        console.error("Error inserting records to cartItems table", error)
    }
}

async function seedDatabase() {
    try {
        // delete all records in the tables so you can start fresh and avoid any unique constraint violations when inserting records
        await dropTables()

        // wait for tables to be dropped
        await new Promise((resolve) => setTimeout(resolve, 3000))

        await batchCreateYuGiOhCards(cards)
        await createUsers()
        await batchCreateTrades()

        // sometime the seed will not fully work because all the yugioh cards or users are not created yet
        await new Promise((resolve) => setTimeout(resolve, 3000))

        await createRandomSavedCards(gmailUserId, 15)
        await createRandomSavedCards(outlookUserId, 10)
        await createRandomCartItems(gmailUserId, 15)
        await createRandomCartItems(outlookUserId, 10)
    } catch (error) {
        console.error("Error Seeding Database: ", error)
    } finally {
        await prisma.$disconnect()
    }
}

seedDatabase()
    .then((_) => console.log("Successfully Seeded Database"))
    .catch((e) => console.error("Error Seeding Database", e))
