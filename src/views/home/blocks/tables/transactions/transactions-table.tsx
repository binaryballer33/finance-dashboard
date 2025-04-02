"use client"

import useGetTransactionsByIdInfiniteQuery from "@/api/transactions/queries/use-get-transactions-by-id-infinite-query"

import { Button } from "@/components/ui/button"

import CustomTable from "@/components/tables/table"

import useCreateTableColumns from "./use-create-transaction-table-columns"

type TransactionsTableProps = {
    userId: string
}

export default function TransactionsTable(props: TransactionsTableProps) {
    const { userId } = props
    const { columns, hideForColumns } = useCreateTableColumns()

    const {
        data: transactionPages,
        fetchNextPage,
        hasNextPage,
        isFetching,
    } = useGetTransactionsByIdInfiniteQuery(userId)

    // Flatten all pages of transactions into a single array
    const transactions = transactionPages?.pages.flatMap((page) => page) ?? []

    const fetchMoreDataComponent = () => (
        <Button disabled={!hasNextPage || isFetching} onClick={() => fetchNextPage()} size="sm">
            {isFetching ? "Loading..." : "Load More"}
        </Button>
    )

    return (
        <CustomTable
            columns={columns as any}
            data={transactions as any}
            fetchMoreDataComponent={fetchMoreDataComponent}
            hideForColumns={hideForColumns}
            recordsPerPage={[10, 20, 30, 40, 50, 100]}
            width="100%"
        />
    )
}
