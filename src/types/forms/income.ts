import { z } from "zod"

export const IncomeSchema = z.object({
    amount: z.coerce.number().min(0.1, "Minimum Amount Is 0.1"),
    category: z.string().min(1, "Please Select A Category"),
    date: z.date({
        required_error: "Please Select A Date",
    }),
    description: z.string().min(1, "Description Is Required"),
})

export type Income = z.infer<typeof IncomeSchema>

export const defaultValuesIncome = {
    amount: 10,
    category: "Food",
    date: new Date(),
    description: "",
} satisfies Income
