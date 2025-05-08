import type { Expense } from "@prisma/client"

export type CategoryData = {
    category: string
    color: string
    monthlyTotalExpenses: number
    percentage: number
    total: number
    transactions: Expense[]
}
