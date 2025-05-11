import { randomUUID } from "crypto"

import getPreviousMonthsFromToday from "@/mocks/utils/get-previous-months-from-today"
import { type Expense as PrismaExpense, type Income as PrismaIncome, TransactionType } from "@prisma/client"
import { hash } from "bcryptjs"

import prisma from "@/lib/database/prisma"

import tradesWithUserId from "./trades"

type Expense = Omit<PrismaExpense, "createdAt" | "id" | "updatedAt">
type Income = Omit<PrismaIncome, "createdAt" | "id" | "updatedAt">

const outlookUserId = randomUUID()
const gmailUserId = randomUUID()
const numberOfMonths = 12

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

async function createRecurringExpenses(userId: string) {
    console.log("Attempting To Create Recurring Realistic Expenses")

    const expensesArray: Expense[] = []
    const lastSixMonthsArray = getPreviousMonthsFromToday(numberOfMonths)

    lastSixMonthsArray.forEach((monthDate) => {
        const expenses: Omit<Expense, "createdAt" | "date" | "id" | "updatedAt">[] = [
            { amount: 1000, category: "Housing", description: "Rent", type: TransactionType.RECURRING, userId },
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
                category: "Subscriptions",
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

async function createRecurringIncomes(userId: string) {
    console.log("Attempting To Create Recurring Realistic Incomes")

    const incomesArray: Income[] = []
    const lastSixMonthsArray = getPreviousMonthsFromToday(12)

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

async function createDailyTransactions(userId: string) {
    console.log("Attempting To Create Daily Transactions")

    const expenses: Expense[] = []
    const previousMonthArray = getPreviousMonthsFromToday(numberOfMonths)

    previousMonthArray.forEach((month) => {
        // Get the number of days in the month
        const daysInMonth = month.daysInMonth()

        const categoryDescriptions = {
            Entertainment: ["Movie", "Concert", "Show", "Game"],
            Food: ["Breakfast", "Lunch", "Dinner", "Snack"],
            Health: ["Vitamins", "Supplements", "Skin Care", "Massage"],
            Shopping: ["Home Goods", "Electronics", "Clothes"],
            Transportation: ["Uber Ride", "Bus Ride", "Train Ride", "Gas"],
            Travel: ["Hotel", "Flight", "Rental Car", "Cruise", "Tour", "Attraction"],
        }
        const categories = Object.keys(categoryDescriptions)

        // Create 1-3 transactions per day for each day in the month
        for (let day = 1; day <= daysInMonth; day += 1) {
            // Generate 1-3 transactions per day
            const transactionsCount = 1 + Math.floor(Math.random() * 3)

            for (let i = 0; i < transactionsCount; i += 1) {
                const getRandomCategoryOrDescription = (array: string[]) => {
                    return array[Math.floor(Math.random() * array.length)] as keyof typeof categoryDescriptions
                }

                const getRandomTransactionAmount = (min: number, max: number) => {
                    return Math.round((min + Math.random() * (max - min)) * 100) / 100
                }

                const date = new Date(month.set("date", day).format("YYYY-MM-DD"))
                const category = getRandomCategoryOrDescription(categories)

                let description: string = ""
                let amount = 10
                switch (category) {
                    case "Food":
                        description = getRandomCategoryOrDescription(categoryDescriptions.Food)
                        amount = getRandomTransactionAmount(15, 50)
                        break
                    case "Entertainment":
                        description = getRandomCategoryOrDescription(categoryDescriptions.Entertainment)
                        amount = getRandomTransactionAmount(10, 70)
                        break
                    case "Transportation":
                        description = getRandomCategoryOrDescription(categoryDescriptions.Transportation)
                        amount = getRandomTransactionAmount(1, 30)
                        break
                    case "Shopping":
                        description = getRandomCategoryOrDescription(categoryDescriptions.Shopping)
                        amount = getRandomTransactionAmount(20, 50)
                        break
                    case "Health":
                        description = getRandomCategoryOrDescription(categoryDescriptions.Health)
                        amount = getRandomTransactionAmount(10, 30)
                        break
                    case "Travel":
                        description = getRandomCategoryOrDescription(categoryDescriptions.Travel)
                        amount = getRandomTransactionAmount(100, 500)
                        break
                    default:
                        description = getRandomCategoryOrDescription(categoryDescriptions.Food)
                        amount = getRandomTransactionAmount(15, 50)
                        break
                }

                const dailyExpense = { amount, category, date, description, type: TransactionType.ONE_TIME, userId }
                expenses.push(dailyExpense)
            }
        }
    })

    try {
        const result = await prisma.expense.createMany({
            data: expenses,
        })
        console.log(`Successfully Inserted ${result.count} Daily Transaction Records To Expenses Table\n`)
        return result
    } catch (error) {
        console.error("Error Inserting Daily Transaction Records To Expenses Table", error)
        throw error
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
        await createRecurringExpenses(gmailUserId)
        await createRecurringIncomes(gmailUserId)
        await createDailyTransactions(gmailUserId)

        await createTrades(outlookUserId)
        await createFakeRecurringExpenses(outlookUserId, 10)
        await createFakeRecurringIncomes(outlookUserId, 20)
        await createDailyTransactions(outlookUserId)
    } catch (error) {
        console.error("Error Seeding Database: ", error)
    }
}

seedDatabase()
    .then((_) => console.log("Successfully Seeded Database"))
    .catch((e) => console.error("Error Seeding Database", e))
