"use server"

import type { Transaction as PrismaTransaction } from "@prisma/client"

import { revalidatePath } from "next/cache"

import prisma from "@/lib/database/prisma"

import routes from "@/routes/routes"

type Transaction = Omit<PrismaTransaction, "createdAt" | "updatedAt">

export default async function updateTransaction(transaction: Transaction) {
    try {
        const updatedTransaction = await prisma.transaction.update({
            data: {
                amount: transaction.amount,
                category: transaction.category,
                date: transaction.date,
                description: transaction.description,
            },
            where: {
                id: transaction.id,
            },
        })

        revalidatePath(routes.user.transactions)
        return updatedTransaction
    } catch (error) {
        console.error("Error Updating Transaction:", error)
        throw new Error("Failed To Update Transaction")
    }
}
