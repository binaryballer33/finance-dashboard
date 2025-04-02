"use server"

import type { Income } from "@prisma/client"

import VerifyUUIDSchema from "@/types/forms/verify-id"

import prisma from "@/lib/database/prisma"

export default async function getIncomeByUserId(
    userId: string,
    skipPreviousRecords = 0,
    limit = 100,
): Promise<Income[] | null> {
    const { id: validatedUserId } = VerifyUUIDSchema.parse({ id: userId })

    try {
        return await prisma.income.findMany({
            orderBy: { amount: "desc" },
            skip: skipPreviousRecords,
            take: limit,
            where: {
                userId: validatedUserId,
            },
        })
    } catch (error) {
        console.error(`Error Retrieving Incomes With User Id ${validatedUserId}: ${error}`)
        return null
    } finally {
        prisma.$disconnect()
    }
}
