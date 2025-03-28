"use server"

import type { ServerResponse } from "@/types/auth/server-response"

import VerifyIdSchema from "@/types/forms/verify-id"

import prisma from "@/lib/database/prisma"

export default async function getTwoFactorTokenByToken(token: string): Promise<ServerResponse> {
    try {
        const { id: validatedToken } = VerifyIdSchema.parse({ id: token })

        const passwordResetToken = await prisma.twoFactorToken.findUnique({
            where: {
                token: validatedToken,
            },
        })

        if (!passwordResetToken) return { error: "Error Getting Two Factor Token", status: 400 }
        return { status: 200, success: "Successfully Retrieved Two Factor Token", token: passwordResetToken }
    } catch (error) {
        console.error(`Error Getting Two Factor Token With Token ${token}: ${error}`)
        return { error: "Error Getting Two Factor Token", status: 400 }
    }
}
