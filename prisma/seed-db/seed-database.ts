import { randomUUID } from "crypto"

import categories from "@/mocks/categories"
import getLastSixMonthsArray from "@/mocks/utils/get-last-six-months"
import { type Expense as PrismaExpense, type Income as PrismaIncome, TransactionType } from "@prisma/client"
import { hash } from "bcryptjs"

import prisma from "@/lib/database/prisma"

import tradesWithUserId from "./trades"

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

async function createRealisticOneTimeExpenses(userId: string) {
    console.log("Attempting To Create One Time Expenses")

    const expensesArray: Expense[] = []
    const lastSixMonthsArray = getLastSixMonthsArray()

    lastSixMonthsArray.forEach((monthDate) => {
        const expenses = [
            {
                amount: 100 + Math.floor(Math.random() * 200),
                category: "Food",
                date: new Date(monthDate.set("date", 2).format("YYYY-MM-DD")),
                description: "Churrascaria Dinner",
                type: TransactionType.ONE_TIME,
                userId,
            },
            {
                amount: 50 + Math.floor(Math.random() * 50),
                category: "Transportation",
                date: new Date(monthDate.set("date", 2).format("YYYY-MM-DD")),
                description: "Gasoline",
                type: TransactionType.ONE_TIME,
                userId,
            },
            {
                amount: 30 + Math.floor(Math.random() * 50),
                category: "Entertainment",
                date: new Date(monthDate.set("date", 2).format("YYYY-MM-DD")),
                description: "Movie Date",
                type: TransactionType.ONE_TIME,
                userId,
            },
            {
                amount: 50 + Math.floor(Math.random() * 50),
                category: "Health",
                date: new Date(monthDate.set("date", 2).format("YYYY-MM-DD")),
                description: "Fitness Activities",
                type: TransactionType.ONE_TIME,
                userId,
            },
            {
                amount: 120 + Math.floor(Math.random() * 100),
                category: "Transportation",
                date: new Date(monthDate.set("date", 2).format("YYYY-MM-DD")),
                description: "Plane Ticket To Other Brazilian Cities",
                type: TransactionType.ONE_TIME,
                userId,
            },
            {
                amount: 200 + Math.floor(Math.random() * 100),
                category: "Shopping",
                date: new Date(monthDate.set("date", 2).format("YYYY-MM-DD")),
                description: "Clothes Shopping",
                type: TransactionType.ONE_TIME,
                userId,
            },
        ]

        for (let i = 0; i < expenses.length; i += 1) {
            const { amount } = expenses[i]
            const { category } = expenses[i]
            const { description } = expenses[i]
            const { type } = expenses[i]
            const date = new Date(monthDate.set("date", 2).format("YYYY-MM-DD"))

            const expense = { amount, category, date, description, type, userId }
            expensesArray.push(expense)
        }
    })

    try {
        const result = await prisma.expense.createMany({
            data: expensesArray,
        })
        console.log(`Successfully Inserted ${result.count} Records To Expenses Table As One Time Expenses\n`)
    } catch (error) {
        console.error("Error Inserting Records To Expenses Table", error)
    }
}

async function createFakeOneTimeExpenses(userId: string, count: number = 100) {
    const fakeExpenses: Expense[] = []

    Array.from({ length: count }).forEach(() => {
        const amount = Number((Math.random() * 1000).toFixed(2)) // Random amount between 0 and 1000
        const date = new Date()
        date.setDate(date.getDate() - Math.floor(Math.random() * 365)) // Random date within the last year
        const randomCategoryIndex = Math.floor(Math.random() * categories.length)
        const category = categories[randomCategoryIndex].value
        const description = `${categories[randomCategoryIndex].label} Expense For Me`

        fakeExpenses.push({
            amount,
            category,
            date,
            description,
            type: TransactionType.ONE_TIME,
            userId,
        })
    })

    try {
        const result = await prisma.expense.createMany({
            data: fakeExpenses,
        })
        console.log(`Successfully created ${result.count} expenses`)
        return result
    } catch (error) {
        console.error("Error generating expenses:", error)
        throw error
    }
}

