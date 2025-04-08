"use server"

import type { Income as PrismaIncome } from "@prisma/client"

import { revalidatePath } from "next/cache"

import prisma from "@/lib/database/prisma"

import routes from "@/routes/routes"

type Income = Omit<PrismaIncome, "createdAt" | "updatedAt">

export default async function updateIncome(income: Income) {
    try {
        const updatedIncome = await prisma.income.update({
            data: {
                amount: income.amount,
                category: income.category,
                date: income.date,
                description: income.description,
            },
            where: {
                id: income.id,
            },
        })

        revalidatePath(routes.user.income)
        return updatedIncome
    } catch (error) {
        console.error("Error Updating Income:", error)
        throw new Error("Failed To Update Income")
    }
}
