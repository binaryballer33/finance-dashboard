"use client"

import type { Income } from "@prisma/client"

import { useState } from "react"

import CustomTable from "@/components/tables/table"

import CreateIncomeDialog from "./create-income-dialog"
import DeleteIncomeDialog from "./delete-income-dialog"
import IncomeRowDetail from "./income-row-expand"
import UpdateIncomeDialog from "./update-income-dialog"
import useCreateIncomeTableColumns from "./use-create-income-table-columns"

type IncomeTableProps = {
    incomes: Income[]
    userId: string
}

export default function IncomeTable(props: IncomeTableProps) {
    const { incomes, userId } = props
    const { columns } = useCreateIncomeTableColumns()

    const [createRecordDialogOpen, setCreateRecordDialogOpen] = useState(false)
    const [updateDialogOpen, setUpdateRecordDialogOpen] = useState(false)
    const [deleteRecordDialogOpen, setDeleteRecordDialogOpen] = useState(false)
    const [selectedIncome, setSelectedRecord] = useState<Income | null>(null)

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
                    tooltipContent: "Create New Income",
                    userId,
                }}
                data={incomes}
                deleteRecordButton={{
                    setDeleteRecordDialogOpen,
                    setSelectedRecord,
                }}
                expandRowDetailComponent={IncomeRowDetail}
                updateRecordButton={{
                    setSelectedRecord,
                    setUpdateRecordDialogOpen,
                }}
            />

            {selectedIncome && (
                <UpdateIncomeDialog
                    income={selectedIncome}
                    setUpdateRecordDialogOpen={setUpdateRecordDialogOpen}
                    updateRecordDialogOpen={updateDialogOpen}
                    userId={userId}
                />
            )}

            {selectedIncome && (
                <DeleteIncomeDialog
                    deleteRecordDialogOpen={deleteRecordDialogOpen}
                    income={selectedIncome}
                    setDeleteRecordDialogOpen={setDeleteRecordDialogOpen}
                    userId={userId}
                />
            )}

            <CreateIncomeDialog
                createRecordDialogOpen={createRecordDialogOpen}
                setCreateRecordDialogOpen={setCreateRecordDialogOpen}
                userId={userId}
            />
        </>
    )
}
