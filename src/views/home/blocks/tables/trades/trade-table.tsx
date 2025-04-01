"use client"

import type { Trade } from "@prisma/client"
import type { ColumnDef } from "@tanstack/react-table"

import useGetTradesByUserIdQuery from "@/api/trades/queries/use-get-trades-by-userId"

import CustomTable from "@/components/tables/table"

import TradeExpandRowDetail from "./trade-expand-row-detail"
import TradeStats from "./trade-stats"
import useCreateTradeTableColumns from "./use-create-trade-table-columns"

type TradeTableProps = {
    userId: string
}

export default function TradeTable(props: TradeTableProps) {
    const { userId } = props

    const { columns, hideForColumns } = useCreateTradeTableColumns()
    const { data: trades } = useGetTradesByUserIdQuery(userId)

    if (!trades) return null

    return (
        <CustomTable
            columns={columns as ColumnDef<Trade>[]}
            data={trades}
            expandRowDetailComponent={TradeExpandRowDetail}
            hideForColumns={hideForColumns}
            recordsPerPage={[10, 20, 30, 40, 50, 100]}
            tableStatsComponent={TradeStats}
            width="100%"
        />
    )
}
