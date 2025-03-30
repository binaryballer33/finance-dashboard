"use client"

import useGetTransactionsInfiniteQuery from "@/api/transactions/queries/use-get-yu-gi-oh-cards-infinite-query"

import { Button } from "@/components/ui/button"

import CustomTable from "@/components/tables/table"

import useCreateTableColumns from "./use-create-transaction-table-columns"

export default function TransactionsTable() {
    const { columns, hideForColumns } = useCreateTableColumns()

    const { data: transactionPages, fetchNextPage, hasNextPage, isFetching } = useGetTransactionsInfiniteQuery()

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
