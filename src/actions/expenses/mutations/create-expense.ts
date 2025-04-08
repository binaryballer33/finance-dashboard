"use server"

import type { Expense as PrismaExpense } from "@prisma/client"

import { revalidatePath } from "next/cache"

import prisma from "@/lib/database/prisma"

import routes from "@/routes/routes"

type Expense = Omit<PrismaExpense, "createdAt" | "id" | "updatedAt">

export default async function createExpense(expense: Expense) {
    try {
        const createdExpense = await prisma.expense.create({
            data: expense,
        })
        revalidatePath(routes.user.expenses)
        return createdExpense
    } catch (error) {
        console.error(`Error Creating Expense: ${error}`)
        return null
    }
}
