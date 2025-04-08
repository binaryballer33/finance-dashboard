"use server"

import type { Income as PrismaIncome } from "@prisma/client"

import { revalidatePath } from "next/cache"

import prisma from "@/lib/database/prisma"

import routes from "@/routes/routes"

type Income = Omit<PrismaIncome, "createdAt" | "id" | "updatedAt">

export default async function createIncome(income: Income) {
    try {
        const createdIncome = await prisma.income.create({
            data: income,
        })
        revalidatePath(routes.user.income)
        return createdIncome
    } catch (error) {
        console.error(`Error Creating Income: ${error}`)
        return null
    }
}
