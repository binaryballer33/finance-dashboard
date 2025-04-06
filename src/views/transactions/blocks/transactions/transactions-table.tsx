"use client"

import type { Transaction } from "@prisma/client"
import type { Row } from "@tanstack/react-table"

import useGetTransactionsByIdInfiniteQuery from "@/api/transactions/queries/use-get-transactions-by-id-infinite-query"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import CustomTable from "@/components/tables/table"

import useCreateTransactionsTableColumns from "./use-create-transaction-table-columns"

type TransactionsTableProps = {
    userId: string
}

export default function TransactionsTable(props: TransactionsTableProps) {
    const { userId } = props
    const { columns } = useCreateTransactionsTableColumns()

    const infiniteQuery = useGetTransactionsByIdInfiniteQuery(userId)

    // Flatten all pages of transactions into a single array
    const transactions = infiniteQuery.data?.pages.flatMap((page) => page) ?? []

    return (
        <CustomTable
            columns={columns}
            columnsToAdd={{
                addDeleteRowColumn: true,
                addExpandRowColumn: true,
                addHideRowColumn: true,
                addRowReorderColumn: true,
                addSelectRowsColumn: true,
                addUpdateRowColumn: true,
            }}
            createNewRecordButton={{
                createNewRecordButtonTooltipContent: "Create New Transaction",
                userId,
            }}
            data={transactions}
            expandRowDetailComponent={DemoTransactionRowDetail}
            infiniteQueryHandlers={{
                fetchNextPage: infiniteQuery.fetchNextPage,
                hasNextPage: infiniteQuery.hasNextPage,
                infiniteQueryButtonTooltipContent: "Load More Transactions",
                isFetching: infiniteQuery.isFetching,
            }}
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
