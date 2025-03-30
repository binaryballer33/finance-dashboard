import { randomUUID } from "crypto"

import { hash } from "bcryptjs"

import prisma from "@/lib/database/prisma"

import { trades } from "./trades"

const outlookUserId = randomUUID()
const gmailUserId = randomUUID()

async function dropTables() {
    // delete in proper order
    console.warn("Attempting To Drop Tables")

    await prisma.user.deleteMany({})
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

async function seedDatabase() {
    try {
        // delete all records in the tables so you can start fresh and avoid any unique constraint violations when inserting records
        await dropTables()

        // wait for tables to be dropped
        await new Promise((resolve) => setTimeout(resolve, 3000))

        await createUsers()
        await batchCreateTrades()

        // sometime the seed will not fully work because all the yugioh cards or users are not created yet
        await new Promise((resolve) => setTimeout(resolve, 3000))
    } catch (error) {
        console.error("Error Seeding Database: ", error)
    } finally {
        await prisma.$disconnect()
    }
}

seedDatabase()
    .then((_) => console.log("Successfully Seeded Database"))
    .catch((e) => console.error("Error Seeding Database", e))
