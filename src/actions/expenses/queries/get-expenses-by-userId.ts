"use server"

import type { Expense } from "@prisma/client"

import VerifyUUIDSchema from "@/types/forms/verify-id"

import prisma from "@/lib/database/prisma"

export default async function getExpensesByUserId(
    userId: string,
    skipPreviousRecords = 0,
    limit = 100,
): Promise<Expense[] | null> {
    const { id: validatedUserId } = VerifyUUIDSchema.parse({ id: userId })

    try {
        return await prisma.expense.findMany({
            orderBy: { amount: "asc" },
            skip: skipPreviousRecords,
            take: limit,
            where: {
                userId: validatedUserId,
            },
        })
    } catch (error) {
        console.error(`Error Retrieving Expenses With User Id ${validatedUserId}: ${error}`)
        return null
    }
}
