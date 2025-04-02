"use server"

import VerifyUUIDSchema from "@/types/forms/verify-id"

import prisma from "@/lib/database/prisma"

export default async function getTransactionsByUserId(userId: string, skipPreviousRecords = 0, limit = 100) {
    const { id: validatedUserId } = VerifyUUIDSchema.parse({ id: userId })

    try {
        return await prisma.transaction.findMany({
            orderBy: { createdAt: "desc" },
            skip: skipPreviousRecords,
            take: limit,
            where: {
                userId: validatedUserId,
            },
        })
    } catch (error) {
        console.error(`Error Fetching Transactions With User Id ${validatedUserId}: ${error}`)
        return null
    } finally {
        prisma.$disconnect()
    }
}
