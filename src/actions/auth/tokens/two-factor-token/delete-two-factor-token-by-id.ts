"use server"

import type { ServerResponse } from "@/types/auth/server-response"

import VerifyIdSchema from "@/types/forms/verify-id"

import prisma from "@/lib/database/prisma"

export default async function deleteTwoFactorTokenById(id: string): Promise<ServerResponse> {
    try {
        const { id: validatedId } = VerifyIdSchema.parse({ id })

        const tokenResponse = await prisma.twoFactorToken.delete({
            where: {
                id: validatedId,
            },
        })
        if (!tokenResponse) return { error: "Error Deleting Two Factor Token After Two Factor", status: 500 }

        return { status: 200, success: `Successfully Deleted Two Factor Token`, token: tokenResponse }
    } catch (error) {
        console.error(`Error Deleting Two Factor Token With Id ${id}: ${error}`)
        return { error: "Error Deleting Two Factor Token After Password Reset", status: 500 }
    }
}
