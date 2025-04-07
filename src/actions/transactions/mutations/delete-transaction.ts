"use server"

import type { Transaction as PrismaTransaction } from "@prisma/client"

import { revalidatePath } from "next/cache"

import prisma from "@/lib/database/prisma"

import routes from "@/routes/routes"

type Transaction = Omit<PrismaTransaction, "createdAt" | "updatedAt">

export default async function deleteTransaction(transaction: Transaction) {
    try {
        const deletedTransaction = await prisma.transaction.delete({
            where: {
                id: transaction.id,
            },
        })
        revalidatePath(routes.user.transactions)
        return deletedTransaction
    } catch (error) {
        console.error(`Error Deleting Transaction: ${error}`)
        return null
    }
}
