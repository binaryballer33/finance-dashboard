import { z } from "zod"

export const UserBudgetSchema = z.object({
    budgetAmount: z.coerce.number().default(3000),
})

export type UserBudget = z.infer<typeof UserBudgetSchema>

export const defaultValues: UserBudget = {
    budgetAmount: 3000,
}
