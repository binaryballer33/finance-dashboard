"use server"

import prisma from "@/lib/database/prisma"

export default async function getAllTransactionsById(userId: string, skipPreviousRecords = 0, limit = 100) {
    try {
        return await prisma.transaction.findMany({
            skip: skipPreviousRecords,
            take: limit,
            where: {
                userId,
            },
        })
    } catch (error) {
        console.error(`Error Fetching Transactions With User Id ${userId}: ${error}`)
        return null
    } finally {
        prisma.$disconnect()
    }
}
