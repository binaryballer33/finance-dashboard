"use server"

import prisma from "@/lib/database/prisma"

export default async function getTransactions(page = 0, limit = 100) {
    const skipPreviousRecords = page * limit

    try {
        return await prisma.transaction.findMany({
            skip: skipPreviousRecords,
            take: limit,
        })
    } catch (error) {
        console.error(`Error Fetching Transactions: ${error}`)
        return null
    } finally {
        prisma.$disconnect()
    }
}
