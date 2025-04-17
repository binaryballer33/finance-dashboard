import type { Expense as PrismaExpense, Income as PrismaIncome, Transaction as PrismaTransaction } from "@prisma/client"

import { randomUUID } from "crypto"

import getLastSixMonthsArray from "@/mocks/utils/get-last-six-months"
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
    await prisma.transaction.deleteMany({})
    await prisma.expense.deleteMany({})
    await prisma.income.deleteMany({})

    console.log("Dropped Tables Successfully\n")
}

async function createRealisticTransactions(userId: string) {
    console.log("Attempting To Create Transactions")

    const transactionsArray: Transaction[] = []
    const lastSixMonthsArray = getLastSixMonthsArray()

    lastSixMonthsArray.forEach((monthDate) => {
        const transactions = [
            {
                amount: 100 + Math.floor(Math.random() * 200),
                category: "Food",
                date: new Date(monthDate.set("date", 2).format("YYYY-MM-DD")),
                description: "Churrascaria Dinner",
                userId,
            },
            {
                amount: 50 + Math.floor(Math.random() * 50),
                category: "Gas",
                date: new Date(monthDate.set("date", 2).format("YYYY-MM-DD")),
                description: "Gasoline",
                userId,
            },
            {
                amount: 30 + Math.floor(Math.random() * 50),
                category: "Entertainment",
                date: new Date(monthDate.set("date", 2).format("YYYY-MM-DD")),
                description: "Movie Date",
                userId,
            },
            {
                amount: 50 + Math.floor(Math.random() * 50),
                category: "Fitness",
                date: new Date(monthDate.set("date", 2).format("YYYY-MM-DD")),
                description: "Fitness Activities",
                userId,
            },
            {
                amount: 120 + Math.floor(Math.random() * 100),
                category: "Transportation",
                date: new Date(monthDate.set("date", 2).format("YYYY-MM-DD")),
                description: "Plane Ticket To Other Brazilian Cities",
                userId,
            },
            {
                amount: 200 + Math.floor(Math.random() * 100),
                category: "Shopping",
                date: new Date(monthDate.set("date", 2).format("YYYY-MM-DD")),
                description: "Clothes Shopping",
                userId,
            },
        ]

        for (let i = 0; i < transactions.length; i += 1) {
            const { amount } = transactions[i]
            const { category } = transactions[i]
            const { description } = transactions[i]
            const date = new Date(monthDate.set("date", 2).format("YYYY-MM-DD"))

            const transaction = { amount, category, date, description, userId }
            transactionsArray.push(transaction)
        }
    })

    try {
        const result = await prisma.transaction.createMany({
            data: transactionsArray,
        })
        console.log(`Successfully Inserted ${result.count} Records To Transactions Table\n`)
    } catch (error) {
        console.error("Error Inserting Records To Transactions Table", error)
    }
}

