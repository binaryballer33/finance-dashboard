"use client"

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

    const { columns } = useCreateTradeTableColumns({ shouldColumnBeExpandable: true })
    const { data: trades = [] } = useGetTradesByUserIdQuery(userId)

    return (
        <CustomTable
            columns={columns}
            data={trades}
            expandRowDetailComponent={TradeExpandRowDetail}
            tableStatsComponent={TradeStats}
            width="100%"
        />
    )
}
