import type { Expense as PrismaExpense, Income as PrismaIncome, Transaction as PrismaTransaction } from "@prisma/client"

import { randomUUID } from "crypto"

import { hash } from "bcryptjs"

import prisma from "@/lib/database/prisma"

import tradesWithUserId from "./trades"

type Transaction = Omit<PrismaTransaction, "createdAt" | "id" | "updatedAt">
type Expense = Omit<PrismaExpense, "createdAt" | "id" | "updatedAt">
type Income = Omit<PrismaIncome, "createdAt" | "id" | "updatedAt">

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
    await prisma.expense.deleteMany({})
    await prisma.income.deleteMany({})

    console.log("Dropped Tables Successfully\n")
}

async function createTransactions(userId: string, count: number = 100) {
    const transactions: Transaction[] = []

    Array.from({ length: count }).forEach(() => {
        const amount = Math.random() * 1000 - 500 // Random amount between -500 and 500
        const date = new Date()
        date.setDate(date.getDate() - Math.floor(Math.random() * 365)) // Random date within the last year
        const category = `Lorem ipsum ${Math.floor(Math.random() * 10)}`
        const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."

        transactions.push({
            amount,
            category,
            date,
            description,
            userId,
        })
    })

    try {
        const result = await prisma.transaction.createMany({
            data: transactions,
        })
        console.log(`Successfully created ${result.count} transactions`)
        return result
    } catch (error) {
        console.error("Error generating transactions:", error)
        throw error
    }
}

async function createTrades(userId: string) {
    console.log("Attempting To Create Trades")

    const trades = tradesWithUserId.map((trade) => ({ ...trade, userId }))

    try {
        const result = await prisma.trade.createMany({
            data: trades,
            skipDuplicates: true,
        })
        console.log(`Successfully Inserted ${result.count} Records To Trades Table\n`)
    } catch (error) {
        console.error("Error Inserting Records To Trades Table", error)
    }
}

async function createExpenses(userId: string, count: number = 5) {
    console.log("Attempting To Create Expenses")
    const expenses: Expense[] = []

    Array.from({ length: count }).forEach((_, index) => {
        const amount = Math.random() * 300

        // get random month with the first date of that month within the last year
        const date = new Date()
        date.setDate(date.getDate() - Math.floor(Math.random() * 365)) // Random date within the last year
        date.setDate(1) // Set to the first day of the month
        date.setMonth(date.getMonth() - Math.floor(Math.random() * 12)) // Random month within the last year

        expenses.push({
            amount,
            category: `Lorem ipsum ${index}`,
            date,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
            userId,
        })
    })

    try {
        const result = await prisma.expense.createMany({
            data: expenses,
        })
        console.log(`Successfully Inserted ${result.count} Records To Expenses Table\n`)
    } catch (error) {
        console.error("Error Inserting Records To Expenses Table", error)
    }
}

async function createIncome(userId: string, count: number = 5) {
    console.log("Attempting To Create Income")

    const incomes: Income[] = []

    Array.from({ length: count }).forEach((_, index) => {
        const amount = Math.random() * 1000

        // get random month with the first date of that month within the last year
        const date = new Date()
        date.setDate(date.getDate() - Math.floor(Math.random() * 365)) // Random date within the last year
        date.setDate(1) // Set to the first day of the month
        date.setMonth(date.getMonth() - Math.floor(Math.random() * 12)) // Random month within the last year

        incomes.push({
            amount,
            category: `Lorem ipsum ${index}`,
            date,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
            userId,
        })
    })

    try {
        const result = await prisma.income.createMany({
            data: incomes,
        })
        console.log(`Successfully Inserted ${result.count} Records To Income Table\n`)
    } catch (error) {
        console.error("Error Inserting Records To Income Table", error)
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
        await createTrades(gmailUserId)
        await createTrades(outlookUserId)
        await createTransactions(gmailUserId, 10000)
        await createTransactions(outlookUserId, 100)
        await createExpenses(gmailUserId, 5)
        await createExpenses(outlookUserId, 5)
        await createIncome(gmailUserId, 5)
        await createIncome(outlookUserId, 5)

        // sometime the seed will not fully work because all the yugioh cards or users are not created yet
        // await new Promise((resolve) => setTimeout(resolve, 3000))
    } catch (error) {
        console.error("Error Seeding Database: ", error)
    } finally {
        await prisma.$disconnect()
    }
}

seedDatabase()
    .then((_) => console.log("Successfully Seeded Database"))
    .catch((e) => console.error("Error Seeding Database", e))
