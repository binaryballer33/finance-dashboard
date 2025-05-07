"use server"

import type { Expense as PrismaExpense } from "@prisma/client"

import { revalidatePath } from "next/cache"

import prisma from "@/lib/database/prisma"

import routes from "@/routes/routes"

type Expense = Omit<PrismaExpense, "createdAt" | "id" | "updatedAt">

export default async function createManyExpenses(expenses: Expense[]) {
    try {
        const createdExpense = await prisma.expense.createMany({
            data: expenses,
        })
        revalidatePath(routes.user.expenses)
        return createdExpense
    } catch (error) {
        console.error(`Error Creating Expenses: ${error}`)
        return null
    }
}
