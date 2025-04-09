"use server"

import type { Trade as PrismaTrade } from "@prisma/client"

import { revalidatePath } from "next/cache"

import prisma from "@/lib/database/prisma"

import routes from "@/routes/routes"

type Trade = Omit<PrismaTrade, "createdAt" | "updatedAt">

export default async function deleteTrade(trade: Trade) {
    try {
        const deletedTrade = await prisma.trade.delete({
            where: {
                id: trade.id,
            },
        })
        revalidatePath(routes.user.investments)
        return deletedTrade
    } catch (error) {
        console.error(`Error Deleting Trade: ${error}`)
        return null
    }
}
