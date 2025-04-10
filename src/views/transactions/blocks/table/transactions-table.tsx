"use client"

import type { Transaction } from "@prisma/client"
import type { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query"

import { useState } from "react"

import CustomTable from "@/components/tables/table"

import CreateTransactionDialog from "./create-transaction-dialog"
import DeleteTransactionDialog from "./delete-transaction-dialog"
import TransactionRowDetail from "./transaction-row-expand"
import UpdateTransactionDialog from "./update-transaction-dialog"
import useCreateTransactionsTableColumns from "./use-create-transaction-table-columns"

type TransactionsTableProps = {
    infiniteQuery: UseInfiniteQueryResult<InfiniteData<Transaction[], unknown>, Error>
    userId: string
}

export default function TransactionsTable(props: TransactionsTableProps) {
    const { infiniteQuery, userId } = props

    const [createRecordDialogOpen, setCreateRecordDialogOpen] = useState(false)
    const [updateTransactionDialogOpen, setUpdateTransactionDialogOpen] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<null | Transaction>(null)
    const [deleteRecordDialogOpen, setDeleteRecordDialogOpen] = useState(false)

    const { columns } = useCreateTransactionsTableColumns()
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
