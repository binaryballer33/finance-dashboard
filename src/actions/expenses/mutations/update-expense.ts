"use server"

import type { Expense as PrismaExpense } from "@prisma/client"

import { revalidatePath } from "next/cache"

import prisma from "@/lib/database/prisma"

import routes from "@/routes/routes"

type Expense = Omit<PrismaExpense, "createdAt" | "updatedAt">

export default async function updateExpense(expense: Expense) {
    try {
        const updatedExpense = await prisma.expense.update({
            data: {
                amount: expense.amount,
                category: expense.category,
                date: expense.date,
                description: expense.description,
            },
            where: {
                id: expense.id,
            },
        })

        revalidatePath(routes.user.expenses)
        return updatedExpense
    } catch (error) {
        console.error("Error Updating Expense:", error)
        throw new Error("Failed To Update Expense")
    }
}
