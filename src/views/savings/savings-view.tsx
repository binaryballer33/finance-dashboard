"use client"

import { useCallback, useMemo } from "react"

import useGetExpensesByUserIdInfiniteQuery from "@/api/expenses/queries/use-get-expenses-by-userId-infinite-query"
import useGetIncomeByUserIdQuery from "@/api/incomes/queries/use-get-income-by-userId"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"
import { H5 } from "@/components/base/typography"

import getTotal from "../../lib/data-aggregation/get-total"
import FinanceCard from "../home/blocks/cards/finance-card"

type SavingsViewProps = {
    userId: string
}

export default function SavingsView(props: SavingsViewProps) {
    const { userId } = props

    const { data: incomes = [] } = useGetIncomeByUserIdQuery(userId)
    const infiniteQuery = useGetExpensesByUserIdInfiniteQuery(userId)
    const expenses = useMemo(() => {
        return infiniteQuery.data?.pages.flatMap((page) => page) ?? []
    }, [infiniteQuery.data])

    const getTotalExpenses = useCallback(() => {
        return getTotal({ usingArray: expenses, usingField: "amount" })
    }, [expenses])

    const getTotalIncome = useCallback(() => {
        return getTotal({ usingArray: incomes, usingField: "amount" })
    }, [incomes])

    return (
        <Container maxWidth="full">
            <PageHeading bottomText="Your Personal Page For Savings" title="Savings" />

            <H5 className="mt-4 text-2xl font-bold">Your Monthly Savings</H5>

            <div className="mb-6 mt-4 grid gap-4 overflow-x-auto md:grid-cols-3">
                <FinanceCard amount={getTotalIncome()} subTitle="Total Money Coming In" title="Total Income" />

                <FinanceCard
                    amount={-getTotalExpenses()}
                    subTitle="Total Recurring Expenses And Transactions"
                    title="Total Expenses"
                />

                <FinanceCard
                    amount={getTotalIncome() - getTotalExpenses()}
                    subTitle="Current Financial Savings Balance"
                    title="Total Savings"
                />
            </div>
        </Container>
    )
}
