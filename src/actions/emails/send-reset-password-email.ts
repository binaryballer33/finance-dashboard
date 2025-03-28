"use server"

import type { ServerResponse } from "@/types/auth/server-response"
import type { PasswordResetToken } from "@prisma/client"

import VerifyTokenSchema from "@/types/forms/verify-token"

import { Resend } from "resend"

import { RESEND_API_KEY } from "@/lib/secrets"

import routes, { getFullRoute } from "@/routes/routes"

const resend = new Resend(RESEND_API_KEY)

export default async function sendResetPasswordEmail(passwordResetToken: PasswordResetToken): Promise<ServerResponse> {
    try {
        const { email, sixDigitCode, token } = VerifyTokenSchema.parse(passwordResetToken)

        const resetPasswordLink = getFullRoute(routes.auth.resetPassword, `token=${token}`)

        // TODO: can only send to your email unless you add domain ( implement this later )
        const emailResponse = await resend.emails.send({
            from: "onboarding@resend.dev",
            subject: "Reset Your Password",
            text: `Click The Link Below To Reset Your Password:\n${resetPasswordLink}\n\nYour Confirmation Code Is: ${sixDigitCode}`,
            to: email,
        })
        if (!emailResponse?.data?.id) return { error: "Error Sending Password Reset Email", status: 500 }

        return {
            email: emailResponse.data.id,
            status: 200,
            success: `Successfully Sent Password Reset Email To:\n ${email}`,
        }
    } catch (error) {
        console.error(`Error Sending Password Reset Email To ${passwordResetToken.email}: ${error}`)
        return { error: "Error Sending Password Reset Email", status: 500 }
    }
}
