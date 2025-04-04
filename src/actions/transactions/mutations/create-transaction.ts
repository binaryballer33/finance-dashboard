"use server"

import type { Transaction as PrismaTransaction } from "@prisma/client"

import prisma from "@/lib/database/prisma"

type Transaction = Omit<PrismaTransaction, "createdAt" | "id" | "updatedAt">

export default async function createTransaction(transaction: Transaction) {
    try {
        return await prisma.transaction.create({
            data: transaction,
        })
    } catch (error) {
        console.error(`Error Creating Transaction: ${error}`)
        return null
    } finally {
        prisma.$disconnect()
    }
}
