import { TransactionType } from "@prisma/client"
import { z } from "zod"

export const IncomeSchema = z.object({
    amount: z.coerce.number().min(0.1, "Minimum Amount Is 0.1"),
    category: z.string().min(1, "Please Select A Category"),
    date: z.date({
        required_error: "Please Select A Date",
    }),
    description: z.string().min(1, "Description Is Required"),
    type: z.nativeEnum(TransactionType),
})

export type Income = z.infer<typeof IncomeSchema>

export const defaultValuesIncome = {
    amount: 1000,
    category: "Job",
    date: new Date(),
    description: "",
    type: TransactionType.ONE_TIME,
} satisfies Income
