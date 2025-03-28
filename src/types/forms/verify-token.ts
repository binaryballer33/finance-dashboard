import { z as zod } from "zod"

const VerifyTokenSchema = zod.object({
    email: zod
        .string()
        .min(5, { message: "Email Must Be At Least 5 Characters!" })
        .email({ message: "Email Must Be A Valid Email Address!" }),
    expires: zod.date(),
    id: zod.string().min(6, { message: "Id Must Be At Least 6 Characters" }),
    sixDigitCode: zod
        .number()
        .min(100000, { message: "Code Must Be At Least 6 Characters" })
        .max(999999, { message: "Code Must Be At Least 6 Characters" }),
    token: zod.string().min(6, { message: "Token Must Be At Least 6 Characters" }),
})

export default VerifyTokenSchema
