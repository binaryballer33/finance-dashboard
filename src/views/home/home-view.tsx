"use client"

import type { ExtendedUser } from "@/types/types.d/next-auth-types"

import useGetExpensesByUserIdQuery from "@/api/expenses/queries/use-get-expenses-by-userId"
import useGetIncomeByUserIdQuery from "@/api/incomes/queries/use-get-income-by-userId"
import useGetTradesByUserIdQuery from "@/api/trades/queries/use-get-trades-by-userId"
import useGetTransactionsByIdInfiniteQuery from "@/api/transactions/queries/use-get-transactions-by-id-infinite-query"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"

import ExpenseTable from "../expenses/blocks/expenses-table"
import IncomeTable from "../income/blocks/income-table"
import TradeTable from "../investments/blocks/trade-table"
import TransactionsTable from "../transactions/blocks/table/transactions-table"
import Analytics from "./blocks/analytics/analytics"

type HomeViewProps = {
    user: ExtendedUser
}

export default function HomeView(props: HomeViewProps) {
    const { user } = props

    const { data: expenses = [] } = useGetExpensesByUserIdQuery(user.id)
    const { data: incomes = [] } = useGetIncomeByUserIdQuery(user.id)
    const { data: trades = [] } = useGetTradesByUserIdQuery(user.id)
    const infiniteQuery = useGetTransactionsByIdInfiniteQuery(user.id)
    const transactions = infiniteQuery.data?.pages.flatMap((page) => page) ?? []

    if (!user) return null

    return (
        <Container maxWidth="xl">
            <PageHeading bottomText="Welcome To Your Personalized Dashboard" title="Dashboard" />

            <Analytics expenses={expenses} incomes={incomes} trades={trades} transactions={transactions} />

            <Tabs className="w-full" defaultValue="trades">
                <TabsList className="grid w-full grid-cols-4 border">
                    <TabsTrigger value="trades">Trades</TabsTrigger>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                    <TabsTrigger value="incomes">Incomes</TabsTrigger>
                </TabsList>

                <TabsContent value="trades">
                    <TradeTable trades={trades} userId={user.id} />
                </TabsContent>

                <TabsContent value="transactions">
                    <TransactionsTable infiniteQuery={infiniteQuery} userId={user.id} />
                </TabsContent>

                <TabsContent value="expenses">
                    <ExpenseTable expenses={expenses} userId={user.id} />
                </TabsContent>

                <TabsContent value="incomes">
                    <IncomeTable incomes={incomes} userId={user.id} />
                </TabsContent>
            </Tabs>
        </Container>
    )
}
