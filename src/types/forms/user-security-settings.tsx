import { z } from "zod"

export const UserSecuritySettingsSchema = z.object({
    isTwoFactorEnabled: z.boolean().default(false),
})

export type UserSecuritySettings = z.infer<typeof UserSecuritySettingsSchema>

export const defaultValues: UserSecuritySettings = {
    isTwoFactorEnabled: false,
}
