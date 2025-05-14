"use server"

import type { ServerResponse } from "@/types/auth/server-response"
import type { UserSecuritySettings } from "@/types/forms/user-security-settings"

import { UserSecuritySettingsSchema } from "@/types/forms/user-security-settings"
import VerifyUUIDSchema from "@/types/forms/verify-id"

import prisma from "@/lib/database/prisma"

export default async function updateUserSecuritySettings(
    userId: string,
    formData: UserSecuritySettings,
): Promise<ServerResponse> {
    try {
        const { id: validatedUserId } = VerifyUUIDSchema.parse({ id: userId })
        const { isTwoFactorEnabled } = UserSecuritySettingsSchema.parse(formData)

        const user = await prisma.user.update({
            data: { isTwoFactorEnabled },
            where: { id: validatedUserId },
        })

        // remove encrypted password from user object
        user.encryptedPassword = ""

        if (!user) return { error: `Error Updating Security Settings`, status: 400 }
        return { status: 200, success: `Successfully Updated Security Settings`, user }
    } catch (error) {
        console.error(`Error Updating User Security Settings: ${error}`)
        return { error: "Error Updating User Security Settings", status: 400 }
    }
}
