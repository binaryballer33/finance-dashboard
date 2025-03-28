"use server"

import type { ServerResponse } from "@/types/auth/server-response"

import { randomInt, randomUUID } from "crypto"

import prisma from "@/lib/database/prisma"

import deleteVerificationTokenById from "@/actions/auth/tokens/verification-token/delete-verification-token-by-id"
import getVerificationTokenByEmail from "@/actions/auth/tokens/verification-token/get-verification-token-by-email"

export default async function createVerificationToken(email: string): Promise<ServerResponse> {
    const token = randomUUID()
    const sixDigitCode = randomInt(100_000, 1_000_000)
    const expires = new Date(new Date().getTime() + 15 * 60 * 1000) // expires in 1 hour

    try {
        // if a token exists for the email, delete it so we can create a new one
        const tokenResponse = await getVerificationTokenByEmail(email)
        if ("token" in tokenResponse) {
            if (tokenResponse.token.id) await deleteVerificationTokenById(tokenResponse.token.id)
        }

        const verificationToken = await prisma.verificationToken.create({
            data: {
                email,
                expires,
                sixDigitCode,
                token,
            },
        })
        if (!verificationToken) return { error: `Error Creating Verification Token For Email ${email}`, status: 500 }

        return {
            status: 200,
            success: `Successfully Created Verification Token For Email: ${email}`,
            token: verificationToken,
        }
    } catch (error) {
        console.error(`Error Creating Verification Token For Email: ${email}: ${error}`)
        return { error: `Error Creating Verification Token For Email: ${email}`, status: 500 }
    }
}
