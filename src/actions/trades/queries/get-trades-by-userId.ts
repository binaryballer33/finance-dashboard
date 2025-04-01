"use server"

import type { Trade } from "@prisma/client"

import VerifyUUIDSchema from "@/types/forms/verify-id"

import prisma from "@/lib/database/prisma"

export default async function getTradesByUserId(
    userId: string,
    skipPreviousRecords = 0,
    limit = 100,
): Promise<null | Trade[]> {
    const { id: validatedUserId } = VerifyUUIDSchema.parse({ id: userId })

    try {
        return await prisma.trade.findMany({
            orderBy: { date: "desc" },
            skip: skipPreviousRecords,
            take: limit,
            where: {
                userId: validatedUserId,
            },
        })
    } catch (error) {
        console.error(`Error Retrieving Trades With User Id ${validatedUserId}: ${error}`)
        return null
    } finally {
        prisma.$disconnect()
    }
}
