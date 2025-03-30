import type { Transaction as PrismaTransaction } from "@prisma/client"

import { PrismaClient } from "@prisma/client"

type Transaction = Omit<PrismaTransaction, "createdAt" | "id" | "updatedAt">

const prisma = new PrismaClient()

export default async function createTransactions(userId: string, count: number = 100) {
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

// Example usage:
// await generateRandomTransactions('user-id-here', 100)