async function createRealisticRecurringExpenses(userId: string) {
    console.log("Attempting To Create Recurring Realistic Expenses")

    const expensesArray: Expense[] = []
    const lastSixMonthsArray = getLastSixMonthsArray()

    lastSixMonthsArray.forEach((monthDate) => {
        const expenses: Omit<Expense, "createdAt" | "date" | "id" | "updatedAt">[] = [
            { amount: 1000, category: "Housing", description: "Rent", type: TransactionType.RECURRING, userId },
            {
                amount: 500 + Math.floor(Math.random() * 250),
                category: "Food",
                description: "Food Allowance",
                type: TransactionType.RECURRING,
                userId,
            },
            {
                amount: 500 + Math.floor(Math.random() * 250),
                category: "Entertainment",
                description: "Entertainment",
                type: TransactionType.RECURRING,
                userId,
            },
            {
                amount: 200 + Math.floor(Math.random() * 50),
                category: "Transportation",
                description: "Car Note",
                type: TransactionType.RECURRING,
                userId,
            },
            {
                amount: 100 + Math.floor(Math.random() * 150),
                category: "Utilities",
                description: "Electricity & Water",
                type: TransactionType.RECURRING,
                userId,
            },
            {
                amount: 50 + Math.floor(Math.random() * 5),
                category: "Streaming Services",
                description: "Netflix, Hulu, Disney+, HBO Max",
                type: TransactionType.RECURRING,
                userId,
            },
        ]

        for (let i = 0; i < expenses.length; i += 1) {
            const { amount } = expenses[i]
            const { category } = expenses[i]
            const { description } = expenses[i]
            const { type } = expenses[i]
            const date = new Date(monthDate.set("date", 2).format("YYYY-MM-DD"))

            const expense = { amount, category, date, description, type, userId }
            expensesArray.push(expense)
        }
    })

    try {
        const result = await prisma.expense.createMany({ data: expensesArray })
        console.log(`Successfully Inserted ${result.count} Recurring Realistic Expense Records To Expenses Table\n`)
    } catch (error) {
        console.error("Error Inserting Recurring Realistic Expense Records To Expenses Table", error)
    }
}

async function createFakeRecurringExpenses(userId: string, count: number = 5) {
    console.log("Attempting To Create Fake Recurring Expenses")
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
            type: TransactionType.RECURRING,
            userId,
        })
    })

    try {
        const result = await prisma.expense.createMany({
            data: fakeExpenses,
        })
        console.log(`Successfully Inserted ${result.count} Fake Recurring Expense Records To Expenses Table\n`)
    } catch (error) {
        console.error("Error Inserting Fake Recurring Expense Records To Expenses Table", error)
    }
}

async function createRealisticRecurringIncomes(userId: string) {
    console.log("Attempting To Create Recurring Realistic Incomes")

    const incomesArray: Income[] = []
    const lastSixMonthsArray = getLastSixMonthsArray()

    lastSixMonthsArray.forEach((monthDate) => {
        const incomes: Omit<Income, "createdAt" | "date" | "id" | "updatedAt" | "userId">[] = [
            {
                amount: 1000 + Math.floor(Math.random() * 500),
                category: "Content Creation",
                description: "Youtube Money",
                type: TransactionType.RECURRING,
            },
            {
                amount: 5000 + Math.floor(Math.random() * 10000),
                category: "Government Contracting",
                description: "Government Contracting",
                type: TransactionType.RECURRING,
            },
            {
                amount: 3300,
                category: "Salary",
                description: "Monthly Salary From Job",
                type: TransactionType.RECURRING,
            },
            {
                amount: 500,
                category: "Stock Dividends",
                description: "Dividends From Stock Holdings",
                type: TransactionType.RECURRING,
            },
            {
                amount: 1500 + Math.floor(Math.random() * 1000),
                category: "Stock Trading",
                description: "Covered Calls & Cash Secured Puts",
                type: TransactionType.RECURRING,
            },
        ]

        for (let i = 0; i < incomes.length; i += 1) {
            const { amount } = incomes[i]
            const { category } = incomes[i]
            const { description } = incomes[i]
            const { type } = incomes[i]
            const date = new Date(monthDate.set("date", 2).format("YYYY-MM-DD"))

            const income = { amount, category, date, description, type, userId }
            incomesArray.push(income)
        }
    })

    try {
        const result = await prisma.income.createMany({
            data: incomesArray,
        })
        console.log(`Successfully Inserted ${result.count} Recurring Realistic Income Records To Income Table\n`)
    } catch (error) {
        console.error("Error Inserting Recurring Realistic Income Records To Income Table", error)
    }
}

async function createFakeRecurringIncomes(userId: string, count: number = 5) {
    console.log("Attempting To Create Fake Recurring Incomes")

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
            type: TransactionType.RECURRING,
            userId,
        })
    })

    try {
        const result = await prisma.income.createMany({
            data: fakeIncomes,
        })
        console.log(`Successfully Inserted ${result.count} Fake Recurring Income Records To Income Table\n`)
    } catch (error) {
        console.error("Error Inserting Fake Recurring Income Records To Income Table", error)
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
        await createRealisticOneTimeExpenses(gmailUserId)
        await createRealisticRecurringExpenses(gmailUserId)
        await createRealisticRecurringIncomes(gmailUserId)

        await createTrades(outlookUserId)
        await createFakeOneTimeExpenses(outlookUserId, 10000)
        await createFakeRecurringExpenses(outlookUserId, 10)
        await createFakeRecurringIncomes(outlookUserId, 20)

        // sometime the seed will not fully work because all the yugioh cards or users are not created yet
        // await new Promise((resolve) => setTimeout(resolve, 3000))
    } catch (error) {
        console.error("Error Seeding Database: ", error)
    }
}

seedDatabase()
    .then((_) => console.log("Successfully Seeded Database"))
    .catch((e) => console.error("Error Seeding Database", e))
