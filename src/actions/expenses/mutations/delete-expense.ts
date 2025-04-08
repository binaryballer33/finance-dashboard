"use server"

import type { Expense as PrismaExpense } from "@prisma/client"

import { revalidatePath } from "next/cache"

import prisma from "@/lib/database/prisma"

import routes from "@/routes/routes"

type Expense = Omit<PrismaExpense, "createdAt" | "updatedAt">

export default async function deleteExpense(expense: Expense) {
    try {
        const deletedExpense = await prisma.expense.delete({
            where: {
                id: expense.id,
            },
        })
        revalidatePath(routes.user.expenses)
        return deletedExpense
    } catch (error) {
        console.error(`Error Deleting Expense: ${error}`)
        return null
    }
}
