"use server"

import type { ServerResponse } from "@/types/auth/server-response"
import type { ResetPassword } from "@/types/forms/reset-password"

import { ResetPasswordSchema } from "@/types/forms/reset-password"
import VerifyIdSchema from "@/types/forms/verify-id"

import { hash } from "bcryptjs"

import prisma from "@/lib/database/prisma"

import deletePasswordResetTokenById from "@/actions/auth/tokens/password-reset-token/delete-password-reset-token-by-id"
import getPasswordResetTokenByToken from "@/actions/auth/tokens/password-reset-token/get-password-reset-token-by-token"
import sendResetPasswordConfirmationEmail from "@/actions/emails/send-reset-password-confirmation-email"
import getUserByEmail from "@/actions/user/get-user-by-email"

type ResetPasswordParams = {
    token: string
} & ResetPassword

export default async function resetPassword(params: ResetPasswordParams): Promise<ServerResponse> {
    try {
        const { confirmPassword, password, sixDigitCode: validatedCode } = ResetPasswordSchema.parse(params)
        const { id: token } = VerifyIdSchema.parse({ id: params.token })

        if (password !== confirmPassword) return { error: "Passwords Don't Match, Try Again", status: 400 }

        // check if the token is valid
        const existingTokenResponse = await getPasswordResetTokenByToken(token)
        if (!("token" in existingTokenResponse)) return existingTokenResponse

        // check if the token has expired
        const hasExpired = new Date(existingTokenResponse.token.expires) < new Date()
        if (hasExpired) return { error: "Password Reset Token Has Expired, Create A New Token", status: 403 }

        // check if the user exists and that the token is for the correct user
        const userResponse = await getUserByEmail(existingTokenResponse.token.email)
        if (!("user" in userResponse)) return userResponse
        if (userResponse.user.email !== existingTokenResponse.token.email) {
            return {
                error: "User / Token Mismatch",
                status: 403,
            }
        }

        // if credentials are incorrect, don't tell hackers which credential is actually invalid
        const sixDigitCode = parseInt(validatedCode, 10)
        if (sixDigitCode !== existingTokenResponse.token.sixDigitCode) {
            return {
                error: "Invalid Email, Code, And/Or Token",
                status: 403,
            }
        }

        // hash the password from the form and update the user's password
        const hashedPassword = await hash(password, 10)
        const updatedUser = await prisma.user.update({
            data: { encryptedPassword: hashedPassword },
            where: { id: userResponse.user.id },
        })
        if (!updatedUser) return { error: `Error Resetting Password For User: ${userResponse.user.email}`, status: 500 }

        // remove the password reset token after resetting the password
        const tokenResponse = await deletePasswordResetTokenById(existingTokenResponse.token.id)
        if (!("token" in tokenResponse)) return tokenResponse

        // email the user stating that their password has been reset
        const emailResponse = await sendResetPasswordConfirmationEmail(updatedUser.email)
        if (!("email" in emailResponse)) return emailResponse

        return {
            status: 200,
            success: `Successfully Reset Password For ${userResponse.user.email}`,
            token: tokenResponse.token,
        }
    } catch (error) {
        console.error(`Error Resetting User's Password: ${error}`)
        return { error: `Error Resetting User's Password: ${error}`, status: 500 }
    }
}
