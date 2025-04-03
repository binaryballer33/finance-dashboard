"use client"

import useGetTransactionsByIdInfiniteQuery from "@/api/transactions/queries/use-get-transactions-by-id-infinite-query"

import CustomTable from "@/components/tables/table"

import useCreateTableColumns from "./use-create-transaction-table-columns"

type TransactionsTableProps = {
    userId: string
}

export default function TransactionsTable(props: TransactionsTableProps) {
    const { userId } = props
    const { columns, hideForColumns } = useCreateTableColumns()

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
            columns={columns as any}
            data={transactions as any}
            hideForColumns={hideForColumns}
            infiniteQueryHandlers={infiniteQueryHandlers}
            recordsPerPage={[10, 20, 30, 40, 50, 100]}
            width="100%"
        />
    )
}
