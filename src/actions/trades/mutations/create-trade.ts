"use server"

import type { Trade as PrismaTrade } from "@prisma/client"

import { revalidatePath } from "next/cache"

import prisma from "@/lib/database/prisma"

import routes from "@/routes/routes"

type Trade = Omit<PrismaTrade, "createdAt" | "id" | "updatedAt">

export default async function createTrade(trade: Trade) {
    try {
        const createdTrade = await prisma.trade.create({
            data: trade,
        })
        revalidatePath(routes.user.investments)
        return createdTrade
    } catch (error) {
        console.error(`Error Creating Trade: ${error}`)
        return null
    }
}
