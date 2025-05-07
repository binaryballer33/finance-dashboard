"use client"

import type { Expense } from "@prisma/client"

import useGetExpensesByUserIdInfiniteQuery from "@/api/expenses/queries/use-get-expenses-by-userId-infinite-query"
import { TransactionType } from "@prisma/client"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import createManyExpenses from "@/actions/expenses/mutations/create-many-expense"

import { Button } from "@/components/ui/button"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"
import { H5 } from "@/components/base/typography"

import FinanceCard from "../home/blocks/cards/finance-card"
import ExpensesTable from "./blocks/expenses-table"

type ExpensesViewProps = {
    userId: string
}

export default function ExpensesView(props: ExpensesViewProps) {
    const { userId } = props

    const infiniteQuery = useGetExpensesByUserIdInfiniteQuery(userId)
    const expenses = infiniteQuery.data?.pages.flatMap((page) => page) ?? []
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0)

    const addRecurringExpense = async () => {
        await createManyExpenses(getRecurringExpenses(userId))
    }

    return (
        <Container maxWidth="full">
            <PageHeading bottomText="Your Personal Page For Expenses" title="Expenses" />

            <FinanceCard amount={totalExpenses} subTitle="Monthly Recurring Expenses" title="Total Expenses" />

            <H5 className="mt-4 text-2xl font-bold">Your Monthly Recurring Expenses</H5>
            <ExpensesTable infiniteQuery={infiniteQuery} userId={userId} />

            <Button onClick={addRecurringExpense}>Add Recurring Expense</Button>
        </Container>
    )
}

function getRecurringExpenses(userId: string) {
    const date = getDayJsDateWithPlugins(new Date()).set("month", 5).set("date", 1).toDate()

    /* create new recurring expenses for the current month */
    const expenses: Omit<Expense, "createdAt" | "id" | "updatedAt">[] = [
        { amount: 1000, category: "Housing", date, description: "Rent", type: TransactionType.RECURRING, userId },
        {
            amount: 500 + Math.floor(Math.random() * 250),
            category: "Food",
            date,
            description: "Food Allowance",
            type: TransactionType.RECURRING,
            userId,
        },
        {
            amount: 500 + Math.floor(Math.random() * 250),
            category: "Entertainment",
            date,
            description: "Entertainment",
            type: TransactionType.RECURRING,
            userId,
        },
        {
            amount: 200 + Math.floor(Math.random() * 50),
            category: "Transportation",
            date,
            description: "Car Note",
            type: TransactionType.RECURRING,
            userId,
        },
        {
            amount: 100 + Math.floor(Math.random() * 150),
            category: "Utilities",
            date,
            description: "Electricity & Water",
            type: TransactionType.RECURRING,
            userId,
        },
        {
            amount: 50 + Math.floor(Math.random() * 5),
            category: "Subscriptions",
            date,
            description: "Netflix, Hulu, Disney+, HBO Max",
            type: TransactionType.RECURRING,
            userId,
        },
    ]

    return expenses
}
