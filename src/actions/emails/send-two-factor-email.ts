"use server"

import type { ServerResponse } from "@/types/auth/server-response"

import VerifyEmailRequestSchema from "@/types/forms/verify-email-request"

import { Resend } from "resend"

import { RESEND_API_KEY } from "@/lib/secrets"

const resend = new Resend(RESEND_API_KEY)

export default async function sendTwoFactorEmail(email: string, code: number): Promise<ServerResponse> {
    try {
        const { email: validatedEmail } = VerifyEmailRequestSchema.parse({ email })

        // TODO: can only send to your email unless you add domain ( implement this later )
        const emailResponse = await resend.emails.send({
            from: "onboarding@resend.dev",
            subject: "Your Two Factor Authentication Code",
            text: `Your Two Factor Authentication Code: ${code}`,
            to: validatedEmail,
        })
        if (!emailResponse?.data?.id) return { error: "Error Sending Two Factor Email", status: 500 }

        return {
            email: emailResponse.data.id,
            status: 200,
            success: `Successfully Sent Two Factor Email To:\n ${validatedEmail}`,
        }
    } catch (error) {
        console.error(`Error Sending Two Factor Email To ${email}: ${error}`)
        return { error: "Error Sending Two Factor Email", status: 500 }
    }
}
