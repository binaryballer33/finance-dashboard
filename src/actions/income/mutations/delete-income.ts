"use server"

import type { Income as PrismaIncome } from "@prisma/client"

import { revalidatePath } from "next/cache"

import prisma from "@/lib/database/prisma"

import routes from "@/routes/routes"

type Income = Omit<PrismaIncome, "createdAt" | "updatedAt">

export default async function deleteIncome(income: Income) {
    try {
        const deletedIncome = await prisma.income.delete({
            where: {
                id: income.id,
            },
        })
        revalidatePath(routes.user.income)
        return deletedIncome
    } catch (error) {
        console.error(`Error Deleting Income: ${error}`)
        return null
    }
}
