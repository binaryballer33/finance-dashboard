import { z as zod } from "zod"

export const VerifyEmailSchema = zod.object({
    email: zod
        .string()
        .min(5, { message: "Email Must Be At Least 5 Characters!" })
        .email({ message: "Email Must Be A Valid Email Address!" }),
    sixDigitCode: zod.string().length(6, { message: "Code Must Be At Least 6 Digits" }),
})

export type VerifyEmail = zod.infer<typeof VerifyEmailSchema>

export const defaultValuesVerifyEmail = {
    email: "",
    sixDigitCode: "",
} satisfies VerifyEmail
