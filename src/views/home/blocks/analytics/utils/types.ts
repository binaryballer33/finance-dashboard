import type { Expense as PrismaExpense, Transaction as PrismaTransaction } from "@prisma/client"

export type DateRange = "14d" | "1m" | "1y" | "3m" | "6m" | "7d" | "all"

export type MonthlyData = {
    balance: number
    expenses: number
    income: number
    name: string
}

export type Transaction = Pick<PrismaTransaction, "amount" | "category" | "date" | "description">
export type Expense = Pick<PrismaExpense, "amount" | "category" | "date" | "description">
export type Income = Pick<PrismaTransaction, "amount" | "category" | "date" | "description">
