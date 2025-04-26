"use client"

import type { ExtendedUser } from "@/types/types.d/next-auth-types"

import useGetExpensesByUserIdInfiniteQuery from "@/api/expenses/queries/use-get-expenses-by-userId-infinite-query"
import useGetIncomeByUserIdQuery from "@/api/incomes/queries/use-get-income-by-userId"
import useGetTradesByUserIdQuery from "@/api/trades/queries/use-get-trades-by-userId"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Container from "@/components/base/container"

import ExpenseTable from "../expenses/blocks/expenses-table"
import IncomeTable from "../income/blocks/income-table"
import TradeTable from "../investments/blocks/trade-table"
import Analytics from "./blocks/analytics/analytics"

type HomeViewProps = {
    user: ExtendedUser
}

export default function HomeView(props: HomeViewProps) {
    const { user } = props

    const { data: incomes = [] } = useGetIncomeByUserIdQuery(user.id)
    const { data: trades = [] } = useGetTradesByUserIdQuery(user.id)
    const infiniteQuery = useGetExpensesByUserIdInfiniteQuery(user.id)
    const expenses = infiniteQuery.data?.pages.flatMap((page) => page) ?? []

    if (!user) return null

    return (
        <Container maxWidth="xl">
            <Analytics expenses={expenses} incomes={incomes} trades={trades} />

            <Tabs className="w-full" defaultValue="incomes">
                <TabsList className="grid w-full grid-cols-3 border">
                    <TabsTrigger value="incomes">Incomes</TabsTrigger>
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                    <TabsTrigger value="trades">Trades</TabsTrigger>
                </TabsList>

                <TabsContent value="incomes">
                    <IncomeTable incomes={incomes} userId={user.id} />
                </TabsContent>

                <TabsContent value="expenses">
                    <ExpenseTable infiniteQuery={infiniteQuery} userId={user.id} />
                </TabsContent>

                <TabsContent value="trades">
                    <TradeTable trades={trades} userId={user.id} />
                </TabsContent>
            </Tabs>
        </Container>
    )
}
