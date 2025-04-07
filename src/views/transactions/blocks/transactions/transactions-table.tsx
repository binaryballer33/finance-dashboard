"use client"

import type { Transaction } from "@prisma/client"
import type { Row } from "@tanstack/react-table"

import { useState } from "react"

import useGetTransactionsByIdInfiniteQuery from "@/api/transactions/queries/use-get-transactions-by-id-infinite-query"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import CustomTable from "@/components/tables/table"

import CreateNewTransactionDialog from "./create-transaction-dialog"
import DeleteTransactionDialog from "./delete-transaction-dialog"
import UpdateTransactionDialog from "./update-transaction-dialog"
import useCreateTransactionsTableColumns from "./use-create-transaction-table-columns"

type TransactionsTableProps = {
    userId: string
}

export default function TransactionsTable(props: TransactionsTableProps) {
    const { userId } = props
    const [createNewRecordDialogOpen, setCreateNewRecordDialogOpen] = useState(false)
    const [updateTransactionDialogOpen, setUpdateTransactionDialogOpen] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<null | Transaction>(null)
    const [deleteRecordDialogOpen, setDeleteRecordDialogOpen] = useState(false)

    const { columns } = useCreateTransactionsTableColumns()

    const infiniteQuery = useGetTransactionsByIdInfiniteQuery(userId)

    // Flatten all pages of transactions into a single array
    const transactions = infiniteQuery.data?.pages.flatMap((page) => page) ?? []

    return (
        <>
            <CustomTable
                columns={columns}
                columnsToAdd={{
                    addDeleteRowColumn: true,
                    addExpandRowColumn: true,
                    addHideRowColumn: true,
                    addSelectRowsColumn: true,
                    addUpdateRowColumn: true,
                }}
                createNewRecordButton={{
                    createNewRecordButtonTooltipContent: "Create New Transaction",
                    setCreateNewRecordDialogOpen,
                    userId,
                }}
                data={transactions}
                deleteRecordButton={{
                    setDeleteRecordDialogOpen,
                    setSelectedRecord: setSelectedTransaction,
                }}
                expandRowDetailComponent={DemoTransactionRowDetail}
                infiniteQueryHandlers={{
                    fetchNextPage: infiniteQuery.fetchNextPage,
                    hasNextPage: infiniteQuery.hasNextPage,
                    infiniteQueryButtonTooltipContent: "Load More Transactions",
                    isFetching: infiniteQuery.isFetching,
                }}
                updateRecordButton={{
                    setSelectedRecord: setSelectedTransaction,
                    setUpdateRecordDialogOpen: setUpdateTransactionDialogOpen,
                }}
            />

            {selectedTransaction && (
                <UpdateTransactionDialog
                    setUpdateRecordDialogOpen={setUpdateTransactionDialogOpen}
                    transaction={selectedTransaction}
                    updateRecordDialogOpen={updateTransactionDialogOpen}
                    userId={userId}
                />
            )}

            {selectedTransaction && (
                <DeleteTransactionDialog
                    deleteRecordDialogOpen={deleteRecordDialogOpen}
                    setDeleteRecordDialogOpen={setDeleteRecordDialogOpen}
                    transaction={selectedTransaction}
                    userId={userId}
                />
            )}

            <CreateNewTransactionDialog
                createNewRecordDialogOpen={createNewRecordDialogOpen}
                setCreateNewRecordDialogOpen={setCreateNewRecordDialogOpen}
                userId={userId}
            />
        </>
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
