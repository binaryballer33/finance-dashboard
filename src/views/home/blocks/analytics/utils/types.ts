import type { Expense as PrismaExpense, Income as PrismaIncome } from "@prisma/client"

export type Expense = Pick<PrismaExpense, "amount" | "category" | "date" | "description" | "type">
export type Income = Pick<PrismaIncome, "amount" | "category" | "date" | "description" | "type">
