import { z } from "zod"

export const TransactionSchema = z.object({
    amount: z.coerce.number().min(0.1, "Minimum Amount Is 0.1"),
    category: z.string().min(1, "Please Select A Category"),
    date: z.date({
        required_error: "Please Select A Date",
    }),
    description: z.string().min(1, "Description Is Required"),
})

export type Transaction = z.infer<typeof TransactionSchema>

export const defaultValuesTransaction = {
    amount: 10,
    category: "Food",
    date: new Date(),
    description: "",
} satisfies Transaction
