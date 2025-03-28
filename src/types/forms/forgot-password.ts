import { z as zod } from "zod"

export type ForgotPassword = zod.infer<typeof ForgotPasswordSchema>

export const ForgotPasswordSchema = zod.object({
    email: zod
        .string()
        .min(5, { message: "Email Must Be At Least 5 Characters" })
        .email({ message: "Email Must Be A Valid Email Address!" }),
})

export const defaultValuesForgotPassword = {
    email: "",
} satisfies ForgotPassword
