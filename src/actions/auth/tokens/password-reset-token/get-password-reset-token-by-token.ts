"use server"

import type { ServerResponse } from "@/types/auth/server-response"

import VerifyIdSchema from "@/types/forms/verify-id"

import prisma from "@/lib/database/prisma"

export default async function getPasswordResetTokenByToken(token: string): Promise<ServerResponse> {
    try {
        const { id: validatedToken } = VerifyIdSchema.parse({ id: token })

        const passwordResetToken = await prisma.passwordResetToken.findUnique({
            where: {
                token: validatedToken,
            },
        })

        if (!passwordResetToken) return { error: "Error Getting Password Reset Token", status: 400 }
        return { status: 200, success: "Successfully Retrieved Password Reset Token", token: passwordResetToken }
    } catch (error) {
        console.error(`Error Getting Password Reset Token With Token ${token}: ${error}`)
        return { error: "Error Getting Password Reset Token", status: 400 }
    }
}
