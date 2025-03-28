"use server"

import type { ServerResponse } from "@/types/auth/server-response"
import type { LoginRequest } from "@/types/forms/login"

import { LoginRequestSchema } from "@/types/forms/login"

import { signIn } from "@/auth/auth"

import createTwoFactorConfirmation from "@/actions/auth/tokens/two-factor-confirmation/create-two-factor-confirmation"
import deleteTwoFactorConfirmationById from "@/actions/auth/tokens/two-factor-confirmation/delete-two-factor-confirmation-by-id"
import deleteTwoFactorConfirmationByUserId from "@/actions/auth/tokens/two-factor-confirmation/delete-two-factor-confirmation-by-userId"
import getTwoFactorConfirmationByUserId from "@/actions/auth/tokens/two-factor-confirmation/get-two-factor-confirmation-by-userId"
import createTwoFactorToken from "@/actions/auth/tokens/two-factor-token/create-two-factor-token"
import deleteTwoFactorTokenById from "@/actions/auth/tokens/two-factor-token/delete-two-factor-token-by-id"
import getTwoFactorTokenByEmail from "@/actions/auth/tokens/two-factor-token/get-two-factor-token-by-email"
import createVerificationToken from "@/actions/auth/tokens/verification-token/create-verification-token"
import sendAccountVerificationEmail from "@/actions/emails/send-account-verification-email"
import sendTwoFactorEmail from "@/actions/emails/send-two-factor-email"
import getUserByEmail from "@/actions/user/get-user-by-email"

export default async function login(credentials: LoginRequest): Promise<ServerResponse> {
    try {
        // validate the users credentials from the form using zod, throw error if data sent from front end is invalid
        const { email, password, sixDigitCode } = LoginRequestSchema.parse(credentials)

        // check if user already exists and has an email and password before attempting to log in
        const userResponse = await getUserByEmail(email)
        if (!("user" in userResponse)) return userResponse
        const { user: existingUser } = userResponse

        // if user doesn't exists or doesn't have an email or password, return error
        if (!existingUser || !existingUser.encryptedPassword || !existingUser.email) {
            return {
                error: "Invalid Credentials, Maybe You Created Your Account With Google Or Facebook?",
                status: 400,
            }
        }

        // if user email not verified, generate token for user and send verification email
        if (!existingUser.emailVerified) {
            // create verification token and make sure it was created
            const responseVerificationToken = await createVerificationToken(existingUser.email)
            if (!("token" in responseVerificationToken)) return responseVerificationToken

            // if token was created successfully, send verification email
            return await sendAccountVerificationEmail(responseVerificationToken.token)
        }

        // check whether the user is using 2FA or not
        if (existingUser.isTwoFactorEnabled && existingUser.email) {
            if (sixDigitCode) {
                const twoFactorTokenResponse = await getTwoFactorTokenByEmail(existingUser.email)
                if (!("token" in twoFactorTokenResponse)) return twoFactorTokenResponse
                const { token } = twoFactorTokenResponse

                // check if the code from the database and the code given by the user are the same
                if (token.sixDigitCode !== parseInt(sixDigitCode, 10)) return { error: "Invalid Code", status: 403 }

                // check if the token is still valid
                const tokenHasExpired = new Date(token.expires) < new Date()
                if (tokenHasExpired) return { error: "Token Has Expired", status: 403 }

                // delete the token after confirming it is valid
                const deletedTokenResponse = await deleteTwoFactorTokenById(token.id)
                if (!("token" in deletedTokenResponse)) return deletedTokenResponse

                // get the two factor confirmation for the user and if you already have an old one then delete it
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
                if ("confirmation" in twoFactorConfirmation) {
                    const deleteConf = await deleteTwoFactorConfirmationById(twoFactorConfirmation.confirmation.id)
                    if (!("confirmation" in deleteConf)) return deleteConf
                }

                const confirmation = await createTwoFactorConfirmation(existingUser.id)
                if (!("confirmation" in confirmation)) return confirmation
            } else {
                const twoFactorTokenResponse = await createTwoFactorToken(existingUser.email)
                if (!("token" in twoFactorTokenResponse)) return twoFactorTokenResponse
                const { token } = twoFactorTokenResponse

                const emailResponse = await sendTwoFactorEmail(token.email, token.sixDigitCode)
                if (!("email" in emailResponse)) return emailResponse

                // TODO: figure out how to get this to show up on the front end
                // stop the login flow by returning this if 2 factor is enabled, don't return the real sixDigitCode
                return { status: 200, success: "2 Factor Enabled", token: { ...token, sixDigitCode: 999999 } }
            }
        }

        // if user exists and email of the user is already verified, log the user in
        await signIn("credentials", { email, password, redirect: false })

        // after user logs in, if the user has 2FA enabled, delete the two factor confirmation token
        if (existingUser.isTwoFactorEnabled) {
            const deleteConf = await deleteTwoFactorConfirmationByUserId(existingUser.id)
            if (!("confirmation" in deleteConf)) return deleteConf
        }

        return { status: 200, success: "Login Successful", user: { ...existingUser, encryptedPassword: null } }
    } catch (error) {
        console.error("Next Auth Error Logging In With SignIn Credentials Provider:\n", error)
        return { error: "Invalid Credentials", status: 500 }
    }
}
