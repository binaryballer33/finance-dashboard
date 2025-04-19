import { TransactionType } from "@prisma/client"
import { z } from "zod"

export const ExpenseSchema = z.object({
    amount: z.coerce.number().min(0.1, "Minimum Amount Is 0.1"),
    category: z.string().min(1, "Please Select A Category"),
    date: z.date({
        required_error: "Please Select A Date",
    }),
    description: z.string().min(1, "Description Is Required"),
    type: z.nativeEnum(TransactionType),
})

export type Expense = z.infer<typeof ExpenseSchema>

export const defaultValuesExpense = {
    amount: 1000,
    category: "Food",
    date: new Date(),
    description: "",
    type: TransactionType.ONE_TIME,
} satisfies Expense
