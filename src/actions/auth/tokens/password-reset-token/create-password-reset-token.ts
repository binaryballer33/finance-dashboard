"use server"

import type { ServerResponse } from "@/types/auth/server-response"

import { randomInt, randomUUID } from "crypto"

import prisma from "@/lib/database/prisma"

import deletePasswordResetTokenById from "@/actions/auth/tokens/password-reset-token/delete-password-reset-token-by-id"
import getPasswordResetTokenByEmail from "@/actions/auth/tokens/password-reset-token/get-password-reset-token-by-email"

export default async function createPasswordResetToken(email: string): Promise<ServerResponse> {
    const token = randomUUID()
    const sixDigitCode = randomInt(100_000, 1_000_000)
    const expires = new Date(new Date().getTime() + 15 * 60 * 1000) // expires in 1 hour

    try {
        // if a token exists for the email, delete it so we can create a new one
        const tokenResponse = await getPasswordResetTokenByEmail(email)
        if ("token" in tokenResponse) {
            if (tokenResponse.token.id) await deletePasswordResetTokenById(tokenResponse.token.id)
        }

        const passwordResetToken = await prisma.passwordResetToken.create({
            data: {
                email,
                expires,
                sixDigitCode,
                token,
            },
        })
        if (!passwordResetToken) return { error: `Error Creating Password Reset Token For Email ${email}`, status: 500 }

        return {
            status: 200,
            success: `Successfully Created Password Reset Token For Email: ${email}`,
            token: passwordResetToken,
        }
    } catch (error) {
        console.error(`Error Creating Password Reset Token For Email: ${email}: ${error}`)
        return { error: `Error Creating Password Reset Token For Email: ${email}`, status: 500 }
    }
}
