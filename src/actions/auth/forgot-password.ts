"use server"

import type { ServerResponse } from "@/types/auth/server-response"

import VerifyEmailRequestSchema from "@/types/forms/verify-email-request"

import createPasswordResetToken from "@/actions/auth/tokens/password-reset-token/create-password-reset-token"
import deletePasswordResetTokenById from "@/actions/auth/tokens/password-reset-token/delete-password-reset-token-by-id"
import getPasswordResetTokenByEmail from "@/actions/auth/tokens/password-reset-token/get-password-reset-token-by-email"
import sendResetPasswordEmail from "@/actions/emails/send-reset-password-email"
import getUserByEmail from "@/actions/user/get-user-by-email"

export default async function forgotPassword(email: string): Promise<ServerResponse> {
    try {
        const { email: validatedEmail } = VerifyEmailRequestSchema.parse({ email })

        // see if there is a user in the database that has this email
        const userResponse = await getUserByEmail(validatedEmail)
        if (!("user" in userResponse)) return userResponse

        // delete any existing password reset tokens before creating a new one
        const existingPasswordResetTokenResponse = await getPasswordResetTokenByEmail(userResponse.user.email)
        if ("token" in existingPasswordResetTokenResponse) {
            await deletePasswordResetTokenById(existingPasswordResetTokenResponse.token.id)
        }

        // create a reset token for the user
        const passwordResetTokenResponse = await createPasswordResetToken(userResponse.user.email)
        if (!("token" in passwordResetTokenResponse)) return passwordResetTokenResponse

        return await sendResetPasswordEmail(passwordResetTokenResponse.token)
    } catch (error) {
        console.error(`Error Resetting Password For User With Email ${email}:\n${error}`)
        return { error: `Error Resetting Password For User With Email ${email}`, status: 500 }
    }
}
