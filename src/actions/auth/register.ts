"use server"

import type { ServerResponse } from "@/types/auth/server-response"
import type { RegisterRequest } from "@/types/forms/register"

import { RegisterRequestSchema } from "@/types/forms/register"

import { revalidatePath } from "next/cache"

import { hash } from "bcryptjs"

import prisma from "@/lib/database/prisma"

import createVerificationToken from "@/actions/auth/tokens/verification-token/create-verification-token"
import sendAccountVerificationEmail from "@/actions/emails/send-account-verification-email"
import getUserByEmail from "@/actions/user/get-user-by-email"

export default async function register(credentials: RegisterRequest): Promise<ServerResponse> {
    try {
        // validate the users credentials from the form using zod, throw error if data sent from front end is invalid
        const { email, firstName, lastName, password } = RegisterRequestSchema.parse(credentials)

        const hashedPassword = await hash(password, 10)
        const placeholderImage = ""

        // check if the user already exists with that email, if user exists don't try to create the user
        const userResponse = await getUserByEmail(email)
        if ("user" in userResponse) return { error: "User Already Exists", status: 500 }

        // TODO: add terms and conditions later
        const registeredUser = await prisma.user.create({
            data: {
                email,
                encryptedPassword: hashedPassword, // MAKE SURE HASHED PW IS STORED, NOT PLAINTEXT
                firstName,
                image: placeholderImage,
                imageUrl: placeholderImage,
                lastName,
            },
        })
        if (!registeredUser) return { error: `Error Creating User Account for ${email}`, status: 500 }

        // create verification token and make sure it was created
        const tokenResponse = await createVerificationToken(registeredUser.email)
        if (!("token" in tokenResponse)) return tokenResponse

        // send the verification email to the newly created user and make sure it was sent
        const emailResponse = await sendAccountVerificationEmail(tokenResponse.token)
        if (!("success" in emailResponse)) return emailResponse

        // remove hashed password from response
        registeredUser.encryptedPassword = null
        revalidatePath("/")

        return {
            status: 200,
            success: `Successfully Created Account\n\nSent Account Verification Email To ${email}`,
            user: registeredUser,
        }
    } catch (error) {
        console.error(`Error Registering User: ${error}`)
        return { error: "Something Went Wrong While Creating Your Account", status: 500 }
    }
}
