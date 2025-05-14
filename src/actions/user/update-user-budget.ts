"use server"

import type { ServerResponse } from "@/types/auth/server-response"
import type { UserBudget } from "@/types/forms/user-budget"

import { UserBudgetSchema } from "@/types/forms/user-budget"
import VerifyUUIDSchema from "@/types/forms/verify-id"

import prisma from "@/lib/database/prisma"

export default async function updateUserBudget(userId: string, formData: UserBudget): Promise<ServerResponse> {
    try {
        const { id: validatedUserId } = VerifyUUIDSchema.parse({ id: userId })
        const { budgetAmount } = UserBudgetSchema.parse(formData)

        const user = await prisma.user.update({
            data: { budgetAmount },
            where: { id: validatedUserId },
        })

        // remove encrypted password from user object
        user.encryptedPassword = ""

        if (!user) return { error: `Error Updating Budget`, status: 400 }
        return { status: 200, success: `Successfully Updated Budget`, user }
    } catch (error) {
        console.error(`Error Updating User Budget: ${error}`)
        return { error: "Error Updating User Budget", status: 400 }
    }
}
