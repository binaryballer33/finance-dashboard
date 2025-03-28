import { z as zod } from "zod"

export const RegisterRequestSchema = zod
    .object({
        confirmPassword: zod.string().min(6, { message: "Password Should Be At Least 6 Characters" }),
        email: zod
            .string()
            .min(5, { message: "Email Must Be At Least 5 Characters!" })
            .email({ message: "Email Must Be A Valid Email Address!" }),
        firstName: zod.string().min(1, { message: "First Name Is Required" }),
        lastName: zod.string().min(1, { message: "Last Name Is Required" }),
        password: zod.string().min(6, { message: "Password Should Be At Least 6 Characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        // Add a custom validation rule to ensure the password and confirmPassword fields match
        message: "Your Passwords Don't Match",
        path: ["confirmPassword"],
    })

export type RegisterRequest = zod.infer<typeof RegisterRequestSchema>

// TODO: add terms and conditions later
export const defaultValuesRegisterRequest = {
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
} satisfies RegisterRequest
