"use server"

import prisma from "@/lib/database/prisma"

export default async function getTransactionById(id: string) {
    try {
        return await prisma.transaction.findUnique({
            where: {
                id,
            },
        })
    } catch (error) {
        console.error(`Error Fetching Transaction With Id ${id}: ${error}`)
        return null
    } finally {
        prisma.$disconnect()
    }
}
