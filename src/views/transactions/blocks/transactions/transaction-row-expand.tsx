"use client"

import type { Transaction } from "@prisma/client"
import type { Row } from "@tanstack/react-table"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type TransactionRowDetailProps = {
    row: Row<Transaction>
}

export default function TransactionRowDetail(props: TransactionRowDetailProps) {
    const { row } = props

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Transaction Details</CardTitle>
            </CardHeader>

            <CardContent className="flex gap-2">
                <div className="flex flex-col gap-2">
                    <p>Transaction Category: {row.original.category}</p>
                    <p>Transaction Amount: {row.original.amount}</p>
                    <p>Transaction Date: {row.original.date.toLocaleDateString()}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <p>Transaction Description: {row.original.description}</p>
                    <p>Transaction User: {row.original.userId}</p>
                </div>
            </CardContent>
        </Card>
    )
}
