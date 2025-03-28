import { z as zod } from "zod"

const VerifyUUIDSchema = zod.object({
    id: zod
        .string()
        .min(1, { message: "Id Must Be At Least 1 Character Long" })
        .uuid({ message: "Id Is Not A Valid UUID" }),
})

const VerifyCUIDSchema = zod.object({
    id: zod
        .string()
        .min(1, { message: "Id Must Be At Least 1 Character Long" })
        .cuid({ message: "Id Is Not A Valid CUID" }),
})

const VerifyIdSchema = zod.union([VerifyUUIDSchema, VerifyCUIDSchema])

export default VerifyIdSchema
