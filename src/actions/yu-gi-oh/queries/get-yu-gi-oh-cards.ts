"use server"

import prisma from "@/lib/database/prisma"

export default async function getYugiohCards(page = 0, limit = 100) {
    const skipPreviousRecords = page * limit

    try {
        return await prisma.yugiohCard.findMany({
            skip: skipPreviousRecords,
            take: limit,
        })
    } catch (error) {
        console.error(`Error Fetching Yu-Gi-Oh Cards: ${error}`)
        return null
    } finally {
        prisma.$disconnect()
    }
}