async function createFakeTransactions(userId: string, count: number = 100) {
    const fakeTransactions: Transaction[] = []

    Array.from({ length: count }).forEach(() => {
        const amount = Number((Math.random() * 1000).toFixed(2)) // Random amount between 0 and 1000
        const date = new Date()
        date.setDate(date.getDate() - Math.floor(Math.random() * 365)) // Random date within the last year
        const category = `Lorem ipsum ${Math.floor(Math.random() * 10)}`
        const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."

        fakeTransactions.push({
            amount,
            category,
            date,
            description,
            userId,
        })
    })

    try {
        const result = await prisma.transaction.createMany({
            data: fakeTransactions,
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

async function createRealisticExpenses(userId: string) {
    console.log("Attempting To Create Expenses")

    const expensesArray: Expense[] = []
    const lastSixMonthsArray = getLastSixMonthsArray()

    lastSixMonthsArray.forEach((monthDate) => {
        const expenses = [
            { amount: 1000, category: "Housing", description: "Rent" },
            { amount: 500 + Math.floor(Math.random() * 250), category: "Food", description: "Food Allowance" },
            { amount: 500 + Math.floor(Math.random() * 250), category: "Entertainment", description: "Entertainment" },
            { amount: 200 + Math.floor(Math.random() * 50), category: "Transportation", description: "Car Note" },
            {
                amount: 100 + Math.floor(Math.random() * 150),
                category: "Utilities",
                description: "Electricity & Water",
            },
            {
                amount: 50 + Math.floor(Math.random() * 5),
                category: "Streaming Services",
                description: "Netflix, Hulu, Disney+, HBO Max",
            },
        ]

        for (let i = 0; i < expenses.length; i += 1) {
            const { amount } = expenses[i]
            const { category } = expenses[i]
            const { description } = expenses[i]
            const date = new Date(monthDate.set("date", 2).format("YYYY-MM-DD"))

            const expense = { amount, category, date, description, userId }
            expensesArray.push(expense)
        }
    })

    try {
        const result = await prisma.expense.createMany({ data: expensesArray })
        console.log(`Successfully Inserted ${result.count} Records To Expenses Table\n`)
    } catch (error) {
        console.error("Error Inserting Records To Expenses Table", error)
    }
}

async function createFakeExpenses(userId: string, count: number = 5) {
    console.log("Attempting To Create Expenses")
    const fakeExpenses: Expense[] = []

    Array.from({ length: count }).forEach((_, index) => {
        const amount = Number((Math.random() * 300).toFixed(2))

        // get random month with the first date of that month within the last year
        const date = new Date()
        date.setDate(date.getDate() - Math.floor(Math.random() * 365)) // Random date within the last year
        date.setDate(1) // Set to the first day of the month
        date.setMonth(date.getMonth() - Math.floor(Math.random() * 12)) // Random month within the last year

        fakeExpenses.push({
            amount,
            category: `Lorem ipsum ${index}`,
            date,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
            userId,
        })
    })

    try {
        const result = await prisma.expense.createMany({
            data: fakeExpenses,
        })
        console.log(`Successfully Inserted ${result.count} Records To Expenses Table\n`)
    } catch (error) {
        console.error("Error Inserting Records To Expenses Table", error)
    }
}

async function createRealisticIncomes(userId: string) {
    console.log("Attempting To Create Incomes")

    const incomesArray: Income[] = []
    const lastSixMonthsArray = getLastSixMonthsArray()

    lastSixMonthsArray.forEach((monthDate) => {
        const incomes = [
            {
                amount: 1000 + Math.floor(Math.random() * 500),
                category: "Content Creation",
                description: "Youtube Money",
            },
            {
                amount: 5000 + Math.floor(Math.random() * 10000),
                category: "Government Contracting",
                description: "Government Contracting",
            },
            { amount: 3300, category: "Salary", description: "Monthly Salary From Job" },
            { amount: 500, category: "Stock Dividends", description: "Dividends From Stock Holdings" },
            {
                amount: 1500 + Math.floor(Math.random() * 1000),
                category: "Stock Trading",
                description: "Covered Calls & Cash Secured Puts",
            },
        ]

        for (let i = 0; i < incomes.length; i += 1) {
            const { amount } = incomes[i]
            const { category } = incomes[i]
            const { description } = incomes[i]
            const date = new Date(monthDate.set("date", 2).format("YYYY-MM-DD"))

            const income = { amount, category, date, description, userId }
            incomesArray.push(income)
        }
    })

    try {
        const result = await prisma.income.createMany({
            data: incomesArray,
        })
        console.log(`Successfully Inserted ${result.count} Records To Income Table\n`)
    } catch (error) {
        console.error("Error Inserting Records To Income Table", error)
    }
}

async function createFakeIncomes(userId: string, count: number = 5) {
    console.log("Attempting To Create Income")

    const fakeIncomes: Income[] = []

    Array.from({ length: count }).forEach((_, index) => {
        const amount = Number((Math.random() * 1000).toFixed(2))

        // get random month with the first date of that month within the last year
        const date = new Date()
        date.setDate(date.getDate() - Math.floor(Math.random() * 365)) // Random date within the last year
        date.setDate(1) // Set to the first day of the month
        date.setMonth(date.getMonth() - Math.floor(Math.random() * 12)) // Random month within the last year

        fakeIncomes.push({
            amount,
            category: `Lorem ipsum ${index}`,
            date,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
            userId,
        })
    })

    try {
        const result = await prisma.income.createMany({
            data: fakeIncomes,
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
        await createRealisticTransactions(gmailUserId)
        await createRealisticExpenses(gmailUserId)
        await createRealisticIncomes(gmailUserId)

        await createTrades(outlookUserId)
        await createFakeTransactions(outlookUserId, 10000)
        await createFakeExpenses(outlookUserId, 10)
        await createFakeIncomes(outlookUserId, 20)

        // sometime the seed will not fully work because all the yugioh cards or users are not created yet
        // await new Promise((resolve) => setTimeout(resolve, 3000))
    } catch (error) {
        console.error("Error Seeding Database: ", error)
    }
}

seedDatabase()
    .then((_) => console.log("Successfully Seeded Database"))
    .catch((e) => console.error("Error Seeding Database", e))
