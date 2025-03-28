import { z } from "zod"

export const ContactRequestSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
})

export type ContactRequest = z.infer<typeof ContactRequestSchema>

export const defaultValues = {
    email: "",
    message: "",
    name: "",
} satisfies ContactRequest
