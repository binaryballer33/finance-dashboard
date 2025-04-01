"use server"

import VerifyUUIDSchema from "@/types/forms/verify-id"

import prisma from "@/lib/database/prisma"

export default async function getTransactionById(transactionId: string) {
    const { id: validatedTransactionId } = VerifyUUIDSchema.parse({ id: transactionId })
    try {
        return await prisma.transaction.findUnique({
            where: {
                id: validatedTransactionId,
            },
        })
    } catch (error) {
        console.error(`Error Fetching Transaction With Id ${validatedTransactionId}: ${error}`)
        return null
    } finally {
        prisma.$disconnect()
    }
}
