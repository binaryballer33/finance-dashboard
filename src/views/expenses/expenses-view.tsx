"use client"

import useGetExpensesByUserIdQuery from "@/api/expenses/queries/use-get-expenses-by-userId"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"
import { H5 } from "@/components/base/typography"

import FinanceCard from "../home/blocks/analytics/cards/finance-card"
import ExpensesTable from "./blocks/expenses-table"

type ExpensesViewProps = {
    userId: string
}

export default function ExpensesView(props: ExpensesViewProps) {
    const { userId } = props

    const { data: expenses = [] } = useGetExpensesByUserIdQuery(userId)

    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0)

    return (
        <Container maxWidth="full">
            <PageHeading bottomText="Your Personal Page For Expenses" title="Expenses" />

            <FinanceCard amount={totalExpenses} subTitle="Monthly Recurring Expenses" title="Total Expenses" />

            <H5 className="mt-4 text-2xl font-bold">Your Monthly Recurring Expenses</H5>
            <ExpensesTable expenses={expenses} userId={userId} />
        </Container>
    )
}
