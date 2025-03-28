import { z as zod } from "zod"

export const ResetPasswordSchema = zod
    .object({
        confirmPassword: zod.string().min(6, { message: "New Confirmation Password Must Be At Least 6 Characters!" }),
        password: zod.string().min(6, { message: "New Password Must Be At Least 6 Characters!" }),
        sixDigitCode: zod.string().length(6, { message: "Code Must Be At Least 6 Digits" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        // Add a custom validation rule to ensure the password and confirmPassword fields match
        message: "Your Passwords Don't Match",
        path: ["confirmPassword"],
    })

export type ResetPassword = zod.infer<typeof ResetPasswordSchema>

export const defaultValuesResetPassword = {
    confirmPassword: "",
    password: "",
    sixDigitCode: "",
} satisfies ResetPassword
