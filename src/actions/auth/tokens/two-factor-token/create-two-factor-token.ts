"use server"

import type { ServerResponse } from "@/types/auth/server-response"

import { randomInt, randomUUID } from "crypto"

import prisma from "@/lib/database/prisma"

import deleteTwoFactorTokenById from "@/actions/auth/tokens/two-factor-token/delete-two-factor-token-by-id"
import getTwoFactorTokenByEmail from "@/actions/auth/tokens/two-factor-token/get-two-factor-token-by-email"

export default async function createTwoFactorToken(email: string): Promise<ServerResponse> {
    const token = randomUUID()
    const sixDigitCode = randomInt(100_000, 1_000_000)
    const expires = new Date(new Date().getTime() + 15 * 60 * 1000) // expires in 15 minutes

    // if a token exists for the email, delete it so we can create a new one
    const tokenResponse = await getTwoFactorTokenByEmail(email)
    if ("token" in tokenResponse) {
        if (tokenResponse.token.id) await deleteTwoFactorTokenById(tokenResponse.token.id)
    }

    try {
        const twoFactorToken = await prisma.twoFactorToken.create({
            data: {
                email,
                expires,
                sixDigitCode,
                token,
            },
        })
        if (!twoFactorToken) return { error: `Error Creating Two Factor Token For Email ${email}`, status: 500 }

        return {
            status: 200,
            success: `Successfully Created Two Factor Token For Email: ${email}`,
            token: twoFactorToken,
        }
    } catch (error) {
        console.error(`Error Creating Two Factor Token For Email: ${email}: ${error}`)
        return { error: `Error Creating Two Factor Token For Email: ${email}`, status: 500 }
    }
}
