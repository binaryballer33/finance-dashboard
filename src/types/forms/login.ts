import { z as zod } from "zod"

export const LoginRequestSchema = zod.object({
    email: zod
        .string()
        .min(5, { message: "Email Must Be At Least 5 Characters!" })
        .email({ message: "Email Must Be A Valid Email Address!" }),
    password: zod.string().min(6, { message: "Password Must Be At Least 6 Characters" }),
    sixDigitCode: zod.string().length(6, { message: "Code Must Be 6 Digits" }).optional(),
})

export type LoginRequest = zod.infer<typeof LoginRequestSchema>

export const defaultValuesLoginRequest = {
    email: "",
    password: "",
} satisfies LoginRequest
