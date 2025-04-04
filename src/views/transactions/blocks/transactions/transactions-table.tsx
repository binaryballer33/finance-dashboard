"use client"

import type { Transaction } from "@prisma/client"
import type { Row } from "@tanstack/react-table"

import useGetTransactionsByIdInfiniteQuery from "@/api/transactions/queries/use-get-transactions-by-id-infinite-query"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import CustomTable from "@/components/tables/table"

import useCreateTableColumns from "./use-create-transaction-table-columns"

type TransactionsTableProps = {
    userId: string
}

export default function TransactionsTable(props: TransactionsTableProps) {
    const { userId } = props
    const { columns } = useCreateTableColumns({
        shouldColumnBeExpandable: true,
    })

    const infiniteQuery = useGetTransactionsByIdInfiniteQuery(userId)

    // Flatten all pages of transactions into a single array
    const transactions = infiniteQuery.data?.pages.flatMap((page) => page) ?? []
    const infiniteQueryHandlers = {
        fetchNextPage: infiniteQuery.fetchNextPage,
        hasNextPage: infiniteQuery.hasNextPage,
        isFetching: infiniteQuery.isFetching,
    }

    return (
        <CustomTable
            columns={columns}
            data={transactions}
            expandRowDetailComponent={DemoTransactionRowDetail}
            infiniteQueryHandlers={infiniteQueryHandlers}
            width="100%"
        />
    )
}

type DemoTransactionRowDetailProps = {
    row: Row<Transaction>
}

function DemoTransactionRowDetail(props: DemoTransactionRowDetailProps) {
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
