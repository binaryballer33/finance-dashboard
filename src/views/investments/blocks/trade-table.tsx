"use client"

import type { Trade } from "@prisma/client"

import { useState } from "react"

import useGetTradesByUserIdQuery from "@/api/trades/queries/use-get-trades-by-userId"

import CustomTable from "@/components/tables/table"

import CreateTradeDialog from "./create-trade-dialog"
import DeleteTradeDialog from "./delete-trade-dialog"
import TradeRowDetail from "./trade-row-expand"
import TradeStats from "./trade-stats"
import UpdateTradeDialog from "./update-trade-dialog"
import useCreateTradeTableColumns from "./use-create-trade-table-columns"

type TradeTableProps = {
    userId: string
}

export default function TradeTable(props: TradeTableProps) {
    const { userId } = props

    const [createRecordDialogOpen, setCreateRecordDialogOpen] = useState(false)
    const [deleteRecordDialogOpen, setDeleteRecordDialogOpen] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState<null | Trade>(null)
    const [updateRecordDialogOpen, setUpdateRecordDialogOpen] = useState(false)

    const { columns } = useCreateTradeTableColumns()
    const { data: trades = [] } = useGetTradesByUserIdQuery(userId)

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
                    tooltipContent: "Create New Trade",
                    userId,
                }}
                data={trades}
                deleteRecordButton={{
                    setDeleteRecordDialogOpen,
                    setSelectedRecord,
                }}
                expandRowDetailComponent={TradeRowDetail}
                tableStatsComponent={TradeStats}
                updateRecordButton={{
                    setSelectedRecord,
                    setUpdateRecordDialogOpen,
                }}
            />

            {selectedRecord && (
                <UpdateTradeDialog
                    setUpdateRecordDialogOpen={setUpdateRecordDialogOpen}
                    trade={selectedRecord}
                    updateRecordDialogOpen={updateRecordDialogOpen}
                    userId={userId}
                />
            )}

            {selectedRecord && (
                <DeleteTradeDialog
                    deleteRecordDialogOpen={deleteRecordDialogOpen}
                    setDeleteRecordDialogOpen={setDeleteRecordDialogOpen}
                    trade={selectedRecord}
                    userId={userId}
                />
            )}

            <CreateTradeDialog
                createRecordDialogOpen={createRecordDialogOpen}
                setCreateRecordDialogOpen={setCreateRecordDialogOpen}
                userId={userId}
            />
        </>
    )
}
