"use server"

import type { Transaction as PrismaTransaction } from "@prisma/client"

import { revalidatePath } from "next/cache"

import prisma from "@/lib/database/prisma"

import routes from "@/routes/routes"

type Transaction = Omit<PrismaTransaction, "createdAt" | "id" | "updatedAt">

export default async function createTransaction(transaction: Transaction) {
    try {
        const createdTransaction = await prisma.transaction.create({
            data: transaction,
        })
        revalidatePath(routes.user.transactions)
        return createdTransaction
    } catch (error) {
        console.error(`Error Creating Transaction: ${error}`)
        return null
    }
}
