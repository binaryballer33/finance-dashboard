"use client"

import useAuthUser from "@/hooks/use-auth-user"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"
import TabbedIncomeExpenseCharts from "@/components/charts/tabbed-income-expense-charts"

import TradeTable from "../investments/blocks/trade-table"
import TransactionsTable from "../transactions/blocks/table/transactions-table"

export default function HomeView() {
    const user = useAuthUser()
    if (!user) return null

    return (
        <Container maxWidth="xl">
            <PageHeading bottomText="Welcome To Your Personalized Dashboard" title="Dashboard" />

            <TabbedIncomeExpenseCharts />

            <Tabs className="w-full" defaultValue="trades">
                <TabsList className="grid w-full grid-cols-2 border">
                    <TabsTrigger value="trades">Trades</TabsTrigger>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>

                <TabsContent value="trades">
                    <TradeTable userId={user.id} />
                </TabsContent>

                <TabsContent value="transactions">
                    <TransactionsTable userId={user.id} />
                </TabsContent>
            </Tabs>
        </Container>
    )
}
