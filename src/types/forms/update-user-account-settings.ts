import { z } from "zod"

export const UserSettingsSchema = z.object({
    firstName: z.string().min(1, { message: "First Name Is Required" }),
    lastName: z.string().min(1, { message: "Last Name Is Required" }),
})

export type UserSettings = z.infer<typeof UserSettingsSchema>

export const defaultValues: UserSettings = {
    firstName: "",
    lastName: "",
}
