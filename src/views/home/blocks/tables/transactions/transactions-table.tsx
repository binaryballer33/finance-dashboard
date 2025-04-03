"use client"

import useGetTransactionsByIdInfiniteQuery from "@/api/transactions/queries/use-get-transactions-by-id-infinite-query"
import { Loader2 } from "lucide-react"
import { TbDatabaseShare } from "react-icons/tb"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

    return (
        <CustomTable
            columns={columns as any}
            data={transactions as any}
            fetchMoreDataComponent={() => FetchMoreDataComponent({ fetchNextPage, hasNextPage, isFetching })}
            hideForColumns={hideForColumns}
            recordsPerPage={[10, 20, 30, 40, 50, 100]}
            width="100%"
        />
    )
}

type FetchMoreDataComponentProps = {
    fetchNextPage: () => void
    hasNextPage: boolean
    isFetching: boolean
}

function FetchMoreDataComponent(props: FetchMoreDataComponentProps) {
    const { fetchNextPage, hasNextPage, isFetching } = props

    return isFetching ? (
        <Loader2 className="animate-spin" size={16} />
    ) : (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button disabled={!hasNextPage || isFetching} onClick={() => fetchNextPage()} size="sm">
                        <TbDatabaseShare />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Load More Data</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
