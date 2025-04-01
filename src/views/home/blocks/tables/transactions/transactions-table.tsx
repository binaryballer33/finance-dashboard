"use client"

import useGetTransactionsByIdInfiniteQuery from "@/api/transactions/queries/use-get-transactions-by-id-infinite-query"

import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"

import CustomTable from "@/components/tables/table"

import useCreateTableColumns from "./use-create-transaction-table-columns"

export default function TransactionsTable() {
    const { columns, hideForColumns } = useCreateTableColumns()

    // get the currently authenticated user on a client component using next auth
    const session = useSession()
    const userId = session.data?.user?.id ?? ""

    const {
        data: transactionPages,
        fetchNextPage,
        hasNextPage,
        isFetching,
    } = useGetTransactionsByIdInfiniteQuery(userId)

    // If there's no session or user, don't render the table
    if (!session.data?.user?.id) return null

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
