"use server"

import type { ServerResponse } from "@/types/auth/server-response"

import VerifyIdSchema from "@/types/forms/verify-id"

import prisma from "@/lib/database/prisma"

export default async function deleteTwoFactorConfirmationByUserId(userId: string): Promise<ServerResponse> {
    try {
        const { id: validatedUserId } = VerifyIdSchema.parse({ id: userId })

        const twoFactorConfirmation = await prisma.twoFactorConfirmation.delete({
            where: {
                userId: validatedUserId,
            },
        })
        if (!twoFactorConfirmation) return { error: "Error Deleting Two Factor Confirmation", status: 500 }

        return {
            confirmation: twoFactorConfirmation,
            status: 200,
            success: `Successfully Deleted Two Factor Confirmation`,
        }
    } catch (error) {
        console.error(`Error Deleting Two Factor Confirmation With User Id ${userId}: ${error}`)
        return { error: "Error Deleting Two Factor Confirmation", status: 500 }
    }
}
