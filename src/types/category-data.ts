import type { Expense } from "@prisma/client"

export type CategoryData = {
    category: string
    color: string
    percentage: number
    total: number
    totalExpenses: number
    transactions: Expense[]
}
