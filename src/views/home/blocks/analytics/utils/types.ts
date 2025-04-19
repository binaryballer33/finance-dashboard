import type { Expense as PrismaExpense, Income as PrismaIncome } from "@prisma/client"

export type DateRange = "14d" | "1m" | "1y" | "3m" | "6m" | "7d" | "all"

export type MonthlyData = {
    balance: number
    expenses: number
    income: number
    name: string
    oneTimeExpensesTotal: number
    recurringExpensesTotal: number
}

export type Expense = Pick<PrismaExpense, "amount" | "category" | "date" | "description" | "type">
export type Income = Pick<PrismaIncome, "amount" | "category" | "date" | "description" | "type">
