"use client"

import type { Trade } from "@prisma/client"
import type { ColumnDef } from "@tanstack/react-table"

import CustomTable from "@/components/tables/table"

import TradeExpandRowDetail from "./trade-expand-row-detail"
import TradeStats from "./trade-stats"
import useCreateTradeTableColumns from "./use-create-trade-table-columns"

type TradeTableProps = {
    trades: Trade[]
}

export default function TradeTable(props: TradeTableProps) {
    const { trades } = props

    const { columns, hideForColumns } = useCreateTradeTableColumns()

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
