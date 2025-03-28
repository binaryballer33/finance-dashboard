"use server"

import type { ServerResponse } from "@/types/auth/server-response"

import VerifyEmailRequestSchema from "@/types/forms/verify-email-request"

import prisma from "@/lib/database/prisma"

export default async function getUserByEmail(email: string): Promise<ServerResponse> {
    try {
        const { email: validatedEmail } = VerifyEmailRequestSchema.parse({ email })

        const user = await prisma.user.findUnique({
            where: {
                email: validatedEmail,
            },
        })
        if (!user) return { error: `No Account Found With Email: ${validatedEmail}`, status: 400 }

        return { status: 200, success: `Successfully Retrieved User With Email: ${validatedEmail}`, user }
    } catch (error) {
        console.error(`Error Getting User With Email ${email}: ${error}`)
        return { error: `Error Getting User With Email: ${email}`, status: 400 }
    }
}
