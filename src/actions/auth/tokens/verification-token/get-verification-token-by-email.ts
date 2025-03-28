"use server"

import type { ServerResponse } from "@/types/auth/server-response"

import VerifyEmailRequestSchema from "@/types/forms/verify-email-request"

import prisma from "@/lib/database/prisma"

export default async function getVerificationTokenByEmail(email: string): Promise<ServerResponse> {
    try {
        const { email: validatedEmail } = VerifyEmailRequestSchema.parse({ email })

        const token = await prisma.verificationToken.findFirst({
            where: {
                email: validatedEmail,
            },
        })

        if (!token) return { error: `Error Getting Verification Token For Email: ${email}`, status: 500 }
        return { status: 200, success: `Successfully Retrieved Verification Token For Email: ${validatedEmail}`, token }
    } catch (error) {
        console.error(`Error Getting Verification Token For Email ${email}: ${error}`)
        return { error: `Error Getting Verification Token For Email: ${email}`, status: 500 }
    }
}
