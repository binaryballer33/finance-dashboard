"use client"

import type { Transaction } from "@prisma/client"

import { useState } from "react"

import useGetTransactionsByIdInfiniteQuery from "@/api/transactions/queries/use-get-transactions-by-id-infinite-query"

import CustomTable from "@/components/tables/table"

import CreateTransactionDialog from "./create-transaction-dialog"
import DeleteTransactionDialog from "./delete-transaction-dialog"
import TransactionRowDetail from "./transaction-row-expand"
import UpdateTransactionDialog from "./update-transaction-dialog"
import useCreateTransactionsTableColumns from "./use-create-transaction-table-columns"

type TransactionsTableProps = {
    userId: string
}

export default function TransactionsTable(props: TransactionsTableProps) {
    const { userId } = props
    const [createRecordDialogOpen, setCreateRecordDialogOpen] = useState(false)
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
                createRecordButton={{
                    setCreateRecordDialogOpen,
                    tooltipContent: "Create New Transaction",
                    userId,
                }}
                data={transactions}
                deleteRecordButton={{
                    setDeleteRecordDialogOpen,
                    setSelectedRecord: setSelectedTransaction,
                }}
                expandRowDetailComponent={TransactionRowDetail}
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

            <CreateTransactionDialog
                createRecordDialogOpen={createRecordDialogOpen}
                setCreateRecordDialogOpen={setCreateRecordDialogOpen}
                userId={userId}
            />
        </>
    )
}
