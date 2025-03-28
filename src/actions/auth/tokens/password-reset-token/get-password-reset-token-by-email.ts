"use server"

import type { ServerResponse } from "@/types/auth/server-response"

import VerifyEmailRequestSchema from "@/types/forms/verify-email-request"

import prisma from "@/lib/database/prisma"

export default async function getPasswordResetTokenByEmail(email: string): Promise<ServerResponse> {
    try {
        const { email: validatedEmail } = VerifyEmailRequestSchema.parse({ email })

        const token = await prisma.passwordResetToken.findFirst({
            where: {
                email: validatedEmail,
            },
        })

        if (!token) return { error: `Error Getting Password Reset Token For ${email}, Does User Exist`, status: 500 }
        return {
            status: 200,
            success: `Successfully Retrieved Password Reset Token For Email: ${validatedEmail}`,
            token,
        }
    } catch (error) {
        console.error(`Error Getting Password Reset Token For Email ${email}: ${error}`)
        return { error: `Error Getting Password Reset Token For Email: ${email}, Does User Exist`, status: 500 }
    }
}
