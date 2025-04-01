"use client"

import { useSession } from "next-auth/react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"

import TradeTable from "./blocks/tables/trades/trade-table"
import TransactionsTable from "./blocks/tables/transactions/transactions-table"

export default function HomeView() {
    const { data: session } = useSession()
    const userId = session?.user?.id

    if (!userId) return null

    return (
        <Container maxWidth="xl">
            <PageHeading bottomText="Welcome To Your Personalized Dashboard" title="Dashboard" />

            <Tabs className="w-full" defaultValue="trades">
                <TabsList className="grid w-full grid-cols-2 border">
                    <TabsTrigger value="trades">Trades</TabsTrigger>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>

                <TabsContent value="trades">
                    <TradeTable userId={userId} />
                </TabsContent>

                <TabsContent value="transactions">
                    <TransactionsTable />
                </TabsContent>
            </Tabs>
        </Container>
    )
}
