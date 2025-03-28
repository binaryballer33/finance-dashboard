"use server"

import type { ServerResponse } from "@/types/auth/server-response"

import VerifyIdSchema from "@/types/forms/verify-id"

import prisma from "@/lib/database/prisma"

export default async function createTwoFactorConfirmation(id: string): Promise<ServerResponse> {
    const { id: validatedId } = VerifyIdSchema.parse({ id })

    try {
        const twoFactorConfirmation = await prisma.twoFactorConfirmation.create({
            data: { userId: validatedId },
        })

        if (!twoFactorConfirmation) return { error: `Error Creating Two Factor Confirmation`, status: 500 }

        return {
            confirmation: twoFactorConfirmation,
            status: 200,
            success: `Successfully Created Two Factor Confirmation`,
        }
    } catch (error) {
        console.error(`Error Creating Two Factor Confirmation: ${error}`)
        return { error: `Error Creating Two Factor Confirmation`, status: 500 }
    }
}
