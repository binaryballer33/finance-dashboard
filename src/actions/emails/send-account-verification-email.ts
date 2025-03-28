"use server"

import type { ServerResponse } from "@/types/auth/server-response"
import type { VerificationToken } from "@prisma/client"

import VerifyTokenSchema from "@/types/forms/verify-token"

import { Resend } from "resend"

import { RESEND_API_KEY } from "@/lib/secrets"

import routes, { getFullRoute } from "@/routes/routes"

const resend = new Resend(RESEND_API_KEY)

export default async function sendAccountVerificationEmail(
    verificationToken: VerificationToken,
): Promise<ServerResponse> {
    try {
        const { email, sixDigitCode, token } = VerifyTokenSchema.parse(verificationToken)

        const confirmationLink = getFullRoute(routes.auth.verifyEmail, `token=${token}`, `email=${email}`)

        // TODO: can only send to your email unless you add domain ( implement this later )
        const emailResponse = await resend.emails.send({
            from: "onboarding@resend.dev",
            subject: "Confirm Your Email",
            text: `Click The Link Below To Confirm Your Email:\n${confirmationLink}\n\nYour Confirmation Code Is: ${sixDigitCode}`,
            to: email,
        })
        console.log(emailResponse)

        if (!emailResponse?.data) return { error: `Error Sending Account Verification Email To: ${email}`, status: 500 }

        return {
            email: emailResponse.data.id,
            status: 200,
            success: `Account Not Yet Verified\nSuccessfully Sent Account Verification Email To: ${email}`,
        }
    } catch (error) {
        console.error(`Error Sending Account Verification Email To: ${verificationToken.email}: ${error}`)
        return { error: `Error Sending Account Verification Email To: ${verificationToken.email}`, status: 500 }
    }
}
