"use server"

import type { ServerResponse } from "@/types/auth/server-response"

import VerifyEmailRequestSchema from "@/types/forms/verify-email-request"

import { Resend } from "resend"

import { RESEND_API_KEY } from "@/lib/secrets"

const resend = new Resend(RESEND_API_KEY)

export default async function sendResetPasswordConfirmationEmail(email: string): Promise<ServerResponse> {
    try {
        const { email: validatedEmail } = VerifyEmailRequestSchema.parse({ email })

        // TODO: can only send to your email unless you add domain ( implement this later )
        const emailResponse = await resend.emails.send({
            from: "onboarding@resend.dev",
            subject: "Your Password Has Been Reset",
            text: `Your Password Has Been Reset. If You Did Not Request This Change, Please Contact Support: +1(813)-813-8133`,
            to: validatedEmail,
        })
        if (!emailResponse?.data?.id) return { error: "Error Sending Password Reset Confirmation Email", status: 500 }

        return {
            email: emailResponse.data.id,
            status: 200,
            success: `Successfully Sent Password Reset Confirmation Email To:\n ${validatedEmail}`,
        }
    } catch (error) {
        console.error(`Error Sending Password Reset Email To ${email}: ${error}`)
        return { error: "Error Sending Password Reset Confirmation Email", status: 500 }
    }
}
