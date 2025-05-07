import type { Expense } from "@prisma/client"

export type DailyTransactionData = {
    amount: number
    completeDateString: string
    date: string
    expenses: Expense[]
}
