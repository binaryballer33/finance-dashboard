"use client"

import type { Expense } from "@prisma/client"
import type { Row } from "@tanstack/react-table"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ExpenseRowDetailProps = {
    row: Row<Expense>
}

export default function ExpenseRowDetail(props: ExpenseRowDetailProps) {
    const { row } = props

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Expense Details</CardTitle>
            </CardHeader>

            <CardContent className="flex gap-2">
                <div className="flex flex-col gap-2">
                    <p>Expense Category: {row.original.category}</p>
                    <p>Expense Amount: {row.original.amount}</p>
                    <p>Expense Date: {row.original.date.toLocaleDateString()}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <p>Expense Description: {row.original.description}</p>
                    <p>Expense User: {row.original.userId}</p>
                    <p>Expense Type: {row.original.type}</p>
                </div>
            </CardContent>
        </Card>
    )
}
