"use server"

import type { Trade as PrismaTrade } from "@prisma/client"

import { revalidatePath } from "next/cache"

import prisma from "@/lib/database/prisma"

import routes from "@/routes/routes"

type Trade = Omit<PrismaTrade, "createdAt" | "updatedAt">

export default async function updateTrade(trade: Trade) {
    try {
        const updatedTrade = await prisma.trade.update({
            data: trade,
            where: {
                id: trade.id,
            },
        })

        revalidatePath(routes.user.investments)
        return updatedTrade
    } catch (error) {
        console.error("Error Updating Trade:", error)
        throw new Error("Failed To Update Trade")
    }
}
