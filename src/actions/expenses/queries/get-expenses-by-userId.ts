"use server"

import type { Expense } from "@prisma/client"

import VerifyUUIDSchema from "@/types/forms/verify-id"

import prisma from "@/lib/database/prisma"

export default async function getExpensesByUserId(
    userId: string,
    skipPreviousRecords = 0,
    limit = 1000,
): Promise<Expense[] | null> {
    const { id: validatedUserId } = VerifyUUIDSchema.parse({ id: userId })

    try {
        const expenses = await prisma.expense.findMany({
            orderBy: [{ date: "desc" }, { id: "asc" }],
            skip: skipPreviousRecords,
            take: limit,
            where: {
                userId: validatedUserId,
            },
        })
        return expenses
    } catch (error) {
        console.error(`Error Retrieving Expenses With User Id ${validatedUserId}: ${error}`)
        return null
    }
}
