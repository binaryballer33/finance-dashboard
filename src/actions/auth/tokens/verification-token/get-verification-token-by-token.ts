"use server"

import type { ServerResponse } from "@/types/auth/server-response"

import VerifyUUIDSchema from "@/types/forms/verify-id"

import prisma from "@/lib/database/prisma"

export default async function getVerificationTokenByToken(token: string): Promise<ServerResponse> {
    try {
        const { id: validatedToken } = VerifyUUIDSchema.parse({ id: token })

        const verificationToken = await prisma.verificationToken.findUnique({
            where: {
                token: validatedToken,
            },
        })

        if (!verificationToken) return { error: "Error Getting Verification Token", status: 400 }
        return { status: 200, success: "Successfully Retrieved Verification Token", token: verificationToken }
    } catch (error) {
        console.error(`Error Getting Verification Token With Token ${token}: ${error}`)
        return { error: "Error Getting Verification Token", status: 400 }
    }
}
