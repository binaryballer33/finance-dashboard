"use client"

import useGetYugiohCardsInfiniteQuery from "@/api/yu-gi-oh/queries/use-get-yu-gi-oh-cards-infinite-query"

import { Button } from "@/components/ui/button"

import CustomTable from "@/components/tables/table"

import useCreateTableColumns from "./use-create-yugioh-table-columns"
import YugiohExpandRowDetail from "./yugioh-expand-row-detail"

export default function YugiohTable() {
    const { columns, hideForColumns } = useCreateTableColumns()

    const { data: yugiohCardPages, fetchNextPage, hasNextPage, isFetching } = useGetYugiohCardsInfiniteQuery()

    // Flatten all pages of cards into a single array
    const yugiohCards = yugiohCardPages?.pages.flatMap((page) => page) ?? []

    const fetchMoreDataComponent = () => (
        <Button disabled={!hasNextPage || isFetching} onClick={() => fetchNextPage()} size="sm">
            {isFetching ? "Loading..." : "Load More"}
        </Button>
    )

    return (
        <CustomTable
            columns={columns as any}
            data={yugiohCards as any}
            expandRowDetailComponent={YugiohExpandRowDetail as any}
            fetchMoreDataComponent={fetchMoreDataComponent}
            hideForColumns={hideForColumns}
            recordsPerPage={[10, 20, 30, 40, 50, 100]}
            width="100%"
        />
    )
}
