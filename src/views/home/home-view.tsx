"use client"

import type { Trade } from "@prisma/client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"

import TradeTable from "./blocks/tables/trades/trade-table"
import TransactionsTable from "./blocks/tables/transactions/transactions-table"

type HomeViewProps = {
    trades: Trade[]
}

export default function HomeView(props: HomeViewProps) {
    const { trades } = props

    return (
        <Container maxWidth="xl">
            <PageHeading bottomText="This Is A Sample Page" title="Dashboard" />

            <Tabs className="w-full" defaultValue="trades">
                <TabsList className="grid w-full grid-cols-2 border">
                    <TabsTrigger value="trades">Trades</TabsTrigger>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>

                <TabsContent value="trades">
                    <TradeTable trades={trades} />
                </TabsContent>

                <TabsContent value="transactions">
                    <TransactionsTable />
                </TabsContent>
            </Tabs>
        </Container>
    )
}
