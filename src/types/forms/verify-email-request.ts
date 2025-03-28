import { z as zod } from "zod"

const VerifyEmailRequestSchema = zod.object({
    email: zod
        .string()
        .min(5, { message: "Email Must Be At Least 5 Characters!" })
        .email({ message: "Email Must Be A Valid Email Address!" }),
})

export default VerifyEmailRequestSchema
