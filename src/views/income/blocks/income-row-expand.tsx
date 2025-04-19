"use client"

import type { Income } from "@prisma/client"
import type { Row } from "@tanstack/react-table"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type IncomeRowDetailProps = {
    row: Row<Income>
}

export default function IncomeRowDetail(props: IncomeRowDetailProps) {
    const { row } = props

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Income Details</CardTitle>
            </CardHeader>

            <CardContent className="flex gap-2">
                <div className="flex flex-col gap-2">
                    <p>Income Category: {row.original.category}</p>
                    <p>Income Amount: {row.original.amount}</p>
                    <p>Income Date: {row.original.date.toLocaleDateString()}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <p>Income Description: {row.original.description}</p>
                    <p>Income User: {row.original.userId}</p>
                    <p>Income Type: {row.original.type}</p>
                </div>
            </CardContent>
        </Card>
    )
}
