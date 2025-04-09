"use client"

import type { Trade } from "@prisma/client"
import type { Row } from "@tanstack/react-table"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type TradeRowDetailProps = {
    row: Row<Trade>
}

export default function TradeRowDetail(props: TradeRowDetailProps) {
    const { row } = props

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Trade Details</CardTitle>
            </CardHeader>

            <CardContent className="flex gap-2">
                <div className="flex flex-col gap-2">
                    <p>Ticker: {row.original.ticker}</p>
                    <p>Type: {row.original.type}</p>
                    <p>Contracts: {row.original.contracts}</p>
                    <p>Date: {row.original.date.toLocaleDateString()}</p>
                    <p>Buy To Close: {row.original.buyToClose}</p>
                    <p>Sell To Open: {row.original.sellToOpen}</p>
                    <p>Strike: {row.original.strike}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <p>Profit / Loss: {row.original.profitLoss}</p>
                    <p>Profit / Loss %: {row.original.profitLossPercentage}</p>
                    <p>Realized: {row.original.realized}</p>
                </div>
            </CardContent>
        </Card>
    )
}
